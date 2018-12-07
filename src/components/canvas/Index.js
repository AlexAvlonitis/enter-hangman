import React, { Component } from 'react';
import './Index.css';

export default class Index extends Component {
  componentDidUpdate = (prevProps) => {
    if (prevProps.level !== this.props.level)
      this.clearHangman();

    if (prevProps.tries !== this.props.tries)
      switch (this.props.tries) {
        case 6:
          break;
        case 5:
          this.drawHead();
          break;
        case 4:
          this.drawBody();
          break;
        case 3:
          this.drawRightArm();
          break;
        case 2:
          this.drawLeftArm();
          break;
        case 1:
          this.drawRightLeg();
          break;
        case 0:
          this.drawLeftLeg();
          this.drawRIP();
          break;
        default:
          alert('You broke the hangman');
          window.location.reload();
      }
  }

  clearHangman = () => {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawHanger();
  }

  drawLeftArm = () => {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.moveTo(218, 170);
    this.ctx.lineTo(200, 210);
    this.ctx.stroke();
  }

  drawRightArm = () => {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.moveTo(218, 168);
    this.ctx.lineTo(238, 210);
    this.ctx.stroke();
  }

  drawLeftLeg = () => {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.moveTo(218, 245);
    this.ctx.lineTo(190, 270);
    this.ctx.stroke();
  }

  drawRightLeg = () => {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.moveTo(218, 245);
    this.ctx.lineTo(248, 270);
    this.ctx.stroke();
  }

  drawHead = () => {
    this.ctx.beginPath();
    this.ctx.lineWidth = 4;
    this.ctx.arc(218, 130, 30, 0, Math.PI * 2, true); // Outer circle
    this.ctx.moveTo(110, 75);
    this.ctx.stroke();
  }

  drawBody = () => {
    this.ctx.beginPath();
    this.ctx.fillRect(214, 160, 10, 90);
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

  drawRIP = () => {
    this.ctx.beginPath();
    this.ctx.font = "30px Arial";
    this.ctx.fillText("RIP", 300, 50);
  }

  componentDidMount () {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.drawHanger();
  }

  showCategory() {
    const { category } = this.props;

    return category.split('').map((c, i) => i === 0 ? c.toUpperCase() : c).join('')
  }

  render() {
    const { tries, level, score } = this.props;

    return(
      <div>
        <h3>
          Category: {this.showCategory()}
        </h3>
        <canvas id="myCanvas" width="400" height="300">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        <h3>Tries: {tries}, Level: {level}, Score: {score}</h3>
      </div>
    )
  }
}