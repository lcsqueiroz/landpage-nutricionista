'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroGL.module.css';

// Camada WebGL sobre a foto do hero (grão, cor); sem WebGL a <img> fica visível

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform float uTime;
varying vec2 vUv;

// object-fit: cover com object-position 45% 50% (y medido de baixo)
vec2 cover(vec2 uv) {
  float rs = uRes.x / uRes.y;
  float ri = uImg.x / uImg.y;
  vec2 s = rs < ri ? vec2(rs / ri, 1.0) : vec2(1.0, ri / rs);
  return uv * s + (1.0 - s) * vec2(0.45, 0.5);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // Mesmo zoom fixo da <img> (scale 1.06) para a troca pelo canvas não dar salto
  vec2 uv = (vUv - 0.5) / 1.06 + 0.5;
  vec3 col = texture2D(uTex, cover(uv)).rgb;

  // Tratamento de cor: menos saturação, leve calor, contraste suave
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(l), col, 0.8);
  col *= vec3(1.03, 1.0, 0.93);
  col = (col - 0.5) * 1.04 + 0.5;

  // Grão de filme animado
  col += (hash(vUv * uRes + fract(uTime * 7.0)) - 0.5) * 0.04;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function setupGL(canvas, host, img) {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    premultipliedAlpha: false,
    powerPreference: 'high-performance',
  });
  if (!gl) return;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vs || !fs) return;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  // Quad de tela cheia
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = {};
  ['uTex', 'uRes', 'uImg', 'uTime'].forEach(
    (name) => (u[name] = gl.getUniformLocation(program, name))
  );

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.uniform1i(u.uTex, 0);

  // --- Estado animado (tudo com lerp) -----------------------------------
  const isTouch = !window.matchMedia('(pointer: fine)').matches;
  const dprCap = isTouch ? 1.5 : 2;

  let visible = true;
  let running = false;
  let ready = false;
  let rafId = 0;
  const t0 = performance.now();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const w = Math.round(host.clientWidth * dpr);
    const h = Math.round(host.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(u.uRes, w, h);
  };

  const frame = () => {
    if (!running) return;

    gl.uniform1f(u.uTime, (performance.now() - t0) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!ready) {
      ready = true;
      host.dataset.gl = 'on';
    }
    rafId = requestAnimationFrame(frame);
  };

  const play = () => {
    if (running || !visible || document.hidden) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  };

  const pause = () => {
    running = false;
    cancelAnimationFrame(rafId);
  };

  const start = () => {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.uniform2f(u.uImg, img.naturalWidth, img.naturalHeight);
    resize();
    play();
  };

  // Pausa fora da tela e com a aba em segundo plano
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else pause();
  });
  io.observe(host);

  const onVisibility = () => (document.hidden ? pause() : play());

  const onContextLost = (e) => {
    e.preventDefault();
    pause();
    delete host.dataset.gl;
  };

  const ro = new ResizeObserver(resize);
  ro.observe(host);

  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onContextLost);

  // Espera a imagem final (o next/image troca o src ao hidratar)
  const onImgLoad = () => start();
  if (img.complete && img.naturalWidth) start();
  else img.addEventListener('load', onImgLoad, { once: true });

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    img.removeEventListener('load', onImgLoad);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    delete host.dataset.gl;
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  };
}

// Interações que liberam o WebGL; sem nenhuma, ele entra depois de BOOT_DELAY
const BOOT_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'];
const BOOT_DELAY = 6000;

export default function HeroGL() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const img = host?.querySelector('img');
    if (!canvas || !host || !img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let teardown;
    // Shader e upload da textura são tarefas longas: ficam fora do carregamento (LCP/TBT)
    const boot = () => {
      clearTimeout(timer);
      BOOT_EVENTS.forEach((e) => window.removeEventListener(e, boot));
      teardown ??= setupGL(canvas, host, img);
    };
    const timer = setTimeout(boot, BOOT_DELAY);
    BOOT_EVENTS.forEach((e) => window.addEventListener(e, boot, { passive: true }));

    return () => {
      clearTimeout(timer);
      BOOT_EVENTS.forEach((e) => window.removeEventListener(e, boot));
      teardown?.();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
