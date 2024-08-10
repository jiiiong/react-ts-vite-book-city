const corsProxy = 'https://api.allorigins.win/raw?url=http://106.14.223.52/api';
const publicProxy = 'https://api.allorigins.win/raw?url=http://106.14.223.52/public';
export const apiOrigin = (process.env.NODE_ENV === 'development') ? '/api' : corsProxy;
export const publicOrigin = (process.env.NODE_ENV === 'development') ? '/public' : publicProxy;
