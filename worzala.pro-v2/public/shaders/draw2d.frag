#version 300 es
precision highp float;


uniform sampler2D diffuseTexture;


uniform vec3 diffuseColor;



in vec2 vCoord;




float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}







out vec4 outColor;

void main(){

    vec3 diffuse = vec3(texture(diffuseTexture, vCoord).rgb);

    vec3 gray = vec3(length(diffuse));

    vec3 color = 0.2*gray+0.6*diffuse*diffuse+diffuse*0.4-((vec3(1.0)-diffuse)*0.06);


    if(length(diffuseColor)==0.0){

        color = diffuse;    
        
    }else{

        color = diffuseColor*2.52;

    }


    outColor = vec4(color, 1.0);

}