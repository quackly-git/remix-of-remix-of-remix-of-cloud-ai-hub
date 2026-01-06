CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'moderator',
    'user'
);


--
-- Name: follow_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.follow_status AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


--
-- Name: award_comment_xp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.award_comment_xp() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  UPDATE profiles SET xp = xp + 1 WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$;


--
-- Name: award_discussion_xp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.award_discussion_xp() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  UPDATE profiles SET xp = xp + 2 WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$;


--
-- Name: award_post_comment_xp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.award_post_comment_xp() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  UPDATE profiles SET xp = xp + 1 WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$;


--
-- Name: award_post_xp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.award_post_xp() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  IF NEW.is_draft = false THEN
    UPDATE profiles SET xp = xp + 2 WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;


--
-- Name: can_view_profile(uuid, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.can_view_profile(_viewer_id uuid, _profile_user_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT 
    _viewer_id = _profile_user_id 
    OR EXISTS (SELECT 1 FROM profiles WHERE user_id = _profile_user_id AND is_public = true)
    OR EXISTS (
      SELECT 1 FROM follows 
      WHERE follower_id = _viewer_id 
      AND following_id = _profile_user_id 
      AND status = 'accepted'
    )
$$;


--
-- Name: handle_marks_log_xp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_marks_log_xp() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  xp_award INTEGER;
BEGIN
  xp_award := GREATEST(1, ROUND((NEW.marks_obtained::DECIMAL / NEW.total_marks) * 10));
  NEW.xp_earned := xp_award;
  
  UPDATE profiles SET 
    xp = xp + xp_award,
    papers_solved = papers_solved + 1
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'username', 'user_' || substr(new.id::text, 1, 8)),
    COALESCE(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'username', 'User'),
    new.email
  );
  RETURN new;
END;
$$;


