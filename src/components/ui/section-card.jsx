import { Box, Card, CardContent } from '@mui/material';

/**
 * 섹션 구분용 Card 래퍼
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional]
 * @param {string} title - 섹션 제목 [Required]
 * @param {boolean} isDark - 검정 배경 반전 스타일 여부 [Optional, 기본값: false]
 * @param {node} children - 섹션 내용 [Required]
 *
 * Example usage:
 * <SectionCard title="소개">내용</SectionCard>
 */
export default function SectionCard({ id, title, isDark = false, children }) {
  return (
    <Card
      id={ id }
      component="section"
      variant="outlined"
      sx={{
        width: '100%',
        bgcolor: isDark ? '#000' : '#fff',
        color: isDark ? '#fff' : '#111',
        borderColor: isDark ? '#000' : '#e0e0e0',
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Box
          component="h2"
          sx={{ m: 0, mb: 2, fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.3 }}
        >
          { title }
        </Box>
        <Box sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.7 }}>
          { children }
        </Box>
      </CardContent>
    </Card>
  );
}
