import getBlockTemplate from "./getBlockTemplate.js";
import generateCoinbaseTransaction from "./generateCoinbaseTransaction.js";
import calculateFees from "./calculateFees.js";
import calculateMerkleRoot from "./calculateMerkleRoot.js";
import getTimestamp from "./getTimestamp.js";
import calculateNBits from "./calculateNBits.js";


const buildBlockHeader=(block)=>{
    const baseReward=(50/(2**(parseInt(block.height/210000))))*100000000
    const reward=baseReward+calculateFees(block.transactions)
    console.log(reward)
    const coinBaseTransaction=generateCoinbaseTransaction(block.height,10,reward)
    console.log(coinBaseTransaction)
    block.transactions.unshift(coinBaseTransaction);
    const transactionHashes = block.transactions.map(transaction => transaction.hash);
    const merkleRootHash=calculateMerkleRoot(transactionHashes)
    console.log(merkleRootHash)
    console.log("merkleRootHash")

    const header={
        version:"02000000",
        previousblockhash:block.previousblockhash,
        merkleroothash:merkleRootHash,
        time:getTimestamp(),
        nbits:calculateNBits(block.target).toString('hex')
    }
    console.log(header)
    return header
}
export default buildBlockHeader

