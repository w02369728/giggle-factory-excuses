
import { useEffect } from "react";
import Header from "@/components/Header";
import ExcuseGenerator from "@/components/ExcuseGenerator";
import BlurImage from "@/components/BlurImage";
import { Sparkles, Check } from "lucide-react";

const Index = () => {
  // Smooth scroll effect on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <section className="container px-4 mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-3 w-3" />
              </span>
              <span className="px-3 text-xs font-medium">Humor meets innovation</span>
            </div>
            
            <h1 className="heading-1 mb-4 max-w-3xl">
              Creative Excuses for Every Situation
            </h1>
            
            <p className="lead-text mb-6">
              Generate clever, original, and surprisingly believable excuses with our 
              advanced excuse laboratory.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mb-8 text-left">
              {[
                "Instant excuse generation",
                "Customized to your situation",
                "Save your favorites",
                "Easy sharing",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <div className="rounded-full p-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl blur-3xl" />
            <div className="relative z-10">
              <ExcuseGenerator />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-panel p-8 flex flex-col items-start">
              <h3 className="heading-3 mb-4">How It Works</h3>
              <p className="text-muted-foreground mb-4">
                Our advanced excuse generator combines various elements to create unique,
                plausible, and humorous excuses for any situation. Simply tell us what
                you're trying to avoid and why!
              </p>
              <div className="mt-auto">
                <BlurImage
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="A MacBook with lines of code"
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="glass-panel p-8 flex flex-col items-start">
              <h3 className="heading-3 mb-4">When to Use</h3>
              <p className="text-muted-foreground mb-6">
                We all need an escape sometimes. Whether it's a meeting you're dreading,
                a social event you'd rather skip, or a deadline that snuck up on you — 
                we've got you covered with the perfect excuse.
              </p>
              <div className="mt-auto">
                <BlurImage
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80"
                  alt="A person looking stressed at a computer"
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-3 w-3" />
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

export default Index;
