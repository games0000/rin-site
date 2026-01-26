"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractiveBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // 鼠标位置
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 平滑的鼠标位置
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 背景图视差 (反向移动，移动幅度小)
  const bgX = useTransform(springX, [0, windowSize.width || 1000], [15, -15]);
  const bgY = useTransform(springY, [0, windowSize.height || 1000], [15, -15]);

  // 光球视差 (移动幅度大)
  const orbX = useTransform(springX, [0, windowSize.width || 1000], [-30, 30]);
  const orbY = useTransform(springY, [0, windowSize.height || 1000], [-30, 30]);

  useEffect(() => {
    // 初始化窗口大小
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // 只有在非触摸设备或者有鼠标的设备上才更新
      if (window.matchMedia("(pointer: fine)").matches) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gray-900">
      {/* 1. 底层背景图 - 带视差 */}
      <motion.div 
        className="absolute inset-[-50px] bg-cover bg-center bg-no-repeat opacity-90 transition-opacity duration-1000"
        style={{
          backgroundImage: "url(/images/image2.jpg)",
          x: bgX,
          y: bgY,
          scale: 1.05, // 稍微放大防止边缘露白
        }}
      />

      {/* 2. 氛围光球 - 已移除 */}


      {/* 3. 噪点纹理层 - 增加胶片质感 */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. 暗角层 - 聚焦中心 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 100%)' 
        }}
      />
    </div>
  );
}
