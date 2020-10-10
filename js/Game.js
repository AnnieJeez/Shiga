class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      // var playerCountRef = await database.ref('playerCount').once("value");
      // if(playerCountRef.exists()){
      //   playerCount = playerCountRef.val();
      //   player.getCount();
      // }
      form = new Form()
      form.display();
    }

    
  }
salaamMode(){
  push();
  stroke("green");
  strokeWeight(10);
  text(".",shigans[catcher].x,shigans[catcher].y-80);
  pop();
}
  play(){
    // form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined  && catcher!==undefined){
      //var display_position = 100;
      // console.log(catcher);
      //index of the array
      var index = 0;

      //x and y position of the shigans
      var x = 0;
      var y;

      player.getSalaam();
      for(var plr in allPlayers){
        Player.getVisiblesInfo();
        // console.log(allPlayers[plr])
        y = allPlayers[plr].distance.y;
        //use data form the database to display the shigans in y direction
        x = allPlayers[plr].distance.x;
        // console.log(allPlayers[plr].name);
        shigans[index].x = x;
        shigans[index].y = y;
        shigans[index].visible=visibles[index];

        if(shigans[index].getAnimationLabel()===allPlayers[plr].name){
          lockBox[index]=allPlayers[plr].locked;
        }
        if(allPlayers[plr].name===player.name){
          player.locked= allPlayers[plr].locked;
        }
        if (shigans[index].getAnimationLabel() === player.name){
          shigans[index].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = shigans[index].x
        }
        if(salaam===false && shigans[catcher].getAnimationLabel()!=shigans[index].getAnimationLabel() && Math.abs(shigans[catcher].x-shigans[index].x)<=shigans[catcher].width && Math.abs(shigans[catcher].y-shigans[index].y)<=shigans[catcher].height ){
          lockBox[index]= true;
          Player.updateLock(shigans[index].getAnimationLabel(),true);
        }
        if(updated===false && salaam===true && shigans[catcher].getAnimationLabel()!=shigans[index].getAnimationLabel() && Math.abs(shigans[catcher].x-shigans[index].x)<=shigans[catcher].width && Math.abs(shigans[catcher].y-shigans[index].y)<=shigans[catcher].height ){
          // player.getCount();
          player.updateCount();
          // console.log("Updated "+updated);
          updated=true;
        }
        if(salaam===false && shigans[index].getAnimationLabel()!=player.name && shigans[catcher].getAnimationLabel()!=player.name && Math.abs(shigans[index].x-player.distance.x)<=shigans[index].width && Math.abs(shigans[index].y-player.distance.y)<=shigans[index].height ){
          lockBox[index]= false;
          Player.updateLock(shigans[index].getAnimationLabel(),false);

        }
        if (lockBox[index]===true) {
          push();
          stroke("red");
          strokeWeight(10);
          text(".",shigans[index].x,shigans[index].y-80);
          pop();
        }

        if(salaam===true){
          this.salaamMode();
          Player.updateLock(shigans[index].getAnimationLabel(),false);
        }else{
          if(catcher){
            push();
            stroke("yellow");
            strokeWeight(10);
            text(".",shigans[catcher].x,shigans[catcher].y-80);
            pop();
          }
        }

        if(playerCount===0){
          // catcher= allPlayers[player.name]
          // player.updateCatcher();
          player.updateCatcher();
          annie.destroy();
          asmo.destroy();
          jan.destroy();
          gd.destroy();
          mya.destroy();
          hp.destroy();
          mutta.destroy();
          ak.destroy();
          saima.destroy();
          laddu.destroy();
          aji.destroy();
          kichu.destroy();
          gameState=-1;
        }
        index = index + 1 ;


        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(!(player.name===shigans[catcher].getAnimationLabel() && salaam===true) ){
      if(keyIsDown(LEFT_ARROW) && player.index !== null && player.locked===false){
        player.distance.x -=10
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW) && player.index !== null && player.locked===false){
        player.distance.x +=10
        player.update();
      }
      if(keyIsDown(UP_ARROW) && player.index !== null && player.locked===false){
        player.distance.y -=10
        player.update();
      }
      if(keyIsDown(DOWN_ARROW) && player.index !== null && player.locked===false){
        player.distance.y +=10
        player.update();
      }
    }
    
    
    drawSprites();
    // stroke("black");
    // fill("orange");
    // textSize(25);
    // strokeWeight(4);
    // text(player.name,100,100);
  }
}
