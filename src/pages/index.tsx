import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'
import Article from '@/components/Article'


const MAX_DISPLAY = 6

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      
      <header className="py-8 md:py-12 px-4">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14" >
             latest articles
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
             {siteMetadata. description}
        </p>
      </header>

      <div className="gap-1 gap-y-px max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
          const { slug } = frontMatter
          return (
            <div key={slug} className="w-full mb-8">
              <Article {...frontMatter} />
            </div>
          )
        })}
      </div>
      {posts.length > MAX_DISPLAY && (
         <div className="flex justify-end text-base font-medium leading-6">
           <Link
             href="/blog"
             className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
             aria-label="All Articles"
           >
             All articles &rarr;
           </Link>
         </div>
       )}
       {siteMetadata.newsletter.provider !== '' && (
         <div className="flex items-center justify-center pt-4">
           <NewsletterForm />
         </div>
      )}
    </>
  )
}
