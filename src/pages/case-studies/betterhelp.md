---
layout: ../../layouts/caseStudyLayout.astro

title: "BetterHelp"
pageTitle: "BetterHelp Case Study — Tvisha Patel"
description: "How I redesigned BetterHelp's pre-session video test into a one-page, 33% shorter flow so clients and therapists can check only what they need to."
year: "2023"
subtitle: "Simplifying technical complexity for clients and therapists | 33% more streamlined flow"
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
  - "Simplifying Technical Complexity"
  - "Technical User Flows"
  - "Usability & Systems Design"
sections:
  - { id: "overview", label: "Overview" }
  - { id: "before-after", label: "Before & After" }
  - { id: "discovery", label: "Discovery & Research" }
  - { id: "iterations", label: "Design Iterations" }
  - { id: "prototype", label: "Final UI & Prototype" }
  - { id: "impact", label: "Impact & Outcomes" }
  - { id: "reflection", label: "Reflection" }
---

<!-- 1. OVERVIEW SECTION -->
<section id="overview" class="cs-section">
  <h4 class="section-label">Overview</h4>
  <h2>Simplifying pre-call device testing for over 5 million clients and therapists</h2>
  <p>
    BetterHelp is the largest online therapy platform with over 5 million users. During my internship, I redesigned the <strong>video session test</strong>: the page clients and therapists use to check their camera, microphone, speaker, and connection minutes before a live session.
  </p>
  <p>
    I owned the redesign from audit to final UI. My senior designer reviewed my work weekly, and I partnered directly with engineering, data, and our UX writer. The redesign shipped to production in October 2023.
  </p>

  <div class="callout">
    <h3>Impact: Cut the device test from 4 sequential pages to a single tabbed page, reducing the clicks needed to complete a full test by 33%, so users can check only what’s broken right before a session.</h3>
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
        My approach: replace the rigid sequence with a single page where any device can be tested in any order, and rewrite the troubleshooting help so it reflects today’s browsers and apps.
      </p>
    </div>
  </div>

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
    <p class="impact-label">Shift: 4 sequential pages → 1 flexible tabbed test</p>
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
    <p class="impact-label">Redesign: Replaced outdated text with targeted slide-in help</p>
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
  <h4 class="section-label">Discovery & Research</h4>
  <h2>Gaining understanding across engineering, data, and competitors</h2>
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
      <p class="impact-label">Legacy state: One device per page in rigid sequence</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/legacy_sequential_test_flow.webp"
          alt="Previous Camera Step Design"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Legacy state: Dense text with outdated app references</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/legacy_dense_help_section.webp"
          alt="Previous Help Section Design and Content"
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
      <p class="impact-label">Teams audit: Single pre-join screen with all devices visible</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/audit_camera_step.webp"
          alt="Microsoft Teams pre-join device settings"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Whereby audit: Compact card keeps user on the same page</p>
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
      <p class="impact-label">Zoom audit: Clear yes/no prompts, but locked order</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/audit_microphone_step.webp"
          alt="Zoom guided speaker and microphone test"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Meet audit: Self-service preview with quick device toggles</p>
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
      <p class="impact-label">V1 exploration: Dynamic pills with instructions in a tooltip</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/help_system_permissions_wireframe.webp"
          alt="Iteration V1 Screen"
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
        <span>give user more agency to chose what device to test</span>
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
      <p class="impact-label">V2 exploration: Equal-sized tiles with visible instructions</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/test_landing_page_wireframe.webp"
          alt="Iteration V2 Landing Page"
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
        <span>give user more agency to chose what device to test</span>
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
    <h3>The Tradeoff: Dynamic Dropdowns vs. Shipping This Sprint</h3>
    <p>
      V1 and V2 both depended on dynamic dropdowns with real-time feedback meters (like a live microphone soundwave). When engineering flagged these as too costly for the sprint, I pushed for V3’s simpler tab structure instead.
    </p>
    <p>
      <strong>What we gave up:</strong> real-time audio feedback. <strong>How I adjusted:</strong> each tab has a clear “Confirm it’s working” / “I need help” choice, and the step pages have clear feedback on if their device is working (camera view, microphone playback, speaker sound play, network auto-check).
    </p>
  </div>

  <h3>Version 3</h3>
  <p>
    <strong>Tried:</strong> Tab navigation across Camera, Microphone, Speaker, and Connection, with simple confirm/help actions.
    <strong>Kept because:</strong> It was cheap to build, preserved user choice over what to test, and left instructions visible.
  </p>
  <div class="grid-2">
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">V3 wireframe: Fast tabbed navigation with low engineering lift</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/test_landing_page_iteration_1.webp"
          alt="Iteration V3 Landing Page"
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
        <span>give user more agency to chose what device to test</span>
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
      <p class="impact-label">Approved wireframe: Validated tab structure ready for UI</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/test_landing_page_iteration_2.webp"
          alt="Wireframe State"
        />
      </div>
    </div>
    <div class="impact-holder size-b theme-betterhelp">
      <p class="impact-label">Production UI: Built with BetterHelp brand guidelines & elevation</p>
      <div class="impact-canvas">
        <img
          src="/images/betterhelp/redesigned_tabbed_test_final.webp"
          alt="High-Fidelity Final UI"
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
      src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FhhSFPe32C9clDjoklSpRjx%2FInternship-designs%252Freflection%3Fpage-id%3D1%253A2%26type%3Ddesign%26node-id%3D205-32637%26viewport%3D-1496%252C963%252C0.09%26t%3D2xQui5CbJoRByFAP-1%26scaling%3Dscale-down%26starting-point-node-id%3D205%253A32674%26mode%3Ddesign"
      allowfullscreen
    ></iframe>
  </div>

  <p>
    <a
      href="https://www.figma.com/proto/hhSFPe32C9clDjoklSpRjx/Internship-designs/reflection?page-id=1%3A2&type=design&node-id=205-32637&viewport=-1496%2C963%2C0.09&t=2xQui5CbJoRByFAP-1&scaling=scale-down&starting-point-node-id=205%3A32674&mode=design"
      target="_blank"
      rel="noopener noreferrer"
      class="external-link"
    >Open Prototype in Figma full screen<svg class="external-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10" /></svg></a>
  </p>

  <div class="section-divider"></div>
