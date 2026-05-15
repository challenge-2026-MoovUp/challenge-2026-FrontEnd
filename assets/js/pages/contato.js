const customSelect = document.querySelector("[data-select]");

if (customSelect) {
    const trigger = customSelect.querySelector(".contact__select-trigger");
    const valueText = customSelect.querySelector("[data-select-value]");
    const options = customSelect.querySelectorAll("[data-value]");
    const hiddenInput = customSelect.parentElement.querySelector('input[name="subject"]');

    trigger.addEventListener("click", () => {
        const isOpen = customSelect.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(isOpen));
    });

    options.forEach((option) => {
        option.addEventListener("click", () => {
            const value = option.dataset.value;

            valueText.textContent = value;
            hiddenInput.value = value;
            options.forEach((item) => item.setAttribute("aria-selected", "false"));
            option.setAttribute("aria-selected", "true");
            customSelect.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", (event) => {
        if (!customSelect.contains(event.target)) {
            customSelect.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
        }
    });
}
