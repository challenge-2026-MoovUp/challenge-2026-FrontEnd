const benefitContent = {
    mobilidade: {
        index: '01',
        title: 'Mobilidade acessivel',
        text: 'Os pontos acumulados podem ser convertidos em passagens, ajudando o usuario a economizar no deslocamento diario e incentivando o uso de transporte coletivo.'
    },
    sustentabilidade: {
        index: '02',
        title: 'Impacto sustentavel',
        text: 'A plataforma valoriza interacoes sustentaveis, campanhas educativas e atitudes que ajudam a criar uma rotina mais consciente dentro da cidade.'
    },
    controle: {
        index: '03',
        title: 'Controle simples',
        text: 'O usuario acompanha saldo, historico de pontos e possibilidades de resgate em uma experiencia direta, organizada e facil de entender.'
    }
};

const benefitCards = document.querySelectorAll('[data-benefit]');
const benefitIndex = document.querySelector('[data-benefit-index]');
const benefitTitle = document.querySelector('[data-benefit-title]');
const benefitText = document.querySelector('[data-benefit-text]');

function selectBenefit(selectedCard) {
    const benefit = benefitContent[selectedCard.dataset.benefit];

    if (!benefit) {
        return;
    }

    benefitCards.forEach((card) => {
        const isCurrentCard = card === selectedCard;
        card.classList.toggle('is-active', isCurrentCard);
        card.setAttribute('aria-selected', String(isCurrentCard));
    });

    benefitIndex.textContent = benefit.index;
    benefitTitle.textContent = benefit.title;
    benefitText.textContent = benefit.text;
}

benefitCards.forEach((card) => {
    card.addEventListener('click', () => selectBenefit(card));
});

const stepButtons = document.querySelectorAll('[data-step]');

stepButtons.forEach((stepButton) => {
    stepButton.addEventListener('click', () => {
        stepButtons.forEach((item) => item.classList.remove('is-active'));
        stepButton.classList.add('is-active');
    });
});

const animatedBlocks = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.18
});

animatedBlocks.forEach((block) => revealObserver.observe(block));

const counters = document.querySelectorAll('[data-counter]');
let countersStarted = false;

function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const prefix = counter.dataset.prefix || '';
    const suffix = counter.dataset.suffix || '';
    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentValue = Math.floor(target * progress);

        counter.textContent = `${prefix}${currentValue}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = `${prefix}${target}${suffix}`;
        }
    }

    requestAnimationFrame(updateCounter);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            counters.forEach(animateCounter);
            counterObserver.disconnect();
        }
    });
}, {
    threshold: 0.5
});

if (counters.length) {
    counterObserver.observe(counters[0].closest('.sobre__stats'));
}

const scrollLinks = document.querySelectorAll('[data-scroll-link]');

scrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        event.preventDefault();
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
