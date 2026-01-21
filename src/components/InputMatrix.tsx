import { useState } from "react";
import { Building2, Package, Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import AssetSelector from "./AssetSelector";

interface InputMatrixProps {
  onGenerate: (data: {
    companyDetails: string;
    productDetails: string;
    selectedAssets: string[];
  }) => void;
  isGenerating: boolean;
}

const loadingMessages = [
  "Analyzing Brand DNA...",
  "Mapping Target Audience...",
  "Crafting Copy...",
  "Optimizing for Conversion...",
  "Finalizing Strategy..."
];

const InputMatrix = ({ onGenerate, isGenerating }: InputMatrixProps) => {
  const [companyDetails, setCompanyDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const handleToggleAsset = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleGenerate = () => {
    onGenerate({ companyDetails, productDetails, selectedAssets });
    
    // Cycle through loading messages
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setLoadingMessageIndex(index);
    }, 2000);
    
    // Clear interval after generation completes (handled by parent)
    setTimeout(() => clearInterval(interval), 10000);
  };

  const isValid = companyDetails.trim() && productDetails.trim() && selectedAssets.length > 0;

  return (
    <section id="input-form" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card rounded-2xl p-8 md:p-10 space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Build Your Marketing Stack
            </h2>
            <p className="text-muted-foreground">
              Provide your brand context and select the assets you need
            </p>
          </div>

          {/* Step 1: Context Inputs */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Step 1</span>
              <span className="text-sm text-muted-foreground">Define Your Brand</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Building2 className="w-4 h-4 text-primary" />
                  Company Details
                </label>
                <Textarea
                  placeholder="Describe your company's mission, values, and brand voice. What makes you unique? Who is your target audience?"
                  value={companyDetails}
                  onChange={(e) => setCompanyDetails(e.target.value)}
                  className="min-h-[160px] bg-secondary/50 border-border/50 focus:border-primary/50 input-glow resize-none"
                />
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Package className="w-4 h-4 text-primary" />
                  Product Details
                </label>
                <Textarea
                  placeholder="Describe your product or service. What are the key features, benefits, and price point? What problem does it solve?"
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  className="min-h-[160px] bg-secondary/50 border-border/50 focus:border-primary/50 input-glow resize-none"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Step 2: Asset Selection */}
          <AssetSelector 
            selectedAssets={selectedAssets}
            onToggle={handleToggleAsset}
          />

          {/* Generate Button */}
          <div className="pt-4">
            <Button
              variant="generate"
              size="xl"
              onClick={handleGenerate}
              disabled={!isValid || isGenerating}
              className="w-full md:w-auto md:min-w-[280px] mx-auto block"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {loadingMessages[loadingMessageIndex]}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Strategy
                </span>
              )}
            </Button>
            
            {!isValid && !isGenerating && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Fill in both text areas and select at least one asset to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputMatrix;
