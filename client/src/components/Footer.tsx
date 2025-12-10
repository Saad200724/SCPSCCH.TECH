import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-primary/20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-3 md:gap-6 mb-6 w-full px-4">
            <img 
              src="/attached_assets/scpsc-logo_1765371182144.png" 
              alt="SCPSC Logo" 
              className="h-16 md:h-20 w-auto object-contain"
            />
            <span className="font-display text-2xl md:text-3xl font-bold text-secondary text-glow-violet flex-shrink-0">
              ×
            </span>
            <img 
              src="/attached_assets/CH-LOGO-FOOTER_1765371169482.png" 
              alt="Cyber Hub Logo" 
              className="h-16 md:h-20 w-auto object-contain"
            />
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
