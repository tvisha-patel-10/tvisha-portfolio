---
layout: ../../layouts/caseStudyLayout.astro

title: "Strawberry.me"
pageTitle: "Strawberry.me AI Drafts Case Study — Tvisha Patel"
description: "Designing an AI draft messaging workflow for 800+ coaches that increased follow-up rates from 60% to 92%."
year: "2025"
subtitle: "AI message draft workflow for coaches | 60% → 92% follow-up rate"
heroImage: "/images/strawberry-ai/hero-mockup.png"
role: "Founding Product Designer"
timeline: "8-Day Sprint (7 Days Spec + Build, 1 Day UAT)"
team:
  - "1 Founding Product Designer (me)"
  - "1 Product Manager"
  - "Engineering Team"
  - "Data Science / AI Team"
skills:
  - "AI Workflow Design"
  - "Human-in-the-Loop AI"
  - "Rapid Prototyping (Cursor & Claude)"
  - "Usability & Systems Design"
  - "Product Strategy & Hypothesis Testing"
sections:
  - { id: "overview", label: "Overview" }
  - { id: "discovery", label: "Discovery & Hypothesis" }
  - { id: "design-process", label: "Design Iterations & Decisions" }
  - { id: "prototype", label: "Workflow & Prototype" }
  - { id: "impact", label: "Impact & Learnings" }
passwordProtected: true
---

<!-- 1. OVERVIEW SECTION -->
<section id="overview" class="cs-section">
  <h4 class="section-label">Overview</h4>
  <h2>Empowering 800+ coaches to follow up consistently through context-aware AI drafts</h2>
  <p>
    Strawberry.me is a high-growth coaching marketplace connecting clients with vetted professional coaches for career and personal development ($20M+ ARR).
  </p>
  <p>
    As the founding product designer, I was handed an ambitious and open-ended brief from leadership: <strong>“Embed AI into the coaching workflow. Figure out where.”</strong>
  </p>
  <p>
    With crucial investor meetings only 14 days away and no existing feature to redesign, I led the end-to-end product design, user research, and technical prototyping in an intensive 8-day sprint (7 days spec + build, 1 day UAT).
  </p>

  <div class="callout">
    <h3>Impact: Increased coach follow-up rates from 60% to 92% across 800 coaches, drove a +15% lift in client retention (2nd charge rate), and became a flagship AI feature pitched in Strawberry.me's $21M fundraising round.</h3>
  </div>

  <div class="grid-4">
    <div class="grid-card">
      <h3>60% → 92%</h3>
      <p><strong>Coach Follow-Up Rate</strong></p>
      <p>Consistent weekly follow-ups surged across all 800 platform coaches.</p>
    </div>
    <div class="grid-card">
      <h3>+15%</h3>
      <p><strong>Client Retention Lift</strong></p>
      <p>Measured directly via 2nd subscription charge and re-booking rates.</p>
    </div>
    <div class="grid-card">
      <h3>8 Days</h3>
      <p><strong>Sprint Velocity</strong></p>
      <p>7 days spec + build, 1 day UAT—delivered 6 days ahead of investor meetings.</p>
    </div>
    <div class="grid-card">
      <h3>$21M</h3>
      <p><strong>Fundraising Feature</strong></p>
      <p>Highlighted as a primary product differentiator during Series A fundraising.</p>
    </div>
  </div>

  <div class="full-width-media">
    <img
      src="/images/strawberry-ai/hero-mockup.png"
      alt="Strawberry.me AI Message Draft Generator Laptop Mockup"
      loading="lazy"
    />
  </div>

  <div class="section-divider"></div>
</section>

