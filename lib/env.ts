import { z } from 'zod';

const envSchema = z.object({
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

    // Resend
    RESEND_API_KEY: z.string().min(1),

    // Application
    NEXT_PUBLIC_APP_URL: z.string().url().catch('http://localhost:3000'),

    // Flutterwave
    FLW_SECRET_KEY: z.string().min(1).optional(),
    FLW_SECRET_HASH: z.string().min(1).optional(),

    // M-Pesa
    MPESA_CONSUMER_KEY: z.string().min(1).optional(),
    MPESA_CONSUMER_SECRET: z.string().min(1).optional(),
    MPESA_SHORTCODE: z.string().min(1).optional(),
    MPESA_PASSKEY: z.string().min(1).optional(),
    MPESA_CALLBACK_URL: z.string().url().optional(),
});

const processEnv = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
    FLW_SECRET_HASH: process.env.FLW_SECRET_HASH,
    MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
    MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
    MPESA_SHORTCODE: process.env.MPESA_SHORTCODE,
    MPESA_PASSKEY: process.env.MPESA_PASSKEY,
    MPESA_CALLBACK_URL: process.env.MPESA_CALLBACK_URL,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    // Only throw in production to avoid blocking dev if some keys are missing
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Invalid environment variables');
    }
}

export const env = parsed.success ? parsed.data : (processEnv as unknown as z.infer<typeof envSchema>);
