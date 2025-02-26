
import { Shield, CheckCircle, AlertTriangle, Lock } from "lucide-react";
import { useAddress } from "@thirdweb-dev/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Report = () => {
  const address = useAddress();

  const securityChecks = [
    {
      title: "Initial Assessment",
      status: "complete",
      icon: CheckCircle,
      description: "Basic wallet security scan completed successfully.",
      color: "text-green-500"
    },
    {
      title: "Transaction Analysis",
      status: "in-progress",
      icon: AlertTriangle,
      description: "Analyzing recent transaction patterns for potential security risks.",
      color: "text-yellow-500"
    },
    {
      title: "Smart Contract Interaction",
      status: "pending",
      icon: Lock,
      description: "Reviewing smart contract interactions for potential vulnerabilities.",
      color: "text-blue-500"
    }
  ];

  return (
    <div className="container mx-auto p-6 min-h-screen bg-background">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <Shield className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-3xl font-bold text-primary">Wallet Security Report</h1>
          <p className="text-muted-foreground">
            Security analysis for wallet: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Manual Connection'}
          </p>
        </div>

        <div className="space-y-4">
          {securityChecks.map((check, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <check.icon className={`w-5 h-5 ${check.color}`} />
                  {check.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {check.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Security Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Based on our initial analysis, here are some key security recommendations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
              <li>Enable two-factor authentication for all connected services</li>
              <li>Review and revoke unnecessary smart contract approvals</li>
              <li>Consider using a hardware wallet for enhanced security</li>
              <li>Monitor transaction activity regularly for suspicious patterns</li>
              <li>Keep your seed phrase in a secure, offline location</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
