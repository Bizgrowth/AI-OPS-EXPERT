/*
  # Fix Function Security Warnings
  
  This migration addresses the function_search_path_mutable warnings by adding
  explicit search_path settings to database functions for security.
  
  1. Security Fixes
    - Add SET search_path to update_updated_at_column function
    - Add SET search_path to set_updated_at function  
    - Add SET search_path to is_admin function
*/

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Fix set_updated_at function (if it exists)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Fix is_admin function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the current user has admin privileges
    -- This assumes you have a way to identify admin users
    -- Adjust this logic based on your specific admin identification method
    RETURN (
        SELECT EXISTS (
            SELECT 1 
            FROM auth.users 
            WHERE id = auth.uid() 
            AND email = 'dschley@aiopsexpert.com'
        )
    );
END;
$$;