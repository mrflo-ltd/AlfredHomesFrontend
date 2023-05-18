import styled, { css } from 'styled-components/macro';
import { white, black } from './colors';

export const fontFamily = {
  text: 'Gotham',
  display: 'The Seasons',
};

const titleStyles = css`
  font-family: ${fontFamily.display};
  font-weight: 400;
  color: ${white};
  text-align: center;
`;

export const MainTitle = styled.h1`
  ${titleStyles};

  font-size: 64px;
  line-height: 1.3;
  letter-spacing: 22px;
`;

export const Subtitle = styled.h2`
  ${titleStyles};

  font-size: 36px;
  letter-spacing: 3px;
`;

export const Headline = styled.h3`
  ${titleStyles};
  font-weight: 600;

  font-size: 24px;
  letter-spacing: 7px;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
  font-family: ${fontFamily.text};
  font-size: 12px;
  line-height: 1.2;
  font-weight: 400;
  color: ${white};
  text-align: left;
`;

export const ContentText = styled(Text).attrs({ as: 'div' })<{
  color?: string;
}>`
  color: ${(props) => props?.color || black};

  & + & {
    margin-top: 18px;
  }
`;
