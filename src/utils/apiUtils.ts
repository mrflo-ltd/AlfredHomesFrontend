const NO_CONTENT_STATUS = 204;

type RequestMethodType = 'POST' | 'GET' | 'PUT' | 'DELETE';

type RequestOptionsType = {
  body?:
    | Blob
    | BufferSource
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | string
    | null;
  headers?: Record<string, string>;
  redirect?: RequestRedirect;
  credentials?: RequestCredentials;
  method?: RequestMethodType;
};

export const makeApiUrl = (path: string) => {
  return `/umbraco/api/${path}`;
};

const request = async <T>(url: string, options: RequestOptionsType = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      /* eslint-disable-next-line no-console */
      console.error(response.statusText);
    }

    if (response.status === NO_CONTENT_STATUS) {
      return '' as unknown as T;
    }

    const data = (await response.json()) as T | undefined;

    if (!data) {
      throw new Error(
        'Unknown server Error. Please try again in a few moments.'
      );
    }

    return data;
  } catch (error) {
    // TODO: log this error message somewhere
    throw new Error(
      error instanceof Error ? error.message : 'Unknown server Error'
    );
  }
};

const jsonRequest = async <T>(
  url: string,
  options: RequestOptionsType = {}
) => {
  return request<T>(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

export const getRequest = <T>(
  url: string,
  options: RequestOptionsType = {}
) => {
  return jsonRequest<T>(url, { ...options, method: 'GET' });
};
