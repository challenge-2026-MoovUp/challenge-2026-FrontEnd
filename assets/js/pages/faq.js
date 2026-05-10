// Guarda em variaveis os elementos que o script vai manipular.
// Isso evita repetir querySelector varias vezes e deixa claro quem participa da logica.
const searchInput = document.querySelector('.faq__input');
const accordionItems = document.querySelectorAll('.accordion');
const faqSections = document.querySelectorAll('.faq-section');
const counter = document.querySelector('#faq-counter');
const sidebarLinks = document.querySelectorAll('.faq-sidebar__link');

// Atualiza o texto do contador abaixo do input.
// A ideia e simples: olha todos os accordions e conta apenas os que nao estao escondidos.
// Quando um item esta visivel, o style.display dele nao e "none".
function updateCounter() {
    const visibleItems = [...accordionItems]
        .filter(item => item.style.display !== 'none');

    counter.innerText = `${visibleItems.length} resultados`;
}

// Filtra as perguntas enquanto o usuario digita no campo de busca.
// 1. Pega o texto digitado.
// 2. Compara esse texto com o conteudo do summary de cada accordion.
// 3. Esconde os accordions que nao combinam com a busca.
// 4. Esconde a categoria inteira quando nenhuma pergunta dela esta visivel.
// 5. Atualiza o contador no final.
function filterAccordions() {
    const search = searchInput.value.toLowerCase().trim();

    accordionItems.forEach(item => {
        const title = item
            .querySelector('summary')
            ?.textContent
            .toLowerCase();

        const match = title.includes(search);
        item.style.display = match ? '' : 'none';
    });

    faqSections.forEach(group => {
        const hasVisibleAccordion = [...group.querySelectorAll('.accordion')]
            .some(item => item.style.display !== 'none');

        group.style.display = hasVisibleAccordion ? '' : 'none';
    });

    updateCounter();
}

// Mostra a quantidade inicial de perguntas antes do usuario digitar qualquer coisa.
updateCounter();

// Marca a primeira categoria como ativa quando a pagina carrega.
// Sem isso, a sidebar so ficaria ativa depois do primeiro clique ou da primeira rolagem.
if (faqSections.length) {
    setActiveSidebarLink(faqSections[0].id);
}

// Sempre que o usuario digita no input, roda o filtro novamente.
searchInput.addEventListener('input', filterAccordions);

// Controla qual link da sidebar aparece como ativo.
// A funcao recebe o id de uma secao, por exemplo "suporte".
// Depois compara esse id com o href de cada link, por exemplo "#suporte".
// O link que combinar ganha a classe is-active e aria-current.
function setActiveSidebarLink(sectionId) {
    sidebarLinks.forEach(link => {
        const isCurrentLink = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('is-active', isCurrentLink);

        if (isCurrentLink) {
            link.setAttribute('aria-current', 'true');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// Faz os links da sidebar rolarem suavemente ate a secao correspondente.
// O preventDefault bloqueia o pulo seco padrao do navegador.
// Depois o scrollIntoView faz a transicao suave ate o bloco certo.
sidebarLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const sectionId = link.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(sectionId);

        if (!targetSection) {
            return;
        }

        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setActiveSidebarLink(sectionId);
    });
});

// Observa quais secoes estao passando pela area principal da tela.
// Quando uma secao entra nessa faixa, o script marca o link dela como ativo.
// Assim a sidebar acompanha tanto o clique quanto a rolagem manual do usuario.
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActiveSidebarLink(entry.target.id);
        }
    });
}, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
});

// Entrega cada secao da FAQ para o IntersectionObserver acompanhar.
faqSections.forEach(section => observer.observe(section));
