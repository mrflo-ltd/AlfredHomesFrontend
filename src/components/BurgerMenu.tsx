import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useLocation, useNavigate } from 'react-router-dom';
import { defaultButtonStyles } from '../components/Button';
import { InternalLink, ExternalLink } from '../components/Link';
import { Modal } from '../components/Modal';
import {
  NAVIGATION_PATH,
  PAGES_TITLES_MAP,
  BURGER_MENU_PAGES_PATH,
} from '../global/pages';
import { white, black, red, greyDark, greyDarker } from '../styles/colors';
import { ThemeType } from '../styles/themes';
import { fontFamily } from '../styles/typography';

const DISCLAIMER_PATH = 'https://www.alfredhomes.co.uk/terms-privacy.php';

const NavMenu = styled.div`
  position: absolute;
  top: 36px;
  left: 36px;

  display: flex;
  align-items: flex-start;

  @media only screen and (max-width: 480px) {
    top: 24px;
    left: 24px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 5;
  margin-left: 30px;
  margin-right: 30px;

  @media only screen and (max-width: 480px) {
    margin-left: 24px;
  }
`;

const linkStyles = css`
  font-family: ${fontFamily.display};
  font-weight: 600;
  font-size: 12px;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 6px;

  @media only screen and (max-width: 768px) {
    letter-spacing: 5px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

const HomeLink = styled(InternalLink)<{ $color: string }>`
  ${linkStyles};

  margin-top: -1px;
  color: ${(props) => props.$color};

  @media only screen and (max-width: 480px) {
    margin-top: -2px;
  }
`;

const PageTitle = styled.span<{ $color: string }>`
  ${linkStyles};

  margin-top: 10px;
  color: ${(props) => props.$color};

  @media only screen and (max-width: 640px) {
    margin-top: 6px;
    display: none;
  }
`;

const BurgerButton = styled.button<{
  $isActive: boolean;
  $borderColor: string;
}>`
  ${defaultButtonStyles};

  width: 48px;
  height: 48px;
  margin-top: -10px;
  margin-left: -6px;
  z-index: 30;

  @media only screen and (max-width: 480px) {
    width: 32px;
    height: 32px;
  }

  span {
    top: 2px;
    left: 0;

    ${(props) =>
      props.$isActive &&
      `
      transform: translate3d(0,10px,0) rotate(45deg);
      `}

    &,
    &:before,
    &:after {
      position: absolute;
      width: 36px;
      height: 2px;
      background-color: ${(props) => props.$borderColor};
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;

      @media only screen and (max-width: 480px) {
        width: 24px;
      }
    }

    &:before,
    &:after {
      display: block;
      content: '';
    }

    &:before {
      top: 10px;
      transition-property: transform, opacity;

      @media only screen and (max-width: 480px) {
        top: 8px;
      }

      ${(props) =>
        props.$isActive &&
        `
        transform: rotate(-45deg) translate3d(-5.71429px,-5px,0);
        opacity: 0;
        `}
    }

    &:after {
      top: 20px;
      transition-property: transform;

      @media only screen and (max-width: 480px) {
        top: 16px;
      }

      ${(props) =>
        props.$isActive &&
        `
          transform: translate3d(0,-20px,0) rotate(-90deg);

          @media only screen and (max-width: 480px) {
            transform: translate3d(0,-16px,0) rotate(-90deg);
          }
        `}
    }
  }
`;

const Content = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 26;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  & + & {
    margin-top: 36px;
  }
`;

const menuItemLinkStyles = css`
  display: block;
  padding: 0 18px;
  font-family: ${fontFamily.display};
  font-size: 24px;
  line-height: 1.3;
  font-weight: 400;
  color: ${white};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 10px;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const MenuItemButton = styled.button`
  ${defaultButtonStyles};
  ${menuItemLinkStyles};

  width: 100%;
  text-align: center;
`;

const ExternalMenuLink = styled(ExternalLink)`
  ${menuItemLinkStyles};

  margin-top: 96px;
  font-size: 16px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const ExternalMenuItem = styled(MenuItem)``;

type BurgerMenuProps = {
  themeType?: ThemeType;
};

export const BurgerMenu = ({
  themeType = ThemeType.THEME_LIGHT,
}: BurgerMenuProps) => {
  const [isOpened, setIsOpened] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const matchingIndex = location.pathname.indexOf('/', 1);
  const rootPathname = location.pathname.substring(
    0,
    matchingIndex >= 0 ? matchingIndex : location.pathname.length
  );

  const homepageTitle = PAGES_TITLES_MAP[NAVIGATION_PATH];
  const currentPageTitle = PAGES_TITLES_MAP[rootPathname] || '';

  return (
    <React.Fragment>
      <NavMenu>
        <BurgerButton
          $borderColor={
            isOpened || themeType === ThemeType.THEME_DARK ? white : red
          }
          $isActive={isOpened}
          onClick={() => setIsOpened(!isOpened)}
        >
          <span />
        </BurgerButton>

        <NavLinks>
          <HomeLink
            to={NAVIGATION_PATH}
            $color={themeType === ThemeType.THEME_DARK ? white : greyDark}
          >
            {homepageTitle}
          </HomeLink>
          {currentPageTitle && (
            <PageTitle
              $color={themeType === ThemeType.THEME_DARK ? white : black}
            >
              {currentPageTitle}
            </PageTitle>
          )}
        </NavLinks>
      </NavMenu>

      {isOpened && (
        <Modal
          overlayBackgroundColor={greyDarker}
          overlayZIndex={25}
          onClose={() => setIsOpened(false)}
        >
          <Content>
            <Menu>
              {BURGER_MENU_PAGES_PATH.map((path) => {
                const title = PAGES_TITLES_MAP[path];
                return (
                  <MenuItem key={`${path}-${title}`}>
                    <MenuItemButton
                      onClick={() => {
                        if (location.pathname === path) {
                          setIsOpened(false);
                        } else {
                          navigate(path);
                        }
                      }}
                    >
                      {title}
                    </MenuItemButton>
                  </MenuItem>
                );
              })}

              <ExternalMenuItem>
                <ExternalMenuLink href={DISCLAIMER_PATH} target="_blank">
                  Disclaimer
                </ExternalMenuLink>
              </ExternalMenuItem>
            </Menu>
          </Content>
        </Modal>
      )}
    </React.Fragment>
  );
};
