import ApiClient from '../services/ApiClient.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { contactQueryKey } from "../queries/ContactQuery.js";

const useContactMutation = (contactId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            if (contactId) {
                let { data } = await ApiClient.put(
                    `/contacts/${contactId}`,
                    formData
                );
                return data;
            } else {
                let { data } = await ApiClient.post(`/contacts`, formData);
                return data;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: contactQueryKey(contactId),
            }).then(r => console.log(r));
        }
    });
}

export default useContactMutation;