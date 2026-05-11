// imports
import Login from '@/assets/components/auth/Login';
import Register from '@/assets/components/auth/Register';

export default async function AuthPage({ params }: { params: Promise<{ authType: string }> }) {
    const { authType } = await params;

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-linear-to-br from-red-400 to-blue-400">
            {authType === 'login' && <Login />}
            {authType === 'register' && <Register />}
        </div>
    );
}
