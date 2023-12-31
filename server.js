import getBlockTemplate from "./getBlockTemplate.js";
import buildBlockHeader from "./buildBlockHeader.js";
import express from "express";
import http from 'http'
import { Server } from "socket.io";
import modifyBlockHeader from "./modifyBlockHeader.js"; 
import blockExample from "./blockExample.json" assert {type: 'json'};

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
var block=null
try{
  const res=await getBlockTemplate()
  block=res.data.result
}catch(error){
  block=blockExample.result;
}

var header=buildBlockHeader(block,extraNonce)

console.time("time")

const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log("worker connected")
  sendHeader(socket)
  socket.on('reallocate', () => {
    sendHeader(socket)
  });
  socket.on('solution', (args) => {
    console.log("Solution:",args["solution"]);
    io.emit('end');
    io.close();
    console.timeEnd("time")
  });
  socket.on('disconnect', () => {
    console.log('worker disconnected');
  });

});


server.listen(3000, () => {
  console.log('listening on *:3000');
});