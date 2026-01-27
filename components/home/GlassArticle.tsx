"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import FeatherIcon from "./FeatherIcon";
import AnimeSplitText from "../ui/AnimeSplitText";

export default function GlassArticle() {
  const [isOpen, setIsOpen] = useState(false);

  // 监听重置事件（当用户点击导航栏 Home 时触发）
  useEffect(() => {
    const handleReset = () => setIsOpen(false);
    window.addEventListener("reset-home-view", handleReset);
    return () => window.removeEventListener("reset-home-view", handleReset);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto my-20 relative z-10 px-4">
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative overflow-hidden
          bg-white/5 backdrop-blur-md border border-white/10
          rounded-2xl cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
          hover:bg-white/10 hover:border-white/20 shadow-2xl
          ${isOpen ? "p-8 md:p-12" : "p-6 md:p-8"}
        `}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ layout: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
      >
        {/* 装饰光效：顶部流光 */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
        
        {/* 羽毛笔 SVG 动画 */}
        <div className="absolute top-6 right-6 opacity-50 pointer-events-none">
          <FeatherIcon />
        </div>

        <motion.h2 
          layout="position"
          className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide font-serif"
        >
          致访客的一封信
        </motion.h2>

        <motion.div layout className="text-gray-300 leading-relaxed space-y-4 font-light text-justify">
          <p>
            <AnimeSplitText delay={0.2}>
              我还没有想好，再等等吧，抱歉。下面是用来占位的文字，与本站无关。
            </AnimeSplitText>
          </p>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <p>
                    <AnimeSplitText delay={0.1}>我不是在任何事情上都会反复犹豫的人。</AnimeSplitText>
                  </p>
                  <p className="mt-4">
                    <AnimeSplitText delay={0.2}>相反，在真正重要的事情面前，我往往异常冷静。</AnimeSplitText>
                  </p>
             
              <p className="mt-4">
                <AnimeSplitText delay={0.3}>在行动之前，我会先确认一件事值不值得。一旦确认，我就会开始准备。准备的过程对我来说并不痛苦，反而是一种让我安心的状态。我会逐字推敲，反复确认分寸，确认语言是否得体，姿态是否合宜，逻辑是否成立，心意是否清晰而不越界。</AnimeSplitText>
              </p>
               <p className="mt-4">
                <AnimeSplitText delay={0.4}>只要我开始动手，就意味着我已经接受了这件事的重量。</AnimeSplitText>
              </p>
               <p className="mt-4">
                <AnimeSplitText delay={0.5}>写那封信的时候也是这样。</AnimeSplitText>
              </p>
               <p className="mt-4">
                当时的我没有迟疑，也没有负面情绪，更没有“先做着看看”的心态。那不是仓促的决定，而是一个已经被我反复确认过的选择。我清楚自己在做什么，也清楚这封信会被谁读到。
              </p>
               <p className="mt-4">
                正因为如此，那一刻的我反而是平静而笃定的。
              </p>
              <p className="mt-4">
                ……
              </p>
               <p className="mt-4">
                我甚至是开心的。
              </p>
               <p className="mt-4">
                这种开心并不来自情绪的高涨，而是一种被允许靠近、被允许表达的确定感。
                我并不常拥有这样的机会，而正因为机会稀少，我才格外珍惜。那一刻，我是真诚地站在那里，把自己交了出去。
              </p>
               <p className="mt-4">
                ----------------------------------------------------------------------------------
              </p>
               <p className="mt-4">
               真正的问题，从来不是当时。
              </p>
               <p className="mt-4">
                事情完成之后，时间继续向前走，我却被留在了原地。
                我开始回看那封已经交出去的信，用一个已经发生变化的自己，去审视一个已经无法再修改的版本。
              </p>
               <p className="mt-4">
                那种不适感并不是立刻出现的，而是缓慢地、持续地浮现。
              </p>
               <p className="mt-4">
                有些纠结，并不是因为事情没想清楚。
              </p>
               <p className="mt-4">
                而是因为事情已经结束，而我还没有准备好放过那个曾经认真站在那里的人。
              </p>
               <p className="mt-4">
                我不是突然发现它“写得不好”。
              </p>
               <p className="mt-4">
                而是逐渐意识到——那封信已经不再是现在的我能够完全认同的表达。
              </p>
               <p className="mt-4">
                这是一种很微妙、却持续存在的不协调。
                我知道那是我写的，我也承认其中有真实的东西，可它却无法让我安心地代表“我”。
              </p>
               <p className="mt-4">
               并不是否定，也不是厌恶，而是一种无法对齐的感觉：它来自过去，却已经无法被现在的我完整接住。
              </p>
               <p className="mt-4">
                于是，我开始反复问自己：
              </p> <p className="mt-4">
                那是不是我当时能做到的最好？
              </p>
               <p className="mt-4">
                我当时是不是已经尽力？
              </p>
               <p className="mt-4">
                如果现在的我回到当时，还会不会选择同样的表达？
              </p>
               <p className="mt-4">
                这些问题并不会得出结论，却不断消耗我。
              </p>
               <p className="mt-4">
                因为它们真正指向的，并不是“写作水平”，而是一个更难承认的事实——重要的人看到的，是一个已经被定格、却还来不及让我确认的我。
              </p>
               <p className="mt-4">
               我并不害怕不完美。
              </p>
               <p className="mt-4">
                真正让我感到不安的，是不完美以“完成”的形式被交了出去，而我却无法再为它负责。
                完成意味着结束，意味着不可逆，意味着那个版本会永远停在那里，被他人阅读、理解，甚至误读；而我只能在事后不断向前，却无法回到原点。
              </p>
               <p className="mt-4">
                也正因为如此，我开始对“完成”这件事本身产生抵触。
              </p>
               <p className="mt-4">
                完成意味着我必须接受：那已经是当时的极限。
              </p>
               <p className="mt-4">
                这正是我最矛盾的地方。
              </p>
               <p className="mt-4">
                我一方面珍视每一次亲手处理重要事情的机会，渴望表达，也愿意承担；另一方面却又难以接受，事情一旦结束，它就不再属于我。
              </p>
               <p className="mt-4">
                 ----------------------------------------------------------------------------------
              </p>
              <p className="mt-4">
                我不是不信任当时的情感，而是不愿意承认——那已经是当时我所能抵达的边界。
              </p>
              <p className="mt-4">
                我不后悔写那封信。
              </p>
              <p className="mt-4">
               我后悔的是，我在交出去的那一刻，并不知道自己将来会用怎样更严格的目光看待它。
              </p>
              <p className="mt-4">
                后来我慢慢意识到，我真正难以面对的，并不是那封信是否足够好，而是一个无法回避的事实：成长并不会为过去留下缓冲地带。你走过了那条路，就无法再用后来的理解去修补当时的脚印。
              </p>
              <p className="mt-4">
                “这是我的局限和浅薄，但也是我的真诚。”
              </p>
              <p className="mt-4">
                这句话并不是自我否定。
              </p>
              <p className="mt-4">
                它更像是一种迟来的承认：
              </p>
              <p className="mt-4">
                承认人在某些时刻，只能带着尚未完全成熟的理解去完成一件事；
              </p>
              <p className="mt-4">
                承认有些表达，无法等到完全满意才出现；
              </p>
              <p className="mt-4">
                也承认，真诚并不总是以完美的形式呈现。
              </p>
               <p className="mt-4">
                我始终希望自己能够更好。
              </p>
               <p className="mt-4">
                但我也逐渐明白，如果一再要求“更好”必须先于“已经发生”，那么我将永远无法与当下的自己和解。这并不是放弃要求，而是尝试接受：有些重要的事情，并不是在回头审视中被修正的，而是在被认真对待的那一刻，已经完成了它该完成的部分。
              </p>
               <p className="mt-4">
                我之所以反复回头，不是为了推翻那次完成。
              </p>
               <p className="mt-4">
               而是因为我还没有学会，对那个已经认真站在那里、却无法再被修改的自己，说一句——
              </p>
               <p className="mt-4">
                到这里，也成立。
              </p>
              <p className="mt-8 font-serif italic text-right text-white/60">
                —— 荼蘼,     
              </p>
              <p className="mt-8 font-serif italic text-right text-white/60">
                2026 1.27
              </p>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </motion.div>

        {/* 底部渐变遮罩 (仅收起时显示，暗示还有内容) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
        
        {/* 展开/收起 指示器 */}
        <motion.div 
          layout="position"
          className="mt-6 flex justify-center items-center gap-2"
        >
           <motion.div 
             animate={{ rotate: isOpen ? 180 : 0 }}
             className="text-white/40"
           >
             ↓
           </motion.div>
          <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
            {isOpen ? "Fold" : "Unfold"}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

