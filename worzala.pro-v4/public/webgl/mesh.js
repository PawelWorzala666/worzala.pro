








function CreteBuffer(MESH,name,array, type,  attrName, attrSize){

    // Create an empty buffer object to store vertex buffer
    MESH.buffers[name] = {
       buffor: gl.createBuffer(),
    }

    // Bind appropriate array buffer to it
    gl.bindBuffer(type, MESH.buffers[name].buffor);

    // Pass the vertex data to the buffer
    gl.bufferData(type, array, gl.STATIC_DRAW);

    // Unbind the buffer
    gl.bindBuffer(type, null);

    if(attrName){
       MESH.buffers[name].attr={
          name:attrName,
          size:attrSize,
       }
    }

 }




function CreteMesh(GEOMETRY,shader){

    


        var MESH = {
            geomnetry:GEOMETRY,
            buffers:{},
            shader
        }


        //MODEL.MESHES[0].shader=defaultShader



        MESH.SetAttributes = function(){
            
            for(const buffKey of Object.keys(MESH.buffers)){

                if(!MESH.buffers[buffKey].attr){
                    continue
                }
                
                if(MESH.buffers[buffKey].attr){

                    // Bind vertex buffer object
                    gl.bindBuffer(gl.ARRAY_BUFFER, MESH.buffers[buffKey].buffor);
                    // Get the attribute location
                    var coord = gl.getAttribLocation(MESH.shader.program, MESH.buffers[buffKey].attr.name);

                    // Point an attribute to the currently bound VBO
                    gl.vertexAttribPointer(coord, MESH.buffers[buffKey].attr.size, gl.FLOAT, false, 0, 0);

                    // Enable the attribute
                    gl.enableVertexAttribArray(coord);
                
                }

            }

        }

    
        MESH.Draw=function(){

            
         // Bind index buffer object
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, MESH.buffers.Index_Buffer.buffor); 




         // Draw the triangle
         gl.drawElements(gl.TRIANGLES, GEOMETRY.indices.length, gl.UNSIGNED_SHORT,0);

        }



    CreteBuffer(MESH,'vertex_buffer', new Float32Array(GEOMETRY.vertices), gl.ARRAY_BUFFER, "position", 3)


    CreteBuffer(MESH,'coords_buffer', new Float32Array(GEOMETRY.coords), gl.ARRAY_BUFFER, "coord", 2)
    
    
    CreteBuffer(MESH,'Index_Buffer', new Uint16Array(GEOMETRY.indices), gl.ELEMENT_ARRAY_BUFFER)


    return MESH


}