--
-- Name: handle_xp_donation(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_xp_donation() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  sender_xp INTEGER;
BEGIN
  SELECT xp INTO sender_xp FROM profiles WHERE user_id = NEW.from_user_id;
  
  IF sender_xp < NEW.amount THEN
    RAISE EXCEPTION 'Insufficient XP';
  END IF;
  
  UPDATE profiles SET xp = xp - NEW.amount WHERE user_id = NEW.from_user_id;
  UPDATE profiles SET xp = xp + NEW.amount WHERE user_id = NEW.to_user_id;
  
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: update_post_votes(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_post_votes() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.post_id IS NOT NULL THEN
      IF NEW.vote_type = 'up' THEN
        UPDATE posts SET upvotes = upvotes + 1 WHERE id = NEW.post_id;
      ELSE
        UPDATE posts SET downvotes = downvotes + 1 WHERE id = NEW.post_id;
      END IF;
    ELSIF NEW.comment_id IS NOT NULL THEN
      IF NEW.vote_type = 'up' THEN
        UPDATE post_comments SET upvotes = upvotes + 1 WHERE id = NEW.comment_id;
      ELSE
        UPDATE post_comments SET downvotes = downvotes + 1 WHERE id = NEW.comment_id;
      END IF;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.post_id IS NOT NULL THEN
      IF OLD.vote_type = 'up' THEN
        UPDATE posts SET upvotes = upvotes - 1 WHERE id = OLD.post_id;
      ELSE
        UPDATE posts SET downvotes = downvotes - 1 WHERE id = OLD.post_id;
      END IF;
    ELSIF OLD.comment_id IS NOT NULL THEN
      IF OLD.vote_type = 'up' THEN
        UPDATE post_comments SET upvotes = upvotes - 1 WHERE id = OLD.comment_id;
      ELSE
        UPDATE post_comments SET downvotes = downvotes - 1 WHERE id = OLD.comment_id;
      END IF;
    END IF;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.vote_type != NEW.vote_type THEN
      IF OLD.post_id IS NOT NULL THEN
        IF OLD.vote_type = 'up' THEN
          UPDATE posts SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = OLD.post_id;
        ELSE
          UPDATE posts SET upvotes = upvotes + 1, downvotes = downvotes - 1 WHERE id = OLD.post_id;
        END IF;
      ELSIF OLD.comment_id IS NOT NULL THEN
        IF OLD.vote_type = 'up' THEN
          UPDATE post_comments SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = OLD.comment_id;
        ELSE
          UPDATE post_comments SET upvotes = upvotes + 1, downvotes = downvotes - 1 WHERE id = OLD.comment_id;
        END IF;
      END IF;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: custom_discussions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.custom_discussions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    description text,
    created_by uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: discussion_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.discussion_comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    discussion_id uuid NOT NULL,
    user_id uuid NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: discussions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.discussions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    category text,
    upvotes integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: follows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.follows (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    follower_id uuid NOT NULL,
    following_id uuid NOT NULL,
    status public.follow_status DEFAULT 'pending'::public.follow_status NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT follows_check CHECK ((follower_id <> following_id))
);


--
-- Name: marks_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.marks_log (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    paper_name text NOT NULL,
    marks_obtained integer NOT NULL,
    total_marks integer NOT NULL,
    subject text,
    exam_board text,
    level text,
    xp_earned integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: paper_threads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.paper_threads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    paper_id text NOT NULL,
    paper_year integer,
    paper_session text,
    title text NOT NULL,
    welcome_message text DEFAULT 'Post any questions, comments, or discussions about this paper here! 📝'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: post_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    parent_id uuid,
    content text NOT NULL,
    images text[] DEFAULT '{}'::text[],
    upvotes integer DEFAULT 0,
    downvotes integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: post_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_tags (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_id uuid NOT NULL,
    tag_id uuid NOT NULL
);


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    thread_id uuid,
    title text NOT NULL,
    content text NOT NULL,
    question_number integer,
    images text[] DEFAULT '{}'::text[],
    upvotes integer DEFAULT 0,
    downvotes integer DEFAULT 0,
    is_draft boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    discussion_type text DEFAULT 'general'::text,
    discussion_id text,
    CONSTRAINT posts_question_number_check CHECK (((question_number >= 1) AND (question_number <= 8)))
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    username text NOT NULL,
    display_name text,
    bio text,
    avatar_url text,
    avatar_type text DEFAULT 'initials'::text,
    avatar_emoji text,
    avatar_kawaii text,
    xp integer DEFAULT 5 NOT NULL,
    papers_solved integer DEFAULT 0 NOT NULL,
    is_public boolean DEFAULT true NOT NULL,
    email text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    hidden_sections text[] DEFAULT '{}'::text[],
    CONSTRAINT profiles_avatar_type_check CHECK ((avatar_type = ANY (ARRAY['initials'::text, 'image'::text, 'kawaii'::text, 'emoji'::text])))
);


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    color text DEFAULT 'primary'::text,
    is_custom boolean DEFAULT false,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role DEFAULT 'user'::public.app_role NOT NULL
);


--
-- Name: user_subjects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_subjects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    subject_name text NOT NULL,
    exam_board text NOT NULL,
    level text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_subjects_exam_board_check CHECK ((exam_board = ANY (ARRAY['cambridge'::text, 'edexcel'::text]))),
    CONSTRAINT user_subjects_level_check CHECK ((level = ANY (ARRAY['igcse'::text, 'alevel'::text])))
);


--
-- Name: user_universities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_universities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    university_name text NOT NULL,
    country text NOT NULL,
    alpha_two_code text NOT NULL,
    web_page text,
    state_province text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.votes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    post_id uuid,
    comment_id uuid,
    vote_type text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT vote_target_check CHECK ((((post_id IS NOT NULL) AND (comment_id IS NULL)) OR ((post_id IS NULL) AND (comment_id IS NOT NULL)))),
    CONSTRAINT votes_vote_type_check CHECK ((vote_type = ANY (ARRAY['up'::text, 'down'::text])))
);


