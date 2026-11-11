export const PACKAGE_OFFER_PERCENT = 50;
export const REFERRAL_DISCOUNT_CODE = "EthioNew1212";
export const REFERRAL_DISCOUNT_PERCENT = 5;

const roundCurrency = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

export function getPackagePriceBreakdown(
  listPrice,
  referralCode = "",
  eligibleForOffer = true
) {
  const original = Number(listPrice);
  if (!Number.isFinite(original) || original < 0) return null;

  const offerSaving = eligibleForOffer
    ? roundCurrency(original * (PACKAGE_OFFER_PERCENT / 100))
    : 0;
  const offerPrice = roundCurrency(original - offerSaving);
  const hasReferral =
    String(referralCode).trim().toLowerCase() ===
    REFERRAL_DISCOUNT_CODE.toLowerCase();
  const referralSaving = hasReferral
    ? roundCurrency(offerPrice * (REFERRAL_DISCOUNT_PERCENT / 100))
    : 0;

  return {
    listPrice: roundCurrency(original),
    offerSaving,
    referralSaving,
    total: roundCurrency(offerPrice - referralSaving),
  };
}
