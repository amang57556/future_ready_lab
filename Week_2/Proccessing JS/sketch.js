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
            ballList[i].xSpeed = -ballList[i].xSpeed;
        }
        //If the y coordinate is outside of the canvas' bounds, then reverse the y-axis direction and change the circle's size
        if(ballList[i].yCoor>height || ballList[i].yCoor<0){
            ballList[i].ySpeed = -ballList[i].ySpeed;
            ballList[i].diameter=random(25,100);
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
                
                var notCollidingByAxis = circlesMovingAway(ballList[ballIteration],ballList[ball2Iteration]);//Basically if they ain't moving away from each other, they colliding
                if(!notCollidingByAxis[0]){
                    console.log("Some balls ain't colling on the x-axis");
                    //If the two balls aren't moving away make them
                    //For the X-Axis ONLY
                    ballList[ball2Iteration].xSpeed=-ballList[ball2Iteration].xSpeed;//Sets it to the later one to avoid messing up any previous changes to speeds
                    
                }
                if(!notCollidingByAxis[1]){
                    //If the two balls aren't moving away make them
                    //For the Y-Axis ONLY
                    console.log("Some balls ain't colling on the y-axis");
                    ballList[ball2Iteration].ySpeed=-ballList[ball2Iteration].ySpeed;//Sets it to the later one to avoid messing up any previous changes to speeds
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
    return [random(0,255),random(0,255),random(0,255)];
}

//Returns an array of random balls
function makeRandomAmountOfBalls(){
     amountOfBalls = 0;
    //The list is of the potential amount of balls we want, and then the random picture randomly picks a number to make
    var listOfPotentialBallNumbers=[2,5,10,16];
    amountOfBalls = random(listOfPotentialBallNumbers);
    
    
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
    return new Ball(random(0,width),random(0,height),random(0,100),randomColor(),random(-5,5),random(-5,5));
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
//Determines whether circle is moving away or towards each other, returns boolean array for x and y axis
function circlesMovingAway(ball1,ball2){
    return [circleMovingAwayOnOneAxis(ball1.xCoor,ball1.xSpeed,ball2.xCoor,ball2.xSpeed),circleMovingAwayOnOneAxis(ball1.yCoor,ball1.ySpeed,ball2.yCoor,ball2.ySpeed)];
}

//For One Axis, determines whether the circles are moving toward or away from each other
//Designed to be a helper function of circlesMovingAway
function circleMovingAwayOnOneAxis(ball1Pos,ball1Speed,ball2Pos,ball2Speed){
    if(ball1Pos>ball2Pos){
        //There's only one way to move away, for the right one to move right, and the left one to move left. So the code returns true for that, else it returns false
        if(ball1Speed>=0 && ball2Speed<=0){
            return true;
        }
        else{
            return false;
        }
    }
    //There's only one way to move away, for the right one to move right, and the left one to move left. So the code returns true for that, else it returns false. 
    //It's the same idea for these two statements, just that the right ball is different so the code is slightly different
    else if(ball2Pos<ball1Pos){
        if(ball2Speed>=0 && ball1Speed<=0){
            return true;
        }
        else{
            return false;
        }    
    }
    else{
    //The goal is to get them going different directions, so if they're going the same direction they ain't moving away
        
            if(
           (ball1Speed>0 && ball2Speed>0)
            ||
           (ball1Speed<0 && ball2Speed<0)
           )
           {
            return false;       
           }
            else{
                return true;
            }
        
    }
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