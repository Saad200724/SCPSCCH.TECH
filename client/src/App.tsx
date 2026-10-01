import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import QuantumField from "@/components/QuantumField";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Ideas = lazy(() => import("./pages/Ideas"));
const Executive = lazy(() => import("./pages/Executive"));
const Projects = lazy(() => import("./pages/Projects"));
const Join = lazy(() => import("./pages/Join"));
const Admin = lazy(() => import("./pages/Admin"));
const Portfoliathon = lazy(() => import("./pages/Portfoliathon"));
const Verification = lazy(() => import("./pages/Verification"));
const CertificateSearch = lazy(() => import("./pages/CertificateSearch"));
const AIArtRegistration = lazy(() => import("./pages/AIArtRegistration"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
    <span className="font-display text-sm tracking-widest text-primary uppercase animate-pulse">
      Loading Cyber Hub System...
    </span>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <QuantumField />
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/executive" element={<Executive />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/join" element={<Join />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/portfoliathon" element={<Portfoliathon />} />
            <Route path="/ai-art-registration" element={<AIArtRegistration />} />
            <Route path="/verify" element={<CertificateSearch />} />
            <Route path="/verify/:id" element={<Verification />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

