








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




function CreteMesh(GEOMETRY,shader,unifroms){

    


        Object.assign(this, {
            geomnetry:GEOMETRY,
            buffers:{},
            shader,
            unifroms,
        })


        //MODEL.MESHES[0].shader=defaultShader



        this.SetAttributes = function(){
            
            for(const buffKey of Object.keys(this.buffers)){

                if(!this.buffers[buffKey].attr){
                    continue
                }
                
                if(this.buffers[buffKey].attr){

                    // Bind vertex buffer object
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[buffKey].buffor);
                    // Get the attribute location
                    var coord = gl.getAttribLocation(this.shader.program, this.buffers[buffKey].attr.name);

                    // Point an attribute to the currently bound VBO
                    gl.vertexAttribPointer(coord, this.buffers[buffKey].attr.size, gl.FLOAT, false, 0, 0);

                    // Enable the attribute
                    gl.enableVertexAttribArray(coord);
                
                }

            }

        }

    
        this.Draw=function(){



            
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.unifroms.TEX.texture)
            var uniformLocation = gl.getUniformLocation(this.shader.program, 'diffuseTexture')
            gl.uniform1i(uniformLocation, 0)


            var uniformLocation = gl.getUniformLocation(this.shader.program, 'diffuseColor')
            gl.uniform3fv(uniformLocation, this.unifroms.color)



            this.SetAttributes()

            
            // Bind index buffer object
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.Index_Buffer.buffor); 



            // Draw the triangle
            gl.drawElements(gl.POINTS, this.geomnetry.indices.length, gl.UNSIGNED_SHORT,0);


        }



    CreteBuffer(this,'vertex_buffer', new Float32Array(GEOMETRY.vertices), gl.ARRAY_BUFFER, "position", 3)


    CreteBuffer(this,'coords_buffer', new Float32Array(GEOMETRY.coords), gl.ARRAY_BUFFER, "coord", 2)
    
    
    CreteBuffer(this,'Index_Buffer', new Uint16Array(GEOMETRY.indices), gl.ELEMENT_ARRAY_BUFFER)


    return this


}