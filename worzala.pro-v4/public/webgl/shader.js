



async function CreateShader(shader){


    /*====================== Shaders =======================*/

    // Vertex shader source code
    var vertCode = await GET('/shaders/draw2d.vert')

    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);

    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);

    // Compile the vertex shader
    gl.compileShader(vertShader);


    var message = gl.getShaderInfoLog(vertShader);
    if(message.length>0){
       console.log('vertShader ERROR')
       console.log(message)
    }



    // Fragment shader source code
    var fragCode = await GET('/shaders/draw2d.frag')

    // Create fragment shader object 
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);

    // Compile the fragmentt shader
    gl.compileShader(fragShader);


    var message = gl.getShaderInfoLog(fragShader);
    if(message.length>0){
       console.log('fragShader ERROR')
       console.log(message)
    }



    // Create a shader program object to
    // store the combined shader program
    var shaderProgram = gl.createProgram();

    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);

    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);

    // Link both the programs
    gl.linkProgram(shaderProgram);

    shader.program=shaderProgram

 }

 