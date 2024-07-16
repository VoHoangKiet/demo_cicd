import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { PatientContextProvider } from './context/PatientContext';
import { loadWithDelay } from './utils/loadWithDelay';

const LoginForm = lazy(() => loadWithDelay(() => import('./components/LoginForm'), 1000));
const PatientManagement = lazy(() => loadWithDelay(() => import('./components/PatientManagement'), 1000));

function App() {
  return (
    <BrowserRouter>
      <PatientContextProvider>
        <div className="container">
          <Suspense fallback={<p className='alert alert-danger'>Loading</p>}>
            <Routes>
              <Route path='/' element={<LoginForm />} />
              <Route path='/patients' element={<PatientManagement />} />
            </Routes>
          </Suspense>
        </div>
      </PatientContextProvider>
    </BrowserRouter>
  );
}

export default App;
