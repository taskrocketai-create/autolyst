-- Autolyst Database Schema
-- Migration: 0001_initial_schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- REALTORS / USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS realtors (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  phone       TEXT,
  brokerage   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LISTINGS
-- ============================================================
CREATE TYPE listing_status AS ENUM (
  'intake',
  'processing',
  'review',
  'published',
  'archived'
);

CREATE TABLE IF NOT EXISTS listings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  realtor_id      UUID NOT NULL REFERENCES realtors(id) ON DELETE CASCADE,
  address         TEXT NOT NULL,
  city            TEXT NOT NULL,
  state           TEXT NOT NULL,
  zip             TEXT NOT NULL,
  price           NUMERIC(12, 2),
  bedrooms        INTEGER,
  bathrooms       NUMERIC(4, 1),
  sqft            INTEGER,
  lot_size        NUMERIC(10, 2),
  year_built      INTEGER,
  description     TEXT,
  status          listing_status NOT NULL DEFAULT 'intake',
  mls_number      TEXT,
  cover_image_url TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LISTING IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS listing_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id  UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  caption     TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- AI GENERATED CONTENT
-- ============================================================
CREATE TABLE IF NOT EXISTS listing_content (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id      UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  headline        TEXT,
  short_desc      TEXT,
  long_desc       TEXT,
  features        JSONB,
  seo_title       TEXT,
  seo_description TEXT,
  generated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at     TIMESTAMPTZ,
  approved_by     UUID REFERENCES realtors(id)
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  realtor_id  UUID NOT NULL REFERENCES realtors(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  read        BOOLEAN NOT NULL DEFAULT FALSE,
  listing_id  UUID REFERENCES listings(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_realtors_updated_at
  BEFORE UPDATE ON realtors
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE realtors       ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications  ENABLE ROW LEVEL SECURITY;

-- Realtors: own row only
CREATE POLICY realtors_self ON realtors
  FOR ALL USING (auth.uid() = user_id);

-- Listings: realtor sees their own
CREATE POLICY listings_owner ON listings
  FOR ALL USING (
    realtor_id = (SELECT id FROM realtors WHERE user_id = auth.uid())
  );

-- Images: via listing ownership
CREATE POLICY listing_images_owner ON listing_images
  FOR ALL USING (
    listing_id IN (
      SELECT id FROM listings
      WHERE realtor_id = (SELECT id FROM realtors WHERE user_id = auth.uid())
    )
  );

-- Content: via listing ownership
CREATE POLICY listing_content_owner ON listing_content
  FOR ALL USING (
    listing_id IN (
      SELECT id FROM listings
      WHERE realtor_id = (SELECT id FROM realtors WHERE user_id = auth.uid())
    )
  );

-- Notifications: own only
CREATE POLICY notifications_owner ON notifications
  FOR ALL USING (
    realtor_id = (SELECT id FROM realtors WHERE user_id = auth.uid())
  );
