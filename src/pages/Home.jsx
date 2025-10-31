import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shirt, Sparkles, MessageCircle, ShoppingBag, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-wardrobe.jpg";

const features = [
  {
    icon: Shirt,
    title: "Digital Wardrobe",
    description: "Upload and organize your clothing items into smart categories",
    link: "/wardrobe",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get AI-powered outfit suggestions based on weather, occasion, and style",
    link: "/recommendations",
    gradient: "from-accent/20 to-success/20",
  },
  {
    icon: MessageCircle,
    title: "Style Assistant",
    description: "Chat with our AI to get personalized fashion advice anytime",
    link: "/chatbot",
    gradient: "from-success/20 to-primary/20",
  },
  {
    icon: ShoppingBag,
    title: "Shopping Insights",
    description: "Discover wardrobe gaps and get smart buying recommendations",
    link: "/shopping",
    gradient: "from-primary/20 to-accent/20",
  },
];

const stats = [
  { icon: Shirt, value: "1000+", label: "Items Managed" },
  { icon: TrendingUp, value: "95%", label: "Satisfaction Rate" },
  { icon: Users, value: "5000+", label: "Happy Users" },
];

 function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Personal
                <span className="text-primary block">AI Style Assistant</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Digitize your wardrobe, get intelligent outfit recommendations, and never wonder
                what to wear again.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/wardrobe">
                  <Button size="lg" className="gradient-hero">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="Smart Wardrobe"
                className="relative rounded-3xl shadow-hover w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need for Smart Fashion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform helps you make better fashion decisions every day
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="p-8 h-full transition-smooth hover:shadow-hover hover:scale-[1.02] cursor-pointer gradient-card border-border/50">
                    <div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4`}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start organizing your closet and get personalized style recommendations today
          </p>
          <Link to="/wardrobe">
            <Button size="lg" className="gradient-hero">
              Start Building Your Wardrobe
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;