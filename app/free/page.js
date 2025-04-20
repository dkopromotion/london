// app/free/page.js
import { notFound } from 'next/navigation'
import { getFreeProfiles } from '@/lib/profiles'
import { InstagramProfilesGrid } from '@/components/InstagramProfilesGrid'
import { getFreeMeta, getFreePageHeading, getFreePageText, info } from '../../utils/info'
import Script from 'next/script';

export const revalidate = 2592000 // 30 days

export async function generateMetadata() {
  // Custom meta for London OnlyFans Models Free Accounts
  return {
    title: 'Free London OnlyFans Models - Discover Top Free Creators in London',
    description: 'Browse the best free OnlyFans accounts from London. Connect with London OnlyFans Models offering exclusive content at no cost. Updated and curated for fans seeking free London creators.',
    openGraph: {
      title: 'Free London OnlyFans Models - Discover Top Free Creators in London',
      description: 'Browse the best free OnlyFans accounts from London. Connect with London OnlyFans Models offering exclusive content at no cost. Updated and curated for fans seeking free London creators.',
      images: ['/images/featured.jpg']
    }
  }
}

export default async function HawaiiFreePage() {
  const allProfiles = await getFreeProfiles(info.code)
  if (!allProfiles || !allProfiles.length) {
    notFound()
  }

  const maxSponsored = 10
  const sponsored = allProfiles.filter((p) => p.prio || p.ad).slice(0, maxSponsored)
  const regular = allProfiles.filter((p) => !p.prio && !p.ad)
  const profiles = [...sponsored, ...regular]

  // Generate JSON-LD structured data (use all profiles before filtering/sorting for schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Free London OnlyFans Models',
    'description': 'A curated list of the best free OnlyFans creators and influencers based in London. Discover exclusive content and connect with top London OnlyFans Models for free.',
    'itemListElement': allProfiles.map((profile, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Person',
        'name': profile.name,
        'url': profile.link,
        'image': profile.imageBig ? `/api/image-proxy?url=${encodeURIComponent(profile.imageBig)}&w=800&q=80` : undefined,
        'mainEntityOfPage': profile.link,
        'additionalProperty': {
          '@type': 'PropertyValue',
          'name': 'Subscription Price',
          'value': 'Free'
        }
      }
    }))
  };

  return (
    <div>
      <Script
        id="free-profile-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto mt-2 max-w-2xl lg:mx-0">
        <h1 className="text-lg font-medium">
          Free London OnlyFans Models
        </h1>
        <p>
          Discover the best free OnlyFans accounts in London! Explore a handpicked selection of London OnlyFans Models offering exclusive content at no cost. Whether you're new to OnlyFans or looking to support London creators without a subscription, this is your go-to list for free London content.
        </p>
      </div>
      <InstagramProfilesGrid profiles={profiles} settings={{ adCount: 8 }} />
    </div>
  )
}
