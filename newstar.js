/*
 * MIT License
 * 
 * Copyright (c) 2019 Michael Gallagher
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


// scales from clipspace to window coordinates
function scaleToView(v) {
  v.x += 1.0;
  v.y += 1.0;
  v.x *= 0.5 * windowWidth;
  v.y *= 0.5 * windowHeight;
}

class NewStar
{
  constructor(color_string) {
    this.position = new vec3d(0, 0, 0);

    // randomize position coordinates
    this.resetStar();
    // random depth for first star generation
    this.position.z = random(0, width);

    // set color components for fading-in purposes
    this.color = color(color_string);
    this.r = red(this.color);
    this.g = green(this.color);
    this.b = blue(this.color);

    // randomize Z velocity
    // 10% will go fast, 10% will go less fast, 20% go medium, 60% go slow
    let i = random(10);
    let zv;
    if (i < 1) {
      zv = 1.3;
    } else if (i < 2) {
      zv = random(0.9, 1.0);
    } else if (i < 5) {
      zv = random(0.4, 0.5);
    } else {
      zv = 0.2;
    }
    zv = zv * -1;

    this.velocity = new vec3d(0, 0, zv);
  }

  // resets the star's coordinates to random, with maximum depth
  resetStar() {
    this.position.randomize(-width, width, -height, height, 0, 0);
    this.position.z = width; // width == maxdepth

    // leave a deadzone in the center of display for effect
    if ((this.position.x > -50 &&
         this.position.x <  50) &&
        (this.position.y > -50 &&
         this.position.y <  50))
        {
           this.resetStar();
        }
  }

  // update position and reset if necessary
  update() {
    this.position.add(this.velocity);
    if (this.position.z < 1) {
      this.resetStar();
    }
  }

  // handle graphics display
  show() {
    // project to client window space
    let displayCoordinates = matProj.MultiplyByVector(this.position);
    scaleToView(displayCoordinates);

    // if we've projected outside of the client's screen, reset
    if (displayCoordinates.x < 0 || displayCoordinates.x > windowWidth ||
        displayCoordinates.y < 0 || displayCoordinates.y > windowHeight)
    {
      this.resetStar();
      displayCoordinates = matProj.MultiplyByVector(this.position);
      scaleToView(displayCoordinates);
    }

    // scale radius based on distance from viewport
    let radius = 1;
    if (this.position.z < 0.8 * width)
    {
      radius = map(this.position.z, 0, 0.8 * width, maxRadius, 1);
    }

    // fade in color based on distance from viewport
    this.UpdateColor();

    // finally draw the star
    fill(this.color);
    stroke(this.color);
    ellipse(displayCoordinates.x, displayCoordinates.y, radius, radius);
  }

  // update this.color based on current depth
  UpdateColor() {
    // full brightness at 30% depth distance
    let FullBrightnessThreshold = 0.3 * width;

    // if further than this threshhold then scale color to black the further it is away
    if (this.position.z > FullBrightnessThreshold) {
      let colorScale = map(this.position.z, width, FullBrightnessThreshold, 10, 100) / 100.0;
      this.color = color(this.r * colorScale, this.g * colorScale, this.b * colorScale);
    }
  }
}
