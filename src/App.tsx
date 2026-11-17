import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPath } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF1F6] text-[#29151F] selection:bg-[#F8DDE8] selection:text-[#A80050]">
      {/* Sticky Top Header */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {currentPath === '/shop' ? (
          <ShopPage />
        ) : currentPath === '/about' ? (
          <AboutPage />
        ) : currentPath === '/contact' ? (
          <ContactPage />
        ) : (
          <HomePage />
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Mobile Bottom Navigation Bar (Matching Reference Mockup) */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NavigationProvider>
  );
}
