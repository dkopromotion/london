// app/page.js
import { getAllProfiles } from '@/lib/profiles'
import { notFound } from 'next/navigation'
import { InstagramProfilesGrid } from '../components/InstagramProfilesGrid'
import Script from 'next/script'

export const revalidate = 2592000 // 30 days

export async function generateMetadata() {
  return {
    title: "OnlyFans London – Discover London's Top OnlyFans Models",
    description: "Browse the ultimate list of OnlyFans London models. Find the most popular, unique, and trending OnlyFans creators based in London. Explore profiles, see who's hot, and discover your next favorite London model.",
    openGraph: {
      title: "OnlyFans London – Discover London's Top OnlyFans Models",
      description: "Browse the ultimate list of OnlyFans London models. Find the most popular, unique, and trending OnlyFans creators based in London. Explore profiles, see who's hot, and discover your next favorite London model.",
      images: ['/images/featured.jpg']
    }
  }
}

export default async function CountryPage() {
  const allProfiles = await getAllProfiles('uk')
  if (!allProfiles.length) {
    notFound()
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'OnlyFans London',
    'description': 'A curated overview of OnlyFans models from London. Discover the most popular, unique, and trending creators in the city.',
    'itemListElement': allProfiles.map((profile, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Person',
        'name': profile.name,
        'url': profile.link,
        'image': profile.imageBig ? `/api/image-proxy?url=${encodeURIComponent(profile.imageBig)}&w=800&q=80` : undefined,
        'mainEntityOfPage': profile.link,
      }
    }))
  };

  return (
    <div>
      <Script
        id="profile-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto mt-4 max-w-2xl lg:mx-0">
        <h1 className="text-2xl font-bold mb-2">OnlyFans London Models</h1>
        <p className="mb-4">Explore the most complete overview of <strong>OnlyFans London</strong> models.</p>
      </div>
      <InstagramProfilesGrid profiles={allProfiles} />
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Types of London OnlyFans Models</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Glamour Models:</strong> Classic and modern glamour, from high fashion to pin-up.</li>
          <li><strong>Fitness & Wellness:</strong> Personal trainers, athletes, and wellness advocates sharing workouts and healthy living tips.</li>
          <li><strong>Alternative & Artistic:</strong> Edgy, creative, and alternative models with unique looks and artistic content.</li>
          <li><strong>Lifestyle & Influencers:</strong> Everyday Londoners sharing their city life, fashion, and personal stories.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What Makes London Models Unique?</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Diversity:</strong> London's OnlyFans models reflect the city's multicultural energy and style.</li>
          <li><strong>Creativity:</strong> Many London creators are known for their bold, creative shoots and original content ideas.</li>
          <li><strong>Authenticity:</strong> London models often share real, unfiltered moments from their lives in the city.</li>
        </ul>
      </section>


      <section className="mx-auto mt-8 max-w-2xl lg:mx-0 text-sm leading-relaxed text-gray-800">
        <h2 className="text-xl font-semibold mb-2">How to Discover London OnlyFans Models</h2>
        <p className="mb-4">Browse the profiles above to find your next favorite OnlyFans model from London. Click any profile for more details and follow the creators who match your interests. This list is updated regularly to feature new and trending London talent.</p>
      </section>
    </div>
  )
}
