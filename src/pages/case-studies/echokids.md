---
layout: ../../layouts/caseStudyLayout.astro

title: "EchoKids"
pageTitle: "EchoKids Case Study — Tvisha Patel"
description: "I redesigned EchoKids' mentor dashboard and brand system, increasing weekly returning mentors by 200%."
year: "2022"
subtitle: "How I increased retention by 200% and created a 47% more effective dashboard"
heroImage: "/images/echokids/echokids_cover.mp4"
heroPoster: "/images/echokids/echokids_cover_poster.webp"
role: "Product Design Intern"
timeline: "June – August 2022"
team:
  - "1 CEO / Founder"
  - "1 Product Design Intern (me)"
skills:
  - "UX Research & Usability Testing"
  - "Interaction & Product Strategy"
  - "Heuristic Evaluation"
  - "Brand & Design Systems"
sections:
  - { id: "overview", label: "Overview" }
  - { id: "discovery", label: "Discovery & Research" }
  - { id: "constraints", label: "Constraints & Decisions" }
  - { id: "structure", label: "Before & After" }
  - { id: "iterations", label: "Design Iterations" }
  - { id: "final", label: "Final UI & Brand" }
  - { id: "impact", label: "Impact & Outcomes" }
  - { id: "reflection", label: "Reflection" }
---

<!-- 1. OVERVIEW SECTION -->
<section id="overview" class="cs-section">
  <h4 class="section-label">Overview</h4>
  <h2>Redesigning the mentor dashboard to drive retention and streamline user flow</h2>
  <p>
    EchoKids is a NYC-based music education company that connects musicians as mentors with children aged 0–18 for private and group lessons.
  </p>
  <p>
    As the <strong>only designer on this project</strong>, I reported directly to the CEO, co-defined the success metrics with her, and owned the mentor dashboard redesign end to end. I also proposed extending the project into a refreshed design system so the web app and marketing site finally matched. The redesign was implemented across EchoKids’ mobile and desktop platforms.
  </p>

  <div class="callout">
    <h3>Impact: Weekly returning mentors grew from 15 to 45 in the 6 weeks after launch (+200%), and the time to find a tool on the dashboard dropped by 47%.</h3>
  </div>

  <div class="grid-2">
    <div class="grid-card">
      <h3>The Challenge</h3>
      <p>
        Mentors weren’t finding or using the tools EchoKids built for them. The menu was hidden, the dashboard had no clear hierarchy, and inconsistent buttons and colors made it hard to tell what was clickable.
      </p>
      <p>
        <strong>How might we improve the user flow, organization, and visuals of the dashboard so mentors are aware of and actually want to use the tools EchoKids provides?</strong>
      </p>
    </div>
    <div class="grid-card">
      <h3>My Approach</h3>
      <p>
        I started with a heuristic evaluation, aligned with the CEO on goals and constraints, and interviewed mentors to find what they used most and what frustrated them.
      </p>
      <p>
        From there, I iterated through three layouts, kept the parts mentors already valued, and built a design system and component foundation the developers could reuse across the product.
      </p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 2. DISCOVERY & RESEARCH SECTION -->
