import { Link, useLocation } from "react-router-dom";
import { Home, Shirt, Sparkles, MessageCircle, ShoppingBag, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/wardrobe", label: "Wardrobe", icon: Shirt },
  { path: "/recommendations", label: "Outfit Suggestions", icon: Sparkles },
  { path: "/chatbot", label: "Style Assistant", icon: MessageCircle },
  { path: "/shopping", label: "What to Buy", icon: ShoppingBag },
  { path: "/about", label: "About", icon: Info },
];

 function Navigation() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shirt className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SmartWardrobe</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth",
                    "hover:bg-secondary/80",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {navItems.slice(0, 3).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "p-2 rounded-lg transition-smooth",
                    "hover:bg-secondary/80",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
