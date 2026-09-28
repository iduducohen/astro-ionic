import { useLang } from '../lang';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import PsychologyAssessment from '../components/PsychologyAssessment';

const PsychologyPage: React.FC = () => {
  const { S, lang } = useLang();
  return (
    <Page title={S.tabPsychology}>
      <PageIntro page="psychology" title={lang === 'he' ? 'מבחנים פסיכולוגיים' : 'Psychological assessments'} />
      <PsychologyAssessment />
    </Page>
  );
};

export default PsychologyPage;
