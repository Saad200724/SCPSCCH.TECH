import { Github, FolderOpen } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import SectionTitle from "@/components/SectionTitle";
import CyberButton from "@/components/CyberButton";
import SEO from "@/components/SEO";

const Projects = () => {
  return (
    <>
      <SEO 
        title="SCPSC Cyber Hub Projects - Open Source Innovations"
        description="Explore open-source projects from SCPSC Cyber Hub. Built with React, Python, TensorFlow. Join our GitHub community."
        keywords="SCPSC projects, open source projects Bangladesh, student coding projects, React projects, Python AI projects, GitHub student community"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="PROJECT VAULT"
            subtitle="Explore our open-source contributions and innovative solutions"
          />

          <div className="max-w-2xl mx-auto mt-16">
            <GlassCard className="text-center py-16">
              <FolderOpen className="w-20 h-20 text-primary mx-auto mb-6 opacity-50" />
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                <span className="text-primary text-glow-cyan">Projects</span> Coming Soon
              </h3>
              <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto text-lg">
                We're working on some exciting projects! Our team is building innovative solutions that will be showcased here soon.
              </p>
              <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
                In the meantime, check out our GitHub organization to see what we're working on.
              </p>
              <a href="https://github.com/SCPSC-Cyber-Hub" target="_blank" rel="noopener noreferrer">
                <CyberButton variant="primary" size="lg">
                  <Github className="w-5 h-5 mr-2" />
                  Visit GitHub
                </CyberButton>
              </a>
            </GlassCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
