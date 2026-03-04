-- Add prep time, cook time, and servings to recipes
-- Run this on an existing database to add the new columns without recreating tables.
--
-- To run: psql $DATABASE_URL -f database-migrations/add-recipe-time-servings.sql
-- Or, if using local postgres: psql -d your_db_name -f database-migrations/add-recipe-time-servings.sql

ALTER TABLE "recipes"
  ADD COLUMN IF NOT EXISTS "prep_time_minutes" INTEGER,
  ADD COLUMN IF NOT EXISTS "cook_time_minutes" INTEGER,
  ADD COLUMN IF NOT EXISTS "servings" VARCHAR(50);
