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


   var GEOMETRY3 = {

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


   function CalculateGeometry(geom1,geom2){

      var geom = []

      for(let index=0;index<geom1.length;index++){

         var size = geom1[index] + geom2[index]

         size = size/2.0;

         geom.push(size)

      }

      return geom

   }

   GEOMETRY3.vertices = CalculateGeometry(  GEOMETRY1.vertices  ,  GEOMETRY2.vertices  )









   var defaultShader={}

   await CreateShader(defaultShader)



   
   var TEX={}
   CreteTexture(TEX)



   var MODEL = {
      MESHES:[],
   }




   //var MESH = CreteMesh(GEOMETRY)



   MODEL.MESHES.push(   new CreteMesh(GEOMETRY1,defaultShader,{color:[0.8,0.9,0.6],TEX})   )

   MODEL.MESHES.push(   new CreteMesh(GEOMETRY2,defaultShader,{color:[0.6,0.1,0.8],TEX})   )

   MODEL.MESHES.push(   new CreteMesh(GEOMETRY3,defaultShader,{color:[0.5,0.45,0.4],TEX})   )























   console.log('test')





















      /*============= Drawing the Quad ================*/

      // Clear the canvas
      gl.clearColor(0.111, 0.121, 0.131, 1.0);

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











         for(const MESH of MODEL.MESHES){


            MESH.SetAttributes()

         
            MESH.Draw()


         }






         window.requestAnimationFrame(animate);

      }
      animate(0);









}
Engine()