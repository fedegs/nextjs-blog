import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"
import { getSortedPostsData } from "../lib/posts"
import utilStyles from "../styles/utils.module.css"
import Date from "../components/date"

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>
          Hi, I'm Federico. I'm a fullstack web developer. I'm doing the{" "}
          <a
            href="https://nextjs.org/learn/foundations/about-nextjs"
            target="_blank"
          >
            Next.js
          </a>{" "}
          tutorial.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.pt1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, date }) => {
            return (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}
