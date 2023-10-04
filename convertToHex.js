const convertToHex=(number,length=null)=>{
    number=number.toString(16);
    if(number.length%2!=0){
        number="0"+number;
    }
    let buffer=Buffer.from(number,"hex");
    if(length==null||length==buffer.length){
        return buffer
    }else{
        let zeroString = '';
        for (let i = 0; i < length-buffer.length; i++) {
            zeroString += '00';
        }
        return Buffer.concat([
            Buffer.from(zeroString,"hex"),
            Buffer.from(number,"hex"),
        ])
    }
}
export default convertToHex;