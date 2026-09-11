# Campus Signal

626f6c742d63632d6167656e74I've gathered additional event data from Drishti CET's social media and the snaptiqz discover page. I also confirmed that the Supabase database is not available in this session (no database provisioned yet), so persistence will need to use the mock data in React state with the option to wire up the database later once it's provisioned.

Here is the updated plan:

---

**Plan: CampusSignal — AI-Powered Campus Triage & Logistics App**

**1. Foundation & Design System**

- Set up the dark-mode visual foundation: deep obsidian background (#0B0F17), elevated card surfaces (#161B26), crisp 1px borders (#2E3648), and the Inter font family with monospace for dates, times, and venue badges

- Configure the four category accent colors as reusable design tokens: Crimson (#EF4444) for Critical Actions, Cyan (#06B6D4) for Schedule Shifts, Emerald (#10B981) for Opportunities, and Amber (#F59E0B) for Conflict Alerts

- Create a glassmorphism navbar with the "CampusSignal" brand name and a subtle green live-pulse dot animation

- Build the user profile chip in the header: "Mohammed Marzuq A - S4 CSE (Roll 46) - IEEE SB Coordinator" with a clean avatar

- Add the primary "[Catch Me Up]" button that opens a summary modal which dynamically counts events from the loaded data (e.g., "You missed 18 messages. 3 require action today." -- the "3" is calculated by counting cards with category "action" whose date is today or earlier)

**2. Expanded Mock Data with Real Drishti '26 Events**

- Load the original 6 mock events into React state as the initial feed

- Add additional real Drishti '26 events scraped from social media and the snaptiqz discover page:

  - "Signal Showdown" (IET x Drishti) -- Sept 19, Reg Rs 149, Prize Pool Rs 3000, CET Campus

  - "TinyML: From Zero to Edge Intelligence" Workshop -- Sept 18-19, Reg Rs 399, IEEE SB CET, KTU Activity Points available

  - "Sangraha '26: Exhibition & Competition of Collectibles" -- Sept 20, Reg Rs 49, Prize Pool Rs 6000, KTU Activity Points

  - "Drishti '26 Project Expo" -- Sept 18-20, Reg Rs 49 (Rs 300 per team), Prize Pool Rs 1 Lakh

  - "Workshop on Nix and NixOS" -- Sept 19, Free, KTU Activity Points

  - "Drishti For Juniors x LITSOC" -- Sept 19, 10 AM-5 PM, Reg Rs 499, Prize Pool Rs 10,000

  - "Shaan Rahman Live in Concert" -- Sept 19 evening, CET Campus (cultural highlight event)

- Tag each new Drishti event with appropriate category (opportunity/action), source ("discover.snaptiqz.com (Scraped)" or "Drishti Instagram"), venue, organizer, and conflict data where overlaps exist with the DotSlash events on Sept 19

**3. Universal Ingest Bar & AI Parsing Simulation**

- Build a tabbed input card at the top of the feed with three tabs: WhatsApp Text, Upload Poster, Upload Notice

- Add three pre-filled "Quick Demo" buttons below the input:

  - Demo 1: "Guys sir said KTU DBMS Lab project proposal due tmrw 4pm. No extension."

  - Demo 2: "IEEE CS Workshop on TinyML - Tomorrow 4:30 PM at Seminar Hall."

  - Demo 3: "Notice: OS Internal exam shifted from Thursday to Friday 10 AM."

- When a demo button is clicked, show a 1-second scanning animation with the text "Parsing entity, urgency, and dates..." to simulate AI processing

- After the animation, prepend a newly structured event card to the top of the feed with parsed category, title, date, time, and venue automatically extracted and displayed

**4. Smart Triage Feed & Event Cards**

- Render the full event list (original 6 + new Drishti events) as cards in the feed

- Build filter tabs above the feed: "All", "Academics", "Opportunities", "Analytics" that filter the visible cards by category

- Design each event card to display: category badge with the correct accent color, title, source snippet tag, date/time in monospace, venue, and organizer

- Add a "Coordinator" badge and a "[Generate Duty Leave]" button on cards where the user's role is Coordinator

- Render a highly visible amber warning box inside any card that has a conflict or attendance prediction, making scheduling clashes immediately scannable

- The new Drishti events on Sept 19 that overlap with DotSlash events (10 AM-1 PM slot) should show conflict warnings automatically

**5. Conflict Engine & Risk Assessment Modal**

- When a user clicks the amber warning on a conflicting card (such as "Reverse Coding", "Drishti '26 Day 2 Pass", "Signal Showdown", or "TinyML Workshop"), open a "Risk Assessment" modal

- Inside the modal, display a visual overlapping timeline showing the clashing events side by side with their time ranges, making the overlap visually obvious

- Include the attendance prediction text (e.g., "Low - 40% Drop Expected") and a plain-language explanation of why the conflict exists

- Add a dismiss/close action so users can acknowledge and return to the feed

**6. Command Palette (Global Search)**

- Implement a floating search bar at the top with placeholder text "Press Cmd+K to search campus notices or ask AI what to do..."

- When Cmd+K (or Ctrl+K on Windows) is pressed, dim the background and open a Spotlight-style search modal

- The modal should instantly filter all events as the user types, showing matching event cards by title, venue, organizer, or category

- Support keyboard navigation (arrow keys to move through results, Enter to select, Escape to close)

**7. KTU Utility Hub, Activity Points & "What Should I Do?" Drawer**

- Build the Duty Leave Generator modal: when the "[Generate Duty Leave]" button is clicked on a coordinator card, instantly display a pre-filled formal letter on screen addressed to the CSE HOD, automatically inserting the student ID (TVE24CS101), event name, date, and venue from the card data -- no download or copy button needed, just the formatted letter displayed in the modal

- Add a circular activity points widget in the sidebar showing "KTU Activity Points: 85/100 (S4 Target)" with a progress ring visualization

- Build a floating action button in the bottom-right corner labeled "2 Hours Free Plan"

- Clicking it opens a slide-over drawer that reads the event data, identifies the nearest deadline, and suggests a prioritized action plan (e.g., "Work on the DBMS Lab Project Proposal first -- due September 14")

- Ensure the entire app is fully responsive across mobile, tablet, and desktop screen sizes

---

**Summary:** This plan builds CampusSignal as a polished dark-mode single-page app with a smart triage feed of campus events. I've enriched the mock data with 7 additional real Drishti '26 events found through web research (Signal Showdown, TinyML Workshop, Sangraha, Project Expo, Nix/NixOS Workshop, Drishti For Juniors, and Shaan Rahman Concert), all falling on Sept 18-20 which creates natural scheduling conflicts with the DotSlash events on Sept 19. The standout features remain the AI parsing simulation, the visual conflict timeline, the auto-generated duty leave letter, and the global command palette. Note: the Supabase database is not yet provisioned for this project, so data will live in React state for now -- once the database is available, the same data can be migrated to a table with full CRUD support.

One note: I was unable to directly extract content from the snaptiqz discover page (it blocked automated fetching), so the Drishti event details were gathered from Facebook, Instagram, and LinkedIn posts by Drishti CET instead. The data is accurate to the best of what's publicly available.

626f6c742d63632d6167656e74**Plan: CampusSignal — Correct DotSlash Schedule Integration**

**1. Correct the Campus Calendar**

- Update DotSlash to run on **September 11 and 12, 2026**, replacing the incorrect September 19 date

- Treat the provided image as the official **September 11 schedule**

- Add the September 11 events exactly as shown:

  - 10:00 AM — Inauguration Ceremony — CETAA Hall

  - 10:00 AM–12:30 PM — Build with ESP32 — CS116

  - 1:00–2:30 PM — Automate Everything: Master n8n — CS115

  - 10:00 AM–1:00 PM — Rapid Prototyping — CS217

  - 11:00 AM–1:00 PM — Reverse Coding — CS103

  - 2:00–4:00 PM — The Turing Heist — CS104

  - 10:00–11:30 AM — AI Tools Workshop — CS214

  - 10:00 AM–12:00 PM — Scratch Workshop — CS104

  - 10:30 AM–12:00 PM — Smart Surfing: Cybersecurity Workshop — CS312

  - 11:00 AM–12:30 PM — PC Hardware Workshop — CS206

  - 2:00–4:00 PM — Understanding Open Source Ecosystems — SDPK Hall

- Make the date clearly visible on every DotSlash card so users can distinguish September 11 from September 12

**2. Improve the Schedule Conflict Experience**

- Recalculate all conflict warnings using the corrected September 11 date

- Highlight overlaps among DotSlash activities, such as:

  - Rapid Prototyping overlapping with Reverse Coding

  - Rapid Prototyping overlapping with Build with ESP32

  - Multiple junior workshops running at the same time

- Show conflicts as amber alerts directly inside the relevant cards

- Update the Risk Assessment view to show the correct September 11 time ranges and venues

- Keep September 12 available for the second-day schedule once its official schedule is provided

**3. Update the Feed and Daily Planning Tools**

- Add a date selector or daily schedule view so students can switch between September 11 and September 12

- Make the “What Should I Do?” drawer prioritize the nearest upcoming activity based on the selected day and current time

- Update the dynamic “Catch Me Up” count so it includes only relevant current and upcoming actions

- Keep the Drishti events separate from DotSlash unless their dates and times genuinely overlap

- Add a clear “Today at DotSlash” summary area for the September 11 schedule

**4. Preserve the Existing CampusSignal Features**

- Keep the WhatsApp, poster, and notice ingest tabs with the three quick-demo announcements

- Keep the global command palette for searching notices, events, venues, and organizers

- Keep the coordinator Duty Leave letter display with the correct event date and venue

- Keep the KTU activity-points widget and responsive dark interface

- Store the event information in the shared campus data source when database access is available, while retaining the supplied mock schedule as the initial content

**5. Add the September 12 Schedule Safely**

- Create a separate September 12 schedule rather than guessing missing events

- Avoid presenting unverified activities to students

- Recalculate conflicts automatically after the official second-day schedule is added

- Label externally sourced Drishti information clearly so students can distinguish it from the official DotSlash poster

**Questions before implementation:**

1. Please provide the **September 12 DotSlash schedule image or event list** so it can be added accurately.

2. Should the app open on **September 11 as “Today”**, or should it always open on the full event feed?

3. For the image upload feature, should the uploaded schedule remain visible as a reference inside the app, or should only its extracted events be shown?

**Summary:** The main correction is to move DotSlash from September 19 to September 11–12 and use the supplied poster as the official September 11 schedule. The conflict engine, daily planner, dynamic counts, and Duty Leave letters will all use these corrected dates and times. The September 12 schedule should be added only after you provide its official details, so CampusSignal does not show inaccurate information. Please switch back to build mode using the “Implement this plan” button after confirming the remaining details.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://campus-signal-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2ef2ab67-1244-479b-a7e4-3a94c32c2590).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
