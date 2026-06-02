import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLock, FaBrain, FaTerminal } from "react-icons/fa";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainProject = {
    title: "Hospital Management System",
    description: "A comprehensive console-based system for managing patient records, doctor details, and appointments with efficient file handling.",
    features: [
      "Patient & Doctor Record Management",
      "Appointment Scheduling System",
      "Persistent Data Storage via File Handling",
      "Interactive Menu-Driven Interface"
    ],
    tech: ["C", "File Handling", "Data Structures"],
    category: "Systems / Data Engineering",
    icon: <FaTerminal className="w-8 h-8 text-primary" />
  };

  const futureProjects = [
    { title: "AI/ML Predictive Model", icon: <FaBrain className="w-8 h-8 text-secondary" />, status: "In Research" },
    { title: "Cyber Security Tool", icon: <FaLock className="w-8 h-8 text-accent" />, status: "Conceptualizing" }
  ];

  return (
    <section id="projects" className="py-24 relative bg-background/50">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Featured Work</span>
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-3xl p-1 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            <div className="bg-card/90 rounded-[22px] p-8 h-full flex flex-col relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                  {mainProject.icon}
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-white/5 border border-white/10 text-muted-foreground">
                  {mainProject.category}
                </span>
              </div>
              
              <h3 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors">
                {mainProject.title}
              </h3>
              
              <p className="text-muted-foreground text-lg mb-8">
                {mainProject.description}
              </p>
              
              <div className="mb-8">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {mainProject.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {mainProject.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-foreground/80">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white font-medium">
                  <FaGithub className="w-5 h-5" />
                  View Source
                </a>
              </div>
            </div>
          </motion.div>

          {/* Coming Soon Teasers */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 glass-card rounded-3xl p-6 relative overflow-hidden opacity-70"
            >
              <div className="absolute inset-0 bg-stripes opacity-10"></div>
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="p-4 bg-secondary/10 rounded-full mb-4 border border-secondary/20">
                  {futureProjects[0].icon}
                </div>
                <h3 className="text-xl font-bold text-foreground/80 mb-2">{futureProjects[0].title}</h3>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground font-mono">
                  {futureProjects[0].status}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-1 glass-card rounded-3xl p-6 relative overflow-hidden opacity-70"
            >
              <div className="absolute inset-0 bg-stripes opacity-10"></div>
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4 border border-accent/20">
                  {futureProjects[1].icon}
                </div>
                <h3 className="text-xl font-bold text-foreground/80 mb-2">{futureProjects[1].title}</h3>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground font-mono">
                  {futureProjects[1].status}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .bg-stripes {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          );
        }
      `}} />
    </section>
  );
}
