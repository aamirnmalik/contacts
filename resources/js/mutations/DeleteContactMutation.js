import ApiClient from '../services/ApiClient.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { contactQueryKey } from '../queries/ContactQuery.js';

const useDeleteContactMutation = (contactId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({contact_id}) => {
            return await ApiClient.delete(
                `/contacts/${contactId}`
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: contactQueryKey(contactId),
            }).then(r => console.log(r));
        }
    });
}

export default useDeleteContactMutation;