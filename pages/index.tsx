import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Posts from '../components/Posts';
import { sanityClient } from '../sanity';
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Medium - Where good ideas find you</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Hero />

      <Posts posts={posts} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == 'post'] {
    _id,
    title,
    slug,
    description,
    mainImage,
    author -> {
      name,
      image
    }
  }`;

  const posts = await sanityClient.fetch(query);

  return { props: { posts } };
};

export default Home;
