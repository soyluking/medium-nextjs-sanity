import dayjs from 'dayjs';
import { Comment } from '../typings';

interface Props {
  comments: Comment[];
}

const Comments = ({ comments }: Props) => {
  return !comments.length ? (
    <div className="mb-12 p-6 shadow-lg shadow-gray-200 md:p-12">
      <p className="text-center text-lg italic text-gray-400">
        There are currently no responses for this story.
        <br />
        Be the first to respond.
      </p>
    </div>
  ) : (
    <div className="mb-12 p-6 shadow-lg shadow-gray-200 md:p-12">
      <h3 className="text-2xl font-bold">
        Responses ({comments.length})
      </h3>

      <hr className="mt-5 mb-8" />

      <div className="space-y-8">
        {comments.map((comment) => (
          <div
            className="border-b border-gray-200 pb-8 last:border-0 last:pb-0"
            key={comment._id}
          >
            <div className="mb-4 flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-200" />

              <p className="text-sm">
                {comment.name}
                <br />
                <span className="text-gray-400">
                  {dayjs(comment._createdAt).format(
                    'DD MMM'
                  )}
                </span>
              </p>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: comment.comment,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
