// Article detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeArticleDetail();
});

function initializeArticleDetail() {
    loadArticleContent();
    initializeTableOfContents();
    initializeSocialSharing();
    initializeCommentForm();
    initializeReadingProgress();
    initializeSidebarNewsletter();
}

// Load article content based on URL parameter
function loadArticleContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleSlug = urlParams.get('slug') || urlParams.get('id') || 'o-papel-critico-do-gestor';
    
    const articles = getArticleData();
    const article = articles[articleSlug] || articles['o-papel-critico-do-gestor'];
    
    // Update page content
    updateArticleContent(article);
    updatePageMeta(article);
}

// Article data (in a real app, this would come from an API)
function getArticleData() {
    return {
        'o-papel-critico-do-gestor': {
            title: 'O Papel Crítico do Gestor',
            subtitle: 'Uma boa gestão adiciona valor e garante o sucesso duradouro das organizações. Este artigo explica por que gestores eficazes são críticos para construir organizações sólidas.',
            date: '15 de Agosto, 2025',
            tag: 'Liderança',
            readingTime: '7 min de leitura',
            author: {
                name: 'Equipe Bom Gestor',
                title: 'Consultores em Gestão',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            },
            heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            tags: ['liderança', 'gestão', 'melhores-práticas', 'organizações'],
            content: `
                <p class="lead">Em cada organização de sucesso, por trás dos números, processos, sistemas e estruturas, há um elemento constante: a qualidade da sua gestão.</p>

                <p><strong>Uma boa gestão</strong> adiciona valor e garante o sucesso a longo prazo das organizações. A expressão <em>"Bom Gestor. Boa Organização."</em> lembra-nos que nenhuma estratégia, modelo de governança, investimento, sistema, processo ou recurso pode substituir uma gestão capaz, comprometida e visionária.</p>

                <h2 id="funcoes">Mais do que Funções Básicas</h2>
                <p>Ser um bom gestor é mais do que planear, organizar, dirigir, controlar e tomar decisões. Um bom gestor constrói organizações, desenvolve pessoas, preserva o propósito da organização e gera resultados com impacto positivo duradouro.</p>

                <p>Bons gestores inspiram as suas equipas a serem o melhor que podem ser, impactando diretamente o moral, a produtividade e, em última instância, os resultados organizacionais.</p>

                <blockquote>
                    <p>"Gerir bem não é apenas uma função — é um compromisso com o futuro. Bons gestores inspiram pessoas, desenvolvem organizações, criam valor e deixam um legado que muda vidas."</p>
                    <cite>— Bom Gestor Boa Organização</cite>
                </blockquote>

                <h2 id="impacto">O Impacto Transformador</h2>
                <p>Bons gestores moldam culturas, impulsionam o desempenho e determinam se uma organização apenas sobrevive ou verdadeiramente prospera. Ao criar organizações prósperas, os gestores contribuem para empregos, inovação e criação de valor social e económico.</p>

                <div class="highlight-box">
                    <h4>Reflexão Importante</h4>
                    <p>Gerir com visão, propósito, compromisso e capacidade é o primeiro passo para transformar organizações, gerar resultados sustentáveis, apoiar o desenvolvimento económico e impactar vidas.</p>
                </div>

                <h3>Características de um Bom Gestor</h3>
                <ul>
                    <li><strong>Visão Estratégica:</strong> Capacidade de ver além do presente e planear o futuro</li>
                    <li><strong>Desenvolvimento de Pessoas:</strong> Investir no crescimento e potencial da equipa</li>
                    <li><strong>Preservação do Propósito:</strong> Manter a organização alinhada com a sua missão</li>
                    <li><strong>Geração de Resultados:</strong> Criar impacto positivo e duradouro</li>
                    <li><strong>Inspiração:</strong> Motivar as equipas a alcançarem a excelência</li>
                </ul>

                <h2 id="iniciativa">A Iniciativa "Bom Gestor. Boa Organização."</h2>
                <p>A iniciativa <em>"Bom Gestor. Boa Organização."</em> explora, promove e reforça a conexão entre gestão eficaz, sucesso organizacional e impacto social positivo.</p>

                <p>Esta plataforma dedica-se a partilhar conhecimento, ferramentas e insights que capacitam gestores a construir organizações mais fortes, resilientes e prósperas.</p>

                <div class="article-conclusion" id="conclusion">
                    <h3>Conclusão</h3>
                    <p>O papel do gestor é crítico para o sucesso de qualquer organização. Não se trata apenas de gerir recursos ou processos, mas de liderar pessoas, construir culturas e criar valor duradouro.</p>
                    <p>Quando temos bons gestores, temos boas organizações. E boas organizações transformam vidas, comunidades e sociedades inteiras.</p>
                </div>
            `
        },
        'management-toolbox-global-lessons': {
            title: 'Caixa de Ferramentas de Gestão & Lições Globais',
            subtitle: 'Esta edição compartilha um checklist de alinhamento de 5 minutos e rounds de liderança, com lições da Toyota e Danaher sobre construção de organizações responsivas.',
            date: '15 de Agosto, 2025',
            tag: 'Gestão',
            readingTime: '6 min de leitura',
            author: {
                name: 'Equipe Bom Gestor',
                title: 'Consultores em Gestão',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
            },
            heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            tags: ['gestão', 'liderança', 'melhores-práticas', 'ferramentas'],
            content: `
                <h2 id="toolbox">Caixa de Ferramentas de Gestão: Checklist de Alinhamento de 5 Minutos</h2>
                <p class="lead">Antes de qualquer reunião importante ou decisão, pergunte a si mesmo e à sua equipa:</p>

                <ul>
                    <li><strong>O que estamos a tentar alcançar?</strong> (Clareza do objetivo)</li>
                    <li><strong>Por que é importante agora?</strong> (Relevância estratégica)</li>
                    <li><strong>Como é o sucesso?</strong> (Resultado mensurável)</li>
                    <li><strong>Quem precisa de estar envolvido?</strong> (Consciência das partes interessadas)</li>
                    <li><strong>Estamos a resolver a causa raiz ou apenas um sintoma?</strong> (Pensamento crítico)</li>
                </ul>

                <p>Este simples checklist evita confusão, desalinhamento e tempo desperdiçado — mantendo a equipa focada no que realmente importa.</p>

                <h2 id="leadership-rounds">Boa Prática: Rounds de Liderança</h2>
                <p>Regularmente, os executivos da empresa dedicam tempo para interagir diretamente com as equipas operacionais. Não para inspecionar — mas para ouvir. Fazem três perguntas simples:</p>

                <ul>
                    <li><strong>O que está a funcionar bem?</strong></li>
                    <li><strong>Que desafios estão a enfrentar?</strong></li>
                    <li><strong>Que apoio precisam?</strong></li>
                </ul>

                <p>Esta prática fortalece a comunicação, confiança e velocidade de resolução de problemas, provando que a presença da liderança cria uma cultura ágil e respeitosa.</p>

                <div class="highlight-box">
                    <h4>Exemplos Práticos</h4>
                    <p><strong>Toyota – Gemba Walks:</strong> líderes visitam regularmente o "gemba" (onde o trabalho acontece) para observar, dialogar e identificar melhorias diretamente com os colaboradores.</p>
                    <p><strong>Danaher Corporation:</strong> executivos realizam caminhadas regulares nas áreas de produção e serviços para compreender gargalos e reforçar o alinhamento estratégico.</p>
                </div>

                <h2 id="lessons">Lições Globais</h2>
                <p>Estas práticas demonstram como organizações líderes mundiais constroem culturas responsivas e eficazes através de:</p>

                <ol>
                    <li><strong>Presença Ativa da Liderança:</strong> Estar onde o trabalho acontece</li>
                    <li><strong>Escuta Genuína:</strong> Fazer perguntas certas e ouvir as respostas</li>
                    <li><strong>Ação Rápida:</strong> Resolver problemas identificados rapidamente</li>
                    <li><strong>Melhoria Contínua:</strong> Usar insights para melhorar processos</li>
                </ol>

                <div class="article-conclusion" id="conclusion">
                    <h3>Conclusão</h3>
                    <p>Ferramentas simples como checklists de alinhamento e rounds de liderança podem transformar a eficácia organizacional. A chave está na consistência e no compromisso genuíno com a melhoria contínua.</p>
                    <p>Implementar estas práticas não requer grandes investimentos — apenas disciplina e foco no que realmente importa para o sucesso da organização.</p>
                </div>
            `
        }
        // Add more articles as needed
    };
}

