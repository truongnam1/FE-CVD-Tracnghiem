import { loadProfile } from 'api/profile';
import { GET_CUSTOMER_PROFILE } from 'contants/keyQuery';
import { useQuery } from 'react-query';

export const useCustomerProfile = (isAuthenticated: boolean) => {
  const { data, isLoading } = useQuery(
    [GET_CUSTOMER_PROFILE, isAuthenticated],
    async () => {
      const response = await loadProfile();
      return response;
    },
    { enabled: !!isAuthenticated }
  );
  return { ...data, isLoading };
};
