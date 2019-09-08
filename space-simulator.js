

class Star {

    static idCounter = 0;

    constructor({id = (Star.idCounter++), mass = 100, density = 1, position = Vector.zero, velocity = Vector.zero, color = '#FFFFFF'}) {
        this.id = id;
        this.mass = mass;
        this.density = density;
        this.position = position;
        this.velocity = velocity;
        this.color = color;

        this.radius = Math.sqrt(this.mass / this.density / Math.PI);
        this.exist = true;
        this.alive = true;
        this.force = Vector.zero;
        this.deltaMass = 0;

        this.spaceManager = null;
        this.tail = new Record(100, CONFIG.RECORD_STEP);
    }

    die() {
        this.alive = false;
    }

    update(dt) {
        //console.log(`#${this.id} @ ${this.position} v ${this.velocity} r${this.radius} m${this.mass}`);
    }

    interact(other) {
        if (!this.alive) {
            return;
        }
        let direction = other.position.sub(this.position);
        let distance = direction.mag();
        //console.log('direction = ', direction);
        //console.log('distance = ', distance);
        if (distance <= ((this.radius + other.radius) / 2)) {
            let newMass = this.mass + other.mass;
            let newVelocity = this.velocity.mul(this.mass).add(other.velocity.mul(other.mass)).div(newMass);
            let bigger = (this.density > other.density || this.mass > other.mass) ? this : other;
            let smaller = bigger === other ? this : other;

            smaller.die();
            bigger.deltaMass += smaller.mass;
            bigger.velocity = newVelocity;
            return;
        }

        let gravityValue = CONFIG.G * (this.mass * other.mass / this.position.sqrDistance(other.position));
        let gravityAtSelf = direction.normalize().mul(gravityValue);
        this.force.addSelf(gravityAtSelf);
        other.force.addSelf(gravityAtSelf.opposite());
    }

    lateUpdate(dt) {
        if (!this.alive) {
            this.exist = false;
            return;
        }
        this.mass += this.deltaMass;
        this.deltaMass = 0;
        this.radius = Math.sqrt(this.mass / this.density / Math.PI);

        let acc = this.force.div(this.mass);
        this.velocity.addSelf(acc.mul(dt));
        this.force = Vector.zero;
        this.position.addSelf(this.velocity);
        this.tail.push(this.position.copy());
    }
}

class SpaceManager {
    constructor(refresher) {
        this.stars = [];
        this.staticStars = [];
        this.newBornStars = [];
        this.refresher = refresher;
    }

    born(star) {
        star.spaceManager = this;
        this.newBornStars.push(star);
    }

    add(staticStar) {
        staticStar.spaceManager = this;
        this.staticStars.push(staticStar);
    }

    update(dt) {
        this.staticStars.forEach(staticStar => {
            this.stars.forEach(star => staticStar.interact(star));
        });
        this.stars.forEach(star => star.update(dt));
        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];
            for (let j = i + 1; j < this.stars.length; j++) {
                //console.log(`i = ${i}, j = ${j}`);
                star.interact(this.stars[j]);
            }
        }
        this.stars.forEach(star => star.lateUpdate(dt));
        this.stars.push(...this.newBornStars);
        this.newBornStars.splice(0, this.newBornStars.length);
        this.stars = this.stars.filter(star => star.exist);
        //console.log(`stars[${this.stars.length}]: `, this.stars.slice());

        if (this.refresher) {
            this.refresher(this);
        }
    }

}


class StaticStar extends Star {

    constructor(config) {
        super(config);
    }

    interact(other) {
        let direction = other.position.sub(this.position);
        let distance = direction.mag();
        if (distance <= (this.radius + other.radius)) {
            let newMass = this.mass + other.mass;
            let newVelocity = this.velocity.mul(this.mass).add(other.velocity.mul(other.mass)).div(newMass);
            let bigger = this;
            let smaller = other;

            smaller.die();
            bigger.deltaMass += smaller.mass;
            bigger.velocity = newVelocity;
            return;
        }
        let gravityValue = CONFIG.G * (this.mass * other.mass / this.position.sqrDistance(other.position));
        let gravityAtSelf = direction.normalize().mul(gravityValue);
        this.force.addSelf(gravityAtSelf);
        other.force.addSelf(gravityAtSelf.opposite());
    }

    lateUpdate(dt) {
        this.exist = true;
    }
}