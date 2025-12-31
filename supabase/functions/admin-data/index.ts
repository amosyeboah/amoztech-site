import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminEmail = Deno.env.get("ADMIN_EMAIL")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create client with user's token to verify identity
    const supabaseUser = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      console.error("Auth error:", userError);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user is admin by email
    if (user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      console.log("Access denied for:", user.email);
      return new Response(JSON.stringify({ error: "Access denied. Admin only." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Get all subscriptions with plan details
    const { data: subscriptions, error: subError } = await supabaseAdmin
      .from("subscriptions")
      .select(`
        *,
        subscription_plans (*)
      `)
      .order("created_at", { ascending: false });

    if (subError) {
      console.error("Subscriptions fetch error:", subError);
      throw subError;
    }

    // Get all payments
    const { data: payments, error: payError } = await supabaseAdmin
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (payError) {
      console.error("Payments fetch error:", payError);
      throw payError;
    }

    // Get all plans
    const { data: plans, error: plansError } = await supabaseAdmin
      .from("subscription_plans")
      .select("*")
      .order("amount", { ascending: true });

    if (plansError) {
      console.error("Plans fetch error:", plansError);
      throw plansError;
    }

    // Get user emails from auth.users
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (usersError) {
      console.error("Users fetch error:", usersError);
      throw usersError;
    }

    // Create a map of user_id to email
    const userMap = new Map(users.map(u => [u.id, { email: u.email, created_at: u.created_at }]));

    // Enrich subscriptions with user emails
    const enrichedSubscriptions = subscriptions?.map(sub => ({
      ...sub,
      user_email: userMap.get(sub.user_id)?.email || "Unknown",
      user_created_at: userMap.get(sub.user_id)?.created_at,
    }));

    // Calculate metrics
    const totalUsers = users.length;
    const activeSubscriptions = subscriptions?.filter(s => s.status === "active").length || 0;
    const totalRevenue = payments?.filter(p => p.status === "successful").reduce((sum, p) => sum + p.amount, 0) || 0;
    const pendingPayments = payments?.filter(p => p.status === "pending").length || 0;

    console.log("Admin data fetched successfully for:", user.email);

    return new Response(
      JSON.stringify({
        subscriptions: enrichedSubscriptions,
        payments,
        plans,
        users: users.map(u => ({ id: u.id, email: u.email, created_at: u.created_at })),
        metrics: {
          totalUsers,
          activeSubscriptions,
          totalRevenue,
          pendingPayments,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Admin data error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
