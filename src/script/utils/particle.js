'use strict'
import Vector from './vector';

export default class Particle{
	constructor(x, y, speed, direction, gravity=0){
		this.position = new Vector(x, y);
		this.savedPosition = this.position;
		this.velocity = new Vector(0, 0);
		this.velocity.setLength(speed);
		this.velocity.setAngle(direction);
		this.gravity = new Vector(0, gravity);
	}
	accelerate(accelation){
		this.velocity.addTo(accelation);
	}
	update(){
		this.savedPosition = this.position;
		this.position.addTo(this.velocity);
		this.velocity.addTo(this.gravity);
	}
}