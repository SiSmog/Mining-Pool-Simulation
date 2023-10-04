import sha256 from "./sha256.js";
import reverseBufferByteOrder from "./reverseBufferByteOrder.js"

const calculateTransactionHash=(data)=>{
    const dataHash=sha256(sha256(data))
    const dataHashBuffer=Buffer.from(dataHash,'hex')
    const transactionHash=reverseBufferByteOrder(dataHashBuffer)
    return transactionHash.toString("hex")
}
export default calculateTransactionHash