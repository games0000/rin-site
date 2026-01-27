"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface AnimeSplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function AnimeSplitText({ children, className = "", delay = 0 }: AnimeSplitTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // 清空当前内容
    textRef.current.innerHTML = "";
    
    // 按字符拆分 (模拟 chars: true)
    // 这里我们先按单词拆，再按字符拆，以保持单词的完整性（不打断单词换行）
    // 但对于中文，直接按字符拆即可。为了兼容中英文，我们简单地逐字拆解。
    const chars = children.split("");
    
    chars.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.opacity = "0"; 
      
      // 处理空格：空格如果不处理，会导致连续的 inline-block 字符挤在一起，或者空格不可见
      if (char === " ") {
        span.style.width = "0.3em"; // 给空格一个固定宽度
      }
      
      span.className = "char-element";
      
      // 这里的 wrap: 'clip' 模拟效果通常需要父容器 overflow hidden，
      // 但在我们的流式文本中，通常不需要裁剪，而是直接做 translateY 动画
      textRef.current?.appendChild(span);
    });

    // 执行 chars 动画 (参考您提供的 chars code example)
    const animation = animate(textRef.current.querySelectorAll(".char-element"), {
      y: [
        { from: '100%', to: '0%' }, // 从下方滑入
      ],
      opacity: [0, 1], // 同时渐显
      duration: 750,
      ease: 'out(3)', // 使用 easeOut(3)
      delay: stagger(100, { start: delay * 1000 }), // 字符间距 100ms
    });

    return () => {
       // animation.pause(); 
    };
  }, [children, delay]);

  return (
    <span ref={textRef} className={`inline-block ${className}`} />
  );
}