<section id="discovery" class="cs-section">
  <h4 class="section-label">Discovery & Research</h4>
  <h2>Gaining understanding through heuristics, stakeholders, and mentors</h2>

  <h3>Heuristic Evaluation</h3>
  <p>
    My first step was a heuristic evaluation of the existing web app using 6 of Nielsen’s heuristics, which I presented to the team. The biggest issues: no visibility of system status (unclear if changes saved), no easy way to exit pop-ups, and inconsistent buttons and terminology across pages.
  </p>
  <p>
    <a
      href="https://docs.google.com/presentation/d/1UfDD2b-VZKHimDe5TZtJXrvmlPWaPgiCuzwc19EN9l8/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      class="external-link"
    >View Heuristic Evaluation Slide Deck<svg class="external-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10" /></svg></a>
  </p>

  <h3>Aligning With the CEO</h3>
  <p>
    I met with Shizuno Furuya, CEO and founder of EchoKids, to align on her vision, define KPIs, and understand constraints. Three things came out of it:
  </p>
  <div class="grid-3">
    <div class="grid-card">
      <h3>Goal</h3>
      <p>Get mentors returning to the dashboard every week, not just when a lesson is scheduled.</p>
    </div>
    <div class="grid-card">
      <h3>Component Constraints</h3>
      <p>An example is the calendar was a third-party plugin that couldn’t be modified. The redesign had to work around it.</p>
    </div>
    <div class="grid-card">
      <h3>Brand Need</h3>
      <p>EchoKids needed a distinct, consistent identity across the web app and marketing site to stand out from competitors and establish its brand.</p>
    </div>
  </div>

  <h3>Key Performance Indicators (KPIs)</h3>
  <div class="grid-3">
    <div class="grid-card">
      <h3>User Retention</h3>
      <p>The primary metric was to increase the number of mentors returning to the dashboard each week.</p>
    </div>
    <div class="grid-card">
      <h3>Pages Explored</h3>
      <p>Increase how often mentors navigate from the dashboard to secondary tools like earnings, roster, and files.</p>
    </div>
    <div class="grid-card">
      <h3>Time to Find a Tool</h3>
      <p>Reduce the time it takes a mentor to reach the tool they came for, so less time is spent hunting and more time preparing for lessons.</p>
    </div>
  </div>

  <h3>Mentor Interviews</h3>
  <p>
    I interviewed 8 mentors across two cohorts: first-time mentors navigating EchoKids for the first time, and seasoned mentors with ongoing students. I captured both what frustrated them and what they didn’t want to lose.
  </p>
  <div class="impact-holder size-a theme-echokids">
    <p class="impact-label">User research: Hidden menus and unclear feedback confused mentors</p>
    <div class="impact-canvas">
      <img
        src="/images/echokids/mentor_interviews_affinity_map.webp"
        alt="Mentor interview notes: pain points and good points"
      />
    </div>
  </div>

  <h3>What I Learned</h3>
  <div class="grid-2">
    <div class="grid-card">
      <h3>Pain Points to Fix</h3>
      <ul>
        <li><strong>Hidden menu:</strong> mentors struggled to find navigation at all.</li>
        <li><strong>No structure:</strong> “Organization and overall formatting of dashboard is confusing and blends together.”</li>
        <li><strong>No exit:</strong> “I can’t confirm or exit out of a pop-up if I change my mind.”</li>
        <li><strong>No feedback:</strong> “I’m not sure when something completely loads and saves or not.”</li>
        <li><strong>Unclear icons</strong> and inconsistent button wording.</li>
      </ul>
    </div>
    <div class="grid-card">
      <h3>Things to Keep</h3>
      <ul>
        <li><strong>The calendar:</strong> “A very nice feature to easily keep track of all my lessons with my students.”</li>
        <li><strong>Next lesson details</strong> at the top of the page.</li>
        <li><strong>The greeting</strong> and the ability to message parents and write notes from the dashboard.</li>
      </ul>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 3. CONSTRAINTS & DECISIONS -->
<section id="constraints" class="cs-section">
  <h4 class="section-label">Constraints & Decisions</h4>
  <h2>Deciding what to change, and what to leave alone</h2>

  <div class="grid-3">
    <div class="grid-card">
      <h3>The Calendar Stayed</h3>
      <p>
        The calendar was a locked third-party plugin, and mentors called it the most useful part of the dashboard. Instead of fighting it, I designed the new layout around it and used the space beside it for a dedicated Action Items panel.
      </p>
    </div>
    <div class="grid-card">
      <h3>Discoverability Over Screen Space</h3>
      <p>
        A new persistent sidebar would cost horizontal space, but mentors couldn’t find the old hidden menu at all. I chose discoverability, and recovered the lost space by moving important sections to the dashboard inself to be more accessbile.
      </p>
    </div>
    <div class="grid-card">
      <h3>New Design System With the Redesign</h3>
      <p>
        A brand refresh wasn’t part of the original scope but I pitched doing it together with the dashboard so the developers would only have to rebuild the UI once, with modern and consistent colors, type, and components.
      </p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 4. BEFORE & AFTER -->
