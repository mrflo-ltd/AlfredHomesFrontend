import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAVIGATION_PAGES_TREE_MAP } from '../global/pages';
import { useNavigationKeys } from '../hooks/useNavigationKeys';
import { defaultButtonStyles } from './Button';
import { ChevronLeft, ChevronRight } from './Chevron';
import { white, grey, greyDarker } from '../styles/colors';
import { ThemeType } from '../styles/themes';

const Button = styled.button`
  ${defaultButtonStyles};

  position: absolute;
  top: 50%;
  padding: 12px;
  z-index: 10;
  transform: translateY(-50%);
`;

const LeftButton = styled(Button)`
  left: 16px;

  @media only screen and (max-width: 768px) {
    top: 24px;
    left: auto;
    right: 24px;
    transform: rotate(90deg);
  }

  @media only screen and (max-width: 480px) {
    top: 12px;
    right: 12px;
  }
`;

const RightButton = styled(Button)`
  right: 16px;

  @media only screen and (max-width: 768px) {
    bottom: 24px;
    top: auto;
    left: auto;
    right: 24px;
    transform: rotate(90deg);
  }

  @media only screen and (max-width: 480px) {
    bottom: 12px;
    right: 12px;
  }
`;

const NavigationChevronLeft = styled(ChevronLeft)`
  margin-left: 12px;

  @media only screen and (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const NavigationChevronRight = styled(ChevronRight)`
  margin-right: 12px;

  @media only screen and (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const Label = styled.div`
  position: absolute;
  top: -20px;
  font-size: 10px;
  background: ${white};
  color: ${greyDarker};
  font-weight: 500;
  padding: 2px 4px;
  text-transform: uppercase;
  border-radius: 2px;
  text-align: center;

  @media only screen and (max-width: 768px) {
    transform: rotate(-90deg);
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
  }
`;

const PreviousLabel = styled(Label)`
  left: 3px;

  @media only screen and (max-width: 768px) {
    left: 22px;
    top: 16px;
  }
`;

const NextLabel = styled(Label)`
  right: 12px;

  @media only screen and (max-width: 768px) {
    right: 36px;
    top: 16px;
  }
`;

type NavigationProps = {
  themeType?: ThemeType;
};

export const Navigation = ({
  themeType = ThemeType.THEME_LIGHT,
}: NavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const matchingIndex = location.pathname.indexOf('/', 1);
  const isSubpage = matchingIndex >= 0;

  const rootPathname =
    !NAVIGATION_PAGES_TREE_MAP[location.pathname] || isSubpage
      ? location.pathname.substring(
          0,
          isSubpage ? matchingIndex : location.pathname.length
        )
      : location.pathname;

  const pageNeighbor = NAVIGATION_PAGES_TREE_MAP[rootPathname] || {};
  const previousPath = isSubpage
    ? rootPathname
    : pageNeighbor?.previousPath || '';
  const nextPath = isSubpage
    ? NAVIGATION_PAGES_TREE_MAP[location.pathname]?.nextPath || ''
    : pageNeighbor?.nextPath || '';

  const handleLeftButtonClick = () => navigate(previousPath);
  const handleRightButtonClick = () => navigate(nextPath);

  useNavigationKeys(handleLeftButtonClick, handleRightButtonClick);

  const chevronColor = themeType === ThemeType.THEME_DARK ? white : grey;

  return (
    <React.Fragment>
      {previousPath && (
        <LeftButton onClick={() => handleLeftButtonClick()}>
          <PreviousLabel>Previous</PreviousLabel>
          <NavigationChevronLeft color={chevronColor} borderThickness="2px" />
        </LeftButton>
      )}

      {nextPath && (
        <RightButton onClick={() => handleRightButtonClick()}>
          <NextLabel>Next</NextLabel>
          <NavigationChevronRight color={chevronColor} borderThickness="2px" />
        </RightButton>
      )}
    </React.Fragment>
  );
};
