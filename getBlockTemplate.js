import axios from "axios";

const getBlockTemplate=()=>{
    const BODY={
        jsonrpc: "2.0",
        method: "getblocktemplate",
        params: [{rules: ["segwit"]}],
        id: "getblock.io"
        }
    const URL="https://btc.getblock.io/4b8f4003-8aa3-416d-9c08-167262bc2940/mainnet/"
    return axios.post(URL,BODY)
}
export default getBlockTemplate