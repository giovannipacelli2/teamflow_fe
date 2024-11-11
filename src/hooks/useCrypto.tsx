import CryptoJS from "crypto-js";

const KEY = String(process.env.REACT_APP_CRYPTO_KEY);

export default function useCrypto() {
  const encryptString = (text : string) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(text, KEY).toString();
      return encrypted;
    } catch (error) {
      console.error("Errore durante la crittografia:", error);
      return '';
    }
  };

  const decryptString = (encryptedText : string) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedText, KEY);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Errore durante la decrittografia:", error);
      return '';
    }
  };

  const encryptObject = (object : Object) => {
    try {
      const stringified = JSON.stringify(object);
      return encryptString(stringified);
    } catch (error) {
      console.error("Errore durante la crittografia dell'oggetto:", error);
      return '';
    }
  };

  const decryptObject = (encryptedText:string) => {
    try {
      const decrypted = String(decryptString(encryptedText));
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Errore durante la decrittografia dell'oggetto:", error);
      return '';
    }
  };

  return { encryptString, decryptString, encryptObject, decryptObject };
}
