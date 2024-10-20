"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card2";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button2";
import { CheckSquare } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";

export default function PresentationModeSelector() {
  const [isLivePresentation, setIsLivePresentation] = useState(false);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const router = useRouter();

  const scenarios = [
    "Introduction",
    "Product Demo",
    "Q&A Session",
    "Technical Deep Dive",
    "Customer Testimonial",
    "De-escalation",
    "Closing Remarks",
  ];

  const handleScenarioToggle = (scenario: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(scenario)
        ? prev.filter((s) => s !== scenario)
        : [...prev, scenario]
    );
  };

  const handleSubmit = () => {
    // Ensure live presentation is selected and "Q&A Session" is part of selected scenarios
    if (isLivePresentation && selectedScenarios.includes("Q&A Session")) {
      const query =
        selectedScenarios.length > 0
          ? `?scenarios=${selectedScenarios.join(",")}`
          : "";

      // Navigate to main.tsx with the query
      router.push(`/main${query}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 my-24 bg-background">
        <h2 className="text-3xl font-bold text-center mb-8">
          Presentation Mode Selector
        </h2>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-medium">Live-Presentation</span>
              <Switch
                checked={isLivePresentation}
                onCheckedChange={setIsLivePresentation}
                aria-label="Toggle Live Presentation"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {scenarios.map((scenario) => (
            <div
              key={scenario}
              onClick={() => handleScenarioToggle(scenario)}
              className="cursor-pointer"
            >
              <Card
                className={`h-full transition-all ${
                  selectedScenarios.includes(scenario)
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="text-lg font-medium">{scenario}</span>
                  {selectedScenarios.includes(scenario) && (
                    <CheckSquare className="h-6 w-6" />
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full py-6 text-lg font-semibold"
          disabled={
            !isLivePresentation || !selectedScenarios.includes("Q&A Session")
          }
        >
          Submit
        </Button>
      </div>
    </>
  );
}
