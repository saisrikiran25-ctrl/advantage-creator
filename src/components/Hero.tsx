import { ArrowDown, Zap } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 animate-fade-in">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Marketing Engine</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
          Professional Marketing
          <br />
          <span className="text-gradient">Assets in Seconds</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Transform your brand DNA into high-converting headlines, landing pages, 
          emails, and ad campaigns. Powered by 20+ years of marketing expertise.
        </p>
        
        <Button 
          variant="generate" 
          size="xl" 
          onClick={scrollToForm}
          className="animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Start Generating
          <ArrowDown className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
