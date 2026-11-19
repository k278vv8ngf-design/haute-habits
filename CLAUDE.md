# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is a law student's class project (AI and Legal Reasoning): a simple, phone-friendly health web app that plans meals around health goals and a grocery budget, and tracks workouts. The app is called **Haute Habits** (renamed from "Plate & Budget").

## Rules for this project

- **No AI services, no API calls, no secret keys.** Everything runs in the browser with plain HTML, CSS and JavaScript. "Claude's quick suggestion" for calories is a built-in table of rules (`GUIDE_TABLE` in `app.js`), not a live AI call.
- **No build tools or frameworks.** Don't add npm packages, React, bundlers or external fonts and CDNs. The app must work by double-clicking `index.html`, and on GitHub Pages.
- **Keep all files in this folder** and use relative links. The main page must stay `index.html`.
- **Don't run git commands or connect to GitHub** unless the owner explicitly asks. The app will be published later on GitHub Pages.
- **Data stays on the device.** Use `localStorage` (key `plateBudget.v1`) only. Never send user data anywhere. If you change the saved data's shape, keep older saves loading (see `load()` in `app.js`).
- **Explain changes in plain language.** The owner is a law student, not a programmer. Propose a plan and get approval before large new features.
- **Installable app (PWA):** `manifest.webmanifest` + `sw.js` make it installable and offline-ready on GitHub Pages. **Whenever you change any app file, bump `CACHE_VERSION` in `sw.js`** and add any new file to its `FILES` list.
- Keep the disclaimer: estimates only, not medical, nutrition or fitness advice. Ages 18+ only.

## Running and testing

There is no build, lint or automated test suite.

- **Quick check:** open `index.html` directly in a browser at phone width (about 390px), then go through the numbered test checklist in `README.md`. Check the browser console for errors after every change.
- **Service worker / offline:** `sw.js` only registers over `http(s)`, never from `file://`. To test caching or `localStorage` in the Claude browser pane, serve the app over http. macOS blocks Python's server from running inside the Desktop folder, so copy the app files to a temp folder and run `python3 -m http.server 8765` there. `.claude/launch.json` points the preview at `http://localhost:8765`.
- **Publishing:** the app is live at https://k278vv8ngf-design.github.io/haute-habits/ (repo `k278vv8ngf-design/haute-habits`, GitHub Pages from `main`, root). `.gitignore` keeps the `Haute-Habits-*.png` previews and `.claude/` out of the repo. The GitHub CLI (`gh`) is not installed system-wide, so download it again if needed. Only push when the owner asks.

## Architecture

