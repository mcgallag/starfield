/* Sketch.js
 * creates a starfield-like display using p5.js
 *
 * heavily adapted by Michael Gallagher <mcgallag@gmail.com>
 * from code written by Daniel Shiffman
 *     http://codingtra.in
 */

// holds all our NewStar objects
var stars = [];

// set a few global variables to default values
var backgroundColor = "#000000";
var numStars = 400;
var maxRadius = 8;

// will hold projection matrix
var matProj;

// create the canvas and fill the array with stars
function setup() {
  createCanvas(windowWidth, windowHeight);

  CreateProjectionmatrix();

  CreateStarArray();
}

function CreateStarArray() {
  // check for global variable user overrides from HTML
  let element = document.querySelector("#numStars");
  if (element) {
    numStars = int(element.value);
  }

  element = document.querySelector("#maxRadius");
  if (element) {
    maxRadius = int(element.value);
  }

  element = document.querySelector("#backgroundColor");
  if (element) {
    backgroundColor = element.value;
  }

  // create a new star with a random color from the starColorsArray
  for (let i = 0; i < numStars; i++) {
    stars[i] = new NewStar(random(starColorsArray));
  }
}

/*
 * Set up the camera projection matrix
 * adapted from code in this video https://www.youtube.com/watch?v=ih20l3pJoeU
 */
function CreateProjectionmatrix() {
  let zNear = 10;
  let zFar = windowWidth;
  let fov = 60.0;
  angleMode(DEGREES);
  let aspectRatio = windowHeight / windowWidth;
  let fovRad = 1.0 / tan(fov * 0.5);
  let q = zFar / (zFar - zNear);
  matProj = new matrix4x4();
  matProj.m[0][0] = aspectRatio * fovRad;
  matProj.m[1][1] = fovRad;
  matProj.m[2][2] = q;
  matProj.m[2][3] = 1;
  matProj.m[3][2] = -1 * q * zNear;
}

// per frame draw function
function draw() {
  background(0);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

/* // for debugging, resets every star at once
function keyPressed() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].resetStar();
  }
}*/