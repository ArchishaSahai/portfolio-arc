"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial, Text } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const FONT = "/fonts/cormorant-italic.ttf";
const LILAC = "#b9a6ff";
const EMBER = "#f2b36d";
const INK = "#eee7f6";

// One ring of letters revolving around the core. Each glyph is placed on the
// circle and turned to face outward, so the ring reads like a real band of type.
// Rough advance widths for the italic serif, as a fraction of font size.
function advance(ch: string) {
  if (ch === " ") return 0.26;
  if ("iljtfr/,.·'".includes(ch)) return 0.3;
  if ("mw".includes(ch)) return 0.72;
  return 0.46;
}

function TextRing({
  text,
  size,
  color,
  speed,
  tilt,
  opacity = 1,
}: {
  text: string;
  size: number;
  color: string;
  speed: number;
  tilt: [number, number, number];
  opacity?: number;
}) {
  const spin = useRef<THREE.Group>(null);
  // The radius follows from the text length, so letters sit evenly around the full circle.
  const { glyphs, radius } = useMemo(() => {
    const chars = Array.from(text);
    const widths = chars.map((c) => advance(c) * size);
    const total = widths.reduce((a, b) => a + b, 0);
    let run = 0;
    const glyphs = chars.map((ch, i) => {
      const angle = ((run + widths[i] / 2) / total) * Math.PI * 2;
      run += widths[i];
      return { ch, angle };
    });
    return { glyphs, radius: total / (Math.PI * 2) };
  }, [text, size]);

  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={spin}>
        {glyphs.map(({ ch, angle: a }, i) => {
          if (ch === " ") return null;
          return (
            <Text
              key={i}
              font={FONT}
              fontSize={size}
              color={color}
              fillOpacity={opacity}
              anchorX="center"
              anchorY="middle"
              position={[Math.sin(a) * radius, 0, Math.cos(a) * radius]}
              rotation={[0, a, 0]}
              material-side={THREE.DoubleSide}
              material-toneMapped={false}
            >
              {ch}
            </Text>
          );
        })}
      </group>
    </group>
  );
}

// Small glowing bodies travelling on tilted orbits.
function Moon({ radius, speed, tilt, size, color, phase }: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  size: number;
  color: string;
  phase: number;
}) {
  const body = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    body.current?.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });
  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.0035, 8, 160]} />
        <meshBasicMaterial color={INK} transparent opacity={0.14} toneMapped={false} />
      </mesh>
      <mesh ref={body}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Dust({ count = 700 }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(ph) * Math.cos(th);
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      p[i * 3 + 2] = r * Math.cos(ph);
    }
    return p;
  }, [count]);
  useFrame((_, dt) => {
    if (points.current) points.current.rotation.y -= dt * 0.012;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color={INK} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Orrery({ still }: { still: boolean }) {
  const root = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  // Desktop: sit to the right of the name. Narrow screens: centre, behind the name.
  const wide = viewport.width > 7;
  const x = wide ? viewport.width * 0.2 : 0;
  const scale = wide ? 1 : Math.min(1, viewport.width / 6.2);

  useFrame((state, dt) => {
    const g = root.current;
    if (!g) return;
    // Entrance: grow from nothing over the first ~1.6s.
    const k = still ? 1 : Math.min(1, state.clock.elapsedTime / 1.6);
    const ease = 1 - Math.pow(1 - k, 3);
    g.scale.setScalar(scale * (0.55 + 0.45 * ease));
    // Gentle tilt toward the pointer.
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.25, 3, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.35, 3, dt);
  });

  return (
    <group ref={root} position={[x, wide ? 0 : 0.35, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.85, 24]} />
        <MeshDistortMaterial
          color={LILAC}
          distort={0.32}
          speed={1.4}
          roughness={0.08}
          metalness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>

      <TextRing
        text={"writer / builder / designer / storyteller / ".repeat(2)}
        size={0.3}
        color={INK}
        speed={0.32}
        tilt={[0.32, 0, -0.18]}
      />
      <TextRing
        text={"if sanity is the first thing to go, then genius must be forged in madness · ".repeat(3)}
        size={0.15}
        color={EMBER}
        speed={-0.16}
        tilt={[-0.5, 0, 0.28]}
        opacity={0.85}
      />

      <Moon radius={2.9} speed={0.35} tilt={[1.1, 0.2, 0.3]} size={0.06} color={EMBER} phase={0} />
      <Moon radius={1.35} speed={-0.6} tilt={[-0.9, 0, -0.6]} size={0.045} color={INK} phase={2} />
      <Moon radius={3.4} speed={0.2} tilt={[0.2, 0, 1.2]} size={0.035} color={LILAC} phase={4} />
    </group>
  );
}

export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    // Stop rendering once the hero is scrolled away.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (host.current) io.observe(host.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={host} className="hero-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        frameloop={still || !visible ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#fff4e6" />
        <pointLight position={[-4, -2, 2]} intensity={18} color={EMBER} />
        <Environment resolution={256}>
          <Lightformer form="ring" intensity={3} color={EMBER} position={[-3, 2, 4]} scale={3} />
          <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[4, 3, 3]} scale={[4, 2, 1]} />
          <Lightformer form="rect" intensity={2} color={LILAC} position={[0, -4, -2]} scale={[8, 2, 1]} />
          <Lightformer form="circle" intensity={1.5} color="#7cc6ff" position={[3, -1, -4]} scale={2} />
        </Environment>
        <Orrery still={still} />
        <Dust />
      </Canvas>
    </div>
  );
}
