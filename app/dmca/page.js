// File: pages/dmca.js (Previously dmca-fr1.js)
'use client'
import React from 'react'

export default function DMCA() {
  // Use the updated company name from info.js or environment variable
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'London OnlyFans Models' 
  // Use a generic contact email or environment variable
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@london-fans.com' // Example domain

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">DMCA Notice for London OnlyFans Models</h1>
      <p className="mb-4">
        London OnlyFans Models respects copyright law and responds promptly to clear notices of alleged copyright infringement in accordance with the Digital Millennium Copyright Act (DMCA).
      </p>
      <p>
        {siteName} is committed to complying with takedown requests. If you believe your copyrighted content appears on our platform, please send the username and details of the content you wish to have removed to: {' '}
        <a href={`mailto:${contactEmail}`} className="text-blue-500 underline">
          {contactEmail}
        </a>. We will review and remove the content as soon as possible.
      </p>
    </div>
  )
}