--
-- Name: xp_donations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.xp_donations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    from_user_id uuid NOT NULL,
    to_user_id uuid NOT NULL,
    amount integer NOT NULL,
    message text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT xp_donations_amount_check CHECK ((amount > 0)),
    CONSTRAINT xp_donations_check CHECK ((from_user_id <> to_user_id))
);


--
-- Name: custom_discussions custom_discussions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.custom_discussions
    ADD CONSTRAINT custom_discussions_pkey PRIMARY KEY (id);


--
-- Name: custom_discussions custom_discussions_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.custom_discussions
    ADD CONSTRAINT custom_discussions_slug_key UNIQUE (slug);


--
-- Name: discussion_comments discussion_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussion_comments
    ADD CONSTRAINT discussion_comments_pkey PRIMARY KEY (id);


--
-- Name: discussions discussions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions
    ADD CONSTRAINT discussions_pkey PRIMARY KEY (id);


--
-- Name: follows follows_follower_id_following_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_follower_id_following_id_key UNIQUE (follower_id, following_id);


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (id);


--
-- Name: marks_log marks_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marks_log
    ADD CONSTRAINT marks_log_pkey PRIMARY KEY (id);


--
-- Name: paper_threads paper_threads_paper_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paper_threads
    ADD CONSTRAINT paper_threads_paper_id_key UNIQUE (paper_id);


--
-- Name: paper_threads paper_threads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paper_threads
    ADD CONSTRAINT paper_threads_pkey PRIMARY KEY (id);


--
-- Name: post_comments post_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT post_comments_pkey PRIMARY KEY (id);


--
-- Name: post_tags post_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT post_tags_pkey PRIMARY KEY (id);


--
-- Name: post_tags post_tags_post_id_tag_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT post_tags_post_id_tag_id_key UNIQUE (post_id, tag_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);


--
-- Name: profiles profiles_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_username_key UNIQUE (username);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: user_subjects user_subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_subjects
    ADD CONSTRAINT user_subjects_pkey PRIMARY KEY (id);


--
-- Name: user_subjects user_subjects_user_id_subject_name_exam_board_level_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_subjects
    ADD CONSTRAINT user_subjects_user_id_subject_name_exam_board_level_key UNIQUE (user_id, subject_name, exam_board, level);


--
-- Name: user_universities user_universities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_universities
    ADD CONSTRAINT user_universities_pkey PRIMARY KEY (id);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: votes votes_user_id_comment_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_comment_id_key UNIQUE (user_id, comment_id);


--
-- Name: votes votes_user_id_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_post_id_key UNIQUE (user_id, post_id);


--
-- Name: xp_donations xp_donations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.xp_donations
    ADD CONSTRAINT xp_donations_pkey PRIMARY KEY (id);


--
-- Name: discussion_comments on_comment_created; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_comment_created AFTER INSERT ON public.discussion_comments FOR EACH ROW EXECUTE FUNCTION public.award_comment_xp();


--
-- Name: discussions on_discussion_created; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_discussion_created AFTER INSERT ON public.discussions FOR EACH ROW EXECUTE FUNCTION public.award_discussion_xp();


--
-- Name: marks_log on_marks_logged; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_marks_logged BEFORE INSERT ON public.marks_log FOR EACH ROW EXECUTE FUNCTION public.handle_marks_log_xp();


--
-- Name: post_comments on_post_comment_created; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_post_comment_created AFTER INSERT ON public.post_comments FOR EACH ROW EXECUTE FUNCTION public.award_post_comment_xp();


--
-- Name: posts on_post_created; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_post_created AFTER INSERT ON public.posts FOR EACH ROW EXECUTE FUNCTION public.award_post_xp();


--
-- Name: votes on_vote_change; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_vote_change AFTER INSERT OR DELETE OR UPDATE ON public.votes FOR EACH ROW EXECUTE FUNCTION public.update_post_votes();


