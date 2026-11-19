/*
  Haute Habits — app logic
  --------------------------
  Everything runs in the browser. No AI service, no server, no keys.
  Data is saved with localStorage so it stays on this device only.

  Sections in this file:
    1. Settings & constants  (APP_NAME is here: change it to rename the app)
    2. Saving / loading
    3. Calorie target (Claude's quick suggestion, estimate, or typed)
    4. Meal planning rules
    5. Screens: Goals, Plan, Meals, Workouts, Groceries
    6. Start-up
*/
(function () {
  "use strict";

  /* ========== 1. Settings & constants ========== */
  var APP_NAME = "Haute Habits";   // ← change the app's name here (and in index.html <title>)
  var STORE_KEY = "plateBudget.v1";
  var DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var DAY_SHORT = ["M", "T", "W", "T", "F", "S", "S"];

  var CATEGORIES = [
    { key: "chicken", label: "Chicken & turkey" },
    { key: "seafood", label: "Seafood & fish" },
    { key: "beef", label: "Beef & lamb" },
    { key: "pork", label: "Pork" },
    { key: "vegetarian", label: "Vegetarian" }
  ];
  var CAT_LABEL = {};
  CATEGORIES.forEach(function (c) { CAT_LABEL[c.key] = c.label; });
  var ALL_CATS = CATEGORIES.map(function (c) { return c.key; });

  // Meal times for each "meals per day" choice, with the share of daily calories each gets.
  var SLOT_SETS = {
    3: [
      { key: "breakfast", label: "Breakfast", share: 0.25 },
      { key: "lunch", label: "Lunch", share: 0.35 },
      { key: "dinner", label: "Dinner", share: 0.40 }
    ],
    2: [
      { key: "lunch", label: "Lunch", share: 0.45 },
      { key: "dinner", label: "Dinner", share: 0.55 }
    ]
  };
  var PORTIONS = [1, 1.5, 2];           // portion sizes the planner may suggest
  var GOAL_ADJUST = { lose: -400, maintain: 0, build: 300 };
  var MIN_CAL = { female: 1200, male: 1500 }; // common safety floors
  var ACTIVITY_FACTOR = { sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725 };
  var ACTIVITY_WORDS = {
    sedentary: "mostly sitting", light: "light exercise",
    moderate: "moderate exercise", very: "hard exercise"
  };

  /*
    Claude's quick suggestion: a small built-in table of typical daily calorie needs,
    simplified from the general ranges in the U.S. Dietary Guidelines for Americans.
    Values are [sedentary, moderately active, active]. "Light" uses the midpoint.
  */
  var GUIDE_TABLE = {
    female: { young: [2000, 2200, 2400], mid: [1800, 2000, 2200], older: [1600, 1800, 2000] },
    male:   { young: [2400, 2800, 3000], mid: [2200, 2600, 3000], older: [2000, 2400, 2600] }
  };

  /*
    Workouts: MET values (a standard measure of effort) for easy / moderate / hard.
    Calories burned ≈ MET × body weight (kg) × hours. Rough estimates only.
  */
  var WORKOUT_TYPES = [
    { key: "strength", label: "Strength", met: [3.5, 5, 6] },
    { key: "cardio", label: "Cardio", met: [5, 7, 9.8] },
    { key: "walking", label: "Walking", met: [2.8, 3.5, 4.5] },
    { key: "yoga", label: "Yoga & stretching", met: [2, 2.5, 3.5] },
    { key: "pilates", label: "Pilates", met: [2.8, 3.8, 5] },
    { key: "sports", label: "Sports", met: [4.5, 6.5, 8] },
    { key: "other", label: "Other", met: [3, 4.5, 6] }
  ];
  var WORKOUT_BY_KEY = {};
  WORKOUT_TYPES.forEach(function (w) { WORKOUT_BY_KEY[w.key] = w; });
  var INTENSITY_WORDS = ["Easy", "Moderate", "Hard"];

  // Meal variety: which days share the same meals.
  //   1 = meal prep (one set for the week), 2 = Mon–Thu + Fri–Sun, 7 = every day different
  var VARIETY_GROUPS = {
    1: [[0, 1, 2, 3, 4, 5, 6]],
    2: [[0, 1, 2, 3], [4, 5, 6]],
    7: [[0], [1], [2], [3], [4], [5], [6]]
  };

  // Stores for the grocery price tracker. Prices are typed in by the user, never fetched.
  var STORES = [
    { key: "traderjoes", label: "Trader Joe's" },
    { key: "heb", label: "H-E-B" },
    { key: "aldi", label: "Aldi" },
    { key: "walmart", label: "Walmart" },
    { key: "target", label: "Target" },
    { key: "wholefoods", label: "Whole Foods" }
  ];
  var STORE_KEYS = STORES.map(function (st) { return st.key; });

  // A small picture for each grocery item, chosen by keywords in its name.
  var FOOD_ICONS = [
    [/peanut/, "🥜"], [/soup/, "🥫"], [/ramen/, "🍜"], [/pancake/, "🥞"], [/hot dog bun/, "🍞"],
    [/hot dog|brat|kielbasa|bologna/, "🌭"], [/lobster/, "🦞"], [/crab/, "🦀"], [/scallop/, "🐚"],
    [/kimchi|sauerkraut|cabbage|pickle|celery/, "🥬"], [/tater/, "🥔"], [/sugar|syrup|jelly/, "🍯"],
    [/egg(?!plant)/, "🥚"], [/eggplant/, "🍆"], [/banana/, "🍌"], [/\bapple/, "🍎"], [/lemon/, "🍋"],
    [/pineapple/, "🍍"], [/berr/, "🫐"], [/avocado/, "🥑"], [/broccoli/, "🥦"], [/carrot/, "🥕"],
    [/\bcorn\b/, "🌽"], [/sweet potato|potato/, "🥔"], [/tomato|marinara|salsa/, "🍅"], [/pepper/, "🫑"],
    [/cucumber/, "🥒"], [/lettuce|romaine|spinach|coleslaw/, "🥬"], [/mushroom/, "🍄"], [/onion/, "🧅"],
    [/bean|lentil|chickpea|edamame|pea/, "🫘"], [/rice|quinoa/, "🍚"], [/pasta|noodle/, "🍝"],
    [/bread|bagel|muffin|bun|rolls\b|biscuit|pita|flatbread|tortilla|tostada|crouton|pie crust/, "🍞"], [/oat|granola|chia/, "🥣"],
    [/milk|yogurt|cream cheese|cottage|heavy cream/, "🥛"], [/cheese|mozzarella|feta|ricotta|parmesan/, "🧀"],
    [/chicken|turkey/, "🍗"], [/bacon|ham|pork|sausage/, "🥓"], [/beef|steak|meatball|lamb/, "🥩"],
    [/salmon|tuna|cod|tilapia|mahi|fish/, "🐟"], [/shrimp/, "🍤"], [/tofu|tempeh/, "🧊"],
    [/peanut|nut/, "🥜"], [/butter/, "🧈"], [/honey/, "🍯"], [/oil|dressing|mayo|sauce|pesto|tzatziki|hummus/, "🫙"],
    [/broth/, "🍲"], [/powder/, "🧂"], [/coconut/, "🥥"], [/frozen/, "🧊"]
  ];
  function foodIcon(name) {
    var n = name.toLowerCase();
    for (var i = 0; i < FOOD_ICONS.length; i++) if (FOOD_ICONS[i][0].test(n)) return FOOD_ICONS[i][1];
    return "🛒";
  }

  // Built-in meals (meals.js) + meals the user adds on the Meals tab.
  var BUILT_IN_MEALS = window.MEALS || [];
  var MEALS = [];
  var MEAL_BY_ID = {};
  function refreshMeals() {
    MEALS = BUILT_IN_MEALS.concat(state.customMeals || []);
    MEAL_BY_ID = {};
    MEALS.forEach(function (m) { MEAL_BY_ID[m.id] = m; });
  }

  /* ========== 2. Saving / loading ========== */
  function emptyState() {
    return {
      settings: null, plan: null, checked: {}, customMeals: [],
      workouts: [], workoutGoal: { kind: "minutes", value: 150 },
      log: {},                 // food eaten, by date: { "2026-11-18": [ {id, name, cal, protein, slot} ] }
      prices: {},              // prices typed in, by store: { heb: { "Eggs|": { p: 3.49, b: "H-E-B" } } }
      store: STORES[0].key
    };
  }

  function isObj(v) { return !!v && typeof v === "object" && !Array.isArray(v); }

  function load() {
    var fresh = emptyState();
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && typeof s === "object") {
          s.checked = s.checked || {};
          s.customMeals = Array.isArray(s.customMeals) ? s.customMeals : [];
          s.workouts = Array.isArray(s.workouts) ? s.workouts : [];
          s.workoutGoal = s.workoutGoal || fresh.workoutGoal;
          // Older saves didn't have the food log, store prices or store choice.
          s.log = isObj(s.log) ? s.log : {};
          s.prices = isObj(s.prices) ? s.prices : {};
          if (STORE_KEYS.indexOf(s.store) === -1) s.store = fresh.store;
          // Older saves: give custom meals a category and settings a category list.
          s.customMeals.forEach(function (m) {
            if (!m.category) m.category = m.tags.indexOf("vegetarian") !== -1 ? "vegetarian" : "chicken";
          });
          if (s.settings) {
            if (!Array.isArray(s.settings.cats) || !s.settings.cats.length) s.settings.cats = ALL_CATS.slice();
            s.settings.budget = budgetTop(s.settings.budget);
            // Older saves: no "foods I don't eat" list, and every day was different.
            if (!Array.isArray(s.settings.avoid)) s.settings.avoid = [];
            if (!VARIETY_GROUPS[s.settings.variety]) s.settings.variety = 7;
          }
          return s;
        }
      }
    } catch (e) { /* storage unavailable: start fresh */ }
    return fresh;
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  /* ========== Small helpers ========== */
  function $(id) { return document.getElementById(id); }

  // Build an element safely: el("p", {class: "x"}, "text", childNode)
  function el(tag, props) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k.indexOf("on") === 0) node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    for (var i = 2; i < arguments.length; i++) {
      var kid = arguments[i];
      if (kid === null || kid === undefined || kid === false) continue;
      node.append(kid.nodeType ? kid : String(kid));
    }
    return node;
  }

  function appendAll(parent, nodes) { nodes.forEach(function (n) { if (n) parent.append(n); }); }

  function money(n) { return "$" + n.toFixed(2); }
  function num(n) { return Math.round(n).toLocaleString("en-US"); }
  function round50(n) { return Math.round(n / 50) * 50; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // Budgets are picked in $20 ranges ($20–$40, $40–$60 ... $280–$300).
  // We store the top of the range; that's the most the plan may spend.
  function budgetTop(n) { return Math.min(300, Math.max(40, Math.ceil(n / 20) * 20)); }
  function rangeText(top) { return "$" + (top - 20) + "–$" + top; }

  // A "two taps to confirm" button, used for anything that deletes data.
  function confirmButton(label, className, ariaLabel, onConfirm) {
    var armed = false;
    var btn = el("button", {
      type: "button", class: className, "aria-label": ariaLabel,
      onclick: function () {
        if (!armed) {
          armed = true; btn.textContent = "Tap to confirm";
          setTimeout(function () { armed = false; btn.textContent = label; }, 4000);
          return;
        }
        onConfirm();
      }
    }, label);
    return btn;
  }

  // Dates as "YYYY-MM-DD" in the user's own time zone.
  function ymd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function parseYmd(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function mondayOf(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function prettyDate(s) {
    return parseYmd(s).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  var state = load();
  refreshMeals();

  /* ========== 3. Calorie target ========== */
  function ageGroup(age) { return age <= 30 ? "young" : age <= 50 ? "mid" : "older"; }
  function ageGroupWords(age) { return age <= 30 ? "18–30" : age <= 50 ? "31–50" : "51+"; }

  function guidelineBase(s) {
    var row = GUIDE_TABLE[s.sex][ageGroup(s.age)];
    if (s.activity === "sedentary") return row[0];
    if (s.activity === "light") return (row[0] + row[1]) / 2;
    if (s.activity === "moderate") return row[1];
    return row[2];
  }

  // Returns { value, explain, floored } or null if inputs are incomplete.
  function calorieInfo(s) {
    var goalWord = { lose: "losing weight", maintain: "maintaining", build: "building muscle" }[s.goal];
    var adj = GOAL_ADJUST[s.goal];
    var adjWord = adj < 0 ? " minus " + Math.abs(adj) + " for " + goalWord
                : adj > 0 ? " plus " + adj + " for " + goalWord : " (no change for maintaining)";

    if (s.calMethod === "manual") {
      if (!isFinite(s.calories)) return null;
      return { value: s.calories, explain: "Using the target you typed in." };
    }
    if (!isFinite(s.age) || !s.sex || !s.activity) return null;

    var base, explain;
    if (s.calMethod === "suggest") {
      base = guidelineBase(s);
      explain = "Claude's quick suggestion: general guidelines put a " + s.sex + " aged " +
        ageGroupWords(s.age) + " with " + ACTIVITY_WORDS[s.activity] + " at about " +
        num(base) + " cal/day" + adjWord + ".";
    } else {
      if (!isFinite(s.heightFt) || !isFinite(s.heightIn) || !isFinite(s.weightLb)) return null;
      var kg = s.weightLb * 0.4536;
      var cm = (s.heightFt * 12 + s.heightIn) * 2.54;
      var bmr = 10 * kg + 6.25 * cm - 5 * s.age + (s.sex === "male" ? 5 : -161);
      base = bmr * ACTIVITY_FACTOR[s.activity];
      explain = "Estimate from your body stats (Mifflin-St Jeor formula): about " +
        num(base) + " cal/day to maintain" + adjWord + ".";
    }
    var value = round50(base + adj);
    var floor = MIN_CAL[s.sex];
    var floored = false;
    if (value < floor) { value = floor; floored = true; }
    if (floored) explain += " Raised to " + num(floor) + ", a common minimum without medical supervision.";
    return { value: value, explain: explain, floored: floored };
  }

  function calorieTarget() {
    var info = state.settings && calorieInfo(state.settings);
    return info ? info.value : 2000;
  }

  /* ========== 4. Meal planning rules ========== */
  function slotsFor(settings) { return SLOT_SETS[settings.mealsPerDay] || SLOT_SETS[3]; }

  /*
    Foods I don't eat: a meal is skipped when its name or any ingredient contains
    one of the words (whole words, so "egg" skips "Eggs" but not "Eggplant").
  */
  var avoidCache = { key: null, list: [] };
  function avoidMatchers(words) {
    var key = words.join("|");
    if (avoidCache.key === key) return avoidCache.list;
    avoidCache = {
      key: key,
      list: words.map(function (w) {
        var forms = [w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")];
        var single = w.replace(/(es|s)$/, "");
        if (single !== w && single.length > 2) forms.push(single.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        return { word: w, re: new RegExp("(^|[^a-z])(" + forms.join("|") + ")(s|es)?([^a-z]|$)", "i") };
      })
    };
    return avoidCache.list;
  }

  // Returns the first avoided word found in this meal, or "" if none.
  function avoidedWord(meal, words) {
    if (!words || !words.length) return "";
    var text = [meal.name].concat(meal.ingredients.map(function (i) { return i.item; })).join(" · ");
    var hit = avoidMatchers(words).filter(function (a) { return a.re.test(text); })[0];
    return hit ? hit.word : "";
  }

  // Does this meal fit the user's eating style, food categories and foods they skip?
  function fits(meal) {
    var s = state.settings;
    if (s.style === "vegan" && meal.tags.indexOf("vegan") === -1) return false;
    if (s.style === "vegetarian" && meal.tags.indexOf("vegetarian") === -1) return false;
    if ((s.cats || ALL_CATS).indexOf(meal.category) === -1) return false;
    return !avoidedWord(meal, s.avoid);
  }

  function candidatesFor(slotKey) {
    return MEALS.filter(function (m) { return m.slots.indexOf(slotKey) !== -1 && fits(m); });
  }

  // Groups of days that share the same meals (see VARIETY_GROUPS).
  function planGroups() { return VARIETY_GROUPS[state.settings.variety] || VARIETY_GROUPS[7]; }
  function groupIndexOf(d) {
    var groups = planGroups();
    for (var g = 0; g < groups.length; g++) if (groups[g].indexOf(d) !== -1) return g;
    return 0;
  }
  function groupLabel(g) {
    var days = planGroups()[g];
    if (days.length === 1) return DAY_NAMES[days[0]];
    if (days.length === 7) return "Every day";
    return DAY_NAMES[days[0]].slice(0, 3) + "–" + DAY_NAMES[days[days.length - 1]].slice(0, 3);
  }
  // Put the same meal in every day of a group (each day gets its own copy).
  function setGroupEntry(days, g, s, entry) {
    planGroups()[g].forEach(function (d) {
      days[d][s] = entry ? { mealId: entry.mealId, portion: entry.portion, locked: !!entry.locked } : null;
    });
  }

  function proteinFocus() {
    return state.settings.goal === "build" || state.settings.style === "highprotein";
  }

  // The portion (1x, 1.5x, 2x) that lands closest to the calorie goal for this slot.
  function bestPortion(meal, targetCal) {
    var best = PORTIONS[0];
    PORTIONS.forEach(function (p) {
      if (Math.abs(meal.cal * p - targetCal) < Math.abs(meal.cal * best - targetCal)) best = p;
    });
    return best;
  }

  // Lower score = better fit. Considers calories, budget, variety and protein.
  function scoreMeal(meal, portion, ctx) {
    var calErr = Math.abs(meal.cal * portion - ctx.targetCal) / ctx.targetCal;
    var cost = meal.cost * portion;
    var over = Math.max(0, cost - ctx.slotBudget) / ctx.slotBudget;
    var repeats = (ctx.used[meal.id] || 0) * 0.35 + (meal.id === ctx.prevId ? 0.6 : 0);
    var bonus = ctx.proteinFocus ? (meal.protein / meal.cal * 100) * 0.06 : 0;
    var mine = meal.custom ? 0.15 : 0; // small boost for the user's own meals
    return calErr + 1.5 * over + repeats - bonus - mine;
  }

  // g = group of days, s = meal slot.
  function slotContext(days, g, s, used) {
    var slot = slotsFor(state.settings)[s];
    var prevDay = g > 0 ? planGroups()[g - 1][0] : -1;
    return {
      targetCal: calorieTarget() * slot.share,
      slotBudget: state.settings.budget * slot.share / 7,
      used: used,
      prevId: prevDay >= 0 && days[prevDay] && days[prevDay][s] ? days[prevDay][s].mealId : null,
      proteinFocus: proteinFocus()
    };
  }

  // How often each meal is chosen, counting each group of days once.
  function countUsed(days, skipG, skipS) {
    var used = {};
    planGroups().forEach(function (group, g) {
      (days[group[0]] || []).forEach(function (entry, s) {
        if (!entry || (g === skipG && s === skipS)) return;
        used[entry.mealId] = (used[entry.mealId] || 0) + 1;
      });
    });
    return used;
  }

  // fillGapsOnly = true keeps every existing meal and only fills empty/invalid spots.
  function buildPlan(fillGapsOnly) {
    var settings = state.settings;
    var slots = slotsFor(settings);
    var groups = planGroups();
    var old = state.plan && state.plan.mealsPerDay === settings.mealsPerDay ? state.plan.days : null;
    var days = [];
    var g, s, d;
    for (d = 0; d < 7; d++) days.push(slots.map(function () { return null; }));

    // Start with locked meals that still fit (taken from the first day of each group).
    for (g = 0; g < groups.length; g++) {
      for (s = 0; s < slots.length; s++) {
        var prev = old && old[groups[g][0]] && old[groups[g][0]][s];
        var keep = prev && (prev.locked || fillGapsOnly) && MEAL_BY_ID[prev.mealId] && fits(MEAL_BY_ID[prev.mealId]);
        if (keep) setGroupEntry(days, g, s, prev);
      }
    }

    // Fill the open spots, best fit first, with a little randomness for variety.
    var used = countUsed(days, -1, -1);
    for (g = 0; g < groups.length; g++) {
      for (s = 0; s < slots.length; s++) {
        if (days[groups[g][0]][s]) continue;
        var ctx = slotContext(days, g, s, used);
        var best = null;
        candidatesFor(slots[s].key).forEach(function (m) {
          var p = bestPortion(m, ctx.targetCal);
          var score = scoreMeal(m, p, ctx) + Math.random() * 0.25;
          if (!best || score < best.score) best = { mealId: m.id, portion: p, score: score };
        });
        if (best) {
          setGroupEntry(days, g, s, { mealId: best.mealId, portion: best.portion, locked: false });
          used[best.mealId] = (used[best.mealId] || 0) + 1;
        }
      }
    }

    if (!fillGapsOnly) trimToBudget(days);
    state.plan = { mealsPerDay: settings.mealsPerDay, variety: settings.variety || 7, days: days };
  }

  function planCost(days) {
    var total = 0;
    days.forEach(function (day) {
      day.forEach(function (e) { if (e) total += MEAL_BY_ID[e.mealId].cost * e.portion; });
    });
    return total;
  }

  // If the week costs too much, make the swaps that save the most money
  // while hurting the calorie goal the least. Locked meals are never changed.
  function trimToBudget(days) {
    var slots = slotsFor(state.settings);
    var groups = planGroups();
    var budget = state.settings.budget;
    for (var guard = 0; guard < 80 && planCost(days) > budget + 0.001; guard++) {
      var best = null;
      for (var g = 0; g < groups.length; g++) {
        for (var s = 0; s < slots.length; s++) {
          var cur = days[groups[g][0]][s];
          if (!cur || cur.locked) continue;
          var size = groups[g].length;
          var curCost = MEAL_BY_ID[cur.mealId].cost * cur.portion;
          var used = countUsed(days, g, s);
          var target = calorieTarget() * slots[s].share;
          candidatesFor(slots[s].key).forEach(function (m) {
            PORTIONS.forEach(function (p) {
              var cost = m.cost * p;
              if (cost >= curCost - 0.005) return;
              var calErr = Math.abs(m.cal * p - target) / target;
              var value = (curCost - cost) * size / ((0.3 + calErr) * (1 + 0.3 * (used[m.id] || 0)));
              if (!best || value > best.value) best = { g: g, s: s, mealId: m.id, portion: p, value: value };
            });
          });
        }
      }
      if (!best) break;
      setGroupEntry(days, best.g, best.s, { mealId: best.mealId, portion: best.portion, locked: false });
    }
  }

  /* ========== Header greeting ========== */
  function renderHeader() {
    $("appName").textContent = APP_NAME;
    document.title = APP_NAME;
    var h = new Date().getHours();
    var part = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    var name = state.settings && state.settings.name ? ", " + state.settings.name : "";
    $("greeting").textContent = part + name;
    $("todayText").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }

  /* ========== 5a. Goals screen ========== */
  var form = $("setupForm");

  // Fill in the budget ranges and the category chips.
  (function buildGoalControls() {
    var sel = form.elements.budget;
    for (var top = 40; top <= 300; top += 20) {
      sel.append(el("option", { value: String(top), selected: top === 60 ? true : null }, rangeText(top)));
    }
    var wrap = $("catChips");
    CATEGORIES.forEach(function (c) {
      wrap.append(el("label", { class: "check" },
        el("input", { type: "checkbox", name: "cat", value: c.key, checked: true }), " " + c.label));
    });
  })();

  function readForm() {
    var f = form.elements;
    var n = function (name) { return parseFloat(f[name].value); };
    return {
      name: f.name.value.trim().slice(0, 30),
      goal: f.goal.value,
      style: f.style.value,
      cats: Array.prototype.slice.call(form.querySelectorAll("input[name=cat]:checked")).map(function (b) { return b.value; }),
      budget: n("budget"),
      mealsPerDay: parseInt(f.mealsPerDay.value, 10),
      variety: parseInt((form.querySelector("input[name=variety]:checked") || {}).value, 10) || 7,
      avoid: avoidDraft.slice(),
      calMethod: form.querySelector("input[name=calMethod]:checked").value,
      calories: n("calories"),
      sex: f.sex.value,
      age: n("age"),
      heightFt: n("heightFt"),
      heightIn: n("heightIn"),
      weightLb: n("weightLb"),
      activity: f.activity.value
    };
  }

  function fillForm(s) {
    var f = form.elements;
    ["name", "goal", "style", "calories", "sex", "age", "heightFt", "heightIn", "weightLb", "activity"]
      .forEach(function (k) {
        var v = s[k];
        if (typeof v === "string" || (typeof v === "number" && isFinite(v))) f[k].value = v;
      });
    f.mealsPerDay.value = String(s.mealsPerDay);
    f.budget.value = String(budgetTop(s.budget));
    form.querySelectorAll("input[name=cat]").forEach(function (b) {
      b.checked = (s.cats || ALL_CATS).indexOf(b.value) !== -1;
    });
    var radio = form.querySelector("input[name=calMethod][value=" + s.calMethod + "]");
    if (radio) radio.checked = true;
    var vRadio = form.querySelector("input[name=variety][value='" + (s.variety || 7) + "']");
    if (vRadio) vRadio.checked = true;
    avoidDraft = (s.avoid || []).slice();
    renderAvoid();
  }

  /* ---- Foods I don't eat (search box + chips) ---- */
  // The list being edited; it's saved with "Save & build my week".
  var avoidDraft = [];

  function allIngredientNames() {
    var seen = {};
    MEALS.forEach(function (m) { m.ingredients.forEach(function (i) { seen[i.item] = true; }); });
    return Object.keys(seen).sort();
  }

  function addAvoid(word) {
    var w = String(word || "").trim().toLowerCase().replace(/\s+/g, " ").slice(0, 40);
    if (w.length < 2 || avoidDraft.indexOf(w) !== -1 || avoidDraft.length >= 40) return;
    avoidDraft.push(w);
    $("avoidInput").value = "";
    renderAvoid();
  }

  function renderAvoid() {
    var q = $("avoidInput").value.trim().toLowerCase();
    var sug = $("avoidSuggest");
    sug.textContent = "";
    if (q.length >= 2) {
      allIngredientNames().filter(function (n) {
        return n.toLowerCase().indexOf(q) !== -1 && avoidDraft.indexOf(n.toLowerCase()) === -1;
      }).slice(0, 6).forEach(function (n) {
        sug.append(el("button", { type: "button", class: "chip", onclick: function () { addAvoid(n); $("avoidInput").focus(); } }, "＋ " + n));
      });
    }
    var chips = $("avoidChips");
    chips.textContent = "";
    avoidDraft.forEach(function (w) {
      chips.append(el("button", {
        type: "button", class: "chip on", "aria-label": "Remove " + w,
        onclick: function () { avoidDraft = avoidDraft.filter(function (x) { return x !== w; }); renderAvoid(); }
      }, w + "  ✕"));
    });
    var hidden = avoidDraft.length ? MEALS.filter(function (m) { return avoidedWord(m, avoidDraft); }).length : 0;
    $("avoidHint").textContent = (avoidDraft.length
      ? "Skips " + hidden + (hidden === 1 ? " meal" : " meals") + " that list these foods. Tap a food to remove it. "
      : "Type a food and tap Add, or pick a suggestion. ") +
      "This checks the meal names and listed ingredients only, so it isn't a guarantee for allergies. Always check labels.";
  }

  $("avoidInput").addEventListener("input", renderAvoid);
  $("avoidInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); addAvoid(e.target.value); }
  });
  $("avoidAddBtn").addEventListener("click", function () { addAvoid($("avoidInput").value); });

  function validate(s) {
    var errs = [];
    function bad(v, lo, hi) { return !isFinite(v) || v < lo || v > hi; }
    if (bad(s.budget, 40, 300)) errs.push("Please pick a weekly budget range.");
    if (s.style !== "vegetarian" && s.style !== "vegan" && !s.cats.length) errs.push("Pick at least one food category.");
    if (s.calMethod === "manual") {
      if (bad(s.calories, 1000, 5000)) errs.push("Calories should be between 1,000 and 5,000.");
    } else {
      if (bad(s.age, 18, 100)) errs.push("Age should be between 18 and 100 (this app is for adults).");
      if (s.calMethod === "estimate") {
        if (bad(s.heightFt, 4, 7) || bad(s.heightIn, 0, 11)) errs.push("Please check your height.");
        if (bad(s.weightLb, 70, 600)) errs.push("Weight should be between 70 and 600 lb.");
      }
    }
    return errs;
  }

  function updateGoalForm() {
    var method = form.querySelector("input[name=calMethod]:checked").value;
    var show = {
      manualFields: method === "manual",
      profileFields: method !== "manual",
      bodyFields: method === "estimate"
    };
    Object.keys(show).forEach(function (id) {
      $(id).hidden = !show[id];
      $(id).disabled = !show[id];
    });

    // Vegetarian/vegan styles only use the Vegetarian category.
    var veg = form.elements.style.value === "vegetarian" || form.elements.style.value === "vegan";
    form.querySelectorAll("input[name=cat]").forEach(function (b) {
      var meat = b.value !== "vegetarian";
      b.disabled = veg && meat;
      b.parentNode.classList.toggle("off", veg && meat);
    });

    var out = $("estimateOut");
    out.textContent = "";
    var s = readForm();
    if (validate(s).filter(function (e) { return /Age|height|Weight|Calories/.test(e); }).length) return;
    var info = calorieInfo(s);
    if (!info) return;
    out.append(
      el("strong", { text: num(info.value) + " cal/day" }),
      el("span", { text: info.explain })
    );
  }

  form.addEventListener("input", updateGoalForm);
  form.addEventListener("change", updateGoalForm);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var s = readForm();
    var errs = validate(s);
    $("formError").textContent = errs.join(" ");
    if (errs.length) return;
    if ((s.style === "vegetarian" || s.style === "vegan") && s.cats.indexOf("vegetarian") === -1) {
      s.cats = s.cats.concat("vegetarian");
    }
    state.settings = s;
    buildPlan(); // keeps locked meals that still fit
    save();
    renderAll();
    showTab("week");
  });

  var resetArmed = false;
  $("resetBtn").addEventListener("click", function () {
    var btn = $("resetBtn");
    if (!resetArmed) {
      resetArmed = true;
      btn.textContent = "Tap again to confirm";
      setTimeout(function () { resetArmed = false; btn.textContent = "Reset everything"; }, 4000);
      return;
    }
    resetArmed = false;
    btn.textContent = "Reset everything";
    state = emptyState();
    refreshMeals();
    try { localStorage.removeItem(STORE_KEY); } catch (err) { /* ignore */ }
    form.reset();
    avoidDraft = [];
    renderAvoid();
    updateGoalForm();
    $("formError").textContent = "";
    renderAll();
    showTab("setup");
    showWelcome(true);
  });

  /* ========== 5b. Plan screen ========== */
  function renderWeek() {
    var has = !!(state.settings && state.plan);
    $("weekEmpty").hidden = has;
    $("weekContent").hidden = !has;
    if (!has) return;

    var slots = slotsFor(state.settings);
    var days = state.plan.days;
    var target = calorieTarget();
    var budget = state.settings.budget;
    var total = Math.round(planCost(days) * 100) / 100; // whole cents
    var weekCal = 0, weekProtein = 0;

    var dayWrap = $("days");
    dayWrap.textContent = "";

    var groups = planGroups();
    var prep = groups.length < 7;
    groups.forEach(function (group, g) {
      var day = days[group[0]];
      var size = group.length;
      var dayCal = 0, dayProtein = 0, dayCost = 0;
      var list = el("ul", { class: "meals" });

      day.forEach(function (entry, s) {
        if (!entry) {
          list.append(el("li", { class: "meal" }, el("span", { class: "slot", text: slots[s].label }),
            el("p", { class: "meal-name", text: "No meal fits your choices here. Try ticking more food categories or removing some foods you skip." })));
          return;
        }
        var m = MEAL_BY_ID[entry.mealId];
        var cal = m.cal * entry.portion, prot = m.protein * entry.portion, cost = m.cost * entry.portion;
        dayCal += cal; dayProtein += prot; dayCost += cost;

        var lockBtn = el("button", {
          type: "button", class: "icon-btn lock" + (entry.locked ? " on" : ""),
          "aria-pressed": entry.locked ? "true" : "false",
          "aria-label": (entry.locked ? "Unlock " : "Lock ") + m.name,
          title: entry.locked ? "Locked: stays when you rebuild" : "Lock this meal",
          onclick: function () {
            setGroupEntry(days, g, s, { mealId: entry.mealId, portion: entry.portion, locked: !entry.locked });
            save(); renderWeek();
          }
        }, entry.locked ? "🔒" : "🔓");

        var swapBtn = el("button", {
          type: "button", class: "btn small",
          onclick: function () { openSwap(g, s); }
        }, "Swap");

        list.append(el("li", { class: "meal" + (entry.locked ? " locked" : "") },
          el("div", { class: "meal-top" },
            el("span", { class: "slot", text: slots[s].label + " · " + CAT_LABEL[m.category] }),
            entry.portion !== 1 ? el("span", { class: "pill", text: entry.portion + "× portion" }) : null
          ),
          prep ? el("p", { class: "prep-note", text: "🥡 Prep " + (+(size * entry.portion).toFixed(1)) + " servings" +
            (size === 7 ? " for the week" : " for " + groupLabel(g)) }) : null,
          el("p", { class: "meal-name", text: (m.custom ? "★ " : "") + m.name }),
          el("p", { class: "meta", text: num(cal) + " cal · " + num(prot) + " g protein · " + money(cost) }),
          el("div", { class: "meal-actions" }, swapBtn, lockBtn)
        ));
      });

      weekCal += dayCal * size; weekProtein += dayProtein * size;
      var calClass = Math.abs(dayCal - target) / target <= 0.1 ? "ok" : "warn";

      dayWrap.append(el("details", { class: "card day", open: g === 0 || prep ? true : null },
        el("summary", null,
          el("span", { class: "day-name", text: groupLabel(g) }),
          el("span", { class: "day-stats" },
            el("span", { class: calClass, text: num(dayCal) + " cal" }),
            " · " + money(dayCost) + (prep ? " a day" : ""))
        ),
        list
      ));
    });

    // Summary card
    var pct = Math.min(100, total / budget * 100);
    var barClass = total > budget ? "over" : total > budget * 0.9 ? "near" : "under";
    var avgCal = weekCal / 7, avgProt = weekProtein / 7;
    var info = calorieInfo(state.settings);
    var sum = $("summary");
    sum.textContent = "";
    appendAll(sum, [
      el("h2", { text: "This week's meals" }),
      el("div", { class: "budget-line" },
        el("span", null, el("strong", { text: money(total) }), " estimated"),
        el("span", { text: "Range " + rangeText(budget) })
      ),
      el("div", {
        class: "bar " + barClass, role: "progressbar",
        "aria-valuemin": "0", "aria-valuemax": String(budget), "aria-valuenow": total.toFixed(2),
        "aria-label": "Estimated cost compared to the top of your budget range"
      }, el("span", { style: "width:" + pct.toFixed(1) + "%" })),
      total > budget
        ? el("p", { class: "notice warn", text: "About " + money(total - budget) + " over the top of your range. We picked the cheapest meals that still come close to your calorie target. Try a higher range, locking fewer meals, or choosing 2 meals a day." })
        : total < budget - 20
          ? el("p", { class: "notice ok", text: "Below your range by " + money(budget - 20 - total) + ". Extra savings!" })
          : el("p", { class: "notice ok", text: "Within your " + rangeText(budget) + " range." }),
      avgCal < target * 0.85
        ? el("p", { class: "notice warn", text: "This plan averages about " + num(target - avgCal) + " calories a day below your target, because the budget is too tight to cover more food. A higher range will help." })
        : null,
      el("div", { class: "stats" },
        el("div", null, el("span", { class: "big", text: num(avgCal) }), el("span", { text: "avg cal/day (target " + num(target) + ")" })),
        el("div", null, el("span", { class: "big", text: num(avgProt) + " g" }), el("span", { text: "avg protein/day" }))
      ),
      info ? el("p", { class: "hint", text: info.explain }) : null
    ]);
    renderToday();
  }

  $("rebuildBtn").addEventListener("click", function () {
    buildPlan(); save(); renderAll();
  });

  /* ---- Swap dialog ---- */
  var dialog = $("swapDialog");

  function openSwap(g, s) {
    var slots = slotsFor(state.settings);
    var days = state.plan.days;
    var cur = days[planGroups()[g][0]][s];
    var ctx = slotContext(days, g, s, countUsed(days, g, s));
    var options = candidatesFor(slots[s].key)
      .filter(function (m) { return !cur || m.id !== cur.mealId; })
      .map(function (m) {
        var p = bestPortion(m, ctx.targetCal);
        return { meal: m, portion: p, score: scoreMeal(m, p, ctx) };
      })
      .sort(function (a, b) { return a.score - b.score; })
      .slice(0, 15);

    var label = groupLabel(g);
    $("swapTitle").textContent = planGroups().length === 7
      ? "Swap " + label + " " + slots[s].label.toLowerCase()
      : "Swap " + slots[s].label.toLowerCase() + " (" + (label === "Every day" ? "all week" : label) + ")";
    $("swapSub").textContent = "Best fits for your goals are listed first. The meal you pick will be locked.";
    var list = $("swapList");
    list.textContent = "";
    options.forEach(function (o) {
      var m = o.meal, p = o.portion;
      list.append(el("li", null, el("button", {
        type: "button", class: "swap-option",
        onclick: function () {
          setGroupEntry(days, g, s, { mealId: m.id, portion: p, locked: true });
          save(); closeSwap(); renderAll();
        }
      },
        el("span", { class: "meal-name", text: (m.custom ? "★ " : "") + m.name + (p !== 1 ? " (" + p + "×)" : "") }),
        el("span", { class: "meta", text: CAT_LABEL[m.category] + " · " + num(m.cal * p) + " cal · " + num(m.protein * p) + " g protein · " + money(m.cost * p) })
      )));
    });
    if (!options.length) list.append(el("li", { class: "hint", text: "No other meals fit this slot and your choices." }));

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeSwap() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }
  $("swapClose").addEventListener("click", closeSwap);
  dialog.addEventListener("click", function (e) { if (e.target === dialog) closeSwap(); });

  /* ---- Today: what you actually ate (food log) ---- */
  function todayKey() { return ymd(new Date()); }
  function todayIndex() { return (new Date().getDay() + 6) % 7; } // Monday = 0

  function logFor(date) { return state.log[date] || []; }

  function addToLog(entry) {
    var date = todayKey();
    if (!state.log[date]) state.log[date] = [];
    entry.id = "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    state.log[date].push(entry);
    // Keep about three months of history so storage stays small.
    var cutoff = ymd(addDays(new Date(), -90));
    Object.keys(state.log).forEach(function (k) { if (k < cutoff) delete state.log[k]; });
  }

  function removeFromLog(date, id) {
    state.log[date] = logFor(date).filter(function (x) { return x.id !== id; });
    if (!state.log[date].length) delete state.log[date];
  }

  function burnedOn(date) {
    return state.workouts.reduce(function (sum, w) { return w.date === date ? sum + workoutCalories(w) : sum; }, 0);
  }

  function renderToday() {
    if (!(state.settings && state.plan)) return;
    var date = todayKey();
    var entries = logFor(date);
    var target = calorieTarget();
    var eaten = entries.reduce(function (sum, x) { return sum + x.cal; }, 0);
    var burned = burnedOn(date);
    var allowance = target + burned;
    var left = allowance - eaten;
    var pct = Math.min(100, eaten / allowance * 100);

    var body = $("todayBody");
    body.textContent = "";
    var slots = slotsFor(state.settings);
    var planned = el("ul", { class: "today-list" });
    var shownIds = {};
    (state.plan.days[todayIndex()] || []).forEach(function (entry, s) {
      if (!entry) return;
      var m = MEAL_BY_ID[entry.mealId];
      if (!m) return;
      var cal = Math.round(m.cal * entry.portion);
      var logged = entries.filter(function (x) { return x.slot === slots[s].key && x.name === m.name; })[0];
      if (logged) shownIds[logged.id] = true;
      planned.append(el("li", { class: logged ? "eaten" : null },
        el("div", { class: "today-main" },
          el("span", { class: "slot", text: slots[s].label }),
          el("p", { class: "meal-name", text: m.name }),
          el("p", { class: "meta", text: num(cal) + " cal" })),
        el("button", {
          type: "button", class: "btn small" + (logged ? " eaten-btn" : ""),
          "aria-pressed": logged ? "true" : "false",
          onclick: function () {
            if (logged) removeFromLog(date, logged.id);
            else addToLog({ name: m.name, cal: cal, protein: Math.round(m.protein * entry.portion), slot: slots[s].key });
            save(); renderToday();
          }
        }, logged ? "✓ Eaten" : "Ate it")
      ));
    });

    var extras = el("ul", { class: "today-list" });
    entries.filter(function (x) { return !shownIds[x.id]; }).forEach(function (x) {
      extras.append(el("li", null,
        el("div", { class: "today-main" },
          el("p", { class: "meal-name", text: x.name }),
          el("p", { class: "meta", text: num(x.cal) + " cal" })),
        el("button", {
          type: "button", class: "icon-btn", "aria-label": "Remove " + x.name,
          onclick: function () { removeFromLog(date, x.id); save(); renderToday(); }
        }, "✕")
      ));
    });

    appendAll(body, [
      el("div", { class: "card-head" },
        el("h2", { text: "Today" }),
        el("span", { class: "pill", text: DAY_NAMES[todayIndex()] })),
      el("div", { class: "stats three" },
        el("div", null, el("span", { class: "big", text: num(eaten) }), el("span", { text: "cal eaten" })),
        el("div", null, el("span", { class: "big", text: num(burned) }), el("span", { text: "burned (workouts)" })),
        el("div", null, el("span", { class: "big" + (left < 0 ? " over-text" : ""), text: num(Math.abs(left)) }),
          el("span", { text: left < 0 ? "cal over" : "cal left" }))),
      el("div", {
        class: "bar " + (left < 0 ? "over" : pct > 90 ? "near" : "under"), role: "progressbar",
        "aria-label": "Calories eaten today compared to your target", "aria-valuemin": "0",
        "aria-valuemax": String(Math.round(allowance)), "aria-valuenow": String(Math.round(eaten))
      }, el("span", { style: "width:" + pct.toFixed(1) + "%" })),
      el("p", { class: "hint", text: "Left = your " + num(target) + " cal target, plus calories burned in today's workouts, minus what you ate. Estimates only." }),
      planned.childNodes.length ? el("p", { class: "food-title", text: "From your plan" }) : null,
      planned.childNodes.length ? planned : null,
      extras.childNodes.length ? el("p", { class: "food-title", text: "Also logged" }) : null,
      extras.childNodes.length ? extras : null
    ]);
    renderPastDays();
  }

  function renderPastDays() {
    var list = $("pastList");
    list.textContent = "";
    var today = todayKey();
    var dates = Object.keys(state.log).filter(function (k) { return k < today; }).sort().reverse().slice(0, 14);
    if (!dates.length) {
      list.append(el("li", { class: "hint", text: "Nothing yet. Tap “Ate it” on today's meals to start." }));
      return;
    }
    var target = calorieTarget();
    dates.forEach(function (date) {
      var entries = logFor(date);
      var eaten = entries.reduce(function (sum, x) { return sum + x.cal; }, 0);
      var burned = burnedOn(date);
      list.append(el("li", null,
        el("div", { class: "lib-main" },
          el("p", { class: "meal-name", text: prettyDate(date) }),
          el("p", { class: "meta", text: entries.map(function (x) { return x.name; }).join(", ") })),
        el("span", { class: "pill" + (eaten > target + burned ? " warn-pill" : ""), text: num(eaten) + " cal" })
      ));
    });
  }

  $("foodForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target.elements;
    var name = f.food.value.trim().slice(0, 50);
    var cal = parseFloat(f.cal.value);
    var errs = [];
    if (!name) errs.push("What did you eat?");
    if (!isFinite(cal) || cal < 1 || cal > 3000) errs.push("Calories should be between 1 and 3,000.");
    $("foodError").textContent = errs.join(" ");
    if (errs.length) return;
    addToLog({ name: name, cal: Math.round(cal) });
    save();
    f.food.value = ""; f.cal.value = "";
    renderToday();
  });

  /* ========== 5c. Meals screen (library + add your own) ========== */
  var libFilter = "all";
  var libSearch = "";

  function renderLibraryChips() {
    var wrap = $("libChips");
    wrap.textContent = "";
    var chips = [{ key: "all", label: "All" }].concat(CATEGORIES, [{ key: "mine", label: "★ My meals" }]);
    chips.forEach(function (c) {
      wrap.append(el("button", {
        type: "button", class: "chip" + (libFilter === c.key ? " on" : ""),
        "aria-pressed": libFilter === c.key ? "true" : "false",
        onclick: function () { libFilter = c.key; renderLibrary(); }
      }, c.label));
    });
  }

  function renderLibrary() {
    renderLibraryChips();
    var q = libSearch.toLowerCase();
    var shown = MEALS.filter(function (m) {
      if (libFilter === "mine" && !m.custom) return false;
      if (libFilter !== "all" && libFilter !== "mine" && m.category !== libFilter) return false;
      if (!q) return true;
      return m.name.toLowerCase().indexOf(q) !== -1 ||
        m.ingredients.some(function (i) { return i.item.toLowerCase().indexOf(q) !== -1; });
    }).sort(function (a, b) {
      return (b.custom ? 1 : 0) - (a.custom ? 1 : 0) || a.name.localeCompare(b.name);
    });

    $("libCount").textContent = shown.length + (shown.length === 1 ? " meal" : " meals");
    var list = $("libList");
    list.textContent = "";
    if (!shown.length) {
      list.append(el("li", { class: "hint", text: libFilter === "mine" ? "You haven't added any meals yet. Use “Add your own meal” above.": "No meals match." }));
      return;
    }
    shown.forEach(function (m) {
      var times = m.slots.map(cap).join(", ");
      var skipped = state.settings ? avoidedWord(m, state.settings.avoid) : "";
      var badges = el("span", { class: "badges" },
        el("span", { class: "tag cat-" + m.category, text: CAT_LABEL[m.category] }),
        m.tags.indexOf("vegan") !== -1 ? el("span", { class: "tag", text: "Vegan" }) : null,
        skipped ? el("span", { class: "tag skip", text: "Skipped: " + skipped }) : null);
      list.append(el("li", null,
        el("div", { class: "lib-main" },
          el("p", { class: "meal-name", text: (m.custom ? "★ " : "") + m.name }),
          badges,
          el("p", { class: "meta", text: times + " · " + num(m.cal) + " cal · " + num(m.protein) + " g protein · " + money(m.cost) })
        ),
        m.custom ? confirmButton("Delete", "btn small danger", "Delete " + m.name, function () { deleteCustomMeal(m.id); }) : null
      ));
    });
  }

  $("libSearch").addEventListener("input", function (e) { libSearch = e.target.value.trim(); renderLibrary(); });

  var mealForm = $("mealForm");
  CATEGORIES.forEach(function (c) {
    mealForm.elements.category.append(el("option", { value: c.key }, c.label));
  });
  function updateVeganBox() {
    var veg = mealForm.elements.category.value === "vegetarian";
    mealForm.elements.vegan.disabled = !veg;
    if (!veg) mealForm.elements.vegan.checked = false;
    $("veganWrap").classList.toggle("off", !veg);
  }
  mealForm.elements.category.addEventListener("change", updateVeganBox);

  var UNIT_WORDS = {
    cup: "cup", cups: "cup", c: "cup", tbsp: "tbsp", tablespoon: "tbsp", tablespoons: "tbsp",
    tsp: "tsp", teaspoon: "tsp", teaspoons: "tsp", oz: "oz", ounce: "oz", ounces: "oz",
    lb: "lb", lbs: "lb", pound: "lb", pounds: "lb", slice: "slice", slices: "slice",
    can: "can", cans: "can", block: "block", blocks: "block", scoop: "scoop", scoops: "scoop"
  };

  // "6 oz chicken breast" -> { item: "Chicken breast", qty: 6, unit: "oz" }
  function parseIngredient(line) {
    var text = line.trim().replace(/\s+/g, " ");
    if (!text) return null;
    var qty = 1, unit = "";
    var m = text.match(/^(\d+(?:\.\d+)?|\d+\/\d+)\s+(.*)$/);
    if (m) {
      qty = m[1].indexOf("/") !== -1
        ? parseFloat(m[1].split("/")[0]) / parseFloat(m[1].split("/")[1])
        : parseFloat(m[1]);
      text = m[2];
      var first = text.split(" ")[0].toLowerCase().replace(/\.$/, "");
      if (UNIT_WORDS[first] && text.indexOf(" ") !== -1) {
        unit = UNIT_WORDS[first];
        text = text.slice(text.indexOf(" ") + 1);
      }
    }
    text = text.replace(/^of /i, "");
    if (!isFinite(qty) || qty <= 0) qty = 1;
    return { item: cap(text.slice(0, 50)), qty: Math.min(qty, 100), unit: unit };
  }

  mealForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = mealForm.elements;
    var name = f.name.value.trim();
    var slots = Array.prototype.slice.call(mealForm.querySelectorAll("input[name=slot]:checked"))
      .map(function (b) { return b.value; });
    var cost = parseFloat(f.cost.value), cal = parseFloat(f.cal.value), protein = parseFloat(f.protein.value);
    var category = f.category.value;
    var errs = [];
    if (!name) errs.push("Give the meal a name.");
    if (!slots.length) errs.push("Pick at least one meal time.");
    if (!isFinite(cost) || cost < 0 || cost > 50) errs.push("Cost should be between $0 and $50.");
    if (!isFinite(cal) || cal < 50 || cal > 3000) errs.push("Calories should be between 50 and 3,000.");
    if (!isFinite(protein) || protein < 0 || protein > 200) errs.push("Protein should be between 0 and 200 g.");
    $("mealError").textContent = errs.join(" ");
    if (errs.length) return;

    var tags = category === "vegetarian" ? ["vegetarian"] : [];
    if (category === "vegetarian" && f.vegan.checked) tags.push("vegan");
    var ingredients = f.ingredients.value.split("\n").map(parseIngredient).filter(Boolean);
    if (!ingredients.length) ingredients = [{ item: name, qty: 1, unit: "" }];

    state.customMeals.push({
      id: "c" + Date.now().toString(36), custom: true, category: category, name: name.slice(0, 60), slots: slots,
      cost: Math.round(cost * 100) / 100, cal: Math.round(cal), protein: Math.round(protein),
      tags: tags, ingredients: ingredients
    });
    refreshMeals();
    save();
    mealForm.reset();
    updateVeganBox();
    var msg = $("mealMsg");
    msg.hidden = false;
    msg.textContent = "Added “" + name + "”. Tap Rebuild week on the Plan tab to work it into your plan.";
    libFilter = "mine";
    renderLibrary();
  });

  function deleteCustomMeal(id) {
    state.customMeals = state.customMeals.filter(function (m) { return m.id !== id; });
    refreshMeals();
    // Any day that used this meal gets a replacement; everything else stays the same.
    if (state.settings && state.plan) buildPlan(true);
    save();
    renderAll();
  }

  /* ========== 5d. Workouts screen ========== */
  var workoutForm = $("workoutForm");
  WORKOUT_TYPES.forEach(function (w, i) {
    $("typeChips").append(el("label", { class: "check" },
      el("input", { type: "radio", name: "type", value: w.key, checked: i === 0 ? true : null }), " " + w.label));
  });

  function bodyWeightLb() {
    var w = state.settings && state.settings.weightLb;
    return isFinite(w) && w >= 70 ? w : 150;
  }

  function workoutCalories(w) {
    var type = WORKOUT_BY_KEY[w.type] || WORKOUT_BY_KEY.other;
    return type.met[w.intensity] * bodyWeightLb() * 0.4536 * (w.minutes / 60);
  }

  function weekTotals(monday) {
    var start = ymd(monday), end = ymd(addDays(monday, 6));
    var perDay = [0, 0, 0, 0, 0, 0, 0];
    var t = { minutes: 0, sessions: 0, kcal: 0, strength: 0, perDay: perDay };
    state.workouts.forEach(function (w) {
      if (w.date < start || w.date > end) return;
      var idx = Math.round((parseYmd(w.date) - monday) / 86400000);
      t.minutes += w.minutes; t.sessions += 1; t.kcal += workoutCalories(w);
      if (w.type === "strength") t.strength += 1;
      if (idx >= 0 && idx < 7) perDay[idx] += w.minutes;
    });
    return t;
  }

  function goalMet(t) {
    var g = state.workoutGoal;
    return (g.kind === "sessions" ? t.sessions : t.minutes) >= g.value;
  }

  // Weeks in a row that hit the goal. This week counts once it's met.
  function streak() {
    var monday = mondayOf(new Date());
    var count = 0;
    if (goalMet(weekTotals(monday))) count = 1;
    for (var i = 1; i < 104; i++) {
      if (!goalMet(weekTotals(addDays(monday, -7 * i)))) break;
      count++;
    }
    return count;
  }

  function renderWorkouts() {
    var monday = mondayOf(new Date());
    var t = weekTotals(monday);
    var g = state.workoutGoal;
    var progress = g.kind === "sessions" ? t.sessions : t.minutes;
    var pct = Math.min(100, progress / g.value * 100);
    var todayIdx = (new Date().getDay() + 6) % 7;
    var maxDay = Math.max(30, Math.max.apply(null, t.perDay));
    var s = streak();

    var bars = el("div", { class: "day-bars", role: "img", "aria-label": "Minutes of activity each day this week" });
    t.perDay.forEach(function (mins, i) {
      bars.append(el("div", { class: "day-bar" + (i === todayIdx ? " today" : "") },
        el("span", { class: "bar-val", text: mins ? String(mins) : "" }),
        el("span", { class: "bar-track" }, el("span", { class: "bar-fill", style: "height:" + (mins / maxDay * 100).toFixed(1) + "%" })),
        el("span", { class: "bar-day", text: DAY_SHORT[i] })
      ));
    });

    var box = $("moveSummary");
    box.textContent = "";
    appendAll(box, [
      el("div", { class: "card-head" },
        el("h2", { text: "This week's movement" }),
        s > 0 ? el("span", { class: "pill", text: "🔥 " + s + "-week streak" }) : null),
      el("div", { class: "stats three" },
        el("div", null, el("span", { class: "big", text: num(t.minutes) }), el("span", { text: "active minutes" })),
        el("div", null, el("span", { class: "big", text: String(t.sessions) }), el("span", { text: t.sessions === 1 ? "workout" : "workouts" })),
        el("div", null, el("span", { class: "big", text: "~" + num(t.kcal) }), el("span", { text: "cal burned (est.)" }))
      ),
      el("div", { class: "budget-line goal-line" },
        el("span", { text: "Goal: " + num(g.value) + " " + (g.kind === "sessions" ? "workouts" : "minutes") }),
        el("span", { text: Math.round(pct) + "%" })),
      el("div", { class: "bar " + (pct >= 100 ? "under" : "near"), role: "progressbar", "aria-label": "Progress toward weekly goal",
        "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(Math.round(pct)) },
        el("span", { style: "width:" + pct.toFixed(1) + "%" })),
      pct >= 100 ? el("p", { class: "notice ok", text: "You hit your goal this week. Nice work!" }) : null,
      bars,
      el("p", { class: "hint", text: "Calories burned are estimated from activity type, effort and " +
        (state.settings && state.settings.calMethod === "estimate" ? "your weight on the Goals tab." : "a 150 lb body weight. For a closer number, choose “Estimate from my body stats” on Goals.") +
        (t.strength < 2 ? " Tip: guidelines suggest strength training at least twice a week." : "") })
    ]);

    // History
    var list = $("historyList");
    list.textContent = "";
    var sorted = state.workouts.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : (a.id < b.id ? 1 : -1);
    });
    $("historyEmpty").hidden = sorted.length > 0;
    $("historyCount").textContent = sorted.length + (sorted.length === 1 ? " workout" : " workouts");
    sorted.slice(0, 30).forEach(function (w) {
      var type = WORKOUT_BY_KEY[w.type] || WORKOUT_BY_KEY.other;
      list.append(el("li", null,
        el("div", null,
          el("p", { class: "meal-name", text: type.label }),
          el("p", { class: "meta", text: prettyDate(w.date) + " · " + w.minutes + " min · " + INTENSITY_WORDS[w.intensity] + " · ~" + num(workoutCalories(w)) + " cal" }),
          w.note ? el("p", { class: "meta note", text: w.note }) : null
        ),
        confirmButton("Delete", "btn small danger", "Delete " + type.label + " on " + prettyDate(w.date), function () {
          state.workouts = state.workouts.filter(function (x) { return x.id !== w.id; });
          save(); renderWorkouts(); renderToday();
        })
      ));
    });
    if (sorted.length > 30) list.append(el("li", { class: "hint", text: "Showing your 30 most recent workouts." }));

    // Goal form reflects saved goal
    $("goalForm").elements.value.value = g.value;
    $("goalForm").elements.kind.value = g.kind;
  }

  function resetWorkoutDate() {
    var today = ymd(new Date());
    workoutForm.elements.date.value = today;
    workoutForm.elements.date.max = today;
  }

  workoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = workoutForm.elements;
    var minutes = parseInt(f.minutes.value, 10);
    var date = f.date.value;
    var type = (workoutForm.querySelector("input[name=type]:checked") || {}).value;
    var intensity = parseInt((workoutForm.querySelector("input[name=intensity]:checked") || {}).value, 10);
    var errs = [];
    if (!type) errs.push("Pick a workout type.");
    if (!isFinite(minutes) || minutes < 1 || minutes > 600) errs.push("Minutes should be between 1 and 600.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errs.push("Pick a date.");
    else if (date > ymd(new Date())) errs.push("The date can't be in the future.");
    $("workoutError").textContent = errs.join(" ");
    if (errs.length) return;

    var w = { id: "w" + Date.now().toString(36), date: date, type: type, minutes: minutes,
      intensity: isFinite(intensity) ? intensity : 1, note: f.note.value.trim().slice(0, 80) };
    state.workouts.push(w);
    save();
    f.minutes.value = ""; f.note.value = "";
    resetWorkoutDate();
    var msg = $("workoutMsg");
    msg.hidden = false;
    msg.textContent = "Logged " + minutes + " min of " + WORKOUT_BY_KEY[type].label.toLowerCase() + " (~" + num(workoutCalories(w)) + " cal).";
    renderWorkouts();
    renderToday();
  });

  $("goalForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target.elements;
    var value = parseInt(f.value.value, 10);
    var kind = f.kind.value;
    var max = kind === "sessions" ? 21 : 2000;
    if (!isFinite(value) || value < 1 || value > max) {
      $("goalMsg").textContent = kind === "sessions" ? "Pick between 1 and 21 workouts." : "Pick between 1 and 2,000 minutes.";
      return;
    }
    state.workoutGoal = { kind: kind, value: value };
    save();
    $("goalMsg").textContent = "Goal saved.";
    renderWorkouts();
  });

  /* ========== 5e. Groceries screen ========== */
  var UNIT_PLURALS = { cup: "cups", slice: "slices", block: "blocks", can: "cans", scoop: "scoops" };

  function groceryItems() {
    var map = {};
    state.plan.days.forEach(function (day) {
      day.forEach(function (e) {
        if (!e) return;
        MEAL_BY_ID[e.mealId].ingredients.forEach(function (ing) {
          var key = ing.item + "|" + ing.unit;
          if (!map[key]) map[key] = { key: key, item: ing.item, unit: ing.unit, qty: 0 };
          map[key].qty += ing.qty * e.portion;
        });
      });
    });
    return Object.keys(map).map(function (k) { return map[k]; })
      .sort(function (a, b) { return a.item.localeCompare(b.item); });
  }

  function formatQty(g) {
    var q = Math.ceil(g.qty * 4 - 0.01) / 4;            // round up to the nearest quarter
    if (g.unit === "" || g.unit === "slice" || g.unit === "can" || g.unit === "scoop") q = Math.ceil(g.qty - 0.01); // whole items: round up
    var qText = String(+q.toFixed(2));
    if (g.unit === "") return qText;
    var unit = q > 1 && UNIT_PLURALS[g.unit] ? UNIT_PLURALS[g.unit] : g.unit;
    return qText + " " + unit;
  }

  /* ---- Store prices (typed in by you, remembered per store) ---- */
  function storePrices() {
    if (!isObj(state.prices[state.store])) state.prices[state.store] = {};
    return state.prices[state.store];
  }
  function storeLabel() {
    return (STORES.filter(function (st) { return st.key === state.store; })[0] || STORES[0]).label;
  }

  // The running total bar: what's in your cart, and the whole list at the prices you know.
  function renderCartBar(items) {
    var prices = storePrices();
    var cart = 0, list = 0, priced = 0;
    items.forEach(function (g) {
      var pr = prices[g.key];
      if (!pr || !isFinite(pr.p)) return;
      priced++;
      list += pr.p;
      if (state.checked[g.key]) cart += pr.p;
    });
    var budget = state.settings.budget;
    var bar = $("cartBar");
    bar.textContent = "";
    appendAll(bar, [
      el("div", { class: "cart-main" },
        el("span", { class: "cart-label", text: "🛒 In your cart" }),
        el("strong", { text: money(cart) })),
      el("div", { class: "cart-sub" },
        el("span", { text: "Whole list ≈ " + money(list) + (priced < items.length ? " (" + (items.length - priced) + " items not priced yet)" : "") }),
        el("span", { class: cart > budget ? "over-text" : null,
          text: cart > budget ? money(cart - budget) + " over your $" + budget + " budget" : money(budget - cart) + " left of $" + budget }))
    ]);
  }

  function renderGroceries() {
    var has = !!(state.settings && state.plan);
    $("groceryEmpty").hidden = has;
    $("groceryContent").hidden = !has;
    if (!has) return;

    $("storeSelect").value = state.store;
    var items = groceryItems();
    var prices = storePrices();
    var list = $("groceryList");
    list.textContent = "";
    var done = 0;
    items.forEach(function (g) {
      var checked = !!state.checked[g.key];
      if (checked) done++;
      var pr = prices[g.key] || {};
      var li;
      var box = el("input", {
        type: "checkbox", checked: checked ? true : null, "aria-label": "In cart: " + g.item,
        onchange: function (ev) {
          if (ev.target.checked) state.checked[g.key] = true; else delete state.checked[g.key];
          save(); renderGroceries();
        }
      });
      var priceIn = el("input", {
        type: "text", inputmode: "decimal", class: "price-in", placeholder: "Price",
        "aria-label": "Price paid for " + g.item + " at " + storeLabel(),
        value: isFinite(pr.p) ? pr.p.toFixed(2) : null,
        oninput: function (ev) {
          var v = parseFloat(ev.target.value.replace(/[^0-9.]/g, ""));
          var entry = storePrices()[g.key] || {};
          if (isFinite(v) && v >= 0 && v <= 500) {
            entry.p = Math.round(v * 100) / 100;
            storePrices()[g.key] = entry;
            // Typing a price puts the item in your cart.
            state.checked[g.key] = true;
            box.checked = true;
            li.classList.add("done");
          } else {
            delete entry.p;
            if (entry.b) storePrices()[g.key] = entry; else delete storePrices()[g.key];
          }
          save();
          renderCartBar(items);
          updateCount();
        }
      });
      var brandIn = el("input", {
        type: "text", class: "brand-in", placeholder: "Brand (optional)", maxlength: "40",
        "aria-label": "Brand of " + g.item, value: pr.b || null,
        oninput: function (ev) {
          var entry = storePrices()[g.key] || {};
          var b = ev.target.value.trim().slice(0, 40);
          if (b) entry.b = b; else delete entry.b;
          if (entry.b || isFinite(entry.p)) storePrices()[g.key] = entry; else delete storePrices()[g.key];
          save();
        }
      });
      li = el("li", { class: checked ? "done" : null },
        el("label", null, box,
          el("span", { class: "g-icon", "aria-hidden": "true", text: foodIcon(g.item) }),
          el("span", { class: "g-item", text: g.item }),
          el("span", { class: "g-qty", text: formatQty(g) })),
        el("div", { class: "g-price" },
          el("span", { class: "dollar", "aria-hidden": "true", text: "$" }), priceIn, brandIn)
      );
      list.append(li);
    });

    function updateCount() {
      var n = items.filter(function (g) { return state.checked[g.key]; }).length;
      $("groceryCount").textContent = n + " of " + items.length + " in cart";
    }
    updateCount();
    renderCartBar(items);

    var wrap = $("clearPricesWrap");
    wrap.textContent = "";
    if (Object.keys(prices).length) {
      wrap.append(confirmButton("Forget my " + storeLabel() + " prices", "btn small danger", "Forget all prices saved for " + storeLabel(), function () {
        state.prices[state.store] = {};
        save(); renderGroceries();
      }));
    }
  }

  STORES.forEach(function (st) { $("storeSelect").append(el("option", { value: st.key }, st.label)); });
  $("storeSelect").addEventListener("change", function (e) {
    state.store = e.target.value;
    save(); renderGroceries();
  });

  $("clearChecksBtn").addEventListener("click", function () {
    state.checked = {}; save(); renderGroceries();
  });

  $("copyBtn").addEventListener("click", function () {
    var prices = storePrices();
    var text = APP_NAME + " grocery list (" + storeLabel() + ")\n" + groceryItems().map(function (g) {
      var pr = prices[g.key] || {};
      return (state.checked[g.key] ? "[x] " : "[ ] ") + g.item + " - " + formatQty(g) +
        (pr.b ? " - " + pr.b : "") + (isFinite(pr.p) ? " - " + money(pr.p) : "");
    }).join("\n");
    var msg = $("copyMsg");
    function fallback() {
      var ta = el("textarea", { readonly: true });
      ta.value = text;
      document.body.append(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      ta.remove();
      msg.textContent = ok ? "Copied! Paste it into your notes app." : "Couldn't copy on this browser.";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        msg.textContent = "Copied! Paste it into your notes app.";
      }, fallback);
    } else fallback();
  });

  /* ========== Tabs ========== */
  var TABS = ["setup", "week", "meals", "workouts", "groceries"];
  function showTab(name) {
    TABS.forEach(function (t) {
      $("tab-" + t).hidden = t !== name;
      var b = $("nav-" + t);
      if (t === name) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }
  document.querySelectorAll("[data-tab]").forEach(function (b) {
    b.addEventListener("click", function () { showTab(b.getAttribute("data-tab")); });
  });
  document.querySelectorAll("[data-goto]").forEach(function (b) {
    b.addEventListener("click", function () { showTab(b.getAttribute("data-goto")); });
  });

  function renderAll() {
    renderHeader(); renderWeek(); renderLibrary(); renderWorkouts(); renderGroceries();
  }

  /* ========== Welcome cover (first visit, and after "Reset everything") ========== */
  function showWelcome(show) {
    $("welcome").hidden = !show;
    document.body.classList.toggle("welcoming", show);
  }
  $("beginBtn").addEventListener("click", function () {
    state.seenWelcome = true;
    save();
    showWelcome(false);
    showTab(state.settings && state.plan ? "week" : "setup");
  });

  /* ========== 6. Start-up ========== */
  if (state.settings) fillForm(state.settings);
  else renderAvoid();
  updateGoalForm();
  updateVeganBox();
  resetWorkoutDate();
  renderAll();
  showTab(state.settings && state.plan ? "week" : "setup");
  showWelcome(!state.seenWelcome && !state.settings);

  // Make the app installable and usable offline once it's on a real web address
  // (GitHub Pages). Skipped when you open index.html straight from your computer.
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register("sw.js").catch(function () { /* not essential */ });
  }
})();
