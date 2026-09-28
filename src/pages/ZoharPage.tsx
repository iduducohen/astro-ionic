import { useLang } from '../lang';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import ZoharAnalysis from '../components/ZoharAnalysis';

const ZoharPage: React.FC = () => {
  const { S, lang } = useLang();
  return (
    <Page title={S.tabZohar}>
      <PageIntro page="zohar" title={lang === 'he' ? 'תורת הזוהר' : 'Zohar analysis'} />
      <ZoharAnalysis />
    </Page>
  );
};

export default ZoharPage;
