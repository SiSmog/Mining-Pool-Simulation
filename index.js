import {io} from "socket.io-client"
import mine from "./mine.js";

// const socket = io("http://192.168.1.4:3000");
const socket = io("http://localhost:3000");

socket.on("connect",()=>{
    
      socket.on('end', () => {
        console.log("close");
        socket.close()

      })
})
socket.on('header', (args) => {
  const blockHeader = args["header"]
  console.log(blockHeader)
  var resultingHash=mine(blockHeader)
  if(resultingHash){
    console.log("emitting");
    socket.emit("solution", { "solution" : resultingHash  })
  }
  else{
    socket.emit("reallocate")

  }

})