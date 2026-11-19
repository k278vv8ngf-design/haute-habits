/*
  Haute Habits — built-in meal library
  ---------------------------------------
  Every meal here is ONE standard serving. The app may suggest 1.5x or 2x
  portions to reach a calorie target; cost and ingredients scale with it.

  Fields:
    id        unique short code
    category  "chicken" (chicken & turkey), "seafood", "beef" (beef & lamb), "pork" or "vegetarian"
    name      what the user sees
    slots     which meal times it can fill: "breakfast", "lunch", "dinner"
    cost      estimated US grocery cost per serving, in dollars
    cal       estimated calories per serving
    protein   estimated grams of protein per serving
    tags      "vegetarian" and/or "vegan" (vegan meals are also vegetarian)
    ingredients  list of { item, qty, unit } for one serving
                 unit "" means a count (e.g., 1 banana)

  All numbers are rough estimates for a class project, not nutrition facts.
  To add a meal, copy one block, give it a new id, and edit the values.
*/
window.MEALS = [
  /* ---------- Breakfasts ---------- */
  {
    id: "b1", category: "vegetarian", name: "Oatmeal with banana & peanut butter", slots: ["breakfast"],
    cost: 0.90, cal: 450, protein: 14, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Rolled oats", qty: 0.5, unit: "cup" },
      { item: "Bananas", qty: 1, unit: "" },
      { item: "Peanut butter", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "b2", category: "vegetarian", name: "Scrambled eggs & toast", slots: ["breakfast"],
    cost: 1.20, cal: 400, protein: 22, tags: ["vegetarian"],
    ingredients: [
      { item: "Eggs", qty: 3, unit: "" },
      { item: "Bread", qty: 2, unit: "slice" }
    ]
  },
  {
    id: "b3", category: "vegetarian", name: "Greek yogurt parfait", slots: ["breakfast"],
    cost: 1.60, cal: 350, protein: 24, tags: ["vegetarian"],
    ingredients: [
      { item: "Greek yogurt", qty: 1, unit: "cup" },
      { item: "Granola", qty: 0.25, unit: "cup" },
      { item: "Frozen berries", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "b4", category: "vegetarian", name: "Tofu scramble wrap", slots: ["breakfast"],
    cost: 1.50, cal: 420, protein: 24, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Firm tofu", qty: 0.5, unit: "block" },
      { item: "Tortillas", qty: 1, unit: "" },
      { item: "Spinach", qty: 1, unit: "cup" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "b5", category: "vegetarian", name: "Protein smoothie", slots: ["breakfast"],
    cost: 1.80, cal: 380, protein: 32, tags: ["vegetarian"],
    ingredients: [
      { item: "Milk", qty: 1, unit: "cup" },
      { item: "Protein powder", qty: 1, unit: "scoop" },
      { item: "Bananas", qty: 1, unit: "" },
      { item: "Frozen berries", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "b6", category: "vegetarian", name: "Peanut butter banana toast", slots: ["breakfast"],
    cost: 0.80, cal: 380, protein: 12, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Peanut butter", qty: 2, unit: "tbsp" },
      { item: "Bananas", qty: 1, unit: "" }
    ]
  },
  {
    id: "b7", category: "vegetarian", name: "Egg & bean breakfast burrito", slots: ["breakfast"],
    cost: 1.70, cal: 500, protein: 26, tags: ["vegetarian"],
    ingredients: [
      { item: "Eggs", qty: 2, unit: "" },
      { item: "Tortillas", qty: 1, unit: "" },
      { item: "Black beans (canned)", qty: 0.25, unit: "cup" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "b8", category: "vegetarian", name: "Cottage cheese & fruit bowl", slots: ["breakfast"],
    cost: 1.50, cal: 300, protein: 26, tags: ["vegetarian"],
    ingredients: [
      { item: "Cottage cheese", qty: 1, unit: "cup" },
      { item: "Pineapple chunks", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "b9", category: "vegetarian", name: "Overnight chia oats with soy milk", slots: ["breakfast"],
    cost: 1.30, cal: 420, protein: 16, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Rolled oats", qty: 0.5, unit: "cup" },
      { item: "Soy milk", qty: 1, unit: "cup" },
      { item: "Chia seeds", qty: 1, unit: "tbsp" },
      { item: "Frozen berries", qty: 0.5, unit: "cup" }
    ]
  },

  /* ---------- Lunches & dinners ---------- */
  {
    id: "m1", category: "chicken", name: "Chicken rice bowl with broccoli", slots: ["lunch", "dinner"],
    cost: 2.80, cal: 600, protein: 45, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 6, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Broccoli", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "m2", category: "chicken", name: "Turkey & cheese sandwich with an apple", slots: ["lunch"],
    cost: 2.50, cal: 520, protein: 32, tags: [],
    ingredients: [
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Deli turkey", qty: 4, unit: "oz" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Apples", qty: 1, unit: "" }
    ]
  },
  {
    id: "m3", category: "vegetarian", name: "Lentil soup with bread", slots: ["lunch", "dinner"],
    cost: 1.40, cal: 480, protein: 24, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Lentils (dry)", qty: 0.33, unit: "cup" },
      { item: "Carrots", qty: 1, unit: "" },
      { item: "Onions", qty: 0.5, unit: "" },
      { item: "Bread", qty: 1, unit: "slice" }
    ]
  },
  {
    id: "m4", category: "vegetarian", name: "Black bean & rice burrito bowl", slots: ["lunch", "dinner"],
    cost: 1.60, cal: 620, protein: 22, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Black beans (canned)", qty: 0.75, unit: "cup" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Salsa", qty: 3, unit: "tbsp" },
      { item: "Frozen corn", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "m5", category: "seafood", name: "Tuna salad wrap", slots: ["lunch"],
    cost: 2.00, cal: 450, protein: 35, tags: [],
    ingredients: [
      { item: "Canned tuna", qty: 1, unit: "can" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" },
      { item: "Tortillas", qty: 1, unit: "" },
      { item: "Spinach", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "m6", category: "vegetarian", name: "Chickpea spinach curry with rice", slots: ["lunch", "dinner"],
    cost: 1.80, cal: 580, protein: 20, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Chickpeas (canned)", qty: 0.75, unit: "cup" },
      { item: "Light coconut milk", qty: 0.33, unit: "cup" },
      { item: "Curry powder", qty: 1, unit: "tsp" },
      { item: "Spinach", qty: 1, unit: "cup" },
      { item: "Rice (dry)", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "m7", category: "vegetarian", name: "Pasta marinara with white beans", slots: ["lunch", "dinner"],
    cost: 1.50, cal: 620, protein: 25, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Marinara sauce", qty: 0.5, unit: "cup" },
      { item: "White beans (canned)", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "m8", category: "chicken", name: "Spaghetti with turkey meat sauce", slots: ["dinner"],
    cost: 2.70, cal: 680, protein: 40, tags: [],
    ingredients: [
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Ground turkey", qty: 4, unit: "oz" },
      { item: "Marinara sauce", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "m9", category: "seafood", name: "Sheet-pan salmon, potatoes & green beans", slots: ["dinner"],
    cost: 4.80, cal: 620, protein: 40, tags: [],
    ingredients: [
      { item: "Salmon fillet", qty: 5, unit: "oz" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Green beans", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "m10", category: "vegetarian", name: "Veggie egg fried rice", slots: ["lunch", "dinner"],
    cost: 1.40, cal: 550, protein: 20, tags: ["vegetarian"],
    ingredients: [
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Eggs", qty: 2, unit: "" },
      { item: "Frozen mixed vegetables", qty: 1, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m11", category: "vegetarian", name: "Tofu & veggie stir-fry with rice", slots: ["dinner"],
    cost: 2.20, cal: 560, protein: 28, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Firm tofu", qty: 0.5, unit: "block" },
      { item: "Frozen mixed vegetables", qty: 1.5, unit: "cup" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m12", category: "chicken", name: "Chicken Caesar salad", slots: ["lunch"],
    cost: 3.20, cal: 500, protein: 42, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 5, unit: "oz" },
      { item: "Romaine lettuce", qty: 2, unit: "cup" },
      { item: "Caesar dressing", qty: 2, unit: "tbsp" },
      { item: "Croutons", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "m13", category: "vegetarian", name: "Bean & cheese quesadilla", slots: ["lunch", "dinner"],
    cost: 1.70, cal: 580, protein: 24, tags: ["vegetarian"],
    ingredients: [
      { item: "Tortillas", qty: 2, unit: "" },
      { item: "Black beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Shredded cheese", qty: 0.33, unit: "cup" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "m14", category: "chicken", name: "Baked chicken thighs, rice & veggies", slots: ["dinner"],
    cost: 2.40, cal: 680, protein: 42, tags: [],
    ingredients: [
      { item: "Chicken thighs", qty: 6, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Frozen mixed vegetables", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "m15", category: "vegetarian", name: "Peanut noodle bowl with edamame", slots: ["lunch", "dinner"],
    cost: 2.00, cal: 600, protein: 26, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Noodles (dry)", qty: 3, unit: "oz" },
      { item: "Peanut butter", qty: 2, unit: "tbsp" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" },
      { item: "Frozen edamame", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "m16", category: "beef", name: "Ground beef tacos", slots: ["dinner"],
    cost: 3.00, cal: 650, protein: 35, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 4, unit: "oz" },
      { item: "Tortillas", qty: 3, unit: "" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "m17", category: "vegetarian", name: "Hummus veggie pita with carrots", slots: ["lunch"],
    cost: 1.80, cal: 480, protein: 16, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Pita bread", qty: 1, unit: "" },
      { item: "Hummus", qty: 4, unit: "tbsp" },
      { item: "Cucumbers", qty: 0.5, unit: "" },
      { item: "Baby carrots", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "m18", category: "seafood", name: "Shrimp & veggie stir-fry", slots: ["dinner"],
    cost: 4.00, cal: 480, protein: 35, tags: [],
    ingredients: [
      { item: "Frozen shrimp", qty: 5, unit: "oz" },
      { item: "Frozen mixed vegetables", qty: 1.5, unit: "cup" },
      { item: "Rice (dry)", qty: 0.25, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m19", category: "chicken", name: "Greek chicken pita", slots: ["lunch"],
    cost: 2.90, cal: 550, protein: 40, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 4, unit: "oz" },
      { item: "Pita bread", qty: 1, unit: "" },
      { item: "Tzatziki", qty: 2, unit: "tbsp" },
      { item: "Tomatoes", qty: 0.5, unit: "" },
      { item: "Cucumbers", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "m20", category: "vegetarian", name: "Bean & cheese baked potato", slots: ["lunch", "dinner"],
    cost: 1.30, cal: 520, protein: 22, tags: ["vegetarian"],
    ingredients: [
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Black beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },

  /* ---------- More breakfasts (added in version 2) ---------- */
  {
    id: "b10", category: "vegetarian", name: "Banana oat pancakes", slots: ["breakfast"],
    cost: 1.10, cal: 420, protein: 18, tags: ["vegetarian"],
    ingredients: [
      { item: "Rolled oats", qty: 0.5, unit: "cup" },
      { item: "Eggs", qty: 2, unit: "" },
      { item: "Bananas", qty: 1, unit: "" }
    ]
  },
  {
    id: "b11", category: "vegetarian", name: "Avocado toast with a fried egg", slots: ["breakfast"],
    cost: 1.90, cal: 430, protein: 17, tags: ["vegetarian"],
    ingredients: [
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Avocados", qty: 0.5, unit: "" },
      { item: "Eggs", qty: 1, unit: "" }
    ]
  },
  {
    id: "b12", category: "vegetarian", name: "Quinoa breakfast bowl with almond milk", slots: ["breakfast"],
    cost: 1.60, cal: 400, protein: 13, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Quinoa (dry)", qty: 0.33, unit: "cup" },
      { item: "Almond milk", qty: 0.75, unit: "cup" },
      { item: "Frozen berries", qty: 0.5, unit: "cup" },
      { item: "Chia seeds", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "b13", category: "chicken", name: "Turkey sausage & egg muffin", slots: ["breakfast"],
    cost: 2.00, cal: 420, protein: 28, tags: [],
    ingredients: [
      { item: "English muffins", qty: 1, unit: "" },
      { item: "Turkey sausage patties", qty: 1, unit: "" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Cheese slices", qty: 1, unit: "slice" }
    ]
  },
  {
    id: "b14", category: "vegetarian", name: "Peanut butter protein oats", slots: ["breakfast"],
    cost: 1.40, cal: 520, protein: 32, tags: ["vegetarian"],
    ingredients: [
      { item: "Rolled oats", qty: 0.5, unit: "cup" },
      { item: "Protein powder", qty: 1, unit: "scoop" },
      { item: "Peanut butter", qty: 1, unit: "tbsp" },
      { item: "Milk", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "b15", category: "vegetarian", name: "Black bean breakfast tacos", slots: ["breakfast"],
    cost: 1.20, cal: 440, protein: 17, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Tortillas", qty: 2, unit: "" },
      { item: "Black beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Salsa", qty: 2, unit: "tbsp" },
      { item: "Avocados", qty: 0.25, unit: "" }
    ]
  },

  /* ---------- More lunches & dinners (added in version 2) ---------- */
  {
    id: "m21", category: "chicken", name: "Chicken fajita wrap", slots: ["lunch", "dinner"],
    cost: 3.00, cal: 560, protein: 40, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 5, unit: "oz" },
      { item: "Tortillas", qty: 1, unit: "" },
      { item: "Bell peppers", qty: 0.5, unit: "" },
      { item: "Onions", qty: 0.25, unit: "" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "m22", category: "chicken", name: "Turkey & bean chili", slots: ["lunch", "dinner"],
    cost: 2.40, cal: 520, protein: 38, tags: [],
    ingredients: [
      { item: "Ground turkey", qty: 4, unit: "oz" },
      { item: "Kidney beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Canned diced tomatoes", qty: 0.5, unit: "cup" },
      { item: "Onions", qty: 0.25, unit: "" },
      { item: "Chili powder", qty: 1, unit: "tsp" }
    ]
  },
  {
    id: "m23", category: "vegetarian", name: "Three-bean veggie chili", slots: ["lunch", "dinner"],
    cost: 1.50, cal: 480, protein: 22, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Kidney beans (canned)", qty: 0.33, unit: "cup" },
      { item: "Black beans (canned)", qty: 0.33, unit: "cup" },
      { item: "Chickpeas (canned)", qty: 0.33, unit: "cup" },
      { item: "Canned diced tomatoes", qty: 0.5, unit: "cup" },
      { item: "Chili powder", qty: 1, unit: "tsp" }
    ]
  },
  {
    id: "m24", category: "vegetarian", name: "Egg salad sandwich", slots: ["lunch"],
    cost: 1.30, cal: 480, protein: 22, tags: ["vegetarian"],
    ingredients: [
      { item: "Eggs", qty: 2, unit: "" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" },
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Spinach", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "m25", category: "chicken", name: "Teriyaki chicken & rice", slots: ["dinner"],
    cost: 2.60, cal: 620, protein: 42, tags: [],
    ingredients: [
      { item: "Chicken thighs", qty: 5, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Teriyaki sauce", qty: 2, unit: "tbsp" },
      { item: "Broccoli", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "m26", category: "pork", name: "Pork chop, sweet potato & green beans", slots: ["dinner"],
    cost: 3.20, cal: 600, protein: 38, tags: [],
    ingredients: [
      { item: "Pork chops", qty: 5, unit: "oz" },
      { item: "Sweet potatoes", qty: 1, unit: "" },
      { item: "Green beans", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "m27", category: "vegetarian", name: "Crispy tofu veggie sandwich", slots: ["lunch"],
    cost: 1.70, cal: 460, protein: 22, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Firm tofu", qty: 0.33, unit: "block" },
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Cucumbers", qty: 0.25, unit: "" },
      { item: "Baby carrots", qty: 0.5, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m28", category: "vegetarian", name: "Minestrone soup with bread", slots: ["lunch", "dinner"],
    cost: 1.40, cal: 420, protein: 15, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "White beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Canned diced tomatoes", qty: 0.5, unit: "cup" },
      { item: "Frozen mixed vegetables", qty: 1, unit: "cup" },
      { item: "Pasta (dry)", qty: 1, unit: "oz" },
      { item: "Bread", qty: 1, unit: "slice" }
    ]
  },
  {
    id: "m29", category: "vegetarian", name: "Quinoa black bean salad", slots: ["lunch"],
    cost: 1.80, cal: 500, protein: 18, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Quinoa (dry)", qty: 0.33, unit: "cup" },
      { item: "Black beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Frozen corn", qty: 0.33, unit: "cup" },
      { item: "Bell peppers", qty: 0.5, unit: "" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "m30", category: "seafood", name: "Baked cod with rice & peas", slots: ["dinner"],
    cost: 3.80, cal: 520, protein: 38, tags: [],
    ingredients: [
      { item: "Cod fillet", qty: 6, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Frozen peas", qty: 0.75, unit: "cup" }
    ]
  },
  {
    id: "m31", category: "chicken", name: "Chicken noodle soup", slots: ["lunch", "dinner"],
    cost: 2.00, cal: 420, protein: 30, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 3, unit: "oz" },
      { item: "Noodles (dry)", qty: 1.5, unit: "oz" },
      { item: "Carrots", qty: 1, unit: "" },
      { item: "Chicken broth", qty: 1.5, unit: "cup" }
    ]
  },
  {
    id: "m32", category: "vegetarian", name: "Veggie omelette with toast", slots: ["lunch", "dinner"],
    cost: 1.50, cal: 460, protein: 26, tags: ["vegetarian"],
    ingredients: [
      { item: "Eggs", qty: 3, unit: "" },
      { item: "Spinach", qty: 1, unit: "cup" },
      { item: "Bell peppers", qty: 0.25, unit: "" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" },
      { item: "Bread", qty: 1, unit: "slice" }
    ]
  },
  {
    id: "m33", category: "vegetarian", name: "Red lentil dal with rice", slots: ["lunch", "dinner"],
    cost: 1.20, cal: 540, protein: 22, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Red lentils (dry)", qty: 0.33, unit: "cup" },
      { item: "Canned diced tomatoes", qty: 0.33, unit: "cup" },
      { item: "Curry powder", qty: 1, unit: "tsp" },
      { item: "Rice (dry)", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "m34", category: "vegetarian", name: "Spinach ricotta pasta", slots: ["dinner"],
    cost: 2.10, cal: 640, protein: 28, tags: ["vegetarian"],
    ingredients: [
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Ricotta cheese", qty: 0.33, unit: "cup" },
      { item: "Spinach", qty: 1, unit: "cup" },
      { item: "Marinara sauce", qty: 0.33, unit: "cup" }
    ]
  },
  {
    id: "m35", category: "vegetarian", name: "Sweet potato & black bean tacos", slots: ["dinner"],
    cost: 1.70, cal: 560, protein: 18, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Sweet potatoes", qty: 0.5, unit: "" },
      { item: "Black beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Tortillas", qty: 3, unit: "" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "m36", category: "beef", name: "Beef & broccoli stir-fry", slots: ["dinner"],
    cost: 3.40, cal: 620, protein: 38, tags: [],
    ingredients: [
      { item: "Flank steak", qty: 4, unit: "oz" },
      { item: "Broccoli", qty: 1.5, unit: "cup" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m37", category: "seafood", name: "Tuna pasta salad", slots: ["lunch"],
    cost: 1.90, cal: 560, protein: 34, tags: [],
    ingredients: [
      { item: "Pasta (dry)", qty: 2, unit: "oz" },
      { item: "Canned tuna", qty: 1, unit: "can" },
      { item: "Frozen peas", qty: 0.5, unit: "cup" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" }
    ]
  },

  /* ---------- Even more breakfasts (added in version 3) ---------- */
  {
    id: "b16", category: "vegetarian", name: "Bagel with cream cheese & fruit", slots: ["breakfast"],
    cost: 1.30, cal: 450, protein: 13, tags: ["vegetarian"],
    ingredients: [
      { item: "Bagels", qty: 1, unit: "" },
      { item: "Cream cheese", qty: 2, unit: "tbsp" },
      { item: "Apples", qty: 1, unit: "" }
    ]
  },
  {
    id: "b17", category: "vegetarian", name: "Berry smoothie bowl", slots: ["breakfast"],
    cost: 1.90, cal: 430, protein: 14, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Soy milk", qty: 0.75, unit: "cup" },
      { item: "Frozen berries", qty: 1, unit: "cup" },
      { item: "Bananas", qty: 1, unit: "" },
      { item: "Granola", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "b18", category: "pork", name: "Ham, egg & cheese bagel", slots: ["breakfast"],
    cost: 2.20, cal: 520, protein: 32, tags: [],
    ingredients: [
      { item: "Bagels", qty: 1, unit: "" },
      { item: "Deli ham", qty: 2, unit: "oz" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Cheese slices", qty: 1, unit: "slice" }
    ]
  },
  {
    id: "b19", category: "vegetarian", name: "Sweet potato hash with eggs", slots: ["breakfast"],
    cost: 1.40, cal: 450, protein: 18, tags: ["vegetarian"],
    ingredients: [
      { item: "Sweet potatoes", qty: 0.5, unit: "" },
      { item: "Eggs", qty: 2, unit: "" },
      { item: "Bell peppers", qty: 0.25, unit: "" },
      { item: "Onions", qty: 0.25, unit: "" }
    ]
  },
  {
    id: "b20", category: "vegetarian", name: "Hummus & egg toast", slots: ["breakfast"],
    cost: 1.30, cal: 400, protein: 18, tags: ["vegetarian"],
    ingredients: [
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Hummus", qty: 2, unit: "tbsp" },
      { item: "Eggs", qty: 2, unit: "" }
    ]
  },

  /* ---------- Even more lunches & dinners (added in version 3) ---------- */
  {
    id: "m38", category: "chicken", name: "Turkey bacon BLT", slots: ["lunch"],
    cost: 2.20, cal: 480, protein: 24, tags: [],
    ingredients: [
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Turkey bacon", qty: 3, unit: "slice" },
      { item: "Romaine lettuce", qty: 0.5, unit: "cup" },
      { item: "Tomatoes", qty: 0.5, unit: "" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m39", category: "vegetarian", name: "Caprese pasta salad", slots: ["lunch"],
    cost: 2.00, cal: 520, protein: 20, tags: ["vegetarian"],
    ingredients: [
      { item: "Pasta (dry)", qty: 2, unit: "oz" },
      { item: "Fresh mozzarella", qty: 2, unit: "oz" },
      { item: "Tomatoes", qty: 1, unit: "" },
      { item: "Olive oil", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m40", category: "vegetarian", name: "Falafel pita", slots: ["lunch", "dinner"],
    cost: 2.30, cal: 560, protein: 20, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Frozen falafel", qty: 4, unit: "" },
      { item: "Pita bread", qty: 1, unit: "" },
      { item: "Hummus", qty: 2, unit: "tbsp" },
      { item: "Cucumbers", qty: 0.25, unit: "" },
      { item: "Tomatoes", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "m41", category: "chicken", name: "Sheet-pan chicken & veggies", slots: ["dinner"],
    cost: 2.70, cal: 560, protein: 42, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 6, unit: "oz" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Broccoli", qty: 1, unit: "cup" },
      { item: "Olive oil", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m42", category: "seafood", name: "Lemon garlic shrimp pasta", slots: ["dinner"],
    cost: 3.60, cal: 600, protein: 36, tags: [],
    ingredients: [
      { item: "Frozen shrimp", qty: 5, unit: "oz" },
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Lemons", qty: 0.5, unit: "" },
      { item: "Olive oil", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m43", category: "chicken", name: "Turkey & rice stuffed peppers", slots: ["dinner"],
    cost: 2.80, cal: 540, protein: 34, tags: [],
    ingredients: [
      { item: "Bell peppers", qty: 2, unit: "" },
      { item: "Ground turkey", qty: 4, unit: "oz" },
      { item: "Rice (dry)", qty: 0.25, unit: "cup" },
      { item: "Marinara sauce", qty: 0.33, unit: "cup" }
    ]
  },
  {
    id: "m44", category: "vegetarian", name: "Vegetable lo mein", slots: ["lunch", "dinner"],
    cost: 1.60, cal: 560, protein: 16, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Noodles (dry)", qty: 3, unit: "oz" },
      { item: "Frozen mixed vegetables", qty: 1.5, unit: "cup" },
      { item: "Soy sauce", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "m45", category: "chicken", name: "Chicken pesto pasta", slots: ["dinner"],
    cost: 3.10, cal: 680, protein: 44, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 5, unit: "oz" },
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Pesto", qty: 2, unit: "tbsp" },
      { item: "Spinach", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "m46", category: "vegetarian", name: "Mushroom spinach quesadilla", slots: ["lunch"],
    cost: 1.80, cal: 520, protein: 22, tags: ["vegetarian"],
    ingredients: [
      { item: "Tortillas", qty: 2, unit: "" },
      { item: "Mushrooms", qty: 1, unit: "cup" },
      { item: "Spinach", qty: 1, unit: "cup" },
      { item: "Shredded cheese", qty: 0.33, unit: "cup" }
    ]
  },
  {
    id: "m47", category: "chicken", name: "Cobb salad", slots: ["lunch"],
    cost: 3.40, cal: 520, protein: 40, tags: [],
    ingredients: [
      { item: "Romaine lettuce", qty: 2, unit: "cup" },
      { item: "Chicken breast", qty: 4, unit: "oz" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Turkey bacon", qty: 2, unit: "slice" },
      { item: "Avocados", qty: 0.25, unit: "" },
      { item: "Ranch dressing", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "m48", category: "vegetarian", name: "Coconut chickpea & sweet potato curry", slots: ["dinner"],
    cost: 1.90, cal: 580, protein: 17, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Chickpeas (canned)", qty: 0.5, unit: "cup" },
      { item: "Sweet potatoes", qty: 0.5, unit: "" },
      { item: "Light coconut milk", qty: 0.33, unit: "cup" },
      { item: "Curry powder", qty: 1, unit: "tsp" },
      { item: "Rice (dry)", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "m49", category: "chicken", name: "Turkey burger with sweet potato fries", slots: ["dinner"],
    cost: 3.20, cal: 650, protein: 38, tags: [],
    ingredients: [
      { item: "Ground turkey", qty: 5, unit: "oz" },
      { item: "Hamburger buns", qty: 1, unit: "" },
      { item: "Sweet potatoes", qty: 1, unit: "" },
      { item: "Romaine lettuce", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "m50", category: "vegetarian", name: "Tempeh stir-fry with rice", slots: ["dinner"],
    cost: 2.60, cal: 580, protein: 32, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Tempeh", qty: 4, unit: "oz" },
      { item: "Frozen mixed vegetables", qty: 1, unit: "cup" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m51", category: "vegetarian", name: "Bean & veggie burrito", slots: ["lunch", "dinner"],
    cost: 1.50, cal: 590, protein: 21, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Tortillas", qty: 1, unit: "" },
      { item: "Black beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Rice (dry)", qty: 0.25, unit: "cup" },
      { item: "Bell peppers", qty: 0.5, unit: "" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "m52", category: "vegetarian", name: "Greek salad with chickpeas", slots: ["lunch"],
    cost: 2.10, cal: 480, protein: 18, tags: ["vegetarian"],
    ingredients: [
      { item: "Romaine lettuce", qty: 2, unit: "cup" },
      { item: "Chickpeas (canned)", qty: 0.5, unit: "cup" },
      { item: "Feta cheese", qty: 0.25, unit: "cup" },
      { item: "Cucumbers", qty: 0.5, unit: "" },
      { item: "Olive oil", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m53", category: "seafood", name: "Salmon rice bowl", slots: ["lunch", "dinner"],
    cost: 3.00, cal: 560, protein: 34, tags: [],
    ingredients: [
      { item: "Canned salmon", qty: 1, unit: "can" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Cucumbers", qty: 0.5, unit: "" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "m54", category: "vegetarian", name: "Black bean soup", slots: ["lunch", "dinner"],
    cost: 1.20, cal: 420, protein: 20, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Black beans (canned)", qty: 1, unit: "cup" },
      { item: "Onions", qty: 0.25, unit: "" },
      { item: "Salsa", qty: 3, unit: "tbsp" },
      { item: "Tortillas", qty: 1, unit: "" }
    ]
  },

  /* ---------- Version 4: more pork, beef, seafood, chicken & vegetarian ---------- */
  {
    id: "p1", category: "pork", name: "Bacon, eggs & toast", slots: ["breakfast"],
    cost: 1.60, cal: 480, protein: 24, tags: [],
    ingredients: [
      { item: "Bacon", qty: 2, unit: "slice" },
      { item: "Eggs", qty: 2, unit: "" },
      { item: "Bread", qty: 1, unit: "slice" }
    ]
  },
  {
    id: "p2", category: "pork", name: "Pork carnitas tacos", slots: ["dinner"],
    cost: 2.60, cal: 620, protein: 34, tags: [],
    ingredients: [
      { item: "Pork shoulder", qty: 5, unit: "oz" },
      { item: "Tortillas", qty: 3, unit: "" },
      { item: "Onions", qty: 0.25, unit: "" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "p3", category: "pork", name: "Sweet & sour pork with rice", slots: ["dinner"],
    cost: 2.80, cal: 640, protein: 30, tags: [],
    ingredients: [
      { item: "Pork loin", qty: 5, unit: "oz" },
      { item: "Bell peppers", qty: 0.5, unit: "" },
      { item: "Sweet & sour sauce", qty: 2, unit: "tbsp" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" }
    ]
  },
  {
    id: "p4", category: "pork", name: "Ham & Swiss sandwich with an apple", slots: ["lunch"],
    cost: 2.20, cal: 500, protein: 28, tags: [],
    ingredients: [
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Deli ham", qty: 3, unit: "oz" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Apples", qty: 1, unit: "" }
    ]
  },
  {
    id: "p5", category: "pork", name: "Pork fried rice", slots: ["lunch", "dinner"],
    cost: 2.00, cal: 600, protein: 28, tags: [],
    ingredients: [
      { item: "Pork loin", qty: 3, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Frozen peas", qty: 0.5, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "p6", category: "pork", name: "BBQ pulled pork sandwich with slaw", slots: ["lunch", "dinner"],
    cost: 2.70, cal: 620, protein: 32, tags: [],
    ingredients: [
      { item: "Pork shoulder", qty: 4, unit: "oz" },
      { item: "Hamburger buns", qty: 1, unit: "" },
      { item: "BBQ sauce", qty: 2, unit: "tbsp" },
      { item: "Coleslaw mix", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "e1", category: "beef", name: "Beef & potato breakfast hash", slots: ["breakfast"],
    cost: 2.40, cal: 520, protein: 30, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 3, unit: "oz" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Onions", qty: 0.25, unit: "" }
    ]
  },
  {
    id: "e2", category: "beef", name: "Beef & bean chili", slots: ["lunch", "dinner"],
    cost: 2.60, cal: 560, protein: 36, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 4, unit: "oz" },
      { item: "Kidney beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Canned diced tomatoes", qty: 0.5, unit: "cup" },
      { item: "Chili powder", qty: 1, unit: "tsp" }
    ]
  },
  {
    id: "e3", category: "beef", name: "Spaghetti & meatballs", slots: ["dinner"],
    cost: 2.90, cal: 700, protein: 36, tags: [],
    ingredients: [
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Frozen meatballs", qty: 4, unit: "" },
      { item: "Marinara sauce", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "e4", category: "beef", name: "Steak burrito bowl", slots: ["lunch", "dinner"],
    cost: 3.00, cal: 640, protein: 38, tags: [],
    ingredients: [
      { item: "Flank steak", qty: 4, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Black beans (canned)", qty: 0.33, unit: "cup" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "e5", category: "beef", name: "Cheeseburger with side salad", slots: ["dinner"],
    cost: 3.20, cal: 660, protein: 36, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 5, unit: "oz" },
      { item: "Hamburger buns", qty: 1, unit: "" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Romaine lettuce", qty: 1.5, unit: "cup" }
    ]
  },
  {
    id: "e6", category: "beef", name: "Korean-style beef rice bowl", slots: ["dinner"],
    cost: 3.30, cal: 620, protein: 34, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 4, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" },
      { item: "Cucumbers", qty: 0.5, unit: "" },
      { item: "Frozen edamame", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "f1", category: "seafood", name: "Smoked salmon bagel", slots: ["breakfast"],
    cost: 3.00, cal: 450, protein: 26, tags: [],
    ingredients: [
      { item: "Bagels", qty: 1, unit: "" },
      { item: "Smoked salmon", qty: 2, unit: "oz" },
      { item: "Cream cheese", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "f2", category: "seafood", name: "Fish tacos with slaw", slots: ["dinner"],
    cost: 3.20, cal: 560, protein: 32, tags: [],
    ingredients: [
      { item: "Tilapia fillet", qty: 5, unit: "oz" },
      { item: "Tortillas", qty: 3, unit: "" },
      { item: "Coleslaw mix", qty: 1, unit: "cup" },
      { item: "Lemons", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "f3", category: "seafood", name: "Tuna poke-style bowl", slots: ["lunch", "dinner"],
    cost: 3.80, cal: 540, protein: 34, tags: [],
    ingredients: [
      { item: "Frozen ahi tuna", qty: 4, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Cucumbers", qty: 0.5, unit: "" },
      { item: "Avocados", qty: 0.25, unit: "" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "f4", category: "seafood", name: "Shrimp fried rice", slots: ["lunch", "dinner"],
    cost: 3.00, cal: 560, protein: 30, tags: [],
    ingredients: [
      { item: "Frozen shrimp", qty: 4, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Frozen peas", qty: 0.5, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "f5", category: "seafood", name: "Baked tilapia with quinoa & spinach", slots: ["dinner"],
    cost: 3.10, cal: 480, protein: 40, tags: [],
    ingredients: [
      { item: "Tilapia fillet", qty: 6, unit: "oz" },
      { item: "Quinoa (dry)", qty: 0.33, unit: "cup" },
      { item: "Spinach", qty: 1, unit: "cup" },
      { item: "Lemons", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "c1", category: "chicken", name: "Chicken sausage breakfast skillet", slots: ["breakfast"],
    cost: 2.10, cal: 450, protein: 26, tags: [],
    ingredients: [
      { item: "Chicken sausage links", qty: 2, unit: "" },
      { item: "Potatoes", qty: 0.5, unit: "" },
      { item: "Bell peppers", qty: 0.25, unit: "" },
      { item: "Eggs", qty: 1, unit: "" }
    ]
  },
  {
    id: "c2", category: "chicken", name: "Buffalo chicken wrap", slots: ["lunch"],
    cost: 2.80, cal: 540, protein: 40, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 5, unit: "oz" },
      { item: "Tortillas", qty: 1, unit: "" },
      { item: "Buffalo sauce", qty: 1, unit: "tbsp" },
      { item: "Romaine lettuce", qty: 1, unit: "cup" },
      { item: "Ranch dressing", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "c3", category: "chicken", name: "Chicken tikka-style curry with rice", slots: ["dinner"],
    cost: 2.90, cal: 620, protein: 40, tags: [],
    ingredients: [
      { item: "Chicken thighs", qty: 5, unit: "oz" },
      { item: "Greek yogurt", qty: 0.25, unit: "cup" },
      { item: "Canned diced tomatoes", qty: 0.5, unit: "cup" },
      { item: "Curry powder", qty: 1, unit: "tsp" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" }
    ]
  },
  {
    id: "c4", category: "chicken", name: "Honey garlic chicken thighs & potatoes", slots: ["dinner"],
    cost: 2.50, cal: 640, protein: 40, tags: [],
    ingredients: [
      { item: "Chicken thighs", qty: 6, unit: "oz" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Honey", qty: 1, unit: "tbsp" },
      { item: "Green beans", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "v1", category: "vegetarian", name: "Spinach & feta egg muffins", slots: ["breakfast"],
    cost: 1.40, cal: 360, protein: 24, tags: ["vegetarian"],
    ingredients: [
      { item: "Eggs", qty: 3, unit: "" },
      { item: "Spinach", qty: 1, unit: "cup" },
      { item: "Feta cheese", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "v2", category: "vegetarian", name: "Banana chia pudding", slots: ["breakfast"],
    cost: 1.20, cal: 380, protein: 10, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Chia seeds", qty: 3, unit: "tbsp" },
      { item: "Soy milk", qty: 1, unit: "cup" },
      { item: "Bananas", qty: 1, unit: "" }
    ]
  },
  {
    id: "v3", category: "vegetarian", name: "Chickpea salad sandwich", slots: ["lunch"],
    cost: 1.50, cal: 480, protein: 18, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Chickpeas (canned)", qty: 0.75, unit: "cup" },
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Vegan mayo", qty: 1, unit: "tbsp" },
      { item: "Spinach", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "v4", category: "vegetarian", name: "Eggplant parmesan", slots: ["dinner"],
    cost: 2.40, cal: 600, protein: 24, tags: ["vegetarian"],
    ingredients: [
      { item: "Eggplant", qty: 0.5, unit: "" },
      { item: "Marinara sauce", qty: 0.5, unit: "cup" },
      { item: "Shredded mozzarella", qty: 0.33, unit: "cup" },
      { item: "Pasta (dry)", qty: 2, unit: "oz" }
    ]
  },
  {
    id: "v5", category: "vegetarian", name: "Mushroom & black bean tacos", slots: ["dinner"],
    cost: 1.80, cal: 520, protein: 18, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Mushrooms", qty: 1, unit: "cup" },
      { item: "Black beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Tortillas", qty: 3, unit: "" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "v6", category: "vegetarian", name: "Lentil bolognese", slots: ["dinner"],
    cost: 1.50, cal: 600, protein: 26, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Lentils (dry)", qty: 0.25, unit: "cup" },
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Marinara sauce", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "v7", category: "vegetarian", name: "Margherita flatbread with salad", slots: ["lunch", "dinner"],
    cost: 2.20, cal: 580, protein: 24, tags: ["vegetarian"],
    ingredients: [
      { item: "Flatbread", qty: 1, unit: "" },
      { item: "Shredded mozzarella", qty: 0.33, unit: "cup" },
      { item: "Tomatoes", qty: 1, unit: "" },
      { item: "Romaine lettuce", qty: 1, unit: "cup" }
    ]
  },
  /* ---------- Added Nov 2026: ideas from a list of 100 easy meals (our own simplified versions) ---------- */
  {
    id: "n1", category: "vegetarian", name: "Maple brown sugar oatmeal", slots: ["breakfast"],
    cost: 0.85, cal: 370, protein: 9, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Rolled oats", qty: 0.5, unit: "cup" },
      { item: "Almond milk", qty: 1, unit: "cup" },
      { item: "Maple syrup", qty: 1, unit: "tbsp" },
      { item: "Brown sugar", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n2", category: "pork", name: "Sausage gravy & biscuits", slots: ["breakfast"],
    cost: 1.90, cal: 640, protein: 20, tags: [],
    ingredients: [
      { item: "Biscuits (refrigerated)", qty: 2, unit: "" },
      { item: "Breakfast sausage", qty: 3, unit: "oz" },
      { item: "Milk", qty: 0.75, unit: "cup" }
    ]
  },
  {
    id: "n3", category: "pork", name: "Breakfast sausage & egg casserole", slots: ["breakfast"],
    cost: 1.75, cal: 480, protein: 28, tags: [],
    ingredients: [
      { item: "Eggs", qty: 2, unit: "" },
      { item: "Breakfast sausage", qty: 2, unit: "oz" },
      { item: "Bread", qty: 1, unit: "slice" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" },
      { item: "Milk", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "n4", category: "vegetarian", name: "Kimchi fried egg over rice", slots: ["breakfast", "lunch"],
    cost: 1.40, cal: 430, protein: 17, tags: ["vegetarian"],
    ingredients: [
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Eggs", qty: 2, unit: "" },
      { item: "Kimchi (vegetarian)", qty: 0.5, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n5", category: "vegetarian", name: "Grilled peanut butter & jelly", slots: ["breakfast", "lunch"],
    cost: 0.75, cal: 520, protein: 14, tags: ["vegetarian"],
    ingredients: [
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Peanut butter", qty: 2, unit: "tbsp" },
      { item: "Jelly", qty: 1, unit: "tbsp" },
      { item: "Butter", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n6", category: "chicken", name: "Chicken fried rice", slots: ["lunch", "dinner"],
    cost: 2.10, cal: 620, protein: 45, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 5, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Frozen mixed vegetables", qty: 0.75, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n7", category: "chicken", name: "Crispy baked chicken tenders with sweet potato fries", slots: ["dinner"],
    cost: 2.60, cal: 640, protein: 50, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 6, unit: "oz" },
      { item: "Panko breadcrumbs", qty: 0.33, unit: "cup" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Sweet potatoes", qty: 1, unit: "" }
    ]
  },
  {
    id: "n8", category: "chicken", name: "Bang bang chicken rice bowl", slots: ["lunch", "dinner"],
    cost: 2.30, cal: 660, protein: 40, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 5, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" },
      { item: "Sweet chili sauce", qty: 1, unit: "tbsp" },
      { item: "Cucumbers", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "n9", category: "chicken", name: "Mississippi chicken sandwich", slots: ["lunch", "dinner"],
    cost: 2.40, cal: 560, protein: 42, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 5, unit: "oz" },
      { item: "Hamburger buns", qty: 1, unit: "" },
      { item: "Ranch dressing", qty: 1, unit: "tbsp" },
      { item: "Pepperoncini", qty: 2, unit: "" },
      { item: "Butter", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n10", category: "chicken", name: "Chicken cordon bleu with green beans", slots: ["dinner"],
    cost: 3.00, cal: 560, protein: 55, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 6, unit: "oz" },
      { item: "Deli ham", qty: 1, unit: "oz" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Panko breadcrumbs", qty: 0.25, unit: "cup" },
      { item: "Green beans", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "n11", category: "chicken", name: "Chicken salad sandwich", slots: ["lunch"],
    cost: 1.90, cal: 540, protein: 36, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 4, unit: "oz" },
      { item: "Mayonnaise", qty: 2, unit: "tbsp" },
      { item: "Celery", qty: 0.5, unit: "" },
      { item: "Bread", qty: 2, unit: "slice" }
    ]
  },
  {
    id: "n12", category: "chicken", name: "Chicken pot pie", slots: ["dinner"],
    cost: 2.20, cal: 620, protein: 30, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 4, unit: "oz" },
      { item: "Frozen mixed vegetables", qty: 0.75, unit: "cup" },
      { item: "Refrigerated pie crust", qty: 0.25, unit: "" },
      { item: "Cream of chicken soup", qty: 0.33, unit: "can" }
    ]
  },
  {
    id: "n13", category: "chicken", name: "Broccoli chicken & rice casserole", slots: ["dinner"],
    cost: 2.40, cal: 640, protein: 40, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 4, unit: "oz" },
      { item: "Broccoli", qty: 1, unit: "cup" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Cream of chicken soup", qty: 0.25, unit: "can" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "n14", category: "chicken", name: "Chicken enchiladas", slots: ["dinner"],
    cost: 2.50, cal: 610, protein: 41, tags: [],
    ingredients: [
      { item: "Chicken breast", qty: 4, unit: "oz" },
      { item: "Tortillas", qty: 2, unit: "" },
      { item: "Enchilada sauce", qty: 0.33, unit: "cup" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "n15", category: "seafood", name: "Brown sugar glazed salmon with rice & green beans", slots: ["dinner"],
    cost: 4.10, cal: 640, protein: 36, tags: [],
    ingredients: [
      { item: "Salmon fillet", qty: 5, unit: "oz" },
      { item: "Brown sugar", qty: 1, unit: "tbsp" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Green beans", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "n16", category: "seafood", name: "Garlic pepper shrimp with rice & broccoli", slots: ["lunch", "dinner"],
    cost: 3.10, cal: 520, protein: 34, tags: [],
    ingredients: [
      { item: "Frozen shrimp", qty: 5, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Butter", qty: 1, unit: "tbsp" },
      { item: "Broccoli", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "n17", category: "seafood", name: "Shrimp peanut noodles", slots: ["lunch", "dinner"],
    cost: 2.90, cal: 640, protein: 37, tags: [],
    ingredients: [
      { item: "Frozen shrimp", qty: 4, unit: "oz" },
      { item: "Noodles (dry)", qty: 3, unit: "oz" },
      { item: "Peanut butter", qty: 2, unit: "tbsp" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" },
      { item: "Bell peppers", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "n18", category: "seafood", name: "Maple Cajun mahi-mahi with rice & corn", slots: ["dinner"],
    cost: 4.00, cal: 520, protein: 35, tags: [],
    ingredients: [
      { item: "Mahi-mahi fillet", qty: 5, unit: "oz" },
      { item: "Maple syrup", qty: 1, unit: "tbsp" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Frozen corn", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "n19", category: "seafood", name: "Tuna tostadas", slots: ["lunch"],
    cost: 2.40, cal: 520, protein: 32, tags: [],
    ingredients: [
      { item: "Canned tuna", qty: 1, unit: "can" },
      { item: "Tostada shells", qty: 2, unit: "" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" },
      { item: "Avocados", qty: 0.5, unit: "" },
      { item: "Salsa", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "n20", category: "seafood", name: "Tuna curry with rice", slots: ["lunch", "dinner"],
    cost: 2.30, cal: 600, protein: 33, tags: [],
    ingredients: [
      { item: "Canned tuna", qty: 1, unit: "can" },
      { item: "Light coconut milk", qty: 0.5, unit: "cup" },
      { item: "Curry powder", qty: 1, unit: "tsp" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Frozen peas", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "n21", category: "seafood", name: "Tuna melt", slots: ["lunch"],
    cost: 1.90, cal: 540, protein: 37, tags: [],
    ingredients: [
      { item: "Canned tuna", qty: 1, unit: "can" },
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n22", category: "seafood", name: "Tuna noodle casserole", slots: ["dinner"],
    cost: 2.30, cal: 660, protein: 40, tags: [],
    ingredients: [
      { item: "Canned tuna", qty: 1, unit: "can" },
      { item: "Noodles (dry)", qty: 3, unit: "oz" },
      { item: "Cream of mushroom soup", qty: 0.33, unit: "can" },
      { item: "Frozen peas", qty: 0.5, unit: "cup" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "n23", category: "seafood", name: "Scallops with pesto cream pasta", slots: ["dinner"],
    cost: 6.50, cal: 720, protein: 36, tags: [],
    ingredients: [
      { item: "Scallops", qty: 5, unit: "oz" },
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Pesto", qty: 2, unit: "tbsp" },
      { item: "Heavy cream", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "n24", category: "seafood", name: "Lobster tail with potatoes & green beans", slots: ["dinner"],
    cost: 11.50, cal: 520, protein: 32, tags: [],
    ingredients: [
      { item: "Lobster tails", qty: 1, unit: "" },
      { item: "Butter", qty: 1, unit: "tbsp" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Green beans", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "n25", category: "seafood", name: "Crispy breaded fish with oven fries", slots: ["dinner"],
    cost: 2.80, cal: 560, protein: 37, tags: [],
    ingredients: [
      { item: "Tilapia fillet", qty: 5, unit: "oz" },
      { item: "Panko breadcrumbs", qty: 0.33, unit: "cup" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Potatoes", qty: 1, unit: "" }
    ]
  },
  {
    id: "n26", category: "seafood", name: "Blackened tuna steak with rice & salad", slots: ["dinner"],
    cost: 4.60, cal: 560, protein: 42, tags: [],
    ingredients: [
      { item: "Frozen ahi tuna", qty: 5, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Romaine lettuce", qty: 1.5, unit: "cup" },
      { item: "Olive oil", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n27", category: "seafood", name: "California roll cucumber salad", slots: ["lunch"],
    cost: 2.70, cal: 480, protein: 16, tags: [],
    ingredients: [
      { item: "Imitation crab", qty: 4, unit: "oz" },
      { item: "Cucumbers", qty: 1, unit: "" },
      { item: "Avocados", qty: 0.5, unit: "" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Soy sauce", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n28", category: "beef", name: "French dip sandwich", slots: ["lunch", "dinner"],
    cost: 3.40, cal: 590, protein: 42, tags: [],
    ingredients: [
      { item: "Deli roast beef", qty: 5, unit: "oz" },
      { item: "Hoagie rolls", qty: 1, unit: "" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Beef broth", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "n29", category: "beef", name: "Reuben sandwich", slots: ["lunch"],
    cost: 3.00, cal: 610, protein: 34, tags: [],
    ingredients: [
      { item: "Deli corned beef", qty: 4, unit: "oz" },
      { item: "Rye bread", qty: 2, unit: "slice" },
      { item: "Sauerkraut", qty: 0.25, unit: "cup" },
      { item: "Cheese slices", qty: 1, unit: "slice" }
    ]
  },
  {
    id: "n30", category: "beef", name: "Chili mac", slots: ["lunch", "dinner"],
    cost: 2.40, cal: 720, protein: 40, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 4, unit: "oz" },
      { item: "Pasta (dry)", qty: 2.5, unit: "oz" },
      { item: "Kidney beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Canned diced tomatoes", qty: 0.5, unit: "cup" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" },
      { item: "Chili powder", qty: 1, unit: "tsp" }
    ]
  },
  {
    id: "n31", category: "beef", name: "Tater tot casserole", slots: ["dinner"],
    cost: 2.40, cal: 740, protein: 33, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 4, unit: "oz" },
      { item: "Tater tots", qty: 1, unit: "cup" },
      { item: "Cream of mushroom soup", qty: 0.25, unit: "can" },
      { item: "Frozen mixed vegetables", qty: 0.5, unit: "cup" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "n32", category: "beef", name: "Mexican beef casserole", slots: ["dinner"],
    cost: 2.50, cal: 700, protein: 40, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 4, unit: "oz" },
      { item: "Tortillas", qty: 2, unit: "" },
      { item: "Salsa", qty: 3, unit: "tbsp" },
      { item: "Black beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "n33", category: "beef", name: "Shipwreck casserole", slots: ["dinner"],
    cost: 2.10, cal: 610, protein: 34, tags: [],
    ingredients: [
      { item: "Ground beef", qty: 4, unit: "oz" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Onions", qty: 0.5, unit: "" },
      { item: "Kidney beans (canned)", qty: 0.5, unit: "cup" },
      { item: "Canned diced tomatoes", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "n34", category: "beef", name: "Creamed chipped beef on toast", slots: ["breakfast", "lunch"],
    cost: 2.30, cal: 480, protein: 27, tags: [],
    ingredients: [
      { item: "Dried beef", qty: 2, unit: "oz" },
      { item: "Milk", qty: 1, unit: "cup" },
      { item: "Butter", qty: 1, unit: "tbsp" },
      { item: "Bread", qty: 2, unit: "slice" }
    ]
  },
  {
    id: "n35", category: "beef", name: "Meatball sub casserole", slots: ["dinner"],
    cost: 2.80, cal: 760, protein: 36, tags: [],
    ingredients: [
      { item: "Frozen meatballs", qty: 5, unit: "" },
      { item: "Hoagie rolls", qty: 1, unit: "" },
      { item: "Marinara sauce", qty: 0.5, unit: "cup" },
      { item: "Shredded mozzarella", qty: 0.25, unit: "cup" }
    ]
  },
  {
    id: "n36", category: "beef", name: "Garlic butter sirloin steak with potatoes", slots: ["dinner"],
    cost: 4.80, cal: 650, protein: 48, tags: [],
    ingredients: [
      { item: "Sirloin steak", qty: 6, unit: "oz" },
      { item: "Butter", qty: 1, unit: "tbsp" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Green beans", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "n37", category: "beef", name: "Beef hot dogs with carrot sticks", slots: ["lunch", "dinner"],
    cost: 1.80, cal: 640, protein: 18, tags: [],
    ingredients: [
      { item: "Beef hot dogs", qty: 2, unit: "" },
      { item: "Hot dog buns", qty: 2, unit: "" },
      { item: "Baby carrots", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "n38", category: "beef", name: "Lamb chops with potatoes & green beans", slots: ["dinner"],
    cost: 6.20, cal: 640, protein: 40, tags: [],
    ingredients: [
      { item: "Lamb chops", qty: 6, unit: "oz" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Green beans", qty: 1, unit: "cup" },
      { item: "Olive oil", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n39", category: "pork", name: "Fettuccine Alfredo with ham & peas", slots: ["dinner"],
    cost: 2.60, cal: 720, protein: 33, tags: [],
    ingredients: [
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Alfredo sauce", qty: 0.33, unit: "cup" },
      { item: "Deli ham", qty: 3, unit: "oz" },
      { item: "Frozen peas", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "n40", category: "pork", name: "Bacon & pickle flatbread pizza", slots: ["lunch", "dinner"],
    cost: 2.60, cal: 640, protein: 27, tags: [],
    ingredients: [
      { item: "Flatbread", qty: 1, unit: "" },
      { item: "Bacon", qty: 2, unit: "slice" },
      { item: "Dill pickles", qty: 0.25, unit: "cup" },
      { item: "Shredded mozzarella", qty: 0.33, unit: "cup" }
    ]
  },
  {
    id: "n41", category: "pork", name: "Brown sugar ham steak with sweet potatoes", slots: ["dinner"],
    cost: 3.00, cal: 560, protein: 34, tags: [],
    ingredients: [
      { item: "Ham steak", qty: 5, unit: "oz" },
      { item: "Brown sugar", qty: 1, unit: "tbsp" },
      { item: "Sweet potatoes", qty: 1, unit: "" },
      { item: "Green beans", qty: 1, unit: "cup" }
    ]
  },
  {
    id: "n42", category: "pork", name: "Kielbasa with peppers & potatoes", slots: ["dinner"],
    cost: 2.70, cal: 640, protein: 20, tags: [],
    ingredients: [
      { item: "Kielbasa", qty: 4, unit: "oz" },
      { item: "Bell peppers", qty: 1, unit: "" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Onions", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "n43", category: "pork", name: "Brats with peppers & onions", slots: ["dinner"],
    cost: 2.20, cal: 560, protein: 18, tags: [],
    ingredients: [
      { item: "Bratwurst", qty: 1, unit: "" },
      { item: "Hot dog buns", qty: 1, unit: "" },
      { item: "Bell peppers", qty: 0.5, unit: "" },
      { item: "Onions", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "n44", category: "pork", name: "Fried bologna sandwich", slots: ["lunch"],
    cost: 1.50, cal: 560, protein: 18, tags: [],
    ingredients: [
      { item: "Bologna", qty: 3, unit: "slice" },
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n45", category: "pork", name: "Grilled Hawaiian ham sandwich", slots: ["lunch"],
    cost: 2.10, cal: 520, protein: 26, tags: [],
    ingredients: [
      { item: "Deli ham", qty: 3, unit: "oz" },
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Pineapple chunks", qty: 0.25, unit: "cup" },
      { item: "Butter", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n46", category: "pork", name: "Cajun pork chops with rice & corn", slots: ["dinner"],
    cost: 2.70, cal: 620, protein: 42, tags: [],
    ingredients: [
      { item: "Pork chops", qty: 6, unit: "oz" },
      { item: "Rice (dry)", qty: 0.33, unit: "cup" },
      { item: "Frozen corn", qty: 0.5, unit: "cup" },
      { item: "Chili powder", qty: 1, unit: "tsp" }
    ]
  },
  {
    id: "n47", category: "pork", name: "Classic BLT", slots: ["lunch"],
    cost: 2.00, cal: 520, protein: 18, tags: [],
    ingredients: [
      { item: "Bacon", qty: 4, unit: "slice" },
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Romaine lettuce", qty: 0.5, unit: "cup" },
      { item: "Tomatoes", qty: 0.5, unit: "" },
      { item: "Mayonnaise", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n48", category: "seafood", name: "Shrimp lo mein", slots: ["lunch", "dinner"],
    cost: 2.70, cal: 580, protein: 34, tags: [],
    ingredients: [
      { item: "Frozen shrimp", qty: 4, unit: "oz" },
      { item: "Noodles (dry)", qty: 3, unit: "oz" },
      { item: "Frozen mixed vegetables", qty: 1, unit: "cup" },
      { item: "Soy sauce", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "n49", category: "vegetarian", name: "Cheesy ramen with egg & veggies", slots: ["lunch"],
    cost: 0.90, cal: 520, protein: 19, tags: ["vegetarian"],
    ingredients: [
      { item: "Ramen noodles", qty: 1, unit: "" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Cheese slices", qty: 1, unit: "slice" },
      { item: "Frozen mixed vegetables", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "n50", category: "vegetarian", name: "Chickpea tacos", slots: ["lunch", "dinner"],
    cost: 1.70, cal: 580, protein: 18, tags: ["vegetarian", "vegan"],
    ingredients: [
      { item: "Tortillas", qty: 3, unit: "" },
      { item: "Chickpeas (canned)", qty: 0.75, unit: "cup" },
      { item: "Salsa", qty: 2, unit: "tbsp" },
      { item: "Avocados", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "n51", category: "vegetarian", name: "Fettuccine with sweet pepper sauce", slots: ["dinner"],
    cost: 2.10, cal: 680, protein: 20, tags: ["vegetarian"],
    ingredients: [
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Bell peppers", qty: 1, unit: "" },
      { item: "Heavy cream", qty: 0.25, unit: "cup" },
      { item: "Parmesan cheese", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "n52", category: "vegetarian", name: "Summer tomato basil pasta", slots: ["lunch", "dinner"],
    cost: 1.70, cal: 600, protein: 20, tags: ["vegetarian"],
    ingredients: [
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Tomatoes", qty: 2, unit: "" },
      { item: "Olive oil", qty: 1, unit: "tbsp" },
      { item: "Parmesan cheese", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "n53", category: "vegetarian", name: "Garlic bread grilled cheese with tomato soup", slots: ["lunch"],
    cost: 1.80, cal: 620, protein: 22, tags: ["vegetarian"],
    ingredients: [
      { item: "Bread", qty: 2, unit: "slice" },
      { item: "Cheese slices", qty: 2, unit: "slice" },
      { item: "Butter", qty: 1, unit: "tbsp" },
      { item: "Tomato soup", qty: 0.5, unit: "can" }
    ]
  },
  {
    id: "n54", category: "vegetarian", name: "Halushki (buttered cabbage & noodles)", slots: ["lunch", "dinner"],
    cost: 1.20, cal: 520, protein: 14, tags: ["vegetarian"],
    ingredients: [
      { item: "Cabbage", qty: 0.25, unit: "" },
      { item: "Noodles (dry)", qty: 3, unit: "oz" },
      { item: "Butter", qty: 1, unit: "tbsp" },
      { item: "Onions", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "n55", category: "vegetarian", name: "Cacio e pepe", slots: ["dinner"],
    cost: 1.40, cal: 620, protein: 22, tags: ["vegetarian"],
    ingredients: [
      { item: "Pasta (dry)", qty: 4, unit: "oz" },
      { item: "Parmesan cheese", qty: 3, unit: "tbsp" },
      { item: "Butter", qty: 1, unit: "tbsp" }
    ]
  },
  {
    id: "n56", category: "vegetarian", name: "Corn chowder with bread", slots: ["lunch", "dinner"],
    cost: 1.70, cal: 520, protein: 16, tags: ["vegetarian"],
    ingredients: [
      { item: "Frozen corn", qty: 1, unit: "cup" },
      { item: "Potatoes", qty: 1, unit: "" },
      { item: "Milk", qty: 1, unit: "cup" },
      { item: "Onions", qty: 0.5, unit: "" },
      { item: "Bread", qty: 1, unit: "slice" }
    ]
  },
  {
    id: "n57", category: "vegetarian", name: "Loaded potato soup", slots: ["lunch", "dinner"],
    cost: 1.50, cal: 560, protein: 20, tags: ["vegetarian"],
    ingredients: [
      { item: "Potatoes", qty: 2, unit: "" },
      { item: "Milk", qty: 1, unit: "cup" },
      { item: "Shredded cheese", qty: 0.25, unit: "cup" },
      { item: "Onions", qty: 0.5, unit: "" }
    ]
  },
  {
    id: "n58", category: "vegetarian", name: "Eggplant pasta", slots: ["dinner"],
    cost: 2.00, cal: 560, protein: 19, tags: ["vegetarian"],
    ingredients: [
      { item: "Eggplant", qty: 0.5, unit: "" },
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Marinara sauce", qty: 0.5, unit: "cup" },
      { item: "Parmesan cheese", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: "n59", category: "vegetarian", name: "Classic pancakes with berries", slots: ["breakfast"],
    cost: 1.20, cal: 560, protein: 16, tags: ["vegetarian"],
    ingredients: [
      { item: "Pancake mix", qty: 0.75, unit: "cup" },
      { item: "Milk", qty: 0.5, unit: "cup" },
      { item: "Eggs", qty: 1, unit: "" },
      { item: "Maple syrup", qty: 1, unit: "tbsp" },
      { item: "Frozen berries", qty: 0.5, unit: "cup" }
    ]
  },
  {
    id: "n60", category: "vegetarian", name: "Pesto pasta with peas", slots: ["lunch", "dinner"],
    cost: 1.90, cal: 620, protein: 20, tags: ["vegetarian"],
    ingredients: [
      { item: "Pasta (dry)", qty: 3, unit: "oz" },
      { item: "Pesto", qty: 2, unit: "tbsp" },
      { item: "Frozen peas", qty: 0.5, unit: "cup" },
      { item: "Parmesan cheese", qty: 1, unit: "tbsp" }
    ]
  }
];
