import Cookies from "js-cookie";

export default function useCookie() {
  
    const getCookie = (name : string) : string | undefined =>{
        return Cookies.get(name);
    }

    const setCookie = (name: string, value: string) : boolean =>{

        let options : Cookies.CookieAttributes = {
            domain: process.env.REACT_APP_COOKIE_DOMAIN,
            path: process.env.REACT_APP_COOKIE_PATH,
            expires : Number(process.env.REACT_APP_COOKIE_TIME)
        }

        let res = Cookies.set(name, value, options);

        return res === undefined ? false : true
    }

    const setSessionCookie = (name: string, value: string) : boolean =>{

        let options : Cookies.CookieAttributes = {
            domain: process.env.REACT_APP_COOKIE_DOMAIN,
            path: process.env.REACT_APP_COOKIE_PATH,
        }

        let res = Cookies.set(name, value, options);

        return res === undefined ? false : true
    }

    const deleteCookie = (name: string) : void =>{
        Cookies.remove(name);
    }

    return { getCookie, setCookie, setSessionCookie, deleteCookie };
}
