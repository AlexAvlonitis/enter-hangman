import React, { Component } from 'react';
import './Index.css';

export default class Index extends Component {
  componentDidMount = () => {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.drawHanger()
  }

  drawHanger = () => {
    this.ctx.beginPath();
    this.ctx.fillRect(50, 50, 15, 250);
    this.ctx.moveTo(55, 100);
    this.ctx.lineTo(100, 55);
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
    this.ctx.fillRect(50, 50, 170, 15);
    this.ctx.fillRect(210, 50, 15, 50);
  }

  render() {
    return(
      <canvas id="myCanvas" width="400" height="300">
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    )
  }
}