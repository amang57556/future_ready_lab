/*eslint-env browser*/
function playGame(){

    alert("First  enter a low number, then a high number. Then, Guess a random number between them.");

    //Gets the Low and High Bounds
    //Uses parseInt() to make sure we have numbers not strings
    var from = parseInt(prompt("Enter the lower bound."));

    var to = parseInt(prompt("Enter the higher bound."));

    //Get an Integer between [from,to]
    //Math.random() returns decimals, so round returns an integer from the decimal
    var target = Math.round(Math.random() * (to - from) + from);

    var currentGuess = parseInt(prompt("Guess a number between " + to + " and " + from));

    var totalGuesses = 1;
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
    }

    alert("It took "+ totalGuesses +" tries to guess the correct number");
}