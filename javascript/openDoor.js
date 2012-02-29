var moveDoor = 800;

function openDoor(i){
  if(i == 1)
  {
    $('#door1').animate({left: '-=' + moveDoor}, 1000, 'easeOutSine',function() {});
    setTimeout('closeDoor()', 3000);
    
    for(var k=19; k<=20; k++)
      for(var j=26; j<=32; j++) 
        map[k][j] = 0;
  }
}

function closeDoor(){
    for(var k=19; k<=20; k++)
      for(var j=26; j<=32; j++) 
        map[k][j] = 2;
    $('#door1').animate({left: '+=' + moveDoor}, 1000, 'easeOutSine',function() {});
}
