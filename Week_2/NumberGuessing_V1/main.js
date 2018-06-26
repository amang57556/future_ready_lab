/*eslint-env browser*/
var totalGuesses = 1;
function playGame(){

    alert("First  enter a low number, then a high number. Then, Guess a random number between them.");

    //Gets the Low and High Bounds
    //Uses parseInt() to make sure we have numbers not strings
    
    
    var from = parseInt(prompt("Enter the lower bound."));
    //Keeps asking for a new Lower Bound
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
            fromSatisfiesRequirements=true;
        }
    }
    
    
    var to = parseInt(prompt("Enter the higher bound."));
    //Keeps asking for a new Upper Bound
    var toSatisifiesRequirements=false;
    while(!toSatisifiesRequirements){
        if(!doesStringContainANumber(to)){
            //It's not a number
            to = prompt("Higher Bound value not a number, enter a number for the higher bound");
        }
        else if(!isNumberInRange(to,0,1000)){
            //It's a number though not in range
            to = prompt("Higher Bound value not in range 0 to 1000, enter a new one")
        }
        else{
            //Well it's a number and in range, stop annoying them for a number
            toSatisifiesRequirements = true;
        }
    }
    
    
    //If the lower bound is greater than or equal to the upper bound keep asking for the higher bound
    while(from>=to){
        if(from>=to){
            to = prompt("Higher Bound value too low, make sure higher bound greater than "+from);
        }
        else if(to>1000){
            to = prompt("Higher Bound value not in range 0 to 1000, enter a new one");
        }
    }
    

    //Get an Integer between [from,to]
    //Math.random() returns decimals, so round returns an integer from the decimal
    var target = Math.round(Math.random() * (to - from) + from);

    var currentGuess = parseInt(prompt("Guess a number between " + to + " and " + from));

    //var totalGuesses = 1;
    
    
    //Loop until user guesses correct number
    while (currentGuess !== target){
        if(currentGuess < target){
            currentGuess = parseInt(prompt("Enter a higher number"));

            totalGuesses++;
        }

        else if(currentGuess > target){
            currentGuess = parseInt(prompt("Enter a lower number"));
            totalGuesses++;
        }
        
        var guessSatisfiesRequirements = false;
        
        while(!guessSatisfiesRequirements){
            if(!doesStringContainANumber(currentGuess)){
                currentGuess = prompt("Guess is not a number, enter a guess that's a number");
            }
            else if(!isNumberInRange(currentGuess,from,to)){
                    currentGuess = prompt("Guess is not in between "+from+" and "+to+", enter a new number that is in this range");
            }
            else{
                guessSatisfiesRequirements = true;
            }        
        }
    }

    alert("It took "+ totalGuesses +" tries to guess the correct number");
}

//Basically returns whether or not 
function doesStringContainANumber(value){
    //Parse Int returns NaN if it's not a number, then it's converted to true because NaN(false) if not a number
    return !isNaN(parseInt(value));
}

function isNumberInRange(number,lowerRangeBound,upperRangeBound){
    return ((number>lowerRangeBound)&&(number<upperRangeBound))
}