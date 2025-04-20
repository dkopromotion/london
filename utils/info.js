const now = new Date()
const month = now.toLocaleString('en-GB', { month: 'long' })
const year = now.getFullYear() // ex: 2025

export const info = {
  code: 'uk',
  displayName: 'uk',
  pageHeading: 'Directory of London OnlyFans Models',
  pageText:
    'Discover the complete list of all OnlyFans creators from London today. london onlyfans models',
  footerText:
    'London OnlyFans Models has no official connection with OnlyFans; we simply list creators originating from London. We do not permanently store images, as they are embedded directly from the source platform. There is no leaked content or explicit photos here – only publicly available visuals. We also feature updated exclusive offers for OnlyFans in London daily!',
  companyName: 'London OnlyFans Models',
  showLogo: true,
  defaultMeta: {
    title: `London OnlyFans Accounts & Models (Updated ${month} ${year})`,
    description:
      'The most comprehensive list of OnlyFans creators and models in London, recently updated.'
  }
}

// META-DATA FOR FREE ACCOUNTS
export function getFreeMeta() {
  const title = `Free London OnlyFans Accounts (Updated ${month} ${year})`
  const description = `The complete list of all free OnlyFans accounts and models originating from London.`
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

// PAGE CONTENT FOR FREE ACCOUNTS
export function getFreePageHeading() {
  return `Free London OnlyFans Accounts`
}

export function getFreePageText() {
  return `The complete summary of all free OnlyFans accounts and models from London.`
}

// HELPER FUNCTIONS
export function getPageHeading() {
  return info.pageHeading
}

export function getPageText() {
  return info.pageText
}
