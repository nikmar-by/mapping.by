document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) return;

    const button = document.getElementById("submitButton");
    const buttonText = button.querySelector(".submit-text");
    const messageBox = document.getElementById("formMessage");

    function fillHiddenFields() {
        const params = new URLSearchParams(window.location.search);

        const pageInput = document.getElementById("page");
        const referrerInput = document.getElementById("referrer");
        const utmSourceInput = document.getElementById("utm_source");
        const utmCampaignInput = document.getElementById("utm_campaign");

        if (pageInput) pageInput.value = window.location.href;
        if (referrerInput) referrerInput.value = document.referrer;
        if (utmSourceInput) utmSourceInput.value = params.get("utm_source") || "";
        if (utmCampaignInput) utmCampaignInput.value = params.get("utm_campaign") || "";
    }

    fillHiddenFields();

    function showMessage(type, text) {
        messageBox.innerHTML = `
            <div class="form-${type}">
                ${text}
            </div>
        `;

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        button.disabled = true;
        if (buttonText) buttonText.textContent = "Отправляем...";

        messageBox.innerHTML = "";

        try {
            // Преобразуем данные формы в обычный JS-объект
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Удаляем пустые поля, чтобы не забивать запрос невалидными пустыми строками
            Object.keys(data).forEach(key => {
                if (data[key] === "" || data[key] === null) {
                    delete data[key];
                }
            });

            // Отправляем как чистый JSON-запрос
            const response = await fetch(form.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {

                showMessage(
                    "success",
                    `
                    <h3>Спасибо!</h3>
                    <p>Ваша заявка успешно отправлена.</p>
                    `
                );

                form.reset();
                fillHiddenFields();

            } else {
                throw new Error(result.message || "Ошибка отправки формы");
            }

        } catch (error) {

            console.error("StaticForms Error:", error);

            showMessage(
                "error",
                `
                <h3>Ошибка</h3>
                <p>Не удалось отправить заявку. Попробуйте ещё раз.</p>
                `
            );

        } finally {

            button.disabled = false;
            if (buttonText) buttonText.textContent = "Отправить заявку";

        }

    });

});
