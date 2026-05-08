let ballAmount = 10
let balls = []
let lines = []
let simulationSteps = 1

let lineLength = 100
let lowFrame = 240
let canvasWidth = 800
let canvasHeight = 500
let rotationAngle = 0

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES)
  colorMode(HSB)
  
  lines = [
    new Line(-(canvasWidth/2),0 ,-20,0, canvasWidth),
    new Line((canvasWidth/2),0 ,90,0, canvasWidth),
    new Line(0, -(canvasHeight/2),0,-20, canvasHeight),
    new Line(0, (canvasHeight/2),0, 20, canvasHeight),
    new Line(0, -200, 0, 0, 400),
  ]

  for(let i = 0; i < ballAmount; i++){
    let colour = (255/ballAmount) * i
    balls.push(new Ball(random(-canvasWidth/2, canvasWidth/2), random(-100, -200), colour))
  }

  frameRate(240)
  ///noLoop()
}

function draw() {
  background(0);
  strokeWeight(1)
  stroke(255)
  text(Math.ceil(frameRate()),20,20)
  
  if(frameRate() < lowFrame){
    lowFrame = frameRate()
  }
  text(Math.ceil(lowFrame),20,40)
  // text(balls[0].speedY,20,60)
  
  translate(canvasWidth/2, canvasHeight/2)
  // point(0,0)
  lines[4].pointX = mouseX - (canvasWidth/2)
  lines[4].pointY = mouseY - (canvasHeight/2)

  for(let i = 0; i < lines.length; i++){
    lines[i].render()
  }
  // console.log(lines[1])
  //noLoop()
  for(let i = 0; i < ballAmount; i++){
    balls[i].render()
  }
}
