import { Card } from "@/components/ui/card";
import { Sparkles, Target, Cpu, Users } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Intelligence",
    description:
      "Advanced algorithms analyze your wardrobe and preferences to provide personalized recommendations",
  },
  {
    icon: Target,
    title: "Smart Decision Making",
    description:
      "Factor-based recommendations considering weather, occasion, body type, and skin tone",
  },
  {
    icon: Cpu,
    title: "Digital Wardrobe",
    description:
      "Organize and categorize all your clothing items in one convenient digital space",
  },
  {
    icon: Users,
    title: "Personal Style Assistant",
    description:
      "24/7 chatbot support for all your fashion questions and styling needs",
  },
];

const technologies = [
  "React & JavaScript",
  "Tailwind CSS",
  "AI/ML Algorithms",
  "Responsive Design",
  "Interactive UI/UX",
  "Real-time Recommendations",
];

 function About() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">About SmartWardrobe</h1>
          <p className="text-lg text-muted-foreground">
            Revolutionizing personal fashion management with AI
          </p>
        </div>

        {/* Objective */}
        <Card className="p-8 mb-8 gradient-card">
          <h2 className="text-2xl font-semibold mb-4">Our Objective</h2>
          <p className="text-muted-foreground leading-relaxed">
            To develop an interactive platform that digitizes users' wardrobes and intelligently
            recommends outfits based on personal attributes such as skin tone, body type, occasion,
            and weather conditions. Our AI-powered system provides personalized buying suggestions
            to help complete and optimize your wardrobe while offering conversational assistance
            through an intelligent chatbot.
          </p>
        </Card>

        {/* Description */}
        <Card className="p-8 mb-8 gradient-card">
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              SmartWardrobe simulates an AI-based fashion assistant that enables users to upload
              and categorize their clothing items into organized wardrobe sections including jeans,
              shirts, jackets, T-shirts, and traditional wear.
            </p>
            <p>
              Based on your uploaded wardrobe, our system provides intelligent recommendations on
              what to wear depending on factors like weather conditions, occasions, body type, and
              skin color. The platform includes a chatbot interface that assists with general
              fashion decisions such as color matching, styling for events, and choosing
              accessories.
            </p>
            <p>
              Our "What to Buy" module analyzes your wardrobe data, detects missing items, and
              provides direct links to e-commerce platforms like Myntra and Amazon to complete your
              outfits, promoting intelligent fashion management and helping you make smarter
              purchasing decisions.
            </p>
          </div>
        </Card>

        {/* Key Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 transition-smooth hover:shadow-hover">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technologies */}
        <Card className="p-8 mb-8 gradient-card">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </Card>

       
      </div>
    </div>
  );
}

export default About;