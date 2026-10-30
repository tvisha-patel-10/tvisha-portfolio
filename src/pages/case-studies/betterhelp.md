---
layout: ../../layouts/caseStudyLayout.astro

title: "BetterHelp"
pageTitle: "BetterHelp Case Study — Tvisha Patel"
description: "How I redesigned BetterHelp's pre-session video test into a one-page, 33% shorter flow so clients and therapists can check only what they need to."
year: "2023"
subtitle: "Making video testing simpler for clients and therapists | 33% fewer clicks"
heroImage: "/images/betterhelp/betterhelp_cover.mp4"
heroPoster: "/images/betterhelp/redesigned_tabbed_test_final.webp"
role: "Product Design Intern"
timeline: "June – September 2023"
team:
  - "1 Product Design Intern (me)"
  - "1 Senior Product Designer"
  - "1 Project Manager"
  - "1 Software Developer"
  - "1 UX Writer"
skills:
  - "Prototyping"
  - "Simplifying Technical Setup"
  - "Technical User Flows"
  - "Usability & Systems Design"
sections:
  - { id: "overview", label: "Overview" }
  - { id: "before-after", label: "Before & After" }
  - { id: "discovery", label: "Research" }
  - { id: "iterations", label: "Design Iterations" }
  - { id: "prototype", label: "Final UI & Prototype" }
  - { id: "impact", label: "Impact & Outcomes" }
  - { id: "reflection", label: "Reflection" }
---

<!-- 1. OVERVIEW SECTION -->
<section id="overview" class="cs-section">
  <h4 class="section-label">Overview</h4>
  <h2>Making the pre-call device test simpler for over 5 million clients and therapists</h2>
  <p>
    BetterHelp is the largest online therapy platform with over 5 million users. During my internship, I redesigned the <strong>video session test</strong>: the page clients and therapists use to check their camera, microphone, speaker, and connection minutes before a live session.
  </p>
  <p>
    I owned the redesign from audit to final UI. My senior designer reviewed my work weekly, and I partnered directly with engineering, data, and our UX writer. The redesign shipped to production in October 2023.
  </p>

  <div class="callout">
    <h3>Impact: Cut the device test from 4 pages to a single tabbed page, which cut the clicks for a full test by 33%. Now people can check just what’s broken right before a session.</h3>
  </div>

  <div class="grid-2">
    <div class="grid-card">
      <h3>The Problem</h3>
      <p>
        Users open this page minutes before a therapy session, often already anxious. The old test forced them through <strong>camera → microphone → speaker → network</strong> in a fixed order. Someone with only a network issue had to click through three unrelated steps to reach it.
      </p>
      <p>
        Data showed that ~40% of visits were repeat visits within 10 minutes of a scheduled session, a sign users were getting stuck or frustrated and retrying.
      </p>
    </div>
    <div class="grid-card">
      <h3>The Goal</h3>
      <p>
        <strong>How might we redesign the video session test so users can fix the one thing that’s broken quickly, with full control over the process?</strong>
      </p>
      <p>
        My approach: swap the fixed sequence for one page where you can test any device in any order, and update the troubleshooting help copy to be relevant and helpful.
      </p>
    </div>
  </div>

  <div class="figma-container">
    <iframe
      src="https://embed.figma.com/proto/hhSFPe32C9clDjoklSpRjx/Internship-designs-reflection?node-id=205-32637&viewport=-4937%2C3627%2C0.32&scaling=scale-down&content-scaling=fixed&starting-point-node-id=205%3A32674&page-id=1%3A2&embed-host=share"
      allowfullscreen
    ></iframe>
  </div>

  <p>
    <a
      href="https://www.figma.com/proto/hhSFPe32C9clDjoklSpRjx/Internship-designs-reflection?node-id=205-32637&viewport=-4937%2C3627%2C0.32&scaling=scale-down&content-scaling=fixed&starting-point-node-id=205%3A32674&page-id=1%3A2"
      target="_blank"
      rel="noopener noreferrer"
      class="external-link"
    >Open prototype in Figma<svg class="external-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10" /></svg></a>
  </p>

  <div class="section-divider"></div>
