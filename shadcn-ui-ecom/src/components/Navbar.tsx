import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container h-14 flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-lg gradient-text">Store</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="relative h-8 w-8">
            <Link to="/checkout">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                1
              </span>
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <nav className="flex flex-col gap-2 mt-4">
                <Link to="/" className="text-base font-medium transition-colors hover:text-primary">
                  Shop
                </Link>
                <a href="#" className="text-base font-medium text-muted-foreground transition-colors hover:text-primary">
                  About
                </a>
                <a href="#" className="text-base font-medium text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}