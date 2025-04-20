// lib/profiles.js
import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function getAvailableCountries() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  
  const adsCountries = await db.collection('ads')
    .distinct('country')
  
  const postsCountries = await db.collection('usernames')
    .distinct('country')
    
  const allCountries = [...new Set([...adsCountries, ...postsCountries])]
    .filter(Boolean)
    .map(country => country.toLowerCase().trim())
    .filter(country => country !== '')
    
  return allCountries
}

export async function getAllProfiles(country) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  
  console.log(`Searching for country: "${country}"`)
  
  // Get ALL ads, ignoring country filter
  const ads = await db.collection('ads')
    .find({
      tag: 'instagram'
    })
    .toArray()
  
  console.log(`Found ${ads.length} ads`)

  // Get country-specific profiles
  const query = {
    tag: 'instagram',
    country: { $regex: new RegExp(`^${country}$`, 'i') }
  }
  console.log('Query for usernames collection:', JSON.stringify(query))
  
  const posts = await db.collection('usernames')
    .find(query)
    .toArray()
  
  console.log(`Found ${posts.length} profiles with country: "${country}"`)
  if (posts.length > 0) {
    console.log('First profile country value:', posts[0].country)
  }

  const normalize = (doc, isAd) => ({
    ...doc,
    _id: { $oid: doc._id.toString() },
    price: doc.price?.toString() || '',
    country: (doc.country?.toString() || '').toLowerCase(),
    ad: isAd,
    prio: doc.prio // Use numeric prio from the document
  })

  const normalizedAds = ads.map(doc => normalize(doc, true))
  const normalizedPosts = posts.map(doc => normalize(doc, false))

  const result = [...normalizedAds, ...normalizedPosts]
  console.log(`Returning total of ${result.length} profiles (${normalizedAds.length} ads + ${normalizedPosts.length} regular)`)
  
  return result
}

export async function getFreeProfiles(country) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  
  // Get ALL ads, ignoring country filter
  const ads = await db.collection('ads')
    .find({
      tag: 'instagram'
    })
    .toArray()

  // Get country-specific free profiles
  const posts = await db.collection('usernames')
    .find({
      tag: 'instagram',
      country: { $regex: new RegExp(`^${country}$`, 'i') },
      $or: [
        { free: true },
        { price: { $in: ['free', 'Free', 'FREE', '$0', '0'] } }
      ]
    })
    .toArray()

  const normalize = (doc, isAd) => ({
    ...doc,
    _id: { $oid: doc._id.toString() },
    price: doc.price?.toString() || '',
    country: (doc.country?.toString() || '').toLowerCase(),
    ad: isAd,
    prio: doc.prio // Use numeric prio from the document
  })

  const normalizedAds = ads.map(doc => normalize(doc, true))
  const normalizedPosts = posts.map(doc => normalize(doc, false))

  return [...normalizedAds, ...normalizedPosts]
}

export async function getProfile(tag, name) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  
  let profile = await db.collection('ads').findOne({ tag, name })
  
  if (!profile) {
    profile = await db.collection('posts').findOne({ tag, name })
  }
  
  if (profile) {
    profile._id = { $oid: profile._id.toString() }
  }
  
  return profile
}
