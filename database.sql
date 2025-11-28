-- START FROM SCRATCH

-- Drop existing tables/triggers to start fresh
DROP TRIGGER IF EXISTS "on_user_update" ON "user";
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "recipes" CASCADE;
DROP TABLE IF EXISTS "tags" CASCADE;
DROP TABLE IF EXISTS "recipe_tags" CASCADE;
DROP TABLE IF EXISTS "favorites" CASCADE;
DROP TABLE IF EXISTS "made_recipes" CASCADE;

-- TABLE SCHEMAS

-- USERS TABLE
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "profile_image_url" TEXT,
  "is_admin" BOOLEAN NOT NULL DEFAULT FALSE,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RECIPES TABLE
CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "original_recipe_id" INTEGER,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "ingredients" TEXT NOT NULL,
  "instructions" TEXT NOT NULL,
  "nutrition" TEXT,
  "image_url" TEXT,
  "source_url" TEXT,
  "is_public" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("original_recipe_id") REFERENCES "recipes" ("id") ON DELETE SET NULL
);

-- TAGS TABLE
CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) UNIQUE NOT NULL
);

-- RECIPE TAGS (JOIN TABLE)
CREATE TABLE "recipe_tags" (
  "recipe_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  PRIMARY KEY ("recipe_id", "tag_id"),
  FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE CASCADE
);

-- FAVORITES TABLE
CREATE TABLE "favorites" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "recipe_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE,
  UNIQUE ("user_id", "recipe_id")
);

-- MADE RECIPES TABLE (Stretch Goal)
CREATE TABLE "made_recipes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "recipe_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE
);


-- Initial seed data for ingredients

INSERT INTO ingredients (name, category) VALUES
('All-purpose flour', 'Baking'),
('Baking powder', 'Baking'),
('Baking soda', 'Baking'),
('Brown sugar', 'Baking'),
('Granulated sugar', 'Baking'),
('Butter', 'Dairy'),
('Milk', 'Dairy'),
('Eggs', 'Dairy'),
('Olive oil', 'Oils'),
('Vegetable oil', 'Oils'),
('Chicken breast', 'Protein'),
('Ground beef', 'Protein'),
('Pork sausage', 'Protein'),
('Salmon', 'Protein'),
('Shrimp', 'Protein'),
('Carrots', 'Produce'),
('Celery', 'Produce'),
('Onion', 'Produce'),
('Garlic', 'Produce'),
('Tomatoes', 'Produce'),
('Corn', 'Produce'),
('Bell pepper', 'Produce'),
('Potatoes', 'Produce'),
('Rice', 'Grains'),
('Pasta', 'Grains'),
('Bread crumbs', 'Grains'),
('Parmesan cheese', 'Dairy'),
('Cheddar cheese', 'Dairy'),
('Mozzarella cheese', 'Dairy'),
('Spinach', 'Produce'),
('Broccoli', 'Produce'),
('Zucchini', 'Produce'),
('Lemon juice', 'Condiments'),
('Soy sauce', 'Condiments'),
('Worcestershire sauce', 'Condiments'),
('Salt', 'Seasoning'),
('Black pepper', 'Seasoning'),
('Paprika', 'Seasoning'),
('Cumin', 'Seasoning'),
('Oregano', 'Seasoning'),
('Basil', 'Seasoning'),
('Thyme', 'Seasoning'),
('Rosemary', 'Seasoning'),
('Chili powder', 'Seasoning'),
('Cinnamon', 'Spices'),
('Nutmeg', 'Spices'),
('Vanilla extract', 'Baking'),
('Honey', 'Condiments'),
('Maple syrup', 'Condiments'),
('Vinegar', 'Condiments');
