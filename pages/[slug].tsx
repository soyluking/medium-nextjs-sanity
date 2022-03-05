import type { GetStaticProps } from 'next';
import Image from 'next/image';
import dayjs from 'dayjs';
import PortableText from 'react-portable-text';
import Header from '../components/Header';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';
import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm';

interface Props {
  post: Post;
}

const Single = ({ post }: Props) => {
  console.log(post);
  return (
    <main className="pt-16 md:pt-24">
      <div className="fixed top-0 left-0 z-20 w-full bg-white">
        <Header />
      </div>

      <div className="py-12 px-6">
        <div className="mx-auto max-w-3xl">
          <article>
            <div className="mb-6 flex items-center space-x-2">
              <Image
                className="rounded-full"
                src={urlFor(post.author.image).url()}
                width="40"
                height="40"
              />
              <p className="text-sm">
                {post.author.name}
                <br />
                <span className="text-gray-400">
                  {dayjs(post._createdAt).format('DD MMM')}
                </span>
              </p>
            </div>

            <h1 className="mb-3 text-3xl font-bold">
              {post.title}
            </h1>

            <h2 className="text-xl font-light text-gray-400">
              {post.description}
            </h2>

            {post.body && (
              <div className="mt-8">
                <PortableText
                  dataset={
                    process.env.NEXT_PUBLIC_SANITY_DATASET
                  }
                  projectId={
                    process.env
                      .NEXT_PUBLIC_SANITY_PROJECT_ID
                  }
                  content={post.body}
                  serializers={{
                    h1: (props: any) => (
                      <h1
                        className="my-5 text-2xl font-bold"
                        {...props}
                      />
                    ),
                    h2: (props: any) => (
                      <h2
                        className="my-5 text-xl font-bold"
                        {...props}
                      />
                    ),
                    h3: (props: any) => (
                      <h3
                        className="my-5 text-lg font-bold"
                        {...props}
                      />
                    ),
                    li: ({ children }: any) => (
                      <li className="ml-4 list-disc">
                        {children}
                      </li>
                    ),
                    link: ({ href, children }: any) => (
                      <a
                        href={href}
                        className="text-blue-500 hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  }}
                />
              </div>
            )}
          </article>

          <hr className="my-12 border-gray-200" />

          <Comments comments={post.comments} />

          {post._id && <CommentForm postId={post._id} />}
        </div>
      </div>
    </main>
  );
};

export default Single;

export const getStaticPaths = async () => {
  const query = `*[_type == 'post'] {
    _id,
    slug {
      current,
    },
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const query = `*[_type == 'post' && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author -> {
      name,
      image,
    },
    'comments': *[
      _type == 'comment' &&
      post._ref == ^._id &&
      approved == true
    ],
    description,
    mainImage,
    slug,
    body,
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) return { notFound: true };

  return {
    props: { post },
    revalidate: 60,
  };
};
