---
layout: ../../layouts/caseStudyLayout.astro

title: "Strawberry.me"
pageTitle: "Strawberry.me AI Message Drafts Case Study — Tvisha Patel"
description: "Designing an AI draft messaging workflow for 800+ coaches that increased follow-up rates from 60% to 92%."
year: "2025"
subtitle: "AI message draft workflow for coaches | 60% → 92% follow-up rate"
heroImage: "/images/strawberry-ai/strawberry_ai_cover.mp4"
role: "Founding Product Designer"
timeline: "8-Day Sprint (7 Days Spec + Build, 1 Day UAT)"
team:
  - "1 Product Designer (me)"
  - "1 Product Manager"
  - "1 Engineer"
  - "Data / AI Team"
skills:
  - "AI Workflow Design"
  - "Human-in-the-Loop AI"
  - "Rapid Prototyping (Cursor & Claude)"
  - "Product Strategy & Hypothesis Testing"
sections:
  - { id: "overview", label: "Overview" }
  - { id: "problem", label: "Finding the Problem" }
  - { id: "discovery", label: "Research & Pivot" }
  - { id: "design-process", label: "Decisions & Tradeoffs" }
  - { id: "prototype", label: "Workflow & Prototype" }
  - { id: "impact", label: "Impact & Learnings" }
passwordProtected: true
---

<!-- 1. OVERVIEW SECTION -->
<section id="overview" class="cs-section">
  <h4 class="section-label">Overview</h4>
  <h2>Turning overdue reminders into ready-to-send AI drafts</h2>
  <p>
    Strawberry.me is a high-growth coaching marketplace connecting clients with vetted coaches for career and personal coaching ($30M+ ARR).
  </p>
  <p>
    As the founding product designer, I was handed an open-ended brief from leadership: <strong>“Embed AI into the coaching workflow. Figure out where.”</strong> With investor meetings 14 days away and no existing feature to redesign, I chose the problem, led the research, and designed and prototyped the solution in an 8-day sprint (7 days spec + build, 1 day UAT).
  </p>

  <div class="callout">
    <h3>Impact: Increased coach follow-up rates from 60% to 92% across 800 coaches and drove a +15% lift in client retention (2nd charge rate). The feature was later featured in Strawberry.me’s $21M funding round.</h3>
  </div>

  <div class="grid-3">
    <div class="grid-card">
      <h3>60% → 92%</h3>
      <p><strong>Coach Follow-Up Rate</strong></p>
      <p>Share of coaches consistently following up each week, measured across all 800 coaches over 4 weeks post-launch.</p>
    </div>
    <div class="grid-card">
      <h3>+15%</h3>
      <p><strong>Client Retention Lift</strong></p>
      <p>Relative lift in 2nd subscription charge rate.</p>
    </div>
    <div class="grid-card">
      <h3>8 Days</h3>
      <p><strong>Brief to Launch</strong></p>
      <p>7 days spec + build, 1 day UAT. Shipped 6 days ahead of investor meetings.</p>
    </div>
  </div>

  <div class="impact-holder size-a theme-strawberry-ai">
    <p class="impact-label">1-click AI drafts embedded in coach workflows</p>
    <div class="impact-canvas">
      <video autoplay loop muted playsinline>
        <source
          src="/images/strawberry-ai/generation_prototype.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 2. FINDING THE PROBLEM -->
<section id="problem" class="cs-section">
  <h4 class="section-label">Finding the Problem</h4>
  <h2>Connecting coach calls to platform retention data</h2>
  <p>
    The brief from leadership was completely open-ended: <em>“Embed AI into the coaching workflow. Figure out where.”</em> Rather than jumping straight into brainstorming AI features, I anchored the search in what I was already hearing from our users.
  </p>
  <p>
    In my regular weekly calls with platform coaches, a recurring frustration kept coming up: the overload of repetitive work between calls. Coaches loved coaching, but struggled taking the time to dig through past session notes, completed exercises, and drafting routine check-ins.
  </p>

  <div class="callout">
    <h3>“I’m mostly sending repetitive stuff like follow-ups, check-ins, and summaries. It’s super time consuming and honestly annoying to gather my notes and the context from past sessions for each client.”</h3>
    <p style="font-size: 0.95rem; opacity: 0.7; margin-top: 0.5rem;">— Strawberry.me Coach Interview</p>
  </div>

  <p>
    To see if this qualitative friction could have a business impact, I looked at our platform metrics. The data revealed an affirming pattern: <strong>top-performing coaches with the highest client retention were consistently sending weekly follow-ups</strong>. However, across all 800 coaches, only ~60% were following up consistently.
  </p>

  <div class="grid-2">
    <div class="grid-card">
      <h3>Qualitative Signal (Coach Calls)</h3>
      <p>
        Coaches repeatedly voiced fatigue over repetitive follow-up tasks that required effort to re-read past notes and create tailored check-ins for many active clients.
      </p>
    </div>
    <div class="grid-card">
      <h3>Quantitative Validation (Platform Data)</h3>
      <p>
        Data I queried for with Claude code proved consistent follow-ups directly correlated with client retention (2nd subscription charges), yet ~40% of follow-ups were missed due to admin overload.
      </p>
    </div>
  </div>

  <p>
    I paired the interview findings with the retention data and brought the case directly to leadership. We immediately aligned on follow-up drafts as the focus for our 8-day sprint.
  </p>

  <div class="section-divider"></div>
