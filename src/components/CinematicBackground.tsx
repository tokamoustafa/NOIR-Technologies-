import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // depth: 0.5 (distant) to 2.5 (foreground)
  radius: number;
  speedY: number;
  speedX: number;
  baseSpeedX: number;
  opacity: number;
  fadeSpeed: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

interface FogCluster {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  phase: number;
}

export const CinematicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse coordinates with smoothing (lerp)
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const targetCursor = useRef({ x: -1000, y: -1000 });
  const currentCursor = useRef({ x: -1000, y: -1000 });

  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check prefers-reduced-motion & setup mouse/scroll listeners
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handleMotionChange);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouse.current = {
        x: (e.clientX / innerWidth - 0.5) * 2, // -1 to 1
        y: (e.clientY / innerHeight - 0.5) * 2,
      };
      targetCursor.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth animation loop for mouse lerp
    let animId: number;
    const updateLerp = () => {
      const ease = 0.07;
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * ease;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * ease;

      currentCursor.current.x += (targetCursor.current.x - currentCursor.current.x) * 0.12;
      currentCursor.current.y += (targetCursor.current.y - currentCursor.current.y) * 0.12;

      setMouseParallax({
        x: currentMouse.current.x,
        y: currentMouse.current.y,
      });

      setCursorPos({
        x: currentCursor.current.x,
        y: currentCursor.current.y,
      });

      animId = requestAnimationFrame(updateLerp);
    };
    animId = requestAnimationFrame(updateLerp);

    // Initial emergence trigger
    const loadTimer = setTimeout(() => setIsLoaded(true), 120);

    return () => {
      mq.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
      clearTimeout(loadTimer);
    };
  }, []);

  // 60FPS Multi-Layer Canvas for Volumetric Smoke & Glowing Embers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Initialize Volumetric Fog Puffs (Multiple depth layers)
    const fogCount = Math.max(6, Math.min(10, Math.floor(width / 220)));
    const fogs: FogCluster[] = [];
    for (let i = 0; i < fogCount; i++) {
      fogs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 280 + 190,
        speedX: (Math.random() - 0.42) * 0.28,
        speedY: (Math.random() - 0.5) * 0.14,
        opacity: Math.random() * 0.05 + 0.02,
        maxOpacity: Math.random() * 0.07 + 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 2. Initialize 3D Floating Ember Particles
    const particleCount = Math.max(30, Math.min(70, Math.floor(width / 25)));
    const particles: Particle[] = [];
    const colors = [
      'rgba(255, 30, 45, ', // Neon Red (primary)
      'rgba(255, 60, 70, ', // Bright Crimson highlight
      'rgba(200, 20, 30, ', // Fiery Blood Red
      'rgba(139, 0, 0, ',   // Deep Crimson shadow
    ];

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 1.9 + 0.6; // depth factor
      const baseSpeedX = (Math.random() - 0.5) * 0.35 * z;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: (Math.random() * 1.5 + 0.6) * z,
        speedY: -(Math.random() * 0.38 + 0.14) * z,
        speedX: baseSpeedX,
        baseSpeedX,
        opacity: Math.random() * 0.65 + 0.15,
        fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // ---- LAYER A: Volumetric Red & Dark Charcoal Fog ----
      for (let i = 0; i < fogs.length; i++) {
        const f = fogs[i];
        f.x += f.speedX;
        f.y += f.speedY;
        f.phase += 0.01;

        // Wrap seamlessly
        if (f.x - f.radius > width) f.x = -f.radius;
        if (f.x + f.radius < 0) f.x = width + f.radius;
        if (f.y - f.radius > height) f.y = -f.radius;
        if (f.y + f.radius < 0) f.y = height + f.radius;

        const currentOpacity = f.opacity * (0.8 + 0.2 * Math.sin(f.phase));
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, `rgba(139, 0, 0, ${currentOpacity * 1.2})`);
        grad.addColorStop(0.45, `rgba(69, 0, 0, ${currentOpacity * 0.7})`);
        grad.addColorStop(0.8, `rgba(20, 3, 5, ${currentOpacity * 0.3})`);
        grad.addColorStop(1, 'rgba(5, 5, 5, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- LAYER B: Floating Embers with Sine Wave & Cursor Reactivity ----
      const curX = currentCursor.current.x;
      const curY = currentCursor.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.pulsePhase += p.pulseSpeed;

        // Sinusoidal horizontal gentle swaying
        p.x += p.baseSpeedX + Math.sin(time + p.pulsePhase) * 0.25;

        // Interactive cursor gentle magnetic deflection
        if (curX > 0 && curY > 0) {
          const dx = p.x - curX;
          const dy = p.y - curY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130 && dist > 0) {
            const force = (1 - dist / 130) * 1.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force * 0.5;
          }
        }

        // Pulse opacity smoothly
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.85) {
          p.opacity = 0.85;
          p.fadeSpeed = -Math.abs(p.fadeSpeed);
        } else if (p.opacity < 0.12) {
          p.opacity = 0.12;
          p.fadeSpeed = Math.abs(p.fadeSpeed);
        }

        // Loop boundaries seamlessly
        if (p.y < -12) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        const dynamicAlpha = p.opacity * (0.8 + 0.2 * Math.sin(p.pulsePhase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${dynamicAlpha})`;

        // Glow halo for foreground particles
        if (p.z > 1.2) {
          ctx.shadowBlur = 9 * p.z;
          ctx.shadowColor = '#FF1E2D';
        } else {
          ctx.shadowBlur = 3;
          ctx.shadowColor = '#8B0000';
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  // Scroll progression: smoothly scale, translate, and transition opacity
  const scrollRatio = Math.min(scrollY / 1600, 1);
  const bearOpacity = Math.max(0.38, 0.95 - scrollRatio * 0.5);
  const bearScale = 1 + scrollRatio * 0.08;
  const bearScrollY = scrollRatio * 85;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505] select-none"
      aria-hidden="true"
    >
      {/* =========================================================================
          LAYER 1: PITCH BLACK BASE & OBSIDIAN SHADOWS
          ========================================================================= */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* =========================================================================
          LAYER 2: SUBTLE CYBERPUNK TECHNOLOGICAL GRID & METALLIC TEXTURE
          ========================================================================= */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#150608_1px,transparent_1px),linear-gradient(to_bottom,#150608_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_85%_75%_at_60%_45%,#000_60%,transparent_100%)] opacity-30 transition-transform duration-700 ease-out"
        style={{
          transform: reducedMotion
            ? 'none'
            : `translate3d(${mouseParallax.x * 5}px, ${mouseParallax.y * 4}px, 0)`,
        }}
      />

      {/* Futuristic Telemetry Coordinate Accents (Subtle in deep graphite/crimson) */}
      <div className="absolute top-20 right-10 hidden xl:flex flex-col items-end gap-1 font-mono text-[9px] text-[#450000]/70 tracking-widest pointer-events-none">
        <span>[ SYS.OPTIC // APEX-01 ]</span>
        <span>LAT: 34.0522° N // LON: 118.2437° W</span>
        <span className="text-[#FF1E2D]/40 animate-pulse">RADAR: ACTIVE // 60FPS</span>
      </div>

      <div className="absolute bottom-12 left-8 hidden lg:flex items-center gap-3 font-mono text-[9px] text-[#450000]/60 tracking-widest pointer-events-none">
        <span>+ 001 // SECURE CORE</span>
        <span className="w-8 h-[1px] bg-[#450000]/40" />
        <span>NEURAL ENGINE ONLINE</span>
      </div>

      {/* =========================================================================
          LAYER 3: VOLUMETRIC ANGLED RED LIGHT BEAMS (GOD RAYS)
          ========================================================================= */}
      <div
        className="absolute -top-32 right-[10%] w-[550px] h-[950px] pointer-events-none mix-blend-screen opacity-40 transition-transform duration-1000 ease-out"
        style={{
          transform: reducedMotion
            ? 'rotate(-32deg)'
            : `rotate(-32deg) translate3d(${mouseParallax.x * 12}px, ${mouseParallax.y * 8}px, 0)`,
        }}
      >
        {/* Primary Volumetric Beam */}
        <div className="w-full h-full bg-gradient-to-b from-[#FF1E2D]/20 via-[#8B0000]/10 to-transparent blur-[85px] animate-[beamPulse_8s_ease-in-out_infinite]" />
      </div>

      <div
        className="absolute top-10 right-[35%] w-[380px] h-[750px] pointer-events-none mix-blend-screen opacity-25"
        style={{
          transform: 'rotate(-26deg)',
        }}
      >
        {/* Secondary Soft Beam */}
        <div className="w-full h-full bg-gradient-to-b from-[#8B0000]/25 via-[#450000]/15 to-transparent blur-[70px] animate-[beamPulse_10s_ease-in-out_infinite_2s]" />
      </div>

      {/* =========================================================================
          LAYER 4: THE CINEMATIC BLACK BEAR MASCOT EMERGING FROM SHADOWS
          ========================================================================= */}
      <div
        className={`absolute top-0 right-0 w-full lg:w-[65vw] xl:w-[60vw] h-full flex items-center justify-center lg:justify-end transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0 scale-95'
        }`}
        style={{
          transform: reducedMotion
            ? `translateY(${bearScrollY}px) scale(${bearScale})`
            : `translate3d(${mouseParallax.x * 16}px, ${mouseParallax.y * 11 + bearScrollY}px, 0) scale(${bearScale}) perspective(1200px) rotateY(${mouseParallax.x * 2.2}deg) rotateX(${-mouseParallax.y * 2.2}deg)`,
          opacity: bearOpacity,
        }}
      >
        {/* Bear Visual Container */}
        <div className="relative w-full h-full max-w-[1350px] flex items-center justify-center lg:justify-end pr-0 lg:pr-8 xl:pr-14">
          {/* Continuous Breathing & Natural Body Motion */}
          <div
            className={`relative h-[65vh] sm:h-[78vh] lg:h-[88vh] max-h-[920px] aspect-[16/9] max-w-full flex items-center justify-center lg:justify-end ${
              !reducedMotion ? 'animate-[bearBreathe_6.8s_ease-in-out_infinite]' : ''
            }`}
          >
            {/* Volumetric Crimson Rim Lighting Halos Behind the Bear Silhouette */}
            <div className="absolute top-[22%] right-[22%] w-[480px] h-[480px] bg-[#8B0000]/30 rounded-full blur-[110px] pointer-events-none mix-blend-screen" />
            <div className="absolute top-[32%] right-[28%] w-[280px] h-[280px] bg-[#FF1E2D]/20 rounded-full blur-[75px] pointer-events-none mix-blend-screen animate-pulse" />
            <div className="absolute top-[40%] right-[15%] w-[320px] h-[320px] bg-[#450000]/35 rounded-full blur-[90px] pointer-events-none" />

            {/* The Bear Masterwork Photograph */}
            <img
              src="/src/assets/images/noir_bear_hero_1792407106900.jpg"
              alt="NOIR Technologies Mysterious Black Bear Mascot emerging from shadows with glowing red eyes"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-125 brightness-95 select-none"
              style={{
                maskImage:
                  'radial-gradient(ellipse 72% 70% at 52% 47%, black 38%, rgba(0,0,0,0.7) 62%, transparent 92%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 72% 70% at 52% 47%, black 38%, rgba(0,0,0,0.7) 62%, transparent 92%)',
              }}
            />

            {/* INTENSE GLOWING NEON-RED EYES (Pinned exactly to bear's eyes in 16:9 frame) */}
            {/* Bear face is centered at X: ~51.2%, Y: ~48.6% */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Left Eye (Viewer's left: 47.8% X, 48.6% Y) */}
              <div
                className="absolute"
                style={{
                  left: '47.75%',
                  top: '48.6%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Crimson Glow Halo */}
                  <div className="absolute w-8 h-8 rounded-full bg-[#FF1E2D]/40 blur-[9px] animate-[eyePulse_3.4s_ease-in-out_infinite]" />
                  <div className="absolute w-16 h-16 rounded-full bg-[#8B0000]/30 blur-[18px] pointer-events-none" />

                  {/* Horizontal Anamorphic Lens Flare */}
                  <div className="absolute w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF1E2D] to-transparent opacity-85 blur-[0.5px] animate-[flareBreath_3.4s_ease-in-out_infinite]" />

                  {/* Core Glowing Crimson Eye */}
                  <div className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF1E2D] shadow-[0_0_12px_#FF1E2D,0_0_24px_#FF1E2D,0_0_45px_#FF1E2D,0_0_70px_rgba(255,30,45,0.9)] animate-[eyePulse_3.4s_ease-in-out_infinite]" />

                  {/* White-Hot Center Specular Reflection */}
                  <div className="absolute w-1 h-1 rounded-full bg-white opacity-85 blur-[0.4px]" />
                </div>
              </div>

              {/* Right Eye (Viewer's right: 54.7% X, 48.6% Y) */}
              <div
                className="absolute"
                style={{
                  left: '54.75%',
                  top: '48.6%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Crimson Glow Halo */}
                  <div className="absolute w-8 h-8 rounded-full bg-[#FF1E2D]/40 blur-[9px] animate-[eyePulse_3.4s_ease-in-out_infinite] [animation-delay:0.12s]" />
                  <div className="absolute w-16 h-16 rounded-full bg-[#8B0000]/30 blur-[18px] pointer-events-none" />

                  {/* Horizontal Anamorphic Lens Flare */}
                  <div className="absolute w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF1E2D] to-transparent opacity-85 blur-[0.5px] animate-[flareBreath_3.4s_ease-in-out_infinite] [animation-delay:0.12s]" />

                  {/* Core Glowing Crimson Eye */}
                  <div className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF1E2D] shadow-[0_0_12px_#FF1E2D,0_0_24px_#FF1E2D,0_0_45px_#FF1E2D,0_0_70px_rgba(255,30,45,0.9)] animate-[eyePulse_3.4s_ease-in-out_infinite] [animation-delay:0.12s]" />

                  {/* White-Hot Center Specular Reflection */}
                  <div className="absolute w-1 h-1 rounded-full bg-white opacity-85 blur-[0.4px]" />
                </div>
              </div>
            </div>

            {/* Dynamic Scanning Laser Beam Sweeping Over Bear Silhouette */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E2D]/85 to-transparent shadow-[0_0_18px_#FF1E2D] animate-[bearScanSweep_7s_easeInOut_infinite] pointer-events-none opacity-80" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAYER 5: DEEP VIGNETTES TO ENSURE HIGH CONTRAST & CRYSTAL-CLEAR TEXT
          ========================================================================= */}
      {/* Left-Side Gradient: Absolute black for headlines, typography, buttons */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/92 to-transparent w-full lg:w-[56%] z-[1] pointer-events-none" />
      {/* Top Gradient for Navbar legibility */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-[1] pointer-events-none" />
      {/* Bottom Gradient into lower sections */}
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-[1] pointer-events-none" />

      {/* =========================================================================
          LAYER 6: INTERACTIVE CURSOR RED FLASHLIGHT / SPOTLIGHT
          ========================================================================= */}
      {cursorPos.x > 0 && !reducedMotion && (
        <div
          className="absolute w-[440px] h-[440px] rounded-full pointer-events-none z-[2] transition-opacity duration-300"
          style={{
            transform: `translate3d(${cursorPos.x - 220}px, ${cursorPos.y - 220}px, 0)`,
            background:
              'radial-gradient(circle 220px, rgba(255,30,45,0.08) 0%, rgba(139,0,0,0.04) 45%, transparent 75%)',
          }}
        />
      )}

      {/* =========================================================================
          LAYER 7: 60FPS VOLUMETRIC SMOKE & FLOATING CRIMSON EMBERS CANVAS
          ========================================================================= */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90 z-[2] pointer-events-none"
      />

      {/* =========================================================================
          STYLES & KEYFRAME ANIMATIONS (Breathing, Eye Pulse, Scan Sweeps, Beams)
          ========================================================================= */}
      <style>{`
        @keyframes bearBreathe {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.016);
          }
        }

        @keyframes eyePulse {
          0%, 100% {
            opacity: 0.85;
            transform: scale(0.96);
            filter: drop-shadow(0 0 10px #FF1E2D) drop-shadow(0 0 25px #FF1E2D);
          }
          50% {
            opacity: 1;
            transform: scale(1.06);
            filter: drop-shadow(0 0 16px #FF1E2D) drop-shadow(0 0 38px #FF1E2D) drop-shadow(0 0 65px rgba(255,30,45,0.85));
          }
        }

        @keyframes flareBreath {
          0%, 100% {
            opacity: 0.65;
            transform: scaleX(0.85);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.15);
          }
        }

        @keyframes bearScanSweep {
          0% {
            top: 22%;
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            top: 78%;
            opacity: 0;
          }
        }

        @keyframes beamPulse {
          0%, 100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};
