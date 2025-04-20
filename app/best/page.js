// app/best/page.js
import { notFound } from 'next/navigation'
import { getAllProfiles } from '@/lib/profiles'
import { InstagramProfilesGrid } from '@/components/InstagramProfilesGrid'
import Script from 'next/script'

export const revalidate = 2592000 // 30 days

const now = new Date()
const month = now.toLocaleString('en-US', { month: 'long' })
const year = now.getFullYear()

export async function generateMetadata() {
  const title = `Best London OnlyFans Models (Updated ${month} ${year})`
  const description =
    "Discover the complete list of the best OnlyFans accounts in London, featuring the most talented creators offering exclusive and innovative content from the heart of the UK.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/images/featured.jpg']
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default async function BestLondonOnlyFansPage() {
  const allProfiles = await getAllProfiles('uk')
  if (!allProfiles || !allProfiles.length) {
    notFound()
  }

  const profilesForJsonLd = allProfiles;
  const shuffledProfiles = shuffleArray([...allProfiles])

  const pageTitle = `Best London OnlyFans Models`;
  const pageDescription = "Discover the complete list of the best OnlyFans accounts in London, handpicked for their creativity, authenticity, and unique London perspective.";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': pageTitle,
    'description': pageDescription,
    'itemListElement': profilesForJsonLd.map((profile, index) => ({
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
        id="best-profile-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto mt-2 max-w-2xl lg:mx-0">
        <h1 className="text-lg font-medium">
          Best London OnlyFans Models
        </h1>
      </div>

      <InstagramProfilesGrid profiles={shuffledProfiles} settings={{ adCount: 8 }} />

      <div className="mx-auto mt-8 max-w-3xl px-4">
        <h2 className="text-xl font-bold mb-4">
          Discovering the Best London OnlyFans Models
        </h2>
        <p>
          Looking for the top "Best London OnlyFans Models"? Explore a curated selection of London creators who bring you exclusive content inspired by the city's vibrant culture, nightlife, art, and fashion. London's OnlyFans scene is renowned for its diversity and creativity, offering something for every fan.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">
          Why Follow London Creators on OnlyFans?
        </h3>
        <p>
          London-based creators stand out for their unique perspectives and authentic connection to the city. By supporting local talent, you:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Promote London's creative community</li>
          <li>Access exclusive, London-inspired content</li>
          <li>Engage with creators who embody the London spirit</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-2">
          How to Identify the Best London OnlyFans Models?
        </h3>
        <p>
          To find the London OnlyFans Models that best match your interests, consider:
        </p>
        <ol className="list-decimal list-inside ml-4 mt-2">
          <li>
            <strong>Consistency:</strong> Regular updates show dedication and professionalism.
          </li>
          <li>
            <strong>Content Quality:</strong> Look for high-quality visuals, videos, and stories that showcase London life.
          </li>
          <li>
            <strong>Authenticity:</strong> Choose creators who offer a genuine look into their London experiences.
          </li>
        </ol>

        <h3 className="text-lg font-semibold mt-6 mb-2">
          Popular Categories Among London OnlyFans Models
        </h3>
        <p>
          London's OnlyFans talents excel in many areas. Popular categories include:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <strong>Lifestyle:</strong> Experience the daily lives of Londoners, from city adventures to local tips.
          </li>
          <li>
            <strong>Art and Culture:</strong> Follow artists, musicians, and performers sharing their London-inspired creations.
          </li>
          <li>
            <strong>Nightlife & Entertainment:</strong> Discover exclusive moments from London's famous nightlife and entertainment scene.
          </li>
          <li>
            <strong>Fitness and Wellness:</strong> Get inspired by London-based fitness coaches and wellness experts.
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-2">
          Tips for Enjoying Your London OnlyFans Subscriptions
        </h3>
        <p>
          Make the most of your subscriptions with these tips:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <strong>Engage with Creators:</strong> Connect through messages and comments for a more personal experience.
          </li>
          <li>
            <strong>Join Live Sessions:</strong> Participate in live streams for real-time interaction with London creators.
          </li>
          <li>
            <strong>Support Their Work:</strong> Show appreciation and help creators grow by supporting their content.
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-2">
          Find Inspiration and Support London's Creative Scene
        </h3>
        <p>
          Browsing the Best London OnlyFans Models lets you discover unique talents and creative worlds. Each creator brings their own London flair, making the platform a hub for inspiration and connection. Support London's digital creators and enjoy exclusive content that celebrates the city's diversity.
        </p>
        <p>
          Check back often for new additions and updates, and don't hesitate to subscribe to the London OnlyFans Models who inspire you. There's always something new to discover in London's thriving OnlyFans community!
        </p>
      </div>
    </div>
  )
}
