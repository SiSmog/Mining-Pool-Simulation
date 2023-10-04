import convertToHex from "./convertToHex.js";


const calculateNBits=(target)=>{
    const exponent= convertToHex(32-countLeadingZeroPairs(target))
    const coefficient=Buffer.from(target.substring(64-countTrailingZeroPairs(target)*2-6,64-countTrailingZeroPairs(target)*2),'hex')
    return Buffer.concat([
        exponent,
        coefficient
    ])
}
const countLeadingZeroPairs=(str)=>{
    let count = 0;
  
    for (let i = 0; i < str.length - 1; i += 2) {
      if (str[i] === '0' && str[i + 1] === '0') {
        count++;
      } else {
        break;
      }
    }
  
    return count;
}
const countTrailingZeroPairs=(str)=>{
    let count = 0;
    
    for (let i = str.length - 2; i >= 0; i -= 2) {
      if (str[i] === '0' && str[i + 1] === '0') {
        count++;
      } else {
        break;
      }
    }
    
    return count;
}

export default calculateNBits
