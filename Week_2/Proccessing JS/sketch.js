//Setup is run once at the beginning before we draw
var shapeList = [];
//An Array containing the background color, value changed in setup
var backgroundColor = [255,0,255];
function setup(){
    backgroundColor = randomColor();
    background(backgroundColor);
    createCanvas(promptForANumber("the width of the canvas"),promptForANumber("the height of the canvas"));
    frameRate(100);
    shapeList = makeRandomAmountOfRandomShapes();
    //This is to ensure the collision library works
    rectMode(CORNER);
    ellipseMode(CENTER);
    
}

var maximumSpeed = 20;

function Shape(x,y,dimensions,color,xSpeed,ySpeed,typeShape){
    this.dimensions=[dimensions];
    this.color=color || [0,0,0];//Default color black, if no value
    this.xCoor=x;
    this.yCoor=y;
    this.xSpeed=xSpeed || 5;
    this.ySpeed=ySpeed || 7;
    this.xSpeedIncrement = 1;
    this.ySpeedIncrement = 1;
    //Coded Value for Shape
    /*
        Number -> Name_Shape [What Elements in Dimension Represent]
        1 -> Circle [Diameter]
        2 -> Square [Side Length]
        3 -> Rectangle [Width, Height]
    */
    this.typeShape = typeShape || 1;
}

