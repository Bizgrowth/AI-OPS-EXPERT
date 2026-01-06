import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("resend_api_key") || Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, fullName, companyName } = await req.json();

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #06b6d4 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #06b6d4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to AI Ops Expert!</h1>
    </div>
    <div class="content">
      <h2>Hi ${fullName},</h2>
      <p>Thank you for creating your client account with AI Ops Expert. We're excited to have you on board!</p>
      
      ${companyName ? `<p>We look forward to working with <strong>${companyName}</strong> and helping you achieve your AI and automation goals.</p>` : ''}
      
      <p>Your account is now active and you can access your client portal at any time to:</p>
      <ul>
        <li>View your project status and progress</li>
        <li>Access important documents and deliverables</li>
        <li>Communicate directly with our team</li>
        <li>Track milestones and updates</li>
      </ul>
      
      <div style="text-align: center;">
        <a href="https://aiopsexpert.com/client-login" class="button">Access Your Portal</a>
      </div>
      
      <p>If you have any questions or need assistance, don't hesitate to reach out to our team.</p>
      
      <p>Best regards,<br>
      <strong>Daniel Schley</strong><br>
      AI Ops Expert</p>
    </div>
    <div class="footer">
      <p>&copy; 2026 AI Ops Expert. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    const emailPayload = {
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Welcome to AI Ops Expert - Your Account is Ready",
      html: emailHtml,
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const responseText = await res.text();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: responseText }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = JSON.parse(responseText);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});