
    

var output = document.querySelector("#output");
var statout = document.querySelector("#stats");
var startBtn = document.querySelector("#start");
var gameScreen = document.querySelector("#gamescreen");
var gaudio = document.getElementById("audelem"); 
        
        
    var grid = [ //shows what to place on each map tile
    [0,0,0,0,1,0,0,2],
    [0,1,3,0,3,0,0,0],
    [0,0,0,0,0,1,0,0],
    [0,0,1,1,0,0,0,0],
    [0,3,0,0,0,0,1,1],
    [0,1,0,0,3,0,0,0],
    [0,0,0,1,0,1,0,0],
    [0,0,0,0,0,0,0,0],    
    ]   ;
    var objgrid = [ //handles start positions for player and monster
    [0,0,0,0,0,0,0,0],
    [0,0,0,4,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [5,0,0,0,0,0,0,0],    
    ]   ; 
        
   
    
var mapelements = {   
    0:{
		name:"floor",
        mapid: 0,
        imgsrc: "./img/darkfloorbig.png",
        interact: function(player){
        },
	},
    2:{
		name:"Exit",
        mapid: 2,
        imgsrc: "./img/stairsbig.png",
        interact: function(player){
            endgame(0);
        },
	},
	1:{
		name:"lava",
        mapid: 1,
        imgsrc: "./img/lavabig.png",
        interact: function(player){
            player.health -= 10;
            
            output.innerHTML = "You stepped in lava and got burned!";
            if(player.health <= 0){
                endgame(2);
            }
        },
	},
    3:{
		name:"gold",
        mapid: 3,
        imgsrc: "./img/goldfloor.png",
        interact: function(player){
            output.innerHTML = "You picked up some gold!";
            player.gold += 1;
        },
	},    
};
    
    
var gameactors = {
	monster:{
		name:"monster",
        mapid: 4,
        locrow: 0,
        imgsrc: "./img/monster.png",
        cellref: 0,
        loccolumn: 0,
	},
    miner:{
		name:"miner",
        mapid: 5,
        locrow: 0,
        loccolumn: 0,
        imgsrc: "./img/player.png",
        cellref: 0,
        health: 30,
        gold: 0,
	},
  
};
    

    
    
var minerref = gameactors.miner;   
var monsterref = gameactors.monster;
    
    
var ROWS = grid.length;
var COLUMNS = grid[0].length;     
const SIZE = 64;

    
var minerrow = 7;
var minercolumn = 0;
    
       
 
//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
        
    
const FLOOR = 0;
const LAVA = 1;
var EXIT = 2;
var GOLD = 3;
var MINER = 4;
var MONSTER =5;
    
// Initialize objects on the screen
 $(document).ready(function()
						   {
		$('#title').hide();

		$('#title').slideDown(2000);  
	
		output.style.top = ROWS * (SIZE) + 8 + "px"; 
        statout.style.top = ROWS * (SIZE) + 27 + "px";
        startBtn.addEventListener("click",startGameHandler,false);
        makemap();					   
						   })   
    



    

function makemap(){
    
for(var row = 0; row < ROWS; row++) 
{	
  for(var column = 0; column < COLUMNS; column++) 
  { 
    //Create a div HTML element called cell
    var cell = document.createElement("div");
    

    var idin = grid[row][column];
    
    //console.log(idin); 
    var mapelem = mapelements[idin]
      
    //Set it's CSS class to "tile"
    cell.setAttribute("class", "tile");
    
    //Set the image based on the map id.
    var atrstring = `background-image: url("${mapelem.imgsrc}");` 
      
    cell.setAttribute("style", atrstring);
    
     
    
    //Add the div HTML element to the stage
    gameScreen.appendChild(cell);
    

    //Position the cell in the correct place
    //with SPACE pixels of space around it
    cell.style.top = row * (SIZE) + "px";
    cell.style.left = column * (SIZE) + "px";
  }
}      
        

    
for(var row = 0; row < ROWS; row++) 
{	
  for(var column = 0; column < COLUMNS; column++) 
  { 

    var idin = objgrid[row][column];
    
    //console.log(idin); 
    
      
    if(idin != 0){
        //create img element
        //setup monster and player positions
        var cell = document.createElement("img");
        if(idin == 4){
            monsterref.loccolumn = column;
            monsterref.locrow = row;
            cell.src = monsterref.imgsrc;
            monsterref.cellref = cell;
        }
        else if(idin == 5){
            minerref.loccolumn = column;
            minerref.locrow = row;
            cell.src = minerref.imgsrc;
            minerref.cellref = cell;
        }
     cell.setAttribute("class", "tiletest");
    gameScreen.appendChild(cell);
     cell.style.top = row * (SIZE) + "px";
    cell.style.left = column * (SIZE) + "px";
    }
  }
}         
}
    



function startGameHandler( ) {
	// Hide the intro screen, show the game screen
	introscreen.style.display = "none";
	gameScreen.style.display = "block";
    window.addEventListener("keydown", keydownHandler, false); //start listening for input
    //play audio and show status
    gaudio.play();
    updatestatus();
}
    

    
    
function keydownHandler(event)
{ 
  switch(event.keyCode)
  {
    case UP:
	    if(minerref.locrow > 0)
	    {

	      //console.log("moveup");
	      //Change the miner's position. Render() handles the visuals
	      minerref.locrow--;
	    }
	    break;
	  
	  case DOWN:
	    if(minerref.locrow < ROWS - 1)
	    {
	      minerref.locrow++;
	    }
	    break;
	    
	  case LEFT:
	    if(minerref.loccolumn > 0)
	    {
	      minerref.loccolumn--;
	    }
	    break;  
	    
	  case RIGHT:
	    if(minerref.loccolumn < COLUMNS - 1)
	    {
	      minerref.loccolumn++;
	    }
	    break; 
  }
runmonstercollide();//check if player ran into monster
moveMonster();
runmonstercollide();//Check to see if the monster ran into the player
render();
runcollide();//run collide check on what the player is on.
updatestatus();

/*
on move
look at map id of new tile
find corresponding object
run interact

on start
use game object ids to set startlocs for monster and player
*/
}
    

function runcollide(){
    
    
    let poscol = minerref.loccolumn;
    let posrow = minerref.locrow;
    
    
    let maplocid = grid[posrow][poscol];
    
    let mapelem = mapelements[maplocid];
    
    
    mapelem.interact(minerref);
        
}   
    
    
 function runmonstercollide(){  //Check to see if the monster is at the same position as the player, and if so, eat them
    let poscol = minerref.loccolumn;
    let posrow = minerref.locrow;    
    let mrow = monsterref.locrow;
    let mcol = monsterref.loccolumn;   
    if(mrow == posrow && mcol == poscol){       
        endgame(1);       
    }
        
}    
    
    
    
function render(){ //handles updating sprite positions

    let cell = minerref.cellref;
    let row = minerref.locrow;
    let column = minerref.loccolumn;
  
    cell.style.top = row * (SIZE) + "px";
    cell.style.left = column * (SIZE) + "px";
    
    cell = monsterref.cellref;
    row = monsterref.locrow;
    column = monsterref.loccolumn;
    
    cell.style.top = row * (SIZE) + "px";
    cell.style.left = column * (SIZE) + "px";
}
    
    
    
function endgame(state = 0){//game over
    
    switch(state){
        case 0:
         output.innerHTML = `You escaped! Final score is: ${minerref.gold}`;     
        break;
        case 1:
            output.innerHTML = `You were eaten by the monster.. Final score is: ${minerref.gold}`;
        break;
        case 2:
            output.innerHTML = `You ran out of health and burned alive. Final score is: ${minerref.gold}`;
        break;        
    }
    minerref.cellref.style.display = "none"; //hide the miner
    gaudio.pause();
     window.removeEventListener("keydown", keydownHandler, false);   //disable key input  
}
    

function updatestatus(){   
    statout.innerHTML = `Health: ${minerref.health}  Gold: ${minerref.gold}`   
}
    
    
    
function moveMonster()
{
  //The 4 possible directions that the monster can move
  let UP = 1;
  let DOWN = 2;
  let LEFT = 3;
  let RIGHT = 4;
  
  //An array to store the valid direction that
  //the monster is allowed to move in
  var validDirections = [];
  
  //The final direction that the monster will move in
  var direction = undefined;
  
  //Find out what kinds of things are in the cells 
  //that surround the monster. If the cells contain floor or gold,
  //push the corresponding direction into the validDirections array
  if(monsterref.locrow > 0)
  {
    var thingAbove = grid[monsterref.locrow - 1][monsterref.loccolumn];
    if(thingAbove === FLOOR || thingAbove === GOLD)
	  {
	    validDirections.push(UP);
	  }
  }
  if(monsterref.locrow < ROWS - 1)
  { 
    var thingBelow = grid[monsterref.locrow + 1][monsterref.loccolumn];
    if(thingBelow === FLOOR || thingBelow === GOLD)
	  {
	    validDirections.push(DOWN);
	  }
  }
  if(monsterref.loccolumn > 0)
  {
    var thingToTheLeft = grid[monsterref.locrow][monsterref.loccolumn - 1];
    if(thingToTheLeft === FLOOR || thingToTheLeft === GOLD)
	  {
	    validDirections.push(LEFT);
	  }
  } 
  if(monsterref.loccolumn < COLUMNS - 1)
  {
    var thingToTheRight = grid[monsterref.locrow][monsterref.loccolumn + 1];
    if(thingToTheRight === FLOOR || thingToTheRight === GOLD)
	  {
	    validDirections.push(RIGHT);
	  }
  } 
  
  //The validDirections array now contains 0 to 4 directions that the 
  //contain floor/gold cells. Which of those directions will the monster
  //choose to move in?
  
  //If a valid direction was found, Randomly choose one of the 
  //possible directions and assign it to the direction variable
  if(validDirections.length !== 0)
  {
    var randomNumber = Math.floor(Math.random() * validDirections.length);
    direction = validDirections[randomNumber];
  }
  
  //Move the monster in the chosen direction
  switch(direction)
  {
    case UP:
		  //change the monster's row
		  monsterref.locrow--; 

		  break;
	  
	  case DOWN:

		  monsterref.locrow++;

	    break;
	  
	  case LEFT:

		  monsterref.loccolumn--;

	    break;
	 
	 case RIGHT:

		  monsterref.loccolumn++;

  }
}
  