</section>

<!-- 3. RESEARCH & PIVOT -->
<section id="discovery" class="cs-section">
  <h4 class="section-label">Research & Pivot</h4>
  <h2>Pivoting from a ‘writing tool’ to a ‘reminder workflow’</h2>

  <div class="grid-2">
    <div class="grid-card">
      <h3>Original Hypothesis</h3>
      <p>
        The initial assumption was that coaches needed a standalone AI messaging assistant where coaches type custom prompts to compose messages from scratch.
      </p>
      <p style="color: #ef4444; font-weight: 500;">
        Reality: Coaches were overwhelmed by open reminders piling up in their sidebar.
      </p>
    </div>
    <div class="grid-card">
      <h3>The Pivot</h3>
      <p>
        Building on feedback from my weekly coach calls, I pushed to drop the prompt-based assistant. Coaches didn’t need another blank box to fill. They needed the reminders they already had to turn into ready-to-send, context-aware drafts.
      </p>
      <p style="color: #10b981; font-weight: 500;">
        Solution: Surface AI drafts directly inside the reminder workflow.
      </p>
    </div>
  </div>

  <div class="callout">
    <h3>Core Hypothesis: If surfacing AI drafts directly inside the reminder workflow reduces the friction of following up, then coaches will follow up more consistently, improving client retention as a result.</h3>
  </div>

  <h3>What I Took (and Didn’t Take) From Existing AI Tools</h3>
  <p>
    I studied four products to see how they handle synthesis and user confidence, then made a call on each pattern:
  </p>

  <div class="impact-holder size-a theme-strawberry-ai">
    <p class="impact-label">Audit: Why standard rerolls and opaque AI generation failed coach trust</p>
    <div class="impact-canvas">
      <img
        src="/images/strawberry-ai/competitive_audit.webp"
        alt="Competitive Analysis of AI Generation and Source Attribution Patterns"
      />
    </div>
  </div>

  <div class="grid-2">
    <div class="grid-card">
      <h3>Borrowed: Source Citations</h3>
      <p>
        Google AI Overview and Claude show where facts come from. This became our source pills, since coaches wouldn’t send a message they couldn’t verify where the info is pulled from.
      </p>
    </div>
    <div class="grid-card">
      <h3>Borrowed: Binary Feedback</h3>
      <p>
        Intercom Fin’s thumbs up/down gets high response rates with almost no effort. We adopted it to give the data team a clean training signal. This is also an industry standard feedback format with AI now.
      </p>
    </div>
    <div class="grid-card">
      <h3>Rejected: The Blank Prompt Box</h3>
      <p>
        Notion AI’s open prompt is flexible, but it puts the work back on the user. It was exactly the pattern our pivot moved away from.
      </p>
    </div>
    <div class="grid-card">
      <h3>Rejected: Regenerate Loops</h3>
      <p>
        One-click rerolls are standard across these tools. For coaches clearing a queue, this could turn a 30-second task into a slot machine with them rolling for the perfect one, taking out the human voice from the loop.
      </p>
    </div>
  </div>

  <h3>Target Success Metrics (KPIs)</h3>
  <div class="grid-4">
    <div class="grid-card">
      <h3>Follow-Up Rate</h3>
      <p>Raise coach follow-up consistency from a 60% baseline to 80% across 800 coaches.</p>
    </div>
    <div class="grid-card">
      <h3>Client Retention</h3>
      <p>Increase second+ subscription charge rate.</p>
    </div>
    <div class="grid-card">
      <h3>Coach Authenticity</h3>
      <p>Preserve the coach’s voice and keep the human in the loop. Measured by draft edit rate and thumbs-down feedback.</p>
    </div>
    <div class="grid-card">
      <h3>Speed to Market</h3>
      <p>Design, build, and test within the 14-day window before investor meetings.</p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 4. DECISIONS & TRADEOFFS -->
