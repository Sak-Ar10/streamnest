-- Enable the pgcrypto extension for gen_random_uuid() if not already available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- USERS Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- PROFILES Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    avatar VARCHAR(50) NOT NULL,
    is_kids BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- GENRES Table
CREATE TABLE IF NOT EXISTS genres (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL
);

-- TITLES Table
CREATE TABLE IF NOT EXISTS titles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tmdb_id INTEGER UNIQUE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('movie', 'series')),
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    release_year INTEGER,
    maturity_rating VARCHAR(20),
    runtime_minutes INTEGER,
    seasons INTEGER,
    poster_url TEXT,
    backdrop_url TEXT,
    trailer_youtube_id VARCHAR(50),
    rating NUMERIC(4,1) CHECK (rating >= 0 AND rating <= 10),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_titles_type ON titles(type);
-- For ILIKE search, PostgreSQL uses trigram indexes (pg_trgm) for better performance,
-- but a standard index can be created. We'll add pg_trgm if possible, or just standard.
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_titles_title_trgm ON titles USING GIN (title gin_trgm_ops);

-- TITLE_GENRES Table
CREATE TABLE IF NOT EXISTS title_genres (
    title_id UUID NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
    genre_id UUID NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (title_id, genre_id)
);
CREATE INDEX IF NOT EXISTS idx_title_genres_genre_id ON title_genres(genre_id);

-- MY_LIST Table
CREATE TABLE IF NOT EXISTS my_list (
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title_id UUID NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (profile_id, title_id)
);
