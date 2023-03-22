import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import * as prismicH from '@prismicio/helpers'

import { getPrismicClient } from '@/services/prismic'
import clsx from 'clsx'

type Post = {
  slug: string
  cover: string
  title: string
  excerpt: string
  updatedAt: string
}

type PostsProps = {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title> Posts | Blog - Carverna labs </title>
      </Head>

      <main className="w-full max-w-6xl mt-32 mx-auto px-8">
        <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={clsx(
                'block',
                index > 0 && 'pt-8 border-t border-gray-700'
              )}
            >
              <time className="flex items-center text-base text-[#a8a8b3]">
                {post.updatedAt}
              </time>

              <strong className="transition-colors block mt-4 text-2xl text-white hover:text-[#04D361]">
                {post.title}
              </strong>

              <p className="mt-2 text-[#a8a8b3] leading-6">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.get({
    pageSize: 3
  })

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      cover: post.data?.cover?.url ?? '',
      categories: post.tags || [],
      excerpt:
        post.data.content.find(
          (content: { type: string }) => content.type === 'paragraph'
        )?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    }
  })

  return {
    props: {
      posts
    }
  }
}