</section>

<!-- 2. BEFORE & AFTER -->
<section id="before-after" class="cs-section">
  <h4 class="section-label">Before & After</h4>
  <h2>From a 4-step sequence to one flexible page</h2>
  <p>
    The two biggest shifts: the test structure, and the help experience that appears when something goes wrong.
  </p>
  <div class="impact-holder size-a theme-betterhelp">
    <p class="impact-label">4 pages in a row → 1 page with tabs</p>
    <div class="impact-split">
      <div class="impact-slot">
        <span class="slot-badge">Before</span>
        <div class="impact-canvas">
          <img
            src="/images/betterhelp/legacy_sequential_test_flow.webp"
            alt="Before: Legacy 4-step sequential test flow"
          />
        </div> 
      </div>
      <div class="impact-slot">
        <span class="slot-badge">After</span>
        <div class="impact-canvas">
          <img
            src="/images/betterhelp/redesigned_tabbed_test_final.webp"
            alt="After: Redesigned tabbed test page"
          />
        </div> 
      </div>
    </div>
  </div>

  <div class="impact-holder size-a theme-betterhelp">
    <p class="impact-label">Redesign: Swapped dense, outdated text for a slide-in help panel</p>
    <div class="impact-split">
      <div class="impact-slot">
        <span class="slot-badge">Before</span>
        <div class="impact-canvas">
          <img
            src="/images/betterhelp/legacy_dense_help_section.webp"
            alt="Before: Legacy help section with dense text"
          />
        </div> 
      </div>
      <div class="impact-slot">
        <span class="slot-badge">After</span>
        <div class="impact-canvas">
          <img
            src="/images/betterhelp/redesigned_slide_in_help.webp"
            alt="After: Targeted slide-in help experience"
          />
        </div> 
      </div>
    </div>
  </div>

  <div class="grid-3">
    <div class="grid-card">
      <h3>Structure</h3>
      <p>
        Replaced the sequential steps with tabs, so users jump straight to the device they need. Added an “Exit video session test” action at every stage so no one feels trapped.
      </p>
    </div>
    <div class="grid-card">
      <h3>Help Experience</h3>
      <p>
        Moved help into a dedicated slide-in view that encourages users to reload after changing settings. I worked with our UX writer to cut outdated references (Skype, PhotoBooth, Google Hangouts) and visually highlight exact browser permission settings.
      </p>
    </div>
    <div class="grid-card">
      <h3>Visual Consistency</h3>
      <p>
        Adopted BetterHelp’s standard buttons, typography, colors, and left-aligned hierarchy so the feature feels native to the rest of the product.
      </p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 3. DISCOVERY & RESEARCH SECTION -->
