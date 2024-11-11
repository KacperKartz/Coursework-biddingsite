const express = require('express');
const { Client } = require('pg');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const basketRoutes = require('./routes/basketRoutes');
const BasketModel = require('./models/basketModel');
const axios = require('axios');




const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
require('dotenv').config();


/// Enpoints
app.use('/api/', userRoutes, productRoutes);
app.use('/basket', basketRoutes);

const api = process.env.API

/// websocket
const wss = new WebSocket.Server({ port:3000 });
const auctions = {};


///// Function for finializing auctions after they end -
// Logs the winner, adds item to basket, sends broadcast to all connected clients.
const finalizeAuction = async (productId) => {
    const auction = auctions[productId];

    if (auction.highestBidder) {
        console.log(`Auction ended for product ${productId}. Winner: ${auction.highestBidder}`);

        try {
            /// Grabbing the user id
            const response = await axios.post(`${api}api/user/${auction.highestBidder}`);
            
            if (!response.data.userId) {
                console.error(`User not found: ${auction.highestBidder}`);
                return;
            }

            const userId = response.data.userId;

            // Add item to basket for the winning user
            await addItemToBasket(userId, productId);

            // Broadcast the auction result to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.productId === productId) {
                    client.send(JSON.stringify({ auctionEnded: true, winner: auction.highestBidder, highestBid: auction.highestBid }));
                }
            });

        } catch (error) {
            console.error("Failed to finalize auction:", error);
        }
    } else {
        console.log(`Auction ended for product ${productId} with no bids.`);
    }

    // Remove auction from active list
    delete auctions[productId];
};


///// Function to add the item to basket after winning the auction.
const addItemToBasket = async (userId, productId) => {
    const auction = auctions[productId];
    try {
        const basketId = await BasketModel.findOrCreateBasket(userId); 
        await BasketModel.addItem(basketId, productId, 1,auction.highestBid);
        console.log(`Product ${productId} added to basket of user ${userId}`);
    } catch (error) {
        console.error("Failed to add item to basket:", error);
    }
};


//////// Function for grabbing the price of the corresponding item for the auction.
// so that instead of having the price 0 / some preset value it will be dependant on the original item.
const getProductPrice = async (productId) => {
    try {
      const response = await axios.get(`${api}api/products/${productId}`);
      return parseFloat(response.data.price); 
    } catch (error) {
      console.error(`Failed to fetch product price for product ${productId}:`, error);
      return null;
    }
  };

  /// Had to make an auciton initializer 
  const initializeAuction = async (productId) => {
    if (auctions[productId]) {

      return auctions[productId];
    }
  
    try {
      const priceValue = await getProductPrice(productId);
      const startingBid = priceValue * 0.25;
      console.log(`Starting bid for product ${productId}:`, startingBid);
  

      auctions[productId] = {
        highestBid: startingBid,
        highestBidder: null,
        auctionEnds: Date.now() + 60000, // auction timer - in a real case it would use db which is set up with auction endings but for demo purposes this is 6sec
      };
  

      setTimeout(() => finalizeAuction(productId), 60000);
  
      return auctions[productId];
    } catch (error) {
      console.error(`Failed to initialize auction for product ${productId}:`, error);
      return null;
    }
  };


  ///// Websocket server management
  wss.on('connection', async (ws, req) => {
    /// Connecting the client to the product auciton
    const productId = new URLSearchParams(req.url.split('?')[1]).get('productID');
    console.log('New client connected for product', productId);
  
    ws.productId = productId;
    // Init the auction
    const auctionState = await initializeAuction(productId);
  
    /// Basic bidding logic 
    if (auctionState) {
      ws.send(JSON.stringify(auctionState));
  
      ws.on('message', (message) => {
        const bidData = JSON.parse(message);
  

        if (bidData.bid > auctionState.highestBid) {
          auctionState.highestBid = bidData.bid;
          auctionState.highestBidder = bidData.bidder;
  

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client.productId === productId) {
              client.send(JSON.stringify(auctionState));
            }
          });
        }
      });
  
      ws.on('close', () => {
        console.log('Client disconnected');
      });
    } else {
      ws.send(JSON.stringify({ error: 'Auction initialization failed.' }));
      ws.close();
    }
  });







  ///////   The code below was set up prior to the db,model,controller,route infrastructure.

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

////////////////////////////////////////////////////////////////////////////////////////////////////////


//// Just to check the server is running 
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});