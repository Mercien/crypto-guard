
import { Shield, CheckCircle } from "lucide-react";
import { useAddress } from "@thirdweb-dev/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Report = () => {
  const address = useAddress();

  return (
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <Shield className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-3xl font-bold text-primary">Wallet Security Report</h1>
          <p className="text-muted-foreground">
            Security analysis for wallet: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Initial Assessment Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your wallet is now connected and ready for a detailed security analysis. 
              We're analyzing your wallet's transaction history and security settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
