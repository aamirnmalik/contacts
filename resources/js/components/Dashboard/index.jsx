import { PlusIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom';
import { UserGroupIcon } from '@heroicons/react/24/solid/index.js';

export default function Dashboard() {
    return (
        <div className="text-center">
            <UserGroupIcon
                className="h-12 w-12 mx-auto size-12 text-gray-400"
                aria-hidden="true"
            />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Contact App</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating by visitng the contacts section</p>
            <div className="mt-6">
                <NavLink
                    type="button"
                    to="/dashboard/contacts"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Go to Contacts
                </NavLink>
            </div>
        </div>
    )
}
