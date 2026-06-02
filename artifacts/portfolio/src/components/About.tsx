import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dhruviPhoto from "@assets/DH_PHOTO_1780379527979.jpg";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  const areas = [
    { name: "Python", color: "from-blue-400 to-blue-600" },
    { name: "AI / ML", color: "from-purple-400 to-purple-600" },
    { name: "C Programming", color: "from-gray-400 to-gray-600" },
    { name: "Web Basics", color: "from-orange-400 to-red-500" },
    { name: "Data Analysis", color: "from-green-400 to-emerald-600" },
    { name: "Cyber Security", color: "from-cyan-400 to-blue-500" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">About Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5"
          >
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-2xl overflow-hidden glass-card p-2 transition-transform duration-200 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 z-10 pointer-events-none rounded-xl"></div>
              <img 
                src={dhruviPhoto} 
                alt="Dhruvi Srivastava" 
                className="w-full h-auto aspect-[4/5] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-7 space-y-6"
          >
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              I am a Computer Science undergraduate with strong fundamentals in <span className="text-secondary font-medium">C and Python</span> and a growing focus on <span className="text-primary font-medium">Artificial Intelligence and Machine Learning</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently building skills in data analysis and ML libraries while developing practical problem-solving projects. I am passionate about understanding how complex systems work and applying technology to solve real-world problems. My goal is to become an expert in AI and Cyber Security, pushing the boundaries of what's possible in the digital realm.
            </p>
            
            <div className="pt-8">
              <h3 className="text-xl font-display font-semibold mb-6">Areas of Focus</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {areas.map((area, index) => (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-card p-4 rounded-xl text-center cursor-default relative overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <span className="font-medium text-sm md:text-base relative z-10">{area.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
