import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import Step1_Language from './components/wizard/Step1_Language';
import Step1_5_PersonalInfo from './components/wizard/Step1_5_PersonalInfo';
import Step2_Identity from './components/wizard/Step2_Identity';
import Step3_Location from './components/wizard/Step3_Location';
import Step4_Mode from './components/wizard/Step4_Mode';
import Dashboard from './components/layout/Dashboard';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/step1" replace />} />
            <Route path="step1" element={<Step1_Language />} />
            <Route path="step1.5" element={<Step1_5_PersonalInfo />} />
            <Route path="step2" element={<Step2_Identity />} />
            <Route path="step3" element={<Step3_Location />} />
            <Route path="step4" element={<Step4_Mode />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
