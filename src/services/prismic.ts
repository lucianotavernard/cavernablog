/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as prismic from '@prismicio/client'

export function getPrismicClient() {
  const repoName = process.env.PRISMIC_ENDPOINT!

  const config = {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  }

  const client = prismic.createClient(repoName, config)

  return client
}