--
-- Name: xp_donations on_xp_donation; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_xp_donation BEFORE INSERT ON public.xp_donations FOR EACH ROW EXECUTE FUNCTION public.handle_xp_donation();


--
-- Name: discussion_comments update_comments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.discussion_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: custom_discussions update_custom_discussions_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_custom_discussions_updated_at BEFORE UPDATE ON public.custom_discussions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: discussions update_discussions_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_discussions_updated_at BEFORE UPDATE ON public.discussions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: post_comments update_post_comments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_post_comments_updated_at BEFORE UPDATE ON public.post_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: posts update_posts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: discussion_comments discussion_comments_discussion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussion_comments
    ADD CONSTRAINT discussion_comments_discussion_id_fkey FOREIGN KEY (discussion_id) REFERENCES public.discussions(id) ON DELETE CASCADE;


--
-- Name: discussion_comments discussion_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussion_comments
    ADD CONSTRAINT discussion_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: discussions discussions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discussions
    ADD CONSTRAINT discussions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: follows follows_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: follows follows_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_following_id_fkey FOREIGN KEY (following_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: marks_log marks_log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marks_log
    ADD CONSTRAINT marks_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: post_comments post_comments_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT post_comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.post_comments(id) ON DELETE CASCADE;


--
-- Name: post_comments post_comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT post_comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_tags post_tags_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT post_tags_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_tags post_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT post_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: posts posts_thread_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES public.paper_threads(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_subjects user_subjects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_subjects
    ADD CONSTRAINT user_subjects_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: votes votes_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.post_comments(id) ON DELETE CASCADE;


--
-- Name: votes votes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: xp_donations xp_donations_from_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.xp_donations
    ADD CONSTRAINT xp_donations_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: xp_donations xp_donations_to_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.xp_donations
    ADD CONSTRAINT xp_donations_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: discussion_comments Anyone can view comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view comments" ON public.discussion_comments FOR SELECT USING (true);


--
-- Name: custom_discussions Anyone can view custom discussions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view custom discussions" ON public.custom_discussions FOR SELECT USING (true);


--
-- Name: discussions Anyone can view discussions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view discussions" ON public.discussions FOR SELECT USING (true);


--
-- Name: paper_threads Anyone can view paper threads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view paper threads" ON public.paper_threads FOR SELECT USING (true);


--
-- Name: post_comments Anyone can view post comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view post comments" ON public.post_comments FOR SELECT USING (true);


--
-- Name: post_tags Anyone can view post tags; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view post tags" ON public.post_tags FOR SELECT USING (true);


--
-- Name: posts Anyone can view published posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view published posts" ON public.posts FOR SELECT USING (((is_draft = false) OR (auth.uid() = user_id)));


--
-- Name: user_subjects Anyone can view subjects of public profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view subjects of public profiles" ON public.user_subjects FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.user_id = user_subjects.user_id) AND (profiles.is_public = true)))));


--
-- Name: tags Anyone can view tags; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view tags" ON public.tags FOR SELECT USING (true);


--
-- Name: user_universities Anyone can view universities of public profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view universities of public profiles" ON public.user_universities FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.user_id = user_universities.user_id) AND (profiles.is_public = true)))));


--
-- Name: votes Anyone can view votes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view votes" ON public.votes FOR SELECT USING (true);


--
-- Name: discussion_comments Authenticated users can create comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create comments" ON public.discussion_comments FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: post_comments Authenticated users can create comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create comments" ON public.post_comments FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: custom_discussions Authenticated users can create custom discussions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create custom discussions" ON public.custom_discussions FOR INSERT WITH CHECK ((auth.uid() = created_by));


--
-- Name: discussions Authenticated users can create discussions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create discussions" ON public.discussions FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: paper_threads Authenticated users can create paper threads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create paper threads" ON public.paper_threads FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: posts Authenticated users can create posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create posts" ON public.posts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: tags Authenticated users can create tags; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create tags" ON public.tags FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: votes Authenticated users can vote; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can vote" ON public.votes FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: custom_discussions Creators can update their discussions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Creators can update their discussions" ON public.custom_discussions FOR UPDATE USING ((auth.uid() = created_by));


--
-- Name: post_tags Post authors can manage post tags; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Post authors can manage post tags" ON public.post_tags USING ((EXISTS ( SELECT 1
   FROM public.posts
  WHERE ((posts.id = post_tags.post_id) AND (posts.user_id = auth.uid())))));


