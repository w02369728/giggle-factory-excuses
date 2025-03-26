
import { useState } from "react";
import { Excuse } from "@/types";
import { cn } from "@/lib/utils";
import { Heart, Share2, Trash2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { saveFavorite, removeFavorite, isFavorite } from "@/utils/excuseUtils";

interface ExcuseCardProps {
  excuse: Excuse;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  className?: string;
}

const ExcuseCard = ({ excuse, onDelete, showActions = true, className }: ExcuseCardProps) => {
  const [isFavorited, setIsFavorited] = useState(isFavorite(excuse.id));
  const [isCopied, setIsCopied] = useState(false);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavorite(excuse.id);
      setIsFavorited(false);
      toast.info("Excuse removed from favorites");
    } else {
      saveFavorite(excuse);
      setIsFavorited(true);
      toast.success("Excuse saved to favorites");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out my excuse",
          text: excuse.excuse,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(excuse.excuse);
    setIsCopied(true);
    toast.success("Excuse copied to clipboard!");
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div
      className={cn(
        "glass-panel p-6 transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="mb-2">
        <div className="flex gap-2 mb-3">
          <span className="chip bg-primary/10 text-primary">{excuse.situation}</span>
          {excuse.reason && (
            <span className="chip bg-secondary text-secondary-foreground">{excuse.reason}</span>
          )}
        </div>
        <p className="text-xl font-medium text-balance mb-4">{excuse.excuse}</p>
        <p className="text-xs text-muted-foreground">
          Created {excuse.createdAt.toLocaleDateString()}
        </p>
      </div>

      {showActions && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteToggle}
              className={cn(
                "p-2 rounded-full transition-colors",
                isFavorited
                  ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Share excuse"
            >
              <Share2 className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleCopy}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Copy to clipboard"
            >
              {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          {onDelete && (
            <button
              onClick={() => onDelete(excuse.id)}
              className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              aria-label="Delete excuse"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExcuseCard;
