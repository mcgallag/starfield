/*
 * Very basic vector and matrix library
 * not even remotely fully implemented
 * but works for the purposes of this application
 */

class vec3d
{
  constructor(x = 0.0, y = 0.0, z = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  randomize(xmin, xmax, ymin = null, ymax = null, zmin = null, zmax = null) {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    if (ymin == null || ymax == null) {
      ymin = xmin;
      ymax = xmax;
    }
    if (zmin == null || zmax == null) {
      zmin = xmin;
      zmax = xmax;
    }

    this.x = getRandomInt(xmin, xmax);
    this.y = getRandomInt(ymin, ymax);
    this.z = getRandomInt(zmin, zmax);
  }

  copy() {
    return new vec3d(this.x, this.y, this.z);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  mag() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
  }

  add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
    this.z = this.z + v.z;
  }

  sub(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
    this.z = this.z + v.z;
  }

  mult(scalar) {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    this.z = this.z * scalar;
  }

  div(scalar) {
    this.x = this.x / scalar;
    this.y = this.y / scalar;
    this.z = this.z / scalar;
  }

  zero() {
    this.mult(0.0);
  }

  limit(max) {
    if (this.mag() > max) {
      this.unit();
      this.mult(max);
    }
  }

  unit() {
    let l = this.mag();
    this.x = this.x / l;
    this.y = this.y / l;
    this.z = this.z / l;
  }
}

class matrix4x4
{
  constructor() {
    this.m = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
  }

  MultiplyByVector(v) {
    let o = new vec3d();
    o.x = v.x * this.m[0][0] + v.y * this.m[1][0] + v.z * this.m[2][0] + this.m[3][0];
    o.y = v.x * this.m[0][1] + v.y * this.m[1][1] + v.z * this.m[2][1] + this.m[3][1];
    o.z = v.x * this.m[0][2] + v.y * this.m[1][2] + v.z * this.m[2][2] + this.m[3][2];
    let w = v.x * this.m[0][3] + v.y * this.m[1][3] + v.z * this.m[2][3] + this.m[3][3];

    if (w != 0) {
      o.x /= w;
      o.y /= w;
      o.z /= w;
    }
    return o;
  }
}