import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!PAYSTACK_SECRET_KEY) {
      throw new Error('PAYSTACK_SECRET_KEY not configured');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { planId, email } = await req.json();

    // Get plan details
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError || !plan) {
      return new Response(JSON.stringify({ error: 'Plan not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Initializing Paystack payment for plan:', plan.name, 'Amount:', plan.amount);

    // Initialize Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: plan.amount, // Amount in pesewas (GHS smallest unit)
        currency: 'GHS',
        metadata: {
          user_id: user.id,
          plan_id: planId,
        },
        callback_url: `${req.headers.get('origin')}/pricing?verify=true`,
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      console.error('Paystack error:', paystackData);
      return new Response(JSON.stringify({ error: 'Payment initialization failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Payment initialized:', paystackData.data.reference);

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        paystack_reference: paystackData.data.reference,
        amount: plan.amount,
        status: 'pending',
      });

    if (paymentError) {
      console.error('Payment record error:', paymentError);
    }

    return new Response(JSON.stringify({
      authorization_url: paystackData.data.authorization_url,
      reference: paystackData.data.reference,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in paystack-initialize:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});