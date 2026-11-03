import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const SPOTLIGHT_VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const SPOTLIGHT_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec2 uRes;        // layer size in CSS px
uniform float uDpr;
uniform float uTime;      // seconds, wrapped
uniform vec3 uGround;     // sRGB 0..1
uniform vec3 uKeyColor;   // sRGB 0..1
uniform vec3 uGelColor;
uniform vec4 uKeyGeo;     // apex.xy, land.xy  (CSS px, y down)
uniform vec4 uGelGeo;
uniform vec3 uKeyShape;   // pool half-width px, brightness, focus 0..1
uniform vec3 uGelShape;
uniform float uHaze;      // haze density, 0..~2

/* 3D simplex noise. Ashima Arts / Ian McEwan, MIT. */
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
    float sum = 0.0;
    float amp = 0.55;
    for (int i = 0; i < 3; i++) {
        sum += amp * snoise(p);
        p = p * 2.07 + vec3(19.1, -7.3, 3.7);
        amp *= 0.5;
    }
    return sum;
}

vec3 fixture(vec2 p, vec4 geo, vec3 shape) {
    vec2 apex = geo.xy;
    vec2 land = geo.zw;
    float halfW = max(shape.x, 4.0);
    float focus = shape.z;

    vec2 axis = land - apex;
    float len = max(length(axis), 1.0);
    vec2 dir = axis / len;
    vec2 nrm = vec2(-dir.y, dir.x);
    vec2 v = p - apex;
    float t = dot(v, dir);
    float s = dot(v, nrm);

    float radius = 4.0 + max(t, 0.0) * halfW / len;
    float u = abs(s) / radius;

    float chord = sqrt(max(1.0 - u * u, 0.0));
    float edge = smoothstep(1.0, mix(0.72, 0.86, focus), u);
    float start = smoothstep(0.0, 18.0, t);
    float fall = 1.7 / (1.0 + t / (0.14 * len));

    float floorY = (p.y - land.y) / (halfW * 0.3);
    float stopAt = (1.0 - smoothstep(-0.6, 0.9, floorY))
                 * (1.0 - smoothstep(len - 0.15 * halfW, len + 0.45 * halfW, t));

    float inside = edge * start * stopAt;
    float air = chord * inside * fall;

    vec2 e = (p - land) / (vec2(1.0 + 0.5 * abs(dir.x), 0.3) * halfW);
    float q = length(e);
    float pool = smoothstep(1.0, mix(0.55, 0.8, focus), q) * (0.45 + 0.55 * exp(-q * q * 2.2));
    pool += 0.08 * exp(-q * q * 0.5);

    float dl = length(v);
    float lamp = exp(-dl * dl / 10.0) * 2.4
               + 0.5 / (1.0 + dl * dl / 140.0)
               + 0.025 * exp(-dl / 60.0);
    lamp *= 0.7 + 0.3 * smoothstep(-30.0, 30.0, t);

    return vec3(air, pool, lamp);
}

vec3 toLinear(vec3 c) { return pow(max(c, 0.0), vec3(2.2)); }
vec3 toSrgb(vec3 c) { return pow(max(c, 0.0), vec3(1.0 / 2.2)); }

