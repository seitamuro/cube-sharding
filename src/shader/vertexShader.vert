uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;

attribute vec3 position;
attribute float aRandom;
attribute vec3 aNormal;
attribute float aWidthSegments;

varying float vRandom;

void main() {
  vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);
  if (modelPosition.x != 0.0 && modelPosition.y != 0.0 && modelPosition.z != 0.0) {
    modelPosition.xyz += aRandom * aNormal * 0.05;
  }
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  vRandom = aRandom;
  gl_Position = projectedPosition;
}