-- Add Google OAuth support to user table
-- Run: psql $DATABASE_URL -f database-migrations/add-google-oauth.sql

ALTER TABLE "user"
  ALTER COLUMN "password" DROP NOT NULL;

ALTER TABLE "user"
  ADD COLUMN IF NOT EXISTS "google_id" VARCHAR(255) UNIQUE,
  ADD COLUMN IF NOT EXISTS "auth_provider" VARCHAR(20) NOT NULL DEFAULT 'local';
