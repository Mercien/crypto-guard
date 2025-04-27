
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StartScanDialogProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export const StartScanDialog = ({ variant = "primary", className }: StartScanDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !walletAddress) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("userEmail", email);
    localStorage.setItem("walletAddress", walletAddress);
    
    setIsDialogOpen(false);
    navigate("/dashboard");
    toast({
      title: "Welcome!",
      description: "Let's secure your crypto wallet.",
    });
  };

  const buttonStyle = variant === "primary" 
    ? "bg-primary text-white hover:bg-primary/90" 
    : "bg-white text-primary hover:bg-white/90";

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button
          size="lg"
          className={`${buttonStyle} transition-all duration-300 ${className}`}
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Your Wallet Security Scan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet">Wallet Address</Label>
            <Input
              id="wallet"
              placeholder="Enter your wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Start Scan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
