import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/legal/legal-page"

export const metadata: Metadata = {
    title: "Política de Privacidade",
    robots: { index: true, follow: true },
    alternates: { canonical: "/politica-de-privacidade" },
}

export default function Page() {
    return (
        <LegalPage titulo="Política de Privacidade — Wize Inovações e Tecnologia LTDA">
            <p>
                Bem-vindo à Wize Inovações e Tecnologia LTDA
                (&quot;WizeCode&quot;), inscrita no CNPJ 65.184.059/0001-22, com
                sede na Av. Quinze, N° 950, Apto 302, Bairro Centro,
                Ituiutaba-MG, CEP 38.300-134. Esta Política de Privacidade
                aplica-se a todas as interações realizadas em nosso site
                www.wizecode.com.br e nos serviços digitais nele
                disponibilizados: navegação geral, formulário de contato e
                assistente virtual de briefing (&quot;Wizard&quot;).
            </p>
            <p>
                Ao acessar e utilizar nosso site, você reconhece e concorda com
                as práticas descritas nesta política.
            </p>

            <h2>1. Definições</h2>
            <ul>
                <li>
                    <strong>Dados Pessoais:</strong> informações que identificam
                    ou podem identificar uma pessoa natural.
                </li>
                <li>
                    <strong>Tratamento de Dados Pessoais:</strong> qualquer
                    operação com Dados Pessoais, como coleta, registro,
                    armazenamento, uso, compartilhamento ou eliminação.
                </li>
                <li>
                    <strong>Operador/Suboperador:</strong> terceiro que trata
                    dados pessoais em nome da WizeCode.
                </li>
                <li>
                    <strong>LGPD:</strong> Lei Geral de Proteção de Dados
                    Pessoais (Lei nº 13.709/2018).
                </li>
            </ul>

            <h2>2. Como coletamos seus dados e por quê</h2>
            <p>
                Diferente de um modelo genérico, detalhamos abaixo cada fluxo
                real de dados do nosso site.
            </p>

            <h3>2.1 Navegação no site (análise de uso)</h3>
            <p>
                Utilizamos a ferramenta <strong>PostHog</strong> para entender
                como o site é usado: páginas visitadas, cliques e interações de
                navegação. Essa análise é feita com um identificador de sessão
                temporário, armazenado apenas na memória do seu navegador (não
                persiste entre sessões nem é salvo como cookie de longo prazo),
                e <strong>sem coleta do seu endereço IP</strong>. Também
                utilizamos gravação de sessão com mascaramento automático de
                todos os campos preenchidos (como formulários), de modo que o
                conteúdo digitado não é capturado.
            </p>
            <ul>
                <li>
                    <strong>Finalidade:</strong> entender o uso do site,
                    identificar problemas de navegação e melhorar a experiência.
                </li>
                <li>
                    <strong>Base legal:</strong> legítimo interesse da WizeCode
                    em manter e aprimorar seu site (art. 7º, IX, LGPD). Você
                    pode se opor a esse tratamento a qualquer momento — ver
                    seção 7.
                </li>
                <li>
                    <strong>Retenção:</strong> conforme a configuração de
                    retenção de dados do próprio PostHog, ajustável no painel da
                    ferramenta.
                </li>
            </ul>

            <h3>2.2 Proteção contra bots e abuso (Cloudflare Turnstile)</h3>
            <p>
                Utilizamos o serviço Cloudflare Turnstile para distinguir
                acessos humanos de automatizados (bots) em nosso formulário de
                contato e assistente virtual, processando sinais técnicos do seu
                navegador e dispositivo.
            </p>
            <ul>
                <li>
                    <strong>Finalidade:</strong> prevenir spam, fraude e uso
                    abusivo dos nossos formulários.
                </li>
                <li>
                    <strong>Base legal:</strong> legítimo interesse e
                    cumprimento de medidas de segurança da informação (art. 7º,
                    IX, LGPD).
                </li>
            </ul>

            <h3>2.3 Formulário de contato</h3>
            <p>
                Ao preencher o formulário de contato, coletamos: nome, empresa
                (opcional), e-mail, telefone/WhatsApp, tipo de serviço de
                interesse e descrição da sua demanda.
            </p>
            <ul>
                <li>
                    <strong>Finalidade:</strong> responder à sua solicitação e
                    conectar você com nossa equipe comercial.
                </li>
                <li>
                    <strong>Base legal:</strong> execução de procedimentos
                    preliminares relacionados a um possível contrato, a seu
                    pedido (art. 7º, V, LGPD).
                </li>
                <li>
                    <strong>Compartilhamento:</strong> os dados são enviados
                    para nossa própria infraestrutura de automação interna
                    (n8n), que os direciona à nossa equipe comercial.
                </li>
                <li>
                    <strong>Retenção:</strong> até 24 meses após o último
                    contato, caso não se converta em um projeto contratado.
                    Dados de contatos que avançam para um contrato seguem prazos
                    próprios, vinculados às obrigações fiscais e contratuais
                    aplicáveis.
                </li>
            </ul>

            <h3>2.4 Assistente virtual de briefing (&quot;Wizard&quot;)</h3>
            <p>
                Ao conversar com o Wizard, coletamos o conteúdo da conversa (o
                briefing do seu projeto) e, caso você opte por solicitar uma
                proposta ao final, seu nome, e-mail e WhatsApp.
            </p>
            <ul>
                <li>
                    <strong>Finalidade:</strong> estruturar as informações do
                    seu projeto em um briefing para que nossa equipe comercial
                    possa preparar uma proposta.
                </li>
                <li>
                    <strong>Base legal:</strong> execução de procedimentos
                    preliminares relacionados a um possível contrato, mediante
                    sua iniciativa ao usar o assistente e, para os dados de
                    contato, seu consentimento explícito ao preenchê-los e
                    enviá-los (art. 7º, V e I, LGPD).
                </li>
                <li>
                    <strong>Processamento por terceiros e IA:</strong> para
                    gerar as respostas do Wizard, o conteúdo da conversa é
                    processado por serviços de inteligência artificial de
                    terceiros, contratados por meio da plataforma OpenRouter.
                    Esse processamento pode envolver o{" "}
                    <strong>envio de dados para fora do Brasil</strong> — ver
                    seção 6, &quot;Transferência Internacional de Dados&quot;.
                </li>
                <li>
                    <strong>Compartilhamento:</strong> o briefing final e seus
                    dados de contato são enviados para nossa infraestrutura
                    interna de automação (n8n), que os direciona à nossa equipe
                    comercial.
                </li>
                <li>
                    <strong>Retenção:</strong> até 24 meses após o último
                    contato, caso não se converta em um projeto contratado.
                    Registros de execução mantidos internamente no n8n são
                    eliminados automaticamente ao final desse prazo; registros
                    que avancem para nosso sistema comercial e não se convertam
                    em contrato são removidos mediante solicitação ou revisão
                    periódica da nossa equipe.
                </li>
            </ul>

            <h3>2.5 Hospedagem e desempenho técnico</h3>
            <p>
                Nosso site é hospedado na Vercel, que coleta métricas técnicas
                agregadas de desempenho (como tempo de carregamento das
                páginas).
            </p>
            <ul>
                <li>
                    <strong>Finalidade:</strong> monitorar e melhorar o
                    desempenho técnico do site.
                </li>
                <li>
                    <strong>Base legal:</strong> legítimo interesse (art. 7º,
                    IX, LGPD).
                </li>
            </ul>

            <h2>3. Cookies</h2>
            <p>
                Hoje, nosso site não utiliza cookies não essenciais. A
                ferramenta de análise de navegação (PostHog) está configurada
                para não gravar identificadores no seu dispositivo — os dados de
                uso ficam associados apenas a uma sessão temporária, mantida
                somente na memória do navegador. O único cookie técnico em uso é
                o do Cloudflare Turnstile, estritamente necessário para a
                proteção contra bots do formulário de contato e do assistente
                virtual.
            </p>
            <p>
                Ainda assim, como a análise de navegação é feita com base em
                legítimo interesse (seção 2.1), você pode se opor a esse
                tratamento a qualquer momento pelo canal indicado na seção 7
                (&quot;Direitos dos Titulares dos Dados&quot;).
            </p>

            <h2>4. Compartilhamento de Dados Pessoais</h2>
            <p>Compartilhamos dados pessoais apenas com:</p>
            <ul>
                <li>
                    <strong>
                        Fornecedores que nos auxiliam na operação do site
                    </strong>
                    , atuando em nosso nome e sob nossas instruções: PostHog
                    (análise de navegação), Cloudflare (proteção contra bots),
                    Vercel (hospedagem) e provedores de inteligência artificial
                    contratados via OpenRouter (processamento das conversas do
                    assistente virtual);
                </li>
                <li>
                    <strong>
                        Nossa própria infraestrutura de automação (n8n)
                    </strong>
                    , que direciona os dados coletados à nossa equipe comercial;
                </li>
                <li>
                    Quando exigido por lei, ordem judicial ou para proteger
                    nossos direitos e a segurança de nossos usuários;
                </li>
                <li>
                    Em caso de reestruturação societária, fusão ou venda, desde
                    que a entidade receptora se comprometa a respeitar uma
                    política equivalente a esta.
                </li>
            </ul>
            <p>Não vendemos seus dados pessoais a terceiros.</p>

            <h2>5. Links para Outros Sites</h2>
            <p>
                Nosso site pode incluir links para sites externos. Ao clicar
                neles, você sairá do nosso domínio e passará a seguir as
                políticas de privacidade desses terceiros, pelas quais não somos
                responsáveis. Recomendamos a leitura atenta dessas políticas.
            </p>

            <h2>6. Transferência Internacional de Dados</h2>
            <p>
                Como descrito na seção 2.4, o assistente virtual Wizard utiliza
                serviços de inteligência artificial de terceiros para funcionar,
                contratados por meio da plataforma OpenRouter. Isso pode
                envolver o processamento do conteúdo da sua conversa por
                infraestrutura localizada fora do Brasil, incluindo países que
                ainda não possuem decisão de adequação da Autoridade Nacional de
                Proteção de Dados (ANPD).
            </p>
            <p>
                Essa transferência é amparada pelo art. 33, IX, da LGPD, que
                permite a transferência internacional de dados quando necessária
                para atender à hipótese do art. 7º, V, da mesma lei — execução
                de procedimentos preliminares relacionados a um possível
                contrato, realizados por sua própria iniciativa ao usar o
                assistente virtual para solicitar uma proposta. Por se tratar
                dessa hipótese, e não da hipótese de consentimento (art. 33,
                VIII), essa transferência não depende de um consentimento
                específico e destacado — a transparência sobre a operação,
                fornecida nesta seção, é suficiente. Ao optar por usar o Wizard,
                você está ciente de que essa transferência ocorre.
            </p>

            <h2>7. Direitos dos Titulares dos Dados</h2>
            <p>Você tem direito a:</p>
            <ul>
                <li>
                    Confirmação da existência de tratamento e acesso aos seus
                    dados;
                </li>
                <li>
                    Correção de dados incompletos, inexatos ou desatualizados;
                </li>
                <li>
                    Eliminação dos dados tratados com base no seu consentimento;
                </li>
                <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
                <li>Informação sobre com quem compartilhamos seus dados;</li>
                <li>
                    Revogação do consentimento, quando essa for a base legal do
                    tratamento.
                </li>
            </ul>
            <p>
                Para exercer esses direitos, entre em contato pelo e-mail
                contato@wizecode.com.br. Responderemos sua solicitação em até{" "}
                <strong>15 dias</strong>, conforme a natureza do pedido.
            </p>

            <h2>8. Segurança dos Dados</h2>
            <p>
                Implementamos medidas técnicas e organizacionais para proteger
                seus dados pessoais contra acesso não autorizado, alteração,
                divulgação ou destruição. Nenhum sistema é completamente seguro;
                nos comprometemos a notificar você e a ANPD sobre incidentes de
                segurança relevantes, conforme exigido pela legislação.
            </p>

            <h2>9. Canal de Comunicação sobre Proteção de Dados</h2>
            <p>
                A WizeCode se enquadra como agente de tratamento de pequeno
                porte, nos termos da Resolução CD/ANPD nº 2/2022, e por isso
                está dispensada da obrigação de indicar um Encarregado de
                Proteção de Dados (DPO) prevista no art. 41 da LGPD, conforme
                faculta o art. 11 dessa mesma resolução.
            </p>
            <p>
                Nesses casos, a legislação exige que disponibilizemos um canal
                de comunicação direto para que você possa exercer seus direitos
                como titular de dados pessoais e esclarecer dúvidas sobre este
                tratamento: <strong>contato@wizecode.com.br</strong>.
            </p>

            <h2>10. Retenção de Dados</h2>
            <p>
                Dados coletados pelo formulário de contato e pelo assistente
                virtual Wizard que não resultem em um projeto contratado são
                mantidos por até <strong>24 meses</strong> após o último
                contato, e então eliminados. Os registros de execução mantidos
                em nossa infraestrutura interna de automação (n8n) são
                eliminados automaticamente ao fim desse prazo; os registros
                mantidos em nosso sistema comercial são removidos mediante
                solicitação do titular ou revisão periódica da nossa equipe.
                Dados de clientes com contrato ativo seguem prazos próprios,
                vinculados a obrigações fiscais, contratuais e civis aplicáveis.
            </p>

            <h2>11. Alterações nesta Política</h2>
            <p>
                Esta Política de Privacidade pode ser atualizada periodicamente.
                A versão mais atual será sempre publicada em nosso site, com a
                data da última revisão. Encorajamos você a revisá-la
                regularmente.
            </p>

            <h2>12. Contato</h2>
            <p>
                Dúvidas ou solicitações relacionadas a esta política podem ser
                enviadas para contato@wizecode.com.br.
            </p>
        </LegalPage>
    )
}