</section>

<!-- 6. IMPACT & OUTCOMES SECTION -->
<section id="impact" class="cs-section">
  <h4 class="section-label">Impact & Outcomes</h4>
  <h2>Measurable results shipped to 5 million users</h2>
  <p>
    Shipped to production across BetterHelp’s web platform in October 2023, delivering immediate improvements to pre-session confidence:
  </p>

  <div class="grid-3">
    <div class="stat-card">
      <p class="stat-card-value">-33%</p>
      <p class="stat-card-label">Test Time & Clicks</p>
      <p class="stat-card-subtext">Reduced full flow from 4 sequential pages to one streamlined, tabbed surface.</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">5M+</p>
      <p class="stat-card-label">Clients & Therapists</p>
      <p class="stat-card-subtext">Scalable device testing experience supporting millions of therapy sessions.</p>
    </div>
    <div class="stat-card">
      <p class="stat-card-value">1-Click</p>
      <p class="stat-card-label">Direct Diagnostics</p>
      <p class="stat-card-subtext">Jump straight to specific broken hardware without clicking through unrelated tests.</p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 7. REFLECTION SECTION -->
<section id="reflection" class="cs-section">
  <h4 class="section-label">Reflection</h4>
  <h2>Key takeaways & lessons learned</h2>

  <div class="grid-3">
    <div class="grid-card">
      <h3>1. Going Beyond the Brief</h3>
      <p>
        I introduced Jitter to the design team to create more detailed animation and interaction handoffs, which other designers adopted for their own projects.
      </p>
    </div>
    <div class="grid-card">
      <h3>2. Designing Within Constraints</h3>
      <p>
        Losing dynamic dropdowns caused a big pivot, but it forced a better question: what’s the simplest signal that tells a user “you’re good to go”? Finding that answer, rather than fighting the constraint to follow familiar standards, is what got V3 shipped.
      </p>
    </div>
    <div class="grid-card">
      <h3>3. Speed With Craft</h3>
      <p>
        I juggled multiple design projects tracked in JIRA for sprint reviews, and leaned on cross-functional collaborators and the growing design system at BetterHelp to move fast without sacrificing quality.
      </p>
    </div>
  </div>
</section>
