
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Wallet, Key } from "lucide-react";
import { AutomaticConnect } from "@/components/dashboard/AutomaticConnect";
import { ManualConnect } from "@/components/dashboard/ManualConnect";

const Dashboard = () => {
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
            <AutomaticConnect />
          </TabsContent>

          <TabsContent value="manual">
            <ManualConnect />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
