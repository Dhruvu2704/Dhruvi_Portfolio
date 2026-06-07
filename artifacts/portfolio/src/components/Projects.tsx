import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLock, FaBrain, FaTerminal, FaCode } from "react-icons/fa";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainProjects = [
    {
      title: "REEL AI Movie Recommendation",
      description: "AI-powered movie recommendation system that uses NLP, CountVectorizer, and Cosine Similarity to suggest similar movies based on content.",
      features: [
        "NLP-based Content Recommendations",
        "TMDB API Integration for Metadata",
        "Cosine Similarity Matching"
      ],
      tech: ["FastAPI", "Scikit-learn", "Pandas", "JavaScript"],
      category: "Machine Learning",
      link: "https://github.com/Dhruvu2704/REEL_ML_Model",
      icon: <FaBrain className="w-8 h-8 text-primary" />
    },
    {
      title: "Hospital Management System",
      description: "A comprehensive console-based system for managing patient records, doctor details, and appointments with efficient file handling.",
      features: [
        "Patient & Doctor Record Management",
        "Appointment Scheduling System",
        "Persistent Data Storage via File Handling",
        "Interactive Menu-Driven Interface"
      ],
      tech: ["C", "File Handling", "Data Structures"],
      category: "Systems Engineering",
      link: "https://github.com/Dhruvu2704",
      icon: <FaTerminal className="w-8 h-8 text-primary" />
    }
  ];

  const futureProjects = [
    { title: "Cyber Security Tool", icon: <FaLock className="w-8 h-8 text-secondary" />, status: "Conceptualizing" },
    { title: "Smart API Wrapper", icon: <FaCode className="w-8 h-8 text-accent" />, status: "In Research" }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {mainProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              className="glass-card rounded-3xl p-1 group relative overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="bg-card/90 rounded-[22px] p-8 flex-1 flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                    {project.icon}
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-white/5 border border-white/10 text-muted-foreground">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-8 flex-1">
                  {project.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-muted-foreground text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 mt-1.5 shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-foreground/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white font-medium text-sm">
                    <FaGithub className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {futureProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden opacity-70"
            >
              <div className="absolute inset-0 bg-stripes opacity-10"></div>
              <div className="flex items-center justify-center gap-6">
                <div className="p-4 bg-secondary/10 rounded-full border border-secondary/20">
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground/80 mb-1">{project.title}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground font-mono">
                    {project.status}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
