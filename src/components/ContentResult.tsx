import { Copy, Check, FileText } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContentResultProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

const ContentResult = ({ title, content, icon }: ContentResultProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic markdown-like rendering
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-foreground mt-8 mb-4">
            {line.replace('## ', '')}
          </h3>
        );
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-2">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
            )}
          </p>
        );
      }
      
      // List items
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={index} className="text-muted-foreground ml-4 mb-1">
            {line.replace(/^[-•] /, '')}
          </li>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {icon || <FileText className="w-5 h-5 text-primary" />}
          {title}
        </h3>
        
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200",
            copied 
              ? "bg-success/20 text-success" 
              : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy All
            </>
          )}
        </button>
      </div>
      
      <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
        <div className="prose prose-invert max-w-none">
          {renderContent(content)}
        </div>
      </div>
    </div>
  );
};

export default ContentResult;
