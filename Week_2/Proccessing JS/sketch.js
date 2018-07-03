//Setup is run once at the beginning before we draw
var ballList = [];
function setup(){
    createCanvas(promptForANumber("the width of the canvas"),promptForANumber("the height of the canvas"));
    frameRate(10000);
    ballList = makeRandomAmountOfBalls();
    background(backgroundColor);
}

//An Array containing the background color
var backgroundColor = [0,0,0];

function Ball(x,y,diameter,color,xSpeed,ySpeed){
    this.diameter=diameter;
    this.color=color || [0,0,0];//Default color black, if no value
    this.xCoor=x;
    this.yCoor=y;
    this.xSpeed=xSpeed || 5;
    this.ySpeed=ySpeed || 7;
}

function draw(){
    //Clears the trails, by redrawing the background color on top
    background(backgroundColor);
    
    //Barrier Collision Loops
    //This loop goes through every index in the list, and basically handles barrier collisions
    for(var i = 0; i<ballList.length; i++){
        //These if statements modify the properties of the circle, which is then drawn
        //If the x coordinate is outside of the canvas' bounds, then reverse the x-axis direction and change the circle's color
        if(ballList[i].xCoor>width || ballList[i].xCoor<0){
            ballList[i].color=randomColor();
            ballList[i].xSpeed = -ballList[i].xSpeed;
        }
        //If the y coordinate is outside of the canvas' bounds, then reverse the y-axis direction and change the circle's size
        if(ballList[i].yCoor>height || ballList[i].yCoor<0){
            ballList[i].ySpeed = -ballList[i].ySpeed;
            ballList[i].diameter=random(25,100);
        }

        //The circle is drawn as specified by the circle object
        fill(ballList[i].color);
        ellipse(ballList[i].xCoor+=ballList[i].xSpeed, ballList[i].yCoor+=ballList[i].ySpeed, ballList[i].diameter);
    }
    
}

//Returns a random color, in the form of a array with values for Red, Green, Blue
function randomColor(){      
    return [random(0,255),random(0,255),random(0,255)];
}

//Returns an array of random balls
function makeRandomAmountOfBalls(){
     amountOfBalls = 0;
    //Want to make either 2,4,8 or 16 balls, so use powers of 2
    amountOfBalls = Math.pow(2,random(0,4));
    
    
    //Loops the amount of times that there are balls to make, creating a random ball each iteration
    var ballList=[];
    for(var i = 0; i<amountOfBalls; i++){
        ballList.push(makeRandomBall());
    }
    //Returns the list of balls
    return ballList;
}

//Makes A Totally Random Ball
function makeRandomBall(){
    return new Ball(random(0,width),random(0,height),random(0,100),randomColor(),random(0,20),random(0,20));
}

//Prompts for a mumber with a reason
function promptForANumber(reason){
    //Prompts for a number for reason
    //Checks if it's a number and when it is, returns the number entered
    var response = prompt("Enter a number for "+reason);
    while(isNaN(response)){
        response = prompt("Enter a number for "+reason);
    }
    return parseInt(response);
}
