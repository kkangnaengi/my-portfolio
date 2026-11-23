import { Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import SiteHeader from './components/common/site-header';
import SiteFooter from './components/common/site-footer';
import Home from './pages/home';
import AboutMe from './pages/about-me';
import Projects from './pages/projects';

/** 라우팅 및 공통 레이아웃(헤더/푸터) */
export default function App() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <AboutMe /> } />
          <Route path="/projects" element={ <Projects /> } />
          <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
      </Box>
      <SiteFooter />
    </Box>
  );
}
