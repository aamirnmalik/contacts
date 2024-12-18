import useContactsQuery, { contactsQueryKey } from '../../queries/ContactsQuery.js';
import { Link, useParams } from 'react-router';
import { contactQueryKey } from '../../queries/ContactQuery.js';
import { useQueryClient } from '@tanstack/react-query';

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

export default function Contacts() {

    const queryClient = useQueryClient();

    const { data: contacts, isLoading, isFetching } = useContactsQuery();
    if (isLoading || isFetching) {
        return <span>Loading...</span>
    }

    window.Echo.private(`App.Models.Contacts`)
        .listen('ContactUpdatedEvent', (e) => {
            queryClient.invalidateQueries({
                queryKey: contactsQueryKey,
            })
        });

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Contacts</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the contacts in your account including their name, email and phone.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link
                    to={`/dashboard/contacts/create`}
                >
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Contact
                    </button>
                </Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Role
                                    </th>
                                    <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {contacts.map((contact) => (
                                    <tr key={contact.email}>
                                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                            {contact.first_name} {contact.last_name}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{contact.email}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{contact.phone}</td>
                                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                                            <Link
                                                to={`/dashboard/contacts/${contact.id}`}
                                                className={`flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-3 text-indigo-600 hover:text-indigo-900`}
                                            >
                                                 Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
