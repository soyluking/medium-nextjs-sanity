import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  postId: number | string;
}

const CommentForm = ({ postId }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
        setSubmitted(false);
      });
  };

  return submitted ? (
    <div className="bg-amber-400 py-5 px-8">
      <h3 className="mb-2 text-2xl font-bold">
        Thanks for your response!
      </h3>
      <p>
        Once it has been approved, it will appear below.
      </p>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
    >
      <h3 className="text-sm">Enjoyed this article?</h3>
      <h4 className="text-2xl font-bold">
        Leave a comment bellow
      </h4>
      <hr className="my-5" />

      <input
        {...register('_id')}
        type="hidden"
        name="_id"
        value={postId}
      />

      <label className="mb-5 block">
        <span className="block text-gray-600">Name</span>
        <input
          {...register('name', { required: true })}
          className="form-input mt-1 block w-full rounded border py-2 px-3 outline-none focus:border-amber-400"
          type="text"
          placeholder="Add your name"
        />
        {errors.name && (
          <span className="text-xs text-red-500">
            This field is required
          </span>
        )}
      </label>

      <label className="mb-5 block">
        <span className="block text-gray-600">Email</span>
        <input
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter a valid email',
            },
          })}
          className="form-input mt-1 block w-full rounded border py-2 px-3 outline-none focus:border-amber-400"
          type="email"
          placeholder="Add your email"
        />
        {errors.email && (
          <span className="text-xs text-red-500">
            {errors.email?.message}
          </span>
        )}
      </label>

      <label className="mb-5 block">
        <span className="block text-gray-600">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className="form-textarea mt-1 block w-full rounded border py-2 px-3 outline-none focus:border-amber-400"
          rows={6}
          placeholder="What are your thoughts?"
        />
        {errors.comment && (
          <span className="text-xs text-red-500">
            This field is required
          </span>
        )}
      </label>

      <div className="flex justify-end space-x-4">
        <button type="reset" className="px-5 py-1.5">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full border border-amber-400 bg-amber-400 px-5 py-1.5 transition hover:bg-amber-500"
        >
          Respond
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
