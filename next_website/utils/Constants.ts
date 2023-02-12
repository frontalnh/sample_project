export const WS_ENDPOINT = (() => {
  if (process.env.NEXT_PUBLIC_APP_ENV == 'prod') {
    return '';
  } else if (process.env.NEXT_PUBLIC_APP_ENV == 'dev') {
    return '';
  } else {
    return '';
  }
})();

export const JWT_TOKEN_NAME = (() => {
  if (process.env.NEXT_PUBLIC_APP_ENV == 'prod') {
    return '';
  } else if (process.env.NEXT_PUBLIC_APP_ENV == 'dev') {
    return '';
  } else {
    return '';
  }
})();

export const BASE_URL = (() => {
  if (process.env.NEXT_PUBLIC_APP_ENV == 'prod') {
    return '';
  } else if (process.env.NEXT_PUBLIC_APP_ENV == 'dev') {
    return '';
  } else {
    return '';
  }
})();
