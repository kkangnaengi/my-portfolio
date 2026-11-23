import PageContainer from '../components/ui/page-container';
import SectionCard from '../components/ui/section-card';

/** About Me 페이지 (기본 틀) */
export default function AboutMe() {
  return (
    <PageContainer>
      <SectionCard title="About Me">
        자기소개, 경력, 학력 등이 들어갈 자리입니다.
      </SectionCard>
    </PageContainer>
  );
}