<section id="design-process" class="cs-section">
  <h4 class="section-label">Decisions & Tradeoffs</h4>
  <h2>Iterating on source transparency and making the hard calls</h2>

  <h3>The Evolution of Source Attribution</h3>
  <p>
    Coaches hesitated to send AI-generated text without knowing where the information came from. I tested three approaches in prototype walkthroughs with 5 coaches:
  </p>

  <div class="grid-3">
    <div>
      <div class="impact-holder size-b theme-strawberry-ai" style="margin-bottom: 1rem;">
        <p class="impact-label">V1: Numbered footnote badges (broke on editing)</p>
        <div class="impact-canvas">
          <img
            src="/images/strawberry-ai/source_attribution_v1.webp"
            alt="V1: Inline Badges"
          />
        </div>
      </div>
      <h3>V1: Inline Badges</h3>
      <p>Numbered footnote badges placed directly inside the editable message body.</p>
      <p style="color: #ef4444; font-size: 0.9rem;">
        <strong>Discarded:</strong> Engineering flagged a high lift, and badges move around and break when coaches edit the draft text.
      </p>
    </div>
    <div>
      <div class="impact-holder size-b theme-strawberry-ai" style="margin-bottom: 1rem;">
        <p class="impact-label">V2: Collapsible toggle (skipped by coaches)</p>
        <div class="impact-canvas">
          <img
            src="/images/strawberry-ai/source_attribution_v2.webp"
            alt="V2: Collapsible Toggle"
          />
        </div>
      </div>
      <h3>V2: Collapsible Toggle</h3>
      <p>A dropdown toggle above the draft container.</p>
      <p style="color: #ef4444; font-size: 0.9rem;">
        <strong>Discarded:</strong> Coaches in walkthroughs skipped the extra click, so the context never got seen.
      </p>
    </div>
    <div>
      <div class="impact-holder size-b theme-strawberry-ai" style="margin-bottom: 1rem;">
        <p class="impact-label">V3: Interactive source pills with hover context</p>
        <div class="impact-canvas">
          <img
            src="/images/strawberry-ai/source_attribution_v3.webp"
            alt="V3: Interactive Source Pills"
          />
        </div>
      </div>
      <h3>V3: Interactive Source Pills</h3>
      <p>Distinct metadata pills with paragraph hover highlighting.</p>
      <p style="color: #10b981; font-size: 0.9rem;">
        <strong>Shipped:</strong> Always visible, no clutter inside the editable text, and less effort to build.
      </p>
    </div>
  </div>

  <h3>Key Decisions I Made</h3>
  <div class="grid-2">
    <div class="grid-card">
      <h3>1. Drafts Work With Reminders</h3>
      <p>
        Every overdue or upcoming reminder gets a one-click draft. Theres no extra work to write a prompt or feed an AI info, the system understands what info is needed to complete the reminder and pulls it for the coach.
      </p>
    </div>
    <div class="grid-card">
      <h3>2. Binary Thumbs Up/Down Over Star Ratings</h3>
      <p>
        Star ratings slow coaches down. A binary thumbs up/down achieved 75%+ rating completion, giving our data team clean training signals.
      </p>
    </div>
    <div class="grid-card">
      <h3>3. Intentionally Omitting a ‘Regenerate’ Button</h3>
      <p>
        The AI delivers a strong draft, and the interface pushes coaches to make quick personal edits or dismiss it. This keeps their voice in every message to keep that authenticity and keeps the queue moving.
      </p>
    </div>
    <div class="grid-card">
      <h3>4. Transparent Source Attribution</h3>
      <p>
        Explicitly referencing client information lets coaches catch hallucinations before sending, and builds trust with what the AI brings in.
      </p>
    </div>
  </div>

  <h3>What We Gave Up</h3>
  <div class="grid-3">
    <div class="grid-card">
      <h3>No Regenerate</h3>
      <p><strong>Gave up:</strong> Letting coaches reroll a weak draft.</p>
      <p><strong>Why:</strong> Rerolling encourages fishing for a perfect message instead of adding a personal touch.</p>
      <p><strong>Risk accepted:</strong> A bad draft gets dismissed and written by hand. We tracked dismiss rate to watch for this.</p>
    </div>
    <div class="grid-card">
      <h3>No Auto-Send</h3>
      <p><strong>Gave up:</strong> Fully automated follow-ups, which would have been the fastest path to 100%.</p>
      <p><strong>Why:</strong> Coaching is personal. Every message is reviewed and sent intentionally by the coach.</p>
      <p><strong>Risk accepted:</strong> Busy coaches could still let reminders slip.</p>
    </div>
    <div class="grid-card">
      <h3>No Tone Controls (Yet)</h3>
      <p><strong>Gave up:</strong> Custom tone sliders and per-coach style settings.</p>
      <p><strong>Why:</strong> This was not seen as needed for V1 of this feature, the core drafting had to work first.</p>
      <p><strong>Revisit:</strong> Moved to V2 as adaptive personalization.</p>
    </div>
  </div>

  <h3>Designing for When the AI Is Wrong</h3>
  <div class="grid-2">
    <div class="grid-card">
      <h3>Thin or Missing Context</h3>
      <p>
        For new clients with no session notes, the draft falls back to a short, generic check-in that they coach can edit manually, instead of hallucinating details.
      </p>
    </div>
    <div class="grid-card">
      <h3>Sensitive Session Data</h3>
      <p>
        Drafts only pull from information the client consented to having recorded, and nothing is sent without the coach reviewing it.
      </p>
    </div>
  </div>

  <h3>Cross-Functional Collaboration</h3>
  <p>
    As the only designer, I owned the experience end to end and coordinated product, engineering, and data science:
  </p>
  <ul>
    <li><strong>Product Manager:</strong> I partnered with the PM on target coaching behaviors and retention metrics, and kept scope aligned with the investor deadline.</li>
    <li><strong>Engineering:</strong> I learned about prompt context schemas, token usage limits, and frontend component states with the engineers.</li>
    <li><strong>Data Science:</strong> I worked with the team to evaluate LLM output quality and define the feedback loop for thumbs up/down ratings.</li>
    <li><strong>AI Tooling (Claude & Cursor):</strong> I used Claude and Cursor to draft technical specs, define edge-case states, and build a working interactive prototype, cutting dev handoff time.</li>
  </ul>

  <div class="impact-holder size-a theme-strawberry-ai">
    <p class="impact-label">Systems alignment: Product KPIs, prompt schemas, and feedback loops</p>
    <div class="impact-canvas">
      <img
        src="/images/strawberry-ai/system_alignment_diagram.webp"
        alt="Cross-Functional Collaboration Diagram"
      />
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 5. WORKFLOW & PROTOTYPE SECTION -->
<section id="prototype" class="cs-section">
  <h4 class="section-label">Workflow & Prototype</h4>
  <h2>The end-to-end coach drafting experience</h2>
  <p>
    The final experience embeds contextual AI generation directly into the coach’s daily client management workflow:
  </p>

  <div class="impact-holder size-a theme-strawberry-ai">
    <div class="impact-canvas">
      <video autoplay loop muted playsinline>
        <source
          src="/images/strawberry-ai/generation_prototype.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>

  <p>
    <a
      href="https://www.figma.com/make/Mu4VVa1zfIwMj7YDtZQNyv/Prototype-message-draft-flow?fullscreen=1&t=gda4FhTBfRQrYa5a-1"
      target="_blank"
      rel="noopener noreferrer"
      class="external-link"
    >Open Prototype in Figma full screen<svg class="external-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10" /></svg></a>
  </p>

  <div class="section-divider"></div>
