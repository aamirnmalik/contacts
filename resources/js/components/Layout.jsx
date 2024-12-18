'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Portal, TransitionChild } from '@headlessui/react'
import {
    Bars3Icon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Router from './Router/index.jsx';
import { Link, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Nav Items
const navigation = [
    {name: 'Contacts', href: '/dashboard/contacts', icon: UsersIcon},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation();
    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                        >
                            <TransitionChild>
                                <div
                                    className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)}
                                            className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="size-6 text-white"/>
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div
                                className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                <Link
                                    className="flex h-16 shrink-0 items-center"
                                    to="/dashboard"
                                >
                                    <img
                                        alt="Your Company"
                                        src="/storage/knot-logo.svg"
                                        className="h-8 w-auto"
                                    />
                                </Link>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            to={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                            )}
                                                        >
                                                            <item.icon aria-hidden="true" className="size-6 shrink-0"/>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                        <Link className="flex h-16 shrink-0 items-center"
                              to={`/dashboard`}
                        >
                            <img
                                alt="Your Company"
                                src="/storage/knot-logo.svg"
                                className="h-8 w-auto"
                            />
                        </Link>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className={classNames(
                                                        location.pathname.startsWith(item.href)
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                    )}
                                                >
                                                    <item.icon aria-hidden="true" className="size-6 shrink-0"/>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto flex mb-2">
                                    <div>
                                        <span
                                            className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500">
                                            <span className="text-xl font-medium leading-none text-white">
                                                {
                                                    'Aamir Malik'.match(/(^\S\S?|\b\S)?/g)
                                                        .join('')
                                                        .match(/(^\S|\S$)?/g)
                                                        .join('')
                                                        .toUpperCase()}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-white">{`Aamir Malik`}</p>
                                        <a
                                            className={`text-xs font-medium text-gray-300 group-hover:text-gray-200 cursor-pointer`}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                document.getElementById('logout-form').submit();
                                            }}
                                        >
                                            Sign Out
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div
                    className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-xs sm:px-6 lg:hidden">
                    <button type="button" onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="size-6"/>
                    </button>
                    <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
                    <a
                        className={`text-xs font-medium text-gray-300 group-hover:text-gray-200 cursor-pointer`}
                        onClick={(event) => {
                            event.preventDefault();
                            document.getElementById('logout-form').submit();
                        }}
                    >
                        <span className="sr-only">Your profile</span>
                        Sign Out
                    </a>
                </div>

                <main className="py-10 lg:pl-72">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div className="py-4">
                                <Router/>
                            </div>
                        </div>
                    </div>
                    <div onMouseDown={(e) => e.stopPropagation()}>
                        <ToastContainer
                            position="top-right"
                            autoClose={4000}
                            hideProgressBar
                            theme={`light`}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </main>
            </div>
        </>
    )
}
