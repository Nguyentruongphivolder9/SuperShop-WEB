import { useState, useEffect } from 'react';
import MobileDetect from 'mobile-detect';
import UAParser from 'ua-parser-js';
import ipify from 'ipify';

type DeviceInfo = {
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  deviceName: string | null;
  phone: string | null;
  tablet: string | null;
  os: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  isLoaded: boolean;
};

const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceType: 'Desktop',
    deviceName: null,
    phone: null,
    tablet: null,
    os: null,
    userAgent: null,
    ipAddress: null,
    isLoaded: false,
  });

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    const parser = new UAParser();
    const result = parser.getResult();

    // Function to fetch IP address
    const fetchIpAddress = async () => {
      try {
        const ip = await ipify({ useIPv6: false });
        setDeviceInfo((prev) => ({ ...prev, ipAddress: ip }));
      } catch (error) {
        console.error('Failed to fetch IP address:', error);
      }
    };

    setDeviceInfo({
      deviceType: md.mobile() || md.tablet() ? (md.mobile() ? 'Mobile' : 'Tablet') : 'Desktop',
      deviceName: result.device.model || result.device.vendor || null,
      phone: md.phone() || null,
      tablet: md.tablet() || null,
      os: result.os.name || null,
      userAgent: window.navigator.userAgent || null,
      ipAddress: null, // Initially null until fetched
      isLoaded: true,
    });

    fetchIpAddress(); 
  }, []);

  return deviceInfo;
};

export default useDeviceInfo;
