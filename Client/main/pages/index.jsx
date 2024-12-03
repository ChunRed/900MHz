import React, { useState, useEffect, useRef } from 'react'

import ReactDOM from 'react-dom/client';
import Socket from '../src/socket.jsx';


import Link from 'next/link';
import Image from "next/image";



import "bootstrap/dist/css/bootstrap.css";
import layout from '../styles/layout.module.css';


let target_value = [0, 0, 0, 0, 0, 0, 0];
let tex = '';




function Random() {
  target_value[0] = Math.floor(Math.random()*2);
  target_value[1] = Math.floor(Math.random()*2);
  target_value[2] = Math.floor(Math.random()*2);
  target_value[3] = Math.floor(Math.random()*2);
  target_value[4] = Math.floor(Math.random()*2);
  target_value[5] = Math.floor(Math.random()*2);
  target_value[6] = Math.floor(Math.random()*2);

  for(let i=0; i<target_value.length; i++){
    tex += target_value[i];
  }

  let display = document.querySelector(".socketValue");

  display.innerHTML = tex;




}

export default function Home() {
  
  return (
    <div className="container-fluid bg-black">
      <Socket></Socket>
      <div className="row">
        <div className="h3 text-center mt-5 text-light">900Hz</div>
      </div>

      <div className="row">
        <div className="socketValue text-center text-light">{target_value}</div>
      </div>



      <div className="row mt-3">
        <div className="col text-center">
          <button className='btn btn-block btn-outline-light p-2 w-100 h4' onClick={() => { Random() }}>Random Frequency</button>
        </div>
      </div>



    </div>

  );
}
