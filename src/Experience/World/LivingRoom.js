import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from "../Experience";
import drapesVertexShader from './shaders/drapes/vertex.glsl'
import drapesFragmentShader from './shaders/drapes/fragment.glsl'
import fakeGodRayVertexShader from './shaders/fakeGodRay/vertex.glsl'
import fakeGodRayFragmentShader from './shaders/fakeGodRay/fragment.glsl'


export default class LivingRoom
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.camera = this.experience.camera.instance
        this.squarePosition = this.experience.squarePosition

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('livingRoom')
        }
        
        //setup
        this.resources = this.experience.resources
        this.resource = this.resources.items.livingRoomModel
        this.livingRoomTexture = this.resources.items.livingRoomTexture

        // Base
        this.baseScale = 0.595

        this.setModel()
    }

    setModel()
    {
        //Import model
        this.model = this.resource.scene
        this.model.position.set( 0, 0, 0)
        this.model.scale.set(this.baseScale, this.baseScale, this.baseScale)
        this.scene.add(this.model)
        
        // Baked texture
        this.livingRoomTexture.flipY = false
        this.bakedMesh = this.model.children.find((child) => child.name === 'baked_livingRoom')
        this.bakedMesh.material = new THREE.MeshBasicMaterial()
        this.bakedMesh.material.map = this.livingRoomTexture

        // lightMaterials
        this.lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        this.lightsMesh = this.model.children.find((child) => child.name === 'lights')
        this.lightsMesh.material = this.lightMaterial

        //Glass Materials
        this.glassMaterial = new THREE.MeshBasicMaterial({
            color: '#fffff5',
            transparent: true,
            opacity: 0.1
        })
        this.glassMesh = this.model.children.find((child) => child.name === 'glasses')
        this.glassMesh.material = this.glassMaterial

        //drapes Materials
        this.drapeMaterial = new THREE.ShaderMaterial({
            vertexShader: drapesVertexShader,
            fragmentShader: drapesFragmentShader,
            depthWrite: false,
            uniforms:
            {
                uTime: { value: 0 },
                uBigWavesElevation: { value: new THREE.Vector2(0.10, 0.2) },
                uBigWavesFrequency: { value: new THREE.Vector2(100, 1.5) },
                uBigWavesSpeed: { value: 0.003 },
                uScaleRatio: { value: this.scaleRatio }
            },
            transparent: true
        })
        this.drapesMesh = this.model.children.find((child) => child.name === 'drapes')
        this.drapesMesh.material = this.drapeMaterial

        ///Debug
        if (this.debug.active)
        {
            const debugObject = {}

            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesElevation.value, 'x')
                .min(0).max(1).step(0.001).name('uBigWavesElevationX')
            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesElevation.value, 'y')
                .min(0).max(1).step(0.001).name('uBigWavesElevationY')
            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesFrequency.value, 'x')
                .min(0).max(100).step(0.001).name('uBigWavesFrequencyX')
            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesFrequency.value, 'y')
                .min(0).max(100).step(0.001).name('uBigWavesFrequencyY')
            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesSpeed, 'value')
                .min(0).max(0.01).step(0.0001).name('uBigWavesSpeed')
        }
           
        //Fake god ray 1
        this.fakeGodRayMaterial1 = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffffff) },
                uBlurOffset: { value: 0.93 },
                uAlphaBase: { value: 0.4 },
                uAlphaRays: { value: 0.10 },
                uFrequency: { value: 0.3 }
            }
        })
        this.fakeGodRayMesh1 = this.model.children.find((child) => child.name === 'godray1')
        this.fakeGodRayMesh1.material = this.fakeGodRayMaterial1

        //Fake god ray2
        this.fakeGodRayMaterial2 = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffffff) },
                uBlurOffset: { value: 0.96 },
                uAlphaBase: { value: 0.20 },
                uAlphaRays: { value: 0.3 },
                uFrequency: { value: 1.62 }
            }
        })
        this.fakeGodRayMesh2 = this.model.children.find((child) => child.name === 'godray2')
        this.fakeGodRayMesh2.material = this.fakeGodRayMaterial2

        //Fake god ray3
        this.fakeGodRayMaterial3 = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffffff) },
                uBlurOffset: { value: 0.9 },
                uAlphaBase: { value: 0.55 },
                uAlphaRays: { value: 0.3 },
                uFrequency: { value: 0.5 }
            }
        })
        this.fakeGodRayMesh3 = this.model.children.find((child) => child.name === 'godray3')
        this.fakeGodRayMesh3.material = this.fakeGodRayMaterial3
    }

    update()
    {
        const elapsedTime = this.time.elapsed
        this.drapeMaterial.uniforms.uTime.value = elapsedTime
    }
}
