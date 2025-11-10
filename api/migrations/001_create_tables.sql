-- migrations/001_create_tables.sql
CREATE TABLE IF NOT EXISTS money_entries (
    id SERIAL PRIMARY KEY,
    account_type TEXT NOT NULL,  -- 'bar' | 'company_card'
    amount NUMERIC NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pain_entries (
    id SERIAL PRIMARY KEY,
    note TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS medications (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    dose_unit TEXT,    -- e.g. "mg", "pills"
    schedule_interval_days INT, -- e.g. 1=daily, 3=every 3 days. NULL => no schedule
    active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS medication_doses (
    id SERIAL PRIMARY KEY,
    medication_id INT REFERENCES medications(id) ON DELETE CASCADE,
    count NUMERIC NOT NULL DEFAULT 1,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);