<section id="structure" class="cs-section">
  <h4 class="section-label">Before & After</h4>
  <h2>Transforming navigation and introducing modular compartments</h2>

  <div class="impact-holder size-a theme-echokids">
    <p class="impact-label">Shift: Hidden navigation → Persistent sidebar with modular cards</p>
    <div class="impact-split">
      <div class="impact-slot">
        <span class="slot-badge">Before</span>
        <div class="impact-canvas">
          <img
            src="/images/echokids/legacy_dashboard_view.webp"
            alt="Legacy EchoKids mentor dashboard with hidden navigation"
          />
        </div>
      </div>
      <div class="impact-slot">
        <span class="slot-badge">After</span>
        <div class="impact-canvas">
          <img
            src="/images/echokids/redesigned_dashboard_final.webp"
            alt="After: Redesigned EchoKids mentor dashboard with persistent sidebar and modular cards"
          />
        </div>   
      </div>
    </div>
  </div>

  <div class="grid-3">
    <div class="grid-card">
      <h3>Static Sidebar Navigation</h3>
      <p>
        Replaced the hidden hamburger menu with a persistent sidebar that puts the most-used destinations front and center.
      </p>
    </div>
    <div class="grid-card">
      <h3>Structural Compartments</h3>
      <p>
        Split the page into distinct, headed sections (Upcoming Lesson, Calendar, Action Items, Earning Breakdown) so mentors can scan for what they need instead of having to read everything.
      </p>
    </div>
    <div class="grid-card">
      <h3>Disciplined Color</h3>
      <p>
        Restricted the palette so color signals meaning: orange for the active navigation tab, dark blue for CTAs, white section cards on a light blue background.
      </p>
    </div>
  </div>

  <h3>Closer Look at the Upcoming Lesson Card</h3>
  <div class="impact-holder size-a theme-echokids">
    <p class="impact-label">Component zoom: Added explicit headers and instant save feedback</p>
    <div class="impact-split">
      <div class="impact-slot">
        <span class="slot-badge">Before</span>
        <div class="impact-canvas">
          <img
            src="/images/echokids/lesson_card_before.webp"
            alt="Before: Legacy upcoming lesson card without clear headings or feedback"
          />
        </div> 
      </div>
      <div class="impact-slot">
        <span class="slot-badge">After</span>
        <div class="impact-canvas">
          <img
            src="/images/echokids/lesson_card_after.webp"
            alt="After: Redesigned lesson card with clear headers, save status, and organized actions"
          />
        </div> 
      </div>
    </div>
  </div>

  <div class="grid-3">
    <div class="grid-card">
      <h3>Adding Headers</h3>
      <p>
        Mentors struggled to see where each section started and ended. Explicit headings mark clear zones and make the dashboard far more scannable.
      </p>
    </div>
    <div class="grid-card">
      <h3>Information Order</h3>
      <p>
        Student name and lesson date moved to the top center for quick scanning. I added a “Quick View Previous Lesson” button that mentors asked for in interviews, so they can review past notes without leaving the page.
      </p>
    </div>
    <div class="grid-card">
      <h3>Clear Interaction Feedback</h3>
      <p>
        Notes fields now show a “Saved” confirmation, and every pop-up has a visible Cancel and close button, addressing the two feedback issues mentors raised.
      </p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 5. DESIGN ITERATIONS -->
