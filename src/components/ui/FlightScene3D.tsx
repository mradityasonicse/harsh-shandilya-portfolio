import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface FlightScene3DProps {
  ownerName: string;
  onCurtainOpen: () => void;
  onComplete: () => void;
}

export const FlightScene3D: React.FC<FlightScene3DProps> = ({
  ownerName,
  onCurtainOpen,
  onComplete,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const onCurtainOpenRef = useRef(onCurtainOpen);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCurtainOpenRef.current = onCurtainOpen;
    onCompleteRef.current = onComplete;
  }, [onCurtainOpen, onComplete]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Accessibility Check: Skip immediately if prefers-reduced-motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onCurtainOpenRef.current();
      onCompleteRef.current();
      return;
    }

    // 2. Three.js Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040609, 0.016);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 26);
    camera.lookAt(0, 0, 0);

    // 3. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x141f2e, 1.5);
    scene.add(ambientLight);

    // Key Light: High-angle moonlight with warm tint
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 3.2);
    keyLight.position.set(-20, 26, 22);
    scene.add(keyLight);

    // Rim Light: Rich warm gold specular edge on wings and tail
    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.4);
    rimLight.position.set(26, -6, -16);
    scene.add(rimLight);

    // Fill Light: Soft cyan glow reflecting from nighttime clouds below
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(0, -16, 12);
    scene.add(fillLight);

    // 5. Starfield & Atmospheric Particles
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 90;
      starPositions[i + 1] = (Math.random() - 0.5) * 60;
      starPositions[i + 2] = (Math.random() - 0.5) * 70;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.18,
      transparent: true,
      opacity: 0.7,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 6. Dynamic High-Res Livery Canvas Texture (Owner's Name)
    const createLiveryTexture = (name: string, mirror: boolean = false) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dark gradient backplate
        const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grad.addColorStop(0, 'rgba(12, 18, 28, 0.0)');
        grad.addColorStop(0.15, 'rgba(15, 23, 42, 0.9)');
        grad.addColorStop(0.85, 'rgba(15, 23, 42, 0.9)');
        grad.addColorStop(1, 'rgba(12, 18, 28, 0.0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 24, canvas.width, 208);

        // Double Gold Livery Stripes
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(60, 52, 904, 4);
        ctx.fillRect(60, 200, 904, 2);

        if (mirror) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }

        // Owner's Name
        ctx.fillStyle = '#f8fafc';
        ctx.font = '900 56px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '7px';
        ctx.fillText(name.toUpperCase(), canvas.width / 2, 120);

        // Aircraft Callsign
        ctx.fillStyle = '#c5a059';
        ctx.font = '700 24px monospace, sans-serif';
        ctx.letterSpacing = '8px';
        ctx.fillText('• HS-01 • DREAMLINER 787 •', canvas.width / 2, 168);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const liveryTextureLeft = createLiveryTexture(ownerName, false);
    const liveryTextureRight = createLiveryTexture(ownerName, true);

    // 7. Master Airplane Root Group
    const airplaneRoot = new THREE.Group();
    scene.add(airplaneRoot);

    // Procedural Jet Group (renders instantly while GLB checks or as standalone)
    const proceduralJet = new THREE.Group();

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x0c121d,
      metalness: 0.88,
      roughness: 0.22,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
    });

    const cockpitMat = new THREE.MeshStandardMaterial({
      color: 0x050a12,
      metalness: 0.96,
      roughness: 0.04,
      transparent: true,
      opacity: 0.92,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.12,
    });

    const exhaustGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95,
    });

    // Procedural Aircraft Meshes
    const noseGeo = new THREE.ConeGeometry(0.92, 3.8, 36);
    noseGeo.rotateX(Math.PI / 2);
    const noseMesh = new THREE.Mesh(noseGeo, titaniumMat);
    noseMesh.position.set(0, 0, 5.8);
    proceduralJet.add(noseMesh);

    const needleGeo = new THREE.CylinderGeometry(0.04, 0.08, 1.2, 16);
    needleGeo.rotateX(Math.PI / 2);
    const needleMesh = new THREE.Mesh(needleGeo, chromeMat);
    needleMesh.position.set(0, 0, 7.8);
    proceduralJet.add(needleMesh);

    const cabinGeo = new THREE.CylinderGeometry(0.92, 0.92, 8.2, 36);
    cabinGeo.rotateX(Math.PI / 2);
    const cabinMesh = new THREE.Mesh(cabinGeo, titaniumMat);
    cabinMesh.position.set(0, 0, -0.2);
    proceduralJet.add(cabinMesh);

    const canopyGeo = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.3);
    canopyGeo.scale(0.85, 0.7, 2.4);
    const canopyMesh = new THREE.Mesh(canopyGeo, cockpitMat);
    canopyMesh.position.set(0, 0.48, 3.8);
    canopyMesh.rotation.x = -0.12;
    proceduralJet.add(canopyMesh);

    const tailGeo = new THREE.ConeGeometry(0.92, 5.2, 36);
    tailGeo.rotateX(-Math.PI / 2);
    const tailMesh = new THREE.Mesh(tailGeo, titaniumMat);
    tailMesh.position.set(0, 0.18, -6.8);
    proceduralJet.add(tailMesh);

    // Decal Plaque
    const decalGeo = new THREE.PlaneGeometry(6.4, 1.4);
    const leftDecalMat = new THREE.MeshBasicMaterial({
      map: liveryTextureLeft,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const leftDecal = new THREE.Mesh(decalGeo, leftDecalMat);
    leftDecal.position.set(-0.94, 0.2, 0.3);
    leftDecal.rotation.y = -Math.PI / 2;
    proceduralJet.add(leftDecal);

    const rightDecalMat = new THREE.MeshBasicMaterial({
      map: liveryTextureRight,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const rightDecal = new THREE.Mesh(decalGeo, rightDecalMat);
    rightDecal.position.set(0.94, 0.2, 0.3);
    rightDecal.rotation.y = Math.PI / 2;
    proceduralJet.add(rightDecal);

    // Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 2.6);
    wingShape.lineTo(11.2, -4.2);
    wingShape.lineTo(10.8, -5.4);
    wingShape.lineTo(0, -3.2);
    wingShape.closePath();

    const wingExtrudeSettings = {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    const rightWingGeo = new THREE.ExtrudeGeometry(wingShape, wingExtrudeSettings);
    rightWingGeo.rotateX(Math.PI / 2);
    const rightWing = new THREE.Mesh(rightWingGeo, titaniumMat);
    rightWing.position.set(0.65, -0.15, 0.2);
    rightWing.rotation.z = -0.04;
    proceduralJet.add(rightWing);

    const leftWingGeo = rightWingGeo.clone();
    leftWingGeo.scale(-1, 1, 1);
    const leftWing = new THREE.Mesh(leftWingGeo, titaniumMat);
    leftWing.position.set(-0.65, -0.15, 0.2);
    leftWing.rotation.z = 0.04;
    proceduralJet.add(leftWing);

    // Winglets
    const wingletGeo = new THREE.BoxGeometry(0.08, 1.4, 1.2);
    const rightWinglet = new THREE.Mesh(wingletGeo, goldAccentMat);
    rightWinglet.position.set(11.4, 0.5, -4.6);
    rightWinglet.rotation.z = -0.35;
    proceduralJet.add(rightWinglet);

    const leftWinglet = new THREE.Mesh(wingletGeo, goldAccentMat);
    leftWinglet.position.set(-11.4, 0.5, -4.6);
    leftWinglet.rotation.z = 0.35;
    proceduralJet.add(leftWinglet);

    // Engines
    const engineGeo = new THREE.CylinderGeometry(0.62, 0.58, 3.4, 32);
    engineGeo.rotateX(Math.PI / 2);
    const exhaustConeGeo = new THREE.ConeGeometry(0.46, 1.0, 24);
    exhaustConeGeo.rotateX(-Math.PI / 2);

    const rightEngine = new THREE.Group();
    rightEngine.position.set(3.8, -0.85, 0.2);
    rightEngine.add(new THREE.Mesh(engineGeo, titaniumMat));
    const rightGlow = new THREE.Mesh(exhaustConeGeo, exhaustGlowMat);
    rightGlow.position.set(0, 0, -1.8);
    rightEngine.add(rightGlow);
    const rightEngineLight = new THREE.PointLight(0x38bdf8, 2.5, 6);
    rightEngineLight.position.set(0, 0, -2.0);
    rightEngine.add(rightEngineLight);
    proceduralJet.add(rightEngine);

    const leftEngine = new THREE.Group();
    leftEngine.position.set(-3.8, -0.85, 0.2);
    leftEngine.add(new THREE.Mesh(engineGeo, titaniumMat));
    const leftGlow = new THREE.Mesh(exhaustConeGeo, exhaustGlowMat);
    leftGlow.position.set(0, 0, -1.8);
    leftEngine.add(leftGlow);
    const leftEngineLight = new THREE.PointLight(0x38bdf8, 2.5, 6);
    leftEngineLight.position.set(0, 0, -2.0);
    leftEngine.add(leftEngineLight);
    proceduralJet.add(leftEngine);

    // Tail Fin
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(0.3, 4.4);
    finShape.lineTo(1.8, 4.4);
    finShape.lineTo(3.4, 0);
    finShape.closePath();

    const finExtrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const finGeo = new THREE.ExtrudeGeometry(finShape, finExtrudeSettings);
    finGeo.rotateY(Math.PI / 2);
    const finMesh = new THREE.Mesh(finGeo, titaniumMat);
    finMesh.position.set(0.06, 0.8, -8.6);
    proceduralJet.add(finMesh);

    // Strobe on tail
    const strobeLight = new THREE.PointLight(0xffffff, 0, 14);
    strobeLight.position.set(0, 5.3, -7.4);
    proceduralJet.add(strobeLight);

    // Contrails
    const contrailCount = 140;
    const contrailGeo = new THREE.BufferGeometry();
    const contrailPos = new Float32Array(contrailCount * 3);
    for (let i = 0; i < contrailCount; i++) {
      const pIdx = i * 3;
      const isRight = i % 2 === 0;
      contrailPos[pIdx] = isRight ? 3.8 : -3.8;
      contrailPos[pIdx + 1] = -0.85;
      contrailPos[pIdx + 2] = -2.0 - (i / 2) * 0.45;
    }
    contrailGeo.setAttribute('position', new THREE.BufferAttribute(contrailPos, 3));
    const contrailMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.4,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const contrailPoints = new THREE.Points(contrailGeo, contrailMat);
    proceduralJet.add(contrailPoints);

    airplaneRoot.add(proceduralJet);

    // 8. Load Real 3D Boeing 787 CAD Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/models/boeing787.glb',
      (gltf) => {
        const boeingScene = gltf.scene;

        // Compute Bounding Box and scale uniformly to match scene
        const bbox = new THREE.Box3().setFromObject(boeingScene);
        const size = bbox.getSize(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z);
        const scaleFactor = 17.5 / maxAxis;
        boeingScene.scale.setScalar(scaleFactor);

        // Center origin at fuselage center
        const center = bbox.getCenter(new THREE.Vector3());
        boeingScene.position.set(
          -center.x * scaleFactor,
          -center.y * scaleFactor,
          -center.z * scaleFactor
        );

        // Apply dark luxury titanium and chrome PBR finish
        boeingScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const meshName = mesh.name.toLowerCase();
            if (meshName.includes('windows')) {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0xfff0c4,
                emissive: 0xffb84d,
                emissiveIntensity: 1.5,
              });
            } else if (meshName.includes('chrome') || meshName.includes('fan') || meshName.includes('pilot')) {
              mesh.material = goldAccentMat;
            } else if (meshName.includes('navlite') || meshName.includes('beacon')) {
              const isRed = meshName.includes('lh') || meshName.includes('red');
              mesh.material = new THREE.MeshBasicMaterial({
                color: isRed ? 0xff2222 : 0x22ff55,
              });
            } else {
              mesh.material = titaniumMat;
            }
          }
        });

        // Attach Dynamic Livery Plates and Strobes to Boeing 787
        const boeingDecalLeft = leftDecal.clone();
        boeingDecalLeft.scale.set(1.4, 1.4, 1.4);
        boeingDecalLeft.position.set(-1.15, 0.4, 2.5);
        boeingScene.add(boeingDecalLeft);

        const boeingDecalRight = rightDecal.clone();
        boeingDecalRight.scale.set(1.4, 1.4, 1.4);
        boeingDecalRight.position.set(1.15, 0.4, 2.5);
        boeingScene.add(boeingDecalRight);

        boeingScene.add(strobeLight.clone());

        // Smoothly swap procedural model with CAD model
        airplaneRoot.remove(proceduralJet);
        airplaneRoot.add(boeingScene);
      },
      undefined,
      (err) => {
        console.warn('Boeing 787 GLB loading error, maintaining procedural 3D model:', err);
      }
    );

    // 9. Flight Motion Path & Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();
    const flightDuration = 2400; // 2.4s total sequence
    let curtainPartedTriggered = false;
    let completedTriggered = false;

    const getFlightTransform = (t: number) => {
      // Smooth cubic bezier ease
      const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      // X: Sweeps diagonally across screen from top-left (-34) to center (0) to bottom-right (+36)
      const x = -34 + easeT * 70;

      // Y: Starts high (9), descends gently across camera (0.5), and sails past (-7)
      const y = 9 - Math.sin(easeT * Math.PI) * 4.5 - easeT * 11.5;

      // Z: Approaches from deep atmospheric background (-48) to near camera (3.5) to exit (+26)
      const z = -48 + easeT * 74;

      // Dynamic Banking Angles (Roll, Pitch, Yaw)
      const roll = (-0.45 * (1 - easeT) + 0.18 * Math.sin(easeT * Math.PI * 2)) * 0.7;
      const pitch = -0.08 + Math.cos(easeT * Math.PI) * 0.05;
      const yaw = Math.PI / 2 - 0.22 + easeT * 0.35;

      return { x, y, z, roll, pitch, yaw };
    };

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / flightDuration, 1.0);

      const tf = getFlightTransform(progress);
      airplaneRoot.position.set(tf.x, tf.y, tf.z);
      airplaneRoot.rotation.set(tf.pitch, tf.yaw, tf.roll);

      // Blinking strobe light
      const strobeOn = Math.sin(time * 0.012) > 0.75;
      strobeLight.intensity = strobeOn ? 4.5 : 0;

      // Engine exhaust glow flicker
      rightEngineLight.intensity = 2.2 + Math.sin(time * 0.02) * 0.6;
      leftEngineLight.intensity = 2.2 + Math.cos(time * 0.02) * 0.6;

      // Drift starfield past camera
      const starPosAttr = starGeo.attributes.position as THREE.BufferAttribute;
      const positions = starPosAttr.array as Float32Array;
      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] -= 0.18;
        if (positions[i] < -45) {
          positions[i] = 45;
        }
      }
      starPosAttr.needsUpdate = true;

      // Trigger curtain opening as the airplane sweeps across center stage
      if (progress >= 0.44 && !curtainPartedTriggered) {
        curtainPartedTriggered = true;
        onCurtainOpenRef.current();
      }

      // Finish sequence
      if (progress >= 1.0 && !completedTriggered) {
        completedTriggered = true;
        onCompleteRef.current();
        return;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 10. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      starGeo.dispose();
      starMat.dispose();
      noseGeo.dispose();
      needleGeo.dispose();
      cabinGeo.dispose();
      canopyGeo.dispose();
      tailGeo.dispose();
      decalGeo.dispose();
      rightWingGeo.dispose();
      leftWingGeo.dispose();
      wingletGeo.dispose();
      engineGeo.dispose();
      exhaustConeGeo.dispose();
      finGeo.dispose();
      contrailGeo.dispose();
      contrailMat.dispose();

      titaniumMat.dispose();
      goldAccentMat.dispose();
      cockpitMat.dispose();
      chromeMat.dispose();
      exhaustGlowMat.dispose();
      leftDecalMat.dispose();
      rightDecalMat.dispose();
      liveryTextureLeft.dispose();
      liveryTextureRight.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [ownerName]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{ overflow: 'hidden' }}
    />
  );
};
