import getBlockTemplate from "./getBlockTemplate.js";
import buildBlockHeader from "./buildBlockHeader.js";
import express from "express";
import http from 'http'
import { version } from "os";
import { Server } from "socket.io";
import modifyBlockHeader from "./modifyBlockHeader.js"; 


const maxNonce = 2**32
var nonceAllocation=2**20
var nonce=0
const res=await getBlockTemplate()
const block=res.data.result
var header=buildBlockHeader(block)

const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  var result = modifyBlockHeader(header,nonce,nonceAllocation,maxNonce)
  nonce += nonceAllocation
  
  socket.emit("hello", { "a" : result  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// io.on('', (socket) => {
//   socket.on("success", () => {
//     socket.broadcast.emit('end');
//   });
// });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