</section>

<!-- 6. IMPACT & LEARNINGS SECTION -->
<section id="impact" class="cs-section">
  <h4 class="section-label">Impact & Learnings</h4>
  <h2>Outcomes and learnings</h2>
  <p>
    Measured over an A/B test in the 4 weeks post-launch across 800+ active coaches:
  </p>

  <div class="grid-3">
    <div class="stat-card">
      <p class="stat-card-value">92%</p>
      <p class="stat-card-label">Coach Follow-Up Rate</p>
      <p class="stat-card-subtext">Climbed from 60% baseline (beating 80% target)</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">+15%</p>
      <p class="stat-card-label">Client Retention</p>
      <p class="stat-card-subtext">Relative increase in 2nd-charge membership renewals</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">$21M</p>
      <p class="stat-card-label">Funding Demo</p>
      <p class="stat-card-subtext">Featured product demo in Strawberry.me's Series A round</p>
    </div>
  </div>
  
  <div class="callout">
    <h3>“This is hands-down my most-used and most-loved feature on the platform. It takes the dread out of admin work and lets me focus on coaching.”</h3>
    <p style="font-size: 0.95rem; opacity: 0.7; margin-top: 0.5rem;">— Career coach, 2+ years on Strawberry.me</p>
  </div>

  <h3>Key Design Principles Learned</h3>
  <div class="grid-3">
    <div class="grid-card">
      <h3>1. Trust > Generation Quality</h3>
      <p>
        Faster workflows don't matter if users can’t verify or trust what was generated. Transparent source attribution and clear provenance are the foundation of user trust in AI interfaces.
      </p>
    </div>
    <div class="grid-card">
      <h3>2. Human in the Loop, by Design</h3>
      <p>
        Generative AI shouldn’t operate autonomously in human-centric products. Designing for AI means stripping away administrative friction while keeping editorial authority firmly in human hands.
      </p>
    </div>
    <div class="grid-card">
      <h3>3. What’s Next: Tone & Style Control</h3>
      <p>
        The next evolution is adaptive personalization: letting the AI learn each coach’s distinctive tone, greeting habits, and vocabulary over time.
      </p>
    </div>
  </div>
</section>
