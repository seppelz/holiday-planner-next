'use client';

import { PersonProvider } from '../../contexts/PersonContext';
import { NotificationProvider } from '../../contexts/NotificationContext';
import { MainLayout } from '../../layouts/MainLayout';
import Navigation from '../../components/Navigation/Navigation';

export default function AppPage() {
  return (
    <>
      <Navigation />
      <NotificationProvider>
        <PersonProvider>
          <MainLayout />
        </PersonProvider>
      </NotificationProvider>
    </>
  );
} 