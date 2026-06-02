import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, GraduationCap, Trophy } from "lucide-react";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      year: "August 2025 - 2029",
      title: "B.Tech in Computer Science Engineering",
      institution: "GLA University, Greater Noida (Off-Campus Branch)",
      status: "Currently: Second Semester",
      highlight: "CPI: 9.15 / 10 (First Semester)",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-primary border-primary",
      bg: "bg-primary/10",
    },
    {
      year: "2025",
      title: "Foundation in Programming",
      institution: "Self-Paced & University Curriculum",
      status: "Mastering C & Python",
      highlight: "Completed Hospital Management System",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-secondary border-secondary",
      bg: "bg-secondary/10",
    },
    {
      year: "Future",
      title: "AI & Cyber Security Specialization",
      institution: "Continuous Learning",
      status: "Exploring ML Libraries",
      highlight: "Goal: Advanced AI Systems",
      icon: <Trophy className="w-6 h-6" />,
      color: "text-accent border-accent",
      bg: "bg-accent/10",
    }
  ];

  return (
    <section id="education" className="py-24 relative bg-background/50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Academic Journey</span>
          </h2>
          <div className="w-20 h-1 bg-secondary rounded-full mx-auto md:mx-0"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto md:mx-0">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2"></div>

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className={`relative flex items-center justify-between mb-12 last:mb-0 w-full ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              } flex-col md:flex-row`}
            >
              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-5/12"></div>

              {/* Center Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full glass-card border-2 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <div className={`${item.color}`}>{item.icon}</div>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-5/12 pl-20 md:pl-0 pt-2 md:pt-0">
                <div className={`glass-card p-6 rounded-2xl border-l-4 ${item.color} relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300`}>
                  <div className={`absolute top-0 right-0 p-4 opacity-10 ${item.color}`}>
                    {item.icon}
                  </div>
                  
                  <span className="inline-block py-1 px-3 rounded-full bg-white/5 text-xs font-mono text-muted-foreground mb-4">
                    {item.year}
                  </span>
                  
                  <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                  <h4 className="text-sm text-foreground/80 mb-4">{item.institution}</h4>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.status}
                  </p>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg ${item.bg} border border-white/5`}>
                    <span className={`font-bold ${item.color} drop-shadow-md`}>
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
