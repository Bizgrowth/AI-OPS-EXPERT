import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GOOGLE_CALENDAR_API_KEY = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const GOOGLE_REFRESH_TOKEN = Deno.env.get("GOOGLE_REFRESH_TOKEN");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { bookingId, firstName, lastName, email, company, consultationType, message, bookingDate, bookingTime } = await req.json();

    console.log("Creating calendar event for booking:", bookingId);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let googleEventId = null;

    if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN) {
      try {
        const accessTokenResponse = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            refresh_token: GOOGLE_REFRESH_TOKEN,
            grant_type: "refresh_token",
          }),
        });

        if (!accessTokenResponse.ok) {
          console.error("Failed to get Google access token");
        } else {
          const { access_token } = await accessTokenResponse.json();

          const dateTime = new Date(`${bookingDate} ${bookingTime}`);
          const endDateTime = new Date(dateTime.getTime() + 60 * 60 * 1000);

          const event = {
            summary: `AI Strategy Session - ${firstName} ${lastName}`,
            description: `Consultation Type: ${consultationType}\n${company ? `Company: ${company}\n` : ''}${message ? `Notes: ${message}` : ''}`,
            start: {
              dateTime: dateTime.toISOString(),
              timeZone: "America/New_York",
            },
            end: {
              dateTime: endDateTime.toISOString(),
              timeZone: "America/New_York",
            },
            attendees: [
              { email: email },
              { email: "dschley@aiopsexpert.com" },
            ],
            conferenceData: {
              createRequest: {
                requestId: bookingId,
                conferenceSolutionKey: { type: "hangoutsMeet" },
              },
            },
          };

          const calendarResponse = await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(event),
            }
          );

          if (calendarResponse.ok) {
            const calendarEvent = await calendarResponse.json();
            googleEventId = calendarEvent.id;
            console.log("Google Calendar event created:", googleEventId);
          } else {
            console.error("Failed to create Google Calendar event:", await calendarResponse.text());
          }
        }
      } catch (error) {
        console.error("Google Calendar integration error:", error);
      }
    }

    const { data: booking, error: updateError } = await supabase
      .from("bookings")
      .update({ google_calendar_event_id: googleEventId })
      .eq("id", bookingId)
      .select()
      .single();

    if (updateError) {
      console.error("Failed to update booking:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update booking" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, booking, googleEventId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});