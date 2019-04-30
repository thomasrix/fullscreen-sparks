'use strict';
import {create, select, throttleEvents} from '../utils/trix';
import Spark from './spark/spark';

// TODO: Make canvas fit window - include resize event to handle context size
// Try shadow effect on the balls

export default class Sparks{
	constructor(){

		let entry = select('[sparks-entry-point]');
		let container = create('div', entry, 'fullscreen-sparks-container');
        
        let canvas = create('canvas', container);
        let displayCanvas = create('canvas');
		let bounds = container.getBoundingClientRect();
		canvas.width = displayCanvas.width = bounds.width;
		canvas.height = displayCanvas.height = bounds.height;

        this.ctx = canvas.getContext('2d');
        this.dctx = displayCanvas.getContext('2d');
        this.dctx.globalAlpha = 0.9;

		this.canvas = canvas;
		this.displayCanvas = displayCanvas;
		this.sparks = [];

		this.update();
        this.canvas.addEventListener('click', this.spawn.bind(this));
        
        window.addEventListener('resize', throttleEvents(()=>{
            let bounds = container.getBoundingClientRect();
            canvas.width = displayCanvas.width = bounds.width;
            canvas.height = displayCanvas.height = bounds.height;
            this.sparks.forEach((el)=>{
                el.setBoundaries(0, 0, this.canvas.width, this.canvas.height);
            })
        }, 200))

		// this.ballImage = create('img');
		// this.ballImage.src = '../assets/images/train.svg';
		// this.shadowImage = create('img');
		// this.shadowImage.src = 'images/shadow.png';
		// this.spawn();

	}
	spawn(ev){
        console.log('spawn')
        // this.ctx.globalAlpha = 0.1;
        // this.ctx.drawImage(this.ballImage,100, 100);
		let canvasPos = this.canvas.getBoundingClientRect();
		let mousePos = {x:ev.clientX, y:ev.clientY};
		let canvasRatio = canvasPos.width / this.canvas.width;

		let x = (mousePos.x - canvasPos.left) / canvasRatio,
		y = (mousePos.y - canvasPos.top) / canvasRatio;

		for(let b = 0 ; b < 100 ; b++){
			let speed = Math.random() * 7 + 1,
			direction = Math.random() * Math.PI * 2,
			gravity = 0.2,
			radius = parseInt(Math.random() * 4) + 1;
			let spark = new Spark(x, y, speed, direction, gravity, radius);
			spark.setColor(parseInt(Math.random() * 15 + 30), Math.random() * 10 + 80);

			spark.setBoundaries(0, 0, this.canvas.width, this.canvas.height);
			this.sparks.push(spark);
		}

	}
	drawImageBall(ball){
		this.ctx.save();
		this.ctx.translate(ball.position.getX(), ball.position.getY());
		this.ctx.rotate(ball.angle.getAngle());
	 	this.ctx.drawImage(this.ballImage, -ball.radius, - ball.radius, ball.radius * 2, ball.radius * 2);
		this.ctx.rotate(-ball.angle.getAngle());
		this.ctx.drawImage(this.shadowImage, -ball.radius, - ball.radius, ball.radius * 2, ball.radius * 2);
		//this.ctx.translate(-ball.position.getX(), -ball.position.getY());
		this.ctx.restore();
	}
	drawColorBall(ball){
		// console.log('draw', this.testball);
		let color = 100,
		lightness = 80;

		this.ctx.fillStyle='hsla('+ball.hue+', 100%, '+ball.lightness+'%, 0.8)';
		 //this.ctx.shadowBlur = 30;
		 //this.ctx.shadowColor = '#FFFFFF';

		this.ctx.beginPath();
		this.ctx.arc(ball.position.getX(), ball.position.getY(), ball.radius, 0, Math.PI *2);
		this.ctx.fill();
		//this.ctx.shadowBlur = 0;

	}
	update(){
		// console.log('update', this.canvas.width, this.displayCanvas.width);
        //this.ctx.fillStyle='rgba(0, 0, 0, 0.1)';
        this.dctx.globalAlpha = 0.9;
        this.dctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.dctx.drawImage(this.canvas, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.displayCanvas, 0, 0);

		for(let i = 0, l = this.sparks.length ; i < l ; i++){
			let spark = this.sparks[i];
			if(spark.alive){
				spark.update();
				spark.checkPosition();
			 	//this.drawImageBall(spark);
			 	this.drawColorBall(spark);
			}
		}
		this.ticker = requestAnimationFrame(this.update.bind(this));	
	}
}