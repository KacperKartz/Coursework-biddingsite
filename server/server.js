const express = require('express');
const { Client } = require('pg');
const WebSocket = require('ws');
const http = require('http');






const app = express();
const port = 3000;
require('dotenv').config();


/// websocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ port:3000 });

let currentAuction = {
  highestBid: 0,
  highestBidder: null,
  auctionEnds: null,

  
}

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send current auction state to the newly connected client
  ws.send(JSON.stringify(currentAuction));

  ws.on('message', (message) => {
    const bidData = JSON.parse(message);
    
    // Validate if the new bid is higher than the current highest bid
    if (bidData.bid > currentAuction.highestBid) {
      currentAuction.highestBid = bidData.bid;
      currentAuction.highestBidder = bidData.bidder;

      // Broadcast the new highest bid to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(currentAuction));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


// Connecting to the database
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: String(process.env.PASSWORD),
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});


 client.connect();



 //// endpoint for getting users
 app.get('/users', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM users');
      res.json(result.rows); // Send the result as JSON
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });



