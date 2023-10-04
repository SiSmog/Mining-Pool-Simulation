import convertToHex from "./convertToHex.js"
import reverseBufferByteOrder from "./reverseBufferByteOrder.js"
const getTimestamp=()=>{
    return reverseBufferByteOrder(convertToHex(new Date().getTime())).toString("hex")
}
export default getTimestamp