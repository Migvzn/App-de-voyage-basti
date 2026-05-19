const AFFILIATE_CONFIGS = {
  booking: { baseUrl: "https://www.booking.com", affiliateId: "ilur_booking_001", commission: "4%" },
  airbnb: { baseUrl: "https://www.airbnb.com", affiliateId: "ilur_airbnb_001", commission: "3%" },
  skyscanner: { baseUrl: "https://www.skyscanner.com", affiliateId: "ilur_sky_001", commission: "1%" },
  getyourguide: { baseUrl: "https://www.getyourguide.com", affiliateId: "ilur_gyg_001", commission: "8%" },
  viator: { baseUrl: "https://www.viator.com", affiliateId: "ilur_viator_001", commission: "8%" },
  expedia: { baseUrl: "https://www.expedia.com", affiliateId: "ilur_exp_001", commission: "3%" },
  trainline: { baseUrl: "https://www.thetrainline.com", affiliateId: "ilur_train_001", commission: "2%" },
  sixt: { baseUrl: "https://www.sixt.com", affiliateId: "ilur_sixt_001", commission: "5%" },
  omio: { baseUrl: "https://www.omio.com", affiliateId: "ilur_omio_001", commission: "2%" },
};

export type AffiliatePartner = keyof typeof AFFILIATE_CONFIGS;

export function generateAffiliateLink(
  partner: AffiliatePartner,
  path: string,
  trackingData: Record<string, string> = {}
): string {
  const config = AFFILIATE_CONFIGS[partner];
  const params = new URLSearchParams({
    aid: config.affiliateId,
    ...trackingData,
  });
  return `${config.baseUrl}${path}?${params.toString()}`;
}

export function getAffiliateConfig(partner: AffiliatePartner) {
  return AFFILIATE_CONFIGS[partner];
}

export function logConversion(partner: AffiliatePartner, amount: number, currency: string) {
  // Hook for conversion tracking - connect to analytics
  console.log(`[AFFILIATE] Conversion: ${partner} | ${amount} ${currency}`);
}
