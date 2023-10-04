const calculateFees=(transactions)=>{
    let fees=0;
    transactions.forEach(transaction => {
        fees+=transaction.fee
    });
    return fees;
}
export default calculateFees