'use strict'

export default class Vector{
	constructor(x = 1, y = 0){
        this.setX(x);
        this.setY(y);
	}
	setX(value){
		this._x = value;
	}
	setY(value){
		this._y = value;
	}
    getX(){
        return this._x;
    }
    setY(value){
        this._y = value;
    }
    getY(){
        return this._y;
    }
    setAngle(angle){
        var length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    }
    getAngle(){
        return Math.atan2(this._y, this._x);
    }
    setLength(length){
        var angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    }
    getLength(){
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
    add(v2){
        new Vector(this._x + v2.getX(), this._y + v2.getY());
    }
    subtract(v2){
        return new Vector(this._x - v2.getX(), this._y - v2.getY());
    }
    mulitply(val){
        return new Vector(this._x * val, this._y * val);
    }
    divide(val){
        return new Vector(this._x / val, this._y / val);
    }
    addTo(v2){
        this._x += v2.getX();
        this._y += v2.getY();
    }
    subtractFrom(v2){
        this._x -= v2.getX();
        this._y -= v2.getY();
    }
    multiplyBy(val){
        this._x *= val;
        this._y *= val;
    }
    divideBy(val){
        this._x /= val;
        this._y /= val;
    }
}