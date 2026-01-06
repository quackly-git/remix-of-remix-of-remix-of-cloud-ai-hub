-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create profile for existing user who is missing one
INSERT INTO public.profiles (user_id, username, display_name, email)
SELECT 
  id,
  COALESCE(raw_user_meta_data ->> 'username', 'user_' || substr(id::text, 1, 8)),
  COALESCE(raw_user_meta_data ->> 'display_name', raw_user_meta_data ->> 'username', 'User'),
  email
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.profiles);