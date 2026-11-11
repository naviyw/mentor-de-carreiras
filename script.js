// Base de dados das Trilhas de Carreira
const trilhasData = {
  tech: {
    titulo: "Engenharia de Software & Tecnologia",
    descricao: "Foco na construção de sistemas web robustos, lógica de programação, arquitetura de software e versionamento de código.",
    habilidades: [
      "Lógica e Estrutura de Dados",
      "Git & GitHub para Colaboração",
      "JavaScript, HTML5 e CSS3",
      "Consumo de APIs RESTful",
      "Fundamentos de Banco de Dados",
      "Testes Automatizados Básicos"
    ],
    metasSugeridas: [
      "Criar perfil profissional no GitHub com README personalizável",
      "Desenvolver 3 projetos práticos em JavaScript",
      "Aprender os comandos fundamentais do Git (commit, push, branch)"
    ]
  },
  design: {
    titulo: "UI/UX Design & Experiência do Usuário",
    descricao: "Foco no mapeamento da jornada do usuário, prototipagem interativa, testes de usabilidade e criação de interfaces visuais modernas.",
    habilidades: [
      "Prototipagem no Figma",
      "Pesquisa com Usuários (UX Research)",
      "Criação e Gestão de Design Systems",
      "Arquitetura de Informação",
      "Design Responsivo e Acessibilidade",
      "Wireframing e Testes A/B"
    ],
    metasSugeridas: [
      "Criar um portfólio no Figma / Behance com 2 estudos de caso",
      "Mapear a jornada de um usuário para um aplicativo fictício",
      "Aprender a estruturar tokens em um Design System"
    ]
  },
  management: {
    titulo: "Gestão de Produtos (Product Management)",
    descricao: "Foco na definição do roadmap de produto, priorização de entregas, metodologias ágeis e comunicação entre engenharia e negócios.",
    habilidades: [
      "Metodologias Ágeis (Scrum & Kanban)",
      "Priorização de RICE / Eisenhower",
      "Métricas de Produto (MAU, Churn, NPS)",
      "Alinhamento de Stakeholders",
      "Elaboração de Histórias de Usuário",
      "Análise de Viabilidade Técnica"
    ],
    metasSugeridas: [
      "Elaborar um PRD (Product Requirement Document) de exemplo",
      "Obter uma certificação inicial em Scrum (ex: PSM I ou equivalente)",
      "Mapear os KPIs principais de um produto digital existente"
    ]
  },
  marketing: {
    titulo: "Marketing Digital & Growth",
    descricao: "Foco em estratégias de aquisição, otimização de conversores, SEO, campanhas de tráfego e análise de dados para crescimento de negócios.",
    habilidades: [
      "SEO e Estratégia de Conteúdo",
      "Copywriting e Comunicação Persuasiva",
      "Análise de Dados com Google Analytics",
      "Gestão de Tráfego Pago (Ads)",
      "Email Marketing e Funis de Vendas",
      "Testes e Métricas de Conversão"
    ],
    metasSugeridas: [
      "Criar e otimizar um artigo de blog com boas práticas de SEO",
      "Configurar uma conta no Google Analytics para monitorar métricas",
      "Estruturar um funil de e-mails para nutrir potenciais clientes"
    ]
  }
};

// --- 1. QUIZ DE DIAGNÓSTICO ---
const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");
const matchScore = document.getElementById("match-score");
const recommendedArea = document.getElementById("recommended-area");
const recommendedDesc = document.getElementById("recommended-desc");
const importGoalsBtn = document.getElementById("import-goals-btn");

let currentRecommendedKey = "tech";

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const q1 = document.getElementById("q1").value;
  const q2 = document.getElementById("q2").value;

  // Algoritmo simples de decisão baseado na primeira questão
  const selectedKey = q1 || q2 || "tech";
  const trilha = trilhasData[selectedKey];

  if (trilha) {
    currentRecommendedKey = selectedKey;
    recommendedArea.textContent = trilha.titulo;
    recommendedDesc.textContent = trilha.descricao;
    
    // Cálculo de pontuação fictício para engajamento visual
    const score = q1 === q2 ? "98%" : "85%";
    matchScore.textContent = `${score} de Alinhamento`;

    quizResult.classList.remove("hidden");
    activateTab(selectedKey);
    quizResult.scrollIntoView({ behavior: "smooth" });
  }
});

