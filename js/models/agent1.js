class Agent1 {

    constructor(positionX, positionY, diameter, groupIdentity, similarityWanted, plugin) {
        var options = {
            friction: 0,
            frictionAir: 0,
            restitution: 0.1,
            inertia: Infinity,
            inverseInertia: 0
        };
        this.body = Bodies.circle(positionX, positionY, diameter/2, options);
        Body.setVelocity(this.body, {x: random(-3, 3), y: random(-3, 3)}); // initial velocity
        //this.velocity = createVector(); //p5.Vector.random2D();
        this.diameter = diameter;
        this.groupIdentity = groupIdentity;
        this.similarityWanted = similarityWanted;
        // this.differenceWanted = differenceWanted
        this.neighbors = null;
        // Add to World object of Matter.js
        World.add(engine.world, this.body);
    }

    show() {
        // using p5.js render engine
        noStroke();
        fill(this.groupIdentity.color)
        // Push() and Pop() to handle transformations appropriately
        push();
        // relative to object's center
        translate(this.body.position.x, this.body.position.y);
        //rotate(this.body.angle); // do not need to rotate since they are circles
        // Drawing the circle
        ellipseMode(CENTER);
        ellipse(0, 0, this.diameter);
        pop();
    }

    interact(target) {
        var v1 = createVector(target.body.position.x, target.body.position.y);
        var v2 = createVector(this.body.position.x, this.body.position.y);
        var force = p5.Vector.sub(v1, v2);
        var dist = force.mag();
        //dist = constrain(dist, 1, 25);
        // var dSquared = force.magSq();
        var G = 0.01;
        var strength = G / (dist * dist);
        force.setMag(strength);

        // update acceleration
        if (this.groupIdentity.name == target.groupIdentity.name) {
            /*if (dist < 3 * this.diameter / 2) {
                strength = G / (dist * dist * 10);
                force.setMag(strength);
            }*/
            Body.applyForce(this.body, {x: this.body.position.x, y: this.body.position.y}, {x: force.x, y: force.y});
        } else {
            Body.applyForce(this.body, {x: this.body.position.x, y: this.body.position.y}, {x: -force.x, y: -force.y});
        }

        /*if (dist.mag() < 3 * this.diameter / 2) {
            Body.setVelocity(this.body, {x: 0, y: 0});
        } */
    }
}