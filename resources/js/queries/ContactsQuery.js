import ApiClient from "../services/ApiClient";
import { useQuery } from '@tanstack/react-query';

export const contactsQueryKey = ["contacts"];

const useContactsQuery = () =>
    useQuery(
        {
            queryKey: contactsQueryKey,
            queryFn: async () => {
                const data = await ApiClient.get(`/contacts`);
                return data?.data;
            },
            refetchOnWindowFocus: true,
        },
    );

export default useContactsQuery;
