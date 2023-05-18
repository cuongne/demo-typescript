import React from 'react';
import type { FC } from 'react';
import { Button } from 'antd';
import AppRoutes from '@/routes';
import { BrowserRouter } from "react-router-dom"
import './scss/style.scss';

const App: FC = () => (
  <div className="container">
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </div>
);

export default App;