// Importação das metas sugeridas do Quiz para o Plano de Ação
importGoalsBtn.addEventListener("click", () => {
  const trilha = trilhasData[currentRecommendedKey];
  if (!trilha) return;

  trilha.metasSugeridas.forEach(metaText => {
    // Evita duplicatas exatas
    const exists = goals.some(g => g.text.toLowerCase() === metaText.toLowerCase());
    if (!exists) {
      goals.push({
        text: metaText,
        priority: "Alta",
        completed: false
      });
    }
  });

  saveAndRenderGoals();
  document.getElementById("metas").scrollIntoView({ behavior: "smooth" });
});

// --- 2. NAVEGAÇÃO POR ABAS (TRILHAS) ---
const tabBtns = document.querySelectorAll("#trilhas-tabs .tab-btn");
const tabContent = document.getElementById("tab-content");

function renderTabContent(key) {
  const data = trilhasData[key];
  if (!data) return;

  const skillsHtml = data.habilidades
    .map(skill => `<div class="skill-card">${skill}</div>`)
    .join("");

  tabContent.innerHTML = `
    <h3>${data.titulo}</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem;">${data.descricao}</p>
    <div style="margin-top: 1.25rem;">
      <h4 style="font-size: 0.95rem; color: var(--text-main);">Competências Chave:</h4>
      <div class="skills-grid">${skillsHtml}</div>
    </div>
  `;
}

function activateTab(key) {
  tabBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === key);
  });
  renderTabContent(key);
}

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => activateTab(btn.dataset.tab));
});

// Renderização inicial da primeira aba
renderTabContent("tech");

// --- 3. GERENCIADOR DE METAS (LOCALSTORAGE) ---
const goalInput = document.getElementById("goal-input");
const goalPriority = document.getElementById("goal-priority");
const addGoalBtn = document.getElementById("add-goal-btn");
const goalsList = document.getElementById("goals-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

// Estado inicial das metas salvo no localStorage ou lista padrão
let goals = JSON.parse(localStorage.getItem("mentor_carreira_goals")) || [
  { text: "Publicar o repositório no GitHub com index.html, style.css e script.js", priority: "Alta", completed: false },
  { text: "Ativar a publicação do site via GitHub Pages", priority: "Alta", completed: false },
  { text: "Concluir módulo de fundamentos de versionamento Git", priority: "Média", completed: true }
];

function saveAndRenderGoals() {
  localStorage.setItem("mentor_carreira_goals", JSON.stringify(goals));
  goalsList.innerHTML = "";

  const filteredGoals = goals.filter(goal => {
    if (currentFilter === "pending") return !goal.completed;
    if (currentFilter === "completed") return goal.completed;
    return true;
  });

  if (filteredGoals.length === 0) {
    goalsList.innerHTML = `<li style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 1rem;">Nenhuma meta encontrada para este filtro.</li>`;
    return;
  }

  filteredGoals.forEach((goal) => {
    const originalIndex = goals.indexOf(goal);
    const li = document.createElement("li");
    li.className = `goal-item ${goal.completed ? "completed" : ""}`;

    li.innerHTML = `
      <div class="goal-info" onclick="toggleGoal(${originalIndex})">
        <span style="color: var(--accent); font-weight: bold;">${goal.completed ? "☑" : "☐"}</span>
        <span class="goal-text">${escapeHtml(goal.text)}</span>
        <span class="priority-tag priority-${goal.priority}">${goal.priority}</span>
      </div>
      <button class="delete-btn" onclick="deleteGoal(${originalIndex})" title="Excluir meta">✕</button>
    `;

    goalsList.appendChild(li);
  });
}

function addGoal() {
  const text = goalInput.value.trim();
  const priority = goalPriority.value;

  if (text !== "") {
    goals.push({
      text,
      priority,
      completed: false
    });
    goalInput.value = "";
    saveAndRenderGoals();
  }
}

function toggleGoal(index) {
  if (goals[index]) {
    goals[index].completed = !goals[index].completed;
    saveAndRenderGoals();
  }
}

function deleteGoal(index) {
  if (goals[index]) {
    goals.splice(index, 1);
    saveAndRenderGoals();
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Event Listeners das Metas
addGoalBtn.addEventListener("click", addGoal);

goalInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addGoal();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    saveAndRenderGoals();
  });
});

// Renderização inicial das metas
saveAndRenderGoals();
