var buttons=document.getElementsByTagName('button');
for(var i=0;i<buttons.length;i++){
    var currentButton=buttons[i];
    currentButton.addEventListener('click',printXorZero);  //Callback func
}
var flag=true;
var count=0;
var isGameEnd=false;

function reset(){
    clearInterval(interval);
    countDown=5;
    isGameEnd=false;
    flag=true;
    count=0;
    for(var i=0;i<buttons.length;i++){
        buttons[i].innerText='';
    }
    document.getElementById('output').innerText='';
}

function isNotBlank(currentButton){
  return currentButton.innerText.trim().length>0;  
}
function isThreeSame(first,second,third){
    if(isNotBlank(first) && isNotBlank(second) && isNotBlank(third)){
        return (first.innerText==second.innerText && first.innerText==third.innerText)
    }
    return false;
}

function isGameOver(){
 return isThreeSame(buttons[0],buttons[1],buttons[2]) ||   //first row
        isThreeSame(buttons[3],buttons[4],buttons[5]) ||   //second row    
        isThreeSame(buttons[6],buttons[7],buttons[8]) ||    //third row
        isThreeSame(buttons[0],buttons[3],buttons[6]) ||    //first col 
        isThreeSame(buttons[1],buttons[4],buttons[7]) ||    //second col
        isThreeSame(buttons[2],buttons[5],buttons[8]) ||     //third col
        isThreeSame(buttons[0],buttons[4],buttons[8]) ||     //left diag
        isThreeSame(buttons[2],buttons[4],buttons[6]);      //right diag
}

var countDown=5;
var interval;
function waitFor5Sec(){
       //Async
       interval=setInterval(function(){
        document.getElementById('output').innerText=`Game Over and Game will resume in ${countDown} Sec`;
        countDown--;
       },1000);

       setTimeout(reset,6000);
}

function  printXorZero(){
     //this -keyword
     //Current calling object reference
     var currentButton=this;
    //   <button> Inner Text</button>
    if( !isGameEnd && currentButton.innerText.trim().length==0)
    {
        count++;
        var value=flag?"X":"0";
        currentButton.innerText=value;

        flag=!flag;
        if(count>4){
            if( isGameOver()){
                // alert('Game over');
                isGameEnd=true;
                // document.getElementById('output').innerText='Game Over ans Game will reasume in 5 Sec';
                waitFor5Sec();
            }
        }
    }
}