const corsProxy = 'http://106.14.223.52/api';
export const apiOrigin = (process.env.NODE_ENV === 'development') ? '/api' : corsProxy;
export const publicOrigin = (process.env.NODE_ENV === 'development') ? '/api' : corsProxy;
