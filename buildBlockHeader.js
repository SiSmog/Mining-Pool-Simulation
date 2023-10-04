import getBlockTemplate from "./getBlockTemplate.js";
import generateCoinbaseTransaction from "./generateCoinbaseTransaction.js";
import calculateFees from "./calculateFees.js";
import calculateMerkleRoot from "./calculateMerkleRoot.js";
import getTimestamp from "./getTimestamp.js";
import calculateNBits from "./calculateNBits.js";
getBlockTemplate().then((res)=>{
    console.log(res.data.result.target)
    const baseReward=(50/(2**(parseInt(res.data.result.height/210000))))*100000000
    const reward=baseReward+calculateFees(res.data.result.transactions)
    console.log(reward)
    const coinBaseTransaction=generateCoinbaseTransaction(res.data.result.height,10,reward)
    console.log(coinBaseTransaction)
    res.data.result.transactions.unshift(coinBaseTransaction);
    const transactionHashes = res.data.result.transactions.map(transaction => transaction.hash);
    const merkleRootHash=calculateMerkleRoot(transactionHashes)
    console.log(merkleRootHash)
    console.log("merkleRootHash")

    const header={
        version:"02000000",
        previousblockhash:res.data.result.previousblockhash,
        merkleroothash:merkleRootHash,
        time:getTimestamp(),
        nbits:calculateNBits(res.data.result.target).toString('hex')
    }
    console.log(header)
})

