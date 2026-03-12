"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const GA_ID = "G-0ZFCDKRLJZ";
const COOKIE_KEY = "fl360_cookie_consent";

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      setConsented(localStorage.getItem(COOKIE_KEY) === "accepted");
    };
    check();
    // Fires when consent is given in the same tab (via CookieBanner)
    window.addEventListener("fl360:consent-accepted", check);
    // Fires when consent is given in another tab
    window.addEventListener("storage", check);
    return () => {
      window.removeEventListener("fl360:consent-accepted", check);
      window.removeEventListener("storage", check);
    };
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
