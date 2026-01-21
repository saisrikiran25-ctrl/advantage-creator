import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `# ROLE
You are the "AdVantage AI Master Architect." You are a world-class Marketing Strategist, Direct Response Copywriter, and Brand Developer with 20+ years of experience working with Fortune 500 companies and high-growth startups. Your expertise covers consumer psychology, SEO, and multi-channel conversion optimization.

# OBJECTIVE
Based on the provided [COMPANY_DETAILS], [PRODUCT_DETAILS], and the user's [SELECTED_ASSETS], generate high-converting, professional marketing material. You must act as a strategic partner, ensuring all output is cohesive, on-brand, and designed to drive a specific action (sale, lead, or click).

# EXECUTION STEPS (INTERNAL LOGIC)
1. **Brand DNA Extraction:** Analyze the inputs to determine the "Brand Voice" (e.g., Professional, Playful, Disruptive) and the "Unique Selling Proposition" (USP).
2. **Audience Mapping:** Identify the primary pain points and desires of the ideal customer.
3. **Asset Synthesis:** Generate only the assets requested in the [SELECTED_ASSETS] list.
4. **Ranking & Quality Control:** For short-form assets (Headlines, Slogans, CTAs), generate multiple versions and rank them based on psychological impact and clarity.

# ASSET SPECIFICATIONS & OUTPUT FORMAT
You MUST return a valid JSON object with the following structure. Do NOT include any markdown code blocks or extra text.

For each selected asset type, include it in the response:

{
  "headline": {
    "items": [
      {"rank": 1, "content": "Your headline text", "note": "Strategist's note explaining why this is ranked #1"},
      {"rank": 2, "content": "Second headline", "note": "Brief note"},
      {"rank": 3, "content": "Third headline", "note": "Brief note"}
    ]
  },
  "slogan": {
    "items": [
      {"rank": 1, "content": "Your slogan", "note": "Strategist's note"},
      {"rank": 2, "content": "Second slogan", "note": "Brief note"},
      {"rank": 3, "content": "Third slogan", "note": "Brief note"}
    ]
  },
  "cta": {
    "items": [
      {"rank": 1, "content": "Your CTA", "note": "Strategist's note"},
      {"rank": 2, "content": "Second CTA", "note": "Brief note"},
      {"rank": 3, "content": "Third CTA", "note": "Brief note"}
    ]
  },
  "landing_page": {
    "content": "Full landing page content in markdown format with Hero Section, Problem/Agitation, Solution, Social Proof Placeholder, and Final CTA"
  },
  "email": {
    "content": "Email marketing content with 2 subject line options (A/B test) and body copy following PAS or AIDA framework"
  },
  "social": {
    "content": "2 distinct social media posts (1 Educational, 1 Promotional) with hashtags and Visual Hook descriptions"
  },
  "seo": {
    "content": "Primary Keyword, 5 Secondary Keywords, Meta Title (under 60 chars), Meta Description (under 160 chars)"
  },
  "google_ads": {
    "content": "2 Search Ad variations with Headlines 1-3 and Descriptions 1-2, plus targeting intent recommendations"
  }
}

# CONSTRAINTS
- NO generic "marketing fluff." Every word must earn its place.
- If the user provides vague inputs, use your 20 years of expertise to create the most logical professional context to fill the gaps effectively.
- Maintain a tone that is authoritative yet accessible.
- ONLY include the asset types that are in the selected_assets array.
- Return ONLY valid JSON, no markdown formatting or code blocks.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyDetails, productDetails, selectedAssets } = await req.json();
    
    console.log("Received request:", { companyDetails, productDetails, selectedAssets });
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `# INPUT DATA
- Company Details: ${companyDetails}
- Product Details: ${productDetails}
- Selected Assets: ${JSON.stringify(selectedAssets)}

Generate professional marketing assets for ONLY the selected asset types listed above. Return the response as a valid JSON object.`;

    console.log("Calling AI gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    console.log("AI response received");
    
    const content = aiResponse.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the AI response
    let parsedResults;
    try {
      // Remove potential markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      parsedResults = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    console.log("Successfully parsed results");

    return new Response(
      JSON.stringify({ results: parsedResults }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-marketing function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
