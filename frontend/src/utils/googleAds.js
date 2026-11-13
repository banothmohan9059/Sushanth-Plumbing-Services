export const GOOGLE_ADS_PHONE_CONVERSION_SEND_TO = 'AW-18462869367/ko6CCNj0xbcdEPeO5ONE';
export const BUSINESS_PHONE_TEL = 'tel:+917995486994';

/**
 * Tracks a Google Ads phone-click conversion and opens the phone dialler.
 * Uses event_callback with a safety timeout fallback to ensure the call action
 * is never blocked if gtag is unavailable, blocked by an ad blocker, or delayed.
 *
 * @param {MouseEvent|TouchEvent|React.MouseEvent|string} [e] - Optional click event or URL string
 * @param {string} [url] - Target tel: URL, defaults to 'tel:+917995486994'
 */
export function trackPhoneConversion(e, url = BUSINESS_PHONE_TEL) {
  let targetUrl = url;
  if (typeof e === 'string') {
    targetUrl = e;
  } else if (e) {
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (e.currentTarget && e.currentTarget.href) {
      targetUrl = e.currentTarget.href;
    }
  }

  let navigated = false;
  const navigate = () => {
    if (!navigated) {
      navigated = true;
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }
  };

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // 500ms safety timeout fallback in case gtag / network / ad-blocker stalls
    const fallbackTimer = setTimeout(navigate, 500);

    try {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_PHONE_CONVERSION_SEND_TO,
        event_callback: () => {
          clearTimeout(fallbackTimer);
          navigate();
        },
      });
    } catch {
      clearTimeout(fallbackTimer);
      navigate();
    }
  } else {
    // gtag not available, open dialler immediately
    navigate();
  }
}

