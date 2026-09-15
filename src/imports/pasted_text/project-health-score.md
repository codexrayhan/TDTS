**Act as an expert UI/UX Designer. Continue enhancing the existing "Task Delegation and Tracking System" Admin Dashboard by adding a new intelligent feature called "Project Health Score". Do NOT redesign or restructure the existing dashboard. This is an enhancement to the current design, not a replacement. Maintain complete visual consistency with the existing UI, preserving the same layout, spacing, navigation, typography, colors, components, and design philosophy.**

## CRITICAL REQUIREMENTS

* Keep the current Admin Dashboard exactly as it is.
* Do NOT remove or redesign any existing components.
* The existing Sidebar, Header, Kanban Board, Gantt Chart, Task Delegation Panel, Performance Leaderboard, and all interactive elements must remain unchanged.
* The new feature should feel like a native extension of the current dashboard.
* Maintain the **"Zero-Clutter Bird's Eye View"** philosophy where an Admin can instantly understand the overall project condition from a single screen.
* Continue using the existing Light Mode design.

---

## DESIGN SYSTEM

Maintain the same design language throughout.

**Font**

* Inter

**Background**

* #F8F9FA

**Cards**

* White (#FFFFFF)
* Soft shadow (Blur 20px, Y 4px)

**Primary**

* Royal Blue (#2563EB)

**Success**

* Emerald Green (#10B981)

**Warning**

* Amber Yellow (#F59E0B)

**Danger**

* Alert Red (#EF4444)

**Border Radius**

* 8px–12px

**Spacing**

* Use the same padding, margins, and Auto Layout principles already established.

---

# NEW FEATURE

# PROJECT HEALTH SCORE

The Project Health Score should become one of the primary KPIs visible immediately when the Admin opens the dashboard.

This feature must communicate the overall health of the project using a single easy-to-understand percentage while still allowing the Admin to understand why that score exists.

---

# DASHBOARD PLACEMENT

Modify the existing **Top Metrics Row**.

Currently the dashboard contains four KPI cards.

* Total Projects
* Active Tasks
* Completed
* Overdue / Penalties

Expand this into a responsive five-card layout while maintaining equal spacing and visual balance.

The fifth card should be:

⭐ Project Health Score

The five cards become:

* Total Projects
* Active Tasks
* Completed
* Overdue / Penalties
* Project Health Score

Do not change the overall dashboard layout.

---

# PROJECT HEALTH SCORE CARD

Design a modern KPI card that becomes the visual highlight of the dashboard while remaining minimal.

The card should contain:

Large Circular Progress Indicator

Example:

89%

Title

Project Health Score

Current Status Badge

🟢 Healthy

or

🟡 Moderate Risk

or

🔴 Critical

Small Description

"Overall project condition based on real-time analytics."

Include a small analytics icon beside the title.

---

# HEALTH SCORE BREAKDOWN

Inside the card, or inside an expandable section, hover popover, or tooltip, display the factors contributing to the score.

Display five compact progress indicators.

Progress Completion

95%

Deadline Compliance

90%

Team Performance

93%

Workload Balance

88%

Penalty Impact

82%

Each indicator should use a thin progress bar or small circular indicator.

Use semantic colors:

Green = Good

Yellow = Moderate

Red = Poor

---

# HEALTH SCORE CALCULATION

Display a subtle label explaining that the score is automatically calculated using:

• Project Progress

• Completed Tasks

• Overdue Tasks

• Deadline Compliance

• Team Performance

• Workload Balance

• Penalty History

• Overall Productivity

This should be informational only.

Do not expose formulas.

---

# SMART STATUS COLORS

The Health Score should dynamically change color depending on its value.

90–100

Green

Status

Healthy

70–89

Amber

Status

Moderate Risk

Below 70

Red

Status

Critical

The circular indicator, status badge, and accent colors should update automatically.

---

# TOOLTIP

When hovering over the Project Health Score card, show a tooltip explaining:

"Project Health Score represents the overall health of the project based on task completion, deadline compliance, workload balance, team performance, overdue tasks, and penalty history."

---

# MICRO INTERACTIONS

Include subtle modern animations.

• Card lifts slightly on hover.

• Soft shadow increases on hover.

• Circular progress animates smoothly from 0% to the current score on page load.

• Progress bars animate smoothly.

• Status badge fades between states.

Animations should be clean and minimal.

---

# RESPONSIVE BEHAVIOR

Desktop

Show all five KPI cards in a single row.

Tablet

Arrange into two rows while maintaining equal spacing.

Mobile

Stack KPI cards vertically.

The Project Health Score should always remain visible near the top of the dashboard.

---

# VISUAL PRIORITY

The Project Health Score should be slightly more prominent than the other KPI cards.

Use:

• Slightly larger typography

• Circular progress visualization

• More whitespace

• Stronger visual hierarchy

Without making the dashboard feel cluttered.

---

# DESIGN GOAL

The Project Health Score should become the very first KPI an Admin notices after logging into the system.

It should instantly answer one question:

**"How healthy is my project right now?"**

The feature must seamlessly integrate with the existing Task Delegation and Tracking System and reinforce the project's core philosophy of providing a **Zero-Clutter Bird's Eye View** of project status, task delegation, and team performance. It should feel like a premium enterprise feature that naturally belongs within the existing dashboard rather than a separate module or redesigned page.