- `index.html` loads `meals.js` (sets the global `window.MEALS`) and then `app.js`. All markup for the welcome cover and the 5 tabs is static in `index.html`. Each tab is a `<section id="tab-NAME">` with a matching `#nav-NAME` button, and `showTab()` toggles `hidden`. Tab names in code: `setup` (Goals), `week` (Plan), `meals`, `workouts`, `groceries`.
- `app.js` is one IIFE (ES5 style: `var`, `function`) with numbered sections listed in its header comment. A single `state` object (`settings`, `plan`, `checked`, `customMeals`, `workouts`, `workoutGoal`, `log`, `prices`, `store`, `seenWelcome`) is loaded once, changed by event handlers, then `save()` and the relevant `render*()` run. `renderAll()` redraws everything.
- Dynamic UI is built with the `el(tag, props, ...children)` helper (text goes in via `textContent`), not `innerHTML`. Keep it that way, because custom meal names are user input.
- **Meals:** `MEALS` = built-in `window.MEALS` + `state.customMeals` (custom ones have `custom: true` and an id starting with `c`). Call `refreshMeals()` after changing custom meals so `MEAL_BY_ID` stays in sync.
- **Plan shape:** `state.plan = { mealsPerDay, variety, days }`, where `days` is always 7 arrays of slot entries `{ mealId, portion, locked }`. Slots come from `SLOT_SETS[mealsPerDay]`, each with a share of daily calories and budget.
- **Meal variety / meal prep:** `settings.variety` (1, 2 or 7) picks `VARIETY_GROUPS`, i.e. which days share the same meals. The planner, Swap, Lock and rendering all work per group (`planGroups()`, `setGroupEntry()` writes the same meal to every day in a group). Variety 7 = one group per day, which is the original behaviour.
- **Foods I don't eat:** `settings.avoid` is a list of lowercase words. `avoidedWord()` matches them as whole words (with plurals) against meal names and ingredient items, and `fits()` rejects matches. On the Goals form the list is edited as `avoidDraft` and saved on submit.
- **Planner (`buildPlan`):** keeps locked meals that still pass `fits()` (eating style + food categories), then fills each slot greedily by `scoreMeal` (calorie error, per-slot budget overrun, repeats, protein bonus, small boost for custom meals, plus a little randomness), choosing a portion of 1×, 1.5× or 2× (`bestPortion`). After that, `trimToBudget` swaps unlocked meals for cheaper ones until the week fits `settings.budget`, which is the top of a $20 range.
- **Calorie target (`calorieInfo`):** three modes: the guideline table, Mifflin-St Jeor, or a typed number. Goal adjustments are in `GOAL_ADJUST` and the safety floors in `MIN_CAL`.
- **Groceries** are derived from the plan (ingredients × portion, merged by `item|unit`). `state.checked` holds the ticked keys. Typed prices live in `state.prices[storeKey][itemKey] = { p, b }` (price, brand) for the store in `state.store` (see `STORES`). Typing a price ticks the item, and `renderCartBar()` updates the sticky total without re-rendering the list, so inputs keep focus. There are no live store prices on purpose (see the rules above).
- **Today / food log:** `state.log["YYYY-MM-DD"]` is a list of `{ id, name, cal, protein?, slot? }`. Entries with `slot` come from "Ate it" on today's planned meals; the rest are typed in. The log is pruned to about 90 days. "Left" = calorie target + today's workout calories − eaten.
- **Workouts** estimate calories with MET values from `WORKOUT_TYPES`. Weeks start on Monday (`mondayOf`), and dates are stored as `YYYY-MM-DD` strings.

## Making common changes

- **Adding built-in meals:** follow the field notes at the top of `meals.js` (unique `id`, valid `category`, `slots`, tags). Check for duplicates by dish, not just by name, and reuse existing ingredient names and units exactly (`item|unit` is the grocery merge key). New ingredients may need a keyword in `FOOD_ICONS` in `app.js` for their grocery picture (rule order matters). When drawing on outside recipe sites, use dish names only and write our own ingredients and estimates. Then update the meal counts in `README.md`, which lists the total and the count per category, and in this file.
- **Renaming the app:** `APP_NAME` in `app.js`, the `<title>` in `index.html`, `name`/`short_name` in `manifest.webmanifest`, and the `CACHE_VERSION` prefix in `sw.js`.
- **Changing the icon:** edit `icons/icon.svg`, then re-render the PNGs (192, 512, maskable 512, apple-touch). The `Haute-Habits-*.png` files in the root folder are preview images, not part of the app, and are not cached.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page layout: a welcome cover on the first visit, then 5 tabs (Goals, Plan, Meals, Workouts, Groceries) and a bottom tab bar |
| `style.css` | Calm wellness look. All colours are variables in `:root` |
| `app.js` | All logic. `APP_NAME` at the top renames the app |
| `meals.js` | Built-in meal library (162 meals: ids `b`, `m`, `p`, `e`, `f`, `c`, `v` and `n1`–`n60`). Each meal has id, category, name, slots, cost, cal, protein, tags and ingredients |
| `README.md` | Start-here steps (Claude Code, publishing, installing on a phone), then what the app does and a test checklist |
| `sw.js` | Service worker: network-first, with the cache as the offline fallback |
| `manifest.webmanifest`, `icons/` | Install info and the app icon: the "minimal plate" (a plate with the `Hh` monogram) (`icons/icon.svg` is the source; the PNGs are rendered from it) |

## Design

- **Palette:** royal purple `#6F29B5`, lavender `#A478D4`, lilac `#D9C7F2`, brown `#8E5737`, café noir `#513012`, on a warm linen background (`#f6f1ea`).
- **Look:** serif headings (system serif fonts), rounded cards with soft shadows, pill-shaped buttons and chips, a floating tab bar, and a "Good morning, name" greeting.
- **Meal categories:** `chicken` (chicken & turkey), `seafood`, `beef` (labelled "Beef & lamb"; lamb meals use it), `pork`, `vegetarian`. Vegetarian meals carry the tag `"vegetarian"`, and vegan meals also carry `"vegan"`.
