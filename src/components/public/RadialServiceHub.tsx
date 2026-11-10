import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as THREE from "three";
import {
  Target,
  Code,
  ShoppingCart,
  Zap,
  Feather,
  Video,
  Search,
  Users,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RadialNode {
  id: string;
  name: string;
  shortDesc: string;
  slug: string;
  angle: number; // Angle in degrees (0 to 360)
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const radialNodes: RadialNode[] = [
  {
    id: "node-1",
    name: "Performance Marketing",
    shortDesc: "Meta & Google Ads scaled to 3x–5x ROAS",
    slug: "performance-marketing",
    angle: 270, // Top
    icon: Target,
    color: "#A855F7",
  },
  {
    id: "node-2",
    name: "Web Development",
    shortDesc: "High-speed conversion-tuned web platforms",
    slug: "website-development",
    angle: 315, // Top-Right
    icon: Code,
    color: "#00F5FF",
  },
  {
    id: "node-3",
    name: "E-commerce Development",
    shortDesc: "Custom Shopify & headless checkout funnels",
    slug: "ecommerce-development",
    angle: 0, // Right
    icon: ShoppingCart,
    color: "#3B82F6",
  },
  {
    id: "node-4",
    name: "Workflow Automation",
    shortDesc: "Zero manual data-entry webhook pipelines",
    slug: "workflow-automation",
    angle: 45, // Bottom-Right
    icon: Zap,
    color: "#F59E0B",
  },
  {
    id: "node-5",
    name: "Brand Identity",
    shortDesc: "Visual identity systems & commercial guidelines",
    slug: "brand-identity",
    angle: 90, // Bottom
    icon: Feather,
    color: "#10B981",
  },
  {
    id: "node-6",
    name: "Video & Content Production",
    shortDesc: "Direct-response ad hooks, 3D & motion graphics",
    slug: "video-content-production",
    angle: 135, // Bottom-Left
    icon: Video,
    color: "#EC4899",
  },
  {
    id: "node-7",
    name: "SEO & Organic Growth",
    shortDesc: "High-intent search rankings driving compounding revenue",
    slug: "seo",
    angle: 180, // Left
    icon: Search,
    color: "#06B6D4",
  },
  {
    id: "node-8",
    name: "Social & Creator Marketing",
    shortDesc: "Data-backed creator partnerships & paid UGC",
    slug: "social-media-marketing",
    angle: 225, // Top-Left
    icon: Users,
    color: "#8B5CF6",
  },
];

export function RadialServiceHub() {
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState<RadialNode>(radialNodes[0]);
  const [hoveredNode, setHoveredNode] = useState<RadialNode | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Direct DOM refs for 60/120 FPS lag-free scroll animation without React re-renders
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const haloRef = useRef<SVGCircleElement | null>(null);

  // Active/Hovered refs for direct RAF access without re-renders
  const activeNodeRef = useRef<RadialNode>(radialNodes[0]);
  const hoveredNodeRef = useRef<RadialNode | null>(null);

  useEffect(() => {
    activeNodeRef.current = activeNode;
  }, [activeNode]);

  useEffect(() => {
    hoveredNodeRef.current = hoveredNode;
  }, [hoveredNode]);

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const ringMeshRef = useRef<THREE.Mesh | null>(null);
  const outerRingMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Mouse & Scroll coordinates
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const scrollProgressTarget = useRef(0);
  const currentScrollProgress = useRef(0);

  // Target radius for expanded nodes
  const fullRadius = 210;

  // Scroll listener: Calculates exact scroll fraction relative to section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Generous, slow scroll travel:
      // Begins smoothly when top of hub reaches 85% of viewport
      // Reaches full expansion when centered at 15%
      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.15;
      const raw = (startTrigger - rect.top) / (startTrigger - endTrigger);
      scrollProgressTarget.current = Math.max(0, Math.min(1, raw));

      // 3D rotation offset (gentle)
      const visibleRatio = 1 - (rect.top + rect.height / 2) / windowHeight;
      scrollRef.current.target = visibleRatio * Math.PI * 0.5;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Three.js WebGL and Hardware-Accelerated Animation Loop
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 600;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    // 2. High-Performance Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Realistic Dynamic Lights for Reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f5ff, 4, 15);
    cyanLight.position.set(0, 0, 2);
    scene.add(cyanLight);
    lightRef.current = cyanLight;

    const purpleLight = new THREE.PointLight(0xa66be6, 3, 12);
    purpleLight.position.set(-3, -2, 2.5);
    scene.add(purpleLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    // 4. Central Reflective 3D Chrome Core
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1a102f,
      metalness: 0.92,
      roughness: 0.15,
      emissive: 0x6414b5,
      emissiveIntensity: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);
    coreMeshRef.current = coreMesh;

    const cageGeo = new THREE.IcosahedronGeometry(1.05, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreMesh.add(cageMesh);

    // 5. Orbiting Reflective Rings (Crisp, Solid Geometry without Sub-pixel Grain)
    const ringGeo = new THREE.TorusGeometry(2.55, 0.045, 24, 180);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.85,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.8;
    scene.add(ringMesh);
    ringMeshRef.current = ringMesh;

    const outerRingGeo = new THREE.TorusGeometry(3.15, 0.035, 24, 180);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.8,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 3.2;
    outerRingMesh.rotation.y = Math.PI / 6;
    scene.add(outerRingMesh);
    outerRingMeshRef.current = outerRingMesh;

    // 6. Floating Particle Field
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radiusDist = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radiusDist * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radiusDist * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 2] = radiusDist * Math.sin(phi);

      const isCyan = Math.random() > 0.45;
      colors[i * 3] = isCyan ? 0.0 : 0.65;
      colors[i * 3 + 1] = isCyan ? 0.96 : 0.42;
      colors[i * 3 + 2] = isCyan ? 1.0 : 0.9;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse move parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.4;
      mouseRef.current.targetY = y * 0.4;
    };

    mount.addEventListener("mousemove", handleMouseMove);

    // 7. Pure Hardware-Accelerated 60/120 FPS Animation Loop (Zero React Re-renders)
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Lerp mouse and scroll coordinates with slow, cinematic damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      scrollRef.current.current +=
        (scrollRef.current.target - scrollRef.current.current) * 0.05;

      // Silky, slow scroll interpolation (0.05 factor ensures zero abrupt popping)
      currentScrollProgress.current +=
        (scrollProgressTarget.current - currentScrollProgress.current) * 0.05;

      const p = currentScrollProgress.current;

      // ─── Simple, Slow, Unified Emergence from Hub Center ───
      // All nodes glide out gracefully together along their radial lines.
      // On reverse scroll, p decreases and all nodes smoothly retract back inside the center hub!
      const totalNodes = radialNodes.length;

      // Smoothstep easing for a gentle, natural glide
      const eased = Math.max(0, Math.min(1, p * p * (3 - 2 * p)));
      const currentRadius = fullRadius * eased;

      for (let i = 0; i < totalNodes; i++) {
        const node = radialNodes[i];
        const rad = (node.angle * Math.PI) / 180;
        const leftPercent = 50 + (currentRadius / 300) * 50 * Math.cos(rad);
        const topPercent = 50 + (currentRadius / 300) * 50 * Math.sin(rad);

        // Direct DOM update on node element
        const nodeEl = nodeRefs.current[i];
        if (nodeEl) {
          if (eased <= 0.02) {
            nodeEl.style.opacity = "0";
            nodeEl.style.pointerEvents = "none";
            nodeEl.style.transform = "translate(-50%, -50%) scale(0.2)";
            nodeEl.style.left = "50%";
            nodeEl.style.top = "50%";
          } else {
            const scale = 0.45 + eased * 0.55;
            nodeEl.style.opacity = `${Math.min(1, eased * 2.0)}`;
            nodeEl.style.pointerEvents = eased > 0.6 ? "auto" : "none";
            nodeEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
            nodeEl.style.left = `${leftPercent}%`;
            nodeEl.style.top = `${topPercent}%`;
          }
        }

        // Direct DOM update on laser line
        const lineEl = lineRefs.current[i];
        if (lineEl) {
          if (eased <= 0.04) {
            lineEl.style.opacity = "0";
          } else {
            const x = 300 + currentRadius * Math.cos(rad);
            const y = 300 + currentRadius * Math.sin(rad);
            lineEl.setAttribute("x2", `${x}`);
            lineEl.setAttribute("y2", `${y}`);
            const isHigh =
              activeNodeRef.current?.id === node.id ||
              hoveredNodeRef.current?.id === node.id;
            lineEl.style.opacity = `${eased * (isHigh ? 0.95 : 0.35)}`;
          }
        }
      }

      // Update center ambient halo radius
      if (haloRef.current) {
        haloRef.current.setAttribute("r", `${70 + 90 * p}`);
      }

      // Scale 3D rings dynamically with scroll progress
      const ringScale = Math.max(0.15, p);
      if (ringMesh) {
        ringMesh.scale.set(ringScale, ringScale, ringScale);
        ringMesh.rotation.z += 0.25 * delta;
        ringMesh.rotation.y = scrollRef.current.current * 0.8 + mouseRef.current.x * 0.3;
      }
      if (outerRingMesh) {
        outerRingMesh.scale.set(ringScale, ringScale, ringScale);
        outerRingMesh.rotation.z -= 0.18 * delta;
        outerRingMesh.rotation.x =
          Math.PI / 3.2 + scrollRef.current.current * 0.4 + mouseRef.current.y * 0.3;
      }

      // Rotate central chrome core with multi-axis tumble
      if (coreMesh) {
        coreMesh.rotation.y += 0.4 * delta;
        coreMesh.rotation.x = mouseRef.current.y * 0.8 + scrollRef.current.current * 0.5;
        coreMesh.rotation.z = mouseRef.current.x * 0.6;
      }

      // Rotate particle starfield
      if (particles) {
        particles.rotation.y += 0.12 * delta;
        particles.rotation.x = mouseRef.current.y * 0.3;
      }

      // Dynamic light tracking
      if (cyanLight) {
        const targetNode = hoveredNodeRef.current || activeNodeRef.current;
        if (targetNode) {
          const rad = (targetNode.angle * Math.PI) / 180;
          cyanLight.position.x = Math.cos(rad) * 2.5 * p;
          cyanLight.position.y = Math.sin(rad) * 2.5 * p;
        } else {
          cyanLight.position.x = Math.sin(time * 0.8) * 2.2 + mouseRef.current.x * 3;
          cyanLight.position.y = Math.cos(time * 0.8) * 2.2 + mouseRef.current.y * 3;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousemove", handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Full-Section High-DPI Star Sparkle Engine spanning the whole section
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const configureCanvas = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || 950;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    configureCanvas();
    window.addEventListener("resize", configureCanvas);

    // High-contrast celestial palettes for both light & dark environments
    const darkPalette = ["#00F5FF", "#C084FC", "#A855F7", "#FFFFFF", "#FDE047", "#38BDF8"];
    const lightPalette = ["#7C3AED", "#9333EA", "#4F46E5", "#0284C7", "#D97706", "#DB2777"];

    const count = 220;
    const sparkles = Array.from({ length: count }, () => {
      const isSparkle = Math.random() < 0.42; // ~42% are 4-point diamond star sparkles
      const colorIdx = Math.floor(Math.random() * darkPalette.length);

      return {
        isSparkle,
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || 950),
        outerR: isSparkle ? Math.random() * 4.5 + 4.5 : 0,
        innerR: isSparkle ? Math.random() * 0.7 + 1.1 : 0,
        r: isSparkle ? 0 : Math.random() * 1.5 + 0.8,
        angle: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.016,
        colorDark: darkPalette[colorIdx],
        colorLight: lightPalette[colorIdx],
        baseAlpha: Math.random() * 0.45 + 0.35,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.035 + 0.012,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";

      for (let i = 0; i < count; i++) {
        const s = sparkles[i];

        // Drift
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Twinkle pulse
        s.pulsePhase += s.pulseSpeed;
        const alpha = Math.max(
          0.15,
          Math.min(0.95, s.baseAlpha + Math.sin(s.pulsePhase) * 0.45)
        );
        const color = isDark ? s.colorDark : s.colorLight;

        if (s.isSparkle) {
          // Draw Crisp 4-Point Diamond Star Sparkle (✦)
          s.angle += s.vRot;
          const currentOuter = s.outerR * (0.8 + Math.sin(s.pulsePhase) * 0.25);
          const currentInner = s.innerR;

          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.angle);
          ctx.beginPath();
          for (let p = 0; p < 4; p++) {
            const aOuter = (p * Math.PI) / 2;
            const aInner = aOuter + Math.PI / 4;
            const ox = Math.cos(aOuter) * currentOuter;
            const oy = Math.sin(aOuter) * currentOuter;
            const ix = Math.cos(aInner) * currentInner;
            const iy = Math.sin(aInner) * currentInner;
            if (p === 0) {
              ctx.moveTo(ox, oy);
            } else {
              ctx.lineTo(ox, oy);
            }
            ctx.lineTo(ix, iy);
          }
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Bright pinpoint center diamond
          ctx.beginPath();
          ctx.arc(0, 0, currentInner * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "#FFFFFF" : "#FFFFFF";
          ctx.globalAlpha = Math.min(1, alpha * 1.3);
          ctx.fill();

          ctx.restore();
        } else {
          // Draw Crisp Starlight Dot
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", configureCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative py-16 px-4 select-none overflow-hidden"
    >
      {/* Full-Section Background Particle Field */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      {/* Header section */}
      <div className="max-w-4xl mx-auto text-center mb-10 relative z-20">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#00F5FF] bg-[#00F5FF]/10 px-4 py-1.5 rounded-full border border-[#00F5FF]/30 mb-3 shadow-[0_0_15px_rgba(0,245,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
          Integrated <span className="text-purple-600 dark:text-purple-400">Marketing & Tech</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
          Eight connected disciplines working together to scale customer acquisition and revenue.
        </p>
      </div>

      {/* ─── 3D WebGL Canvas & Scroll-Bound Emergence Stage ─── */}
      <div className="relative max-w-[680px] mx-auto aspect-square hidden md:flex items-center justify-center">
        {/* Three.js Canvas Container */}
        <div
          ref={mountRef}
          className="absolute inset-0 w-full h-full pointer-events-auto rounded-full"
          style={{ zIndex: 10 }}
        />

        {/* SVG Connector Beams: Managed directly via lineRefs for pure 60FPS performance */}
        <svg
          viewBox="0 0 600 600"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 15 }}
        >
          <defs>
            <radialGradient id="hubHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="activeBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#00F5FF" />
            </linearGradient>
          </defs>

          {/* Ambient center aura */}
          <circle
            ref={haloRef}
            cx="300"
            cy="300"
            r="70"
            fill="url(#hubHalo)"
          />

          {/* Connected Laser Lines to Nodes extending from center (300, 300) */}
          {radialNodes.map((node, i) => {
            const isHovered = hoveredNode?.id === node.id;
            const isActive = activeNode?.id === node.id;
            const isHighlighted = isHovered || isActive;

            return (
              <g key={`beam-${node.id}`}>
                <line
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  x1="300"
                  y1="300"
                  x2="300"
                  y2="300"
                  stroke={isHighlighted ? "url(#activeBeam)" : "currentColor"}
                  strokeWidth={isHighlighted ? "2.5" : "1"}
                  strokeDasharray={isHighlighted ? "none" : "3 4"}
                  className={cn(
                    "transition-[stroke,stroke-width] duration-200",
                    isHighlighted
                      ? "opacity-100 filter drop-shadow-[0_0_10px_#00F5FF]"
                      : "text-purple-300/30 dark:text-purple-500/20"
                  )}
                  style={{ opacity: 0 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Central Brand Emblem Core */}
        <div
          style={{ zIndex: 25 }}
          className="absolute w-36 h-36 rounded-full bg-white/90 dark:bg-[#120D1D]/90 backdrop-blur-xl border-2 border-purple-500 shadow-[0_0_40px_rgba(100,20,181,0.35)] flex flex-col items-center justify-center p-3 pointer-events-none transition-transform duration-300"
        >
          <img
            src="/images/logo-raw.jpeg"
            alt="Mad Ad Theory Emblem"
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/40 shadow-md"
          />
          <span className="text-[10px] font-heading font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider mt-1.5 text-center">
            Mad Ad Theory
          </span>
          <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            PERFORMANCE
          </span>
        </div>

        {/* 8 Symmetrically Placed Nodes: Emerges strictly as much as user scrolls */}
        {radialNodes.map((node, i) => {
          const isHovered = hoveredNode?.id === node.id;
          const isActive = activeNode?.id === node.id;
          const isSelected = isHovered || isActive;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) scale(0)",
                opacity: 0,
                zIndex: isSelected ? 40 : 30,
                pointerEvents: "none",
                willChange: "transform, opacity, left, top",
              }}
              className="absolute"
            >
              <Link
                to={`/services/${node.slug}`}
                onMouseEnter={() => {
                  setHoveredNode(node);
                  setActiveNode(node);
                }}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => navigate(`/services/${node.slug}`)}
                aria-label={`View ${node.name}`}
                className={cn(
                  "group relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer",
                  isSelected
                    ? "bg-white dark:bg-[#181126] border-2 border-[#00F5FF] text-[#00F5FF] scale-115 shadow-[0_0_35px_rgba(0,245,255,0.6)]"
                    : "bg-white/90 dark:bg-[#120D1D]/90 backdrop-blur-md border border-slate-200 dark:border-purple-500/20 text-slate-600 dark:text-slate-300 hover:border-purple-500 hover:text-purple-500 hover:scale-105 shadow-md"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-transform duration-200",
                    isSelected ? "scale-115 text-[#00F5FF]" : "group-hover:scale-110"
                  )}
                />

                {/* Floating Interactive Badge on Hover / Active */}
                {isSelected && (
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-[#171126] border border-[#00F5FF]/60 px-3.5 py-1.5 rounded-full text-xs font-heading font-black text-slate-900 dark:text-white shadow-xl z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                    <span>{node.name}</span>
                    <ExternalLink className="w-3 h-3 text-[#00F5FF] ml-0.5" />
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Active Service Showcase Card */}
      {activeNode && (
        <div className="hidden md:flex max-w-xl mx-auto mt-8 bg-white dark:bg-[#120D1D] border border-slate-200 dark:border-purple-500/20 rounded-2xl p-5 items-center justify-between shadow-xl relative z-20">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-black uppercase text-[#00C2D6] tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-ping" />
              Active Discipline Detail
            </span>
            <h4 className="font-heading font-black text-lg text-slate-900 dark:text-white">
              {activeNode.name}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {activeNode.shortDesc}
            </p>
          </div>
          <Link
            to={`/services/${activeNode.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white text-xs font-heading font-bold shadow-md shadow-purple-600/25 transition-all shrink-0 ml-4 group"
          >
            <span>Explore Discipline</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}

      {/* Mobile-Friendly Grid Fallback */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 relative z-20">
        {radialNodes.map((node) => {
          const Icon = node.icon;
          return (
            <Link
              key={`mob-${node.id}`}
              to={`/services/${node.slug}`}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-purple-500/20 bg-white dark:bg-[#120D1D] hover:border-[#00F5FF] transition-all shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00F5FF]/10 text-[#00F5FF] flex items-center justify-center shrink-0 border border-[#00F5FF]/30">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white truncate">
                  {node.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {node.shortDesc}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
