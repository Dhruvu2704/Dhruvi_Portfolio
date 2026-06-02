import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Calendar, MapPin } from "lucide-react";

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Certifications & Activities</span>
          </h2>
          <div className="w-20 h-1 bg-secondary rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden group border-primary/20 hover:border-primary/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors"></div>
            
            <div className="flex items-start gap-6 relative z-10">
              <div className="p-4 bg-primary/20 rounded-xl text-primary">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-mono text-primary mb-2">CERTIFICATION</div>
                <h3 className="text-2xl font-bold text-white mb-2">Generative AI</h3>
                <p className="text-muted-foreground mb-4">
                  National Association of State Boards of Accountancy (NASBA)
                </p>
                <div className="inline-flex items-center text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Verified Credential
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden group border-secondary/20 hover:border-secondary/50 transition-colors"
          >
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-secondary/20 transition-colors"></div>
            
            <div className="flex items-start gap-6 relative z-10">
              <div className="p-4 bg-secondary/20 rounded-xl text-secondary">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-mono text-secondary mb-2">INDUSTRY EVENT</div>
                <h3 className="text-2xl font-bold text-white mb-2">AI & Industry Summit</h3>
                <p className="text-muted-foreground mb-4">
                  Exploring emerging technologies and industry trends with leading experts.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    Bharat Mandapam
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
