import { useState, useEffect } from 'react';
import { BUSINESS_CONFIG } from '../config/business';

export interface StoreStatus {
  isOpen: boolean;
  statusText: string;
  lagosTimeFormatted: string;
  scheduleText: string;
}

/**
 * Returns the current time and store status in Africa/Lagos (Nigeria local time).
 */
export function getLagosStoreStatus(): StoreStatus {
  try {
    const now = new Date();
    // Parse hour and minute in Africa/Lagos timezone
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: BUSINESS_CONFIG.hours.timezone || 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const timeString = formatter.format(now); // e.g. "08:45"
    const [hStr, mStr] = timeString.split(':');
    const hours = parseInt(hStr, 10);
    const minutes = parseInt(mStr, 10);

    const currentMinuteOfDay = hours * 60 + minutes;

    // Configurable open (06:30 -> 390) and close (17:00 -> 1020)
    const [openH, openM] = BUSINESS_CONFIG.hours.openTime.split(':').map(Number);
    const [closeH, closeM] = BUSINESS_CONFIG.hours.closeTime.split(':').map(Number);

    const openMinuteOfDay = openH * 60 + openM;
    const closeMinuteOfDay = closeH * 60 + closeM;

    const isOpen = currentMinuteOfDay >= openMinuteOfDay && currentMinuteOfDay < closeMinuteOfDay;

    // 12-hour formatted time for display
    const timeDisplayFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: BUSINESS_CONFIG.hours.timezone || 'Africa/Lagos',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return {
      isOpen,
      statusText: isOpen ? 'OPEN NOW' : 'CLOSED',
      lagosTimeFormatted: timeDisplayFormatter.format(now),
      scheduleText: BUSINESS_CONFIG.hours.display,
    };
  } catch (err) {
    // Fallback if timezone not supported in legacy browser
    return {
      isOpen: true,
      statusText: 'OPEN NOW',
      lagosTimeFormatted: 'Africa/Lagos Time',
      scheduleText: BUSINESS_CONFIG.hours.display,
    };
  }
}

/**
 * React hook that provides live store status updating every 30 seconds
 */
export function useStoreStatus(): StoreStatus {
  const [status, setStatus] = useState<StoreStatus>(getLagosStoreStatus);

  useEffect(() => {
    // Check status immediately
    setStatus(getLagosStoreStatus());

    // Update every 30 seconds
    const interval = setInterval(() => {
      setStatus(getLagosStoreStatus());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return status;
}
