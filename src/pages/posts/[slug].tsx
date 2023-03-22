import { useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'

import Head from 'next/head'

import clsx from 'clsx'
import * as prismicH from '@prismicio/helpers'

import { Header } from '@/components/Header'

import { getPrismicClient } from '@/services/prismic'

export type Post = {
  slug: string
  title: string
  cover: string
  excerpt: string
  updatedAt: string
}

type PostProps = {
  post: Post
}

export default function Post({ post }: PostProps) {
  const articleRef = useRef<HTMLElement>(null)

  const [visible, setVisible] = useState(false)

  function handleScroll() {
    if (
      articleRef?.current &&
      articleRef?.current.offsetTop + 200 <=
        window.pageYOffset + window.innerHeight
    ) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', () => handleScroll())

    return () => window.removeEventListener('scroll', () => handleScroll())
  })

  return (
    <>
      <Head>
        <title>{post.title} | Blog - Carverna labs</title>
      </Head>

      <main className="flex flex-col grow">
        <header className="relative overflow-hidden flex flex-col justify-center items-center min-h-[25rem] md:min-h-[28rem] xl:min-h-[36rem]">
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
            <img
              className="w-full h-full object-cover"
              src={post.cover}
              alt=""
            />
          </div>
        </header>

        <article ref={articleRef} className="py-16">
          <div
            className={clsx(
              'transition-all duration-300 w-full max-w-4xl mx-auto px-8 text-[#b4b4b4]',
              visible ? 'translate-y-0 opacity-100' : 'translate-y-28 opacity-0'
            )}
          >
            <header className="mb-14 text-center">
              <h1 className="flex justify-center items-center mb-5 tracking-tighter font-bold text-5xl">
                {post.title}
              </h1>

              <div className="flex justify-center items-center tracking-tighter text-base font-bold">
                <time className="text-green-700">{post.updatedAt}</time>
              </div>
            </header>

            <section
              className="relative post-content"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            ></section>
          </div>
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('publication', String(slug), {})

  const updatedAt = response.last_publication_date
    ? new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    : null

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    cover: response.data.cover.url ?? '',
    categories: response.tags || [],
    excerpt: prismicH.asHTML(response.data.content),
    updatedAt: updatedAt
  }

  return {
    props: {
      post
    }
  }
}
