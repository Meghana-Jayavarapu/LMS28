import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
    });
    const [privacy, setPrivacy] = useState({
        showProfile: true,
        shareData: false,
    });
    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [message, setMessage] = useState('');

    const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotifications(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };

    const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrivacy(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSaveChanges = (section: string) => {
        // In a real app, you would make an API call here.
        console.log(`Saving ${section}:`, { notifications, privacy });
        setMessage(`${section} settings saved successfully!`);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            setMessage('New passwords do not match.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        // API call to change password
        console.log("Changing password...");
        setMessage('Password changed successfully!');
        setPassword({ current: '', new: '', confirm: '' });
        setTimeout(() => setMessage(''), 3000);
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Settings</h1>
            
            {message && <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">{message}</div>}

            <div className="space-y-12">
                {/* Account Settings */}
                <div className="bg-base p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-primary pl-4">Change Password</h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <input type="password" name="current" value={password.current} onChange={handlePasswordChange} placeholder="Current Password" required className="w-full p-2 border rounded" />
                        <input type="password" name="new" value={password.new} onChange={handlePasswordChange} placeholder="New Password" required className="w-full p-2 border rounded" />
                        <input type="password" name="confirm" value={password.confirm} onChange={handlePasswordChange} placeholder="Confirm New Password" required className="w-full p-2 border rounded" />
                        <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold">Update Password</button>
                    </form>
                </div>

                {/* Notification Settings */}
                <div className="bg-base p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-primary pl-4">Notifications</h2>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between">
                            <span className="text-gray-700">Email Notifications</span>
                            <input type="checkbox" name="email" checked={notifications.email} onChange={handleNotificationChange} className="form-checkbox h-5 w-5 text-primary" />
                        </label>
                        <label className="flex items-center justify-between">
                            <span className="text-gray-700">Push Notifications</span>
                            <input type="checkbox" name="push" checked={notifications.push} onChange={handleNotificationChange} className="form-checkbox h-5 w-5 text-primary" />
                        </label>
                    </div>
                    <button onClick={() => handleSaveChanges('Notification')} className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold">Save Notifications</button>
                </div>

                {/* Privacy Settings */}
                <div className="bg-base p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-primary pl-4">Privacy</h2>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between">
                            <span className="text-gray-700">Make my profile public</span>
                            <input type="checkbox" name="showProfile" checked={privacy.showProfile} onChange={handlePrivacyChange} className="form-checkbox h-5 w-5 text-primary" />
                        </label>
                        <label className="flex items-center justify-between">
                            <span className="text-gray-700">Share data with partners</span>
                            <input type="checkbox" name="shareData" checked={privacy.shareData} onChange={handlePrivacyChange} className="form-checkbox h-5 w-5 text-primary" />
                        </label>
                    </div>
                    <button onClick={() => handleSaveChanges('Privacy')} className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold">Save Privacy Settings</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