void main() {
    vec2 p = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;

    vec3 key = fixture(p, uKeyGeo, uKeyShape) * uKeyShape.y;
    vec3 gel = fixture(p, uGelGeo, uGelShape) * uGelShape.y;

    float density = 1.0;
    float lit = key.x + gel.x;
    if (lit > 0.0005) {
        vec3 hp = vec3(p / 230.0, 0.0);
        hp.xy += vec2(uTime * 0.011, -uTime * 0.017);
        hp.z = uTime * 0.045;
        float n = fbm(hp);
        density = mix(1.0, 0.12 + 1.75 * smoothstep(-0.45, 0.55, n), clamp(uHaze, 0.0, 1.0));
        density *= 0.55 + 0.45 * clamp(uHaze, 0.0, 2.0);
    }

    vec3 keyLin = toLinear(uKeyColor);
    vec3 gelLin = toLinear(uGelColor);

    const float AIR = 0.28;
    const float POOL = 0.075;
    vec3 light = keyLin * (key.x * density * AIR + key.y * POOL + key.z)
               + gelLin * (gel.x * density * AIR + gel.y * POOL + gel.z);

    // Light emitted over black so mix-blend-mode: screen adds only theatrical illumination
    vec3 col = 1.0 - exp(-light * 1.3);
    col = toSrgb(col);

    float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    col += (ign - 0.5) / 255.0;

    gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;

const SPOTLIGHT_KEY_FOLLOW = { duration: 0.85, ease: 'back.out(1.5)' };
const SPOTLIGHT_GEL_FOLLOW = { duration: 1.3, ease: 'back.out(1.8)' };
const SPOTLIGHT_IDLE_AFTER = 2.4;

const SpotlightCanvas = forwardRef(function SpotlightCanvas(
  {
    targetSelector = '.experience-heading',
    groundColor = '#130924',
    keyColor = '#fff6eb',
    gelColor = '#c084fc',
    haze = 0.65,
    intensity = 1.0,
  },
  ref
) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const apiRef = useRef(null);

  useImperativeHandle(ref, () => ({
    aim: (x, y) => apiRef.current?.aim(x, y),
    focus: (state) => apiRef.current?.focus(state),
    pulse: () => apiRef.current?.pulse(),
    playEntrance: () => apiRef.current?.playEntrance(),
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL spotlight fallback active', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    const canvas = renderer.domElement;
    canvas.className = 'spotlight__canvas';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.mixBlendMode = 'screen';
    container.insertBefore(canvas, container.firstChild);
    canvasRef.current = canvas;

    const hexToRgb = (hex) => {
      const c = new THREE.Color(hex);
      return [c.r, c.g, c.b];
    };

    const gRgb = hexToRgb(groundColor);
    const kRgb = hexToRgb(keyColor);
    const lRgb = hexToRgb(gelColor);

    renderer.setClearColor(new THREE.Color(0x000000), 1);

    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uDpr: { value: dpr },
      uTime: { value: 14.0 },
      uGround: { value: new THREE.Vector3(...gRgb) },
      uKeyColor: { value: new THREE.Vector3(...kRgb) },
      uGelColor: { value: new THREE.Vector3(...lRgb) },
      uKeyGeo: { value: new THREE.Vector4(0, -100, 0, 0) },
      uGelGeo: { value: new THREE.Vector4(0, -100, 0, 0) },
      uKeyShape: { value: new THREE.Vector3(120, 0, 0) },
      uGelShape: { value: new THREE.Vector3(120, 0, 0) },
      uHaze: { value: haze },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: SPOTLIGHT_VERTEX_SHADER,
      fragmentShader: SPOTLIGHT_FRAGMENT_SHADER,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    const scene = new THREE.Scene();
    scene.add(mesh);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geo = {
      w: 0, h: 0, fy: 0, poolW: 320,
      fx: { key: 0, gel: 0 },
      home: { kx: 0, ky: 0, gx: 0, gy: 0 },
      tx: 0, ty: 0,
    };

    const targetEl = container.closest('section')?.querySelector(targetSelector) || container.querySelector(targetSelector);

    const measure = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || 800;
      const narrow = w < 680;
      geo.w = w;
      geo.h = h;
      geo.fy = Math.max(16, Math.min(36, h * 0.04));
      geo.fx.key = w * (narrow ? 0.16 : 0.28);
      geo.fx.gel = w * (narrow ? 0.84 : 0.72);
      geo.poolW = Math.max(220, Math.min(500, w * (narrow ? 0.6 : 0.35)));

      let cx = w / 2;
      let cy = h * 0.45;
      let spread = geo.poolW * 0.22;

      if (targetEl) {
        const t = targetEl.getBoundingClientRect();
        geo.tx = t.left - rect.left;
        geo.ty = t.top - rect.top;
        cx = geo.tx + t.width / 2;
        cy = geo.ty + t.height / 2;
        spread = Math.min(t.width * 0.22, geo.poolW * 0.24);
      }

      geo.home.kx = cx - spread;
      geo.home.gx = cx + spread;
      geo.home.ky = cy;
      geo.home.gy = cy;

      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
      uniforms.uDpr.value = renderer.getPixelRatio();
    };

    const S = { kx: 0, ky: 0, gx: 0, gy: 0, on: 0, focus: 0, sway: 0, wide: 1 };
    const E = { kx: 0, ky: 0, gx: 0, gy: 0 };
    let entering = false;
    let clock = 14.0;
    let swayClock = 0;
    let energy = 0;
    let energySmooth = 0;
    let running = false;
    let destroyed = false;

    const toKX = gsap.quickTo(S, 'kx', SPOTLIGHT_KEY_FOLLOW);
    const toKY = gsap.quickTo(S, 'ky', SPOTLIGHT_KEY_FOLLOW);
    const toGX = gsap.quickTo(S, 'gx', SPOTLIGHT_GEL_FOLLOW);
    const toGY = gsap.quickTo(S, 'gy', SPOTLIGHT_GEL_FOLLOW);

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const aimTo = (x, y) => {
      const yy = clamp(y, geo.h * 0.22, geo.h * 1.02);
      const xx = clamp(x, -geo.w * 0.05, geo.w * 1.05);
      const offset = geo.poolW * 0.07;
      toKX(xx - offset);
      toKY(yy);
      toGX(xx + offset);
      toGY(yy);
    };

    const aimHome = (instant = false) => {
      if (instant) {
        toKX(geo.home.kx, geo.home.kx);
        toKY(geo.home.ky, geo.home.ky);
        toGX(geo.home.gx, geo.home.gx);
        toGY(geo.home.gy, geo.home.gy);
        return;
      }
      toKX(geo.home.kx);
      toKY(geo.home.ky);
      toGX(geo.home.gx);
      toGY(geo.home.gy);
    };

    const lastProps = {};
    const writeProp = (name, value) => {
      if (lastProps[name] === value || !targetEl) return;
      lastProps[name] = value;
      targetEl.style.setProperty(name, value);
    };

    const render = () => {
      if (destroyed) return;
      const I = intensity;
      const f = S.focus;
      const spread = S.wide * (1 + 0.25 * energySmooth * I) * (1 - 0.6 * f);
      const breathe = 1 + 0.05 * Math.sin(swayClock * 0.7) * S.sway;
      const bright = S.on * I * (1 + 0.28 * f) * breathe;
      const halfW = geo.poolW * spread * 0.5;

      uniforms.uTime.value = clock;
      uniforms.uHaze.value = haze * (1 + 1.1 * energySmooth * I);

      ['key', 'gel'].forEach((name, i) => {
        const isKey = name === 'key';
        const geoU = isKey ? uniforms.uKeyGeo.value : uniforms.uGelGeo.value;
        const shapeU = isKey ? uniforms.uKeyShape.value : uniforms.uGelShape.value;

        let ax = entering ? (isKey ? E.kx : E.gx) : (isKey ? S.kx : S.gx);
        const ay = entering ? (isKey ? E.ky : E.gy) : (isKey ? S.ky : S.gy);

        const fx = geo.fx[name];
        const dx = ax - fx;
        const dy = Math.max(38, ay - geo.fy);
        const sway = S.sway * I * (2 * Math.PI / 180) * Math.sin(swayClock * 0.55 + i * 1.9);
        const angle = Math.atan2(dx, dy) + sway;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const px = fx + Math.sin(angle) * dist;
        const py = geo.fy + Math.cos(angle) * dist;

        geoU.set(fx, geo.fy, px, py);
        shapeU.set(halfW, bright, f);

        if (targetEl) {
          const p = isKey ? '--spotlight-k' : '--spotlight-g';
          const rx = halfW * 1.3;
          writeProp(p + 'x', (px - geo.tx).toFixed(1) + 'px');
          writeProp(p + 'y', (py - geo.ty).toFixed(1) + 'px');
          writeProp(p + 'r', rx.toFixed(1) + 'px');
          writeProp(p + 'ry', (rx * 0.64).toFixed(1) + 'px');
          writeProp(p + 'a', clamp(S.on * I * (0.92 + 0.12 * f), 0, 1).toFixed(3));
        }
      });

      renderer.render(scene, camera);
    };

    const tick = (time, deltaTime) => {
      if (destroyed) return;
      const dt = clamp(deltaTime || 16.7, 0, 50) / 1000;
      clock += dt;
      swayClock += dt;
      energy *= Math.exp(-dt * 4);
      energySmooth += (energy - energySmooth) * Math.min(1, dt * 6);
      if (energySmooth < 0.002 && energy < 0.002) {
        energy = 0;
        energySmooth = 0;
      }
      render();
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      gsap.ticker.add(tick);
    };

    const stopLoop = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(tick);
    };

    const goIdle = () => {
      aimHome(false);
      gsap.to(S, { sway: 1, duration: 1.6, ease: 'sine.inOut', overwrite: 'auto' });
    };
    const idleCall = gsap.delayedCall(SPOTLIGHT_IDLE_AFTER, goIdle).pause();

    const noteInput = () => {
      if (S.sway > 0) {
        gsap.to(S, { sway: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      }
      idleCall.restart(true);
    };

    const focus = (onState) => {
      if (onState) {
        gsap.to(S, { focus: 1, duration: 0.28, ease: 'power3.out', overwrite: 'auto' });
      } else {
        gsap.to(S, { focus: 0, duration: 0.95, ease: 'elastic.out(1, 0.42)', overwrite: 'auto' });
      }
    };

    const pulse = () => {
      gsap.timeline()
        .to(S, { focus: 1, duration: 0.2, ease: 'power3.out', overwrite: 'auto' })
        .to(S, { focus: 0, duration: 0.9, ease: 'elastic.out(1, 0.42)' });
    };

    let entranceTl = null;
    const playEntrance = () => {
      if (entranceTl) entranceTl.kill();
      aimHome(true);
      const w = geo.w;
      const h = geo.h;
      const crossBy = Math.max(w * 0.18, geo.poolW * 0.55);

      E.kx = -w * 0.18;
      E.gx = w * 1.18;
      E.ky = h * 0.22;
      E.gy = h * 0.22;
      S.on = 0;
      S.sway = 0;
      S.wide = 1.35;
      entering = true;

      entranceTl = gsap.timeline({
        onComplete: () => {
          entering = false;
          entranceTl = null;
          idleCall.restart(true);
        },
      })
      .to(S, { on: 1, duration: 0.38, ease: 'power2.out' }, 0)
      .to(E, {
        kx: geo.home.kx + crossBy,
        gx: geo.home.gx - crossBy,
        ky: geo.home.ky - h * 0.05,
        gy: geo.home.gy - h * 0.05,
        duration: 0.85,
        ease: 'expo.inOut',
      }, 0)
      .to(E, {
        kx: geo.home.kx,
        gx: geo.home.gx,
        ky: geo.home.ky,
        gy: geo.home.gy,
        duration: 0.55,
        ease: 'expo.inOut',
      }, 0.85)
      .to(S, { wide: 1, duration: 0.9, ease: 'power2.inOut' }, 0.4);
    };

    measure();
    playEntrance();
    startLoop();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      noteInput();
      aimTo(x, y);
    };

    const handlePointerDown = (e) => {
      if (e.button !== 0) return;
      noteInput();
      focus(true);
    };

    const handlePointerUp = () => focus(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    const ro = new ResizeObserver(() => {
      measure();
      render();
    });
    ro.observe(container);

    apiRef.current = {
      aim: aimTo,
      focus,
      pulse,
      playEntrance,
    };

    return () => {
      destroyed = true;
      stopLoop();
      idleCall.kill();
      if (entranceTl) entranceTl.kill();
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [groundColor, keyColor, gelColor, haze, intensity, targetSelector]);

  return <div ref={containerRef} className="spotlight-canvas-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />;
});

export default SpotlightCanvas;
