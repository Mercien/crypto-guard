
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scan_id } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch scan data
    const { data: scanData, error: scanError } = await supabaseClient
      .from('wallet_scans')
      .select('*, security_issues(*)')
      .eq('id', scan_id)
      .single();

    if (scanError) throw scanError;

    // Analyze with GPT-4
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a blockchain security expert. Analyze the wallet scan results and provide concise, actionable suggestions for improving security.'
          },
          {
            role: 'user',
            content: `Please analyze these wallet scan results and provide security suggestions: ${JSON.stringify(scanData)}`
          }
        ],
      }),
    });

    const aiResponse = await response.json();
    const suggestions = aiResponse.choices[0].message.content;

    // Update scan with AI suggestions
    const { error: updateError } = await supabaseClient
      .from('wallet_scans')
      .update({ 
        scan_results: { ...scanData.scan_results, ai_suggestions: suggestions },
        status: 'completed'
      })
      .eq('id', scan_id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
