# Haute Habits

*Eat well. Move well. Spend well.* Haute Habits is a phone app for meal plans on a budget, workouts and groceries.

---

## ⭐ Start here: Claude Code, publishing, and installing on your phone

You'll go through three steps once: **(1)** open the project in Claude Code, **(2)** publish it to a free web address with GitHub Pages, and **(3)** install it on your phone from that address. After that, the app sits on your home screen with the Haute Habits icon, opens full-screen like a regular app and works offline.

### Step 1 · Open this project in Claude Code

Claude Code is Claude set up to read, edit and run things in a project folder. It reads `CLAUDE.md` automatically, so it already knows this project's rules: no AI calls, no secret keys, plain-language explanations, and no git until you say so.

**Option A: the Claude desktop app (easiest)**
1. Open the Claude desktop app and sign in. Claude Code needs a paid Claude plan.
2. Click the **Code** tab.
3. Choose this folder: `Desktop › FALL 2026 › AI and Legal Reasoning › AI Project 3 App`.

**Option B: the Terminal (Mac)**
1. Open **Terminal** (press Cmd+Space, type "Terminal", then press Return).
2. Install Claude Code (you only need to do this once):
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```
3. Close Terminal, open it again, and check that it worked: `claude --version`
4. Go to this folder. The quotes matter because the folder names have spaces:
   ```bash
   cd ~/Desktop/"FALL 2026"/"AI and Legal Reasoning"/"AI Project 3 App"
   ```
5. Type `claude` and sign in when it asks.

### Step 2 · Publish it with GitHub Pages (free)

You need a free GitHub account first. Sign up at github.com and pick your username carefully, because it becomes part of the app's address.

**Let Claude Code do it.** Paste this into Claude Code:

> Read CLAUDE.md. I'm ready to publish. Please put this folder in a new **public** GitHub repository named **haute-habits** and turn on **GitHub Pages** from the main branch, root folder. Walk me through any sign-in steps one at a time, and tell me the final web address.

Claude Code will ask your permission before running commands. When GitHub needs you to sign in, it opens a browser page where **you** type your own password; never paste a password into the chat.

**Or do it by hand on github.com (no Terminal):**
1. On github.com, click **+ → New repository**, name it `haute-habits`, choose **Public**, and click **Create repository**.
2. Click **uploading an existing file**. Drag in `index.html`, `style.css`, `app.js`, `meals.js`, `sw.js` and `manifest.webmanifest`, plus the whole **`icons`** folder. Then click **Commit changes**.
3. Go to **Settings → Pages**. Under "Branch," choose **main** and **/ (root)**, then click **Save**.
4. Wait a minute or two. Your app will be live at **`https://YOUR-USERNAME.github.io/haute-habits/`**.

### Step 3 · Install it on your phone

Open the address from Step 2 on your phone:
- **iPhone:** open it in **Safari**, tap the **Share** button (the square with an arrow), scroll down, tap **Add to Home Screen**, then **Add**.
- **Android:** open it in **Chrome**, tap the **⋮** menu, then **Install app** or **Add to Home screen**.

The Haute Habits icon appears on your home screen. The app opens full-screen without browser bars and works offline after the first visit. Your data stays on your phone.

### Updating the app later
1. Ask Claude Code for the change, for example *"Propose a plan to add a water tracker and wait for my approval."*
2. Ask it to **bump `CACHE_VERSION` in `sw.js`** (for example `v1` → `v2`) and publish the update to GitHub.
3. On your phone, close the app and open it again (sometimes twice) to get the new version.

### Tips for working with Claude Code
- **Ask for a plan first:** "Propose a plan and wait for my approval before writing code."
- **Ask it to test:** "Open index.html in a phone-sized browser and walk through the README test checklist."
- **Make one change at a time,** then double-click `index.html` to check it yourself.
- **Keep a backup:** before a big change, copy this whole folder.
- Official guide: https://code.claude.com/docs/en/overview

---

## About the app

