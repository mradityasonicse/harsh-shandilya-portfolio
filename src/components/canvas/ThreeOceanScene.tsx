import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeOceanSceneProps {
  scrollProgress: number;
}

export const ThreeOceanScene: React.FC<ThreeOceanSceneProps> = ({
  scrollProgress,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0906);
    scene.fog = new THREE.FogExp2(0x0b0906, 0.024);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.5, 13);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0x1a2634, 0.9);
    scene.add(ambientLight);

    // Directional celestial light (Moon or Blood Moon)
    const moonLight = new THREE.DirectionalLight(0xd4e5ff, 2.4);
    moonLight.position.set(-20, 32, -35);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 1024;
    moonLight.shadow.mapSize.height = 1024;
    scene.add(moonLight);

    // Horizon Sunset / Ember Light
    const sunsetLight = new THREE.DirectionalLight(0xff6a00, 1.2);
    sunsetLight.position.set(25, 4, -40);
    scene.add(sunsetLight);

    // Ship Stern Lantern (Warm golden flicker)
    const lanternLight = new THREE.PointLight(0xffaa22, 2.8, 14, 1.8);
    lanternLight.position.set(0, 2.2, -3.2);
    scene.add(lanternLight);

    // 3. Moon / Blood Celestial Mesh
    const moonGeo = new THREE.SphereGeometry(3.6, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xfff3db });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(-25, 28, -60);
    scene.add(moonMesh);

    // Atmospheric Glow Halo
    const haloGeo = new THREE.SphereGeometry(5.2, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x4a7a96,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    moonMesh.add(haloMesh);

    // 4. Procedural 3D Black Pearl Galleon Ship
    const shipGroup = new THREE.Group();
    scene.add(shipGroup);

    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x120e0b,
      roughness: 0.82,
      metalness: 0.2,
    });

    const hullTrimMat = new THREE.MeshStandardMaterial({
      color: 0xc9a227,
      roughness: 0.35,
      metalness: 0.8,
    });

    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      roughness: 0.3,
      metalness: 0.9,
    });

    // Main Keel & Lower Hull
    const mainHullGeo = new THREE.BoxGeometry(2.4, 1.6, 7.2);
    const mainHull = new THREE.Mesh(mainHullGeo, hullMat);
    mainHull.position.y = 0.5;
    mainHull.castShadow = true;
    shipGroup.add(mainHull);

    // Bow (Forward Tapered Triangle)
    const bowGeo = new THREE.ConeGeometry(1.4, 2.4, 4);
    const bowMesh = new THREE.Mesh(bowGeo, hullMat);
    bowMesh.rotation.x = -Math.PI / 2;
    bowMesh.rotation.y = Math.PI / 4;
    bowMesh.position.set(0, 0.6, 4.3);
    shipGroup.add(bowMesh);

    // Bowsprit Pole
    const bowspritGeo = new THREE.CylinderGeometry(0.08, 0.14, 3.4, 8);
    const bowspritMesh = new THREE.Mesh(bowspritGeo, hullMat);
    bowspritMesh.rotation.x = Math.PI / 3;
    bowspritMesh.position.set(0, 1.5, 5.3);
    shipGroup.add(bowspritMesh);

    // Stern Poop Deck / Captain's Quarters
    const sternGeo = new THREE.BoxGeometry(2.2, 1.8, 2.4);
    const sternMesh = new THREE.Mesh(sternGeo, hullMat);
    sternMesh.position.set(0, 1.4, -2.4);
    shipGroup.add(sternMesh);

    // Captain's Cabin Windows
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xffb733 });
    for (let i = -0.7; i <= 0.7; i += 0.7) {
      const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.5), windowMat);
      windowMesh.position.set(i, 1.5, -3.61);
      windowMesh.rotation.y = Math.PI;
      shipGroup.add(windowMesh);
    }

    // Brass Gunport Trim Bars
    const trimBarLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 6.8), hullTrimMat);
    trimBarLeft.position.set(1.22, 0.8, 0.2);
    shipGroup.add(trimBarLeft);

    const trimBarRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 6.8), hullTrimMat);
    trimBarRight.position.set(-1.22, 0.8, 0.2);
    shipGroup.add(trimBarRight);

    // 8 3D Cannon Barrels protruding from Gunports
    const cannonPositions = [-2.0, -0.8, 0.4, 1.6];
    const cannonBarrels: THREE.Mesh[] = [];
    cannonPositions.forEach((zPos) => {
      // Port side barrel (left)
      const barrelGeo = new THREE.CylinderGeometry(0.09, 0.13, 0.9, 10);
      const portBarrel = new THREE.Mesh(barrelGeo, gunmetalMat);
      portBarrel.rotation.z = Math.PI / 2;
      portBarrel.position.set(1.4, 0.8, zPos);
      shipGroup.add(portBarrel);
      cannonBarrels.push(portBarrel);

      // Starboard side barrel (right)
      const starBarrel = new THREE.Mesh(barrelGeo, gunmetalMat);
      starBarrel.rotation.z = -Math.PI / 2;
      starBarrel.position.set(-1.4, 0.8, zPos);
      shipGroup.add(starBarrel);
      cannonBarrels.push(starBarrel);
    });

    // Triple Masts (Fore, Main, Mizzen)
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x1f1711, roughness: 0.9 });
    const sailMat = new THREE.MeshStandardMaterial({
      color: 0x181412,
      roughness: 0.95,
      side: THREE.DoubleSide,
    });

    const mastPositions = [
      { z: 2.2, height: 6.2, sailWidth: 2.6, sailHeight: 1.6 },
      { z: 0.0, height: 7.4, sailWidth: 3.2, sailHeight: 2.0 },
      { z: -2.0, height: 5.6, sailWidth: 2.2, sailHeight: 1.4 },
    ];

    mastPositions.forEach((m) => {
      // Mast pole
      const mastGeo = new THREE.CylinderGeometry(0.1, 0.16, m.height, 12);
      const mastMesh = new THREE.Mesh(mastGeo, mastMat);
      mastMesh.position.set(0, m.height / 2 + 0.8, m.z);
      shipGroup.add(mastMesh);

      // Yardarm cross beam
      const yardGeo = new THREE.CylinderGeometry(0.06, 0.08, m.sailWidth + 0.6, 8);
      const yardMesh = new THREE.Mesh(yardGeo, mastMat);
      yardMesh.rotation.z = Math.PI / 2;
      yardMesh.position.set(0, m.height * 0.75, m.z);
      shipGroup.add(yardMesh);

      // Billowing curved sail
      const sailGeo = new THREE.PlaneGeometry(m.sailWidth, m.sailHeight, 16, 16);
      const pos = sailGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const curve = Math.sin((y / m.sailHeight + 0.5) * Math.PI) * 0.45;
        pos.setZ(i, curve);
      }
      sailGeo.computeVertexNormals();

      const sailMesh = new THREE.Mesh(sailGeo, sailMat);
      sailMesh.position.set(0, m.height * 0.68, m.z + 0.15);
      shipGroup.add(sailMesh);
    });

    // Jolly Roger Flag atop Main Mast
    const flagGeo = new THREE.PlaneGeometry(1.2, 0.8, 12, 8);
    const flagMat = new THREE.MeshBasicMaterial({
      color: 0x050403,
      side: THREE.DoubleSide,
    });
    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.set(0.6, 8.0, 0);
    flagMesh.rotation.y = Math.PI / 2;
    shipGroup.add(flagMesh);

    // 5. Kinematic 10,000-Vertex Ocean Surface with Specular Sheen
    const oceanSegments = 100;
    const oceanGeo = new THREE.PlaneGeometry(140, 140, oceanSegments, oceanSegments);
    oceanGeo.rotateX(-Math.PI / 2);

    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x07151c,
      roughness: 0.18,
      metalness: 0.88,
      wireframe: false,
    });

    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    oceanMesh.receiveShadow = true;
    oceanMesh.position.y = -0.4;
    scene.add(oceanMesh);

    const initialPositions = oceanGeo.attributes.position.array.slice();

    // 6. Atmospheric Embers Particle Storm (250+ floating particles)
    const emberCount = 260;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 45;
      emberPositions[i * 3 + 1] = Math.random() * 14;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 45;

      emberVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      emberVelocities[i * 3 + 1] = Math.random() * 0.035 + 0.012;
      emberVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xff7a1a,
      size: 0.22,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const embersPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(embersPoints);

    // Atmospheric Night Lighting Setup
    scene.background = new THREE.Color(0x0b0906);
    scene.fog = new THREE.FogExp2(0x0b0906, 0.024);
    moonMat.color.setHex(0xfff3db);
    haloMat.color.setHex(0x4a7a96);
    moonLight.color.setHex(0xd4e5ff);
    ambientLight.color.setHex(0x1a2634);
    oceanMat.color.setHex(0x07151c);
    emberMat.color.setHex(0xff7a1a);

    // Mouse Tracking for Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation & Physics Loop
    let animationFrameId: number;
    let clock = new THREE.Timer();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock.update();
      const time = clock.getElapsed();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // (A) Wave Kinematics on Ocean Vertices
      const posAttr = oceanGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = initialPositions[i * 3];
        const w = initialPositions[i * 3 + 2];

        // Sum of sinusoidal traveling waves
        const wave1 = Math.sin(u * 0.15 + time * 1.6) * 0.35;
        const wave2 = Math.cos(w * 0.18 + time * 1.2) * 0.28;
        const wave3 = Math.sin((u + w) * 0.08 + time * 0.9) * 0.22;

        posAttr.setY(i, wave1 + wave2 + wave3);
      }
      posAttr.needsUpdate = true;
      oceanGeo.computeVertexNormals();

      // (B) Coupled Ship Buoyancy & Wave Pitch/Roll Physics
      const shipWave = Math.sin(time * 1.4) * 0.22;
      shipGroup.position.y = -0.05 + shipWave;
      shipGroup.rotation.z = Math.sin(time * 0.9) * 0.045 + mouse.x * 0.03; // Roll
      shipGroup.rotation.x = Math.cos(time * 1.2) * 0.035 + mouse.y * 0.02; // Pitch
      shipGroup.rotation.y = Math.sin(time * 0.4) * 0.025; // Yaw drift

      // Flag wave animation
      const flagPos = flagGeo.attributes.position;
      for (let i = 0; i < flagPos.count; i++) {
        const fx = flagPos.getX(i);
        flagPos.setZ(i, Math.sin(fx * 4 + time * 7) * 0.15);
      }
      flagPos.needsUpdate = true;

      // Lantern light flicker
      lanternLight.intensity = 2.4 + Math.sin(time * 12) * 0.6 + Math.cos(time * 23) * 0.4;

      // (D) Ember Particle Rising Loop
      const emberPos = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        emberPos[i * 3 + 1] += emberVelocities[i * 3 + 1];
        emberPos[i * 3] += Math.sin(time * 2 + i) * 0.018;

        if (emberPos[i * 3 + 1] > 14) {
          emberPos[i * 3 + 1] = 0.5;
          emberPos[i * 3] = (Math.random() - 0.5) * 45;
          emberPos[i * 3 + 2] = (Math.random() - 0.5) * 45;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // (E) Scroll-Driven Camera Motion
      const p = scrollProgress;
      const targetCamX = Math.sin(p * Math.PI * 2) * 5.0 + mouse.x * 1.2;
      const targetCamY = 3.5 + p * 3.8 + mouse.y * 0.8;
      const targetCamZ = 13.0 - p * 6.5;

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      const targetLookAt = new THREE.Vector3(0, 1.2 + p * 0.8, -p * 2);
      camera.lookAt(targetLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.98 }}
    />
  );
};
