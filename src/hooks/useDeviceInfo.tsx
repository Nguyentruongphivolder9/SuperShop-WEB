import { useState, useEffect } from 'react';
import axios from 'axios';
import ipify from 'ipify';

type DeviceInfo = {
  browserFamily: string | null;
  client: {
    engine: string | null;
    engineVersion: string | null;
    name: string | null;
    type: string | null;
    version: string | null;
  } | null;
  device: {
    brand: string | null;
    model: string | null;
    type: string | null;
  } | null;
  os: {
    name: string | null;
    platform: string | null;
    version: string | null;
  } | null;
  osFamily: string | null;
  ipAddress: string | null;
  isLoaded: boolean;
};

const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    browserFamily: null,
    client: null,
    device: null,
    os: null,
    osFamily: null,
    ipAddress: null,
    isLoaded: false,
  });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const userAgent = encodeURIComponent(window.navigator.userAgent);
        const response = await axios.get(`https://api.apicagent.com/?ua=${userAgent}`);
        const data = response.data;

        const ip = await ipify({ useIPv6: false });

        setDeviceInfo({
          browserFamily: data.browser_family || null,
          client: data.client || null,
          device: data.device || null,
          os: data.os || null,
          osFamily: data.os_family || null,
          ipAddress: ip || null,
          isLoaded: true,
        });
      } catch (error) {
        console.error('Failed to fetch device info:', error);
      }
    };

    fetchDeviceInfo();
  }, []);

  return deviceInfo;
};

export default useDeviceInfo;
