// Galaksi spiral monokrom dari partikel, dilihat miring dan berputar pelan.
// Semua partikel di-generate sekali di CPU, rotasi dan proyeksi dihitung di vertex shader.

const VERT = `
attribute vec3 a_pos;   // galaksi: (radius, sudut, tinggi). bintang latar: (x, y, z)
attribute vec4 a_meta;  // ukuran px, kecerahan, jenis, seed
uniform float u_time;
uniform float u_dpr;
uniform float u_focal;
uniform float u_aspect;
uniform float u_dist;
uniform float u_tilt;
uniform float u_roll;
uniform float u_offsetY;
uniform float u_flip;
uniform vec2 u_mouse;
varying float v_bright;
varying float v_kind;
varying float v_warm;

void main() {
  float kind = a_meta.z;
  float seed = a_meta.w;
  vec3 p;
  if (kind > 2.5) {
    // Bintang latar: diam, hanya ikut parallax mouse
    p = a_pos;
    p.xy += u_mouse * 0.04 * p.z;
  } else {
    float r = a_pos.x;
    // Rotasi hampir rigid supaya lengan spiral tidak cepat tergulung
    float th = a_pos.y - u_time * (0.045 + 0.012 / (r + 0.35));
    p = vec3(r * cos(th), a_pos.z, r * sin(th));
    float tilt = u_tilt + u_mouse.y * 0.06;
    float ct = cos(tilt), st = sin(tilt);
    p = vec3(p.x, p.y * ct - p.z * st, p.y * st + p.z * ct);
    float rl = u_roll + u_mouse.x * 0.04;
    float cr = cos(rl), sr = sin(rl);
    p = vec3(p.x * cr - p.y * sr, p.x * sr + p.y * cr, p.z);
    p.z -= u_dist;
  }

  float w = -p.z;
  vec2 clip = vec2(p.x * u_focal / u_aspect, p.y * u_focal + u_offsetY * w);
  if (u_flip > 0.5) clip.y = -clip.y;
  gl_Position = vec4(clip, 0.0, w);

  float persp = kind > 2.5 ? 1.0 : u_dist / w;
  gl_PointSize = max(1.0, a_meta.x * u_dpr * persp);

  float tw = 1.0;
  if (kind > 2.5 || a_meta.y > 0.9) tw = 0.65 + 0.35 * sin(u_time * (0.8 + seed * 2.5) + seed * 60.0);
  v_bright = a_meta.y * tw;
  v_kind = kind;
  v_warm = kind > 0.5 && kind < 1.5 ? 1.0 : 0.0;
}
`

const FRAG = `
precision mediump float;
varying float v_bright;
varying float v_kind;
varying float v_warm;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  if (d > 1.0) discard;
  float a;
  if (v_kind > 1.5 && v_kind < 2.5) {
    a = exp(-d * d * 3.2) * (1.0 - d);            // kabut nebula, lebar dan lembut
  } else {
    a = exp(-d * d * 9.0) + 0.25 * exp(-d * d * 2.0); // bintang: inti tajam + halo tipis
    a *= 1.0 - d * d;
  }
  vec3 cool = vec3(0.90, 0.93, 1.0);
  vec3 warm = vec3(1.0, 0.97, 0.92);
  vec3 col = mix(cool, warm, v_warm) * a * v_bright;
  gl_FragColor = vec4(col, 1.0);
}
`

// Random deterministik supaya bentuk galaksi sama di tiap kunjungan
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Counts = { stars: number; bulge: number; dust: number; field: number }

