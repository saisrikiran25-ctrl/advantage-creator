import { Copy, Check, Award } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RankedItem {
  rank: number;
  content: string;
  note?: string;
}

interface RankedResultProps {
  title: string;
  items: RankedItem[];
}

const RankedResult = ({ title, items }: RankedResultProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-primary/50 bg-primary/5";
      case 2:
        return "border-border/50 bg-secondary/30";
      case 3:
        return "border-border/30 bg-secondary/20";
      default:
        return "border-border/30 bg-secondary/20";
    }
  };

  const getRankBadgeStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-primary text-primary-foreground";
      case 2:
        return "bg-muted text-muted-foreground";
      case 3:
        return "bg-muted/50 text-muted-foreground";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Award className="w-5 h-5 text-primary" />
        {title}
      </h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "relative p-4 rounded-xl border transition-all duration-200 hover:border-primary/30",
              getRankStyles(item.rank)
            )}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                getRankBadgeStyles(item.rank)
              )}>
                #{item.rank}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-medium leading-relaxed">
                  {item.content}
                </p>
                {item.note && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    {item.rank === 1 && "🎯 "}{item.note}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => handleCopy(item.content, index)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200 shrink-0",
                  copiedIndex === index 
                    ? "bg-success/20 text-success" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankedResult;
