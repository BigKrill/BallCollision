class Line{
  constructor(_pointX, _pointY, _normalX, _normalY, _lineLength){
    this.pointX = _pointX
    this.pointY = _pointY
    this.normalX = _normalX
    this.normalY = _normalY
    this.lineLength = _lineLength

    this.lineVector = createVector(this.lineLength, this.lineLength)
    this.lineNormal = createVector(0,1)
  }
  
  render(){
    this.angleCalcs()

    stroke(50)
    strokeWeight(2)

    line(this.normalX, this.normalY , this.pointX , this.pointY );

    strokeWeight(5)

    line(this.pointX - this.rotatedLinePoint.x, this.pointY - this.rotatedLinePoint.y,
        this.pointX + this.rotatedLinePoint.x, this.pointY + this.rotatedLinePoint.y );
  }

  angleCalcs(){
    this.angle = atan2((this.normalY-this.pointY), (this.normalX-this.pointX))
    this.rotatedLinePoint = this.lineVector.copy().rotate(this.angle+45)
    this.rotatedNormalPoint = this.lineNormal.copy().rotate(this.angle+90)

    if ((this.angle+90) % 90 == 0){
      if(this.angle+90 == 90 || this.angle+90 == 270){
        this.rotatedNormalPoint.y = 0
      }
      if(this.angle+90 == 0 || this.angle+90 == 180){
        this.rotatedNormalPoint.x = 0
      }
    }
  }
}

