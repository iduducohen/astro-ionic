import type { ReactNode, Ref } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LangButton from './LangButton';

interface Props { title: string; back?: string; children: ReactNode; contentRef?: Ref<HTMLIonContentElement> }

/** מעטפת אחידה לכל מסך: סרגל עליון קבוע ועמודה ממורכזת */
const Page: React.FC<Props> = ({ title, back, children, contentRef }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        {back && <IonButtons slot="start"><IonBackButton defaultHref={back} text="" /></IonButtons>}
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end"><LangButton /></IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent ref={contentRef}>
      <div className="wrap">{children}</div>
    </IonContent>
  </IonPage>
);

export default Page;