function updateArticleContent(article) {
    // Update main content
    document.getElementById('main-article-title').textContent = article.title;
    document.getElementById('article-subtitle').textContent = article.subtitle;
    document.getElementById('article-date').textContent = article.date;
    document.getElementById('article-tag').textContent = article.tag;
    document.getElementById('reading-time').textContent = article.readingTime;
    document.getElementById('breadcrumb-title').textContent = article.title;
    
    // Update author info
    document.getElementById('author-name').textContent = article.author.name;
    document.getElementById('author-title').textContent = article.author.title;
    document.getElementById('author-avatar').src = article.author.avatar;
    
    // Update hero image
    document.getElementById('hero-image').src = article.heroImage;
    document.getElementById('hero-image').alt = article.title;
    
    // Update article content
    document.getElementById('article-content').innerHTML = article.content;
    
    // Update tags
    const tagsContainer = document.getElementById('article-tags-list');
    tagsContainer.innerHTML = article.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
}

function updatePageMeta(article) {
    document.title = `${article.title} | Good Manager – Good Company`;
    document.querySelector('meta[name="description"]').content = article.subtitle;
}

// Table of Contents functionality
function initializeTableOfContents() {
    const tocContainer = document.getElementById('table-of-contents');
    const headings = document.querySelectorAll('#article-content h2, #article-content h3');
    
    if (headings.length === 0) return;
    
    const tocList = document.createElement('ul');
    
    headings.forEach((heading, index) => {
        // Ensure heading has an ID
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-sub' : '';
        
        // Smooth scroll to heading
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById(heading.id);
            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active TOC item
                updateActiveTocItem(link);
            }
        });
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    tocContainer.innerHTML = '';
    tocContainer.appendChild(tocList);
    
    // Initialize scroll spy for TOC
    initializeScrollSpy();
}

