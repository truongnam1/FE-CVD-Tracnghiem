import { loadProfile } from 'api/profile';
import { GET_CUSTOMER_PROFILE } from 'contants/keyQuery';
import { useQuery } from 'react-query';

export default function useCustomerProfile(isAuthenticated: boolean) {
  const { data, isLoading }: any = useQuery(GET_CUSTOMER_PROFILE, loadProfile, {
    enabled: isAuthenticated,
  });

  return { ...data, isLoading };
}
