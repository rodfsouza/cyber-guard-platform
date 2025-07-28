```sql
/*
  # Add Tasks Table

  This migration adds the `tasks` table for the Kanban board feature.

  1. New Tables
    - `tasks`: Stores task information, including status, priority, and assignee.
  
  2. Security
    - Enables Row Level Security (RLS) on the `tasks` table.
    - Adds policies to ensure users can only manage tasks within their own organization.
*/

-- TASKS TABLE
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'To Do', -- e.g., 'To Do', 'In Progress', 'Completed'
  priority text DEFAULT 'Medium', -- e.g., 'Low', 'Medium', 'High'
  assignee_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR TASKS
DROP POLICY IF EXISTS "Organization members can view their tasks" ON tasks;
CREATE POLICY "Organization members can view their tasks"
  ON tasks FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Organization members can create tasks" ON tasks;
CREATE POLICY "Organization members can create tasks"
  ON tasks FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Organization members can update their tasks" ON tasks;
CREATE POLICY "Organization members can update their tasks"
  ON tasks FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Organization members can delete their tasks" ON tasks;
CREATE POLICY "Organization members can delete their tasks"
  ON tasks FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE profile_id = auth.uid()
    )
  );
```