It runs entirely in the browser. It does **not** call any AI service, needs **no secret keys**, and sends **no data anywhere**. Everything is saved only on your device (in the browser's local storage).

## Welcome screen

New users first see a purple-and-café-noir cover with the tagline *Eat well. Move well. Spend well.* and a **Begin your week** button that opens the Goals tab. It only appears on the first visit, and again after **Reset everything**.

## The five tabs

1. **Goals.** These are your settings:
   - your first name (for the greeting)
   - your goal: lose, maintain, or build muscle
   - your eating style: no preference, vegetarian, vegan, or high-protein
   - **Foods I eat**: untick any of Chicken & turkey, Seafood & fish, Beef, Pork, or Vegetarian
   - a weekly budget range in $20 steps, from $20–$40 up to $280–$300
   - 2 or 3 meals a day
   - a daily calorie target, set one of three ways:
     - **Claude's quick suggestion** uses sex, age and activity with a built-in table simplified from the *Dietary Guidelines for Americans*, then adjusts for your goal (−400 to lose, +300 to build). Claude wrote these rules into the app ahead of time; nothing contacts Claude while the app runs.
     - **Estimate from body stats** uses the Mifflin-St Jeor formula.
     - **Type your own** lets you enter any number.
     - The suggestion and the estimate never go below 1,200 cal/day (female) or 1,500 cal/day (male).
2. **Plan.** One tap builds 7 days of meals.
   - The planner sticks to your style and food categories, gets close to your calories (using 1×, 1.5× or 2× portions), stays under budget and avoids repeats.
   - **Swap** any meal; the one you pick gets locked. **Lock 🔒** meals to keep them when you rebuild the week.
   - You see the estimated cost against your range, plus average calories and protein.
3. **Meals.**
   - Browse **102 built-in meals** with category filters and a search box. There are 53 vegetarian (30 of them vegan), 21 chicken & turkey, 12 seafood & fish, 8 beef and 8 pork.
   - **Add your own meal** with a name, category, meal times, cost, calories, protein and ingredients. Your meals show a ★ and the planner picks them a little more often.
4. **Workouts.**
   - **Log a workout** by choosing the type, minutes, date, how hard it felt and an optional note.
   - See this week's minutes, number of workouts and estimated calories burned, plus a bar for each day.
   - Set a weekly goal (minutes or number of workouts) and build a 🔥 streak of weeks where you hit it.
   - Calories burned are estimated with standard MET values. The app uses your weight if you chose "Estimate from my body stats" on Goals, and 150 lb otherwise.
5. **Groceries.** One combined checklist for the week, with amounts rounded up. You can check items off and copy the list.

## Files

| File | What it is |
|---|---|
| `index.html` | The main page and its layout |
| `style.css` | The look. All colours are set at the top |
| `app.js` | The planning rules, calorie math, workouts and buttons |
| `meals.js` | The built-in meal library |
| `manifest.webmanifest` | Tells phones the app's name, colours and icon so it can be installed |
| `sw.js` | Saves the app on the phone so it opens offline (bump `CACHE_VERSION` after changes) |
| `icons/` | The app icon (the "minimal plate": a plate with the `Hh` monogram) in several sizes |
| `CLAUDE.md` | Project rules that Claude Code reads automatically |
| `README.md` | This file |

## Try it on your computer

Double-click `index.html`. It opens in your browser and works without internet. To see the phone layout in Chrome, right-click the page, choose **Inspect**, then click the phone/tablet icon at the top of the panel.

## Test checklist

| # | Try this | You should see |
|---|---|---|
| 1 | Type your name and save | "Good morning/afternoon/evening, *Name*" at the top |
| 2 | Eating style **Vegan**, budget **$20–$40**, save | Meat categories greyed out. No meat, eggs or dairy in the plan. Total at or under $40. |
| 3 | Style **No preference**, untick **Pork** and **Beef**, save | No pork or beef meals in the week |
| 4 | **Swap** a meal and pick another | The new meal shows 🔒, and **Rebuild week** keeps it |
| 5 | **Meals** tab: tap **Pork**, then search "salmon" with **All** selected | Only pork meals show, then only salmon meals |
| 6 | Add your own meal with ingredients, then **Rebuild week** | Your ★ meal shows up, and its ingredients appear in **Groceries** |
| 7 | **Workouts**: log 40 min of hard cardio | Minutes, workout count, estimated calories and today's bar all update |
| 8 | Try logging 900 minutes | An error message |
| 9 | Set the goal to 2 workouts, then log 2 workouts | 100%, "You hit your goal" and a 🔥 streak |
| 10 | Check grocery items and reload the page | Everything is still there |
| 11 | Budget **$20–$40**, goal **Build muscle**, type **3500** calories | A warning that the budget is too tight for that many calories |
| 12 | Enter age **12** | An error saying the app is for adults |
| 13 | **Reset everything** (tap twice) | Everything clears and the welcome screen shows again |
| 14 | Open the app for the first time | The welcome screen appears, and **Begin your week** goes to Goals. It doesn't appear again after a reload. |
| 15 | After publishing, install it on your phone and turn on airplane mode | The app still opens and shows your plan |

## Changing the name or colours

- **Name:** change `APP_NAME` at the top of `app.js`, and the `<title>` line near the top of `index.html`.
- **Colours:** change the variables under `:root` at the top of `style.css`. The current palette is purple `#6F29B5`, lavender `#A478D4`, lilac `#D9C7F2`, brown `#8E5737` and café noir `#513012`.

## Limits (possible future features)

- Costs and nutrition are rough estimates, not real store prices or lab values.
- There are no accounts. Data lives in one browser on one device and doesn't sync between your phone and laptop.
- Workouts don't change the meal plan's calorie target automatically; the activity level on Goals is the link between the two.
- There are no exercise libraries, step counting or fitness-watch syncing.

## Disclaimer

This is a student project for planning purposes only. It is not medical, nutrition or fitness advice.
