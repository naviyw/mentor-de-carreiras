// Seleção de elementos do DOM
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const areaSelect = document.getElementById('area-select');
const levelSelect = document.getElementById('level-select');

// Base de conhecimento simulada para as respostas do Mentor
const mentorResponses = {
    tech: {
        junior: "Para iniciar em Tecnologia, foque em construir uma base sólida (Lógica de programação e Git) e crie projetos reais para o GitHub. Não tente aprender tudo de uma vez. Qual tecnologia específica você está estudando agora?",
        pleno: "Como Pleno, seu próximo passo é dominar Arquitetura de Software, testes automatizados e soft skills (comunicação e liderança técnica). Você já lidera alguma iniciativa ou refatoração no seu escopo atual?",
        senior: "Para consolidar sua senioridade ou ir para Specialist/Staff, foque em visão de negócio, mentoria de juniores e impacto sistêmico na empresa. Como você avalia sua influência nas decisões de produto hoje?"
    },
    design: {
        junior: "Monte um portfólio focado na resolução de problemas, e não apenas em telas bonitas. Pratique o storytelling dos seus cases (Behance ou Notion). Qual ferramenta (Figma, Adobe) você domina melhor hoje?",
        pleno: "É hora de aprofundar em Design System, testes de usabilidade estruturados e métricas de produto (conversão, retenção). Como você costuma validar suas decisões de design com dados?",
        senior: "Designers seniores alinham a experiência do usuário diretamente aos objetivos financeiros da empresa. Foque em liderança estratégica de design e facilitação de workshops (como Design Sprints)."
    },
    marketing: {
        junior: "O Marketing Digital exige entendimento de dados e psicologia do consumidor. Comece tirando certificações gratuitas de Google Analytics e Meta Ads, e aplique em projetos pessoais.",
        pleno: "Mova-se de executor para analista estratégico. Domine funis de conversão complexos, Growth Hacking e automação de marketing. Qual canal de aquisição traz mais retorno no seu cenário atual?",
        senior: "Liderança em marketing exige gestão de grandes orçamentos, branding de longo prazo e liderança de times multidisciplinares. Foque em estratégias Omnichannel e ROI de marca."
    },
    business: {
        junior: "Entenda os fundamentos de metodologias ágeis (Scrum, Kanban) e análise de processos. Ser proativo e ter boa comunicação organizacional vai te destacar rapidamente.",
        pleno: "Foque em gestão de stakeholders, OKRs e análise financeira/DRE do produto ou setor. Como você gerencia conflitos de prioridades no seu dia a dia atual?",
        senior: "Governança corporativa, fusões, novas linhas de receita e desenvolvimento de lideranças são seu foco. Seu papel agora é traduzir a visão macro do board em execução tática."
    }
};

// Respostas genéricas caso a pergunta fuja do escopo direto
const genericResponses = [
    "Essa é uma ótima pergunta. Lembre-se sempre de que networking estruturado (LinkedIn) abre mais portas do que apenas enviar currículos em massa.",
    "Para responder isso com precisão, tente quebrar esse grande objetivo em pequenas metas semanais. Qual seria o primeiro micro-passo?",
    "Excelente ponto. Recomendo também buscar feedbacks constantes com seus pares e gestores para mapear seus pontos cegos profissionais."
];

// Função para adicionar mensagem na tela
function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    
    // Rola o chat para a última mensagem automaticamente
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função que processa o envio da mensagem
function handleSendMessage() {
    const text = userInput.value.trim();
    if (!text) return; // Evita enviar texto vazio

    // 1. Adiciona a mensagem do usuário no chat
    appendMessage(text, 'user');
    userInput.value = '';

    // 2. Simula o tempo de resposta do mentor (1 segundo)
    appendMessage("Pensando no seu caso...", "mentor");
    const typingMessage = chatBox.lastChild;

    setTimeout(() => {
        // Remove a mensagem de carregamento
        typingMessage.remove();

        // Pega as configurações atuais do usuário
        const selectedArea = areaSelect.value;
        const selectedLevel = levelSelect.value;

        // Lógica de resposta simples por palavra-chave ou resposta padrão da área
        let reply = "";
        const lowerText = text.toLowerCase();

        if (lowerText.includes("currículo") || lowerText.includes("cv") || lowerText.includes("portfolio")) {
            reply = "Para destacar seu perfil, seu portfólio/currículo deve mostrar o impacto do seu trabalho (use números, ex: 'melhorei a performance em 20%') e não apenas listar responsabilidades.";
        } else if (lowerText.includes("entrevista") || lowerText.includes("vaga")) {
            reply = "Em entrevistas, use o método STAR (Situação, Tarefa, Ação e Resultado) para responder perguntas comportamentais. Treine sua narrativa antes da chamada.";
        } else {
            // Se for uma dúvida geral, usa o contexto de Área + Nível cadastrado
            // Alterna às vezes com conselhos genéricos para simular dinâmica
            if (Math.random() > 0.6) {
                reply = mentorResponses[selectedArea][selectedLevel];
            } else {
                reply = genericResponses[Math.floor(Math.random() * genericResponses.length)];
            }
        }

        // Insere a resposta oficial do mentor
        appendMessage(reply, 'mentor');
    }, 1000);
}

// Eventos de clique e teclado
sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});
