export type GetAllTweetsResponse = { //made because ts know whats the type of data 
    getAllTweets: Array<{
      id: string;
      content: string;
      imageUrl?: string;
      author: {
        id: string;
        firstName: string;
        lastName?: string;
      };
    }>;
  };
  