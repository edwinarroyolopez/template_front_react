const tryParse = (json: string | null, _default: any) => {
  try {
    return JSON.parse(json || "");
  } catch (error) {
    return _default;
  }
};

const getCookie = (name: string, _default: any = {}) =>
  tryParse(localStorage.getItem(name), _default);
const setCookie = (name: string, data: JSON) =>
  localStorage.setItem(name, JSON.stringify(data));
const existsCookie = (name: string) => !!localStorage.getItem(name);
const deleteCookie = (name: string) => localStorage.removeItem(name);

const TOKEN_AUTH = "TOKEN_AUTH";
interface ITokenAuth {
  tokenUser: string;
  idUser?: string;
  name?: string;
  email?: string;
}
export const getTokenAuthCookie = () => <ITokenAuth>getCookie(TOKEN_AUTH);
export const setAuthTokenCookie = (data: ITokenAuth) => setCookie(TOKEN_AUTH, data as any);
export const existsAuthCookie = () => existsCookie(TOKEN_AUTH);
export const deleteAuthCookie = () => deleteCookie(TOKEN_AUTH);

