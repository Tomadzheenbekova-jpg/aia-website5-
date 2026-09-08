// ============================================================
// Тип словаря. Оба файла словарей (ru.ts, en.ts) должны полностью
// соответствовать этой структуре — TypeScript подскажет, если
// в одном из языков забыли перевести новый текст.
// ============================================================

export type Dictionary = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    ogDescription: string;
  };
  nav: {
    kollektsii: string;
    proizvodstvo: string;
    kontraktnoe: string;
    obrende: string;
    kontakty: string;
    wbButton: string;
  };
  footer: {
    sectionsTitle: string;
    contactsTitle: string;
    shopTitle: string;
    contactsEmpty: string;
    wbPending: string;
    privacyPolicy: string;
    consent: string;
    whatsappCis: string;
    whatsappEurope: string;
    telegramChannel: string;
  };
  placeholders: {
    finished: string;
    onModel: string;
    workshop: string;
    sewingProcess: string;
  };
  categories: Record<
    "bryuki" | "palazzo" | "rubashki" | "bluzki" | "yubki" | "zhilety" | "platya" | "zhakety" | "kurtki",
    { title: string; description: string }
  >;
  home: {
    brandTagline: string;
    eyebrow: string;
    heroTitle: string;
    heroText: string;
    ctaCollection: string;
    ctaProduction: string;
    categoriesTitle: string;
    allCollections: string;
    capsuleEyebrow: string;
    capsuleTitle: string;
    capsuleText: string;
    capsuleCta: string;
    dressesTitle: string;
    dressesText: string;
    palazzoTitle: string;
    palazzoText: string;
    seeCollectionArrow: string;
    productionTitle: string;
    productionText: string;
    productionCta: string;
    contractTitle: string;
    contractText: string;
    contractCta: string;
    whereToBuyTitle: string;
    whereToBuyText: string;
    buyOnWb: string;
    orderOnSite: string;
  };
  about: {
    title: string;
    intro1: string;
    intro2: string;
    capsuleEyebrow: string;
    capsuleTitle: string;
    capsuleText: string;
    careTitle: string;
    careText: string;
  };
  production: {
    title: string;
    intro: string;
    equipmentText: string;
    fabricText: string;
    batchText: string;
    leadTimeText: string;
    qualityTitle: string;
    qualityText: string;
    quoteTitle: string;
    quoteText: string;
    ctaTitle: string;
    ctaText: string;
    contractCta: string;
  };
  collections: {
    title: string;
    intro: string;
    orderSectionTitle: string;
    orderSectionText: string;
    buyOnWb: string;
    orderOnSite: string;
  };
  contract: {
    title: string;
    minBatchPrefix: string;
    minBatchSuffix: string;
    negotiateNote: string;
    formTitle: string;
    formIntro: string;
  };
  contacts: {
    title: string;
    phoneLabel: string;
    emailLabel: string;
    whatsappCisLabel: string;
    whatsappEuropeLabel: string;
    telegramLabel: string;
    pending: string;
    channelPending: string;
    whatsappCta: string;
    telegramCta: string;
    formIntro: string;
  };
  privacyPolicy: {
    title: string;
    p1: string;
    p2: string;
    legalTitle: string;
    entityName: string;
    inn: string;
    registrationNumber: string;
    legalAddress: string;
    operator: string;
    fillLater: string;
    pendingNote: string;
  };
  consent: {
    title: string;
    p1: string;
    p2: string;
    operatorLabel: string;
    contactsLinkText: string;
  };
  notFound: {
    code: string;
    title: string;
    text: string;
    home: string;
  };
  forms: {
    required: string;
    order: {
      name: string;
      phone: string;
      preferredContact: string;
      preferredContactPlaceholder: string;
      product: string;
      productPlaceholder: string;
      color: string;
      size: string;
      quantity: string;
      deliveryLocation: string;
      comment: string;
      consentText: string;
      consentLinkText: string;
      submit: string;
      submitting: string;
      success: string;
      errorGeneric: string;
    };
    contract: {
      name: string;
      company: string;
      phone: string;
      preferredContact: string;
      preferredContactPlaceholder: string;
      messenger: string;
      email: string;
      orderSummary: string;
      category: string;
      quantity: string;
      quantityPlaceholder: string;
      additionalLegend: string;
      hasSample: string;
      hasSpec: string;
      hasPatterns: string;
      needsPatternDevelopment: string;
      fabricSource: string;
      fabricPlaceholder: string;
      desiredTimeline: string;
      referenceLink: string;
      comment: string;
      consentText: string;
      consentLinkText: string;
      submit: string;
      submitting: string;
      success: string;
      errorGeneric: string;
    };
    contact: {
      name: string;
      phone: string;
      preferredContact: string;
      subject: string;
      message: string;
      consentText: string;
      consentLinkText: string;
      submit: string;
      submitting: string;
      success: string;
      errorGeneric: string;
    };
  };
};
