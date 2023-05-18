import React from 'react';
import styled from 'styled-components/macro';
import { ThemeType } from '../styles/themes';

import alfredHomesLogoLight from '../assets/logo-light.svg';
import alfredHomesLogoDark from '../assets/logo-dark.svg';
import logo from '../assets/logo-intro.png';

const Monogram = styled.img<{ width?: string }>`
  width: ${(props) => props?.width || '96px'};
  height: auto;
`;

type LogoProps = {
  width?: string;
  hasSlogan?: boolean;
  themeType?: ThemeType;
};

const Image = styled.img<{ width: string }>`
  width: ${(props) => props.width};
  height: auto;
`;

export const Logo = ({
  width = '96px',
  hasSlogan = true,
  themeType = ThemeType.THEME_LIGHT,
}: LogoProps) => {
  return (
    <React.Fragment>
      {hasSlogan && <Image width={width} src={logo} alt="Alfred Homes" />}

      {!hasSlogan && (
        <Monogram
          width={width}
          src={
            themeType === ThemeType.THEME_DARK
              ? alfredHomesLogoLight
              : alfredHomesLogoDark
          }
          alt="Alfred Homes Logo"
        />
      )}
    </React.Fragment>
  );
};
