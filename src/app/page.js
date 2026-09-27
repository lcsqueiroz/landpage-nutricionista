import CTAFinal from '@/components/sections/CTAFinal/CTAFinal';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import Hero from '@/components/sections/Hero/Hero';
import Instagram from '@/components/sections/Instagram/Instagram';
import Interactions from '@/components/behavior/Interactions/Interactions';
import Jornada from '@/components/sections/Jornada/Jornada';
import Manifesto from '@/components/sections/Manifesto/Manifesto';
import Servicos from '@/components/sections/Servicos/Servicos';
import Sobre from '@/components/sections/Sobre/Sobre';
import StickyWhatsApp from '@/components/layout/StickyWhatsApp/StickyWhatsApp';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicos />
        <Manifesto />
        <Sobre />
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
