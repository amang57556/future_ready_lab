
//Setup is run once at the beginning before we draw
var ballList = [];
//An Array containing the background color, value changed in setup
var backgroundColor = [255,0,255];
function setup(){
    backgroundColor = randomColor();
    background(backgroundColor);
    createCanvas(promptForANumber("the width of the canvas"),promptForANumber("the height of the canvas"));
    frameRate(100);
    ballList = makeRandomAmountOfBalls();
    
}



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
            
            //Make Sure the sign change orients the ball back into the canvas
            if(ballList[i].xCoor<0 && ballList[i].xSpeed<0){
                ballList[i].xSpeed = -ballList[i].xSpeed;
            }
            else if(ballList[i].xCoor>width && ballList[i].xSpeed>0){
                ballList[i].xSpeed = -ballList[i].xSpeed;
            }
        }
        //If the y coordinate is outside of the canvas' bounds, then reverse the y-axis direction and change the circle's size
        if(ballList[i].yCoor>height || ballList[i].yCoor<0){
            ballList[i].diameter=randomInteger(25,100);
            
            //Make Sure the sign change orients the ball back into the canvas
            if(ballList[i].yCoor<0 && ballList[i].ySpeed<0){
                ballList[i].ySpeed = -ballList[i].ySpeed;
            }
            else if(ballList[i].yCoor>height && ballList[i].ySpeed>0){
                ballList[i].ySpeed = -ballList[i].ySpeed;
            }
        }
       
    }
    
    //Iterates through every single ball, and for each ball iterates through the balls after that
    //This ensures that we can check collisions for every possible set of balls
    for(var ballIteration = 0; ballIteration<ballList.length; ballIteration++){
        //So we have a ball, now we want to iterate over every ball further ahead than it
        //One added to index of previous ball so that the loop doesn't go over it
        for(var ball2Iteration = ballIteration+1; ball2Iteration<ballList.length;ball2Iteration++){
            var inContact=circlesInContact(ballList[ballIteration],ballList[ball2Iteration]);
            if(inContact){
                //Handle Them Being in Contact
                var rightBall = ballList[ballIteration];//Initializes the first ball to be treated as the right ball
                var leftBall = ballList[ball2Iteration];//Initialized the second ball to be treated as the left ball
                
                //These two statements average out the speed of the two colliding balls if they aren't even and set it to their speed
                //It may seem weird to make them positive, but the bottom part takes care of that by ensuring they are diverging after their collision
                if(Math.abs(rightBall.xSpeed)!==Math.abs(leftBall.xSpeed)){
                    var avgXSpeed = (Math.abs(rightBall.xSpeed)+Math.abs(leftBall.xSpeed))/2;
                    rightBall.xSpeed=avgXSpeed;
                    leftBall.xSpeed=avgXSpeed;
                }
                
                if(Math.abs(rightBall.ySpeed)!==Math.abs(leftBall.ySpeed)){
                    var avgYSpeed = (Math.abs(rightBall.ySpeed)+Math.abs(leftBall.ySpeed))/2;
                    rightBall.ySpeed=avgYSpeed;
                    leftBall.ySpeed=avgYSpeed;
                }
                
                if(rightBall.xCoor<leftBall.xCoor){
                    //Basically if the "right" is to the left of the left, then swap the two variables around
                    rightBall = ballList[ball2Iteration];
                    leftBall = ballList[ballIteration];
                }
                
                //The Goal is to get the right ball going to the right, and the left ball going to the left, so they "bounce" off each other
                if(rightBall.xSpeed<0){
                    rightBall.xSpeed = -rightBall.xSpeed;
                }
                if(leftBall.xSpeed>0){
                    leftBall.xSpeed = -leftBall.xSpeed;
                }
                
                var higherBall = ballList[ballIteration];//Initializes the first ball to be treated as the higher ball
                var lowerBall = ballList[ball2Iteration];//Initialized the second ball to be treated as the lower ball
                
                if(higherBall.yCoor<lowerBall.yCoor){
                    //Basically if the "upper" is lower than the "lower", then swap the two variables around
                    higherBall = ballList[ball2Iteration];
                    lowerBall = ballList[ballIteration];
                }
                
                //The Goal is to get the higher ball going up, and the lower ball going down, so they "bounce" off each other
                if(higherBall.ySpeed<0){
                    higherBall.ySpeed = -higherBall.ySpeed;
                }
                if(lowerBall.ySpeed>0){
                    lowerBall.ySpeed = -lowerBall.ySpeed;
                }
                
            }    
        }
        
        
    }
    
    //Now that all the barrier/ball collisions have been handled, this loop draws each circle
    for(var i = 0; i<ballList.length; i++){
         fill(ballList[i].color);
        ellipse(ballList[i].xCoor+=ballList[i].xSpeed, ballList[i].yCoor+=ballList[i].ySpeed, ballList[i].diameter);
    }
    
}

//Returns a random color, in the form of a array with values for Red, Green, Blue
function randomColor(){      
    return [randomInteger(0,255),randomInteger(0,255),randomInteger(0,255)];
}

//Returns an array of random balls
function makeRandomAmountOfBalls(){
     amountOfBalls = 0;
    //The list is of the potential amount of balls we want, and then the random picture randomly picks a number to make
    var listOfPotentialBallNumbers=[2,5,10,16];
    amountOfBalls = randomInteger(listOfPotentialBallNumbers);
    
    
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
    return new Ball(randomInteger(0,width),randomInteger(0,height),randomInteger(0,100),randomColor(),randomInteger(-5,5),randomInteger(-5,5));
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





function circlesInContact(ball1,ball2){
    //If the sum of the radii of the two balls is less than the distance between their centers, then they're colliding
    //Equal then they're touching
    //Greater than the sum and they are away
    
    //If they're colliding OR touching this returns true
    var sumOfRadii = (ball1.diameter+ball2.diameter)/2;
    var distanceBetweenCircles = distancePoints(ball1.xCoor,ball1.yCoor,ball2.xCoor,ball2.yCoor);
    //Basically if they're apart then they aren't colliding, if they touch or intersect they're colliding
    if(distanceBetweenCircles>sumOfRadii){
        return false;
    }
    else{
        return true;
    }
}

function distancePoints(x1,y1,x2,y2){
    //Basically, splits the distance formula into two parts
    //Finds the squared distance, then returns this value after square rooting it
    //So it returns distance
    var distanceSquared = Math.pow((x2-x1),2) + Math.pow((y2-y1),2);
    return Math.sqrt(distanceSquared);
}

//Proccessing random, returns a random float in range so this basically just converts the random number to a actual integer
function randomInteger(low,up){
    return parseInt(random(low,up));
}