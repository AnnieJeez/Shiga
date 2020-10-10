class Form {

  constructor() {
    this.input = createInput("Name");
    this.input1 = createInput("Password");
    this.button = createButton('Play');
    this.button1 = createButton('Salaam');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Shiga World");
    this.title.position(200,20);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.input1.position(displayWidth/2 - 40 , displayHeight/2 - 50);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.button1.position(200,80);
    this.button1.hide();
    this.button.mousePressed(()=>{
      this.input.hide();
      this.input1.hide();
      this.button.hide();
      player.name = this.input.value();
      player.password = this.input1.value();
      playerCount+=1;
      player.index = playerCount;
      player.login();
      if(catcher!==undefined && player.name===shigans[catcher].getAnimationLabel()){
        this.button1.show();
      }
      this.title.html(player.name);

    });
    this.button1.mousePressed(()=>{
     player.updateSalaam(true);
    });

  }
}
