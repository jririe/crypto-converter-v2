
// SEO utility functions and constants
export const HIGH_VALUE_KEYWORDS = {
  // Primary high-traffic keywords
  primary: [
    'cryptocurrency converter',
    'crypto price calculator',
    'bitcoin converter',
    'ethereum price',
    'crypto exchange rates',
    'digital currency converter',
    'bitcoin to usd converter',
    'ethereum to usd converter',
    'crypto calculator',
    'cryptocurrency price calculator'
  ],
  
  // Long-tail high-conversion keywords
  longTail: [
    'how to convert bitcoin to dollars',
    'best cryptocurrency price tracker',  
    'real time crypto conversion calculator',
    'cryptocurrency market analysis tools',
    'bitcoin price prediction today',
    'ethereum vs bitcoin price comparison',
    'crypto portfolio tracker free',
    'live cryptocurrency exchange rates',
    'bitcoin calculator with fees',
    'crypto tax calculator 2024'
  ],
  
  // Location-based keywords
  location: [
    'cryptocurrency converter usa',
    'crypto prices united states',
    'bitcoin converter canada', 
    'ethereum price europe',
    'crypto exchange rates uk',
    'digital currency converter australia',
    'cryptocurrency calculator india',
    'bitcoin price tracker japan'
  ],
  
  // Trading and exchange keywords
  trading: [
    'crypto trading calculator',
    'cryptocurrency exchange comparison',
    'best crypto exchanges 2024',
    'crypto arbitrage calculator',
    'bitcoin trading fees calculator',
    'cryptocurrency profit calculator',
    'crypto investment calculator',
    'digital asset portfolio tracker'
  ]
};

export const FAQ_DATA = {
  general: [
    {
      question: "How accurate are cryptocurrency prices on CryptoConverter?",
      answer: "Our cryptocurrency prices are sourced from CoinGecko API and updated every 30 seconds, providing real-time accuracy. We aggregate data from multiple exchanges to show the most current market prices."
    },
    {
      question: "Is CryptoConverter free to use?", 
      answer: "Yes, CryptoConverter is completely free to use. You can convert between 1000+ cryptocurrencies and all major fiat currencies without any charges or registration required."
    },
    {
      question: "How many cryptocurrencies does CryptoConverter support?",
      answer: "CryptoConverter supports over 1000 cryptocurrencies including Bitcoin, Ethereum, BNB, Solana, XRP, and all major altcoins, plus 30+ fiat currencies worldwide."
    },
    {
      question: "Can I track my cryptocurrency portfolio on CryptoConverter?",
      answer: "Yes, you can track live prices, market caps, and percentage changes for your favorite cryptocurrencies. We provide comprehensive market data and price alerts."
    }
  ],
  
  converter: [
    {
      question: "How do I convert Bitcoin to USD?",
      answer: "Simply select Bitcoin (BTC) as your 'from' currency and USD as your 'to' currency. Enter the amount you want to convert and get instant results with current exchange rates."
    },
    {
      question: "What fees are included in the conversion rates?",
      answer: "Our conversion rates show market prices without fees. Actual trading fees depend on the exchange you use. We provide fee comparisons for major crypto exchanges."
    },
    {
      question: "Can I convert between different cryptocurrencies?",
      answer: "Yes, you can convert between any supported cryptocurrencies directly, such as Bitcoin to Ethereum, or any crypto to any fiat currency."
    }
  ],
  
  technical: [
    {
      question: "How often are cryptocurrency prices updated?",
      answer: "Cryptocurrency prices are updated every 30 seconds to ensure you have the most current market data for accurate conversions and trading decisions."
    },
    {
      question: "What data sources does CryptoConverter use?",
      answer: "We source our data from reputable providers including CoinGecko API, which aggregates data from hundreds of exchanges worldwide for comprehensive market coverage."
    }
  ]
};

export const SCHEMA_TEMPLATES = {
  webApplication: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CryptoConverter",
    "description": "Real-time cryptocurrency price calculator and converter supporting 1000+ digital assets and all major fiat currencies.",
    "url": "https://cryptoconverter.com",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time cryptocurrency prices",
      "Currency conversion calculator", 
      "Market data and analytics",
      "Cryptocurrency news",
      "Price alerts and notifications",
      "Portfolio tracking",
      "Exchange rate comparisons"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "author": {
      "@type": "Organization",
      "name": "CryptoConverter"
    }
  },
  
  faqPage: (faqs: Array<{question: string, answer: string}>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage", 
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }),
  
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CryptoConverter",
    "url": "https://cryptoconverter.com",
    "logo": "https://lh3.googleusercontent.com/GSLcaCCAeXotUkOpjUvr4Xqy7rZm8MSKItrh25KKzlAFiPfYqOsKLb5CmydLtkcEdgNcNYgWaBoGz1NDmjgckfAeIQ=s275-w275-h175",
    "description": "The world's most comprehensive cryptocurrency converter and price tracking platform.",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/cryptoconverter",
      "https://github.com/cryptoconverter"
    ],
    "contactPoint": {
      "@type": "ContactPoint", 
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  },
  
  breadcrumbList: (items: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  })
};

export function generatePageTitle(pageTitle: string, includeDefault = true): string {
  if (includeDefault) {
    return `${pageTitle} | CryptoConverter - Real-Time Crypto Price Calculator`;
  }
  return pageTitle;
}

export function generateMetaDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}

export function generateKeywords(primary: string[], secondary: string[] = []): string[] {
  return [...new Set([...primary, ...secondary])];
}

export function createSchemaScript(schema: object): string {
  return JSON.stringify(schema);
}
