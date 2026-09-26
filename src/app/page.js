import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Sobre from '@/components/Sobre/Sobre';
import Servicos from '@/components/Servicos/Servicos';
import Jornada from '@/components/Jornada/Jornada';
import Instagram from '@/components/Instagram/Instagram';
import CTAFinal from '@/components/CTAFinal/CTAFinal';
import Footer from '@/components/Footer/Footer';
import StickyWhatsApp from '@/components/StickyWhatsApp/StickyWhatsApp';
import Interactions from '@/components/Interactions/Interactions';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Jornada />
        <Instagram />
        <CTAFinal />
      </main>
      <Footer />
      <StickyWhatsApp />
      <Interactions />
    </>
  );
}
