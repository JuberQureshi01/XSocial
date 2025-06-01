import { graphqlClient } from "@/client/api"
import { getCurrentUserQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"
import { GetCurrentUserQuery } from "@/gql/graphql"; // ← Import this from your generated types

export const useCurrentUser = () => {
  const query = useQuery<GetCurrentUserQuery>({
    queryKey: ['current-user'],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
  });

  return {
    ...query,
    user: query.data?.getCurrentUser,
  };
};

