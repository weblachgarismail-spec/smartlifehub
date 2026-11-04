/* =========================================
   SmartLife Hub — Simple i18n
   Languages: en, fr, ar
   ========================================= */
const translations = {
  en: {
    siteTitle: "SmartLife Hub",
    siteTagline: "Practical technology. Smarter everyday life.",
    navApps: "Apps",
    navBlog: "Blog",
    navAbout: "About",
    navContact: "Contact",
    navPrivacy: "Privacy",
    heroTitle: "Smarter tools for everyday life.",
    heroSub: "FreshGuard — stop food waste. Track expiry dates, save money, cook what you have.",
    btnApps: "Discover Apps",
    btnBlog: "Read Blog",
    appsTitle: "Our Apps",
    appsSub: "Mobile tools built to reduce waste and simplify daily routines.",
    freshguard: "FreshGuard",
    freshguardDesc: "Anti-food-waste inventory with expiry reminders, barcode scanner, recipes and savings stats.",
    features: "Features",
    privacy: "Privacy",
    support: "Support",
    download: "Download",
    blogTitle: "Latest Articles",
    blogSub: "Practical guides on food waste, kitchen organization, productivity and digital life.",
    readMore: "Read more →",
    about: "About",
    aboutText: "SmartLife Hub is an independent editorial platform around mobile apps, technology and digital solutions.",
    contact: "Contact",
    contactText: "Questions or partnership inquiries? Get in touch.",
    footerRights: "© 2026 SmartLife Hub. All rights reserved.",
    langEn: "EN",
    langFr: "FR",
    langAr: "AR",
    downloadLinks: "Download links",
    playStore: "Google Play Store",
    appStore: "Apple App Store",
    apk: "APK (Direct)",
    comingSoon: "Coming soon"
  },
  fr: {
    siteTitle: "SmartLife Hub",
    siteTagline: "Technologie pratique. Vie quotidienne plus intelligente.",
    navApps: "Applications",
    navBlog: "Blog",
    navAbout: "À propos",
    navContact: "Contact",
    navPrivacy: "Confidentialité",
    heroTitle: "Des outils plus intelligents pour le quotidien.",
    heroSub: "FreshGuard — stop au gaspillage alimentaire. Suivez les dates de péremption, économisez, cuisinez ce que vous avez.",
    btnApps: "Découvrir les apps",
    btnBlog: "Lire le blog",
    appsTitle: "Nos Applications",
    appsSub: "Outils mobiles conçus pour réduire le gaspillage et simplifier les routines quotidiennes.",
    freshguard: "FreshGuard",
    freshguardDesc: "Inventaire anti-gaspillage avec alertes de péremption, scanner code-barres, recettes et statistiques d'économie.",
    features: "Fonctionnalités",
    privacy: "Confidentialité",
    support: "Support",
    download: "Télécharger",
    blogTitle: "Derniers articles",
    blogSub: "Guides pratiques sur le gaspillage alimentaire, l'organisation de cuisine, la productivité et la vie numérique.",
    readMore: "Lire la suite →",
    about: "À propos",
    aboutText: "SmartLife Hub est une plateforme éditoriale indépendante autour des applications mobiles, de la technologie et des solutions numériques.",
    contact: "Contact",
    contactText: "Des questions ou une proposition de partenariat ? Contactez-nous.",
    footerRights: "© 2026 SmartLife Hub. Tous droits réservés.",
    langEn: "EN",
    langFr: "FR",
    langAr: "AR",
    downloadLinks: "Liens de téléchargement",
    playStore: "Google Play Store",
    appStore: "Apple App Store",
    apk: "APK (Direct)",
    comingSoon: "Bientôt disponible"
  },
  ar: {
    siteTitle: "أوكس لايف هاب",
    siteTagline: "تقنية عملية. حياة يومية أذكى.",
    navApps: "التطبيقات",
    navBlog: "المدونة",
    navAbout: "موقع",
    navContact: "اتصل",
    navPrivacy: "الخصوصية",
    heroTitle: "أدوات أكثر ذكاءً للحياة اليومية.",
    heroSub: "FreshGuard — توقف عن هدر الطعام. تتبع تواريخ الانتهاء، وفر المال، واطبخ ما لديك.",
    btnApps: "اكتشف التطبيقات",
    btnBlog: "اقرأ المدونة",
    appsTitle: "تطبيقاتنا",
    appsSub: "أدوات جوالة مصممة لتقليل الهدر وتبسيط الروتين اليومي.",
    freshguard: "فرش غاردي",
    freshguardDesc: "مخزون مضاد لإهدار الطعام مع تنبيهات الصلاحية، ماسح الباركود، وصفات وإحصاءات التوفير.",
    features: "الميزات",
    privacy: "الخصوصية",
    support: "الدعم",
    download: "التنزيل",
    blogTitle: "أحدث المقالات",
    blogSub: "دروس عملية حول هدر الطعام، تنظيم المطبخ، الإنتاجية والحياة الرقمية.",
    readMore: "اقرأ المزيد →",
    about: "عن الموقع",
    aboutText: "أوكس لايف هاب منصة تحريرية مستقلة حول التطبيقات الجوالة والتكنولوجيا والحلول الرقمية.",
    contact: "اتصل بنا",
    contactText: "أسئلة أو عروض شراكة؟ تواصل معنا.",
    footerRights: "© 2026 أوكس لايف هاب. جميع الحقوق محفوظة.",
    langEn: "EN",
    langFr: "FR",
    langAr: "AR",
    downloadLinks: "روابط التنزيل",
    playStore: "متجر جوجل بلاي",
    appStore: "متجر آبل",
    apk: "آي بي كيه (مباشر)",
    comingSoon: "قريباً"
  }
};

let currentLang = 'en';

function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = translations[lang][key];
    if (val) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    }
  });

  // Update document title if it has i18n
  const titleKey = document.querySelector('title[data-i18n]');
  if (titleKey) {
    document.title = translations[lang][titleKey.getAttribute('data-i18n')];
  }
}

function initI18n() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  // Detect RTL for body
  if (currentLang === 'ar') {
    document.body.style.direction = 'rtl';
  }
}