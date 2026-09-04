'use client';

import * as React from 'react';
import { reverseGeocode, DetectedLocation } from '../lib/geocoding';

export interface UserLocationState {
  latitude: number | null;
  longitude: number | null;
  division: string;
  district: string;
  area: string;
  detected: boolean;
  loading: boolean;
  error: string | null;
}

interface LocationContextType {
  location: UserLocationState;
  detectLiveLocation: () => Promise<void>;
  setLocation: (division: string, district: string, area?: string) => void;
}

const STORAGE_KEY = 'kajlagbe_user_location';

const DEFAULT_LOCATION: UserLocationState = {
  latitude: 23.8103,
  longitude: 90.4125,
  division: 'ঢাকা বিভাগ',
  district: 'ঢাকা উত্তর',
  area: 'মিরপুর',
  detected: false,
  loading: false,
  error: null,
};

const LocationContext = React.createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = React.useState<UserLocationState>(DEFAULT_LOCATION);

  // Hydrate stored location from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLocationState((prev) => ({ ...prev, ...parsed, loading: false }));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const detectLiveLocation = async () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationState((prev) => ({
        ...prev,
        error: 'আপনার ব্রাউজারে লোকেশন সার্ভিস সাপোর্ট নেই।',
        loading: false,
      }));
      return;
    }

    setLocationState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const detected: DetectedLocation = await reverseGeocode(lat, lng);
          const newState: UserLocationState = {
            latitude: lat,
            longitude: lng,
            division: detected.division,
            district: detected.district,
            area: detected.area,
            detected: true,
            loading: false,
            error: null,
          };

          setLocationState(newState);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        } catch {
          setLocationState((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            detected: true,
            loading: false,
            error: null,
          }));
        }
      },
      (err) => {
        let msg = 'লাইভ লোকেশন পারমিশন পাওয়া যায়নি।';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'ব্রাউজার লোকেশন পারমিশন এনাবল করুন।';
        }
        setLocationState((prev) => ({ ...prev, loading: false, error: msg }));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const setLocation = (division: string, district: string, area: string = '') => {
    const newState: UserLocationState = {
      ...location,
      division,
      district,
      area: area || district,
      detected: false,
      error: null,
    };
    setLocationState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // Storage fallback
    }
  };

  return (
    <LocationContext.Provider value={{ location, detectLiveLocation, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = React.useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
