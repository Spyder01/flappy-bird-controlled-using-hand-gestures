import React, {useRef, useEffect, useState} from 'react';
import BG from '../assets/images/bg.png';
import Bird from '../assets/images/bird.png';
import Fg from '../assets/images/fg.png';
import PipeNorth from '../assets/images/pipeNorth.png';
import PipeSouth from '../assets/images/pipeSouth.png';
import flySound from '../assets/sounds/fly.mp3';
import scoreSound from '../assets/sounds/score.mp3';

const Game = ({gesture, started})=>{

    const canvasRef = useRef (null);
    const [cvs, setCvs] = useState(canvasRef.current);
    const [ctx, setCtx] = useState(null);

    useEffect (()=>{
        if (canvasRef.current !== null) {
            setCvs (canvasRef.current)
            setCtx (canvasRef.current.getContext("2d"))
            //cvs.addEventListener ("keyup", moveUp)
        }
    },[canvasRef])

    var bird = new Image(); 
    var bg = new Image();   
    var fg = new Image();
    var pipeNorth = new Image();
    var pipeSouth = new Image();

    bird.src = Bird;
    bg.src = BG;
    fg.src = Fg;
    pipeNorth.src = PipeNorth;
    pipeSouth.src = PipeSouth;

    let gap = 85;
    let constant;

    let bX = 10;
    let bY = 150;

    const gravity = 1.5;

    let score = 0;

    let fly = new Audio ();
    let scor = new Audio ();

    fly.src = flySound;
    scor.src = scoreSound;
    
    const moveUp = ()=>{
        bY -= 25;
        fly.play();
    }

    let pipe = [];
    function draw(){

        bg.height = cvs.height;
    
        ctx.drawImage(bg,0,0);
        
        
        for(var i = 0; i < pipe.length; i++){
            
            constant = pipeNorth.height+gap;
            ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
            ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
                 
            pipe[i].x--;
            
            if( pipe[i].x == 125 ){
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                }); 
            }
    
            // detect collision
            
            if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
               // location.reload(); // reload the page
            }
            
            if(pipe[i].x == 5){
                score++;
                scor.play();
            }
            
            
        }
    
        ctx.drawImage(fg,0,cvs.height - fg.height);
        
        ctx.drawImage(bird,bX,bY);
        
        bY += gravity;
        
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : "+score,10,cvs.height-20);
        
        requestAnimationFrame(draw);
        
    }
    
    useEffect (()=>{
        if (started)
            draw ();
    }, [started]);


    useEffect (()=>{
        if ((gesture==="thumbs_up" || gesture==="victory") && started)
            moveUp ();
    }, [gesture]);


function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
          //  location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}
window.addEventListener ("keyup", moveUp)










    return (<canvas ref={canvasRef}  tabIndex="0" height="400" width="640" style={{backgroundColor:"white"}} onKeyDown={moveUp}/>);
}

export default Game; 