import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  CylinderCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

const SphereGeo = ({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) => {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) {
      return;
    }

    const step = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * step * scale,
          -150 * step * scale,
          -50 * step * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      angularDamping={0.15}
      colliders={false}
      friction={0.2}
      linearDamping={0.75}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        args={[0.15 * scale, 0.275 * scale]}
        position={[0, 0, 1.2 * scale]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        geometry={sphereGeometry}
        material={material}
        receiveShadow
        rotation={[0.3, 1, 1]}
        scale={scale}
      />
    </RigidBody>
  );
};

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

const Pointer = ({ vec = new THREE.Vector3(), isActive }: PointerProps) => {
  const ref = useRef<RapierRigidBody | null>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) {
      return;
    }

    const target = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );

    ref.current.setNextKinematicTranslation(target);
  });

  return (
    <RigidBody
      colliders={false}
      position={[100, 100, 100]}
      ref={ref}
      type="kinematicPosition"
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
};

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 1024 : true
  );

  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    const handleScroll = () => {
      const stack = document.getElementById("stack");

      if (!stack) {
        return;
      }

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const triggerPoint = stack.offsetTop - window.innerHeight;
      setIsActive(scrollY > triggerPoint);
    };

    updateViewport();
    handleScroll();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(
    () =>
      textures.map(
        (texture) =>
          new THREE.MeshPhysicalMaterial({
            clearcoat: 0.1,
            emissive: "#ffffff",
            emissiveIntensity: 0.3,
            emissiveMap: texture,
            map: texture,
            metalness: 0.5,
            roughness: 1,
          })
      ),
    []
  );

  if (!isDesktop) {
    return null;
  }

  return (
    <section className="techstack" id="stack">
      <h2>My Techstack</h2>

      <Canvas
        camera={{ fov: 32.5, far: 100, near: 1, position: [0, 0, 20] }}
        className="tech-canvas"
        gl={{ alpha: true, antialias: false, depth: false, stencil: false }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.5;
        }}
        shadows
      >
        <ambientLight intensity={1} />
        <spotLight
          angle={0.2}
          castShadow
          color="white"
          penumbra={1}
          position={[20, 20, 25]}
          shadow-mapSize={[512, 512]}
        />
        <directionalLight intensity={2} position={[0, 5, -4]} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, index) => (
            <SphereGeo
              isActive={isActive}
              key={index}
              material={materials[Math.floor(Math.random() * materials.length)]}
              {...props}
            />
          ))}
        </Physics>
        <Environment
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
          files="/models/char_enviorment.hdr"
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO aoRadius={2} color="#0f002c" intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </section>
  );
};

export default TechStack;
