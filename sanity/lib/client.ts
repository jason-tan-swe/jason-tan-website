import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { type QueryParams } from 'next-sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params: QueryParams
  tags: string[]
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'production' ? 60 : 0, // 0 means always revalidate in development
      tags
    }
  })
}
