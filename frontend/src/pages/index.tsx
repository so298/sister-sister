import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFound } from './components/404';
import { D3MapOverlayTest } from './components/D3MapOverlayTest';
import { Home } from './components/Home';

export const SwitchPage: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/D3MapOverlayTest" element={<D3MapOverlayTest />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
