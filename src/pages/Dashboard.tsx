
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null);

  const { data: scans, isLoading } = useQuery({
    queryKey: ["wallet-scans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallet_scans")
        .select(`
          *,
          security_issues (*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const analyzeScan = async (scanId: string) => {
    try {
      const response = await supabase.functions.invoke("analyze-wallet", {
        body: { scan_id: scanId },
      });

      if (response.error) throw response.error;

      toast({
        title: "Analysis Complete",
        description: "AI suggestions have been generated for your wallet.",
      });

      setSelectedScanId(scanId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze wallet scan.",
        variant: "destructive",
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Wallet Security Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scans?.map((scan) => (
          <Card key={scan.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg truncate" title={scan.wallet_address}>
                  {scan.wallet_address.substring(0, 12)}...
                </span>
                <span className={`text-2xl ${getScoreColor(scan.security_score || 0)}`}>
                  {scan.security_score || 0}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(scan.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    {scan.security_score >= 70 ? (
                      <ShieldCheck className="text-green-500" />
                    ) : (
                      <AlertCircle className="text-yellow-500" />
                    )}
                  </span>
                </div>

                {scan.security_issues && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Security Issues</h3>
                    <ul className="space-y-2">
                      {scan.security_issues.map((issue) => (
                        <li key={issue.id} className="flex items-start gap-2 text-sm">
                          {issue.severity === "high" ? (
                            <ArrowUp className="text-red-500 mt-1" />
                          ) : (
                            <ArrowDown className="text-yellow-500 mt-1" />
                          )}
                          <span>{issue.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {scan.scan_results?.ai_suggestions && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">AI Suggestions</h3>
                    <p className="text-sm text-gray-600">{scan.scan_results.ai_suggestions}</p>
                  </div>
                )}

                <Button
                  onClick={() => analyzeScan(scan.id)}
                  disabled={scan.status === "pending"}
                  className="w-full mt-4"
                >
                  {scan.status === "pending" ? "Analysis in Progress" : "Analyze with AI"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
