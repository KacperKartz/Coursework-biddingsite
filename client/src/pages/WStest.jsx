import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function WebSocketComponent() {
  const [auctionState, setAuctionState] = useState({ highestBid: 0, highestBidder: null });
  const [newBid, setNewBid] = useState('');

  // Get user details from Redux store
  const user = useSelector((state) => state.appUser.user);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onmessage = (event) => {
      const updatedAuctionState = JSON.parse(event.data);

      // Ensure the highestBidder is properly set from the server
      setAuctionState({
        highestBid: updatedAuctionState.highestBid,
        highestBidder: updatedAuctionState.highestBidder || 'Anonymous',
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  const placeBid = () => {
    if (!user || !user.username) {
      alert('User not available. Please log in to place a bid.');
      return;
    }

    const socket = new WebSocket('ws://localhost:3000');

    const bidData = {
      bid: Number(newBid),
      bidder: user.username, // Send the username when placing a bid
    };

    socket.onopen = () => {
      socket.send(JSON.stringify(bidData));
      socket.close();
    };
  };

  return (
    <div>
      <h2>Live Auction</h2>
      <p>Current highest bid: ${auctionState.highestBid}</p>
      <p>Highest bidder: {auctionState.highestBidder}</p>

      <input
        type="number"
        value={newBid}
        onChange={(e) => setNewBid(e.target.value)}
        placeholder="Enter your bid"
        disabled={!user} // Disable if user is not available
      />
      <button onClick={placeBid}>Place Bid</button>
    </div>
  );
}

export default WebSocketComponent;
