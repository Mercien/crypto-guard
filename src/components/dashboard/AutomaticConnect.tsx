
import { useAddress, useConnect, useDisconnect, useConnectionStatus, metamaskWallet } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

export const AutomaticConnect = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();
  const [hasFailedConnection, setHasFailedConnection] = useState(false);

  const handleConnect = async () => {
    try {
      setHasFailedConnection(false);
      const metamaskConfig = metamaskWallet();
      await connect(metamaskConfig);
      toast({
        title: "Success",
        description: "Wallet connected successfully!",
      });
      // Redirect to report page after successful connection
      navigate("/report");
    } catch (error) {
      console.error("Wallet connection error:", error);
      setHasFailedConnection(true);
      toast({
        title: "Connection Error",
        description: "Node connection was not successfully established",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setHasFailedConnection(false);
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

  const handleSwitchToManual = () => {
    const tabsElement = document.querySelector('[role="tablist"]');
    if (tabsElement) {
      const manualTabButton = tabsElement.querySelectorAll('button')[1];
      if (manualTabButton) {
        manualTabButton.click();
      }
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
      
      {hasFailedConnection && (
        <CardFooter className="border-t pt-4 flex flex-col">
          <div className="flex items-start space-x-2 mb-3 p-3 bg-amber-50 rounded-md text-amber-800 w-full">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Node connection was not successfully established</p>
              <p className="mt-1">Please try the manual connection method instead.</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center text-blue-600"
            onClick={handleSwitchToManual}
          >
            Switch to Manual Connection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
