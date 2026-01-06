import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { projectId, updateType, title, description } = await req.json();

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: project, error: projectError } = await supabase
      .from("client_projects")
      .select(`
        *,
        clients_profile!client_projects_user_id_fkey(
          full_name,
          company_name
        )
      `)
      .eq("id", projectId)
      .maybeSingle();

    if (projectError || !project) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: userData } = await supabase.auth.admin.getUserById(project.user_id);

    if (!userData?.user?.email) {
      return new Response(
        JSON.stringify({ error: "User email not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: prefs } = await supabase
      .from("notification_preferences")
      .select("project_updates")
      .eq("user_id", project.user_id)
      .maybeSingle();

    if (prefs && !prefs.project_updates) {
      return new Response(
        JSON.stringify({ success: true, message: "User has disabled project update notifications" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const updateTypeLabels: Record<string, string> = {
      status_change: "Status Update",
      milestone: "Milestone Reached",
      document: "New Document",
      message: "New Message",
      note: "Project Note",
    };

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
    .update-badge { display: inline-block; background: #06b6d4; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 15px; }
    .project-name { color: #06b6d4; font-weight: bold; }
    .button { display: inline-block; background: #06b6d4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Project Update</h1>
    </div>
    <div class="content">
      <span class="update-badge">${updateTypeLabels[updateType] || updateType}</span>
      <h2>${title}</h2>
      <p><strong>Project:</strong> <span class="project-name">${project.name}</span></p>
      ${description ? `<p>${description}</p>` : ''}
      
      <div style="text-align: center;">
        <a href="https://aiopsexpert.com/client-portal" class="button">View in Portal</a>
      </div>
      
      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        You're receiving this email because you have project update notifications enabled.
        You can manage your notification preferences in your portal settings.
      </p>
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
      to: [userData.user.email],
      subject: `Project Update: ${project.name} - ${title}`,
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