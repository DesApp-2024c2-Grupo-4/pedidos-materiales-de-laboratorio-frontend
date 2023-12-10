import * as CryptoJS from "crypto-js";
export const token = () =>{
    let token = ""
    if(localStorage.getItem('token')){
        token = localStorage.getItem('token')
    }
    return token
} 

export const encryptAES = (message) => {
    let stringify = JSON.stringify(message);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(
      stringify,
      process.env.REACT_APP_USER,
      { iv }
    ).toString();
    return encrypted;
  };

  export const decryptAES = (messageEncrypted) => {
    let result = "";
  
    try {
      if (messageEncrypted && messageEncrypted !== "") {
        const decrypted = CryptoJS.AES.decrypt(
          messageEncrypted,
          process.env.REACT_APP_USER
        ).toString(CryptoJS.enc.Utf8);
  
        // Verificar si la cadena desencriptada es válida JSON
        result = decrypted ? JSON.parse(decrypted) : "";
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    return result;
  };