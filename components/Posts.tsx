import { Post } from '../typings';
import PostCard from './PostCard';

interface Props {
  posts: [Post];
}

const Posts = ({ posts }: Props) => (
  <section className="px-6 py-10">
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-1 gap-x-6 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            slug={post.slug}
            title={post.title}
            mainImage={post.mainImage}
            author={post.author}
            description={post.description}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Posts;
