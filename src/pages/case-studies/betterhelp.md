---
layout: ../../layouts/caseStudyLayout.astro

title: "BetterHelp"
pageTitle: "BetterHelp Case Study — Tvisha Patel"
description: "Simplifying technical onboarding and video session testing for therapy clients and providers, boosting test efficiency by 33%."
year: "2023"
subtitle: "Simplifying technical complexity for clients and therapists | 33% efficiency improvement"
heroImage: "/images/betterhelp/Video_Session_Test_Landing_Page_final 3.png"
role: "Product Design Intern"
timeline: "June – September 2023 (3 Months)"
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
  - { id: "discovery", label: "Discovery & Research" }
  - { id: "iterations", label: "Design Iterations" }
  - { id: "prototype", label: "Interactive Prototype" }
  - { id: "reflection", label: "Reflection" }
---

<!-- 1. OVERVIEW SECTION -->
<section id="overview" class="cs-section">
  <h4 class="section-label">Overview</h4>
  <h2>Simplifying pre-call device testing for over 2 million clients and therapists</h2>
  <p>
    BetterHelp is the largest online therapy platform globally and offers accessible and affordable mental healthcare, enabling individuals to address life's obstacles. During my internship, I was tasked with multiple projects that were put into sprint, handed off to engineering, and shipped across BetterHelp products for over 2 million active users.
  </p>
  <p>
    This case study focuses on my end-to-end redesign of BetterHelp’s video session test. This critical feature allows clients and therapists to verify their camera, microphone, speaker, and network connection before live sessions to prevent technical disruptions.
  </p>

  <div class="callout">
    <h3>Impact: Designed a 33% more streamlined user flow by eliminating unnecessary steps and friction, increasing call efficiency by minimizing session time lost to technical issues.</h3>
  </div>

  <div class="grid-2">
    <div class="grid-card">
      <h3>The Problem</h3>
      <p>
        Because this feature is visited right before a live therapy session, speed and clarity are paramount. Users need to test their hardware effortlessly without adding stress before a call.
      </p>
      <p>
        <strong>How might we redesign the video session test to maximize efficiency and provide users with complete agency during the process?</strong>
      </p>
    </div>
    <div class="grid-card">
      <h3>The Solution & Approach</h3>
      <p>
        The legacy test was rigidly sequential, forcing users through every step in order with outdated UI. We redesigned it into a flexible, free-flowing model where users can test any component in any order.
      </p>
      <p>
        We modernized the visual language to match BetterHelp’s global design system, revamped troubleshooting copy with our UX writer, and partnered across data, engineering, and product management to target high-impact usability gaps.
      </p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 2. DISCOVERY & RESEARCH SECTION -->
