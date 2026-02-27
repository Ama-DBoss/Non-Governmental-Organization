import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Toaster } from 'sonner';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-white">
            <Toaster position="top-right" richColors />
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
