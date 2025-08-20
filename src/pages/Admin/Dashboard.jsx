// src/pages/admin/Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/admin/DashboardLayout';
import CardManager from '../../components/admin/CardManager';
import TestimonialManager from '../../components/admin/TestmonialManager';
import NotificationManager from '../../components/admin/NotificationManager';
import PurchaseManager from '../../components/admin/PurchaseManager';

const Dashboard = () => {
    return (
        <>
            <DashboardLayout>
                <Routes>
                    <Route path="cards" element={<CardManager />} />
                    <Route path="testimonials" element={<TestimonialManager />} />
                    <Route path="notifications" element={<NotificationManager />} />
                    <Route path="purchases" element={<PurchaseManager />} />
                    <Route path="*" element={<h2 className="text-2xl text-white">Welcome to Dashboard</h2>} />
                </Routes>
            </DashboardLayout>

        </>

    );
};

export default Dashboard;