<section id="discovery" class="cs-section">
  <h4 class="section-label">Discovery & Research</h4>
  <h2>Gaining understanding across engineering, data, and competitors</h2>
  <p>
    Before starting the design process, I focused on understanding the company’s product strategy, underlying technical architecture, and real user behavior around pre-call anxiety.
  </p>

  <div class="grid-3">
    <div class="grid-card">
      <h3>Engineering Feasibility</h3>
      <p>
        Collaborated with video session developers to understand technical constraints, browser permissions limitations, and coding implications early in the design cycle.
      </p>
    </div>
    <div class="grid-card">
      <h3>Data & Analytics</h3>
      <p>
        Gathered quantitative metrics from the data team on feature traffic, repeat visit patterns, and drop-off rates right before scheduled appointment times.
      </p>
    </div>
    <div class="grid-card">
      <h3>Project Management</h3>
      <p>
        Aligned with PMs on adjacent video calling roadmap initiatives to identify mutual dependencies and ensure smooth sprint integration.
      </p>
    </div>
  </div>

  <h3>Competitive Analysis</h3>
  <p>
    I audited device testing flows across major calling and video conferencing platforms to benchmark industry standards, identify BetterHelp’s relative strengths, and uncover opportunities for agency and flexibility.
  </p>

  <div class="grid-2">
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Screen_Shot_2023-10-16_at_1.37.14_AM.png"
        alt="Competitive Analysis: Calling platform device check comparison 1"
        loading="lazy"
      />
    </div>
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Screen_Shot_2023-10-16_at_1.38.37_AM.png"
        alt="Competitive Analysis: Calling platform device check comparison 2"
        loading="lazy"
      />
    </div>
  </div>

  <div class="grid-2">
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Screen_Shot_2023-10-16_at_1.38.11_AM.png"
        alt="Competitive Analysis: Calling platform device check comparison 3"
        loading="lazy"
      />
    </div>
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Screen_Shot_2023-10-16_at_1.39.10_AM.png"
        alt="Competitive Analysis: Calling platform device check comparison 4"
        loading="lazy"
      />
    </div>
  </div>

  <h3>Insights from the Previous Design</h3>
  <div class="grid-3">
    <div class="grid-card">
      <h3>What Was Broken</h3>
      <p>
        The legacy test had a rigid sequential flow: testing network required clicking through camera and audio checks first. Outdated styling clashed with the modern app, and the help section offered wordy, obsolete advice.
      </p>
    </div>
    <div class="grid-card">
      <h3>How We Addressed It</h3>
      <p>
        Replaced the linear wizard with an open hub allowing non-sequential testing, modernized the component language to match brand tokens, and completely rewritten help documentation.
      </p>
    </div>
    <div class="grid-card">
      <h3>Why It Matters</h3>
      <p>
        Empowering clients and therapists to test only what they need reduces pre-session stress, cuts session time lost to technical troubleshooting, and increases repeat platform trust.
      </p>
    </div>
  </div>

  <div class="grid-2">
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Screen_Shot_2023-07-12_at_11.55.png"
        alt="Previous Camera Step Design"
        loading="lazy"
      />
      <p style="font-size: 0.875rem; opacity: 0.6; margin-top: 0.5rem;">Previous Camera Step Design</p>
    </div>
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Screen_Shot_2023-07-12_at_11.56.png"
        alt="Previous Help Section Design and Content"
        loading="lazy"
      />
      <p style="font-size: 0.875rem; opacity: 0.6; margin-top: 0.5rem;">Previous Help Section Design & Content</p>
    </div>
  </div>

  <h3>Final Strategy</h3>
  <div class="grid-3">
    <div class="grid-card">
      <h3>Effective User Flow</h3>
      <p>
        Give users total autonomy to select and test hardware independently, eliminating sequential barriers and reducing task completion time.
      </p>
    </div>
    <div class="grid-card">
      <h3>Modern UI</h3>
      <p>
        Implement clean visual hierarchy, consistent spacing, and modern design tokens that blend harmoniously with BetterHelp's core brand identity.
      </p>
    </div>
    <div class="grid-card">
      <h3>UX Writing</h3>
      <p>
        Restructure troubleshooting content into scannable, actionable guidance that assists users rapidly if a technical hurdle arises.
      </p>
    </div>
  </div>

  <h3>Major Architectural & Visual Shifts</h3>
  <div class="full-width-media">
    <img
      src="/images/betterhelp/Frame_987496.png"
      alt="Major Structure Changes Overview"
      loading="lazy"
    />
  </div>

  <div class="full-width-media">
    <img
      src="/images/betterhelp/Frame_987497.png"
      alt="Detailed Structure Comparison"
      loading="lazy"
    />
  </div>

  <div class="grid-3">
    <div class="grid-card">
      <h3>Structural Organization</h3>
      <p>
        Eliminated mandatory sequential steps. Added a prominent “Exit video session test” action at all stages, giving users immediate exit agency and cutting frustration.
      </p>
    </div>
    <div class="grid-card">
      <h3>Brand & Visual Consistency</h3>
      <p>
        Adopted BetterHelp's standardized button treatments, typography, colors, and left-aligned text hierarchy, ensuring the feature feels native to the ecosystem.
      </p>
    </div>
    <div class="grid-card">
      <h3>Refined Help Experience</h3>
      <p>
        Collaborated closely with our UX writer to condense text, generalize guidance across all major browsers, and highlight exact browser permission settings visually.
      </p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 3. DESIGN ITERATIONS SECTION -->
