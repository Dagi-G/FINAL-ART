var vehicles = [];
var font;

function preload() {
  font = loadFont("http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf");
}
function setup() {
  createCanvas(1500, 750);
  // var points = font.textToPoints('test', 30, 200, 192);
  var points = font.textToPoints('BEN BEST PROFESSOR', 30, 150, 100);

  for (var i=0; i < points.length; i++){
    var pt = points[i];
    var vehicle = new Vehicle(pt.x,pt.y);
    vehicles.push(vehicle);
  }

}


function draw() {
  background(40);

  // textFont(font);
  // textSize(152);
  // fill(255,30);
  // noStroke();
  // text('スマートネッツ', 30, 200);

  for (var i=0; i < vehicles.length; i++){
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }

  //console.log(vehicles[3].opa);
}


function Vehicle(x,y){
  this.pos = createVector(random(width),random(height));
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 4;
  this.maxspeed = 10;
  this.maxforce = .5;
  this.h = 360;
  this.sat = 70;
  this.light = 100;
  this.opa = 1;
  // this.c = color('hsb('+this.h+',70%,70%)');


  this.behaviors = function(){
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);



    this.applyForce(arrive);
    this.applyForce(flee);
  }

  this.applyForce = function(f){
    this.acc.add(f);
  }

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.h = floor(map(this.vel.x,.1,this.maxspeed-1,220,360));
    this.sat = floor(map(this.vel.x,.1,this.maxspeed-1,60,80));
    this.light = floor(map(this.vel.x,.001,.1,100,50));

    // this.opa = map(this.vel.x,0,3,0,5);

    if (this.h < 0){
      this.h = 0;
    }
    if (this.sat < 70){
      this.sat = 70;
    }
    if (this.light < 50){
      this.light = 50;
    }
    if (this.opa < 0){
      this.opa = 0;
    }
    this.acc.mult(0);

  }

  this.show = function(){
    push();
    // this.h++;
    var c = color('hsla('+this.h+','+this.sat+'%,'+this.light+'%,'+this.opa+')');
    stroke(c);
    strokeWeight(this.r);
    point(this.pos.x,this.pos.y);
    pop();
  }


  this.arrive = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if ( d < 100){
      speed = map(d, 0, 100,0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  this.flee = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50){
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0,0);
    }
  }

}

function mousePressed(){
	var points = font.textToPoints('BEN BEST PROFESSOR', 30, 150, 100);
	
for (var i=0; i < points.length; i++){
    vehicles.pop();
  }
	

  for (var i=0; i < points.length; i++){
    var pt = points[i];
    var vehicle = new Vehicle(pt.x,pt.y);
    vehicles.push(vehicle);
  }
	
}