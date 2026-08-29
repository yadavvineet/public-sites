import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";
import { company } from "@/lib/company";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "V2K Media | Digital, Print & Custom Business Solutions",
    template: "%s | V2K Media",
  },
  description:
    "V2K Media is a Delhi-based company providing digital products, applications, print and marketing solutions, corporate gifting and customized business solutions.",
  metadataBase: new URL(company.url),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "V2K Media | Digital, Print & Custom Business Solutions",
    description:
      "V2K Media is a Delhi-based company providing digital products, applications, print and marketing solutions, corporate gifting and customized business solutions.",
    type: "website",
    url: company.url,
    siteName: "V2K Media",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "V2K Media" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "V2K Media | Digital, Print & Custom Business Solutions",
    description:
      "V2K Media is a Delhi-based company providing digital products, applications, print and marketing solutions, corporate gifting and customized business solutions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: company.name,
        url: company.url,
        email: company.email,
        telephone: company.phone,
        location: {
          "@type": "Place",
          name: company.location,
        },
      },
      {
        "@type": "LocalBusiness",
        name: company.name,
        areaServed: {
          "@type": "City",
          name: "Delhi",
          containedInPlace: {
            "@type": "State",
            name: "Delhi",
          },
        },
        telephone: company.phone,
        email: company.email,
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-inter bg-offwhite text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
