/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import { PostFrontMatter } from 'types/PostFrontMatter'

export default function Article({ slug, date, title, summary, tags, images }: PostFrontMatter) {
  const src = Array.isArray(images) ? images[0] : images
  return (
    <li className="">
      <article className="flex flex-col sm:flex-row justify-between items-center">
        <Link href={`/blog/${slug}`} className="flex-1 flex flex-col space-y-3 rounded-2xl border border-accent-2 p-6 transition-all duration-300 hover:scale-105 hover:bg-accent-1">
          <div className="overflow-hidden rounded-lg">
            {src ? (
              <img
                alt={title}
                src={src}
                className="w-full h-48 sm:h-52 md:h-60 lg:h-72 duration-700 ease-in-out scale-100 blur-0 grayscale-0 rounded-lg"
                decoding="async"
                loading="lazy"
              />
            ) : null}
          </div>
          <div className="flex-grow space-y-4">
            <h2 className="text-xl font-bold">{title}</h2>
        
          </div>
          <div className="flex flex-wrap items-center text-sm">
            <time dateTime={date}>{formatDate(date)}</time>
            &nbsp;/&nbsp;
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </Link>
      </article>
    </li>
  )
}
