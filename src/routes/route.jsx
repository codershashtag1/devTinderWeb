import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Body from '../components/Body'; // Import the Body component

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteComponent 