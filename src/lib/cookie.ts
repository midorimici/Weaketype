const maxAge: number = 60 * 60 * 24 * 100;

export const setCookie = (key: string, value: any) => {
  document.cookie = `${key}=${value}; max-age=${maxAge}; secure`;
};

export const getCookieValue = (key: string): string => {
  const value = document.cookie.split('; ').find((row) => row.startsWith(key));
  if (value) {
    return value.split('=')[1];
  }
  return '';
};
