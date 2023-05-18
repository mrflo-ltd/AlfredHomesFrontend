export const { HTTPS: ENV_HTTPS = 'true', REACT_APP_API_URL = '' } =
  process.env;

const toBoolean = (value: string) => ['1', 'true'].includes(value);

export const HTTPS: boolean = toBoolean(ENV_HTTPS);
