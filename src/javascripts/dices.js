import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
  // initNavigation()
})

function initThree() {
  //находим html-контейнер
  const model = document.querySelector('.model')

  //создаём сцену
  const scene = new THREE.Scene()
  // scene.background = new THREE.Color('#ffffff')
  scene.position.set(-1, -0.5, -1)

  //создаём камеру
  let w = window.innerWidth / 2
  let h = window.innerHeight / 2
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )

  camera.position.set(1, -0.3, 1.7)

  //создаём визуализатор-рендерер
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(w, h)
  // renderer.shadowMap.enabled = true
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap

  //добавляем постпроцессинг
  renderer.setPixelRatio(window.devicePixelRatio)
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const fxaaPass = new ShaderPass(FXAAShader)
  const pixelRatio = renderer.getPixelRatio()
  fxaaPass.material.uniforms['resolution'].value.x =
    1 / (model.offsetWidth * pixelRatio)
  fxaaPass.material.uniforms['resolution'].value.y =
    1 / (model.offsetHeight * pixelRatio)

  const outputPass = new OutputPass()
  composer.addPass(outputPass)

  model.appendChild(renderer.domElement)

  //подключаем модель
  {
    const loader = new GLTFLoader()
    loader.load(
      './3d/scene.gltf',
      (gltf) => {
        scene.add(gltf.scene)
      },
      (error) => {
        console.log('Error:' + error)
      }
    )
  }

  //добавляем свет
  {
    const light = new THREE.AmbientLight(0xffffff)
    scene.add(light)
  }
  {
    const light = new THREE.DirectionalLight(0xff0000, 1)
    light.position.set(10, 0, 0)
    light.lookAt(2, 0.6, 2)
    // const helper = new THREE.DirectionalLightHelper(light, 5)
    scene.add(light)
  }
  {
    const light = new THREE.DirectionalLight(0x0000ff, 1)
    light.position.set(-10, 0, 0)
    light.lookAt(2, 0.6, 2)
    // const helper = new THREE.DirectionalLightHelper(light, 5)
    scene.add(light)
  }
  {
    const light = new THREE.DirectionalLight(0x2f4f4f, 1)
    light.position.set(-20, -3, 32)
    light.lookAt(2, 0.6, 2)
    // const helper = new THREE.DirectionalLightHelper(light, 5)
    scene.add(light)
  }
  {
    const light = new THREE.DirectionalLight(0xffefd5, 1)
    light.position.set(20, 5, -30)
    light.lookAt(2, 0.6, 2)
    // const helper = new THREE.DirectionalLightHelper(light, 5)
    scene.add(light)
  }

  //управление моделью
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true
  controls.autoRotateSpeed = 5
  controls.enableDamping = true
  controls.maxDistance = 1.8
  controls.minDistance = 1.5
  controls.maxPolarAngle = Math.PI

  //анимация вращения с библиотекой tween.js

  // Tween.js Tweening
  // new TWEEN.Tween(camera.position)
  //   .to({ y: 1.5 }, 4000)
  //   .yoyo(true)
  //   .repeat(Infinity)
  //   .easing(TWEEN.Easing.Cubic.InOut)
  //   .start()
  // new TWEEN.Tween(scene.rotation)
  //   .to({ y: '-' + (Math.PI / 2) * 8 }, 6000) // Math.PI/2 = 360degrees x8 rotations
  //   .delay(1000)
  //   .repeat(Infinity)
  //   .easing(TWEEN.Easing.Cubic.InOut)
  //   .start()
  // new TWEEN.Tween(scene.rotation)
  //   .to({ x: '-' + (Math.PI / 2) * 9 }, 14000)
  //   .repeat(Infinity)
  //   .easing(TWEEN.Easing.Cubic.InOut)
  //   .start()
  // new TWEEN.Tween(scene.scale)
  //   .to({ x: 1.25, y: 1.25, z: 1.25 }, 4000)
  //   .yoyo(true)
  //   .repeat(Infinity)
  //   .easing(TWEEN.Easing.Cubic.InOut)
  //   .start()

  //анимация модели
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    composer.render(scene, camera)
    // TWEEN.update()
  }
  animate()

  //обновление при ресайзе окна
  window.addEventListener('resize', onWindowResize)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    composer.setSize(w, h)
  }
}
