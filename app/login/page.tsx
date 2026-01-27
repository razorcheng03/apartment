'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                alert('Login successful! (Simulation)');
            }, 1500);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
            {/* Left Side: Form */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-16">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                            <div className="bg-indigo-600 p-2 rounded-xl">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900 tracking-tight">Skyline Residencies</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            Welcome back
                        </h1>
                        <p className="mt-3 text-lg text-gray-600">
                            Enter your credentials to manage your apartment.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        autoComplete="email"
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <Label htmlFor="password" title="password">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className="pl-10 pr-10"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    Login
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            href="/SIGN-UP"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                            Sign up today
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side: Visual Content */}
            <div className="hidden lg:block relative overflow-hidden">
                <Image
                    src="/bg-archier.png"
                    alt="Modern Apartment Building"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                        <h2 className="text-3xl font-bold mb-4 italic">"The simplest way to manage your modern lifestyle."</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xl">
                                JD
                            </div>
                            <div>
                                <p className="font-semibold">Jane Doe</p>
                                <p className="text-sm text-white/80">Skyline Resident since 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
