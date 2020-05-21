import Layout from "../components/Layout"
import path from 'path'
import fs from 'fs'
import { parse } from 'jekyll-markdown-parser'
import Link from 'next/link'

const Post = ({ post }) => {
  return (
    <Layout>
      <div className="container mt-4">
        <p>
          <Link href="/">
            <a className="mb-4">Back home</a>
          </Link>
        </p>

        <div dangerouslySetInnerHTML={{__html: post.html}} />
      </div>

      <style global jsx>{`
        img {
          height: auto;
          max-width: 60%;
          margin: 0 auto;
          display: block;
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')

    return {
      params: {
        slug: path.parse(filename).name,
        ...parse(fileContents)
      }
    }
  })

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    paths: posts,
    fallback: false
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const postPath = path.join(process.cwd(), 'posts', params.slug + '.md')
  const file = fs.readFileSync(postPath).toString()

  // Pass post data to the page via props
  return {
    props: {
      post: parse(file)
    }
  }
}

export default Post
