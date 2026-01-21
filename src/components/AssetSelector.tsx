import { 
  Type, 
  FileText, 
  Mail, 
  Share2, 
  Quote, 
  MousePointerClick, 
  Search, 
  Target,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

const assetOptions = [
  { id: 'headline', label: 'Headlines', icon: Type, description: 'Attention-grabbing titles' },
  { id: 'landing_page', label: 'Landing Page', icon: FileText, description: 'Full page content' },
  { id: 'email', label: 'Email Marketing', icon: Mail, description: 'PAS/AIDA frameworks' },
  { id: 'social', label: 'Social Media', icon: Share2, description: 'Posts & hashtags' },
  { id: 'slogan', label: 'Slogan/Motto', icon: Quote, description: 'Memorable taglines' },
  { id: 'cta', label: 'CTAs', icon: MousePointerClick, description: 'Action triggers' },
  { id: 'seo', label: 'SEO Keywords', icon: Search, description: 'Meta optimization' },
  { id: 'google_ads', label: 'Google Ads', icon: Target, description: 'Ad copy strategy' },
];

interface AssetSelectorProps {
  selectedAssets: string[];
  onToggle: (assetId: string) => void;
}

const AssetSelector = ({ selectedAssets, onToggle }: AssetSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">Step 2</span>
        <span className="text-sm text-muted-foreground">Select Assets to Generate</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {assetOptions.map((asset) => {
          const isSelected = selectedAssets.includes(asset.id);
          const Icon = asset.icon;
          
          return (
            <button
              key={asset.id}
              onClick={() => onToggle(asset.id)}
              className={cn(
                "relative p-4 rounded-xl border transition-all duration-300 text-left group hover-lift",
                isSelected 
                  ? "border-primary/50 bg-primary/10 glow-primary-subtle" 
                  : "border-border/50 bg-secondary/30 hover:border-border hover:bg-secondary/50"
              )}
            >
              <div className={cn(
                "absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200",
                isSelected ? "bg-primary" : "bg-muted/50"
              )}>
                {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
              
              <Icon className={cn(
                "w-6 h-6 mb-2 transition-colors duration-200",
                isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              
              <div className={cn(
                "font-medium text-sm mb-1 transition-colors duration-200",
                isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {asset.label}
              </div>
              
              <div className="text-xs text-muted-foreground">
                {asset.description}
              </div>
            </button>
          );
        })}
      </div>
      
      {selectedAssets.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selectedAssets.length} asset{selectedAssets.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
};

export default AssetSelector;
