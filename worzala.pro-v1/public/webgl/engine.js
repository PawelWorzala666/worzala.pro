async function GET(url,type='text'){
   var promise = await fetch(url)
   var result = await promise[type]()
   return result
}


async function Engine(){


   console.log('BEGIN')


         
   var canvas = document.getElementById('my_Canvas');
   gl = canvas.getContext('webgl2');


   









   var GEOMETRY1 = {

      vertices: [
         -1.0,1.0,0.0,
         -1.0,-1.0,0.0,
         1.0,-1.0,0.0,
         1.0,1.0,0.0 
      ],
   
      coords: [
         0.0,1.0,
         0.0,0.0,
         1.0,0.0,
         1.0,1.0,
      ],
   
      indices: [3,2,1,3,1,0],

   }

   var GEOMETRY2 = {

      vertices: [
         -0.4,0.4,0.0,
         -0.4,-0.4,0.0,
         0.4,-0.4,0.0,
         0.4,0.4,0.0 
      ],
   
      coords: [
         0.0,1.0,
         0.0,0.0,
         1.0,0.0,
         1.0,1.0,
      ],
   
      indices: [3,2,1,3,1,0],

   }









   var defaultShader={}

   await CreateShader(defaultShader)



   var MODEL = {
      MESHES:[],
   }




   //var MESH = CreteMesh(GEOMETRY)



   MODEL.MESHES.push(   CreteMesh(GEOMETRY1,defaultShader)   )

   MODEL.MESHES.push(   CreteMesh(GEOMETRY2,defaultShader)   )

























   console.log('test')






      var TEX={}


      CreteTexture(TEX)















      /*============= Drawing the Quad ================*/

      // Clear the canvas
      gl.clearColor(0.5, 0.5, 0.5, 0.9);

      // Enable the depth test
      gl.enable(gl.DEPTH_TEST);

      //gl.Enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)
      //gl.enable(gl.TEXTURE_2D)




     // gl.enable(gl.PROGRAM_POINT_SIZE);  

         


      var animate = function(time){



         // Clear the color buffer bit
         gl.clear(gl.COLOR_BUFFER_BIT||gl.DEPTH_BUFFER_BIT);

         // Set the view port
         gl.viewport(0,0,canvas.width,canvas.height);





         // Use the combined shader program object
         gl.useProgram(defaultShader.program);





         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, TEX.texture)
         var uniformLocation = gl.getUniformLocation(defaultShader.program, 'diffuseTexture')
         gl.uniform1i(uniformLocation, 0)






         for(const MESH of MODEL.MESHES){


            MESH.SetAttributes()

         
            MESH.Draw()


         }






         window.requestAnimationFrame(animate);

      }
      animate(0);









}
Engine()