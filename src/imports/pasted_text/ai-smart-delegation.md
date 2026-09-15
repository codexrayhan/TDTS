Act as an expert UI/UX Designer. Continue enhancing the existing "Task Delegation and Tracking System" by adding a new intelligent feature called "AI Smart Delegation Recommendation". This is an enhancement to the current design, NOT a redesign. Maintain complete visual consistency with the existing Light Mode UI, preserving all current layouts, navigation, typography, colors, spacing, interactions, and components.

CRITICAL REQUIREMENTS

- Do NOT redesign the application.
- Do NOT remove any existing UI components.
- Keep the Sidebar, Header, Dashboard, Kanban Board, Gantt Chart, Task Management, Super Admin, Employee Dashboard, Leaderboard, and all existing screens unchanged.
- Only enhance the existing "Create Task" and "Delegate Task" modals with intelligent AI-assisted delegation.
- Maintain the "Zero-Clutter Bird's Eye View" philosophy.

--------------------------------------------------

DESIGN SYSTEM

Use the existing design language.

Font:
Inter

Background:
#F8F9FA

Cards:
White (#FFFFFF)

Primary Color:
Royal Blue (#2563EB)

Success:
Emerald Green (#10B981)

Warning:
Amber Yellow (#F59E0B)

Danger:
Alert Red (#EF4444)

Rounded Corners:
8–12px

Use the same spacing, shadows, typography, and Auto Layout principles already established throughout the project.

--------------------------------------------------

NEW FEATURE

AI SMART DELEGATION RECOMMENDATION

The system should intelligently recommend the most suitable employee whenever an Admin creates a task or delegates a sub-task.

The recommendation should feel like an integrated assistant instead of a chatbot.

--------------------------------------------------

LOCATION 1

CREATE TASK MODAL

Enhance the existing Assignee selection field.

Current

Assignee

▼ Select Employee

Replace with an intelligent recommendation panel.

Example

AI Recommended

⭐ Alice Johnson

92% Match

Reason

✓ Frontend Specialist

✓ Lowest Current Workload

✓ 96% On-Time Completion Rate

✓ Completed 18 Similar Tasks

✓ Available This Week

Primary Button

Assign Recommended

Below this recommendation, continue displaying the complete employee dropdown so the Admin can manually choose another employee if desired.

--------------------------------------------------

LOCATION 2

DELEGATE TASK MODAL

For every sub-task assignment row, display an AI recommendation.

Example

Sub-task

Frontend Development

Recommended Employee

⭐ Alice Johnson

94% Match

Reason

✓ React Expert

✓ Low Workload

✓ Available

Assign ▼

--------------------------------------------------

Another example

Sub-task

UI Design

⭐ Sarah Williams

95% Match

Reason

✓ UI/UX Specialist

✓ Fast Completion History

✓ High Quality Score

--------------------------------------------------

Sub-task

Testing

⭐ David Lee

91% Match

Reason

✓ QA Expert

✓ Available

✓ Similar Project Experience

--------------------------------------------------

SMART MATCH SCORE

Each recommendation should display a circular Match Score.

Examples

95%

92%

88%

The Match Score should use color coding.

90–100

Green

70–89

Amber

Below 70

Red

--------------------------------------------------

WHY THIS PERSON?

Every recommendation should include a compact explanation.

Possible factors

Skill Match

Current Workload

Past Performance

Availability

Task Completion Rate

Experience with Similar Tasks

These should be shown as clean bullet points with icons.

--------------------------------------------------

ALTERNATIVE EMPLOYEES

Under the primary recommendation display

Other Suitable Employees

Bob

85%

Sarah

82%

David

79%

Allow the Admin to override the recommendation manually.

--------------------------------------------------

WORKLOAD INDICATOR

Continue using the existing workload indicator.

Green

Available

Yellow

Busy

Red

Overloaded

Display this beside every employee name.

--------------------------------------------------

MICRO INTERACTIONS

Include subtle modern animations.

• Recommendation card fades into view.

• Match Score animates from 0% to its final value.

• Hovering over a recommendation slightly elevates the card.

• "Assign Recommended" button has a soft hover animation.

• Employee cards smoothly highlight when selected.

--------------------------------------------------

TOOLTIP

Hovering over the Match Score should display

"This recommendation is calculated using employee skills, workload, availability, previous performance, and experience with similar tasks."

--------------------------------------------------

DESIGN GOAL

The AI Smart Delegation Recommendation should make task assignment faster, smarter, and more efficient without changing the existing workflow.

It should feel like a premium enterprise AI assistant that naturally belongs inside the Task Delegation and Tracking System.

The recommendation should assist the Admin, but always allow manual employee selection.

The feature should integrate seamlessly into the existing Create Task and Delegate Task modals while preserving the clean, minimalist, Zero-Clutter Bird's Eye View design philosophy.