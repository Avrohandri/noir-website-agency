// Nebula monokrom: fbm domain-warp + bintang, digambar di satu quad fullscreen.
// Dirender di resolusi lebih rendah lalu di-upscale lewat CSS supaya ringan di HP.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_flip;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = r * p * 2.02 + 3.1;
    a *= 0.5;
  }
  return v;
}

float stars(vec2 uv, float scale, float t) {
  vec2 g = uv * scale;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  float h = hash(id);
  if (h < 0.92) return 0.0;
  vec2 o = vec2(hash(id + 7.1), hash(id + 3.7)) - 0.5;
  float d = length(f - o * 0.7);
  float tw = 0.6 + 0.4 * sin(t * (1.0 + h * 3.0) + h * 40.0);
  return smoothstep(0.06, 0.0, d) * tw * (h - 0.92) * 12.5;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  if (u_flip > 0.5) frag.y = u_res.y - frag.y;
  vec2 uv = (frag - 0.5 * u_res) / min(u_res.x, u_res.y);
  float t = u_time * 0.035;

  vec2 m = (u_mouse - 0.5) * 0.15;
  vec2 p = uv * 1.6 + m;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t * 0.8)));
  vec2 r = vec2(
    fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.6),
    fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 0.4)
  );
  float n = fbm(p + 3.0 * r);

  // Pita nebula diagonal supaya komposisinya punya arah
  float band = exp(-pow((uv.y + uv.x * 0.45 - 0.05) * 1.7, 2.0));
  float cloud = smoothstep(0.35, 1.0, n) * (0.35 + 0.9 * band);
  float filament = pow(smoothstep(0.55, 0.95, length(r)), 3.0) * band;
  float dust = smoothstep(0.55, 0.25, fbm(p * 2.3 - t)) * band;

  float lum = cloud * 0.85 + filament * 0.55;
  lum *= mix(1.0, 0.35, dust);
  lum += stars(uv + t * 0.05, 90.0, u_time) * (1.0 - cloud);
  lum += stars(uv + t * 0.02, 220.0, u_time * 1.4) * 0.6;

  // Vignette
  lum *= smoothstep(1.45, 0.25, length(uv * vec2(0.85, 1.1)));

  // Monokrom dengan sedikit dingin di highlight
  vec3 col = vec3(lum) * vec3(0.97, 0.98, 1.0);
  col = pow(col, vec3(0.9));
  gl_FragColor = vec4(col, 1.0);
}
`

export type NebulaOptions = {
  flip?: boolean
  scale?: number
  animate?: boolean
}

export type NebulaHandle = {
  setActive: (active: boolean) => void
  destroy: () => void
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s))
  }
  return s
}

export function createNebula(canvas: HTMLCanvasElement, opts: NebulaOptions = {}): NebulaHandle | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
  if (!gl) return null

  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(prog, 'u_res')
  const uTime = gl.getUniformLocation(prog, 'u_time')
  const uMouse = gl.getUniformLocation(prog, 'u_mouse')
  gl.uniform1f(gl.getUniformLocation(prog, 'u_flip'), opts.flip ? 1 : 0)

  const scale = opts.scale ?? 0.5
  const animate = opts.animate ?? true
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
  let raf = 0
  let active = false
  const start = performance.now() - Math.random() * 20000

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr * scale))
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr * scale))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    gl.uniform2f(uRes, w, h)
  }

  const draw = (now: number) => {
    mouse.x += (mouse.tx - mouse.x) * 0.03
    mouse.y += (mouse.ty - mouse.y) * 0.03
    gl.uniform1f(uTime, (now - start) / 1000)
    gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const loop = (now: number) => {
    draw(now)
    if (active && animate) raf = requestAnimationFrame(loop)
  }

  const onMove = (e: PointerEvent) => {
    mouse.tx = e.clientX / window.innerWidth
    mouse.ty = 1 - e.clientY / window.innerHeight
  }

  const ro = new ResizeObserver(() => {
    resize()
    if (!active || !animate) draw(performance.now())
  })
  ro.observe(canvas)
  resize()
  draw(performance.now())
  window.addEventListener('pointermove', onMove, { passive: true })

  return {
    setActive(next) {
      if (next === active) return
      active = next
      cancelAnimationFrame(raf)
      if (active && animate) raf = requestAnimationFrame(loop)
    },
    destroy() {
      active = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      // Konteks tidak di-lose: canvas yang sama dipakai ulang saat StrictMode remount
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
    },
  }
}
