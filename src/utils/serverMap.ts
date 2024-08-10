const corsProxy = 'https://crossorigin.me/';
export const apiOrigin = (process.env.NODE_ENV === 'development') ? '/api' : corsProxy + 'http://106.14.223.52';
export const publicOrigin = (process.env.NODE_ENV === 'development') ? '/api' : corsProxy + 'http://106.14.223.52';
