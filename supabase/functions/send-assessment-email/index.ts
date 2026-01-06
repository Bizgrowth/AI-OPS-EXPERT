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
    const { assessmentType, contactName, contactEmail, contactPhone, companyName, industry, responses } = await req.json();

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const assessmentTitles: Record<string, string> = {
      business_readiness: 'Business Readiness Assessment',
      roi_viability: 'ROI Viability Analysis',
      implementation_readiness: 'Implementation Readiness Check'
    };

    const assessmentTitle = assessmentTitles[assessmentType] || assessmentType;

    let responsesText = '';
    if (responses && typeof responses === 'object') {
      responsesText = Object.entries(responses)
        .filter(([key]) => !['contact_name', 'contact_email', 'contact_phone', 'company_name', 'industry'].includes(key))
        .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)
        .join('\n');
    }

    const emailBody = `New Assessment Submission: ${assessmentTitle}

Contact Information:
Name: ${contactName}
Email: ${contactEmail}
Phone: ${contactPhone || 'Not provided'}
Company: ${companyName || 'Not provided'}
Industry: ${industry || 'Not provided'}

--- Assessment Responses ---
${responsesText}

--- End of Responses ---
`;

    const emailPayload = {
      from: "onboarding@resend.dev",
      to: ["dschley@aiopsexpert.com"],
      subject: `New ${assessmentTitle}: ${contactName}`,
      text: emailBody,
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
