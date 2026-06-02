import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted", formData);
    setFormData({ name: "", email: "", message: "" });
    alert("Message sent successfully!");
  };

  return (
    <section id="contact" className="py-24 relative bg-background/80 border-t border-white/5">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Let's Build Something <br/>
              <span className="text-gradient">Extraordinary</span> <br/>
              Together.
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-md">
              Whether it's AI, Cyber Security, or software development, I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:dhruvisrivastava27@gmail.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FaEnvelope className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-mono mb-1">EMAIL</div>
                  <div className="text-xl font-medium text-white group-hover:text-primary transition-colors">dhruvisrivastava27@gmail.com</div>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/dhruvi-srivastava-5737b8388/" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <FaLinkedin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-mono mb-1">LINKEDIN</div>
                  <div className="text-xl font-medium text-white group-hover:text-secondary transition-colors">Dhruvi Srivastava</div>
                </div>
              </a>
              
              <div className="flex items-center gap-6 group cursor-default">
                <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-accent">
                  <FaMapMarkerAlt className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-mono mb-1">LOCATION</div>
                  <div className="text-xl font-medium text-white">Knowledge Park III, Greater Noida</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            
            <h3 className="text-2xl font-bold mb-8 relative z-10">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="relative">
                <label className="text-xs font-mono text-muted-foreground mb-2 block uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-black/20 border-b-2 px-4 py-3 text-white outline-none transition-all ${focusedField === 'name' ? 'border-primary bg-black/40' : 'border-white/10'}`}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="relative">
                <label className="text-xs font-mono text-muted-foreground mb-2 block uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-black/20 border-b-2 px-4 py-3 text-white outline-none transition-all ${focusedField === 'email' ? 'border-secondary bg-black/40' : 'border-white/10'}`}
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="relative">
                <label className="text-xs font-mono text-muted-foreground mb-2 block uppercase tracking-wider">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-black/20 border-b-2 px-4 py-3 text-white outline-none transition-all resize-none ${focusedField === 'message' ? 'border-accent bg-black/40' : 'border-white/10'}`}
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-300 group"
              >
                Send Message
                <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      <footer className="mt-32 border-t border-white/5 pt-8 pb-12 text-center relative z-10">
        <div className="container mx-auto px-6">
          <div className="font-display text-2xl font-bold tracking-tighter mb-4">
            <span className="text-white">DS</span>
            <span className="text-primary">.</span>
          </div>
          <p className="text-muted-foreground mb-2">Computer Science Student | AI/ML Enthusiast</p>
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Dhruvi Srivastava. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
