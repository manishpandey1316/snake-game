//variables
var snake=[{x:0,y:0}]
const a=20
const b=20
var board=document.getElementsByClassName("board")[0]
var lastPaint=0;
var speed=4;
var direction='D'
var foodx=10;
var foody=10;
var gameOver=false;
var currentScore=0
const start=document.getElementById("start")
var scoreSection=document.getElementById("score-sec")
var HighScoreSection=document.getElementById("HighScore-sec")
var data=localStorage.getItem("highscore")
var highScore;
//audio
const foodAudio=new Audio("/music/food.mp3")
const overAudio=new Audio("/music/gameover.mp3")
const moveAudio=new Audio("/music/move.mp3")
const musicAudio=new Audio("/music/music.mp3")

if(data===null)
{
    highScore=0
    localStorage.setItem('highscore',JSON.stringify(highScore))
}
else{
    highScore=JSON.parse(data)

    HighScoreSection.innerHTML=`HighScore: ${highScore}`
}
// functions
const generateFood=()=>
{
    
    while(1){
        flag=0;
        foodx=Math.round(Math.random()*a);
        foody=Math.round(Math.random()*b);
        
        snake.forEach((ele)=>
        {
            if(ele.x===foodx && ele.y===foody)
            {
                flag=1;
            }
        })
        if(flag===0)
        {
            board.innerHTML=""
            displaySnake()
            let food=document.createElement("div")
            food.style.gridRowStart=foody
            food.style.gridColumnStart=foodx
            food.classList.add("food")
            board.appendChild(food)
            break;
        }
    }
      
}
const movingSnake=()=>
{
    for(let i=snake.length-1;i>=1;i--)
    {
        snake[i]={...snake[i-1]};
    }
    if(direction==='D')
    {
        snake[0].y+=1;
    }
    else if(direction==='L')
    {
        snake[0].x-=1;
    }
    else  if(direction==='R')
    {
        snake[0].x+=1;
    }
    else{
        snake[0].y-=1;
    }
    
    if(!collide())
    {
        overAudio.play();
        musicAudio.pause()
        gameOver=true;
        alert("Game over")     
        return;
    }
    if(snake[0].x===foodx && snake[0].y===foody)
    {
        foodAudio.play()
        currentScore+=1;
        scoreSection.innerHTML=`Score: ${currentScore}`
        if(highScore<currentScore)
        {
            highScore=currentScore;
            localStorage.setItem('highscore',JSON.stringify(highScore))
            HighScoreSection.innerHTML="HighScore: "+highScore
        }
        snake.unshift({x:foodx,y:foody})
        generateFood()
    }
}

const displaySnake=()=>
{
    board.innerHTML=""
    snake.forEach((ele,ind)=>{
        let head=document.createElement("div")
        head.style.gridRowStart=ele.y;
        head.style.gridColumnStart=ele.x;
        if(ind===0)
       {
        head.classList.add("head")
       }
       else{
        head.classList.add("tail")
       }
        board.appendChild(head)
       }) 
       let food=document.createElement("div")
       food.style.gridRowStart=foody
       food.style.gridColumnStart=foodx
       food.classList.add("food")
       board.appendChild(food)
}

const collide=()=>
{
   
    if(snake[0].x<0 || snake[0].x>a || snake[0].y<0 || snake[0].y>b)
    { 
        
        return false;
    }
   for(let i=1;i<snake.length;i++)
   {
   
     if((snake[i].x===snake[0].x && snake[i].y===snake[0].y))
     {
        
        return false;
     }
   }
   return true;
}


const gameEngine=()=>
{

    movingSnake()
    displaySnake()

}
const main=(ctime)=>
{
   
     if((ctime-lastPaint)/1000>(1/speed))
     {
        lastPaint=ctime;
        if((ctime-lastPaint)/1000>10)
        {
            speed+=1;
        }
        if(!gameOver)
         {gameEngine();}
         else
         {
            gameOver=false;
           
            snake=[]
            snake.push({x:0,y:0})
            board.innerHTML=""
            direction='D'
            currentScore=0
            return;
         }
     }     
  window.requestAnimationFrame(main)
}
//main logic

document.addEventListener("keydown", function(event) {
    moveAudio.play() 
    switch(event.key) {
      case "ArrowUp":
        direction='U'
        break;
      case "ArrowDown":
        direction='D'
        break;
      case "ArrowLeft":
        direction='L'
        break;
      case "ArrowRight":
        direction='R'
        break;
      default:
        // Handle other key presses
        break;
    }
  });

  //controls
  const Up=document.getElementsByClassName("up")[0]
  const Down=document.getElementsByClassName("down")[0]
  const Right=document.getElementsByClassName("right")[0]
  const Left=document.getElementsByClassName("left")[0]
  Up.addEventListener('click',()=>
  {
     direction='U'    
  })
  Down.addEventListener('click',()=>
  {
     direction='D'    
  })
  Left.addEventListener('click',()=>
  {
     direction='L'    
  })
  Right.addEventListener('click',()=>
  {
     direction='R'    
  })
  
  start.addEventListener('click',()=>
  {
    musicAudio.play()
    musicAudio.volume=0.5
       displaySnake();
       main()
  })