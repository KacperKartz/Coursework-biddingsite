import React, {useState,useRef} from 'react';
import Box from './Box';



const BentoBox = () => {
  const boxes = [
    { num: 1, text: "First Box" },
    { num: 2, text: "Second Box" },
    { num: 3, text: "Third Box" },
    { num: 4, text: "Fourth Box" },
    { num: 5, text: "Fifth Box" },
  ];

  return (
    <div className="BentoBox">
     {boxes.map((box) => (
        <Box key={box.num} num={box.num} text={box.text} />
      ))}
    </div>
  );
};

export default BentoBox;
