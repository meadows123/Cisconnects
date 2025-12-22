import { Helmet } from 'react-helmet';

const StructuredData = ({ type, data }) => {
  const getSchema = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Conxiea',
          url: 'https://www.cisconnects.com',
          logo: 'https://www.cisconnects.com/7.png',
          description: 'AI network automation and IT infrastructure solutions provider',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '25 Lyndey Road',
            addressLocality: 'Bristol',
            postalCode: 'BS16 9HG',
            addressCountry: 'GB'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+44-7708-227512',
            contactType: 'Customer Service',
            email: 'admin@conxiea.com',
            areaServed: 'GB',
            availableLanguage: 'English'
          },
          sameAs: [
            'https://uk.trustpilot.com/review/cisconnects.com',
            'https://www.youtube.com/@conxiea',
            'https://www.instagram.com/conxiea',
            'https://www.linkedin.com/company/conxiea'
          ],
          ...data
        };

      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: data.serviceType || 'Network Automation Service',
          provider: {
            '@type': 'Organization',
            name: 'Cisconnects'
          },
          areaServed: {
            '@type': 'Country',
            name: 'United Kingdom'
          },
          ...data
        };

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        };

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.headline,
          description: data.description,
          author: {
            '@type': 'Person',
            name: data.author || 'Conxiea Team'
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          publisher: {
            '@type': 'Organization',
            name: 'Conxiea',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.cisconnects.com/7.png'
            }
          },
          ...data
        };

      case 'SoftwareApplication':
        return {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: data.name,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'GBP'
          },
          ...data
        };

      default:
        return data;
    }
  };

  const schema = getSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;

