import sha256 from "sha256";


console.time("timer")


const ITERATIONS=2**22
var maxZeroes=0;
var bestHash=""
function countLeadingZeroes(inputString) {
    let count = 0;
    
    for (let i = 0; i < inputString.length; i++) {
      if (inputString[i] === '0') {
        count++;
      } else {
        break;
      }
    }
    return count;
  }
for(let i=0;i<ITERATIONS;i++){
    let hash=sha256("abcgghjkgkghkg"+i)
    let zeroes=countLeadingZeroes(hash)
    
    if(zeroes>maxZeroes){
        maxZeroes=zeroes
        bestHash=hash
    }
    if(maxZeroes>=5){
        break;
    }
    
}
console.log(maxZeroes)
console.log(bestHash)
console.timeEnd("timer")