--
-- Name: marks_log Public profiles show marks count; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public profiles show marks count" ON public.marks_log FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.user_id = marks_log.user_id) AND (profiles.is_public = true)))));


--
-- Name: follows Users can create follow requests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create follow requests" ON public.follows FOR INSERT WITH CHECK ((auth.uid() = follower_id));


--
-- Name: discussion_comments Users can delete their own comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own comments" ON public.discussion_comments FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: post_comments Users can delete their own comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own comments" ON public.post_comments FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: discussions Users can delete their own discussions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own discussions" ON public.discussions FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: follows Users can delete their own follows; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own follows" ON public.follows FOR DELETE USING (((auth.uid() = follower_id) OR (auth.uid() = following_id)));


--
-- Name: posts Users can delete their own posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own posts" ON public.posts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: votes Users can delete their own votes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own votes" ON public.votes FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: xp_donations Users can donate XP; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can donate XP" ON public.xp_donations FOR INSERT WITH CHECK ((auth.uid() = from_user_id));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: marks_log Users can manage their own marks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can manage their own marks" ON public.marks_log USING ((auth.uid() = user_id));


--
-- Name: user_subjects Users can manage their own subjects; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can manage their own subjects" ON public.user_subjects USING ((auth.uid() = user_id));


--
-- Name: user_universities Users can manage their own universities; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can manage their own universities" ON public.user_universities USING ((auth.uid() = user_id));


--
-- Name: xp_donations Users can see their donations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can see their donations" ON public.xp_donations FOR SELECT USING (((auth.uid() = from_user_id) OR (auth.uid() = to_user_id)));


--
-- Name: follows Users can see their own follow requests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can see their own follow requests" ON public.follows FOR SELECT USING (((auth.uid() = follower_id) OR (auth.uid() = following_id)));


--
-- Name: discussion_comments Users can update their own comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own comments" ON public.discussion_comments FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: post_comments Users can update their own comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own comments" ON public.post_comments FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: discussions Users can update their own discussions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own discussions" ON public.discussions FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: posts Users can update their own posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own posts" ON public.posts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: votes Users can update their own votes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own votes" ON public.votes FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: follows Users can update their received follow requests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their received follow requests" ON public.follows FOR UPDATE USING ((auth.uid() = following_id));


--
-- Name: profiles Users can view profiles of accepted follows; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view profiles of accepted follows" ON public.profiles FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.follows
  WHERE ((follows.follower_id = auth.uid()) AND (follows.following_id = profiles.user_id) AND (follows.status = 'accepted'::public.follow_status)))));


--
-- Name: profiles Users can view public profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view public profiles" ON public.profiles FOR SELECT USING ((is_public = true));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: custom_discussions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.custom_discussions ENABLE ROW LEVEL SECURITY;

--
-- Name: discussion_comments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.discussion_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: discussions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

--
-- Name: follows; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

--
-- Name: marks_log; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.marks_log ENABLE ROW LEVEL SECURITY;

--
-- Name: paper_threads; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.paper_threads ENABLE ROW LEVEL SECURITY;

--
-- Name: post_comments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: post_tags; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: tags; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_subjects; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_subjects ENABLE ROW LEVEL SECURITY;

--
-- Name: user_universities; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_universities ENABLE ROW LEVEL SECURITY;

--
-- Name: votes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

--
-- Name: xp_donations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.xp_donations ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;