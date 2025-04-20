// File: pages/terms-fr1.js
'use client'
import React from 'react'

export default function TermsFr1() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'London OnlyFans Models'
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@london-fans.com'

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Use for London OnlyFans Models</h1>
      <p>
        By accessing or using {siteName} ("the Site"), you agree to the following terms and conditions. These Terms of Use govern your access to and use of the Site and all related services provided by {siteName}.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">1. Acceptance of Terms</h2>
      <p>
        By using the Site, you confirm that you have read, understood, and agree to be bound by these terms. If you do not accept these terms, you must not use the Site.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. User Conduct</h2>
      <p>
        You agree not to use the Site for any unlawful or prohibited purpose. You also agree not to take any action that could compromise the security, integrity, or proper functioning of the Site.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. Intellectual Property</h2>
      <p>
        All content on the Site, including but not limited to text, graphics, logos, images, and software, is the property of {siteName} or its content suppliers and is protected by copyright and other laws.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">4. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms of Use at any time without notice. Continued use of the Site after such changes constitutes your acceptance of the new terms.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">5. Limitation of Liability</h2>
      <p>
        {siteName} is not liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Site or its content.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">6. Contact</h2>
      <p>
        If you have any questions about these Terms of Use, please contact us at {' '}
        <a href={`mailto:${contactEmail}`} className="text-blue-500 underline">
          {contactEmail}
        </a>.
      </p>
    </div>
  )
}
