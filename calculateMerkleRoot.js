import sha256 from "./sha256.js";

const calculateMerkleRoot=(transactionHashes)=>{
    if(transactionHashes.length==1){
        return transactionHashes[0]
    }
    let newTransactionHashes=[]
    for(let i=0;i<transactionHashes.length;i+=2){
        let leftHash=transactionHashes[i]
        let rightHash=transactionHashes[i]
        let newHash=sha256(leftHash+rightHash)
        newTransactionHashes.push(newHash)
    }
    if(transactionHashes%2==1){
        newTransactionHashes.push(transactionHashes[transactionHashes.length-1])
    }
    return calculateMerkleRoot(newTransactionHashes)
}
export default calculateMerkleRoot