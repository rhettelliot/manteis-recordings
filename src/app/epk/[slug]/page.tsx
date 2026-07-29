import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { artistEPKs, getEPKBySlug } from '@/lib/epk'
import { releases } from '@/lib/catalog'
import { EPKClient } from './epk-client'

export async function generateStaticParams() {
  return artistEPKs.map((artist) => ({ slug: artist.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const artist = getEPKBySlug(slug)
  if (!artist) return {}

  const title = `${artist.name} — EPK | Manteis Recordings`
  const description = artist.shortBio

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: [{ url: artist.highResPhoto, width: 1200, height: 1200, alt: `${artist.name} — ${artist.role}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [artist.highResPhoto],
    },
  }
}

export default async function EPKPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const artist = getEPKBySlug(slug)
  if (!artist) notFound()

  const artistReleases = releases.filter((r) => r.artist === artist.name)

  return <EPKClient artist={artist} releases={artistReleases} />
}