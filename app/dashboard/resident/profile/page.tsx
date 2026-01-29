'use client';

import { UserCircle, Mail, MapPin, Shield, Camera } from 'lucide-react';
import { MOCK_RESIDENT } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
    const user = MOCK_RESIDENT;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-500 mt-1">Manage your personal information and account settings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="relative inline-block mb-6">
                            <div className="w-32 h-32 rounded-full bg-indigo-50 flex items-center justify-center border-4 border-white shadow-sm">
                                <UserCircle className="w-20 h-20 text-indigo-600" />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500 font-medium">Resident • Unit {user.unit}</p>
                        
                        <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Mail className="w-4 h-4 text-gray-400" />
                                {user.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                Skyline Residencies, Tower A
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-600 p-6 rounded-2xl text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6" />
                            <h3 className="font-bold">Account Security</h3>
                        </div>
                        <p className="text-indigo-100 text-sm mb-6">
                            Keep your account secure by updating your password regularly.
                        </p>
                        <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                            Change Password
                        </Button>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" defaultValue={user.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={user.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit Number</Label>
                                <Input id="unit" defaultValue={user.unit} disabled />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button className="px-8">Save Changes</Button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Notifications</h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Email Notifications', desc: 'Receive updates about maintenance and payments.' },
                                { title: 'Announcement Alerts', desc: 'Get notified when new announcements are posted.' },
                                { title: 'Maintenance Updates', desc: 'Real-time status updates on your requests.' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.title}</p>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
