const modifyBlockHeader =(blockHeader, nonce , nonceAllocation , maxNonce)=>{
    if (maxNonce < nonce+nonceAllocation) {
        return false 
    }
    let newBlockHeader = blockHeader ;
    newBlockHeader.nonceRange = [nonce , nonce+nonceAllocation] 
    
    return newBlockHeader
} 
export default modifyBlockHeader 