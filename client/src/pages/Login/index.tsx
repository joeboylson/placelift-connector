const AUTH_URL_BASE = "https://ovoyksiyukivurwhxzbk.supabase.co/auth/v1/authorize?provider=google"

export default function Login() {
    const redirectTo = window.location.origin;
    return <a href={`${AUTH_URL_BASE}&redirect_to=${redirectTo}/post-login`}>Login</a>
} 