function draw(){
    //Clears the trails, by redrawing the background color on top
    background(backgroundColor);
    
    //Barrier Collision Loops
    //This loop goes through every index in the list, and basically handles barrier collisions
    for(var i = 0; i<shapeList.length; i++){
        //These if statements modify the properties of the circle, which is then drawn
        //If the x coordinate is outside of the canvas' bounds, then reverse the x-axis direction and change the circle's color
        if(shapeList[i].xCoor>width || shapeList[i].xCoor<0){
            shapeList[i].color=randomColor();
            
            
            if(Math.abs(shapeList[i].xSpeed)>maximumSpeed){
                shapeList[i].xSpeedIncrement=-shapeList[i].xSpeedIncrement;
            }
            
            if(Math.abs(shapeList[i].ySpeed)>maximumSpeed){
                shapeList[i].ySpeedIncrement=-shapeList[i].ySpeedIncrement;
            }
            //Make Sure the sign change orients the ball back into the canvas
            if(shapeList[i].xCoor<0 && shapeList[i].xSpeed<0){
                shapeList[i].xSpeed = -shapeList[i].xSpeed;
                shapeList[i].xSpeed = changeMagnitude(shapeList[i].xSpeed,shapeList[i].xSpeedIncrement);
                shapeList[i].ySpeed = changeMagnitude(shapeList[i].ySpeed,shapeList[i].ySpeedIncrement);
            }
            else if(shapeList[i].xCoor>width && shapeList[i].xSpeed>0){
                shapeList[i].xSpeed = -shapeList[i].xSpeed;
                shapeList[i].xSpeed = changeMagnitude(shapeList[i].xSpeed,shapeList[i].xSpeedIncrement);
                shapeList[i].ySpeed = changeMagnitude(shapeList[i].ySpeed,shapeList[i].ySpeedIncrement);
            }
        }
        //If the y coordinate is outside of the canvas' bounds, then reverse the y-axis direction and change the circle's size
        if(shapeList[i].yCoor>height || shapeList[i].yCoor<0){
            shapeList[i].dimensions[0]=randomInteger(25,100);
            shapeList[i].xSpeed = changeMagnitude(shapeList[i].xSpeed,shapeList[i].xSpeedIncrement);
            shapeList[i].ySpeed = changeMagnitude(shapeList[i].ySpeed,shapeList[i].ySpeedIncrement);
            
            if(Math.abs(shapeList[i].xSpeed)>maximumSpeed){
                shapeList[i].xSpeedIncrement=-shapeList[i].xSpeedIncrement;
            }
            
            if(Math.abs(shapeList[i].ySpeed)>maximumSpeed){
                shapeList[i].ySpeedIncrement=-shapeList[i].ySpeedIncrement;
            }
            //Make Sure the sign change orients the ball back into the canvas
            if(shapeList[i].yCoor<0 && shapeList[i].ySpeed<0){
                shapeList[i].ySpeed = -shapeList[i].ySpeed;
            }
            else if(shapeList[i].yCoor>height && shapeList[i].ySpeed>0){
                shapeList[i].ySpeed = -shapeList[i].ySpeed;
            }
        }
       
    }
    
    //Iterates through every single ball, and for each ball iterates through the balls after that
    //This ensures that we can check collisions for every possible set of balls
    for(var shapeIteration = 0; shapeIteration<shapeList.length; shapeIteration++){
        //So we have a ball, now we want to iterate over every ball further ahead than it
        //One added to index of previous ball so that the loop doesn't go over it
        for(var shape2Iteration = shapeIteration+1; shape2Iteration<shapeList.length;shape2Iteration++){
            var inContact=shapesInContact(shapeList[shapeIteration],shapeList[shape2Iteration]);
            if(inContact){
                //Handle Them Being in Contact
                var rightBall = shapeList[shapeIteration];//Initializes the first ball to be treated as the right ball
                var leftBall = shapeList[shape2Iteration];//Initialized the second ball to be treated as the left ball
                
                
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
                    rightBall = shapeList[shape2Iteration];
                    leftBall = shapeList[shapeIteration];
                }
                
                //The Goal is to get the right ball going to the right, and the left ball going to the left, so they "bounce" off each other
                if(rightBall.xSpeed<0){
                    rightBall.xSpeed = -rightBall.xSpeed;
                }
                if(leftBall.xSpeed>0){
                    leftBall.xSpeed = -leftBall.xSpeed;
                }
                
                var higherBall = shapeList[shapeIteration];//Initializes the first ball to be treated as the higher ball
                var lowerBall = shapeList[shape2Iteration];//Initialized the second ball to be treated as the lower ball
                
                if(higherBall.yCoor<lowerBall.yCoor){
                    //Basically if the "upper" is lower than the "lower", then swap the two variables around
                    higherBall = shapeList[shape2Iteration];
                    lowerBall = shapeList[shapeIteration];
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
    for(var i = 0; i<shapeList.length; i++){
        fill(shapeList[i].color);
        if(shapeList[i].typeShape == 1){
            ellipse(shapeList[i].xCoor+=shapeList[i].xSpeed, shapeList[i].yCoor+=shapeList[i].ySpeed, shapeList[i].dimensions[0]);
        }
        else{            
            rect(shapeList[i].xCoor+=shapeList[i].xSpeed,shapeList[i].yCoor+=shapeList[i].ySpeed,shapeList[i].dimensions[0],heightOfShape(shapeList[i]));
        }
    }
    
}

//Returns a random color, in the form of a array with values for Red, Green, Blue
function randomColor(){      
    return [randomInteger(0,255),randomInteger(0,255),randomInteger(0,255)];
}

//Provides a random shape 
function randomSizeShape(shape){
    if(shape.typeShape!=3){
        //Basically if it ain't a rectangle
        shape.dimensions[0]=[random(0,50)];
    }
    else{
        shape.dimensions[0]=[random(0,50),random(0,50)];
    }
}

//Returns an array of random balls
function makeRandomAmountOfRandomShapes(){
     amountOfShapes = 0;
    //The list is of the potential amount of balls we want, and then the random picture randomly picks a number to make
    var listOfPotentialShapeNumbers=[2,5,10,16];
    amountOfShapes = randomInteger(listOfPotentialShapeNumbers);
    
    
    //Loops the amount of times that there are balls to make, creating a random ball each iteration
    var shapeList=[];
    for(var i = 0; i<amountOfShapes; i++){
        shapeList.push(makeRandomShape());
    }
    //Returns the list of balls
    return shapeList;
}

//Makes A Totally Random Ball
function makeRandomShape(){
    var typeShape = random([1,2,3]);
    var dimensions=[];
    if(typeShape!=3){
        dimensions = [randomInteger(1,50)];
    }
    else{
        dimensions = [randomInteger(1,50),randomInteger(1,50)];
    }
    return new Shape(randomInteger(0,width),randomInteger(0,height),dimensions,randomColor(),randomInteger(-5,5),randomInteger(-5,5),typeShape);
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




/*
The library collide 2d for p5 provides a lot of different collision checkers

This essentially uses the shape objects and plugs them in and gets the result
*/
function shapesInContact(shape1,shape2){
    //Checks for different combinations of shapes to use the collide 2d library's functions
    if(shape1.typeShape == 1 && shape2.typeShape == 1){
        return collideCircleCircle(shape1.xCoor,shape1.yCoor,shape1.dimensions[0],shape2.xCoor,shape2.yCoor,shape2.dimensions[0]);
    }
    else if((shape1.typeShape == 2 || shape1.typeShape == 3) && shape2.typeShape == 1){
        //If Shape 1 is a rectangle/square and Shape 2 is a circle then use rect circle with their dimensions  
        
        var heightRect = heightOfShape(shape1);//This variable is needed, because the array may or may not have a height value, thus the "height" must be determined based on shape size
        
        return collideRectCircle(shape1.xCoor,shape1.yCoor,shape1.dimensions[0],heightRect,shape2.xCoor,shape2.yCoor,shape2.dimensions[0]);
    }
    
    else if((shape2.typeShape == 2 || shape2.typeShape == 3) && shape1.typeShape == 1){
        //If Shape 2 is a rectangle/square and Shape 1 is a circle then use rect circle with their dimensions    
        var heightRect = heightOfShape(shape2);//This variable is needed, because the array may or may not have a height value, thus the "height" must be determined based on shape size
        
        return collideRectCircle(shape2.xCoor,shape2.yCoor,shape2.dimensions[0],heightRect,shape1.xCoor,shape1.yCoor,shape1.dimensions[0]);
    }
    else if((shape1.typeShape == 2 || shape1.typeShape == 3) && (shape2.typeShape == 2 || shape2.typeShape == 3)){
        //Basically both are rectangles
        var heightRect1 = heightOfShape(shape1);//This variable is needed, because the array may or may not have a height value, thus the "height" must be determined based on shape size
        var heightRect2 = heightOfShape(shape2);//This variable is needed, because the array may or may not have a height value, thus the "height" must be determined based on shape size
        
        return collideRectRect(shape1.xCoor,shape1.yCoor,shape1.dimensions[0],heightRect1,shape2.xCoor,shape2.yCoor,shape2.dimensions[0],heightRect2);
    }
    else{
        return false;
    }    
}
//Basically since some shapes don't have a height it returns back the width(whcih for like squares is the height too)
function heightOfShape(shape){
    if(shape.typeShape == 1 || shape.typeShape == 2){
        return shape.dimensions[0];
    }
    else{
        
        return shape.dimensions[1];
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

//Basically whatever direction the base is, the sign of the addition determines whether the "magnitude" of the number stays the same
/*
(-20,1) -> -21
(-20,-1) -> -19
(20,1) -> 21
(20,-1) -> 19
*/
function changeMagnitude(base,addition){
    if(addition>0){
            if(base>0){
                return base+addition;   
            }
            else if(base<0){
                return base-addition;
            }
            else{
                return addition;
            }        
    }
    else if(addition<0){
            if(base>0){
                return base+addition;
            }
            else if(base<0){
                return base-addition;
            }
            else{
                return addition;
            }
    }
    else{
            return base;
    }
}