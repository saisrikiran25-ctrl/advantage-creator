import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InputMatrix from "@/components/InputMatrix";
import OutputDashboard from "@/components/OutputDashboard";
import { MockResults } from "@/data/mockResults";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [results, setResults] = useState<MockResults | null>(null);

  const handleGenerate = async (data: {
    companyDetails: string;
    productDetails: string;
    selectedAssets: string[];
  }) => {
    setIsGenerating(true);
    setSelectedAssets(data.selectedAssets);
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('generate-marketing', {
        body: {
          companyDetails: data.companyDetails,
          productDetails: data.productDetails,
          selectedAssets: data.selectedAssets,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        toast.error("Failed to generate marketing assets. Please try again.");
        setIsGenerating(false);
        return;
      }

      if (responseData?.error) {
        console.error("API error:", responseData.error);
        toast.error(responseData.error);
        setIsGenerating(false);
        return;
      }

      if (responseData?.results) {
        setResults(responseData.results as MockResults);
        setShowResults(true);
        
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        toast.error("No results returned from AI. Please try again.");
      }
    } catch (err) {
      console.error("Error calling generate-marketing:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <InputMatrix onGenerate={handleGenerate} isGenerating={isGenerating} />
      
      {showResults && results && (
        <div id="results">
          <OutputDashboard 
            selectedAssets={selectedAssets}
            results={results}
          />
        </div>
      )}
      
      {/* Footer */}
      <footer className="border-t border-border/30 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 AdVantage AI. Powered by advanced marketing intelligence.
        </p>
      </footer>
    </div>
  );
};

export default Index;
