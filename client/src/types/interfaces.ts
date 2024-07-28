// src/interfaces.ts
export interface DataType {
    id: number;
    name: string;
  }
  
  // If your error has more properties, you can define a more comprehensive interface.
  export interface ErrorType {
    message: string;
  }


  export type PostsType = {
    data: PostType[];
  };
  

  export interface PostType {
    _id: string;
    slug: string;
    title: string;
    coverImage: string;
    body: string;
    author: IAuthor
    createdAt: string;
    updatedAt: string;
}


export interface IAuthor {
  avatar: string
  coverImage: string
  createdAt: string
  email: string 
  fullName: string
  refreshToken: string
  updatedAt: string
  username: string
  watchHistory: []
  __v: number
  _id: string
}

export interface ILoginResponse {
  statusCode: number;
  message: string;
  data: {
      user: {
          _id: string;
          username: string;
          email: string;
          fullName: string;
          avatar: string;
          coverImage: null | string;
          watchHistory: [];
          createdAt: string;
          updatedAt: string;
          __v: 0
      },
      accessToken: string,
      refreshToken: string
  }
}

export interface IPostResponse {
  statusCode: number;
  message: string;
  data: PostType
}




  