<section id="iterations" class="cs-section">
  <h4 class="section-label">Design Iterations</h4>
  <h2>Iterating through dashboard layouts (V1 to V3)</h2>

  <h3>Version 1</h3>
  <p>
    <strong>Tried:</strong> Grouped lesson data into cards and kept a top navigation bar.
    <strong>Learned:</strong> Navigation was accessible and there was room for quick links, but without icons the layout read more like a marketing homepage than a tool.
  </p>
  <div class="grid-2">
    <div class="impact-holder size-b theme-echokids">
      <p class="impact-label">V1 layout: Top navigation without icons read like a landing page</p>
      <div class="impact-canvas">
        <img
          src="/images/echokids/heuristic_wireframe_audit.webp"
          alt="Iteration V1 Screen"
        />
      </div>
    </div>
    <ul class="eval-list">
      <li class="eval-item">
        <span class="eval-icon eval-con" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
        <span>lack of icons in navigation, designed more like a home page</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>navigation easily accessible</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>space to add more information/quick links on the side</span>
      </li>
    </ul>
  </div>

  <h3>Version 2</h3>
  <p>
    <strong>Tried:</strong> Altered card proportions and integrated quick actions.
    <strong>Learned:</strong> Navigation became harder to reach as a hamburger menu, and the layout left too much empty space in the top left.
  </p>
  <div class="grid-2">
    <div class="impact-holder size-b theme-echokids">
      <p class="impact-label">V2 layout: Hamburger menu created friction and awkward whitespace</p>
      <div class="impact-canvas">
        <img
          src="/images/echokids/layout_iteration_1.webp"
          alt="Iteration V2 Screen"
        />
      </div>
    </div>
    <ul class="eval-list">
      <li class="eval-item">
        <span class="eval-icon eval-con" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
        <span>navigation not easily or quickly accessible</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-con" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
        <span>too much white space on the top left of screen</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>space to add more information/quick links on the side</span>
      </li>
    </ul>
  </div>

  <h3>Version 3</h3>
  <p>
    <strong>Tried:</strong> A dedicated vertical sidebar.
    <strong>Learned:</strong> Navigation was finally fast to reach and the top of the page was used well, but the narrower content area left less room for quick links and information.
  </p>
  <div class="grid-2">
    <div class="impact-holder size-b theme-echokids">
      <p class="impact-label">V3 layout: Persistent vertical sidebar fixed discoverability</p>
      <div class="impact-canvas">
        <img
          src="/images/echokids/layout_iteration_2.webp"
          alt="Iteration V3 Screen"
        />
      </div>
    </div>
    <ul class="eval-list">
      <li class="eval-item">
        <span class="eval-icon eval-con" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
        <span>less information/quick links present on the screen</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>navigation very easily/quickly accessible</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>effective usage of space on the top of the dashboard; appropriate for the navigation to take up this much space since it will be used often and quickly</span>
      </li>
    </ul>
  </div>

  <h3>Final Wireframe</h3>
  <p>
    I committed to V3’s sidebar and solved its one drawback by adding an Earning Breakdown section at the bottom of the page, bringing back the information that the narrower page space had pushed out.
  </p>
  <div class="grid-2">
    <div class="impact-holder size-b theme-echokids">
      <p class="impact-label">Final wireframe: Added earnings breakdown to reclaim lost page width</p>
      <div class="impact-canvas">
        <img
          src="/images/echokids/layout_iteration_3.webp"
          alt="Final Wireframe Screen"
        />
      </div>
    </div>
    <ul class="eval-list">
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>added breakdown section at bottom of page to solve lack of information drawback</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>navigation very easily/quickly accessible</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>effective usage of space on the top of the dashboard; appropriate for the navigation to take up this much space since it will be used often and quickly</span>
      </li>
    </ul>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 6. FINAL UI & BRAND -->
