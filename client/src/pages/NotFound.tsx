import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import CyberButton from "@/components/CyberButton";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <SEO 
        title="404 - Neural Route Not Found | SCPSC Cyber Hub"
        description="The requested quantum pathway does not exist in the Cyber Hub mainframe."
      />
      <div className="min-h-screen pt-28 pb-20 flex flex-col justify-between">
        <div className="container mx-auto px-6 max-w-2xl my-auto">
          <GlassCard className="text-center py-16 px-6 border-primary/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
              </div>

              <h1 className="font-display text-6xl md:text-8xl font-bold mb-4">
                <span className="text-primary text-glow-cyan">4</span>
                <span className="text-secondary text-glow-violet">0</span>
                <span className="text-primary text-glow-cyan">4</span>
              </h1>

              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 uppercase tracking-wider">
                Quantum Link Severed
              </h2>

              <p className="text-muted-foreground font-body text-base mb-2 max-w-md mx-auto">
                The requested coordinate <code className="text-primary font-mono text-sm bg-primary/10 px-2 py-0.5 rounded">{location.pathname}</code> does not exist on this server.
              </p>
              <p className="text-muted-foreground/60 font-body text-sm mb-8">
                Verify the transmission address or re-route to the mainframe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/">
                  <CyberButton variant="primary" size="lg">
                    <Home className="w-4 h-4 mr-2" />
                    Mainframe Core
                  </CyberButton>
                </Link>
                <Link to="/events">
                  <CyberButton variant="outline" size="lg">
                    Explore Events
                  </CyberButton>
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;