<section id="discovery" class="cs-section">
  <h4 class="section-label">Research</h4>
  <h2>What I learned from engineering, data, and competitors</h2>
  <p>
    I went directly to the teams who owned each piece of the problem:
  </p>

  <div class="grid-3">
    <div class="grid-card">
      <h3>Engineering</h3>
      <p>
        Met with the video session developers early to understand browser permission limits and what was realistic to build in one sprint.
      </p>
    </div>
    <div class="grid-card">
      <h3>Data</h3>
      <p>
        Pulled traffic, repeat-visit, and drop-off data from the data team. The biggest drop-off happened at step 2 (microphone), and most repeat visits came within 10 minutes of a session.
      </p>
    </div>
    <div class="grid-card">
      <h3>Users</h3>
      <p>
        We didn’t have bandwidth for formal usability testing within the sprint, so I reviewed recent support tickets about audio/video issues to understand what was actually breaking for users.
      </p>
    </div>
  </div>

  <h3>Insights from the Previous Design</h3>
  <div class="grid-2">
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Old version: One device per page, in a fixed order</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/legacy_sequential_test_flow.webp"
          alt="Old camera test step"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Old version: Dense text that mentioned outdated apps</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/legacy_dense_help_section.webp"
          alt="Old help section with dense text"
        />
      </div>
    </div>
  </div>

  <h3>Competitive Analysis</h3>
  <p>
    I audited pre-call checks across Microsoft Teams, Whereby, Zoom, and Google Meet. Here’s what shaped the design:
  </p>

  <div class="grid-2">
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Teams: One pre-join screen showing every device</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/audit_camera_step.webp"
          alt="Microsoft Teams pre-join device settings"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Whereby: A small card that keeps you on the same page</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/audit_speaker_step.webp"
          alt="Whereby device settings"
        />
      </div>
    </div>
  </div>

  <div class="grid-2">
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Zoom: Clear yes/no prompts, but a fixed order</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/audit_microphone_step.webp"
          alt="Zoom guided speaker and microphone test"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Meet: A preview you can check yourself, with quick device switches</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/audit_network_step.webp"
          alt="Google Meet pre-call device check"
        />
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 4. DESIGN ITERATIONS SECTION -->
<section id="iterations" class="cs-section">
  <h4 class="section-label">Design Iterations</h4>
  <h2>Testing three layouts</h2>

  <h3>Version 1</h3>
  <p>
    <strong>Tried:</strong> A single preview window with device dropdown pills underneath and instructions tucked into a tooltip.
    <strong>Learned:</strong> It gave users control over what to test, but hiding the instructions made them too easy to miss.
    <strong>Dropped because:</strong> Dynamic device dropdowns were high dev lift to build, and the important copy was too hidden in a tooltip.
  </p>
  <div class="grid-2">
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">V1: Device pills with instructions in a tooltip</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/help_system_permissions_wireframe.webp"
          alt="V1: device pills with instructions in a tooltip"
        />
      </div>
    </div>
    <ul class="eval-list">
      <li class="eval-item">
        <span class="eval-icon eval-con" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
        <span>technically difficult/consuming to have dynamic drop downs</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>give user more agency to choose what device to test</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-neutral" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </span>
        <span>less writing on page with copy within a tool tip; however copy is too hidden now</span>
      </li>
    </ul>
  </div>

  <h3>Version 2</h3>
  <p>
    <strong>Tried:</strong> Equal-sized device tiles acting as dropdowns, with instructions visible on the page.
    <strong>Learned:</strong> Visible instructions can fit without crowding the layout.
    <strong>Dropped because:</strong> It still relied on dynamic dropdowns which was too high of a dev lift.
  </p>
  <div class="grid-2">
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">V2: Equal-sized tiles with instructions on the page</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/test_landing_page_wireframe.webp"
          alt="V2: equal-sized device tiles with visible instructions"
        />
      </div>
    </div>
    <ul class="eval-list">
      <li class="eval-item">
        <span class="eval-icon eval-con" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
        <span>technically difficult/consuming to have dynamic drop downs</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>instructions does not take up too much space and visible</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>give user more agency to choose what device to test</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>cleaner design with equal sized squares as drop downs</span>
      </li>
    </ul>
  </div>

  <div class="callout">
    <h3>The Tradeoff: Dynamic Dropdowns or Shipping This Sprint</h3>
    <p>
      V1 and V2 both depended on dynamic dropdowns with real-time feedback meters (like a live microphone soundwave). Engineering said these were too high of a lift to build in one sprint, so I pushed for V3’s simpler tabs instead.
    </p>
    <p>
      <strong>What we gave up:</strong> real-time audio feedback. <strong>How I adjusted:</strong> each tab has a clear “Confirm it’s working” / “I need help” choice, and each step shows upfront whether the device is working (camera view, microphone playback, speaker sound play, network auto-check).
    </p>
  </div>

  <h3>Version 3</h3>
  <p>
    <strong>Tried:</strong> Tab navigation across Camera, Microphone, Speaker, and Connection, with simple confirm/help actions.
    <strong>Kept because:</strong> It was cheap to build, preserved user choice over what to test, and left instructions visible.
  </p>
  <div class="grid-2">
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">V3 wireframe: Simple tabs that were quick to build</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/test_landing_page_iteration_1.webp"
          alt="V3: tabbed device test with Camera, Microphone, Speaker, and Connection tabs"
        />
      </div>
    </div>
    <ul class="eval-list">
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>technically efficient and less dev effort</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>give user more agency to choose what device to test</span>
      </li>
      <li class="eval-item">
        <span class="eval-icon eval-pro" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>clean and modern design with visible instructions</span>
      </li>
    </ul>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 5. FINAL UI & PROTOTYPE SECTION -->
