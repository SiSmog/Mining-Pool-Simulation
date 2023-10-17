import getBlockTemplate from "./getBlockTemplate.js";
import generateCoinbaseTransaction from "./generateCoinbaseTransaction.js";
import calculateFees from "./calculateFees.js";
import calculateMerkleRoot from "./calculateMerkleRoot.js";
import getTimestamp from "./getTimestamp.js";
import calculateNBits from "./calculateNBits.js";


const buildBlockHeader=(block,extraNonce)=>{
    const baseReward=(50/(2**(parseInt(block.height/210000))))*100000000
    const reward=baseReward+calculateFees(block.transactions)
    console.log("Reward:",reward, "Satoshi")
    const coinBaseTransaction=generateCoinbaseTransaction(block.height,extraNonce,reward)
    console.log("Generated CoinBase Transaction:",coinBaseTransaction)
    block.transactions.unshift(coinBaseTransaction);
    const transactionHashes = block.transactions.map(transaction => transaction.hash);
    const merkleRootHash=calculateMerkleRoot(transactionHashes)
    console.log("Merkle Root Hash: ",merkleRootHash)

    const header={
        version:block.version.toString(16),
        previousblockhash:block.previousblockhash,
        merkleroothash:merkleRootHash,
        time:getTimestamp(),
        nbits:calculateNBits(block.target).toString('hex')
    }
    console.log("Block Header:",header)
    return header
}
export default buildBlockHeader

