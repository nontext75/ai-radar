-- Supabase migration - Add target_roles array to contents table

ALTER TABLE contents ADD COLUMN target_roles TEXT[] DEFAULT '{}';

-- Update existing content rows with job roles based on their characteristics
-- Design/Agent (IDs: 1, 2, 3, 4, 14-25) -> Developer, Designer, Publisher
UPDATE contents SET target_roles = ARRAY['developer', 'designer', 'publisher'] 
WHERE id IN (1, 2, 3, 4, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);

-- Workflows / Code Quality (IDs: 5, 6, 7, 8, 9) -> Developer
UPDATE contents SET target_roles = ARRAY['developer'] 
WHERE id IN (5, 6, 7, 8, 9);

-- Automation (IDs: 10, 11) -> Developer, PM
UPDATE contents SET target_roles = ARRAY['developer', 'pm'] 
WHERE id IN (10, 11);

-- Reference / Tutorials (IDs: 12, 13) -> Developer, PM
UPDATE contents SET target_roles = ARRAY['developer', 'pm'] 
WHERE id IN (12, 13);
