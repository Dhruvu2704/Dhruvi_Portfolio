import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { category: "Languages", items: ["C", "Python", "HTML", "CSS"], color: "primary" },
  { category: "AI/ML Libraries", items: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], color: "secondary" },
  { category: "Core Interests", items: ["Artificial Intelligence", "Machine Learning", "Cyber Security"], color: "accent" }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return "border-primary/30 text-primary shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-primary hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]";
      case "secondary": return "border-secondary/30 text-secondary shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-secondary hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]";
      case "accent": return "border-accent/30 text-accent shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:border-accent hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]";
      default: return "border-white/10 text-white";
    }
  };

  const getProgressColor = (color: string) => {
    switch (color) {
      case "primary": return "bg-primary";
      case "secondary": return "bg-secondary";
      case "accent": return "bg-accent";
      default: return "bg-white";
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-background z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">
            <span className="text-gradient">Technical Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Building a strong foundation across systems programming, data analysis, and emerging technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + groupIdx * 0.2 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden"
            >
              <h3 className={`text-2xl font-bold mb-8 font-display border-b border-white/10 pb-4 inline-block`}>
                {group.category}
              </h3>
              
              <div className="flex flex-col gap-5">
                {group.items.map((item, i) => (
                  <div key={item} className="group/skill">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground/90">{item}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${80 - (i * 5)}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 + (groupIdx * 0.2) + (i * 0.1), ease: "easeOut" }}
                        className={`h-full rounded-full ${getProgressColor(group.color)}`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating animated skills pills */}
        <div className="mt-20 flex flex-wrap justify-center gap-4">
          {[...skills[0].items, ...skills[1].items].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1 + index * 0.05,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="px-6 py-3 glass-card rounded-full border border-white/10 text-sm font-medium hover:border-primary/50 transition-colors cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
