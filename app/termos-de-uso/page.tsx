import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/templates/legal-page"

export const metadata: Metadata = {
    title: "Termos de Uso",
    robots: { index: true, follow: true },
    alternates: { canonical: "/termos-de-uso" },
}

export default function Page() {
    return (
        <LegalPage titulo="Termos de Uso — Wize Inovações e Tecnologia LTDA">
            <p>
                Seja bem-vindo ao website da Wize Inovações e Tecnologia LTDA
                (&quot;WizeCode&quot;, &quot;nós&quot;). Antes de explorar tudo
                o que temos a oferecer, é importante que você entenda e concorde
                com as regras que regem o uso do nosso website
                www.wizecode.com.br e dos serviços digitais disponibilizados
                nele, incluindo nosso formulário de contato e nosso assistente
                virtual de briefing.
            </p>
            <p>
                Ao usar nosso website, você concorda em seguir as regras
                estabelecidas aqui. Caso não concorde com algo, por favor,
                considere não usar nossos serviços.
            </p>

            <h2>1. Aceitando os Termos</h2>
            <p>
                Ao navegar e usar o website da WizeCode, você concorda
                automaticamente com estas regras e condições. Estes termos podem
                mudar de tempos em tempos; se fizermos alterações
                significativas, publicaremos as atualizações aqui. Continuar
                usando o website após essas mudanças significa que você aceita
                os novos termos.
            </p>

            <h2>2. Como Usar o Nosso Website</h2>
            <p>
                Nosso website é aberto para navegação sem necessidade de
                cadastro ou criação de conta. Algumas funcionalidades — como o
                formulário de contato e o assistente virtual de briefing — pedem
                que você forneça voluntariamente algumas informações (por
                exemplo, nome, e-mail e telefone) para que possamos responder à
                sua solicitação. Pedimos que essas informações sejam verdadeiras
                e que qualquer conteúdo que você compartilhar conosco seja
                enviado de forma respeitosa e dentro da lei.
            </p>

            <h2>3. Assistente Virtual de Briefing (&quot;Wizard&quot;)</h2>
            <p>
                Disponibilizamos em nosso website um assistente virtual, chamado
                Wizard, cujo objetivo é conduzir uma conversa para entender o
                projeto que você tem em mente e organizar essas informações em
                um briefing para nossa equipe comercial. Ao usar o Wizard, você
                concorda com o seguinte:
            </p>
            <ul>
                <li>
                    <strong>Natureza automatizada:</strong> o Wizard é um
                    sistema automatizado de inteligência artificial. As
                    respostas geradas não constituem proposta comercial,
                    orçamento, prazo, consultoria técnica ou compromisso
                    contratual da WizeCode — qualquer proposta formal só é feita
                    por nossa equipe humana, após o envio do briefing.
                </li>
                <li>
                    <strong>Uso pretendido:</strong> o Wizard deve ser usado
                    exclusivamente para descrever projetos e demandas
                    relacionadas aos serviços da WizeCode. Conversas fora desse
                    escopo podem ser encerradas automaticamente.
                </li>
                <li>
                    <strong>Encerramento automático:</strong> reservamo-nos o
                    direito de encerrar a conversa automaticamente caso
                    identifiquemos uso indevido, tentativa de manipular o
                    assistente, ou relatos de atividades ilegais. Caso a
                    conversa mencione risco de automutilação ou suicídio, o
                    assistente é programado para indicar recursos de apoio (como
                    o CVV — Centro de Valorização da Vida) e encerrar o
                    atendimento automatizado.
                </li>
                <li>
                    <strong>Processamento por terceiros:</strong> para
                    funcionar, o Wizard processa o conteúdo da conversa por meio
                    de serviços de inteligência artificial de terceiros, o que
                    pode envolver o envio de dados para fora do Brasil. Os
                    detalhes sobre esse processamento e as garantias aplicáveis
                    estão descritos na nossa{" "}
                    <Link href="/politica-de-privacidade">
                        Política de Privacidade
                    </Link>
                    .
                </li>
                <li>
                    <strong>Envio dos dados:</strong> ao final da conversa, caso
                    você opte por receber uma proposta, solicitaremos seu nome,
                    e-mail e WhatsApp para que nossa equipe possa entrar em
                    contato. O envio desses dados é uma ação sua, explícita e
                    opcional.
                </li>
            </ul>

            <h2>4. Direitos de Conteúdo</h2>
            <p>
                O conteúdo disponível no website da WizeCode, incluindo, mas não
                se limitando a, textos, imagens, ilustrações, ícones, design e
                código-fonte, constitui propriedade intelectual protegida pela
                legislação nacional e por tratados internacionais sobre direitos
                autorais e propriedade industrial. Isso engloba tanto materiais
                produzidos diretamente por nós quanto conteúdos usados sob
                licença de terceiros.
            </p>
            <p>
                Ao acessar nosso website, você recebe uma licença limitada, não
                exclusiva e revogável para visualizar e usar o conteúdo para
                fins pessoais e não comerciais. Qualquer reprodução,
                distribuição, transmissão ou modificação do conteúdo, sem
                autorização escrita da WizeCode, é estritamente proibida.
            </p>

            <h2>5. Cookies e Tecnologias de Rastreamento</h2>
            <p>
                Utilizamos ferramentas de análise de uso do website e de
                proteção contra abusos automatizados (bots). Os detalhes sobre
                quais dados são coletados, com quais finalidades e por meio de
                quais fornecedores estão descritos na nossa{" "}
                <Link href="/politica-de-privacidade">
                    Política de Privacidade
                </Link>
                , que faz parte integrante destes Termos de Uso.
            </p>

            <h2>6. Explorando Links Externos</h2>
            <p>
                Nosso website pode incluir links para websites externos que
                podem ser do seu interesse. Não temos controle sobre esses
                websites e não somos responsáveis pelo seu conteúdo ou
                políticas.
            </p>

            <h2>7. Mudanças e Atualizações</h2>
            <p>
                Estes Termos de Uso podem passar por atualizações para refletir
                mudanças em nossos serviços ou na legislação. A versão mais
                recente estará sempre disponível aqui. Se as mudanças forem
                significativas, faremos o possível para notificá-lo pelos meios
                de contato que você nos forneceu.
            </p>
            <p>
                Continuar a acessar o website após essas mudanças indica que
                você concorda com os novos termos.
            </p>

            <h2>Dúvidas ou Comentários?</h2>
            <p>
                Se tiver dúvidas sobre estes termos, entre em contato pelo
                e-mail contato@wizecode.com.br.
            </p>
        </LegalPage>
    )
}
