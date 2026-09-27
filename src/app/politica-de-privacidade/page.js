import Link from 'next/link';
import Logo from '@/components/ui/Logo/Logo';
import { DEVELOPER, PROFESSIONAL } from '@/config/site';
import styles from './page.module.css';

export const metadata = {
  title: 'Política de privacidade',
  description:
    'Como o site de Larissa Genari trata dados de visitação, em conformidade com a LGPD.',
  alternates: { canonical: '/politica-de-privacidade' },
};

const UPDATED_AT = '26 de setembro de 2026';

export default function PoliticaDePrivacidade() {
  return (
    <>
      <header className={styles.topbar}>
        <Link href="/" className={styles.logoLink} aria-label="Voltar para o site">
          <Logo className={styles.logo} />
        </Link>
        <Link href="/" className={styles.back}>
          Voltar ao site
        </Link>
      </header>

      <main className={styles.main}>
        <article className={styles.article}>
          <p className="eyebrow">Transparência</p>
          <h1 className={styles.title}>Política de privacidade</h1>
          <p className={styles.updated}>Última atualização: {UPDATED_AT}</p>

          <p className={styles.lead}>
            Este site existe para apresentar o trabalho da nutricionista{' '}
            {PROFESSIONAL.name} e facilitar o seu contato com ela. Ele foi feito
            para coletar o mínimo possível de informações. Aqui explicamos, de
            forma simples, o que é coletado e por quê, conforme a Lei Geral de
            Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          </p>

          <section className={styles.block}>
            <h2>1. Quem é responsável</h2>
            <p>
              O responsável pelo tratamento dos dados coletados por este site é{' '}
              {DEVELOPER.name}, desenvolvedor do site. Para qualquer assunto
              sobre privacidade, o contato é pelo site{' '}
              <a href={DEVELOPER.url} target="_blank" rel="noopener noreferrer">
                lcsqueiroz.com.br
              </a>
              .
            </p>
          </section>

          <section className={styles.block}>
            <h2>2. O que é coletado</h2>
            <p>
              O site não tem formulários, não pede cadastro e não guarda dados
              pessoais seus. Para entender como ele é usado e mantê-lo rápido,
              usamos duas ferramentas da Vercel, empresa que hospeda o site:
            </p>
            <ul>
              <li>
                <strong>Vercel Web Analytics:</strong> registra dados de visita
                de forma agregada e anônima, como páginas acessadas, site de
                origem (por exemplo, o Instagram), tipo de dispositivo, sistema
                operacional, navegador e país.
              </li>
              <li>
                <strong>Vercel Speed Insights:</strong> mede o desempenho das
                páginas (tempo de carregamento e estabilidade visual), também
                de forma anônima.
              </li>
            </ul>
            <p>
              Essas ferramentas <strong>não usam cookies</strong> e não
              permitem identificar quem você é. Os dados servem apenas para
              estatísticas gerais e melhorias no site.
            </p>
          </section>

          <section className={styles.block}>
            <h2>3. Contato pelo WhatsApp e links externos</h2>
            <p>
              Ao clicar em &ldquo;Agendar consulta&rdquo;, você é levado ao
              WhatsApp com uma mensagem pronta, que só é enviada se você
              quiser. A partir daí, a conversa segue as políticas de
              privacidade do WhatsApp (Meta). O mesmo vale para os links do
              Instagram.
            </p>
            <p>
              As informações que você compartilhar com a nutricionista durante
              o atendimento são tratadas por ela com sigilo profissional,
              conforme o Código de Ética do Nutricionista.
            </p>
          </section>

          <section className={styles.block}>
            <h2>4. Base legal e compartilhamento</h2>
            <p>
              As métricas anônimas de visitação se baseiam no legítimo
              interesse de manter o site funcionando bem (art. 7º, IX, da
              LGPD). Os dados não são vendidos nem compartilhados com
              terceiros para publicidade. A Vercel processa essas métricas em
              servidores que podem ficar fora do Brasil, com medidas de
              segurança próprias.
            </p>
          </section>

          <section className={styles.block}>
            <h2>5. Seus direitos</h2>
            <p>
              Pela LGPD, você pode pedir, a qualquer momento, informações
              sobre o tratamento dos seus dados, correção, eliminação ou
              revogação de consentimento (art. 18). Como este site não guarda
              dados que identifiquem você, na prática não há informações
              pessoais armazenadas aqui. Se tiver qualquer dúvida, entre em
              contato pelo canal indicado no item 1.
            </p>
          </section>

          <section className={styles.block}>
            <h2>6. Alterações</h2>
            <p>
              Esta política pode ser atualizada se o site mudar. A data da
              última atualização fica sempre no topo desta página.
            </p>
          </section>
        </article>
      </main>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} {PROFESSIONAL.name} · {PROFESSIONAL.title} ·{' '}
          {PROFESSIONAL.crn}. Todos os direitos reservados.
        </p>
        <p>
          Desenvolvido por{' '}
          <a href={DEVELOPER.url} target="_blank" rel="noopener noreferrer">
            {DEVELOPER.name}
          </a>
        </p>
      </footer>
    </>
  );
}
