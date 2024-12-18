import ApiClient from "../services/ApiClient";
import { useQuery } from '@tanstack/react-query';

export const contactQueryKey = (contactId) => ['contact', contactId];

const useContactQuery = (contactId) => {
    return useQuery(
        {
            queryKey: contactQueryKey(contactId),
            queryFn: async () => {
                const data = await ApiClient.get(`/contacts/${contactId}`);
                return data?.data;
            },
            refetchOnWindowFocus: true,
            enabled: !!contactId,
        },
    );
}

export default useContactQuery;