<!-- 2. DISCOVERY & HYPOTHESIS SECTION -->
<section id="discovery" class="cs-section">
  <h4 class="section-label">Discovery & Research</h4>
  <h2>Uncovering the real friction and pivoting from 'writing tool' to 'reminder workflow'</h2>

  <div class="callout">
    <h3>“I’m mostly sending repetitive stuff like follow-ups, check-ins, and summaries. It’s super time consuming and honestly annoying to gather my notes and the context from past sessions for each client.”</h3>
    <p style="font-size: 0.95rem; opacity: 0.7; margin-top: 0.5rem;">— Strawberry.me Coach Interview</p>
  </div>

  <p>
    Our platform data revealed a striking correlation: top-performing coaches who consistently followed up with clients had significantly stronger client retention. However, due to cognitive overload and administrative friction, only ~60% of coaches were following up consistently. 40% of follow-up opportunities were slipping through the cracks.
  </p>

  <h3>Competitive Analysis</h3>
  <p>
    To understand how leading generative tools handle synthesis and user confidence, I analyzed four industry benchmarks:
  </p>

  <div class="grid-2">
    <div class="grid-card">
      <h3>Google AI Overview & Claude</h3>
      <p>
        Studied citation cards, footnote triggers, and contextual retrieval models that surface where source facts originate.
      </p>
    </div>
    <div class="grid-card">
      <h3>Intercom Fin & Notion AI</h3>
      <p>
        Analyzed inline copilot interactions, one-click draft insertions, and binary thumbs up/down model feedback mechanisms.
      </p>
    </div>
  </div>

  <div class="full-width-media">
    <img
      src="/images/strawberry-ai/competitive-analysis.png"
      alt="Competitive Analysis of AI Generation and Source Attribution Patterns"
      loading="lazy"
    />
  </div>

  <h3>The Hypothesis Pivot</h3>
  <div class="grid-2">
    <div class="grid-card">
      <h3>Initial Assumption</h3>
      <p>
        We initially assumed coaches wanted a standalone AI messaging assistant where they could type custom prompts to compose messages from scratch.
      </p>
      <p style="color: #ef4444; font-weight: 500;">
        Reality: Coaches were already overwhelmed by open reminders piling up in their sidebar.
      </p>
    </div>
    <div class="grid-card">
      <h3>Strategic Pivot</h3>
      <p>
        We realized coaches didn't need another blank prompt window. They needed a zero-friction workflow that converts open reminder tasks into ready-to-send, context-aware drafts.
      </p>
      <p style="color: #10b981; font-weight: 500;">
        Solution: Surface AI drafts directly inside the reminder workflow.
      </p>
    </div>
  </div>

  <div class="callout">
    <h3>Core Hypothesis: If surfacing AI drafts directly inside the reminder workflow reduces the friction of following up, then coaches will follow up more consistently, improving client retention as a result.</h3>
  </div>

  <h3>Target Success Metrics (KPIs)</h3>
  <div class="grid-4">
    <div class="grid-card">
      <h3>Follow-Up Rate</h3>
      <p>Boost coach follow-up consistency from 60% baseline to 80% across 800 coaches.</p>
    </div>
    <div class="grid-card">
      <h3>Client Retention</h3>
      <p>Increase client stickiness, measured quantitatively via second subscription charge rate.</p>
    </div>
    <div class="grid-card">
      <h3>Coach Authenticity</h3>
      <p>Preserve authentic coach-client relationship quality without robotic boilerplate.</p>
    </div>
    <div class="grid-card">
      <h3>Speed to Market</h3>
      <p>Design, build, and test the feature within a strict 14-day deadline ahead of investor meetings.</p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 3. DESIGN ITERATIONS & DECISIONS SECTION -->
