import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

 function ARTryOn() {
  const [userImage, setUserImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mock wardrobe items - in real app, would come from Wardrobe state
  const mockWardrobeItems = [
    {
      id: "1",
      name: "Blue Denim Shirt",
      category: "Shirts",
      imageUrl:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop",
    },
    {
      id: "2",
      name: "White T-Shirt",
      category: "T-Shirts",
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    },
    {
      id: "3",
      name: "Black Jacket",
      category: "Jackets",
      imageUrl:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
    },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUserImage(e.target?.result);
      toast.success("Image uploaded! Select a clothing item to try on.");
    };
    reader.readAsDataURL(file);
  };

  const applyOutfitOverlay = async (clothingItem) => {
    if (!userImage || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      // Load user image
      const userImg = new Image();
      userImg.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        userImg.onload = resolve;
        userImg.onerror = reject;
        userImg.src = userImage;
      });

      // Set canvas size
      canvas.width = userImg.width;
      canvas.height = userImg.height;

      // Draw user image
      ctx.drawImage(userImg, 0, 0);

      // Load clothing item
      const clothingImg = new Image();
      clothingImg.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        clothingImg.onload = resolve;
        clothingImg.onerror = reject;
        clothingImg.src = clothingItem.imageUrl;
      });

      // Calculate overlay position (center top area for shirts/jackets)
      const overlayWidth = userImg.width * 0.6;
      const overlayHeight =
        (clothingImg.height / clothingImg.width) * overlayWidth;
      const x = (userImg.width - overlayWidth) / 2;
      const y = userImg.height * 0.15;

      // Apply slight transparency for realistic blend
      ctx.globalAlpha = 0.85;
      ctx.drawImage(clothingImg, x, y, overlayWidth, overlayHeight);
      ctx.globalAlpha = 1.0;

      toast.success(`${clothingItem.name} applied! Download or try another item.`);
    } catch (error) {
      console.error("Error applying outfit:", error);
      toast.error("Failed to apply outfit. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    applyOutfitOverlay(item);
  };

  const resetCanvas = () => {
    if (!canvasRef.current || !userImage) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = userImage;
    setSelectedItem(null);
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "virtual-tryon.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast.success("Image downloaded!");
  };

  useEffect(() => {
    if (userImage && canvasRef.current) {
      resetCanvas();
    }
  }, [userImage]);

  return (
    <Card className="p-6 gradient-card">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">AR Virtual Try-On</h2>
        </div>
        <p className="text-muted-foreground">
          Upload your photo and virtually try on outfits from your wardrobe
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Canvas Display */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden relative border-2 border-dashed border-border flex items-center justify-center">
            {userImage ? (
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-center p-8">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Upload a photo to get started
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="default"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
            )}
          </div>

          {userImage && (
            <div className="flex gap-2">
              <Button
                onClick={resetCanvas}
                variant="outline"
                className="flex-1"
                disabled={isProcessing}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={downloadImage}
                variant="default"
                className="flex-1"
                disabled={isProcessing}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Wardrobe Selection */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3">Your Wardrobe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select an item to try on
            </p>
          </div>

          {!userImage ? (
            <div className="text-center p-8 bg-muted/50 rounded-xl">
              <p className="text-muted-foreground">
                Upload your photo first to select clothing items
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {mockWardrobeItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  disabled={isProcessing}
                  className={`
                    p-3 rounded-xl border-2 transition-smooth
                    hover:border-primary hover:shadow-hover
                    ${
                      selectedItem?.id === item.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-muted">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </button>
              ))}
            </div>
          )}

          {isProcessing && (
            <div className="text-center p-4">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent mb-2"></div>
              <p className="text-sm text-muted-foreground">Applying outfit...</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
export default ARTryOn;
