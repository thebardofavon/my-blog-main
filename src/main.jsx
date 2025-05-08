import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Projects from './pages/Projects';
import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Post />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);