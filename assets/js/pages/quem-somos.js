const popupCreators = document.getElementById("popup-creators");

const overlayCreators = popupCreators.querySelector(".popup__overlay");
const botoesFechar = popupCreators.querySelectorAll(".popup__close");
const cardsCreators = document.querySelectorAll("[data-creator]");
const popupCards = popupCreators.querySelectorAll("[data-creator-popup]");

function abrirPopupCreator(creator) {
    popupCards.forEach((popupCard) => {
        popupCard.classList.remove("active");
    });

    const popupCardAtual = popupCreators.querySelector(`[data-creator-popup="${creator}"]`);

    if (!popupCardAtual) {
        return;
    }

    popupCreators.classList.add("active");
    popupCardAtual.classList.add("active");
}

function fecharPopupCreators() {
    popupCreators.classList.remove("active");

    popupCards.forEach((popupCard) => {
        popupCard.classList.remove("active");
    });
}

cardsCreators.forEach((cardCreator) => {
    cardCreator.addEventListener("click", () => {
        abrirPopupCreator(cardCreator.dataset.creator);
    });

    cardCreator.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            abrirPopupCreator(cardCreator.dataset.creator);
        }
    });
});

botoesFechar.forEach((botaoFechar) => {
    botaoFechar.addEventListener("click", fecharPopupCreators);
});

overlayCreators.addEventListener("click", fecharPopupCreators);