<section id="final" class="cs-section">
  <h4 class="section-label">Final UI & Brand</h4>
  <h2>Establishing the design system and delivering high-fidelity screens</h2>

  <h3>Design System</h3>
  <p>
    I built a refreshed design system covering color, typography, and core components to give EchoKids a consistent identity across every digital touchpoint.
  </p>
  <div class="impact-holder size-a theme-echokids">
    <p class="impact-label">Design system: High-contrast color hierarchy, type, and components</p>
    <div class="impact-canvas">
      <img
        src="/images/echokids/design_system_components.webp"
        alt="EchoKids Design System and Color System"
      />
    </div>
  </div>

  <h3>Final Dashboard</h3>
  <p>
    Applying the brand system to the final wireframe produced the production-ready interface.
  </p>
  <div class="impact-holder size-a theme-echokids">
    <p class="impact-label">Shipped dashboard: 200% retention boost with scannable mentor hubs</p>
    <div class="impact-canvas">
      <img
        src="/images/echokids/redesigned_dashboard_final.webp"
        alt="High-Fidelity Final Dashboard"
      />
    </div>
  </div>

  <h3>Explore the Prototype</h3>
  <p>
    Explore with the embedded Figma prototype below to test the navigation flow, compartment structure, and mentor lesson views.
  </p>

  <div class="figma-container">
    <iframe
      src="https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fwo1jbicqeWG7i1J0XElc76%2FTvisha---EchoKids-Redesign-(Copy)%3Fnode-id%3D277%253A87%26scaling%3Dscale-down%26page-id%3D0%253A1%26starting-point-node-id%3D7%253A2%26hide-ui%3D1"
      allowfullscreen
    ></iframe>
  </div>

  <p>
    <a
      href="https://www.figma.com/proto/wo1jbicqeWG7i1J0XElc76/Tvisha---EchoKids-Redesign-(Copy)?node-id=277%3A87&scaling=scale-down&page-id=0%3A1&starting-point-node-id=7%3A2"
      target="_blank"
      rel="noopener noreferrer"
      class="external-link"
    >Open Prototype in Figma full screen<svg class="external-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10" /></svg></a>
  </p>

  <div class="section-divider"></div>
</section>

<!-- 7. IMPACT & OUTCOMES SECTION -->
<section id="impact" class="cs-section">
  <h4 class="section-label">Impact & Outcomes</h4>
  <h2>Measurable results shipped across mobile and desktop</h2>
  <p>
    Measured over the 6 weeks following production launch across EchoKids' mentor community:
  </p>

  <div class="grid-3">
    <div class="stat-card">
      <p class="stat-card-value">+200%</p>
      <p class="stat-card-label">Weekly Returning Mentors</p>
      <p class="stat-card-subtext">Active weekly mentor engagement grew from 15 to 45 mentors.</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">-47%</p>
      <p class="stat-card-label">Time to Find a Tool</p>
      <p class="stat-card-subtext">Drastic drop in navigation friction thanks to the persistent sidebar.</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">0→1</p>
      <p class="stat-card-label">Design System Shipped</p>
      <p class="stat-card-subtext">Unified brand refresh and reusable component library adopted across app and web.</p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 8. REFLECTION SECTION -->
<section id="reflection" class="cs-section">
  <h4 class="section-label">Reflection</h4>
  <h2>Key takeaways & lessons learned</h2>

  <div class="grid-3">
    <div class="grid-card">
      <h3>1. Owning the Whole Problem</h3>
      <p>
        As the only designer, there was no one to hand decisions off to. I learned to set my own direction, from the research plan to the design system pitch, and defend it to the CEO with evidence.
      </p>
    </div>
    <div class="grid-card">
      <h3>2. Knowing What Not to Change</h3>
      <p>
        The calendar constraint taught me that a redesign isn’t about changing everything. Keeping what mentors already valued and working around technical contraints let me focus effort where it mattered.
      </p>
    </div>
    <div class="grid-card">
      <h3>3. Shipping to Real Users</h3>
      <p>
        This was my first project shipped to production. Seeing weekly returning mentors triple, and hearing mentors say the dashboard finally made sense, showed me how design can truly impact people’s daily work.
      </p>
    </div>
  </div>
</section>
