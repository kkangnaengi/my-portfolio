import { Box, Card, CardContent } from '@mui/material';

/** 배경색 결정: Primary 반전 > Secondary(베이지) > 카드 기본 */
function getBgColor(isDark, isTinted) {
  if (isDark) return 'var(--color-primary)';
  if (isTinted) return 'var(--color-secondary)';
  return 'var(--color-bg-secondary)';
}

/**
 * 섹션 구분용 Card 래퍼
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional]
 * @param {string} title - 섹션 제목 [Required]
 * @param {boolean} isDark - Primary 배경 반전 스타일 여부 [Optional, 기본값: false]
 * @param {boolean} isTinted - Secondary(베이지) 배경 스타일 여부 [Optional, 기본값: false]
 * @param {node} children - 섹션 내용 [Required]
 *
 * Example usage:
 * <SectionCard title="소개">내용</SectionCard>
 */
export default function SectionCard({ id, title, isDark = false, isTinted = false, children }) {
  return (
    <Card
      id={ id }
      component="section"
      variant="outlined"
      sx={{
        width: '100%',
        bgcolor: getBgColor(isDark, isTinted),
        color: isDark ? 'var(--color-bg-primary)' : 'var(--color-text-primary)',
        borderColor: isDark ? 'var(--color-primary)' : 'var(--color-border)',
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
