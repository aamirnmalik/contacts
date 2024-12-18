import { Field, Form, Formik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import ErrorFlashMessage from '../../FlashMessages/ErrorFlashMessage.jsx';
import SuccessFlashMessage from '../../FlashMessages/SuccessFlashMessage.jsx';
import useContactMutation from '../../../mutations/ContactMutation.js';
import useContactQuery, { contactQueryKey } from '../../../queries/ContactQuery.js';
import moment from 'moment/moment.js';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteContactMutation from '../../../mutations/DeleteContactMutation.js';

export default function EditContact() {
    const {id: slug} = useParams();
    const contactId = (!slug.match('^create') && slug) || false;

    const queryClient = useQueryClient()
    const navigate= useNavigate();

    const {mutateAsync, isPending: isSubmitting} = useContactMutation(contactId);
    const {mutateAsync: deleteMutation, isPending: isDeleting} = useDeleteContactMutation(contactId);
    const {data: contact, isLoading, isFetching, isPending} = useContactQuery(contactId);

    if (isFetching || isLoading) {
        return <span>Loading...</span>
    }

    if (contactId) {
        window.Echo.private(`App.Models.Contact.${contactId}`)
            .listen('ContactUpdatedEvent', (e) => {
                queryClient.invalidateQueries({
                    queryKey: contactQueryKey(contactId),
                })
            });
    }

    const save = async (values) => {
        try {
            let data = await mutateAsync(values);
            toast(<SuccessFlashMessage
                message={`Successfully Saved!`}
                description={`Your contact was successfully saved.`}
            />);

            if (!contact && data.id) {
                navigate(`/dashboard/contacts/${data.id}`);
            }
        } catch (e) {
            console.log('exception', e);
            toast(<ErrorFlashMessage error={e}/>);
        }
    };

    const deleteContact = async () => {
        try {
            await deleteMutation({contact_id: contactId});
            toast(<SuccessFlashMessage
                message={`Successfully Deleted!`}
                description={`Your contact was successfully deleted.`}
            />);
            navigate(`/dashboard/contacts`);
        } catch (e) {
            toast(<ErrorFlashMessage error={e}/>);
        }
    }

    return (<>
            <Formik
                initialValues={{
                    first_name: contact?.first_name ?? '',
                    last_name: contact?.last_name ?? '',
                    email: contact?.email ?? '',
                    phone: contact?.phone ?? '',
                }}
                onSubmit={save}
            >
                <Form>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className={`flex justify-between`}>
                                <div>
                                    <h2 className="text-base/7 font-semibold text-gray-900">Contact</h2>
                                    <p className="mt-1 text-sm/6 text-gray-600">
                                        You can {contactId ? 'Edit' : 'Save'} the contact details here.
                                    </p>
                                </div>
                                {
                                    contact && <div>
                                        <button
                                            type="button"
                                            disabled={isDeleting}
                                            className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${isDeleting && 'opacity-50 cursor-not-allowed'}`}
                                            onClick={deleteContact}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                }
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {/*First name*/}
                                <div className="sm:col-span-3">
                                    <label htmlFor="first_name" className="block text-sm/6 font-medium text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                    <Field
                                            name="first_name"
                                            type="text"
                                            id="first_name"
                                            placeholder="First Name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/*Last Name*/}
                                <div className="sm:col-span-3">
                                    <label htmlFor="last_name" className="block text-sm/6 font-medium text-gray-900">
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            name="last_name"
                                            type="text"
                                            id="last_name"
                                            placeholder="Last Name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/*Email name*/}
                                <div className="sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            name="email"
                                            type="email"
                                            id="email"
                                            placeholder="Email"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/*Phone*/}
                                <div className="sm:col-span-3">
                                    <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            name="phone"
                                            type="tel"
                                            id="phone"
                                            placeholder="1234567890"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <nav aria-label="Back">
                            <Link
                                to={`/dashboard/contacts`}
                                className={`flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-3`}
                            >
                                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                    Cancel
                                </button>
                            </Link>
                        </nav>

                        <button
                            type="submit"
                            className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                            disabled={isSubmitting}
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Formik>
            {contact && <div>
                <h2 className="my-2 text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Update History
                </h2>
                <ul role="list" className="divide-y divide-gray-100">
                    {contact.history.map((history) => (<li key={history.id} className="flex gap-x-4 py-5">
                            <div className="flex-auto">
                                <div className="flex items-baseline justify-between gap-x-4">
                                    <p className="text-sm/6 font-semibold text-gray-900">Updated</p>
                                    <p className="flex-none text-xs text-gray-600">
                                        <time dateTime={history.created_at}>
                                            {
                                                moment.duration(moment.utc(history.created_at)
                                                    .diff(moment.utc()))
                                                    .humanize(true)
                                            }
                                        </time>
                                    </p>
                                </div>
                                {
                                    history?.properties?.old &&
                                    <p className="mt-1 line-clamp-2 text-sm/6 text-gray-600">Previous
                                        Value: {JSON.stringify(history.properties.old, null, 2)}
                                    </p>
                                }
                                <p className="mt-1 line-clamp-2 text-sm/6 text-gray-600">New Value: {JSON.stringify(history.properties.attributes, null, 2)}</p>
                            </div>
                        </li>))}
                </ul>
            </div>}
        </>)
}
