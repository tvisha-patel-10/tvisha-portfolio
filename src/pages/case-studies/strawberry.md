---
layout: ../../layouts/caseStudyLayout.astro

title: "Strawberry.me"
pageTitle: "Strawberry.me 0→1 Founding Design Case Study — Tvisha Patel"
description: "As Strawberry’s sole founding designer, I tackled 0→1 platform velocity, built the design system from scratch, and shipped 40+ features scaling to $30M+ ARR."
year: "2024–present"
subtitle: "Founding designer at a two-sided coaching marketplace | $30M+ ARR"
heroImage: "/images/strawberry/strawberry_gen_cover.mp4"
heroPoster: "/images/strawberry/growth_experiment_homepage.webp"
role: "Founding Product Designer"
timeline: "June 2024 – Present"
team:
  - "Lean team of 21"
  - "1 Founding Product Designer (me)"
skills:
  - "0→1 Product Strategy"
  - "Design Systems & Token Architecture"
  - "Prototyping in Code (HTML/CSS/TS)"
  - "Two-Sided Marketplace Design"
  - "Conversion Optimization (A/B Testing)"
sections:
  - { id: "overview", label: "Overview" }
  - { id: "operating-model", label: "My Role" }
  - { id: "growth-experiment", label: "Homepage & Conversion" }
  - { id: "platform-systems", label: "Core Features & AI" }
  - { id: "outcomes", label: "Impact & Outcomes" }
  - { id: "reflection", label: "Reflection" }
---

<!-- 1. OVERVIEW SECTION -->
<section id="overview" class="cs-section">
  <h4 class="section-label">Overview</h4>
  <h2>Leading design at a two-sided coaching platform as it grew from 0 to $30M+ ARR</h2>
  <p>
    Strawberry.me is a venture-backed coaching marketplace that connects clients with vetted coaches for career and personal growth.
  </p>
  <p>
    I'm the first and only product designer on a team of 21, so I design both the client and coach experiences from the sign-up flow to the tools coaches use every day.
  </p>

  <div class="callout">
    <h3>The 0→1 Challenge: This startup was growing fast, and I wasn't designing just one feature at a time. I was building the product, the brand, and the design system from scratch, all without slowing engineers down.</h3>
  </div>

  <div class="grid-2">
    <div class="grid-card">
      <h3>The Core Problem</h3>
      <p>
        Early-stage startups often have to pick: move fast and pile up design debt, or move slowly and miss chances to grow. Strawberry.me needed to bring in clients quickly, earn their trust with private coaching data, and make coaches' day-to-day work easier.
      </p>
    </div>
    <div class="grid-card">
      <h3>My Approach</h3>
      <p>
        I didn't want to slow the team down, so I took on more than design. I built a design system with tokens from day one, addressed big problem spots from sign-up to retention, and wrote HTML, CSS, and TypeScript myself so engineers could ship features faster.
      </p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 2. FOUNDING DESIGNER OPERATING MODEL -->
<section id="operating-model" class="cs-section">
  <h4 class="section-label">My Role</h4>
  <h2>Moving fast at a startup: owning product, systems, and code</h2>
  <p>
    With only one designer, I couldn’t be the thing slowing the team down. Here's how I work to move fast without cutting corners:
  </p>

  <div class="grid-3">
    <div class="grid-card">
      <h3>Design System From Scratch</h3>
      <p>
        Built a cohesive Figma library and token architecture (colors, typography, spacing, elevation) from scratch. Setting up patterns early let engineers build complex screens 2x faster, because they didn’t have to wait on a mockup for every edge case.
      </p>
    </div>
    <div class="grid-card">
      <h3>Prototyping and Code</h3>
      <p>
        I made handoffs smoother by writing production-ready HTML, CSS, and TypeScript myself when developers were stretched thin.
      </p>
    </div>
    <div class="grid-card">
      <h3>Making Design Calls on My Own</h3>
      <p>
        I worked directly with founders and data scientists to shape the product roadmap, and made design calls on my own, knowing when to ship a quick MVP and when to invest in polish.
      </p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 3. HOMEPAGE & CONVERSION EXPERIMENT -->
