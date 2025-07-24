
import { SCHEMA_TEMPLATES } from '@/lib/seo-utils';

interface StructuredDataProps {
  type: 'webApplication' | 'organization' | 'faqPage' | 'breadcrumbList';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let schema;
  
  switch (type) {
    case 'webApplication':
      schema = SCHEMA_TEMPLATES.webApplication;
      break;
    case 'organization':
      schema = SCHEMA_TEMPLATES.organization;
      break;
    case 'faqPage':
      schema = SCHEMA_TEMPLATES.faqPage(data);
      break;
    case 'breadcrumbList':
      schema = SCHEMA_TEMPLATES.breadcrumbList(data);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
