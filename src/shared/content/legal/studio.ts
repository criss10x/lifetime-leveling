import { STUDIO_PRODUCT_SUPPORT_HREF, studioContent } from '../studio';
import type { Locale } from '../../i18n/types';

export interface StudioLegalSection {
  readonly title: string;
  readonly body: string;
  readonly link?: {
    readonly label: string;
    readonly href: string;
  };
}

export interface StudioLegalDocument {
  readonly title: string;
  readonly description: string;
  readonly effectiveDate: string;
  readonly sections: readonly StudioLegalSection[];
}

const productSupportEmail = STUDIO_PRODUCT_SUPPORT_HREF.replace('mailto:', '');
const firstProduct = studioContent.id.featuredProduct.name;

export const studioLegal = {
  id: {
    privacy: {
      title: 'Privasi Lifetime Leveling',
      description: 'Ringkasan privasi untuk website Lifetime Leveling.',
      effectiveDate: '13 Agustus 2026',
      sections: [
        {
          title: 'Ruang lingkup website',
          body: 'Website Lifetime Leveling bersifat informasional dan tidak menyediakan akun pengguna, pembayaran, atau analitik website.',
        },
        {
          title: 'Log server',
          body: 'Hostinger sebagai penyedia hosting website dapat menyediakan log server standar untuk menjalankan dan menjaga layanan web.',
        },
        {
          title: 'Aplikasi',
          body: `Setiap aplikasi dapat memiliki praktik data privasi sendiri. Produk pertama kami adalah ${firstProduct}. Baca`,
          link: {
            label: 'Privasi Muslim Leveling',
            href: 'https://muslim.lifetimeleveling.com/privacy/',
          },
        },
        {
          title: 'Kontak produk',
          body: `Untuk dukungan ${firstProduct}, hubungi ${productSupportEmail}.`,
        },
      ],
    },
    terms: {
      title: 'Ketentuan Lifetime Leveling',
      description: 'Ketentuan untuk website Lifetime Leveling.',
      effectiveDate: '13 Agustus 2026',
      sections: [
        {
          title: 'Status dokumen',
          body: 'Ketentuan ini berlaku untuk website informasional Lifetime Leveling.',
        },
        {
          title: 'Website informasional',
          body: 'Website Lifetime Leveling bersifat informasional. Konten, tautan, dan informasi produk dapat berubah.',
        },
        {
          title: 'Ketersediaan produk',
          body: 'Ketersediaan produk dapat berbeda menurut wilayah, perangkat, dan status peluncuran.',
        },
        {
          title: 'Kontak produk pertama',
          body: `Untuk dukungan ${firstProduct}, hubungi ${productSupportEmail}.`,
        },
      ],
    },
  },
  en: {
    privacy: {
      title: 'Lifetime Leveling Privacy',
      description: 'A privacy summary for the Lifetime Leveling website.',
      effectiveDate: '13 August 2026',
      sections: [
        {
          title: 'Website scope',
          body: 'The Lifetime Leveling website is informational and does not provide user accounts, payments, or website analytics.',
        },
        {
          title: 'Server logs',
          body: 'Hostinger, the website hosting provider, may provide standard server logs to operate and maintain the web service.',
        },
        {
          title: 'Applications',
          body: `Individual applications may have their own privacy data practices. Our first product is ${firstProduct}. Read the`,
          link: {
            label: 'Muslim Leveling Privacy',
            href: 'https://muslim.lifetimeleveling.com/en/privacy/',
          },
        },
        {
          title: 'Product contact',
          body: `For ${firstProduct} support, contact ${productSupportEmail}.`,
        },
      ],
    },
    terms: {
      title: 'Lifetime Leveling Terms',
      description: 'Terms for the Lifetime Leveling website.',
      effectiveDate: '13 August 2026',
      sections: [
        {
          title: 'Document status',
          body: 'These terms apply to the informational Lifetime Leveling website.',
        },
        {
          title: 'Informational website',
          body: 'The Lifetime Leveling website is informational. Content, links, and product information may change.',
        },
        {
          title: 'Product availability',
          body: 'Product availability may vary by region, device, and launch status.',
        },
        {
          title: 'First product contact',
          body: `For ${firstProduct} support, contact ${productSupportEmail}.`,
        },
      ],
    },
  },
} as const satisfies Record<Locale, Record<'privacy' | 'terms', StudioLegalDocument>>;
