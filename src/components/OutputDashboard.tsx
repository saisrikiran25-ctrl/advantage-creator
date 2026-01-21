import { useState } from "react";
import { 
  Type, 
  FileText, 
  Mail, 
  Share2, 
  Quote, 
  MousePointerClick, 
  Search, 
  Target,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import RankedResult from "./RankedResult";
import ContentResult from "./ContentResult";
import { MockResults } from "@/data/mockResults";

const assetConfig: Record<string, { label: string; icon: React.ElementType; type: 'ranked' | 'content' }> = {
  headline: { label: 'Headlines', icon: Type, type: 'ranked' },
  landing_page: { label: 'Landing Page', icon: FileText, type: 'content' },
  email: { label: 'Email Marketing', icon: Mail, type: 'content' },
  social: { label: 'Social Media', icon: Share2, type: 'content' },
  slogan: { label: 'Slogan/Motto', icon: Quote, type: 'ranked' },
  cta: { label: 'CTAs', icon: MousePointerClick, type: 'ranked' },
  seo: { label: 'SEO Keywords', icon: Search, type: 'content' },
  google_ads: { label: 'Google Ads', icon: Target, type: 'content' },
};

interface OutputDashboardProps {
  selectedAssets: string[];
  results: MockResults;
}

const OutputDashboard = ({ selectedAssets, results }: OutputDashboardProps) => {
  const [activeTab, setActiveTab] = useState(selectedAssets[0]);

  const renderResult = (assetId: string) => {
    const config = assetConfig[assetId];
    if (!config) return null;

    const Icon = config.icon;

    if (config.type === 'ranked') {
      const data = results[assetId as keyof MockResults];
      if ('items' in data) {
        return (
          <RankedResult 
            title={`Top 3 ${config.label}`}
            items={data.items}
          />
        );
      }
    } else {
      const data = results[assetId as keyof MockResults];
      if ('content' in data) {
        return (
          <ContentResult 
            title={config.label}
            content={data.content}
            icon={<Icon className="w-5 h-5 text-primary" />}
          />
        );
      }
    }

    return null;
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Your Marketing Strategy
          </h2>
          <p className="text-muted-foreground">
            Professional assets crafted for your brand
          </p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden animate-scale-in">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="md:w-64 border-b md:border-b-0 md:border-r border-border/50 p-4">
              <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
                {selectedAssets.map((assetId) => {
                  const config = assetConfig[assetId];
                  if (!config) return null;
                  
                  const Icon = config.icon;
                  const isActive = activeTab === assetId;
                  
                  return (
                    <button
                      key={assetId}
                      onClick={() => setActiveTab(assetId)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 whitespace-nowrap",
                        isActive 
                          ? "bg-primary/10 text-primary border border-primary/30" 
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="font-medium text-sm">{config.label}</span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 ml-auto hidden md:block" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8">
              {renderResult(activeTab)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutputDashboard;
