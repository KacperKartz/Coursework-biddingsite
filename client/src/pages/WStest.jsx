import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

function WebSocketComponent({ productID }) {
  const [auctionState, setAuctionState] = useState({ highestBid: 0, highestBidder: null });
  const [newBid, setNewBid] = useState('');
  const socketRef = useRef(null);

  // Getting the username from redux
  const user = useSelector((state) => state.appUser.user);

  useEffect(() => {
    console.log("Opening WebSocket connection for productID:", productID);
    // Open WebSocket connection for the given product 
    socketRef.current = new WebSocket(`ws://localhost:3000/?productID=${productID}`);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection opened for product:", productID);
    };

    socketRef.current.onmessage = (event) => {
      const updatedAuctionState = JSON.parse(event.data);
      console.log("Auction Update:", updatedAuctionState);

      setAuctionState({
        highestBid: updatedAuctionState.highestBid,
        highestBidder: updatedAuctionState.highestBidder || 'No bids yet.',
      });

      // Automatically set newBid to something (2 in this case) above the current highestBid
      setNewBid(updatedAuctionState.highestBid + 2);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [productID]); // Reconnect if the productID changes

  const placeBid = () => {
    if (!user || !user.username) {
      alert('User not available. Please log in to place a bid.');
      return;
    }

    if (auctionState.highestBidder === user.username) {
      alert('You are already the highest bidder.');
      return;
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const bidData = {
        bid: Number(newBid),
        bidder: user.username,
      };

      socketRef.current.send(JSON.stringify(bidData));
      console.log('Bid placed:', bidData);
    } else {
      console.log('WebSocket is not open');
    }
  };

  return (
    <div>
      <h2>Live Auction {productID}</h2>
      <p>Current highest bid: £{auctionState.highestBid}</p>
      <p>Highest bidder: {auctionState.highestBidder}</p>

      <input
        type="number"
        value={newBid}
        onChange={(e) => setNewBid(e.target.value)}
        placeholder="Enter your bid"
        min={auctionState.highestBid + 1} // Ensures bid is higher than current highest bid
        disabled={!user} // Disable if user is not available aka not logged in
      />
      <button onClick={placeBid} disabled={!user}>Place Bid</button>
    </div>
  );
}

export default WebSocketComponent;
