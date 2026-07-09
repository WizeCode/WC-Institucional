import type { UIMessage } from "ai"

export const NOME_ASSISTENTE = "Wizard"

export const TEXTO_ABERTURA = `Olá! Prazer em conhecer você. Eu sou o ${NOME_ASSISTENTE}, assistente da WizeCode. O objetivo da nossa conversa é entender melhor o projeto que você tem em mente, para que a nossa equipe possa preparar uma proposta personalizada para ele.

Para começar, poderia me dizer qual é o nome da sua empresa ou negócio?`

// Vai no payload de /api/chat junto com o histórico: o modelo precisa enxergar
// que já se apresentou e já perguntou o nome da empresa, senão repete a abertura.
export const MENSAGEM_INICIAL: UIMessage = {
    id: "abertura",
    role: "assistant",
    parts: [{ type: "text", text: TEXTO_ABERTURA }],
}

export const MENSAGENS_INICIAIS = [MENSAGEM_INICIAL]
