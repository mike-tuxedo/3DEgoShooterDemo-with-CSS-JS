var moveDoor = 800;
//var rememberDoorArray[500][500];
var k = 0;
var j = 0;

function openDoor(i){

  if(i == 1)
  {
    $('#door1').animate({left: '-=' + moveDoor}, 1000, 'easeOutSine',function() {});
    setTimeout('closeDoor()', 3000);
  }
  
    for(k=0; k < map.length; k++)
    {
      for(j=0; j < map[k].length; j++)
      {
        if(map[k][j] == i){
          map[k][j] = 0;
          //rememberDoorArray[k][j] = 9;
        }
      }
    }
}

function closeDoor(){
    for(var k=19; k<=20; k++)
      for(var j=26; j<=32; j++) 
        map[k][j] = 2;
    $('#door1').animate({left: '+=' + moveDoor}, 1000, 'easeOutSine',function() {});
}
