import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const weatherOptions = ["Sunny", "Cloudy", "Rainy", "Cold", "Hot"];
const occasionOptions = ["Casual", "Formal", "Party", "Work", "Sports", "Traditional"];
const bodyTypeOptions = ["Slim", "Athletic", "Average", "Plus Size"];
const skinToneOptions = ["Fair", "Medium", "Olive", "Dark"];

export default function OutfitRecommendation() {
  const [weather, setWeather] = useState("");
  const [occasion, setOccasion] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const generateRecommendation = () => {
    if (!weather || !occasion || !bodyType || !skinTone) {
      toast.error("Please fill in all preferences");
      return;
    }

    const recommendations = {
      Casual: {
        Sunny: "Light colored jeans with a breathable cotton t-shirt and sneakers",
        Rainy: "Dark jeans with a waterproof jacket and comfortable boots",
        Cold: "Warm jeans with a cozy sweater and a stylish jacket",
        Hot: "Shorts or lightweight pants with a cool t-shirt",
        Cloudy: "Comfortable jeans with a casual shirt and light jacket",
      },
      Formal: {
        Sunny: "Crisp dress shirt with tailored trousers and polished shoes",
        Rainy: "Suit with waterproof coat and formal shoes",
        Cold: "Suit with warm overcoat and formal accessories",
        Hot: "Light-colored formal wear with breathable fabrics",
        Cloudy: "Classic suit with optional blazer",
      },
      Traditional: {
        Sunny: "Light traditional wear suitable for warm weather",
        Rainy: "Traditional outfit with weather-appropriate layering",
        Cold: "Traditional wear with warm shawl or jacket",
        Hot: "Breathable traditional fabrics in light colors",
        Cloudy: "Comfortable traditional attire",
      },
    };

    const occasionRecs = recommendations[occasion] || recommendations.Casual;
    const baseRec = occasionRecs[weather] || "Smart casual outfit";

    const bodyTypeAdvice = {
      Slim: "Fitted styles that add definition",
      Athletic: "Tailored fits that complement your build",
      Average: "Balanced proportions work great for you",
      "Plus Size": "Comfortable fits with strategic layering",
    };

    const skinToneAdvice = {
      Fair: "Pastels and jewel tones complement your skin",
      Medium: "Earth tones and warm colors look great",
      Olive: "Both warm and cool tones work beautifully",
      Dark: "Bold colors and contrasts are stunning",
    };

    const fullRecommendation = `${baseRec}. ${bodyTypeAdvice[bodyType]}. ${skinToneAdvice[skinTone]}.`;

    setRecommendation(fullRecommendation);
    toast.success("Recommendation generated!");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Outfit Recommendations</h1>
          <p className="text-muted-foreground">
            Get personalized outfit suggestions based on your preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Filters */}
          <Card className="p-6 gradient-card h-fit">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Your Preferences
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weather">Weather</Label>
                <Select value={weather} onValueChange={setWeather}>
                  <SelectTrigger id="weather">
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasionOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select value={bodyType} onValueChange={setBodyType}>
                  <SelectTrigger id="bodyType">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skinTone">Skin Tone</Label>
                <Select value={skinTone} onValueChange={setSkinTone}>
                  <SelectTrigger id="skinTone">
                    <SelectValue placeholder="Select skin tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {skinToneOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateRecommendation} className="w-full gradient-hero" size="lg">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Recommendation
              </Button>
            </div>
          </Card>

          {/* Recommendation */}
          <Card className="p-6 gradient-card">
            <h2 className="text-2xl font-semibold mb-6">Your Perfect Outfit</h2>

            {recommendation ? (
              <div className="space-y-6">
                <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
                  <p className="text-lg leading-relaxed">{recommendation}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Style Tips:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Match accessories with your outfit's color palette</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Consider comfort along with style</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Don't forget appropriate footwear</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Select your preferences and click "Generate Recommendation" to see your perfect outfit
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
