import { Toaster } from "sonner";
import "@/app/style/global.css";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import styles from "@/app/style/applayout.module.css";
import { Inter, Playfair_Display } from "next/font/google";
import { StoreInitializer } from "@/app/components/StoreInitializer";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const SITE_URL = "https://rukihealth.swiftsyn.com";
const BANNER_URL =
  "https://raw.githubusercontent.com/DarknessMonarch/rukihealth/refs/heads/master/public/assets/banner.png";

export const viewport = {
  themeColor: "#37b44c",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "RukiHealth – Premium Herbal Supplements & Wellness Products",
    template: "%s | RukiHealth",
  },

  applicationName: "RukiHealth",

  description:
    "Shop premium herbal supplements, immune boosters, detox formulas, nutritional products, and skincare essentials. RukiHealth offers certified wellness solutions with fast delivery.",

  authors: [{ name: "RukiHealth", url: SITE_URL }],
  generator: "Next.js",

  keywords: [
    "RukiHealth",
    "herbal supplements",
    "BFSUMA alternatives",
    "immune boosters",
    "health products",
    "nutrition",
    "wellness store",
    "skincare products",
    "detox supplements",
    "natural remedies",
    "vitamins",
    "organic health products",
    "weight management",
    "energy boosters"
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "RukiHealth",
    title: "RukiHealth – Premium Herbal Supplements & Wellness Products",
    description:
      "Explore high-quality herbal health products, supplements, and skincare essentials for improved wellness.",
    images: [
      {
        url: BANNER_URL,
        width: 1200,
        height: 630,
        alt: "RukiHealth Wellness Store",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "RukiHealth – Wellness & Herbal Supplements",
    description: "Shop immune boosters, detox products, and skincare essentials.",
    images: [BANNER_URL],
    creator: "@rukihealth",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

  alternates: {
    canonical: `${SITE_URL}`,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RukiHealth",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  description:
    "RukiHealth – Trusted online health store for herbal supplements, skincare, wellness and nutritional products.",
  sameAs: [
    "https://www.facebook.com/rukihealth",
    "https://instagram.com/rukihealth",
    "https://tiktok.com/@rukihealth",
    "https://wa.me/message/welcome to rukihealth, how can we help?",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "rukihealth@gmail.com",
    contactType: "Customer Support",
    telephone: "+254727340853",
    availableLanguage: "English",
  },

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "RukiHealth Product Categories",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Herbal Supplements",
      },
      {
        "@type": "OfferCatalog",
        name: "Immune Boosters",
      },
      {
        "@type": "OfferCatalog",
        name: "Detox & Cleansing",
      },
      {
        "@type": "OfferCatalog",
        name: "Skincare & Beauty",
      },
      {
        "@type": "OfferCatalog",
        name: "Men & Women Health",
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Organization Schema - Global */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Paystack SDK for payment processing */}
        <Script
          id="paystack-js"
          strategy="lazyOnload"
          src="https://js.paystack.co/v1/inline.js"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${inter.className}`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Analytics */}
        <Script
          id="ga-tag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-', {
                page_path: window.location.pathname,
                custom_map: {
                  'custom_parameter_1': 'wellness_category'
                }
              });
              
              gtag('config', 'G-', {
                'custom_map.category': 'wellness'
              });
            `,
          }}
        />

        <Toaster
          position="top-center"
          richColors={true}
          toastOptions={{
            style: {
              background: "#37b44c",
              color: "#ffffff",
              borderRadius: "15px",
              border: "1px solid #37b44c",
            },
          }}
        />
        <div className={styles.appLayout}>
          <Navbar />
          <CartDrawer />
          <StoreInitializer>{children}</StoreInitializer>
          <Footer />
        </div>
      </body>
    </html>
  );
}
