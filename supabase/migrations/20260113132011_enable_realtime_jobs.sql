-- Enable replica identity for DELETE events to work properly
ALTER TABLE jobs REPLICA IDENTITY FULL;

-- Add jobs table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
