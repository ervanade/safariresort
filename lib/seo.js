export function getBaseMeta({
    title,
    description,
    keywords,
    path,
    locale
  }) {
    const baseUrl = 'https://www.domainkamu.com';
  
    return {
      title,
      description,
      keywords,
      alternates: {
        canonical:
          locale === 'en'
            ? `${baseUrl}${path}`
            : `${baseUrl}/${locale}${path}`,
        languages: {
          en: `${baseUrl}${path}`,
          id: `${baseUrl}/id${path}`,
          ar: `${baseUrl}/ar${path}`
        }
      }
    };
  }
  