export interface Post {
  _id?: string;
  _createdAt?: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  comments: Comment[];
  body?: [object];
  author: {
    name: string;
    image: string;
  };
}

export interface Comment {
  approved: boolean;
  comment: string;
  name: string;
  email: string;
  post: {
    _ref: string;
    _type: string;
  };
  _id: string;
  _createdAt: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
