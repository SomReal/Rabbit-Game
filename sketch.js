const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var rabbit
var melon
var bg
var cutbutton
var eatAni
var sadAni
var blink

let engine;
let world;
var ground;

function preload()
{
  rabbitimg = loadImage("Rabbit-01.png")
  melonimg = loadImage("melon.png")
  bg = loadImage("background.png")
  blinkAni = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eatAni = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sadAni = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  blinkAni.playing = true
  eatAni.playing = true
  sadAni.playing = true
  eatAni.looping = false
  sadAni.looping = false

}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
  button = createImg("cut_button.png")
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)
  rope = new Rope(6,{x:245,y:30})
  ground = new Ground(200,680,600,20);
  
  blinkAni.frameDelay = 10
  eatAni.frameDelay = 15
  sadAni.frameDelay = 10

  rabbit = createSprite(200,620,100,100)
  rabbit.scale = 0.2
  rabbit.addAnimation("blinking",blinkAni)
  rabbit.addAnimation("eating",eatAni)
  rabbit.addAnimation("sad",sadAni)
  rabbit.changeAnimation("blinking")
  fruit = Matter.Bodies.circle(300,300,20,{density:0.001})
  Matter.Composite.add(rope.body,fruit)
  fruitcon = new Link(rope,fruit)
  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS)
  textSize(50)
  
  

}

function draw() 
{
  background(51);
  image (bg,0,0,displayWidth+80,displayHeight)
  
  if (fruit != null) {
    image (melonimg,fruit.position.x,fruit.position.y,70,70)
  }
  
  ground.show();
  rope.show()
  Engine.update(engine);
  
  if(collide(fruit,rabbit)==true){
    rabbit.changeAnimation("eating")
  }
  if (collide(fruit,ground.body)==true) {
    rabbit.changeAnimation("sad")
    
  }
  drawSprites()
  

 
   
}
function drop(){
  rope.break()
  fruitcon.detach()
  fruitcon = null
}
function collide(body,sprite){
  if (body != null) {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d <= 80) {
      World.remove(world,fruit)
      fruit = null
      return true
    }
    else {return false}
  }
}