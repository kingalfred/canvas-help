import Layout from "../components/Layout"
import path from 'path'
import fs from 'fs'
import { parse } from 'jekyll-markdown-parser'
import Link from 'next/link'

const Home = ({ posts }) => {
  return (
    <Layout noSidebar>
      <div className="row">
        <div className="col-md-6">
          <h1>
            Canvas Help
          </h1>
          <p>Tips and tricks for using canvas, as well as some helpful videos.</p>

          { posts.map(post => (
          <div className="post">
            <h2 className="h5 mb-0">
              <Link href="/[slug]" as={`/${post.slug}`}>
              <a>
                {post.parsedYaml.title}
              </a>
              </Link>
            </h2>
            <p className="text-muted">
              {post.parsedYaml.description}
            </p>
          </div>
      ))}
        </div>
        <div className="col-md-6">
          <div className="img" />
        </div>
      </div>
      

      <style jsx>{`
        .post {
          margin-top: 2rem;
        }

        .row {
          margin-top: 5vw;
          max-height: 20rem;
        }

        .img {
          background-image: url(https://assets-ouch.icons8.com/preview/704/67796d29-a281-4ab0-b025-a18fe93c1659.png);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: right;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')

    return {
      slug: path.parse(filename).name,
      ...parse(fileContents)
    }
  })

  console.log({ posts })

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Home
