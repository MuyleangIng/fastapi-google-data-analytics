"use client";

import type React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTrackerProps {
  children: React.ReactNode;
  pageName: string;
}

export default function PageTracker({ children, pageName }: PageTrackerProps) {
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    fetch("http://136.228.158.126:3039/track/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pageName }),
    });

    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const userPublicIP = data.ip;

        return fetch(`https://geolocation-db.com/json/${userPublicIP}&position=true`);
      })
      .then((response) => response.json())
      .then((locationData) => {
        const locationInfo = {
          country: locationData.country_name || "Unknown",
          city: locationData.city || "Unknown",
          isp: "Unknown ISP",
          latitude: locationData.latitude || 0,
          longitude: locationData.longitude || 0,
        };

        const browserInfo = navigator.userAgent;

        return fetch("http://136.228.158.126:3039/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ip: locationData.IPv4 || "Unknown",
            country: locationInfo.country,
            city: locationInfo.city,
            isp: locationInfo.isp,
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude,
            browser: browserInfo,
          }),
        });
      })
      .then((response) => response.json())
      .then((serverResponse) => {
        console.log("Server Response:", serverResponse);
      })
      .catch((error) => console.error("Error fetching IP info:", error));

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      fetch("http://136.228.158.126:3039/track/time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: pageName, timeSpent }),
      });
    };
  }, [pageName]);

  return <>{children}</>;
}