function buildParticles(c: Counts, maxPoint: number) {
  const rand = mulberry32(20260915)
  const gauss = () => {
    let u = 0
    while (u === 0) u = rand()
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand())
  }
  const total = c.stars + c.bulge + c.dust + c.field
  const pos = new Float32Array(total * 3)
  const meta = new Float32Array(total * 4)
  let i = 0
  const push = (a: number, b: number, z: number, size: number, bright: number, kind: number) => {
    pos.set([a, b, z], i * 3)
    meta.set([Math.min(size, maxPoint), bright, kind, rand()], i * 4)
    i++
  }

  const ARMS = 4
  const PITCH = 3.6 // 1 / tan(sudut pitch); makin besar makin rapat lilitannya
  const armAngle = (r: number, arm: number) => (arm * Math.PI * 2) / ARMS + Math.log(r / 0.06) * (1 / PITCH) * Math.PI

  // Bintang piringan, mengikuti lengan spiral
  for (let n = 0; n < c.stars; n++) {
    const r = Math.min(1.3, 0.05 + -Math.log(1 - rand() * 0.985) * 0.4)
    const major = rand() < 0.7
    const arm = major ? (rand() < 0.5 ? 0 : 2) : rand() < 0.5 ? 1 : 3
    const inArm = rand() < 0.78
    const spread = (major ? 0.16 : 0.26) * (0.55 + r * 0.45)
    const th = inArm ? armAngle(r, arm) + gauss() * spread : rand() * Math.PI * 2
    const y = gauss() * 0.018 * (1.4 - r * 0.6)
    const big = rand() < 0.015
    const size = big ? 2.6 + rand() * 2.2 : 0.9 + rand() * 1.5
    const bright = big ? 0.95 + rand() * 0.4 : (0.22 + Math.pow(rand(), 2.2) * 0.8) * (inArm ? 1 : 0.45) * (r < 0.18 ? 0.45 : 1)
    push(r, th, y, size, bright, 0)
  }

  // Bulge inti, bulat pipih dan hangat
  for (let n = 0; n < c.bulge; n++) {
    const r = Math.abs(gauss()) * 0.09
    const th = rand() * Math.PI * 2
    const y = gauss() * 0.055 * (1 - Math.min(r * 4, 0.8))
    push(r, th, y, 0.9 + rand() * 1.4, 0.05 + rand() * 0.1, 1)
  }

  // Kabut nebula: sprite besar redup di sepanjang lengan + glow inti
  for (let n = 0; n < c.dust; n++) {
    const core = n < c.dust * 0.06
    const r = core ? Math.abs(gauss()) * 0.07 : 0.12 + Math.pow(rand(), 0.8) * 0.95
    const arm = Math.floor(rand() * ARMS)
    const th = core ? rand() * Math.PI * 2 : armAngle(r, arm) + gauss() * 0.12
    const size = core ? 120 + rand() * 90 : 26 + rand() * 60 * (1.2 - r * 0.5)
    const bright = core ? 0.03 + rand() * 0.02 : 0.03 + rand() * 0.045
    push(r, th, gauss() * 0.02, size, bright, 2)
  }

  // Bintang latar statis di belakang galaksi
  for (let n = 0; n < c.field; n++) {
    const z = -(2.5 + rand() * 4)
    const spreadX = -z * 1.4
    const big = rand() < 0.07
    push((rand() * 2 - 1) * spreadX, (rand() * 2 - 1) * spreadX * 0.9, z, big ? 2.6 + rand() * 1.6 : 1 + rand() * 1.2, big ? 1.1 : 0.35 + rand() * 0.55, 3)
  }

  return { pos, meta, total }
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s))
  return s
}

export type GalaxyOptions = { flip?: boolean; animate?: boolean }
export type GalaxyHandle = { setActive: (active: boolean) => void; destroy: () => void }

export function createGalaxy(canvas: HTMLCanvasElement, opts: GalaxyOptions = {}): GalaxyHandle | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false })
  if (!gl) return null

  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const small = window.innerWidth < 768
  const maxPoint = (gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array)[1] / 1.5
  const { pos, meta, total } = buildParticles(
    small ? { stars: 30000, bulge: 5000, dust: 450, field: 1400 } : { stars: 70000, bulge: 11000, dust: 900, field: 3000 },
    maxPoint,
  )

  const bufPos = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, bufPos)
  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW)
  const lPos = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(lPos)
  gl.vertexAttribPointer(lPos, 3, gl.FLOAT, false, 0, 0)

  const bufMeta = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, bufMeta)
  gl.bufferData(gl.ARRAY_BUFFER, meta, gl.STATIC_DRAW)
  const lMeta = gl.getAttribLocation(prog, 'a_meta')
  gl.enableVertexAttribArray(lMeta)
  gl.vertexAttribPointer(lMeta, 4, gl.FLOAT, false, 0, 0)

  const u = (name: string) => gl.getUniformLocation(prog, name)
  const uTime = u('u_time')
  const uMouse = u('u_mouse')
  const uFocal = u('u_focal')
  const uAspect = u('u_aspect')
  const uTilt = u('u_tilt')
  const uOffsetY = u('u_offsetY')
  const uDpr = u('u_dpr')
  const DIST = 2.2
  gl.uniform1f(u('u_dist'), DIST)
  gl.uniform1f(u('u_roll'), -0.16)
  gl.uniform1f(u('u_flip'), opts.flip ? 1 : 0)

  gl.disable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE)
  gl.clearColor(0.039, 0.039, 0.039, 1)

  const animate = opts.animate ?? true
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  let raf = 0
  let active = false
  const start = performance.now()

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    const aspect = w / h
    // Lebar galaksi diatur relatif ke layar: melebar keluar tepi di desktop, lebih besar lagi di HP
    const targetX = aspect < 1 ? 2.1 : 1.6
    gl.uniform1f(uFocal, (targetX * aspect * DIST) / 1.25)
    gl.uniform1f(uAspect, aspect)
    // Sudut dari posisi edge-on: 0 = tampak samping, PI/2 = tampak atas
    gl.uniform1f(uTilt, aspect < 1 ? 0.72 : 0.6)
    gl.uniform1f(uOffsetY, aspect < 1 ? -0.12 : -0.2)
    gl.uniform1f(uDpr, dpr)
  }

  const draw = (now: number) => {
    mouse.x += (mouse.tx - mouse.x) * 0.04
    mouse.y += (mouse.ty - mouse.y) * 0.04
    gl.uniform1f(uTime, animate ? (now - start) / 1000 + 8 : 8)
    gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, total)
  }

  const loop = (now: number) => {
    draw(now)
    if (active && animate) raf = requestAnimationFrame(loop)
  }

  const onMove = (e: PointerEvent) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
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
      gl.deleteBuffer(bufPos)
      gl.deleteBuffer(bufMeta)
    },
  }
}
