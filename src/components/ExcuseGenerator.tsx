
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Sparkles, Brain, Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ExcuseGeneratorFormData, Excuse } from "@/types";
import { createExcuse } from "@/utils/excuseUtils";
import ExcuseCard from "./ExcuseCard";

const ExcuseGenerator = () => {
  const [generatedExcuses, setGeneratedExcuses] = useState<Excuse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ExcuseGeneratorFormData>({
    defaultValues: {
      situation: "",
      reason: "",
    },
    mode: "onChange",
  });

  const handleGenerateExcuse = (data: ExcuseGeneratorFormData) => {
    setIsGenerating(true);
    
    // Simulate API call with timeout for better UX
    setTimeout(() => {
      const newExcuse = createExcuse(data.situation, data.reason);
      
      setGeneratedExcuses((prev) => [newExcuse, ...prev]);
      setIsGenerating(false);
      
      toast.success("Your creative excuse is ready!");
    }, 800);
  };

  const handleDeleteExcuse = (id: string) => {
    setGeneratedExcuses((prev) => prev.filter((excuse) => excuse.id !== id));
    toast.info("Excuse removed");
  };

  const handleGenerateRandom = () => {
    const randomSituations = [
      "Meeting", "Deadline", "Dinner", "Zoom call", "Assignment",
      "Family event", "Birthday party", "Workout", "Group project",
      "Paying bills", "Appointment", "Video call", "Interview"
    ];
    
    const randomReasons = [
      "Busy", "Tired", "Not interested", "Double booked", "Need a break",
      "Forgot", "Not prepared", "Last minute", "Overslept", "Too expensive",
      "Bad timing", "Need space", "Wrong priorities", "Need focus time"
    ];
    
    const randomData = {
      situation: randomSituations[Math.floor(Math.random() * randomSituations.length)],
      reason: randomReasons[Math.floor(Math.random() * randomReasons.length)]
    };
    
    reset(randomData);
    handleGenerateExcuse(randomData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit(handleGenerateExcuse)}
        className="glass-panel p-6 mb-8"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="situation">
              What situation do you need an excuse for?
            </Label>
            <div className="input-wrapper">
              <Brain className="icon h-4 w-4" />
              <Input
                id="situation"
                placeholder="Meeting, deadline, dinner plans..."
                {...register("situation", { required: "Please provide a situation" })}
              />
            </div>
            {errors.situation && (
              <p className="text-xs text-destructive mt-1">{errors.situation.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">
              Why do you want to get out of it? (optional)
            </Label>
            <div className="input-wrapper">
              <Brain className="icon h-4 w-4" />
              <Input
                id="reason"
                placeholder="Tired, not interested, double booked..."
                {...register("reason")}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              type="submit" 
              className="flex-1 gap-2"
              disabled={!isValid || isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Excuse
                </>
              )}
            </Button>
            
            <Button 
              type="button"
              variant="secondary"
              className="gap-2"
              onClick={handleGenerateRandom}
              disabled={isGenerating}
            >
              <Send className="h-4 w-4" />
              I'm Feeling Lucky
            </Button>
          </div>
        </div>
      </form>

      {generatedExcuses.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="font-display font-bold text-2xl mb-4">Your Creative Excuses</h2>
          <div className="grid gap-4">
            {generatedExcuses.map((excuse) => (
              <ExcuseCard
                key={excuse.id}
                excuse={excuse}
                onDelete={handleDeleteExcuse}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcuseGenerator;
