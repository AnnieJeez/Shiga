class Player {
  constructor(){
    this.index = null;
    this.distance = {
      x:0,
      y:0
    };
    this.name = null;
    this.password= null;
    this.locked = false;
    this.catcher=3;
  }

  async getCount(){
    var playerCountRef = await database.ref('salaamCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
      console.log(playerCount);
    })
  }
  getSalaam(){
    var playerCountRef = database.ref('salaam');
    playerCountRef.on("value",(data)=>{
      salaam = data.val();
    })
  }
  static async getCatcher(){
    await database.ref('/').once("value").then(function(data){
      allPlayers=data.val().players;
      catcher=data.val().catcher;
      // catcher = allPlayers["players"+data.val().toString()].index ;
    })
    
  }

  async updateCount(){
    // this.getCount();
    var playerCountRef = await database.ref('salaamCount');
    playerCountRef.once("value").then(function(data){
      playerCount=data.val()-1;
      database.ref('/').update({
        salaamCount: playerCount
      });
    })
    
    
  }
  updateCatcher(){
    database.ref('/').update({
        catcher: player.index,
        salaam:false,
        salaamCount:11,
        visibles:[false,false,false,false,false,false,false,false,false,false,false,false]
      });

  }
  updateSalaam(salaam){
    database.ref('/').update({
      salaam: salaam
    });
  }

  update(){
    var playerIndex = "players/player" + pindex;
    database.ref(playerIndex).update({
      distance:this.distance
    });
  }
   static updateLock(name,locked){
     for(var plr in allPlayers){
       if(allPlayers[plr].name===name){
        database.ref("players/"+plr).update({
          locked:locked
        });
       }
     }
    
  }

  login(){
    i =0;
    for(var plr in allPlayers){
      if(allPlayers[plr].name===player.name && allPlayers[plr].password=== player.password){
        gameState=1;
        player.index = allPlayers[plr].index;
        player.distance.x = allPlayers[plr].distance.x;
        player.distance.y = allPlayers[plr].distance.y;
        player.locked = allPlayers[plr].locked;
        pindex=plr.slice(6);
        console.log(pindex);
        database.ref("visibles/"+i).set(true);
        console.log("Logged in "+ allPlayers[plr].name);
      }
      i++;
    }
  }
  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
    return allPlayers;
  }
  static getVisiblesInfo(){
    var playerInfoRef = database.ref('visibles');
    playerInfoRef.on("value",(data)=>{
      visibles = data.val();
    })
    return visibles;
  }
}
