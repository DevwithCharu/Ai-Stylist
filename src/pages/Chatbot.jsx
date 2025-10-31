import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle } from "lucide-react";

// Removed TypeScript `interface` and `Record<>`
const predefinedResponses = {
  "color matching":
    "For color matching, complementary colors work great! Try pairing blues with oranges, or reds with greens. Neutrals like black, white, and beige go with almost everything.",
  "formal event":
    "For formal events, stick to classic combinations like a dark suit with a crisp white shirt. Add a silk tie and polished shoes. For women, a little black dress or elegant pantsuit works perfectly.",
  "casual style":
    "Casual style is all about comfort and personality! Try pairing well-fitted jeans with a simple t-shirt or polo. Add sneakers or loafers, and you're good to go.",
  accessories:
    "Accessories can make or break an outfit! Keep it simple - a watch, a single necklace, or a quality belt. Match metals (gold with gold, silver with silver) and don't overdo it.",
  seasonal:
    "Dress for the season! Light fabrics and bright colors for summer, warm layers and earth tones for fall, cozy sweaters for winter, and fresh pastels for spring.",
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your AI style assistant. Ask me anything about fashion, color matching, outfit suggestions, or styling tips!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simple response logic
    setTimeout(() => {
      let botResponse = "I understand you're asking about fashion! ";

      const lowerInput = input.toLowerCase();
      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          botResponse = value;
          break;
        }
      }

      if (botResponse === "I understand you're asking about fashion! ") {
        botResponse +=
          "Could you be more specific? You can ask me about color matching, formal events, casual style, accessories, or seasonal fashion.";
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">AI Style Assistant</h1>
          <p className="text-muted-foreground">
            Get instant fashion advice and styling tips
          </p>
        </div>

        <Card className="gradient-card overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-full">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Fashion AI</h3>
                <p className="text-sm text-muted-foreground">
                  Always here to help
                </p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-muted/30">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about fashion..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="gradient-hero">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.keys(predefinedResponses).map((topic) => (
            <Button
              key={topic}
              variant="outline"
              onClick={() => setInput(`Tell me about ${topic}`)}
              className="justify-start"
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
