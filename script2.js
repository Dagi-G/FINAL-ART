const txt = "BEST\nART\nCLASS!!";

let a = [];
let txtPts = [];

let textGrap;
function setup() {
 // createCanvas(windowWidth, windowHeight);
  createCanvas(1500, 750);
  textGrap = createGraphics(width, height);
  textGrap.background(255);
  textGrap.fill(0);
  textGrap.textFont("Helvetica");
  textGrap.textStyle(BOLD);
  textGrap.textSize(min([width, height]) / 4);
  textGrap.textAlign(CENTER, CENTER);
  textGrap.text(txt, width / 2, height / 2);

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (textGrap.get(x, y)[0] == 0) txtPts.push({ x: x, y: y });
    }
  }
  // print(txtPts.length);

  for (var i = 0; i < txtPts.length / 30; i++) {
    a[i] = g({});
  }
  noStroke();
}
function draw() {
  background(220);

  fill(0);
  a.forEach(e => {
    ellipse(e.x, e.y, e.s + 5, e.s + 5);
  });
  fill(255);
  a.forEach(e => {
    // fill(e.col);
    ellipse(e.x, e.y, e.s, e.s);
    e.s += e.ss;
    e.t--;
    if (e.s > e.m && e.ss > 0) e.ss = 0;
    if (e.t < 0 && e.ss == 0) e.ss = -1;
    if (e.s < 0) {
      e = g(e);
    }
  });
}
function g(o) {
  const pt = txtPts[int(random(txtPts.length - 1))];
  o.x = pt.x;
  o.y = pt.y;
  o.t = random(40, 60);
  o.s = 0;
  o.ss = 1;
  o.m = random(10, 30);
  // o.col = color(random(255), random(255), random(255));
  return o;
}
