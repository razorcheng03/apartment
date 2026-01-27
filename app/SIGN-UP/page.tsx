'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Mail,
    Lock,
    User,
    Phone,
    Home as HomeIcon,
    Building2,
    UserCircle2,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        unitNumber: '',
        password: '',
        confirmPassword: '',
        role: 'RESIDENT' as 'RESIDENT' | 'ADMIN'
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (formData.role === 'RESIDENT' && !formData.unitNumber) {
            newErrors.unitNumber = 'Apartment/Unit number is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                // In a real app, redirect based on role or to login
                window.location.href = formData.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/resident';
            }, 1500);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 border border-white/40 overflow-hidden flex flex-col md:flex-row">

                {/* Left Side: Brand & Visuals */}
                <div className="md:w-[40%] bg-indigo-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <Link href="/" className="flex items-center gap-3 mb-12 group">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:bg-white/30 transition-all">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Skyline</span>
                        </Link>

                        <h2 className="text-4xl font-extrabold leading-tight mb-6">
                            Start Your <br />
                            <span className="text-indigo-200">Modern Living</span> <br />
                            Experience.
                        </h2>

                        <p className="text-indigo-100 text-lg leading-relaxed opacity-90">
                            Join thousands of residents managing their homes with ease.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-medium">Secured by Enterprise SSL</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-[60%] p-10 lg:p-14">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="text-gray-500 mt-2">Enter your details to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-4 p-1.5 bg-gray-100 rounded-2xl mb-8">
                            <button
                                type="button"
                                onClick={() => setFormData(v => ({ ...v, role: 'RESIDENT' }))}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                                    formData.role === 'RESIDENT'
                                        ? "bg-white text-indigo-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <UserCircle2 className="w-4 h-4" />
                                Resident
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(v => ({ ...v, role: 'ADMIN' }))}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                                    formData.role === 'ADMIN'
                                        ? "bg-white text-indigo-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <Building2 className="w-4 h-4" />
                                Admin
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder="John Doe"
                                        className="pl-10 h-11 bg-gray-50/50"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        error={errors.fullName}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="pl-10 h-11 bg-gray-50/50"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="+1 (555) 000-0000"
                                        className="pl-10 h-11 bg-gray-50/50"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={errors.phone}
                                    />
                                </div>
                            </div>
                            {formData.role === 'RESIDENT' && (
                                <div className="space-y-2">
                                    <Label htmlFor="unitNumber">Unit / Apt #</Label>
                                    <div className="relative">
                                        <HomeIcon className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="unitNumber"
                                            name="unitNumber"
                                            placeholder="A-102"
                                            className="pl-10 h-11 bg-gray-50/50"
                                            value={formData.unitNumber}
                                            onChange={handleChange}
                                            error={errors.unitNumber}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-11 bg-gray-50/50"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-11 bg-gray-50/50"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-bold mt-8 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    Create Account
                                    <ArrowRight className="w-4 h-4 shadow-sm" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-600 font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 underline underline-offset-4 transition-all">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
