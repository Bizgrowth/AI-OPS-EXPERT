import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

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
    const { name, email, company, projectType, budget, timeline, description } = await req.json();

    console.log("Processing custom quote request for:", name);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabaseClient
      .from('quote_requests')
      .insert({
        name,
        email,
        company,
        project_type: projectType,
        budget,
        timeline,
        description,
        status: 'new'
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailBody = `New Custom Quote Request

Contact Information:
- Name: ${name}
- Email: ${email}
- Company: ${company || 'Not provided'}

Project Details:
- Type: ${projectType}
- Budget: ${budget || 'Not specified'}
- Timeline: ${timeline}

Project Description:
${description}

---
This is an automated message from the AI Ops Expert website.`;

    const emailPayload = {
      from: "onboarding@resend.dev",
      to: ["dschley@aiopsexpert.com"],
      subject: `Custom Quote Request: ${name} - ${projectType}`,
      text: emailBody,
    };

    console.log("Sending email to Resend API...");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const responseText = await res.text();
    console.log("Resend API response status:", res.status);
    console.log("Resend API response:", responseText);

    if (!res.ok) {
      console.error("Resend API error - Status:", res.status);
      console.error("Resend API error - Body:", responseText);
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
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});