<section id="design-process" class="cs-section">
  <h4 class="section-label">Design Iterations & Decisions</h4>
  <h2>Iterating on source transparency and navigating AI product tradeoffs</h2>

  <h3>The Evolution of Source Attribution</h3>
  <p>
    Coaches expressed hesitation about sending AI-generated text without knowing where the information came from. Establishing clear provenance was critical to earn coach trust.
  </p>

  <div class="grid-3">
    <div class="grid-card">
      <h3>V1: Inline Badges</h3>
      <p>Numbered footnote badges (<code>[1]</code>, <code>[2]</code>) placed directly inside the editable message body.</p>
      <p style="color: #ef4444; font-size: 0.9rem;">
        <strong>Discarded:</strong> High engineering lift and created editing complexity when coaches modified draft copy.
      </p>
    </div>
    <div class="grid-card">
      <h3>V2: Collapsible Toggle</h3>
      <p>A global dropdown toggle (<code>Hide sources ^</code>) seated above the draft container.</p>
      <p style="color: #ef4444; font-size: 0.9rem;">
        <strong>Discarded:</strong> Low discoverability. Placed valuable context behind an extra click that coaches skipped.
      </p>
    </div>
    <div class="grid-card">
      <h3>V3: Interactive Source Pills</h3>
      <p>Distinct metadata pills (<code>Past session notes</code>, <code>Client profile</code>) with paragraph hover highlighting.</p>
      <p style="color: #10b981; font-size: 0.9rem;">
        <strong>Shipped:</strong> High discoverability, zero clutter, and gave coaches immediate confidence in the draft's accuracy.
      </p>
    </div>
  </div>

  <div class="full-width-media">
    <img
      src="/images/strawberry-ai/source-attribution-iterations.png"
      alt="Three Iterations of Source Attribution UI"
      loading="lazy"
    />
  </div>

  <h3>Key Architectural Decisions</h3>
  <div class="grid-2">
    <div class="grid-card">
      <h3>1. Batch Drafts Over Individual Prompts</h3>
      <p>
        Instead of requiring coaches to open each client thread and prompt the AI individually, drafts pre-populate automatically from overdue and upcoming reminders. Coaches can review and clear their entire follow-up queue in minutes.
      </p>
    </div>
    <div class="grid-card">
      <h3>2. Binary Thumbs Up/Down vs. Star Ratings</h3>
      <p>
        Star ratings introduce cognitive friction that slows coaches down. A binary thumbs up/down system provided a lightweight interaction that achieved 85%+ rating completion, delivering clean training signals to our data team.
      </p>
    </div>
    <div class="grid-card">
      <h3>3. Intentionally Omitting a 'Regenerate' Button</h3>
      <p>
        Generative rerolls turn writing into an addictive, time-wasting slot machine. The AI delivers a high-confidence 80% draft, and the interface encourages coaches to make quick personal edits or dismiss, preserving genuine voice.
      </p>
    </div>
    <div class="grid-card">
      <h3>4. Transparent Source Attribution</h3>
      <p>
        Explicitly referencing client milestones (e.g. <em>Session 3 boundary-setting framework</em>) eliminates fear of hallucinations and demonstrates that the AI deeply understands past session notes.
      </p>
    </div>
  </div>

  <h3>Navigating Core Tradeoffs</h3>
  <div class="grid-3">
    <div class="grid-card">
      <h3>Batch Efficiency vs. Personalization</h3>
      <p>
        Automation accelerates outreach, but coaching is deeply personal. Human-in-the-loop review ensures every message is reviewed and sent intentionally.
      </p>
    </div>
    <div class="grid-card">
      <h3>AI Automation vs. Coach Voice</h3>
      <p>
        The AI handles memory recall and baseline structure, while coaches inject empathy, personal rapport, and customized advice.
      </p>
    </div>
    <div class="grid-card">
      <h3>Speed to Ship vs. Ideal Scope</h3>
      <p>
        Ruthlessly prioritized core drafting flows to hit the 8-day delivery window ahead of investor meetings, reserving custom tone sliders for V2.
      </p>
    </div>
  </div>

  <h3>Cross-Functional Sprint Cadence</h3>
  <p>
    Operating as the lone designer, I served as the connective tissue between product, engineering, and data science:
  </p>
  <ul>
    <li><strong>Product Manager:</strong> Defined target coaching behaviors, retention metrics, and investor milestone requirements.</li>
    <li><strong>Engineering:</strong> Co-designed prompt context schemas, token payload sizes, and frontend component states.</li>
    <li><strong>Data Science:</strong> Evaluated LLM output fidelity and established telemetry pipelines for thumbs up/down ratings.</li>
    <li><strong>AI Tooling (Claude & Cursor):</strong> Used Claude and Cursor to draft technical specifications, define edge-case states, and build a working interactive prototype, reducing dev handoff time by 50%.</li>
  </ul>

  <div class="full-width-media">
    <img
      src="/images/strawberry-ai/collaboration-diagram.png"
      alt="Cross-Functional Collaboration Diagram"
      loading="lazy"
    />
  </div>

  <div class="section-divider"></div>
