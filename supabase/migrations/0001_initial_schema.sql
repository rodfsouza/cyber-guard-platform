/*
  # Initial Schema for CyberGuard (FIXED)

  This migration sets up the initial tables required for the application.
  This version fixes idempotency issues by dropping policies before creating them,
  and adds a trigger to automatically create a user profile on signup.

  1. New Tables
    - `profiles`: Stores user-specific data and is linked to the `auth.users` table. Includes a role for RBAC.
    - `organizations`: Represents the tenants in the multi-tenant system.
    - `organization_members`: Maps users (profiles) to organizations.
    - `assessments`: Stores assessment records, linked to an organization and a framework.
  
  2. Triggers
    - `handle_new_user`: A trigger function to create a `profiles` entry when a new user signs up in `auth.users`.

  3. Security
    - Enables Row Level Security (RLS) on all new tables.
    - Adds policies to ensure users can only access data within their own organization.
*/

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  role text NOT NULL DEFAULT 'Contributor'
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ORGANIZATIONS
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- ORGANIZATION MEMBERS
CREATE TABLE IF NOT EXISTS organization_members (
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (organization_id, profile_id)
);

ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Allow members to see their own organization details
DROP POLICY IF EXISTS "Organization members can view their own organization" ON organizations;
CREATE POLICY "Organization members can view their own organization"
  ON organizations FOR SELECT
  USING (
    id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );

-- Allow members to see other members of their organization
DROP POLICY IF EXISTS "Organization members can view other members" ON organization_members;
CREATE POLICY "Organization members can view other members"
  ON organization_members FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );

-- ASSESSMENTS
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  framework_name text NOT NULL, -- e.g., 'NIST CSF', 'ISO 27001'
  status text NOT NULL DEFAULT 'Not Started', -- e.g., 'Not Started', 'In Progress', 'Completed'
  score numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Organization members can view their assessments" ON assessments;
CREATE POLICY "Organization members can view their assessments"
  ON assessments FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Organization members can create assessments" ON assessments;
CREATE POLICY "Organization members can create assessments"
  ON assessments FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Organization members can update their assessments" ON assessments;
CREATE POLICY "Organization members can update their assessments"
  ON assessments FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );

-- TRIGGER FOR NEW USER PROFILE
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
