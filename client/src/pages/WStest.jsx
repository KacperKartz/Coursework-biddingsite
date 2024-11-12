import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function WebSocketComponent({ productID }) {
  const [auctionState, setAuctionState] = useState({ highestBid: 0, highestBidder: null });
  const [newBid, setNewBid] = useState();
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

      if (updatedAuctionState.auctionEnded) {
        // Notify the winner that they have indeed won. Also notify the losers about the winner
        if (user && updatedAuctionState.winner === user.username) {
          
          toast.success(`Congratulations! You won the auction with a bid of £${updatedAuctionState.highestBid}`);
        } else {
          toast.info(`Auction ended! Winner: ${updatedAuctionState.winner} with a bid of £${updatedAuctionState.highestBid}`);
        }
      } else {
        setAuctionState({
          highestBid: parseFloat(updatedAuctionState.highestBid).toFixed(2),
          highestBidder: updatedAuctionState.highestBidder || 'No bids yet.',
        });

        setNewBid(parseFloat(updatedAuctionState.highestBid) + 2);
      }
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
      toast.warning("You must be logged in to bid.");
      return;
    }

    if (auctionState.highestBidder === user.username) {
      toast.info("You are already the highest bidder.");
      return;
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const bidData = {
        bid: Number(newBid),
        bidder: user.username,
      };

      socketRef.current.send(JSON.stringify(bidData));
      console.log('Bid placed:', bidData);
      toast.success("Bid placed successfully!");
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
        onChange={(e) => setNewBid(parseFloat(e.target.value).toFixed(2))}
        placeholder={(parseFloat(auctionState.highestBid) + 2).toFixed(2)}
        min={(parseFloat(auctionState.highestBid) + 1).toFixed(2)} // Ensures bid is higher than current highest bid
        disabled={!user} // Disable if user is not available aka not logged in
      />
      <button onClick={placeBid} disabled={!user}>Place Bid</button>
    </div>
  );
}

export default WebSocketComponent;
