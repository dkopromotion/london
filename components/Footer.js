'use client'
import { info } from '../utils/info'

const navigation = {
  legal: [
    { name: 'DMCA', href: '/dmca' },
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-zinc-100">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-start">
          <div className="space-y-8">
            <p className="text-balance text-sm/6 text-gray-600 max-w-md">
              This website is not associated with OnlyFans. We only embed publicly available images and no leaked content is found or used on this page.
            </p>
            <p className="text-balance text-sm/6 text-gray-600">
              © All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:w-auto">
            <div>
              <h3 className="text-sm/6 font-semibold text-gray-900">Legal</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm/6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
