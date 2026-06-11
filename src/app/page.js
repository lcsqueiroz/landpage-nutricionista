import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Sobre from '@/components/Sobre/Sobre';
import ComoFunciona from '@/components/ComoFunciona/ComoFunciona';
import Pacotes from '@/components/Pacotes/Pacotes';
import Depoimentos from '@/components/Depoimentos/Depoimentos';
import FAQ from '@/components/FAQ/FAQ';
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
        <ComoFunciona />
        <Pacotes />
        <Depoimentos />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <StickyWhatsApp />
      <Interactions />
    </>
  );
}
