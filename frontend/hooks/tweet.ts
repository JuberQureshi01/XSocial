import { graphqlClient } from "@/client/api";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutations/tweet";
import { getAllTweetQuery } from "@/graphql/query/tweet";
import { GetAllTweetsResponse } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllTweets = () => {//here this function work is replace by the server side rendering
  const query = useQuery<GetAllTweetsResponse>({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweetQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets }; 
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphqlClient.request(createTweetMutation, { payload }),
    onMutate: () =>
      toast.loading("Creating Post", { id:'1' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.success("Posted",{id:'1'})
    },
  });

  return mutation;
};
