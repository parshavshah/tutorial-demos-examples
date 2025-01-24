import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-md mx-auto px-4 py-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold gradient-text">Thank You!</h1>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Your order has been successfully placed. We'll send you an email with your order details and tracking information.
          </p>
          <p className="font-medium">Order #123456</p>
        </div>
        
        <div className="pt-4">
          <Button className="w-full gradient-bg gap-2" size="lg" asChild>
            <Link to="/">
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}