const modifyBlockHeader =(blockHeader, nonce , nonceAllocation , maxNonce)=>{
    
    let newBlockHeader = blockHeader ;
    newBlockHeader.nonceRange = [nonce , nonce+nonceAllocation] 
    
    return newBlockHeader
} 
export default modifyBlockHeader 