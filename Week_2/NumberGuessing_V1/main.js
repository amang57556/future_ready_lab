/*eslint-env browser*/
//var totalGuesses = 1;
function playGame(){

    alert("First  enter a low number, then a high number. Then, Guess a random number between them.");

    //Gets the Low and High Bounds
    //Uses parseInt() to make sure we have numbers not strings
    
    
    var from = parseInt(prompt("Enter a lower bound, that is in between 0 and 1000"));
    //Keeps asking for a new Lower Bound, until it gets one that satisifes all requierments
    var fromSatisfiesRequirements=false;
    while(!fromSatisfiesRequirements){
        if(!doesStringContainANumber(from)){
            //It's not a number
            from = prompt("Lower Bound value not a number, enter a number for the lower bound");
        }
        else if(!isNumberInRange(from,0,1000)){
            //It's a number though not in range
            from = prompt("Lower Bound value not in range 0 to 1000, enter a new one")
        }
        else{
            //Welql it's a number and in range, stop annoying them for a number
            fromSatisfiesRequirements=true;
        }
    }
    
    
    var to = askForANumber("Enter a higher bound, that's between "+from+" and 1000");
    //Keeps asking for a new Upper Bound, until it gets one that satisfies all requirements
    var toSatisifiesRequirements=false;
    while(!toSatisifiesRequirements){
        if(!doesStringContainANumber(to)){
            //It's not a number
            to = askForANumber("Higher Bound value not a number, enter a number for the higher bound");
        }
        else if(!isNumberInRange(to,0,1000)){
            //It's a number though not in range
            to = askForANumber("Higher Bound value not in range "+from+" to 1000, enter a new one")
        }
        else{
            //Well it's a number and in range, stop annoying them for a number
            toSatisifiesRequirements = true;
        }
    }
    
    
    //If the lower bound is greater than or equal to the upper bound keep asking for the higher bound
    while(from>=to){
        if(from>=to){
            to = askForANumber("Higher Bound value too low, make sure higher bound greater than "+from);
        }
        else if(to>1000){
            to = askForANumber("Higher Bound value not in range 0 to 1000, enter a new one");
        }
    }
    

    //Get an Integer between [from,to]
    //Math.random() returns decimals, so round returns an integer from the decimal
    var target = randomInteger(from,to);

    var currentGuess = askForANumber("Guess a number between " + to + " and " + from);

    var totalGuesses = 1;
    
    
    //Loop until user guesses correct number
    while (currentGuess !== target){
        if(currentGuess < target){
            currentGuess = parseInt(prompt("Enter a higher number than "+currentGuess));

            totalGuesses++;
        }

        else if(currentGuess > target){
            currentGuess = parseInt(prompt("Enter a lower number than "+currentGuess));
            totalGuesses++;
        }
        
        
        
        //Keeps looping if currentGuess doesn't satsify requirements until it does
        var guessSatisfiesRequirements = false;
        while(!guessSatisfiesRequirements){
            if(!doesStringContainANumber(currentGuess)){
                currentGuess = askForANumber("Guess is not a number, enter a guess that's a number");
            }
            else if(!isNumberInRange(currentGuess,from,to)){
                    currentGuess = askForANumber("Guess " + currentGuess + " is not in between "+from+" and "+to+", enter a new number that is in this range");
            }
            else{
                guessSatisfiesRequirements = true;
            }        
        }
    }

    alert("It took "+ totalGuesses +" tries to guess the correct number");
}

function askForANumber(question){
    return parseInt(prompt(question));
}

function randomInteger(lowestNumber, highestNumber){
   return Math.round(Math.random() * (highestNumber - lowestNumber) + lowestNumber);
}

//Basically returns whether or not 
function doesStringContainANumber(value){
    //If it's not a number isNaN() returns true, so invert the result for the string containing a number
    return !isNaN(value);
}

function isNumberInRange(number,lowerRangeBound,upperRangeBound){
    //Basically is the number is both greater than the lower range bound, and smaller than the upper range bound it returns true; for everything else it returns false
    return ((number>lowerRangeBound)&&(number<upperRangeBound))
}