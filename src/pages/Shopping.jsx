import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ExternalLink, TrendingUp } from "lucide-react";
import ARTryOn from "@/components/ARTryOn";

const mockGaps = [
  {
    id: "1",
    category: "Formal Wear",
    item: "White Dress Shirt",
    reason: "Missing essential for formal occasions",
    priority: "high",
    links: [
      { store: "Amazon", url: "https://amazon.in/formal-shirts" },
      { store: "Myntra", url: "https://myntra.com/formal-shirts" },
    ],
  },
  {
    id: "2",
    category: "Outerwear",
    item: "Lightweight Jacket",
    reason: "Need versatile layering piece for weather changes",
    priority: "medium",
    links: [
      { store: "Amazon", url: "https://amazon.in/jackets" },
      { store: "Myntra", url: "https://myntra.com/jackets" },
    ],
  },
  {
    id: "3",
    category: "Footwear",
    item: "Formal Shoes",
    reason: "Complete your formal wardrobe",
    priority: "high",
    links: [
      { store: "Amazon", url: "https://amazon.in/formal-shoes" },
      { store: "Myntra", url: "https://myntra.com/formal-shoes" },
    ],
  },
  {
    id: "4",
    category: "Casual",
    item: "Denim Jacket",
    reason: "Trendy and versatile casual piece",
    priority: "low",
    links: [
      { store: "Amazon", url: "https://amazon.in/denim-jackets" },
      { store: "Myntra", url: "https://myntra.com/denim-jackets" },
    ],
  },
];

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
};

export default function Shopping() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">What to Buy</h1>
          <p className="text-muted-foreground">
            Smart recommendations to complete your wardrobe
          </p>
        </div>

        {/* Summary Card */}
        <Card className="p-6 mb-8 gradient-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Wardrobe Analysis</h2>
              <p className="text-muted-foreground">
                We've identified {mockGaps.length} items to enhance your style
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-destructive/10 rounded-xl">
              <div className="text-2xl font-bold text-destructive">
                {mockGaps.filter((g) => g.priority === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-xl">
              <div className="text-2xl font-bold text-primary">
                {mockGaps.filter((g) => g.priority === "medium").length}
              </div>
              <div className="text-sm text-muted-foreground">Medium Priority</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-xl">
              <div className="text-2xl font-bold">
                {mockGaps.filter((g) => g.priority === "low").length}
              </div>
              <div className="text-sm text-muted-foreground">Low Priority</div>
            </div>
          </div>
        </Card>

        {/* AR Try-On Section */}
        <div className="mb-8">
          <ARTryOn />
        </div>

        {/* Shopping Recommendations */}
        <div className="space-y-4">
          {mockGaps.map((gap) => (
            <Card key={gap.id} className="p-6 transition-smooth hover:shadow-hover">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{gap.item}</h3>
                    <Badge variant={priorityColors[gap.priority]}>
                      {gap.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Category: <span className="font-medium">{gap.category}</span>
                  </p>
                  <p className="text-muted-foreground">{gap.reason}</p>
                </div>

                <div className="flex flex-col gap-2 md:items-end">
                  <p className="text-sm font-medium mb-1">Shop at:</p>
                  {gap.links.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      asChild
                      className="w-full md:w-auto"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {link.store}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8 p-6 gradient-card">
          <h3 className="text-xl font-semibold mb-4">Shopping Tips</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>
                Focus on high-priority items first to maximize wardrobe functionality
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Look for versatile pieces that work with multiple outfits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Check reviews and ratings before making a purchase</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Consider quality over quantity for long-term value</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
