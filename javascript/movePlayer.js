var t;
var s;
var degSpeed = 2;
var grad;
var moveSpeed = 30;
var step = 40;
var rotationVal = 0;
var stepsInX = 0;
var stepsInZ = 0;
var placeX = 0;
var placeZ = 3100;
var mapX;
var mapZ;
var levelHeight;

$(document).ready(function(){
  //correct the viewport for near every windowsize
  $(window).resize(function() {
    gameScale = $(document).height()/2000;
    levelHeight = $(document).height()/5 + 100;
    
    if($(document).height() <= 1800) 
      levelHeight = levelHeight - 200;
    if($(document).height() <= 1200) 
      levelHeight = levelHeight - 70;
    
    $('#level1').css('margin', + levelHeight + 'px 50%');
    $('#game').css('-webkit-transform','scale(' + gameScale + ')');
  });
  
  //basicly forwarding keyactions from user to the right function and set moving- and rotationdirection
	$(document).keydown(function(event){
    
		if(event.which == 37){
			clearInterval(t);
			grad = -degSpeed;
			t = setInterval('rotation()', 10);
		}
		else if(event.which == 39){
			clearInterval(t);
      grad = degSpeed;
			t = setInterval('rotation()', 10);
		}
		else if(event.which == 38){
			clearInterval(s);
      step = moveSpeed;
      moveDirectionXZ();
			s = setInterval('collisionDetection()', 10);		
		}
		else if(event.which == 40){
			clearInterval(s);
			step = -moveSpeed;
      moveDirectionXZ();
			s = setInterval('collisionDetection()', 10);
		}
    else if(event.which == 32){
      if((placeX < 400 && placeX > -400) && placeZ > 4800)
        openDoor(1);
    }
	});

	$(document).keyup(function(event){
    if(event.which == 38 || event.which == 40) clearInterval(s);
		else clearInterval(t);
	});
});

//rotatet the players viewport
function rotation()
{
  if(rotationVal >= 360 && rotationVal < 362) rotationVal = 0;
  else if(rotationVal <= -1 && rotationVal > -3) rotationVal = 360 + grad;
  
  rotationVal += grad;
  moveDirectionXZ();
  showValues();
	$('#level1').css('-webkit-transform', 'rotateY(' + rotationVal + 'deg) translate3d(' + placeX + 'px, 0px,' + placeZ + 'px)');
}

//move the playerposition forward or backword
function move()
{
  placeX += stepsInX;
	placeZ += stepsInZ;

  showValues();
	$('#level1').css('-webkit-transform', 'rotateY(' + rotationVal + 'deg) translate3d(' + placeX + 'px, 0px, ' + placeZ + 'px)');
}

//calculate the px/step in x and z direction
function moveDirectionXZ(){
  var angle;
  
  if(rotationVal > 90 && rotationVal <= 180){
    angle = 180 - rotationVal;
    stepsInX = -Math.round( Math.sin(angle*Math.PI/180)*step );
    stepsInZ = -Math.round( Math.cos(angle*Math.PI/180)*step );
  }
  else if(rotationVal > 180 && rotationVal <= 270){
    angle = rotationVal - 180;
    stepsInX = Math.round( Math.sin(angle*Math.PI/180)*step );
    stepsInZ = -Math.round( Math.cos(angle*Math.PI/180)*step );
  }
  else if(rotationVal > 270){
    angle = 360 - rotationVal;
    stepsInX = Math.round( Math.sin(angle*Math.PI/180)*step );
    stepsInZ = Math.round( Math.cos(angle*Math.PI/180)*step );
  }
  else{
    angle = rotationVal;
    stepsInX = -parseInt(Math.sin(angle*Math.PI/180)*step);
    stepsInZ = parseInt(Math.cos(angle*Math.PI/180)*step);
  }
}

//write information on the Gamescreen
function showValues(){
  $('#bord').html("viewportHeight: " + $(document).height() + "</br>placeZ: " + placeZ + " stepsInZ: " + stepsInZ + "</br>placeX: " + placeX + " stepsInX: " + stepsInX + "</br>mapX: " + mapX + " mapZ: " + mapZ + "</br>Angle: " + rotationVal);
}

//collisiondetection
function collisionDetection(){
  mapX = parseInt((placeX + stepsInX)/100+10);
  mapZ = parseInt((placeZ + stepsInZ-3000)/100);
  
  //check if player moves into a wall
  if(map[mapZ][mapX] == 0) move();
  else if(map[mapZ+1][mapX] == 0)
  {
    stepsInZ = 0;
    move();
  }
  else if(map[mapZ-1][mapX] == 0)
  {
    stepsInZ = 0;
    move();
  }
  else if(map[mapZ][mapX-1] == 0)
  {
    stepsInX = 0;
    move();
  }
  else if(map[mapZ][mapX+1] == 0)
  {
    stepsInX = 0;
    move();
  }
}


