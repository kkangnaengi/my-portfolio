import { Box } from '@mui/material';

/**
 * 하단 푸터
 *
 * Example usage:
 * <SiteFooter />
 */
export default function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{ py: 3, textAlign: 'center', fontSize: '0.875rem', color: '#bdbdbd', bgcolor: '#000' }}
    >
      © 2026 My Portfolio. All rights reserved.
    </Box>
  );
}
