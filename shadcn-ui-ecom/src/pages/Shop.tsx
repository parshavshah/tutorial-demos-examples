import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  {
    id: 1,
    name: "Classic White",
    price: 89.99,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 129.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Leather Watch",
    price: 199.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 79.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
  },
];

export default function Shop() {
  const [category, setCategory] = useState<string>("all");

  const filteredProducts = category === "all" 
    ? products 
    : products.filter(product => product.category === category);

  return (
    <div className="pb-16">
      <div className="fixed top-14 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm p-2 border-b">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <h1 className="text-xl font-bold gradient-text">Discover</h1>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className=" pt-20 max-w-lg mx-auto grid-cols-2 gap-2 grid">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="product-card  border hover:border-primary/50">
            <CardContent className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[100px] object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-2">
              <div className="flex flex-col w-full">
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <span className="font-bold text-xs text-primary">${product.price}</span>
              </div>

              <Button className="w-full gradient-bg" size="sm" asChild>
                <Link to={`/product/${product.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}