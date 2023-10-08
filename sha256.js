import CryptoJS from 'crypto-js';

const sha256=(input)=>{
    const wordArray = CryptoJS.enc.Hex.parse(input);
    return CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex)
}
export default sha256