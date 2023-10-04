const reverseBufferByteOrder = (buffer) => {
    const reversedBuffer = Buffer.alloc(buffer.length);
  
    for (let i = 0, j = buffer.length - 1; i < buffer.length; i++, j--) {
      reversedBuffer[i] = buffer[j];
    }
  
    return reversedBuffer;
};
export default reverseBufferByteOrder