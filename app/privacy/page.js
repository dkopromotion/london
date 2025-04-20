// File: pages/privacy.js (Previously privacy-fr2.js)
'use client'
import React from 'react'

export default function Privacy() {
  // Use updated defaults consistent with dmca page
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'London OnlyFans Models' 
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@london-fans.com'

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy for London OnlyFans Models</h1>
      <p>
        This Privacy Policy explains how {siteName} ("we" or "our organization") collects, uses, and protects your personal information when you visit or interact with our platform dedicated to London OnlyFans Models.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">1. Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address, and any other details you choose to provide when using our platform or contacting us.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. How We Use Your Data</h2>
      <p>
        Your information is used to improve our website, respond to your inquiries, and provide a better experience for fans and creators of London OnlyFans Models.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. Data Sharing and Disclosure</h2>
      <p>
        We do not share your personal data with third parties except as required by law or to protect our rights and comply with legal obligations.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">4. Security</h2>
      <p>
        We implement reasonable security measures to protect your information. However, please note that no online platform can guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">5. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy at any time. Any changes will be posted on this page with an updated "Last updated" date.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or your data, please contact us at: {' '}
        <a href={`mailto:${contactEmail}`} className="text-blue-500 underline">
          {contactEmail}
        </a>.
      </p>
    </div>
  )
}
