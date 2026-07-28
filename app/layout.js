import './globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Open_Sans, Montserrat, Cormorant_Garamond, Poppins } from 'next/font/google'
import { CITY_DISPLAY } from '../lib/config'
import localFont from 'next/font/local'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const nephilm = localFont({
  src: '../public/fonts/Nephilm.otf',
  variable: '--font-nephilm',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://pragnyaedenpark.co.in'),
  title: 'Pragnya Eden Park | Premium 2 & 3 BHK Homes in Siruseri, Chennai',
  description: "Pragnya Eden Park — OMR Chennai's premier integrated residential township in Siruseri. Premium 2 & 3 BHK luxury residences spread over 92 acres. Designed for elevated living.",
  alternates: {
    canonical: 'https://pragnyaedenpark.co.in',
  },
  openGraph: {
    title: 'Pragnya Eden Park | Luxury Integrated Township in Siruseri',
    description: "Discover luxury 2 & 3 BHK apartments in Pragnya Eden Park, an integrated 92-acre township in Siruseri OMR Chennai.",
    url: 'https://pragnyaedenpark.co.in',
    siteName: 'Pragnya Eden Park',
    images: [
      {
        url: '/projects/iris-tower.jpg',
        width: 1200,
        height: 630,
        alt: 'Pragnya Eden Park Siruseri Chennai',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pragnya Eden Park | Premium 2 & 3 BHK Homes in Siruseri',
    description: "OMR Chennai's premier integrated residential township in Siruseri.",
    images: ['/projects/iris-tower.jpg'],
  },
}

import SmoothScroll from '../components/SmoothScroll'

export default function RootLayout({ children }) {  
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-575H8R87" />
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Pragnya Eden Park Siruseri",
              "url": "https://pragnyaedenpark.co.in",
              "logo": "https://pragnyaedenpark.co.in/projects/iris-tower.jpg",
              "image": "https://pragnyaedenpark.co.in/projects/iris-tower.jpg",
              "description": "Pragnya Eden Park, OMR Chennai's premier luxury integrated township in Siruseri offering 2 & 3 BHK premium residences.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Eden Park, Siruseri SIPCOT IT Park Road, OMR",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "postalCode": "603103",
                "addressCountry": "IN"
              },
              "telephone": "+919718344024",
              "priceRange": "₹60 Lakhs - ₹1.25 Cr",
              "sameAs": [
                "https://pragnyaedenpark.co.in"
              ]
            })
          }}
        />
      </head>
      <body className={`${openSans.variable} ${montserrat.variable} ${cormorant.variable} ${nephilm.variable} ${poppins.variable} font-sans text-dark antialiased`}>
        <Script id="gtag-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ 'city': '${CITY_DISPLAY}' });
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`} 
        </Script>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
