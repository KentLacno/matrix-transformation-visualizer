let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

let centerX = windowWidth/2
let centerY = windowHeight/2

const white = "rgb(240,240,240)"
const blue = "rgb(59, 153, 184)"
let matrix = [[1, 1],[0,1]]

var ctx = document.getElementById("grid").getContext("2d");

let old_transform, new_transform
new EasyPZ(document.getElementById("grid"), function(transform) {
    if (old_transform === null) {
      old_transform = transform
    }

    new_transform = transform
    console.log(old_transform,new_transform)
});

setInterval(function() {
  if (old_transform !== new_transform) {
    drawGrid(new_transform.scale, new_transform.translateX, new_transform.translateY);
  }
}, 10)

function Line (x1,y1,x2,y2, color, width = 3) {
  this.x1 = x1
  this.y1 = y1
  
  this.x2 = x2
  this.y2 = y2

  this.color = color
  this.width = width

  this.draw = function() {
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

window.onresize = function() {
  windowWidth = window.innerWidth 
  windowHeight = window.innerHeight 

  centerX = windowWidth/2
  centerY = windowHeight/2
  drawGrid(1,0,0)
}

function distanceFormula(x,y) {
  return Math.sqrt(x**2 + y**2)
}

function matrixVectorMultiply(matrix) {
  let result_1 = function(x,y){
    return matrix[0][0]*x+matrix[0][1]*y
  }
  let result_2 = function(x,y) {
    return matrix[1][0]*x+matrix[1][1]*y
  }
  return [result_1,result_2]
}

function drawGrid(scale, translateX, translateY) {
  if (scale < 0.4) {scale = 0.4}
  ctx.canvas.width  = windowWidth
  ctx.canvas.height = windowHeight
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save(); 				
  ctx.transform(scale, 0, 0, scale, translateX, translateY);


  let noOfLines = parseInt(windowWidth/5)
  let noOfPixels = parseInt(windowWidth*10)
  console.log(noOfPixels)
  let x_axis = new Line(
    centerX-noOfPixels,
    centerY,
    centerX+noOfPixels, 
    centerY, "grey", 2)
  x_axis.draw()

  let y_axis = new Line(
    centerX,
    centerY+noOfPixels,
    centerX,
    centerY-noOfPixels, "grey", 2)
  y_axis.draw()


  console.log(noOfLines)
  for (let i=-1*noOfLines; i<=noOfLines; i++) {
    if (i !== 0) {
      let x_line = new Line(
        centerX + 100*i,
        centerY+noOfPixels, 
        centerX + 100*i,
        centerY-noOfPixels, "grey", 2)
      x_line.draw()
  
      let y_line = new Line(
        centerX-noOfPixels, 
        centerY - 100*i,
        centerX + noOfPixels,  
        centerY-100*i, "grey" , 2)
      y_line.draw()
    }
   
    let x_sub_line = new Line(
      centerX + 50 + 100*i,
      centerY+noOfPixels, 
      centerX + 50 + 100*i,
      centerY -noOfPixels, "grey", 1)
      x_sub_line.draw()

    let y_sub_line = new Line(
      centerX-noOfPixels, 
      centerY -50 - 100*i,
      centerX + noOfPixels,  
      centerY -50 -100*i, "grey" , 1)
      y_sub_line.draw()
  }
  
  if (matrix) {
    let transformed_x_axis = new Line(
      centerX-(noOfPixels*matrix[0][0]),
      centerY+(noOfPixels*matrix[0][1]), 
      centerX+(noOfPixels*matrix[0][0]), 
      centerY-(noOfPixels*matrix[0][1]), white)

    transformed_x_axis.draw()

    let transformed_y_axis = new Line(
      centerX-(noOfPixels*matrix[1][0]),
      centerY+(noOfPixels*matrix[1][1]), 
      centerX+(noOfPixels*matrix[1][0]), 
      centerY-(noOfPixels*matrix[1][1]), white)

    transformed_y_axis.draw()


    // for (let i=-1*noOfLines; i<=noOfLines+1; i++) {
    //   if (i==0) continue

    //   // //vertical line- parallel to y axis / j-hat / green line
    //   // let transformed_x_line = new Line(
    //   //   centerX-(noOfPixels*matrix[1][0])+(100*matrix[0][0]*i),
    //   //   centerY+(noOfPixels*matrix[1][1]) , 
    //   //   centerX+(noOfPixels*matrix[1][0])+(100*matrix[0][0]*i), 
    //   //   centerY-(noOfPixels*matrix[1][1]), blue)

    //   // //horizontal line - parallel to x axis / i-hat / red line
    //   // let transformed_y_line = new Line(
    //   //   centerX-(noOfPixels*matrix[0][0]),
    //   //   centerY+(noOfPixels*matrix[0][1]) +(100*matrix[1][1]*i), 
    //   //   centerX+(noOfPixels*matrix[0][0]), 
    //   //   centerY-(noOfPixels*matrix[0][1]) + (100*matrix[1][1]*i), blue)

    //         //vertical line- parallel to y axis / j-hat / green line
    //   let transformed_x_line = new Line(
    //     centerX-(noOfPixels*matrix[1][0])+(100*matrix[0][0]*i),
    //     centerY+(noOfPixels*matrix[1][1]) , 
    //     centerX+(noOfPixels*matrix[1][0])+(100*matrix[0][0]*i), 
    //     centerY-(noOfPixels*matrix[1][1]), blue)

    //   //horizontal line - parallel to x axis / i-hat / red line
    //   let transformed_y_line = new Line(
    //     centerX-(noOfPixels*matrix[0][0]),
    //     centerY+(noOfPixels*matrix[0][1]) + (100*distanceFormula(matrix[1][0],matrix[1][1])*i), 
    //     centerX+(noOfPixels*matrix[0][0]), 
    //     centerY-(noOfPixels*matrix[0][1]) + (100*distanceFormula(matrix[1][0],matrix[1][1])*i), blue)

    //   // matrix  [[2,-1][2,1]]
    //   transformed_x_line.draw()
    //   transformed_y_line.draw()
    // }

    i_hat = new Line(centerX,centerY, centerX+(100*matrix[0][0]), centerY-(100*matrix[0][1]), "red")
    j_hat = new Line(centerX,centerY, centerX+(100*matrix[1][0]), centerY-(100*matrix[1][1]), "green")

    i_hat.draw()
    j_hat.draw()

    let determinant =matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]

    let multipliedVector = matrixVectorMultiply(matrix)

    console.log(multipliedVector[0])
    console.log(multipliedVector[0](0, 100), multipliedVector[1](0, 100))
    // let transformed_x_line = new Line(
      // centerX + multipliedVector[0](100*1),
      // centerY + multipliedVector[1](noOfPixels), 
      // centerX + multipliedVector[0](100*1), 
      // centerY - multipliedVector[1](noOfPixels), blue)

    //horizontal line - parallel to x axis / i-hat / red line
    let transformed_y_line = new Line(
      centerX + 100,
      centerY,
      centerX+multipliedVector[0](100, 100),
      centerY-multipliedVector[1](100, 100), blue)

    // matrix  [[2,-1][2,1]]
    // transformed_x_line.draw()
    transformed_y_line.draw()
  }
  ctx.restore();
}

function transform() {
  let matrix11 = document.getElementById("i-hat-x").value;
  let matrix12 = document.getElementById("i-hat-y").value;
  let matrix21 = document.getElementById("j-hat-x").value;
  let matrix22 = document.getElementById("j-hat-y").value;
  
  let initial_matrix=[...matrix]

  let final_matrix = [[matrix11, matrix12], [matrix21, matrix22]]
  
  let i=0
  
  let transformInterval = setInterval(function() {
    i += .01
    let matrix11_keyframe = initial_matrix[0][0] + (final_matrix[0][0]-initial_matrix[0][0])*(i**2*(3-2*i))
    let matrix12_keyframe = initial_matrix[0][1] + (final_matrix[0][1]-initial_matrix[0][1])*(i**2*(3-2*i))
    let matrix21_keyframe = initial_matrix[1][0] + (final_matrix[1][0]-initial_matrix[1][0])*(i**2*(3-2*i))
    let matrix22_keyframe = initial_matrix[1][1] + (final_matrix[1][1]-initial_matrix[1][1])*(i**2*(3-2*i))
    if (i >= 1) clearInterval(transformInterval)
    matrix = [[matrix11_keyframe,matrix12_keyframe],[matrix21_keyframe,matrix22_keyframe]]

    if (old_transform !== new_transform) {
      drawGrid(new_transform.scale, new_transform.translateX, new_transform.translateY);
    } else {
      drawGrid(1,0,0)
    }
  }, 10)
}

drawGrid(1,0,0);
