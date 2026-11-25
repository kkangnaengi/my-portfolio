import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import GuestbookBoard from '../components/home/guestbook-board';
import PageContainer from '../components/ui/page-container';
import SectionCard from '../components/ui/section-card';

const SKILLS = ['React', 'JavaScript', 'MUI', 'Vite', 'Git / GitHub'];
const PROJECTS = ['프로젝트 A', '프로젝트 B', '프로젝트 C'];

/** Home 페이지: 5개 섹션 (Hero / About / Skills / Projects / Contact) */
export default function Home() {
  return (
    <PageContainer>
      {/* 1. Hero */}
      <SectionCard id="hero" title="안녕하세요, 포트폴리오에 오신 것을 환영합니다" isDark>
        <Box sx={{ mb: 3, opacity: 0.75 }}>
          React와 MUI로 사용자 경험을 만드는 개발자입니다.
        </Box>
        <Button
          component={ RouterLink }
          to="/projects"
          variant="contained"
          sx={{
            bgcolor: 'var(--color-accent)',
            color: '#FFFFFF',
            '&:hover': { bgcolor: 'var(--color-accent)', filter: 'brightness(0.9)' },
          }}
        >
          프로젝트 보기
        </Button>
      </SectionCard>

      {/* 2. About */}
      <SectionCard id="about" title="About" isTinted>
        간단한 자기소개가 들어갈 자리입니다. 자세한 내용은 About Me 페이지에서 확인할 수 있습니다.
      </SectionCard>

      {/* 3. Skills */}
      <SectionCard id="skills" title="Skills">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          { SKILLS.map((skill) => (
            <Chip key={ skill } label={ skill } variant="outlined" sx={{ borderColor: 'var(--color-primary)', color: 'inherit' }} />
          )) }
        </Box>
      </SectionCard>

      {/* 4. Projects */}
      <SectionCard id="projects" title="Projects">
        <Grid container spacing={ 2 }>
          { PROJECTS.map((name) => (
            <Grid key={ name } size={{ xs: 12, md: 4 }}>
              <Box sx={{
                  p: 2,
                  border: '1px solid var(--color-border)',
                  bgcolor: 'var(--color-bg-primary)',
                  borderRadius: 2,
                  textAlign: 'center',
                }}>
                { name }
              </Box>
            </Grid>
          )) }
        </Grid>
      </SectionCard>

      {/* 5. Contact */}
      <SectionCard id="contact" title="Contact" isDark>
        <Box>Email: your-email@example.com</Box>
        <Box>GitHub: github.com/your-id</Box>
        <GuestbookBoard />
      </SectionCard>
    </PageContainer>
  );
}
