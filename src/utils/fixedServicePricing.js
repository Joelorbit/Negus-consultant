const FIXED_SERVICE_PRICING = {
  recommendation_letter: {
    name: "Recommendation Letter Assistance (per letter)",
    price_etb: 900,
  },
  common_app_support: {
    name: "Common App Activities List",
    price_etb: 1500,
  },
};

export function normalizeFixedServicePricing(services) {
  return services.map((service) => ({
    ...service,
    ...FIXED_SERVICE_PRICING[service.code],
  }));
}
