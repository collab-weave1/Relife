import React, { useState, useRef, useMemo } from 'react';
import { useSound } from 'react-sounds';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Leaf, RotateCcw } from 'lucide-react';

const Earth = ({ greenLevel }) => {
  const earthRef = useRef();
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
    }
  });

  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const continentColors = [
      '#2F4F2F',  
      '#228B22',  
      '#32CD32',  
      '#00FF32',  
      '#00FF7F'   
    ];
    
    ctx.fillStyle = continentColors[greenLevel];
    
    // Africa and Europe
    ctx.beginPath();
    ctx.ellipse(280, 120, 40, 60, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(350, 80, 50, 40, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // North America
    ctx.beginPath();
    ctx.ellipse(120, 80, 45, 50, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(150, 180, 25, 50, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(400, 180, 30, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Additional landmasses
    const landmasses = [
      [160, 40, 15, 12],   // Greenland
      [50, 120, 8, 6],     // Hawaii
      [420, 90, 12, 8],    // Japan
      [390, 130, 10, 12],  // Philippines
      [480, 200, 8, 15],   // New Zealand
      [380, 150, 15, 8],   // Indonesia
      [80, 50, 18, 12],    // Alaska
      [500, 80, 12, 20],   // Eastern edge
      [12, 100, 12, 25],   // Western edge
    ];
    
    landmasses.forEach(([x, y, w, h]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    if (greenLevel > 0) {
      ctx.fillStyle = continentColors[Math.min(greenLevel, 4)];
      
      const additionalLand = [
        [25, 140, 6, 4],    // Pacific islands
        [450, 140, 5, 3],
        [310, 160, 6, 12],  // Madagascar
        [250, 75, 8, 6],    // British Isles
        [395, 115, 4, 6],   // Taiwan
      ];
      
      additionalLand.forEach(([x, y, w, h]) => {
        ctx.beginPath();
        ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
    
    if (greenLevel > 1) {
      ctx.fillStyle = continentColors[Math.min(greenLevel + 1, 4)];
      
      const forests = [
        [270, 110, 15, 20],
        [130, 90, 20, 15],
        [360, 85, 18, 12],
      ];
      
      forests.forEach(([x, y, w, h]) => {
        ctx.beginPath();
        ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
    
    // Cloud patterns
    if (greenLevel > 2) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      
      const clouds = [
        [200, 60, 60, 15, 0.3],
        [380, 140, 40, 12, -0.2],
        [100, 130, 35, 10, 0.1],
      ];
      
      clouds.forEach(([x, y, w, h, rotation]) => {
        ctx.beginPath();
        ctx.ellipse(x, y, w, h, rotation, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
    
    // Ice caps for highest level
    if (greenLevel > 3) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      
      // Arctic ice cap
      ctx.beginPath();
      ctx.ellipse(256, 20, 80, 15, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Antarctic ice cap
      ctx.beginPath();
      ctx.ellipse(256, 235, 100, 18, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, [greenLevel]);

  return (
    <>
      {/* Earth sphere */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshPhongMaterial map={earthTexture} shininess={30} />
      </mesh>
      
      {/* Atmosphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial
          color={greenLevel > 2 ? 0x87CEEB : 0x696969}
          transparent
          opacity={greenLevel > 1 ? 0.15 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

// Stars component
const Stars = () => {
  const starsRef = useRef();
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0003;
      starsRef.current.rotation.y += 0.0003;
    }
  });

  const starPositions = useMemo(() => {
    const positions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starPositions}
          count={800}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={0xffffff} size={0.03} />
    </points>
  );
};

const EarthScene = ({ greenLevel }) => {
  return (
    <>
      <ambientLight intensity={0.4} color={0x404040} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} color={0xffffff} />
      
      <Earth greenLevel={greenLevel} />
      <Stars />
    </>
  );
};

const InteractiveEarth = ({ 
  size = 400, 
  showControls = true, 
  showProgress = true, 
  showMessage = true,
  className = "",
}) => {
  const [greenLevel, setGreenLevel] = useState(0);

  const earthThriving = useSound('ui/success_bling');
  const earthProgress = useSound('ui/submit');

  const makeEarthGreener = () => {
    if (greenLevel < 4) {
      setGreenLevel(prev => prev + 1);
    }
  };

  const resetEarth = () => {
    setGreenLevel(0);
  };

  const getEarthMessage = () => {
    const messages = [
      "🌍 Earth with Basic Vegetation",
      "🌱 Growing Forests!",
      "🌿 Rich Green Landscapes!",
      "🌳 Lush Planet Ecosystem!",
      "🌺 Thriving Blue-Green World!"
    ];
    return messages[greenLevel];
  };

  const getProgressColor = () => {
    const colors = [
      'from-emerald-600 via-green-600 to-green-500',
      'from-green-500 via-lime-500 to-green-400',
      'from-lime-400 via-green-400 to-emerald-500',
      'from-emerald-500 via-teal-400 to-cyan-500',
      'from-cyan-400 via-blue-400 to-indigo-500'
    ];
    return colors[greenLevel];
  };

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>

      <div className="relative group">
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-xl transition-all duration-1000"
          style={{ width: size + 40, height: size + 40, left: -20, top: -30 }}
        />
        
        <div 
          className="relative rounded-full overflow-hidden shadow-2xl border-4 border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl bg-black"
          style={{ width: size + 60, height: size + 60}}
        >
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
          >
            <EarthScene greenLevel={greenLevel} />
          </Canvas>
        </div>
        
        {showMessage && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-2xl px-6 py-1 border border-white/10 shadow-xl">
            <p className="text-sm font-semibold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
              {getEarthMessage()}
            </p>
          </div>
        )}
      </div>

      {showProgress && (
        <div className="w-full max-w-md space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-400 font-medium flex items-center gap-1 font-bold">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              Basic
            </span>
            <span className="text-yellow-400">
              Level {greenLevel + 1} of 5
            </span>
            <span className="text-blue-400 font-medium flex items-center gap-1 font-bold">
              Thriving
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-slate-800/50 rounded-full h-3 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${getProgressColor()} h-full rounded-full transition-all duration-1000 ease-out shadow-lg relative`}
                style={{ width: `${(greenLevel / 4) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="absolute top-0 w-full flex justify-between h-3">
              {[0, 1, 2, 3, 4].map((level) => (
                <div 
                  key={level}
                  className={`w-0.5 h-full rounded-full transition-all duration-300 ${
                    greenLevel >= level ? 'bg-white/80' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {showControls && (
        <div className="flex gap-2">
          {greenLevel >= 4 ? (
            <button
              onClick={resetEarth}
              className="group relative flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-orange-400/20"
            >
              <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
              <span>Reset Planet</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <button
              onClick={()=>{
                makeEarthGreener();
                greenLevel == 3? earthThriving.play() : earthProgress.play()
              }
              }
              className="group relative flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-green-400/20"
            >
              <Leaf className="w-5 h-5 transition-transform group-hover:rotate-12 duration-300" />
              <span>Click here to Recycle & Grow</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveEarth;