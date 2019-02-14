# Starfield by Trelane

A HTML5 canvas JavaScript animation of a 3D starfield. Uses p5.js for graphics routines.


## Files
 - LICENSE - MIT License
 - index.html - main file for end user display in browser, file protocol compatible
 - sketch.js - handles setup and main draw loop
 - newstar.js - encapsulates Star properties and routines
 - starColorsArray.js - a 1000-element array of RGB values of actual stars
 - vector.js - homebrew vector library, honestly not sure why I bothered with this
 - README.md - you're reading it
 - p5/p5.min.js - p5 API for graphics processing, see http://p5js.org for details
 - 
## How to use
This was written with the intention of running it either in a client browser or from OBS as a browser source for use while streaming. If you want to run it directly in a browser simply open the index.html file and enjoy!

If you want to use it in OBS:
 1. Create a new Scene in OBS.
 2. Add a new "Browser" source to this scene.
 3. Give the source whatever name you like and check "Make Source Visible."
 4. Check "Local File," browse to the folder you unzipped Starfield.zip, and select index.html
 5. Width should be the full width of your OBS scene (possibly 1920)
 6. Height should be the full height of your OBS scene (possibly 1080)
 7. FPS can be set to whatever framerate you broadcast at (probably 30 or 60)
 8. Custom CSS you can delete or leave as is, my index.html has almost the same CSS in it.
 9. Be sure both "Shutdown source when not visible" and "Refresh browser when scene becomes active" are checked. It does a bit of background 3D matrix multiplication and may as well spare your CPU if you're not using it.
 10. Click OK and switch to the new scene!
 
 It'd probably look cool with some high-contrast text sources and background music as a pre-roll animation!

## Customization
There are a few fields in the index.html file that you can adjust for quick effortless customization. They are all in hidden input fields inside the body element.

 - backgroundColor can be set to any hexadecimal color string (default is black #000000) [Google Link](https://www.google.com/search?q=color%20picker)
- numStars can be set to how many stars you want (default is 400)
- maxRadius can be set to maximum star radius in pixels (default is 8)

## About and Contact
Got quite a bit of inspiration from Daniel Shiffman [Coding Train](https://thecodingtrain.com/). Thanks for keeping coding fun!

I can be contacted via email at [mcgallag@gmail.com](mailto:mcgallag@gmail.com) and I'm usually on the Discord server of the [Wing Commander CIC](https://www.wcnews.com). Please reach out to me if you have any suggestions for improvement!

Future releases will always be committed to [the Starfield's repository](https://github.com/mcgallag/starfield) on my Github profile. Feel free to submit a pull request if you come up with anything cool!

## License

    MIT License

    Copyright (c) 2019 Michael Gallagher

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

