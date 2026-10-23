document.addEventListener('DOMContentLoaded', () => {
    // 1. Alternância de Abas (Navegação Sidebar)
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            
            navItems.forEach(n => n.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 2. Mapeamento Ampliado de Áreas para o Diagnóstico
    const marketData = {
        tech: {
            demand: 92,
            demandText: "Altíssima (92%)",
            salary: "R$ 4.500 - R$ 12.000",
            topSkill: "Projetos Práticos no GitHub",
            advice: "Em Tecnologia, foque em construir soluções completas e postar no GitHub. Recrutadores valorizam mais projetos funcionando do que lista de certificados.",
            tasks: [
                "Criar repositório público com um README explicativo no GitHub",
                "Publicar uma explicação de projeto recente no LinkedIn",
                "Treinar resolução de problemas práticos de código semanalmente"
            ]
        },
        design: {
            demand: 82,
            demandText: "Alta (82%)",
            salary: "R$ 3.800 - R$ 9.000",
            topSkill: "UX Research & Design Systems",
            advice: "No mercado de Design, apresente a resolução de problemas (estudo de caso completo) em vez de apenas telas estáticas.",
            tasks: [
                "Escrever um estudo de caso detalhado no Behance ou Notion",
                "Fazer testes de usabilidade com ao menos 3 pessoas em seu protótipo",
                "Seguir e interagir com lideranças de produto e design no LinkedIn"
            ]
        },
        data: {
            demand: 88,
            demandText: "Altíssima (88%)",
            salary: "R$ 5.000 - R$ 13.000",
            topSkill: "SQL, Python & Dashboards",
            advice: "O segredo da área de dados é traduzir métricas complexas em histórias e recomendações claras para tomada de decisão.",
            tasks: [
                "Limpar e analisar uma base pública de dados do Kaggle",
                "Construir um dashboard visual interativo em PowerBI/Tableau",
                "Apresentar em 3 tópicos os principais achados da análise"
            ]
        },
        business: {
            demand: 78,
            demandText: "Alta (78%)",
            salary: "R$ 5.500 - R$ 14.000",
            topSkill: "Gestão Ágil & OKRs",
            advice: "Foque na gestão de processos e mediação de interesses entre equipes técnicas e diretores de negócios.",
            tasks: [
                "Mapear e documentar o fluxo de processo de um setor",
                "Aprender a definir OKRs claros de curto prazo",
                "Praticar técnicas de negociação e comunicação estratégica"
            ]
        },
        marketing: {
            demand: 80,
            demandText: "Alta (80%)",
            salary: "R$ 3.500 - R$ 8.500",
            topSkill: "Marketing de Performance & SEO",
            advice: "Marketing atual exige equilíbrio entre criatividade e análise de métricas como CAC, LTV e ROI de campanhas.",
            tasks: [
                "Desenvolver um plano de conteúdo focado em um funil de vendas",
                "Analisar relatórios do Google Analytics ou Meta Ads",
                "Criar e testar 2 variações de cópia de anúncios"
            ]
        },
        finance: {
            demand: 75,
            demandText: "Estável / Alta (75%)",
            salary: "R$ 4.200 - R$ 11.500",
            topSkill: "Análise Financeira & Excel Avançado",
            advice: "Domine a modelagem de cenários e a interpretação rápida de demonstrações financeiras (DRE e Fluxo de Caixa).",
            tasks: [
                "Construir uma planilha de fluxo de caixa projetado",
                "Aprender automações básicas de planilhas",
                "Acompanhar dados macroeconômicos e relatórios de mercado"
            ]
        },
        health: {
            demand: 85,
            demandText: "Altíssima (85%)",
            salary: "R$ 4.000 - R$ 10.000",
            topSkill: "Atendimento Humanizado & Telemedicina",
            advice: "Especialize-se na gestão de jornada do paciente e no uso de tecnologias de saúde e prontuários digitais.",
            tasks: [
                "Concluir atualização em ferramentas digitais de saúde",
                "Praticar metodologias de atendimento focado na experiência do paciente",
                "Participar de comunidades acadêmicas ou profissionais da área"
            ]
        },
        hr: {
            demand: 76,
            demandText: "Alta (76%)",
            salary: "R$ 3.800 - R$ 9.500",
            topSkill: "People Analytics & Recrutamento Tech",
            advice: "Trabalhe com retenção de talentos baseada em dados e estratégias de marcas empregadoras (Employer Branding).",
            tasks: [
                "Estruturar uma régua de contratação com métricas claras",
                "Estudar People Analytics para medir clima e retenção",
                "Construir uma abordagem atrativa para contato com candidatos"
            ]
        }
    };

    // Seleção dos Chips de área no Diagnóstico
    const chips = document.querySelectorAll('#area-chips .chip');
    let selectedArea = 'tech';

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            selectedArea = chip.getAttribute('data-value');
            updateMetrics(selectedArea);
        });
    });

    function updateMetrics(area) {
        const data = marketData[area];
        if(!data) return;
        document.getElementById('demand-bar').style.width = `${data.demand}%`;
        document.getElementById('demand-text').textContent = data.demandText;
        document.getElementById('salary-value').textContent = data.salary;
        document.getElementById('top-skill').textContent = data.topSkill;
    }

    // Formulário do Diagnóstico
    const mentorForm = document.getElementById('mentor-form');
    const resultsSection = document.getElementById('results-section');
    const adviceOutput = document.getElementById('advice-output');
    const taskList = document.getElementById('task-list');

    mentorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const goal = document.getElementById('goal-input').value;
        const level = document.getElementById('level-select').value;
        const currentData = marketData[selectedArea];

        const btn = document.getElementById('generate-btn');
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processando...`;
        btn.disabled = true;

        setTimeout(() => {
            adviceOutput.innerHTML = `<strong>Objetivo:</strong> "${goal}"<br><br>${currentData.advice} Para quem está no momento <em>${level.toUpperCase()}</em>, o plano ideal é combinar ação prática diária com visibilidade profissional.`;

            taskList.innerHTML = '';
            currentData.tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                li.innerHTML = `<i class="fa-regular fa-square"></i> <span>${task}</span>`;
                li.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    const icon = li.querySelector('i');
                    if(li.classList.contains('completed')) {
                        icon.className = 'fa-solid fa-square-check';
                    } else {
                        icon.className = 'fa-regular fa-square';
                    }
                });
                taskList.appendChild(li);
            });

            resultsSection.classList.remove('hidden');
            resultsSection.scrollIntoView({ behavior: 'smooth' });

            btn.innerHTML = `<span>Gerar Diagnóstico de Mercado</span> <i class="fa-solid fa-arrow-right"></i>`;
            btn.disabled = false;
        }, 800);
    });

    // 3. Módulo "Descubra sua Carreira" (Orientador)
    const finderForm = document.getElementById('finder-form');
    const finderResults = document.getElementById('finder-results');
    const careerContainer = document.getElementById('career-cards-container');

    const careerDatabase = [
        {
            title: "Desenvolvedor(a) Software / Web",
            tags: ["Lógica", "Resolução de Problemas", "Construção Criativa"],
            keywords: ["codigo", "programar", "site", "sistema", "logica", "tecnologia", "computador", "problemas"],
            match: 95,
            desc: "Ideal para quem gosta de criar soluções práticas, resolver problemas lógicos e trabalhar em ambientes inovadores e flexíveis."
        },
        {
            title: "UX/UI Designer",
            tags: ["Empatia", "Criatividade Visual", "Atenção a Detalhes"],
            keywords: ["desenhar", "criar", "telas", "visual", "artes", "empatia", "usuarios", "bonito"],
            match: 92,
            desc: "Perfeito para mentes criativas que gostam de combinar estética, pesquisa de comportamento humano e prototipagem de produtos."
        },
        {
            title: "Analista de Dados & Business Intelligence",
            tags: ["Pensamento Analítico", "Números", "Estratégia"],
            keywords: ["numeros", "planilhas", "analisar", "graficos", "matematica", "padroes", "pesquisa"],
            match: 89,
            desc: "Excelente opção para quem tem facilidade com números e gosta de descobrir padrões ocultos em informações para orientar decisões."
        },
        {
            title: "Product Owner / Gestor de Produtos",
            tags: ["Comunicação", "Organização", "Liderança"],
            keywords: ["organizar", "pessoas", "comunicacao", "liderar", "conversar", "planejar", "estrategia"],
            match: 87,
            desc: "Ótimo para quem gosta de conectar times, entender necessidades de clientes e planejar prioridades de projetos."
        },
        {
            title: "Especialista em Marketing Digital & Growth",
            tags: ["Comunicação", "Psicologia", "Métricas"],
            keywords: ["redes sociais", "vender", "escrever", "comunicar", "anuncios", "persuasao", "criativo"],
            match: 85,
            desc: "Indicado para quem tem boa escrita, gosta de redes sociais, estratégias de comunicação e quer resultados rápidos."
        }
    ];

    finderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const likes = document.getElementById('likes-input').value.toLowerCase();
        const skills = document.getElementById('skills-input').value.toLowerCase();
        const combinedText = `${likes} ${skills}`;

        const btn = document.getElementById('find-btn');
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Analisando Perfil...`;
        btn.disabled = true;

        setTimeout(() => {
            careerContainer.innerHTML = '';

            // Algoritmo simples de pontuação por palavras-chave
            let rankedCareers = careerDatabase.map(c => {
                let score = 0;
                c.keywords.forEach(kw => {
                    if (combinedText.includes(kw)) score += 1;
                });
                return { ...c, calculatedScore: score };
            });

            rankedCareers.sort((a, b) => b.calculatedScore - a.calculatedScore);

            // Renderiza as 3 melhores carreiras
            rankedCareers.slice(0, 3).forEach((item, index) => {
                const boostMatch = Math.min(98, item.match - (index * 4));
                const card = document.createElement('div');
                card.className = 'career-card';
                card.innerHTML = `
                    <div class="career-card-header">
                        <span class="career-title">${item.title}</span>
                        <span class="match-badge">${boostMatch}% Compatível</span>
                    </div>
                    <p class="career-desc">${item.desc}</p>
                    <div class="career-tags">
                        ${item.tags.map(t => `<span class="c-tag">${t}</span>`).join('')}
                    </div>
                `;
                careerContainer.appendChild(card);
            });

            finderResults.classList.remove('hidden');
            finderResults.scrollIntoView({ behavior: 'smooth' });

            btn.innerHTML = `<span>Analisar Meu Perfil e Sugerir Carreiras</span> <i class="fa-solid fa-sparkles"></i>`;
            btn.disabled = false;
        }, 900);
    });
});
