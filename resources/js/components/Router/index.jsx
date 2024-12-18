import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Contacts from '../Contacts/index.jsx';
import FullPaneLoader from '../Loader/FullPaneLoader/index.jsx';
import EditContact from '../Contacts/EditContact/index.jsx';
import Dashboard from '../Dashboard/index.jsx';

const Router = () => {

    return (
        <Suspense fallback={<FullPaneLoader/>}>
                <Routes>
                    <Route
                        path="/dashboard"
                        element={<Dashboard/>}
                        exact
                    />
                    <Route
                        path="/dashboard/contacts"
                        element={<Contacts/>}
                        exact
                    />
                    <Route
                        path="/dashboard/contacts/:id?"
                        element={<EditContact/>}
                        exact
                    />
                </Routes>
        </Suspense>
    );
};

export default Router;
