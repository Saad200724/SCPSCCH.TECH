import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-primary/20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <span className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan">
              SCPSC
            </span>
            <span className="font-display text-2xl md:text-3xl font-bold text-secondary text-glow-violet">
              ×
            </span>
            <span className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan">
              CYBERHUB
            </span>
          </div>
          
          <h2 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-primary text-glow-cyan tracking-wider">
            CYBER HUB
          </h2>
          
          <p className="mt-6 text-muted-foreground text-sm">
            © {new Date().getFullYear()} SCPSC Cyber Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
