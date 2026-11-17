export const GOOGLE_ADS_PHONE_CONVERSION_SEND_TO = 'AW-18462869367/YzK-CI_x_7kdEPeO5ONE';
export const BUSINESS_PHONE_TEL = 'tel:+917995486994';

/**
 * Tracks a Google Ads phone-click conversion using gtag_report_conversion.
 * Ensures the phone dialler opens reliably across all devices.
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

  if (typeof window !== 'undefined' && typeof window.gtag_report_conversion === 'function') {
    return window.gtag_report_conversion(targetUrl);
  }

  // Fallback if gtag_report_conversion is unavailable
  if (targetUrl && typeof window !== 'undefined') {
    window.location.href = targetUrl;
  }
  return false;
}

