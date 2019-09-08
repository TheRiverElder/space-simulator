

class Vector {

    static ZERO = new Vector(0, 0);

    static ONE = new Vector(1, 1);

    static get zero() {
        return new Vector(0, 0);
    }

    static get one() {
        return new Vector(1, 1);
    }


    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(vec) {
        return (this === vec) || (this.x === vec.x && this.y === this.y);
    }


    add(vec) {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    sub(vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }

    mul(val) {
        return new Vector(this.x * val, this.y * val);
    }

    div(val) {
        return new Vector(this.x / val, this.y / val);
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    sqrMag() {
        return (this.x * this.x + this.y * this.y);
    }

    normalize() {
        let angle = this.angle();
        return angle === null ? Vector.zero :new Vector(Math.cos(angle), Math.sin(angle));
    }

    angle() {
        return (0 === this.x === this.y) ? null : Math.atan2(this.y, this.x);
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    sqrDistance(vec) {
        let dx = vec.x - this.x;
        let dy = vec.y - this.y;
        return (dx * dx + dy * dy);
    }

    distance(vec) {
        let dx = vec.x - this.x;
        let dy = vec.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    opposite() {
        return new Vector(-this.x, -this.y);
    }



    addSelf(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    subSelf(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    mulSelf(val) {
        this.x *= val;
        this.y *= val;
        return this;
    }

    divSelf(val) {
        this.x /= val;
        this.y /= val;
        return this;
    }

    normalizeSelf() {
        let angle = this.angle();
        if (angle !== -1) {
            this.x = Math.cos(angle);
            this.y = Math.sin(angle);
        }
        return this;
    }

    oppositeSelf() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    toString() {
        return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
}