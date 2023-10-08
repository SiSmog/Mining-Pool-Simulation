import convertToHex from "./convertToHex.js";
import sha256 from "./sha256.js";

var minLeadingZeroes=5;
var resultingHash=""


const mine=(blockHeader)=>{
  let blockHeaderHex=Buffer.concat([
    Buffer.from(blockHeader.version,"hex"),
    Buffer.from(blockHeader.previousblockhash,"hex"),
    Buffer.from(blockHeader.merkleroothash,"hex"),
    Buffer.from(blockHeader.time,"hex"),
    Buffer.from(blockHeader.nbits,"hex")
  ])
  
    for(let i=blockHeader.nonceRange[0];i<blockHeader.nonceRange[1];i++){
      let test=Buffer.concat([
          blockHeaderHex,
          convertToHex(i)
        ]).toString('hex')
        resultingHash=evaluateHash(sha256(test))
        if(resultingHash){
            console.log(resultingHash)
            return resultingHash
        }
    }
    console.log("echec");
}

const evaluateHash=(hash)=> {
    let leadingZeroes = 0;
    for (let i = 0; i < hash.length; i++) {
      if (hash[i] === '0') {
        leadingZeroes++;
      } else {
        break;
      }
    }
    if(leadingZeroes>=4){
      console.log(hash);
  }
    if(leadingZeroes>=minLeadingZeroes){
        return hash
    }
}
export default mine