// Supabase Client Configuration
// Connect your Supabase project by adding your credentials to .env.local

/*
  Add these to your .env.local file:
  
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
*/

// Placeholder for Supabase client
// Uncomment and install @supabase/supabase-js when ready to connect

// import { createClient } from '@supabase/supabase-js';
// 
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// 
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock Supabase client for development
export const supabase = {
    auth: {
        signUp: async ({ email, password }: { email: string; password: string }) => {
            console.log('Mock signup:', email);
            return { data: { user: { id: '1', email } }, error: null as { message: string } | null };
        },
        signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
            console.log('Mock login:', email);
            return { data: { user: { id: '1', email }, session: { access_token: 'mock-token' } }, error: null as { message: string } | null };
        },
        signInWithOAuth: async ({ provider }: { provider: string }) => {
            console.log('Mock OAuth:', provider);
            return { data: { url: '#' }, error: null as { message: string } | null };
        },
        signOut: async () => {
            console.log('Mock signout');
            return { error: null as { message: string } | null };
        },
        getSession: async () => {
            return { data: { session: null }, error: null as { message: string } | null };
        },
        onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
            return { data: { subscription: { unsubscribe: () => { } } } };
        },
    },
    from: (table: string) => ({
        select: () => ({
            eq: () => ({
                single: async () => ({ data: null, error: null as { message: string } | null }),
                data: [],
            }),
            data: [],
        }),
        insert: async () => ({ data: null, error: null as { message: string } | null }),
        update: async () => ({ data: null, error: null as { message: string } | null }),
        delete: async () => ({ data: null, error: null as { message: string } | null }),
    }),
};

export type User = {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    role: 'student' | 'premium' | 'admin';
};

export type Course = {
    id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    video_url: string;
    pdf_url?: string;
    price: number;
    created_at: string;
};

export type Prompt = {
    id: string;
    title: string;
    content: string;
    category: string;
    is_premium: boolean;
    created_at: string;
};
