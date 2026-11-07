import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeOceanSceneProps {
  scrollProgress: number;
}

export const ThreeOceanScene: React.FC<ThreeOceanSceneProps> = ({
  scrollProgress,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, High-Precision WebGL Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05080c);
    scene.fog = new THREE.FogExp2(0x05080c, 0.022);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.8, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Cinematic Volumetric Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1624, 1.2);
    scene.add(ambientLight);

    // Directional celestial light (Moonlight)
    const moonLight = new THREE.DirectionalLight(0xe2f1ff, 2.8);
    moonLight.position.set(-25, 35, -45);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 1024;
    moonLight.shadow.mapSize.height = 1024;
    scene.add(moonLight);

    // Horizon Champagne/Golden Rim Light
    const horizonGoldLight = new THREE.DirectionalLight(0xdfbe7a, 1.4);
    horizonGoldLight.position.set(28, 6, -35);
    scene.add(horizonGoldLight);

    // Warm Ship Lantern PointLight (Stern / Poop Deck)
    const sternLantern = new THREE.PointLight(0xffaa22, 3.2, 16, 1.8);
    sternLantern.position.set(0, 2.2, -3.2);
    scene.add(sternLantern);

    // Forward Bow Lantern (Emerald / Cyan St. Elmo's Fire)
    const bowLantern = new THREE.PointLight(0x06b6d4, 1.6, 12, 2.0);
    bowLantern.position.set(0, 1.8, 5.0);
    scene.add(bowLantern);

    // 3. Celestial Moon Mesh with Atmospheric Corona
    const moonGeo = new THREE.SphereGeometry(4.0, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(-28, 30, -65);
    scene.add(moonMesh);

    // Outer Atmospheric Glow Halo
    const haloGeo = new THREE.SphereGeometry(6.2, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    moonMesh.add(haloMesh);

    // 4. Starfield Canopy (600+ Twinkling Celestial Stars)
    const starCount = 650;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 180;
      starPositions[i * 3 + 1] = Math.random() * 60 + 8;
      starPositions[i * 3 + 2] = -Math.random() * 120 - 20;
      starScales[i] = Math.random() * 0.8 + 0.2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.45,
      transparent: true,
      opacity: 0.85,
    });
    const starsPoints = new THREE.Points(starGeo, starMat);
    scene.add(starsPoints);

    // 5. 3D Flagship Galleon Vessel Architecture
    const shipGroup = new THREE.Group();
    scene.add(shipGroup);

    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f16,
      roughness: 0.85,
      metalness: 0.25,
    });

    const brassTrimMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.35,
      metalness: 0.85,
    });

    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.9,
    });

    // Keel & Lower Hull
    const mainHullGeo = new THREE.BoxGeometry(2.4, 1.6, 7.2);
    const mainHull = new THREE.Mesh(mainHullGeo, hullMat);
    mainHull.position.y = 0.5;
    mainHull.castShadow = true;
    shipGroup.add(mainHull);

    // Forward Tapered Bow
    const bowGeo = new THREE.ConeGeometry(1.4, 2.4, 4);
    const bowMesh = new THREE.Mesh(bowGeo, hullMat);
    bowMesh.rotation.x = -Math.PI / 2;
    bowMesh.rotation.y = Math.PI / 4;
    bowMesh.position.set(0, 0.6, 4.3);
    shipGroup.add(bowMesh);

    // Bowsprit Navigation Mast
    const bowspritGeo = new THREE.CylinderGeometry(0.08, 0.14, 3.4, 8);
    const bowspritMesh = new THREE.Mesh(bowspritGeo, hullMat);
    bowspritMesh.rotation.x = Math.PI / 3;
    bowspritMesh.position.set(0, 1.5, 5.3);
    shipGroup.add(bowspritMesh);

    // Stern Poop Deck & Cabin
    const sternGeo = new THREE.BoxGeometry(2.2, 1.8, 2.4);
    const sternMesh = new THREE.Mesh(sternGeo, hullMat);
    sternMesh.position.set(0, 1.4, -2.4);
    shipGroup.add(sternMesh);

    // Cabin Windows with warm golden candlelight
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xffaa22 });
    for (let i = -0.7; i <= 0.7; i += 0.7) {
      const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.5), windowMat);
      windowMesh.position.set(i, 1.5, -3.61);
      windowMesh.rotation.y = Math.PI;
      shipGroup.add(windowMesh);
    }

    // Brass Gunport Trim Bars (Port & Starboard)
    const trimBarLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 6.8), brassTrimMat);
    trimBarLeft.position.set(1.22, 0.8, 0.2);
    shipGroup.add(trimBarLeft);

    const trimBarRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 6.8), brassTrimMat);
    trimBarRight.position.set(-1.22, 0.8, 0.2);
    shipGroup.add(trimBarRight);

    // 8 3D Cannon Barrels
    const cannonPositions = [-2.0, -0.8, 0.4, 1.6];
    cannonPositions.forEach((zPos) => {
      const barrelGeo = new THREE.CylinderGeometry(0.09, 0.13, 0.9, 10);
      const portBarrel = new THREE.Mesh(barrelGeo, gunmetalMat);
      portBarrel.rotation.z = Math.PI / 2;
      portBarrel.position.set(1.4, 0.8, zPos);
      shipGroup.add(portBarrel);

      const starBarrel = new THREE.Mesh(barrelGeo, gunmetalMat);
      starBarrel.rotation.z = -Math.PI / 2;
      starBarrel.position.set(-1.4, 0.8, zPos);
      shipGroup.add(starBarrel);
    });

    // Triple Masts & Curved Billowing Sails
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x141b24, roughness: 0.9 });
    const sailMat = new THREE.MeshStandardMaterial({
      color: 0x090e16,
      roughness: 0.9,
      side: THREE.DoubleSide,
    });

    const mastPositions = [
      { z: 2.2, height: 6.2, sailWidth: 2.6, sailHeight: 1.6 },
      { z: 0.0, height: 7.4, sailWidth: 3.2, sailHeight: 2.0 },
      { z: -2.0, height: 5.6, sailWidth: 2.2, sailHeight: 1.4 },
    ];

    mastPositions.forEach((m) => {
      const mastGeo = new THREE.CylinderGeometry(0.1, 0.16, m.height, 12);
      const mastMesh = new THREE.Mesh(mastGeo, mastMat);
      mastMesh.position.set(0, m.height / 2 + 0.8, m.z);
      shipGroup.add(mastMesh);

      const yardGeo = new THREE.CylinderGeometry(0.06, 0.08, m.sailWidth + 0.6, 8);
      const yardMesh = new THREE.Mesh(yardGeo, mastMat);
      yardMesh.rotation.z = Math.PI / 2;
      yardMesh.position.set(0, m.height * 0.75, m.z);
      shipGroup.add(yardMesh);

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

    // Naval Astrolabe Pennant atop Main Mast
    const flagGeo = new THREE.PlaneGeometry(1.2, 0.8, 12, 8);
    const flagMat = new THREE.MeshBasicMaterial({
      color: 0x05080c,
      side: THREE.DoubleSide,
    });
    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.set(0.6, 8.0, 0);
    flagMesh.rotation.y = Math.PI / 2;
    shipGroup.add(flagMesh);

    // 6. Kinematic Gerstner Wave Ocean Surface (120x120 Segments)
    const oceanSegments = 100;
    const oceanGeo = new THREE.PlaneGeometry(150, 150, oceanSegments, oceanSegments);
    oceanGeo.rotateX(-Math.PI / 2);

    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x050f18,
      roughness: 0.16,
      metalness: 0.88,
      wireframe: false,
    });

    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    oceanMesh.receiveShadow = true;
    oceanMesh.position.y = -0.4;
    scene.add(oceanMesh);

    const initialPositions = oceanGeo.attributes.position.array.slice();

    // 7. Atmospheric Golden Starlight & Sea Mist Particles (280 Motes)
    const emberCount = 280;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 50;
      emberPositions[i * 3 + 1] = Math.random() * 15;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      emberVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      emberVelocities[i * 3 + 1] = Math.random() * 0.03 + 0.012;
      emberVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xdfbe7a,
      size: 0.25,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const embersPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(embersPoints);

    // Mouse Tracking for Interactive Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Responsive Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. 60-120 FPS Gerstner Wave & Camera Choreography Loop
    let animationFrameId: number;
    let clock = new THREE.Timer();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock.update();
      const time = clock.getElapsed();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // (A) Gerstner Wave Equations on Ocean Vertices
      const posAttr = oceanGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = initialPositions[i * 3];
        const w = initialPositions[i * 3 + 2];

        // Multi-frequency trochoidal Gerstner swell simulation
        const g1 = Math.sin(u * 0.14 + time * 1.5) * 0.38;
        const g2 = Math.cos(w * 0.16 + time * 1.1) * 0.28;
        const g3 = Math.sin((u * 0.8 + w * 0.8) * 0.08 + time * 0.9) * 0.22;
        const g4 = Math.cos((u * 0.5 - w * 0.5) * 0.12 + time * 1.7) * 0.14;

        posAttr.setY(i, g1 + g2 + g3 + g4);
      }
      posAttr.needsUpdate = true;
      oceanGeo.computeVertexNormals();

      // (B) Galleon Buoyancy, Pitch & Roll Physics
      const shipWave = Math.sin(time * 1.4) * 0.24;
      const p = scrollProgressRef.current;
      // In Hero poster view (p close to 0), submerge/tuck the ship below horizon so the poster has clean focus
      // As user scrolls past 3%, the flagship galleon ascends majestically onto the waves
      const shipElevation = Math.min(Math.max((p - 0.02) * 12, 0), 1);
      shipGroup.position.y = -7.5 * (1 - shipElevation) - 0.06 + shipWave;
      shipGroup.position.z = -1.5 * (1 - shipElevation);
      shipGroup.rotation.z = Math.sin(time * 0.85) * 0.045 + mouse.x * 0.03; // Roll
      shipGroup.rotation.x = Math.cos(time * 1.1) * 0.035 + mouse.y * 0.02;  // Pitch
      shipGroup.rotation.y = Math.sin(time * 0.4) * 0.025;                   // Yaw

      // Pennant wave flutter
      const flagPos = flagGeo.attributes.position;
      for (let i = 0; i < flagPos.count; i++) {
        const fx = flagPos.getX(i);
        flagPos.setZ(i, Math.sin(fx * 4 + time * 6) * 0.15);
      }
      flagPos.needsUpdate = true;

      // Stern lantern warm flame flicker
      sternLantern.intensity = 2.8 + Math.sin(time * 12) * 0.5 + Math.cos(time * 24) * 0.3;

      // (C) Golden Starlight Rising Loop
      const emberPos = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        emberPos[i * 3 + 1] += emberVelocities[i * 3 + 1];
        emberPos[i * 3] += Math.sin(time * 2 + i) * 0.016;

        if (emberPos[i * 3 + 1] > 15) {
          emberPos[i * 3 + 1] = 0.5;
          emberPos[i * 3] = (Math.random() - 0.5) * 50;
          emberPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // (D) Cinematic Scroll-Driven Camera Choreography
      // Multi-stage camera flight:
      // Hero: front bow view | Skills: top mast overview | Projects: wide ocean wake | Contact: low horizon
      const targetCamX = Math.sin(p * Math.PI * 2.2) * 4.5 + mouse.x * 1.2;
      const targetCamY = 3.8 + p * 3.6 + mouse.y * 0.8;
      const targetCamZ = 14.0 - p * 7.2;

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      const targetLookAt = new THREE.Vector3(0, 1.2 + p * 0.9, -p * 2);
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
