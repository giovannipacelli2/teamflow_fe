import Cookies from "js-cookie";

export default function useCookie() {
  
    const getCookie = (name : string) : string | undefined =>{
        return Cookies.get(name);
    }

    const setCookie = (name: string, value: string) : boolean =>{
        let res = Cookies.set(name, value);

        return res === undefined ? false : true
    }

    const deleteCookie = (name: string) : void =>{
        Cookies.remove(name);
    }

    return { getCookie, setCookie, deleteCookie };
}
