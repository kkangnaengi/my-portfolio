import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

const MENUS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

/**
 * 상단 네비게이션 헤더 (React Router NavLink 사용)
 *
 * Example usage:
 * <SiteHeader />
 */
export default function SiteHeader() {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={ 0 }
      sx={{ bgcolor: '#000', color: '#fff', borderBottom: '1px solid #333' }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.2rem' }, letterSpacing: 1 }}>
            MY PORTFOLIO
          </Box>
          <Box sx={{ display: 'flex', gap: { xs: 0, md: 1 } }}>
            { MENUS.map(({ label, to }) => (
              <Button
                key={ to }
                component={ NavLink }
                to={ to }
                end
                color="inherit"
                sx={{
                  fontSize: { xs: '0.8rem', md: '0.95rem' },
                  minWidth: 0,
                  px: { xs: 1, md: 2 },
                  borderBottom: '2px solid transparent',
                  borderRadius: 0,
                  '&.active': { borderBottomColor: '#fff', fontWeight: 700 },
                }}
              >
                { label }
              </Button>
            )) }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
