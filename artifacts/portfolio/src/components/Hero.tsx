import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import dhruviPhoto from "@assets/DH_PHOTO_1780379527979.jpg";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
    }));

    // Floating geometric particles
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 3 + 1,
      color: ["#8B5CF6", "#06B6D4", "#22D3EE", "#EC4899", "#7C3AED"][Math.floor(Math.random() * 5)],
      opacity: Math.random() * 0.6 + 0.2,
    }));

    // Floating orbs (large glow blobs)
    const orbs = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 120, color: "#8B5CF6", opacity: 0.07, speed: 0.0008 },
      { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 160, color: "#06B6D4", opacity: 0.07, speed: 0.0006 },
      { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 100, color: "#EC4899", opacity: 0.06, speed: 0.001 },
    ];

    let t = 0;

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw orbs
      orbs.forEach((orb) => {
        const ox = orb.x + Math.sin(t * orb.speed * 100) * 60;
        const oy = orb.y + Math.cos(t * orb.speed * 80) * 40;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        grad.addColorStop(0, orb.color + "30");
        grad.addColorStop(1, orb.color + "00");
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Draw stars with twinkle
      stars.forEach((s) => {
        s.twinkle += 0.02;
        const alpha = s.opacity * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
        // Slow drift
        s.y += s.speed * 0.1;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });

      // Shoot some connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles, mouse interaction
      particles.forEach((p) => {
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 120) {
          p.vx += (mdx / md) * 0.03;
          p.vy += (mdy / md) * 0.03;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw rotating wireframe hexagon in the center-right area
      const cx = canvas.width * 0.72;
      const cy = canvas.height * 0.45;
      const hexR = 90;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.3);
      ctx.strokeStyle = "rgba(139,92,246,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = hexR * Math.cos(angle);
        const hy = hexR * Math.sin(angle);
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
      // Inner hexagon
      ctx.rotate(t * 0.15);
      ctx.strokeStyle = "rgba(6,182,212,0.18)";
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = hexR * 0.55 * Math.cos(angle);
        const hy = hexR * 0.55 * Math.sin(angle);
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

const ROLES = [
  "Computer Science Student",
  "AI/ML Enthusiast",
  "Cyber Security Explorer",
  "Problem Solver",
  "Future Innovator",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(role.substring(0, displayedText.length - 1));
        }, 50);
      }
    } else {
      if (displayedText === role) {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(role.substring(0, displayedText.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const name = "Dhruvi Srivastava";

  return (
    <section
      id="hero"
      data-testid="section-hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 2D Canvas animated background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 mt-16">
        <div className="flex-1 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium text-sm backdrop-blur-sm"
          >
            GLA University &bull; B.Tech CSE &bull; CPI 9.15/10
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6">
            <span className="block text-foreground/70 text-2xl md:text-4xl lg:text-5xl mb-2 font-normal">
              Hello, I&apos;m
            </span>
            <div className="relative inline-block">
              <span className="absolute -inset-2 bg-primary/20 blur-2xl rounded-full z-0" />
              <div className="relative z-10 flex flex-wrap justify-center md:justify-start">
                {name.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.045 }}
                    className={char === " " ? "w-4" : "text-gradient"}
                    data-testid={`hero-name-char-${index}`}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>
          </h1>

          <div className="h-10 md:h-12 flex items-center justify-center md:justify-start">
            <p
              className="text-xl md:text-2xl text-muted-foreground font-mono"
              data-testid="text-role-typewriter"
            >
              <span className="text-secondary">&gt;</span> {displayedText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-3 h-6 bg-primary ml-1 align-middle"
              />
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-10"
          >
            <a
              href="#projects"
              data-testid="button-view-projects"
              className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            >
              View Projects
            </a>
            <a
              href="mailto:dhruvisrivastava27@gmail.com"
              data-testid="button-contact"
              className="px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Contact Me
            </a>
            <a
              href="#contact"
              data-testid="button-scroll-contact"
              className="px-8 py-3 rounded-full border border-secondary/30 bg-secondary/10 text-secondary font-medium hover:bg-secondary/20 transition-all hover:scale-105 active:scale-95"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center justify-center md:justify-start gap-6 mt-10"
          >
            <a
              href="https://www.linkedin.com/in/dhruvi-srivastava-5737b8388/"
              target="_blank"
              rel="noreferrer"
              data-testid="link-linkedin"
              className="text-muted-foreground hover:text-secondary hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              data-testid="link-github"
              className="text-muted-foreground hover:text-white hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >
              <FaGithub className="w-7 h-7" />
            </a>
            <a
              href="mailto:dhruvisrivastava27@gmail.com"
              data-testid="link-email"
              className="text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
            >
              <FaEnvelope className="w-7 h-7" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:block relative w-80 h-80 xl:w-96 xl:h-96"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute inset-4 rounded-full border border-secondary/15 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
          <div
            className="absolute inset-6 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5 flex items-center justify-center"
            data-testid="img-hero-photo-container"
          >
            <img
              src={dhruviPhoto}
              alt="Dhruvi Srivastava"
              data-testid="img-hero-photo"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