<section id="growth-experiment" class="cs-section">
  <h4 class="section-label">Homepage & Conversion</h4>
  <h2>Moving from generic pitches to a homepage that matches what visitors want</h2>
  <p>
    We were losing potential clients at the front door. Lots of people left our homepage right away, and we weren’t getting a clear sense of what they came for.
  </p>

  <div class="grid-2">
    <div class="grid-card">
      <h3>The Problem With V1</h3>
      <p>
        V1 was built on the idea that less is more. But visitors didn’t understand right away what problems coaching could solve or where to start.
      </p>
      <p style="color: #ef4444; font-weight: 500;">
        Friction: Users not understanding the product or service when landing on the page.
      </p>
    </div>
    <div class="grid-card">
      <h3>The Idea for V2</h3>
      <p>
        If we gave clients more information and explained the process and who the coaches are, they’d understand coaching better and feel more confident starting.
      </p>
      <p style="color: #10b981; font-weight: 500;">
        Outcome: Direct clarity, lower barrier to starting assessment.
      </p>
    </div>
  </div>

  <div class="grid-2 comparison-grid">
    <div class="impact-holder size-b theme-strawberry">
      <p class="impact-label">Homepage V1: Vague pitch with passive imagery</p>
      <div class="impact-canvas">
        <img
          src="/images/strawberry/matching_intake_flow.webp"
          alt="Strawberry.me Homepage V1"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-strawberry">
      <p class="impact-label">Homepage V2: Social proof, stronger branding, and a clear CTA</p>
      <div class="impact-canvas expandable-canvas" id="strawberry-v2-canvas">
        <img
          src="/images/strawberry/strawberry_homepagev2.webp"
          alt="Strawberry.me Homepage V2"
        />
      </div>
      <button
        type="button"
        class="expand-btn"
        aria-expanded="false"
        aria-controls="strawberry-v2-canvas"
      >
        <span class="expand-btn-text">See full page</span>
        <svg class="expand-btn-icon" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3.5 6 8 10.5 12.5 6"></polyline></svg>
      </button>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 4. CORE WORKFLOWS & AI SYSTEMS -->
<section id="platform-systems" class="cs-section">
  <h4 class="section-label">Core Features & AI</h4>
  <h2>Designing for both clients and coaches</h2>
  <p>
    Managing a dual-sided marketplace means balancing two contrasting user types: clients who want things simple, and coaches who need a lot of information on screen.
  </p>

  <h3>1. Building Trust in AI During Onboarding</h3>
  <p>
    Strawberry.me uses AI to make coaching more personal. But coaching can get sensitive, and clients worried their private details would be collected or sold. So I designed onboarding and consent steps that explain upfront how we anonymize and combine data and protect their privacy. More people finished onboarding as a result.
  </p>
  <div class="impact-holder size-a theme-strawberry">
    <p class="impact-label">Client onboarding: Clear AI consent steps that built trust</p>
    <div class="impact-canvas">
      <img
        src="/images/strawberry/booking_checkout_flow.webp"
        alt="Client onboarding screens with AI consent steps"
      />
    </div>
  </div>

  <h3>2. Coach Dashboard & Smart Reminders</h3>
  <p>
    For coaches managing dozens of active clients, I redesigned the client detail page: consolidating timelines, action items, session history, and automated reminder cues into a single view.
  </p>
  <div class="impact-holder size-a theme-strawberry">
    <p class="impact-label">Coach dashboard: Timelines, history, and reminders in one place</p>
    <div class="impact-canvas">
      <img
        src="/images/strawberry/growth_experiment_homepage.webp"
        alt="Coach-Side Client Details Screen"
      />
    </div>
  </div>

  <div class="callout">
    <h3>Want the full story on the AI messaging workflow?
    <a href="/case-studies/strawberry-ai" class="external-link">Read the case study<svg class="external-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10" /></svg></a></h3>
  </div>

  <h3>3. Goals Board (for Tracking Milestones)</h3>
  <p>
    To turn coaching into a tangible, ongoing habit, I designed a drag-and-drop Kanban Goals Board. Clients and coaches break down broad life goals (e.g., <em>“Improve Sleep Schedule”</em>) into small weekly action items, giving people a reason to stay in coaching.
  </p>
  <div class="impact-holder size-a theme-strawberry">
    <p class="impact-label">Goals board: A shared drag-and-drop board</p>
    <div class="impact-canvas">
      <img
        src="/images/strawberry/goals_kanban_board.webp"
        alt="Interactive Goals Board Kanban Layout"
      />
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 5. OUTCOMES & VELOCITY -->
<section id="outcomes" class="cs-section">
  <h4 class="section-label">Impact & Outcomes</h4>
  <h2>How it grew and how people used it</h2>

  <div class="grid-3">
    <div class="stat-card">
      <p class="stat-card-value">1,000+</p>
      <p class="stat-card-label">Active Coaches</p>
      <p class="stat-card-subtext">Tools for workflows, scheduling, and managing clients.</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">169K+</p>
      <p class="stat-card-label">Clients Matched</p>
      <p class="stat-card-subtext">Improved intake, matching, and onboarding that pair clients with the right coach.</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">$30M+</p>
      <p class="stat-card-label">Platform ARR</p>
      <p class="stat-card-subtext">Design work on onboarding, paywalls, and retention that helped the marketplace grow.</p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 6. REFLECTION SECTION -->
<section id="reflection" class="cs-section">
  <h4 class="section-label">Reflection</h4>
  <h2>Being the only designer, and what fast growth taught me</h2>

  <div class="reflection-grid grid-2">
    <div class="reflection-item">
      <span class="reflection-num">01</span>
      <h3>Design Moves the Business</h3>
      <p>
        I worked closely with engineers and ran A/B tests, and some of our changes brought in +$120K in revenue. That taught me good design is about business results as much as how things look.
      </p>
    </div>
    <div class="reflection-item">
      <span class="reflection-num">02</span>
      <h3>Building Systems That Grow With You</h3>
      <p>
        I learned how to set up tokens, patterns, and components without slowing delivery. Doing it early is a big reason our small team shipped so many features without piling up design debt.
      </p>
    </div>
  </div>
</section>
