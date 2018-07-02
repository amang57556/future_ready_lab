//Setup is run once at the beginning before we draw
canvasX=640;
canvasY=480;
function setup(){
    createCanvas(canvasX,canvasY);
    frameRate(10000);
}

var canvasY;

var circle={
    diameter:25,
    xCoor: 0,
    yCoor:10,
    color:[255,255,0],
    ySpeed:1,
    xSpeed:2
}

function draw(){
    //These if statements modify the properties of the circle, which is then drawn
    //If the x coordinate is outside of the canvas' bounds, then reverse the x-axis direction and change the circle's color
    if(circle.xCoor>canvasX || circle.xCoor<0){
        circle.color=randomColor();
        circle.xSpeed = -circle.xSpeed;
    }
    //If the y coordinate is outside of the canvas' bounds, then reverse the y-axis direction and change the circle's size
    if(circle.yCoor>canvasY || circle.yCoor<0){
        circle.ySpeed = -circle.ySpeed;
        circle.diameter=random(25,100);
    }
    
    //The circle is drawn as specified by the circle object
    fill(circle.color);
    ellipse(circle.xCoor+=circle.xSpeed, circle.yCoor+=circle.ySpeed, circle.diameter);
}

//Returns a random color, in the form of a array with values for Red, Green, Blue
function randomColor(){
    return [random(0,255),random(0,255),random(0,255)];
}
