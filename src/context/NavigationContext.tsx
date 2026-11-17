import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageRoute, Product, ProductColor } from '../types';

interface NavigationContextType {
  currentPath: PageRoute;
  selectedShopCategory: string;
  setSelectedShopCategory: (cat: string) => void;
  preselectedProduct: { product: Product; color: ProductColor } | null;
  setPreselectedProduct: (val: { product: Product; color: ProductColor } | null) => void;
  navigate: (
    to: PageRoute | string,
    options?: {
      category?: string;
      preselectedProduct?: { product: Product; color: ProductColor };
    }
  ) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const normalizePath = (p: string): PageRoute => {
    if (p.includes('/shop')) return '/shop';
    if (p.includes('/about')) return '/about';
    if (p.includes('/contact')) return '/contact';
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [selectedShopCategory, setSelectedShopCategory] = useState<string>('All');
  const [preselectedProduct, setPreselectedProduct] = useState<{ product: Product; color: ProductColor } | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (
    to: PageRoute | string,
    options?: {
      category?: string;
      preselectedProduct?: { product: Product; color: ProductColor };
    }
  ) => {
    const normalized = normalizePath(to);
    if (options?.category) {
      setSelectedShopCategory(options.category);
    }
    if (options?.preselectedProduct) {
      setPreselectedProduct(options.preselectedProduct);
    }
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        selectedShopCategory,
        setSelectedShopCategory,
        preselectedProduct,
        setPreselectedProduct,
        navigate,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
