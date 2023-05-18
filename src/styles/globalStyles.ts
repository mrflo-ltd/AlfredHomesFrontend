import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components/macro';

import { white } from './colors';

export const GlobalStyles = createGlobalStyle`
  ${normalize()};

		*,
		*:before,
		*:after {
			box-sizing: border-box;
		}

    html, body {
      height: 100%;
    }

		html {
			font-family: 'Gotham', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'Arial', sans-serif;
			font-weight: 300;
			touch-action: manipulation;
			-webkit-tap-highlight-color: rgba(0,0,0,0);
			-webkit-tap-highlight-color: transparent;
			-ms-overflow-style: -ms-autohiding-scrollbar;
		}

		body {
			background-color: ${white};
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}

		h1, h2, h3, h4, h5, h6 {
			margin: 0;
			font: inherit;
			font-size: 100%;
		}

		a {
			color: inherit;
		}

		button {
			font-family: inherit;
			line-height: normal;
			border-radius: 0;
			-webkit-font-smoothing: inherit;
			-moz-osx-font-smoothing: inherit;
		}

		input {
			font-family: inherit;
			-webkit-font-smoothing: inherit;
			-moz-osx-font-smoothing: inherit;
		}
`;
