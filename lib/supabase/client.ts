import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env'

/**
 * Create a Supabase client for use in the browser
 */
export function createClient() {
    return createBrowserClient(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}