<section id="prototype" class="cs-section">
  <h4 class="section-label">Final UI & Prototype</h4>
  <h2>Applying BetterHelp’s brand to the final design</h2>
  <p>
    Applying official brand typography, colors, button styles, and elevation guidelines to the V3 wireframe produced the final and modernized interface.
  </p>

  <div class="grid-2">
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Approved wireframe</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/test_landing_page_iteration_2.webp"
          alt="Approved V3 wireframe with device tabs"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Final UI: Built with BetterHelp’s brand guidelines</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/redesigned_tabbed_test_final.webp"
          alt="Final BetterHelp video test page with tabs"
        />
      </div>
    </div>
  </div>

  <h3>Explore the Prototype</h3>
  <p>
    Explore the embedded Figma prototype below to test the device tabs, camera and microphone flows, and troubleshooting states.
  </p>

  <div class="figma-container">
    <iframe
      src="https://embed.figma.com/proto/hhSFPe32C9clDjoklSpRjx/Internship-designs-reflection?node-id=205-32637&viewport=-4937%2C3627%2C0.32&scaling=scale-down&content-scaling=fixed&starting-point-node-id=205%3A32674&page-id=1%3A2&embed-host=share"
      allowfullscreen
    ></iframe>
  </div>

  <p>
    <a
      href="https://www.figma.com/proto/hhSFPe32C9clDjoklSpRjx/Internship-designs-reflection?node-id=205-32637&viewport=-4937%2C3627%2C0.32&scaling=scale-down&content-scaling=fixed&starting-point-node-id=205%3A32674&page-id=1%3A2"
      target="_blank"
      rel="noopener noreferrer"
      class="external-link"
    >Open prototype in Figma<svg class="external-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10" /></svg></a>
  </p>

  <div class="section-divider"></div>
</section>

<!-- 6. IMPACT & OUTCOMES SECTION -->
<section id="impact" class="cs-section">
  <h4 class="section-label">Impact & Outcomes</h4>
  <h2>What changed for 5 million users</h2>
  <p>
    Shipped to production across BetterHelp’s web platform in October 2023, and people felt more ready before their sessions:
  </p>

  <div class="grid-3">
    <div class="stat-card">
      <p class="stat-card-value">-33%</p>
      <p class="stat-card-label">Fewer Clicks</p>
      <p class="stat-card-subtext">Cut the full test from 4 pages to one page with tabs.</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">5M+</p>
      <p class="stat-card-label">Clients & Therapists</p>
      <p class="stat-card-subtext">Works for millions of therapy sessions.</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">1-Click</p>
      <p class="stat-card-label">Fix the Right Thing</p>
      <p class="stat-card-subtext">Go straight to the broken device without clicking through tests you don’t need.</p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 7. REFLECTION SECTION -->
<section id="reflection" class="cs-section">
  <h4 class="section-label">Reflection</h4>
  <h2>What I took away</h2>

  <div class="reflection-grid grid-3">
    <div class="reflection-item">
      <span class="reflection-num">01</span>
      <h3>Going Beyond the Brief</h3>
      <p>
        I introduced Jitter to the design team to create more detailed animation and interaction handoffs, which other designers adopted for their own projects.
      </p>
    </div>
    <div class="reflection-item">
      <span class="reflection-num">02</span>
      <h3>Designing Within Constraints</h3>
      <p>
        Losing dynamic dropdowns caused a big pivot, but it forced a better question: what’s the simplest signal that tells a user “you’re good to go”? Finding that answer, instead of fighting the constraint to copy familiar patterns, is what got V3 shipped.
      </p>
    </div>
    <div class="reflection-item">
      <span class="reflection-num">03</span>
      <h3>Speed With Craft</h3>
      <p>
        I juggled multiple design projects tracked in JIRA for sprint reviews, and leaned on cross-functional collaborators and the growing design system at BetterHelp to move fast without sacrificing quality.
      </p>
    </div>
  </div>
</section>
