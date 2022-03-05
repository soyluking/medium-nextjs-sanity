import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../sanity';
import { Post } from '../typings';

const PostCard = ({ slug, mainImage, title, author, description }: Post) => {
  return (
    <article>
      <Link href={`/${slug.current}`}>
        <a>
          {mainImage && (
            <figure className="relative mb-4 h-60">
              <Image
                src={urlFor(mainImage).url()}
                layout="fill"
                objectFit="cover"
              />
            </figure>
          )}
        </a>
      </Link>

      {author && (
        <div className="mb-2 flex items-center space-x-2">
          <Image
            className="rounded-full"
            src={urlFor(author.image).url()}
            width="20"
            height="20"
          />
          <span className="text-sm font-medium">{author.name}</span>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-2xl font-bold">
          <Link href={`/${slug.current}`}>
            <a>{title}</a>
          </Link>
        </h3>

        <p className="text-gray-400">{description}</p>
      </div>
    </article>
  );
};

export default PostCard;
