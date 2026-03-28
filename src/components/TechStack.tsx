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
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const ORB_TEXTURES = [
  { label: "React", url: "/images/react2.webp" },
  { label: "Next.js", url: "/images/next2.webp" },
  { label: "Node.js", url: "/images/node2.webp" },
  { label: "Express", url: "/images/express.webp" },
  { label: "MongoDB", url: "/images/mongo.webp" },
  { label: "MySQL", url: "/images/mysql.webp" },
  { label: "TypeScript", url: "/images/typescript.webp" },
  { label: "JavaScript", url: "/images/javascript.webp" },
] as const;

const ORB_SCALE_VARIANTS = [0.7, 1, 0.8, 1, 1] as const;

type TechOrbProps = {
  isActive: boolean;
  material: THREE.MeshPhysicalMaterial;
  position: [number, number, number];
  scale: number;
};

const TechOrb = ({
  isActive,
  material,
  position,
  scale,
}: TechOrbProps) => {
  const api = useRef<RapierRigidBody | null>(null);
  const vec = useRef(new THREE.Vector3());

  useFrame((_state, delta) => {
    if (!isActive || !api.current) {
      return;
    }

    const step = Math.min(0.1, delta);
    const current = api.current.translation();
    const impulse = vec.current
      .set(current.x, current.y, current.z)
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
      angularDamping={0.2}
      colliders={false}
      friction={0.24}
      linearDamping={0.88}
      position={position}
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
        rotation={[0.28, 0.98, 0.92]}
        scale={scale}
      />
    </RigidBody>
  );
};

type PointerProps = {
  isActive: boolean;
};

const Pointer = ({ isActive }: PointerProps) => {
  const ref = useRef<RapierRigidBody | null>(null);
  const vec = useRef(new THREE.Vector3());

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) {
      return;
    }

    const target = vec.current.lerp(
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 1024 : true
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1025px)");
    const updateViewport = (event?: MediaQueryList | MediaQueryListEvent) => {
      setIsDesktop(event ? event.matches : mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !isDesktop) {
      setIsActive(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      {
        threshold: [0, 0.15, 0.35],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [isDesktop]);

  const materials = useMemo(
    () =>
      ORB_TEXTURES.map(({ url }) => {
        const texture = textureLoader.load(url);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;

        return {
          texture,
          material: new THREE.MeshPhysicalMaterial({
            clearcoat: 0.1,
            emissive: "#ffffff",
            emissiveIntensity: 0.24,
            emissiveMap: texture,
            map: texture,
            metalness: 0.5,
            roughness: 1,
          }),
        };
      }),
    []
  );

  useEffect(() => {
    return () => {
      materials.forEach(({ texture, material }) => {
        texture.dispose();
        material.dispose();
      });
    };
  }, [materials]);

  const orbs = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: `${ORB_TEXTURES[index % ORB_TEXTURES.length].label}-${index}`,
        material: materials[index % materials.length].material,
        position: [
          THREE.MathUtils.randFloatSpread(20),
          THREE.MathUtils.randFloatSpread(20) - 25,
          THREE.MathUtils.randFloatSpread(20) - 10,
        ] as [number, number, number],
        scale:
          ORB_SCALE_VARIANTS[
            Math.floor(Math.random() * ORB_SCALE_VARIANTS.length)
          ],
      })),
    [materials]
  );

  if (!isDesktop) {
    return null;
  }

  return (
    <section className="techstack" id="stack" ref={sectionRef}>
      <h2>My Techstack</h2>

      <Canvas
        camera={{ fov: 32.5, far: 100, near: 1, position: [0, 0, 20] }}
        className="tech-canvas"
        frameloop={isActive ? "always" : "demand"}
        gl={{ alpha: true, antialias: false, depth: false, stencil: false }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.45;
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
        <directionalLight intensity={1.9} position={[0, 5, -4]} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {orbs.map((orb) => (
            <TechOrb
              isActive={isActive}
              key={orb.id}
              material={orb.material}
              position={orb.position}
              scale={orb.scale}
            />
          ))}
        </Physics>
        <Environment
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
          files="/models/char_enviorment.hdr"
        />
        {isActive ? (
          <EffectComposer enableNormalPass={false}>
            <N8AO aoRadius={2} color="#0f002c" intensity={1.15} />
          </EffectComposer>
        ) : null}
      </Canvas>
    </section>
  );
};

export default TechStack;
