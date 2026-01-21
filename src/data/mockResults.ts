export interface MockResults {
  headline: {
    items: Array<{ rank: number; content: string; note?: string }>;
  };
  slogan: {
    items: Array<{ rank: number; content: string; note?: string }>;
  };
  cta: {
    items: Array<{ rank: number; content: string; note?: string }>;
  };
  landing_page: {
    content: string;
  };
  email: {
    content: string;
  };
  social: {
    content: string;
  };
  seo: {
    content: string;
  };
  google_ads: {
    content: string;
  };
}

export const mockResults: MockResults = {
  headline: {
    items: [
      {
        rank: 1,
        content: "Stop Guessing. Start Converting. Marketing That Actually Works.",
        note: "Uses the 'Loss Aversion' principle to drive urgency and positions the solution as authoritative."
      },
      {
        rank: 2,
        content: "Your Competition Is Using AI Marketing. Shouldn't You?",
        note: "Leverages social proof and FOMO to create competitive urgency."
      },
      {
        rank: 3,
        content: "From Idea to Campaign in 60 Seconds — Powered by AI",
        note: "Focuses on speed and efficiency, appealing to time-constrained marketers."
      }
    ]
  },
  slogan: {
    items: [
      {
        rank: 1,
        content: "Your Brand's Unfair Advantage",
        note: "Short, memorable, and implies exclusive competitive benefit."
      },
      {
        rank: 2,
        content: "Marketing Intelligence, Instantly",
        note: "Emphasizes both the AI aspect and speed of delivery."
      },
      {
        rank: 3,
        content: "Where Strategy Meets Speed",
        note: "Balanced approach highlighting both quality and efficiency."
      }
    ]
  },
  cta: {
    items: [
      {
        rank: 1,
        content: "Generate My Strategy Free →",
        note: "Combines personalization ('My'), value ('Free'), and clear action with directional cue."
      },
      {
        rank: 2,
        content: "Start Creating in Seconds",
        note: "Emphasizes speed and immediate gratification."
      },
      {
        rank: 3,
        content: "See Your Marketing Transformed",
        note: "Outcome-focused, appeals to the desire for change."
      }
    ]
  },
  landing_page: {
    content: `## Hero Section

**Headline:** Professional Marketing Assets in Seconds

**Subheadline:** Transform your brand DNA into high-converting headlines, landing pages, emails, and ad campaigns. Powered by 20+ years of marketing expertise.

**Primary CTA:** Generate My Strategy Free →

---

## Problem / Agitation Section

### The Marketing Struggle Is Real

Every day, businesses waste thousands of dollars on marketing that doesn't convert. Why?

- **Generic copy** that sounds like everyone else
- **Inconsistent messaging** across channels
- **Hours spent** on assets that underperform
- **No data-driven strategy** behind the creative

You need a marketing team that understands psychology, SEO, and conversion optimization. But hiring that expertise costs $150,000+ per year.

---

## Solution Section

### Enter AdVantage AI

We've distilled 20+ years of Fortune 500 marketing expertise into an AI that thinks like a seasoned CMO.

**What you get:**

- ✓ Headlines that stop the scroll
- ✓ Landing pages that convert visitors into customers
- ✓ Email sequences that nurture and sell
- ✓ Social content that builds engagement
- ✓ SEO optimization that ranks
- ✓ Ad copy that lowers your CAC

---

## Social Proof Section

*[Placeholder for testimonials, client logos, and case studies]*

"AdVantage AI generated better ad copy in 60 seconds than my team did in a week." — Marketing Director, SaaS Company

---

## Final CTA Section

### Ready to Transform Your Marketing?

Stop spending hours on copy that doesn't convert. Let AI do the heavy lifting while you focus on growing your business.

**[Generate My Strategy Free →]**

No credit card required. Results in under 60 seconds.`
  },
  email: {
    content: `## Email Marketing Campaign

### Subject Line Options (A/B Test)

**A:** Your competitors are already using this... 👀
**B:** The marketing hack that took us 20 years to learn

---

### Email Body (PAS Framework)

**Subject:** Your competitors are already using this... 👀

Hi [First Name],

Let me ask you something uncomfortable:

**When was the last time your marketing actually worked?**

I'm not talking about vanity metrics. I mean real, measurable results — leads that convert, campaigns that pay for themselves, copy that makes people reach for their wallets.

If you're like most businesses I talk to, the answer is "I'm not sure" or worse, "I can't remember."

**Here's the problem:** Great marketing requires a rare combination of skills — psychology, copywriting, SEO, conversion optimization, and data analysis. Most marketing teams are good at one or two of these. Almost none are great at all of them.

That's why we built AdVantage AI.

It's not another "AI writing tool." It's the distilled expertise of marketing professionals who've spent 20+ years working with Fortune 500 companies and high-growth startups.

**In 60 seconds, you can generate:**
• Headlines that actually stop the scroll
• Landing pages designed to convert
• Email sequences that nurture AND sell
• Ad copy that lowers your customer acquisition cost

The best part? It's free to try.

**[Generate My Marketing Strategy →]**

Your competitors are already exploring AI-powered marketing. The question is: will you lead, or will you follow?

To your success,
The AdVantage AI Team

P.S. — I almost forgot to mention: we've seen users cut their content creation time by 80% while INCREASING conversion rates. Curious? [See how it works →]`
  },
  social: {
    content: `## Social Media Content

---

### Post 1: Educational (LinkedIn/Twitter)

**Copy:**
I used to spend 8+ hours writing a single landing page.

Now I do it in 60 seconds.

Here's what changed:

I stopped guessing what works.

Instead, I started using AI trained on 20+ years of conversion data.

The result?
→ Headlines that actually stop the scroll
→ Copy that speaks to pain points
→ CTAs that drive action

The future of marketing isn't about working harder.

It's about working smarter.

**Visual Hook:** Split screen showing "Before: frustrated marketer with messy desk, clock showing 8 hours" vs "After: clean workspace, coffee, clock showing 1 minute"

**Hashtags:** #MarketingTips #AIMarketing #Productivity #ContentCreation #MarketingStrategy

---

### Post 2: Promotional (Instagram/Facebook)

**Copy:**
Your marketing should work as hard as you do. 💪

Introducing AdVantage AI — the marketing engine that turns your brand DNA into high-converting assets.

✓ Headlines that convert
✓ Emails that sell
✓ Ads that perform
✓ Landing pages that wow

All in under 60 seconds. ⚡

Ready to transform your marketing? Link in bio.

**Visual Hook:** Sleek product mockup showing the AdVantage AI dashboard with generated content, electric blue gradient background, floating marketing icons (email, target, chart trending up)

**Hashtags:** #AIMarketing #MarketingAutomation #DigitalMarketing #GrowthHacking #StartupTools #MarketingAI`
  },
  seo: {
    content: `## SEO Optimization Strategy

---

### Primary Keyword
**ai marketing generator**

### Secondary Keywords
1. ai copywriting tool
2. marketing content generator
3. ai landing page builder
4. automated email marketing copy
5. ai ad copy generator

---

### Meta Title
AI Marketing Generator | Create Converting Copy in 60 Seconds

*Character count: 58 (✓ Under 60)*

---

### Meta Description
Transform your brand into high-converting marketing assets with AdVantage AI. Generate headlines, landing pages, emails & ads in seconds. Try free today.

*Character count: 158 (✓ Under 160)*

---

### Content Strategy Notes

**Search Intent:** High-intent transactional — users searching these terms are actively looking for solutions to automate their marketing content creation.

**Recommended Content Clusters:**
- How AI is changing marketing (educational)
- Comparison pages (vs. other tools)
- Use case pages (email marketing, landing pages, etc.)
- ROI calculators and case studies`
  },
  google_ads: {
    content: `## Google Ads Strategy

---

### Search Ad Variation 1

**Headlines:**
1. AI Marketing Generator | Try Free
2. Create Ads, Emails & Landing Pages
3. Results in 60 Seconds

**Descriptions:**
1. Stop struggling with marketing copy. AdVantage AI generates professional assets using proven conversion frameworks.
2. Join 10,000+ marketers using AI to create better content faster. No credit card required.

---

### Search Ad Variation 2

**Headlines:**
1. Marketing Copy That Converts
2. Powered by 20+ Years of Expertise
3. Generate Assets in Seconds

**Descriptions:**
1. Headlines, landing pages, emails & ad copy — all optimized for conversion. Try AdVantage AI free today.
2. Fortune 500 marketing expertise, accessible to everyone. Create professional campaigns in under a minute.

---

### Targeting Strategy

**Intent Level:** High-intent transactional

**Recommended Keywords:**
- ai marketing tool
- marketing copy generator
- ai copywriting software
- landing page copy generator
- email marketing ai

**Negative Keywords:**
- free (for paid campaigns)
- jobs
- salary
- how to become

**Audience Signals:**
- Small business owners
- Digital marketers
- Startup founders
- Marketing managers`
  }
};
