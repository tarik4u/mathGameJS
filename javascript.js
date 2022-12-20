var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

// if we click on the start/ reset 
document.getElementById("startReset").onclick = function(){

    if(playing == true){    //if we are playing 
        
        location.reload();  //reload page
    
    } else {                //if we are not playing 
        //change mode to playing
        playing = true;
        
        //set score to 0
        score = 0;          
        
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        show("timeremaining");
        timeRemaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        
        //hide game over box 
        hide("gameOver");
        
        //change button to reset
        document.getElementById("startReset").innerHTML = "Reset Game";  
        
        //start the countdown 
        startCountDonw();
        
        // generate new Q&A:
        generateQA();
        
    }
}
//clicking on an answer box
for(i=1;i<5;i++){
        document.getElementById("box" + i).onclick = function(){
        //check if we are playing
        if(playing == true){//yes
            if(this.innerHTML == correctAnswer){
               //correct answer
                
                //increment 
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                
                //hide wrong ans show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                
                //generate new Q&A
                generateQA();
               }else{
                //wrong answer
                 hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
               }
            
        }
    }

}




//if we click on answer box 
//        if we are playing
//          correct?
//              yes
//                  increase score
//                        show correct box for 1sec
//                    generate new Q&A
//                    show try again box for 1sec

//functions----------------------------------------------------------------
//1) start counter
function startCountDonw(){
    action = setInterval(function(){
        timeRemaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        if(timeRemaining == 0){
            //if gameOver
            stopCountDonw();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p> Game Over !</p><p>Your Score is " + score + ".</p>";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML= "Start Game";
            
        }
    },1000);
}
//2) stop counter
function stopCountDonw(){
    clearInterval(action);
}
//3) hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
//4) show an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers:
function generateQA(){
    var x = 1 + Math.round(9*Math.random()); //generate a number between 1-10;
    var y = 1 + Math.round(9*Math.random()); //generate a number between 1-10;
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3*Math.random()); 
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
     //fill box with the wrong answers
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            
            do 
            {
                 wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random())); //a wrong answer
                  }while(answers.indexOf(wrongAnswer)>-1)
            
            document.getElementById("box"+i).innerHTML= wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}