<section id="iterations" class="cs-section">
  <h4 class="section-label">Design Iterations</h4>
  <h2>Exploring layout fidelity, technical feasibility, and final UI</h2>

  <div class="callout">
    <h3>Technical Feasibility Pivot</h3>
    <p>
      Early iterations (V1 and V2) explored dynamic dropdowns with real-time feedback meters (such as live microphone soundwave bars). After consulting engineering and PM leadership, implementing dynamic real-time meters was deemed disproportionately high effort for sprint prioritization. This feedback steered our direction toward a streamlined, highly feasible, and equally intuitive V3 structure.
    </p>
  </div>

  <h3>Version 1 (V1)</h3>
  <p>
    Initial exploration testing collapsible device cards with dynamic real-time feedback meters.
  </p>
  <div class="grid-2">
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Scroll_v2.png"
        alt="Iteration V1 Scroll Screen"
        loading="lazy"
      />
    </div>
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Frame_987498.png"
        alt="Iteration V1 Layout Breakdown"
        loading="lazy"
      />
    </div>
  </div>

  <h3>Version 2 (V2)</h3>
  <p>
    Refining the landing hub layout, testing dedicated status badges, and experimenting with alternate exit pathways.
  </p>
  <div class="grid-2">
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Video_Session_Test_Landing_Page.png"
        alt="Iteration V2 Landing Page"
        loading="lazy"
      />
    </div>
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Frame_987499.png"
        alt="Iteration V2 Architecture"
        loading="lazy"
      />
    </div>
  </div>

  <h3>Version 3 (V3)</h3>
  <p>
    Streamlined layout optimized for engineering velocity and user clarity, removing complex live meters in favor of crisp status triggers.
  </p>
  <div class="grid-2">
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Video_Session_Test_Landing_Page_final.png"
        alt="Iteration V3 Landing Page Final"
        loading="lazy"
      />
    </div>
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Frame_987500.png"
        alt="Iteration V3 Architecture Details"
        loading="lazy"
      />
    </div>
  </div>

  <h3>Final Wireframe Synthesis</h3>
  <div class="grid-3">
    <div class="grid-card">
      <h3>What</h3>
      <p>
        Combines the strongest usability traits of previous iterations while eliminating unnecessary cognitive overhead and complex dependencies.
      </p>
    </div>
    <div class="grid-card">
      <h3>How</h3>
      <p>
        Allows selective testing of camera, microphone, speaker, and connection with instant exit controls and clear visual indicators.
      </p>
    </div>
    <div class="grid-card">
      <h3>Why</h3>
      <p>
        Drastically reduces time-to-test and pre-call anxiety, achieving a 33% more streamlined user flow for over 2 million clients and therapists.
      </p>
    </div>
  </div>

  <div class="full-width-media">
    <img
      src="/images/betterhelp/Video_Session_Test_Landing_Page_final 1.png"
      alt="Final Wireframe Synthesis Screen"
      loading="lazy"
    />
  </div>

  <h3>Implementing BetterHelp’s Brand Identity</h3>
  <p>
    Applying official brand typography, colors, button styles, and elevation guidelines to our wireframes produced the high-fidelity final interface.
  </p>

  <div class="grid-2">
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Video_Session_Test_Landing_Page_final 2.png"
        alt="Wireframe State"
        loading="lazy"
      />
      <p style="font-size: 0.875rem; opacity: 0.6; margin-top: 0.5rem;">Wireframe State</p>
    </div>
    <div class="full-width-media">
      <img
        src="/images/betterhelp/Video_Session_Test_Landing_Page_final 3.png"
        alt="High-Fidelity Production UI"
        loading="lazy"
      />
      <p style="font-size: 0.875rem; opacity: 0.6; margin-top: 0.5rem;">High-Fidelity Production UI</p>
    </div>
  </div>

  <div class="section-divider"></div>
</section>

<!-- 4. INTERACTIVE PROTOTYPE SECTION -->
<section id="prototype" class="cs-section">
  <h4 class="section-label">Interactive Prototype</h4>
  <h2>Explore the live prototype</h2>
  <p>
    Interact with the embedded Figma prototype below to test the redesigned device selection, streamlined camera/mic workflows, and updated troubleshooting states.
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
    >
      Open Prototype in Figma full screen ↗
    </a>
  </p>

  <div class="section-divider"></div>
</section>

<!-- 5. REFLECTION SECTION -->
<section id="reflection" class="cs-section">
  <h4 class="section-label">Reflection</h4>
  <h2>Key takeaways & lessons learned</h2>
  <p>
    Working with BetterHelp was an incredible experience where I learned how to cross-functionally communicate with other teams and design for business needs at global scale.
  </p>

  <div class="grid-3">
    <div class="grid-card">
      <h3>1. Navigating a Large Organization</h3>
      <p>
        Learned corporate communication rhythms and calendar etiquette across Google Calendar and Slack. Became comfortable proactively reaching out to data analysts, PMs, and engineers for critical insights, and introduced new animation tools to fellow designers to optimize developer handoff.
      </p>
    </div>
    <div class="grid-card">
      <h3>2. Quick Adjustment & Constraints</h3>
      <p>
        Designed within technical constraints and company limits highlighted by leadership. Adapting our direction from heavy dynamic dropdowns to a pragmatic V3 structure taught me how to embrace constraints gracefully without compromising design quality or user delight.
      </p>
    </div>
    <div class="grid-card">
      <h3>3. Time Management & Velocity</h3>
      <p>
        Juggled multiple simultaneous design projects tracked in JIRA for sprint reviews. Learned how to balance rapid execution velocity with deep craft, leveraging design systems to ensure consistency across features.
      </p>
    </div>
</section>
