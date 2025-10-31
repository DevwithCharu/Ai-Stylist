import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const categories = ["Jeans", "Shirts", "Jackets", "T-Shirts", "Traditional Wear"];

export default function Wardrobe() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Jeans");

  const handleFileUpload = (event, category) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name.replace(/\.[^/.]+$/, ""),
          category,
          imageUrl: e.target?.result,
        };
        setItems((prev) => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });

    toast.success(`Added ${files.length} item(s) to ${category}`);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from wardrobe");
  };

  const filteredItems = items.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">My Wardrobe</h1>
          <p className="text-muted-foreground">
            Upload and organize your clothing items by category
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  {category} ({items.filter((i) => i.category === category).length})
                </h2>
                <label htmlFor={`upload-${category}`}>
                  <Button variant="default" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Items
                  </Button>
                  <input
                    id={`upload-${category}`}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, category)}
                  />
                </label>
              </div>

              {filteredItems.length === 0 ? (
                <Card className="p-12 text-center gradient-card">
                  <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No items yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload your first {category.toLowerCase()} to get started
                  </p>
                  <label htmlFor={`upload-${category}`}>
                    <Button variant="outline" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Now
                    </Button>
                  </label>
                </Card>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden transition-smooth hover:shadow-hover group"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium truncate">{item.name}</h3>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