function initializeScrollSpy() {
    const tocLinks = document.querySelectorAll('#table-of-contents a');
    const headings = document.querySelectorAll('#article-content h2, #article-content h3');
    
    if (tocLinks.length === 0 || headings.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const correspondingTocLink = document.querySelector(`#table-of-contents a[href="#${id}"]`);
                if (correspondingTocLink) {
                    updateActiveTocItem(correspondingTocLink);
                }
            }
        });
    }, {
        rootMargin: '-100px 0px -50% 0px'
    });
    
    headings.forEach(heading => observer.observe(heading));
}

function updateActiveTocItem(activeLink) {
    const tocLinks = document.querySelectorAll('#table-of-contents a');
    tocLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Social sharing functionality
function initializeSocialSharing() {
    // Add click handlers for share buttons (already defined in HTML)
}

function shareOnTwitter() {
    const url = window.location.href;
    const title = document.getElementById('main-article-title').textContent;
    const text = `Check out this article: ${title}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const url = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
}

function shareOnFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function shareViaEmail() {
    const url = window.location.href;
    const title = document.getElementById('main-article-title').textContent;
    const subject = `Interesting article: ${title}`;
    const body = `I thought you might find this article interesting:\n\n${title}\n${url}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

// Comment form functionality
function initializeCommentForm() {
    const commentForm = document.getElementById('comment-form');
    
    if (commentForm) {
        window.BlogUtils.handleFormSubmission(commentForm, () => {
            commentForm.reset();
            window.BlogUtils.showNotification('Thank you for your comment! It will be reviewed before being published.', 'success');
        });
    }
}

// Reading progress indicator
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.reading-progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBarFill.style.width = Math.min(progress, 100) + '%';
    });
}

// Sidebar newsletter form
function initializeSidebarNewsletter() {
    const sidebarNewsletter = document.querySelector('.sidebar-newsletter');
    
    if (sidebarNewsletter) {
        window.BlogUtils.handleFormSubmission(sidebarNewsletter, () => {
            sidebarNewsletter.reset();
            window.BlogUtils.showNotification('Thank you for subscribing to our newsletter!', 'success');
        });
    }
}

// Copy link functionality
function copyArticleLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        window.BlogUtils.showNotification('Article link copied to clipboard!', 'success');
    }).catch(() => {
        window.BlogUtils.showNotification('Failed to copy link. Please try again.', 'error');
    });
}

// Export functions for global use
window.ArticleDetail = {
    shareOnTwitter,
    shareOnLinkedIn,
    shareOnFacebook,
    shareViaEmail,
    copyArticleLink
};
