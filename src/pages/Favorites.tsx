
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ExcuseCard from "@/components/ExcuseCard";
import { Excuse } from "@/types";
import { getFavorites, removeFavorite } from "@/utils/excuseUtils";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Excuse[]>([]);

  // Load favorites on component mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleDeleteFavorite = (id: string) => {
    removeFavorite(id);
    setFavorites(getFavorites());
    toast.info("Excuse removed from favorites");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <section className="container px-4 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Heart className="h-3 w-3" />
              </span>
              <span className="px-3 text-xs font-medium">Your collection</span>
            </div>
            
            <h1 className="heading-2 mb-4">Favorite Excuses</h1>
            
            <p className="text-muted-foreground max-w-lg">
              Your saved collection of brilliant excuses, ready whenever you need them.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {favorites.length > 0 ? (
              <div className="grid gap-4 animate-fade-in">
                {favorites.map((excuse) => (
                  <ExcuseCard
                    key={excuse.id}
                    excuse={excuse}
                    onDelete={handleDeleteFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-panel p-12 text-center animate-fade-in">
                <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="heading-4 mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-6">
                  When you find an excuse you love, save it to your favorites for quick access.
                </p>
                <Button asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Generate Some Excuses
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Heart className="h-3 w-3" />
              </span>
              <span className="font-display font-bold">ExcuseLab</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ExcuseLab. All rights reserved. For entertainment purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Favorites;
