
import { useAddress, useConnect, useDisconnect, useConnectionStatus, metamaskWallet } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const AutomaticConnect = () => {
  const { toast } = useToast();
  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();

  const handleConnect = async () => {
    try {
      const metamaskConfig = metamaskWallet();
      await connect(metamaskConfig);
      toast({
        title: "Success",
        description: "Wallet connected successfully!",
      });
    } catch (error) {
      console.error("Wallet connection error:", error);
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
      console.error("Wallet disconnection error:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  return (
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
  );
};