</section>

<!-- 4. WORKFLOW & PROTOTYPE SECTION -->
<section id="prototype" class="cs-section">
  <h4 class="section-label">Workflow & Prototype</h4>
  <h2>The end-to-end coach drafting experience</h2>
  <p>
    The final experience embeds contextual AI generation directly into the coach's daily client management workflow:
  </p>

  <div class="grid-2">
    <div class="grid-card">
      <h3>1. Reminder Trigger</h3>
      <p>
        The coach views their client sidebar and spots an overdue reminder: <em>“Send follow-up on boundary-setting exercise.”</em>
      </p>
    </div>
    <div class="grid-card">
      <h3>2. One-Click Contextual Draft</h3>
      <p>
        Clicking <strong>“Generate Message Draft”</strong> pulls notes from Session 3 and client onboarding profile into a ready-to-send draft.
      </p>
    </div>
    <div class="grid-card">
      <h3>3. Source Verification</h3>
      <p>
        The coach hovers over source pills to verify exactly which past session notes informed the exercise reference.
      </p>
    </div>
    <div class="grid-card">
      <h3>4. Personal Edit & Send</h3>
      <p>
        The coach adds personal touches or confirms upcoming session dates, clicking send in seconds without context switching.
      </p>
    </div>
  </div>

  <div class="full-width-media">
    <img
      src="/images/strawberry-ai/prototype-screen.png"
      alt="Full Coach Chat and AI Message Draft Interface"
      loading="lazy"
    />
  </div>

  <div class="section-divider"></div>
</section>

<!-- 5. IMPACT & LEARNINGS SECTION -->
<section id="impact" class="cs-section">
  <h4 class="section-label">Impact & Learnings</h4>
  <h2>Outcomes, measurement, and designing for human-in-the-loop AI</h2>

  <div class="grid-4">
    <div class="grid-card">
      <h3>92%</h3>
      <p><strong>Follow-Up Rate</strong></p>
      <p>Exceeded the 80% KPI target, climbing from a 60% baseline across 800 coaches.</p>
    </div>
    <div class="grid-card">
      <h3>+15%</h3>
      <p><strong>Client Retention</strong></p>
      <p>Measurable lift in second charge rate driven by consistent coach check-ins.</p>
    </div>
    <div class="grid-card">
      <h3>8 Days</h3>
      <p><strong>Total Delivery</strong></p>
      <p>7 days spec + build, 1 day UAT—shipped 6 days ahead of investor meetings.</p>
    </div>
    <div class="grid-card">
      <h3>$21M</h3>
      <p><strong>Fundraising Round</strong></p>
      <p>Featured as a signature product demo in Strawberry.me’s Series A pitch.</p>
    </div>
  </div>

  <div class="full-width-media">
    <img
      src="/images/strawberry-ai/impact-metrics.png"
      alt="Impact and Post-Launch Measurement Dashboard"
      loading="lazy"
    />
  </div>

  <div class="callout">
    <h3>“This is hands-down the most-used and most-loved feature on the platform. It takes the dread out of admin work and lets me focus on coaching.”</h3>
    <p style="font-size: 0.95rem; opacity: 0.7; margin-top: 0.5rem;">— Qualitative Coach Feedback Post-Launch</p>
  </div>

  <h3>Key Design Principles Learned</h3>
  <div class="grid-3">
    <div class="grid-card">
      <h3>1. Trust > Generation Quality</h3>
      <p>
        Eloquence doesn't matter if users can't verify facts. Transparent source attribution and clear provenance are the foundational building blocks of user trust in AI interfaces.
      </p>
    </div>
    <div class="grid-card">
      <h3>2. Human in the Loop, by Design</h3>
      <p>
        Generative AI should never operate autonomously in human-centric domains. Designing for AI means stripping away administrative friction while keeping editorial authority firmly in human hands.
      </p>
    </div>
    <div class="grid-card">
      <h3>3. What's Next: Tone & Style Control</h3>
      <p>
        The next evolution involves adaptive personalization—allowing the AI model to learn each coach’s distinctive tone, greeting habits, and vocabulary over time.
      </p>
    </div>
</section>
