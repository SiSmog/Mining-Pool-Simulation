import getBlockTemplate from "./getBlockTemplate.js";
import buildBlockHeader from "./buildBlockHeader.js";
import express from "express";
import http from 'http'
import { version } from "os";
import { Server } from "socket.io";



var nonceAllocation=2**20
getBlockTemplate().then((res)=>{
    const block=res.data.result
    var header=buildBlockHeader(block)
    var nonce=0
    console.log(header)
})
const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

