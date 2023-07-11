


var tt
var image = new Image();

function CreteTexture(TEX){

   tt=TEX

   TEX.texture = gl.createTexture();

   gl.bindTexture(gl.TEXTURE_2D, TEX.texture);

   // Fill the texture with a 1x1 blue pixel.
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
               new Uint8Array([0, 0, 255, 255]));

   // Asynchronously load an image
   
   image.addEventListener('load', function(){
      // Now that the image has loaded make copy it to the texture.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, TEX.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
      
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
         // Yes, it's a power of 2. Generate mips.
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {
         // No, it's not a power of 2. Turn off mips and set
         // wrapping to clamp to edge
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }


      var canvas = document.getElementById('my_Canvas');
      canvas.width = image.width
      canvas.height = image.height

   });
   //image.src = '/kg01.jpg'

   function isPowerOf2(value) {
      return (value & (value - 1)) === 0;
   }

   



}

function readURL(input) {
   if (input.files && input.files[0]) {
         var reader = new FileReader();
         reader.onload = function (e) {
            image.src= e.target.result
         };
         reader.readAsDataURL(input.files[0]);
   }
}