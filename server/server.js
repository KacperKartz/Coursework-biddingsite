const express = require('express');
const { Client } = require('pg');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');





const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
require('dotenv').config();

app.use('/api/', userRoutes, productRoutes);

/// websocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ port:3000 });
const auctions = {};

let currentAuction = {
  highestBid: 0,
  highestBidder: null,
  auctionEnds: null,
}

wss.on('connection', (ws, req) => {
    const productId = new URLSearchParams(req.url.split('?')[1]).get('productID');
    console.log('New client connected ', productId);

    ws.productId = productId;

    if (!auctions[productId]) {
        auctions[productId] = { highestBid: 0, highestBidder: null };
    }   

    // Send current auction state to the newly connected client
    ws.send(JSON.stringify(auctions[productId]));

    ws.on('message', (message) => {
        const bidData = JSON.parse(message);

        // Validate if the new bid is higher than the current highest bid
        if (bidData.bid > auctions[productId].highestBid) {
            auctions[productId] = {
                highestBid: bidData.bid, 
                highestBidder: bidData.bidder,
            };

            // Broadcast the new highest bid to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.productId === productId) {
                    client.send(JSON.stringify(auctions[productId]));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});



// // Connecting to the database
// const client = new Client({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: String(process.env.PASSWORD),
//   port: process.env.PORT,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });


//  client.connect();






//  //// endpoint for getting users
//  app.get('/users', async (req, res) => {
//     try {
//       const result = await client.query('SELECT * FROM users');
//       res.json(result.rows); // Send the result as JSON
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Server Error');
//     }
//   });


  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});