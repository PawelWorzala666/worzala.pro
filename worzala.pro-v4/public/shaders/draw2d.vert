#version 300 es

in vec3 position;
in vec2 coord;



mat4 projection = mat4(1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0);
mat4 camera = mat4(1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-1.44,1.0);
mat4 model = mat4(1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0);



out vec2 vCoord;


void main(){

    gl_Position = projection*camera*model*vec4(vec3(position),1.0);

    vCoord = coord;

    //gl_PointSize = 5.0; 

}