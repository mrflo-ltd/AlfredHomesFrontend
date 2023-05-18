import { Link, NavLink as _NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

const linkStyles = css`
  text-decoration: none;
`;

export const NavLink = styled(_NavLink)`
  ${linkStyles};
`;

export const InternalLink = styled(Link)`
  ${linkStyles};
`;

export const ExternalLink = styled.a`
  ${linkStyles};
`;
