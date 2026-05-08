class Ball {
  constructor(_x, _y, _colour) {
    this.pos = createVector(_x, _y);
    this.r = 32;
    
    this.colour  = _colour

    this.speedX = random(-10,10)
    this.speedY = random(-30,30)
    this.gravity = 2

    this.distanceFromLine

    this.restitution = 0.7;
    this.friction = 0.01;
  }
  
  render() {  
    // stroke(this.colour, 100, 100);
    stroke(255)
    // noStroke()
    strokeWeight(1);
    // fill(this.colour, 100, 100, 0.2);
    fill(255, 0.2)
    ellipse(this.pos.x, this.pos.y, this.r * 2);

    // constant force of gravity applied to the ball
    this.speedY += this.gravity
    
    // goes through every line in the lines array to check for collision
    for(let i = 0; i < lines.length; i++){
      // puts the line points into a vector for easier readability in the function
      let linePoint = createVector(lines[i].pointX, lines[i].pointY)

      // gets the rotatedNormalPoint from the lines array to correctly multiply the speed for angled collisions
      let rotatedNormalPoint = lines[i].rotatedNormalPoint
      this.collideWithLine(linePoint, rotatedNormalPoint, i)
    }

    // adds the speed to the position of the ball so it actually moves
    this.pos.x += this.speedX
    this.pos.y += this.speedY
  }

  collideWithLine(point, rotatedNormalPoint, i){
    // gets the distance of the ball to the line
    // takes away the position of tht ball from the position of the line so the center of the line is relative to 0,0
    // also puts in the rotated normal point of the line so the function knows what angle the line is at
    this.distanceFromLine = this.dot(
      (this.pos.x - point.x), (this.pos.y - point.y), 
      rotatedNormalPoint.x, rotatedNormalPoint.y
    )

    // creates a ball push vector using the radius and distance from the line so it can be correctly pushed from a line when it hits it so it doesnt get stuck in or below the line
    
    // if the distance from the line is greater than the radius then the ball is touching the line
    // when the ball is touching the line it checks the for the collision and bounce
    let ballPush = createVector(0, this.r+this.distanceFromLine)
    if (this.distanceFromLine >= -this.r ){

      // rotates the ballPush vector so it can correctly push the ball out of any line especially angled ones
      let rotatedBallPush = ballPush.copy().rotate(lines[i].angle+90)
      this.pos.sub(rotatedBallPush)
      
      // calculates how fast the ball is moving towards a line
      var speedAlongNormal = this.dot(this.speedX, this.speedY, rotatedNormalPoint.x, rotatedNormalPoint.y)

      // calculates how fast the ball is moving parallel to a line
      var speedAlongTangent = this.dot(this.speedX, this.speedY, rotatedNormalPoint.y, -rotatedNormalPoint.x)

      if(speedAlongNormal >= 0){

        this.speedX = -(speedAlongNormal  * rotatedNormalPoint.x) * (this.restitution)
                      +(speedAlongTangent * rotatedNormalPoint.y) * (1 - this.friction);
        this.speedY = -(speedAlongNormal  * rotatedNormalPoint.y) * (this.restitution)
                      +(speedAlongTangent * -rotatedNormalPoint.x) * (1 - this.friction);
        }
    }
  }

  dot(x1, y1, x2, y2){
    let num = (x1 * x2) + (y1 * y2)
    
    return num
  }
}