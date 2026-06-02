import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

const queryClient = new QueryClient();

function Portfolio() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/" component={Portfolio} />
            <Route component={Portfolio} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
