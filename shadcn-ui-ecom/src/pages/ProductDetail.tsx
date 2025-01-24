import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const product = {
  id: 1,
  name: "Classic White Sneakers",
  price: 89.99,
  description: "Premium quality sneakers made with genuine leather and durable rubber sole. Perfect for everyday wear.",
  sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
  images: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1549298916-f52d724204b4?auto=format&fit=crop&q=80&w=600",
  ],
  details: "The Classic White Sneakers feature a timeless design that never goes out of style. Made with premium materials including genuine leather upper and durable rubber sole.",
  care: "Clean with a soft, damp cloth. Avoid direct sunlight when drying. Store in a cool, dry place.",
};

export default function ProductDetail() {
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAddToCart = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="fixed top-14 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm p-2 border-b">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold gradient-text">Product Details</h1>
        </div>
      </div>

      <div className="pt-20 px-2 max-w-lg mx-auto space-y-3">
        <div className="space-y-2">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-xl font-bold text-primary mt-1">${product.price}</p>
          </div>

          <p className="text-sm text-muted-foreground">{product.description}</p>

          <div className="space-y-1">
            <label className="text-sm font-medium">Size</label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full gradient-bg" 
            size="sm"
            onClick={handleAddToCart}
            disabled={!size}
          >
            Add to Cart
          </Button>

          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="care" className="flex-1">Care</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="text-sm text-muted-foreground mt-2">
              {product.details}
            </TabsContent>
            <TabsContent value="care" className="text-sm text-muted-foreground mt-2">
              {product.care}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}