import convertToHex from "./convertToHex.js"
import calculateTransactionHash from "./calculateTransactionHash.js"
import reverseBufferByteOrder from "./reverseBufferByteOrder.js"

const generateCoinbaseTransaction=(height,nonce,value)=>{
    const version=Buffer.from("02000000","hex")
    const numberInputs=Buffer.from("0001","hex")
    const inputSequence=Buffer.from("01","hex")
    const transactionHashReference=Buffer.from("0000000000000000000000000000000000000000000000000000000000000000","hex")
    const outputIndex=Buffer.from("ffffffff","hex")
    const dataPrefix=Buffer.from("03","hex")
    const blockHeight= reverseBufferByteOrder(convertToHex(height))
    const extranonce=convertToHex(nonce)
    const data=Buffer.concat([
        dataPrefix,
        blockHeight,
        extranonce
    ])
    const dataLength=convertToHex(data.length)
    const sequenceNumber=Buffer.from("ffffffff","hex")
    const amountPrefix=Buffer.from("02","hex")
    const amount=reverseBufferByteOrder(convertToHex(value,8))
    
    //example taken from an actual coinbase transaction
    //Pay-to-Witness-Public-Key-Hash
    const P2WPKH=Buffer.from("16001435f6de260c9f3bdee47524c473a6016c0c055cb9","hex")
    //example taken from an actual coinbase transaction
    const segwit=Buffer.from("0000000000000000266a24aa21a9eda8f9e7946965d79a0bc958ea8fb2eb83915858abc747f0e3cb537e5e86430a7f0120000000000000000000000000000000000000000000000000000000000000000000000000","hex")
    
    
    const transactionData=Buffer.concat([
        version,
        numberInputs,
        inputSequence,
        transactionHashReference,
        outputIndex,
        dataLength,
        data,
        sequenceNumber,
        amountPrefix,
        amount,
        P2WPKH,
        segwit
    ]).toString("hex")
    const transaction={data:transactionData,hash:calculateTransactionHash(transactionData)}
    return transaction

}
export default generateCoinbaseTransaction


