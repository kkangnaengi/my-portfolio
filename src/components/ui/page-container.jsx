import { Box, Container } from '@mui/material';

/**
 * 반응형 중앙정렬 페이지 컨테이너
 *
 * Props:
 * @param {node} children - 페이지 내용 [Required]
 *
 * Example usage:
 * <PageContainer>...</PageContainer>
 */
export default function PageContainer({ children }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{ py: 4, px: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        { children }
      </Container>
    </Box>
  );
}
