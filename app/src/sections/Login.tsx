import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.jpg';
import patternBg from '@/assets/pattern-bg.png';

interface LoginProps {
    onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: 'emma.rodriguez@uni.edu',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock login delay
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
            toast.success('Welcome back, Emma!');
        }, 1500);
    };

    return (
        <div className="flex min-h-screen w-full font-sans">
            {/* Left Side - Brand */}
            <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center">
                {/* Background Pattern or Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-blue-900" />

                {/* Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                        backgroundImage: `url(${patternBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />

                <div className="relative z-10 flex flex-col items-center p-12 text-center text-white">
                    <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/20">
                        <img src={logo} alt="Boarding Logo" className="w-24 h-24 object-contain" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Boarding</h1>
                    <p className="text-primary-foreground/90 text-lg max-w-md leading-relaxed">
                        Your digital concierge for international internships. Track your journey, find opportunities, and get support.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 min-h-screen lg:min-h-0">
                <div className="w-full max-w-md space-y-8 bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-slate-100">
                    <div className="text-center">
                        <div className="lg:hidden w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <img src={logo} alt="Boarding Logo" className="w-10 h-10 object-contain mix-blend-multiply" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Welcome back</h2>
                        <p className="text-slate-500 mt-2">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 text-left">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                autoComplete="email"
                            />
                        </div>

                        <div className="space-y-2 text-left">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="text-xs font-semibold text-primary hover:text-primary/80 hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    className="h-11 pr-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm font-medium leading-none text-slate-600 cursor-pointer select-none">Remember me for 30 days</label>
                        </div>

                        <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-[15px] font-semibold" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-11 bg-white hover:bg-slate-50 border-slate-200">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-11 bg-white hover:bg-slate-50 border-slate-200">
                            <svg className="mr-2 h-4 w-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                            Facebook
                        </Button>
                    </div>

                    <p className="text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <a href="#" className="font-semibold text-primary hover:text-primary/80 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
