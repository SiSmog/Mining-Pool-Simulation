import blockExample from "./blockExample.json" assert {type: 'json'};
import buildBlockHeader from "./buildBlockHeader.js";
import express from "express";
import http from 'http'
import { version } from "os";
import { Server } from "socket.io";
import modifyBlockHeader from "./modifyBlockHeader.js"; 

const sendHeader=(socket)=>{
  if (maxNonce < nonce+nonceAllocation) {
    extraNonce++
    nonce=0
    header=buildBlockHeader(block,extraNonce)
  }
  var result = modifyBlockHeader(header,nonce,nonceAllocation,maxNonce)
  nonce += nonceAllocation
  console.log(result)
  socket.emit("header", { "header" : result  })
}


const maxNonce = 2**32
var nonceAllocation=2**18
var nonce=0
var extraNonce=0

var header=buildBlockHeader(blockExample.result,extraNonce)

const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  sendHeader(socket)
  socket.on('reallocate', () => {
    sendHeader(socket)
  });
  socket.on('solution', (args) => {
    console.log(args["solution"]);
    io.emit('end');
    io.close();
  });
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

