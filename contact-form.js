document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const button = document.getElementById("submitButton");
    const buttonText = button.querySelector(".submit-text");
    const messageBox = document.getElementById("formMessage");

    // ----------------------------
    // Заполняем скрытые поля
    // ----------------------------

    const setValue = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    };

    setValue("page", window.location.href);
    setValue("date", new Date().toLocaleString("ru-RU"));
    setValue("userAgent", navigator.userAgent);
    setValue("referrer", document.referrer);

    const params = new URLSearchParams(window.location.search);

    setValue("utm_source", params.get("utm_source") || "");
    setValue("utm_medium", params.get("utm_medium") || "");
    setValue("utm_campaign", params.get("utm_campaign") || "");
    setValue("utm_content", params.get("utm_content") || "");
    setValue("utm_term", params.get("utm_term") || "");

    // ----------------------------
    // Сообщения
    // ----------------------------

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

    // ----------------------------
    // Отправка формы
    // ----------------------------

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        button.disabled = true;
        button.classList.add("loading");
        buttonText.textContent = "Отправляем...";

        messageBox.innerHTML = "";

        const formData = new FormData(form);

        try {

            const response = await fetch(form.action, {

                method: "POST",

                body: formData,

                headers: {
                    Accept: "application/json"
                }

            });

            const result = await response.json();

            if (response.ok) {

                showMessage(
                    "success",
                    `
                    <h3>✅ Спасибо!</h3>
                    <p>Мы получили вашу заявку.</p>
                    <p>Свяжемся с вами в ближайшее рабочее время.</p>
                    `
                );

                form.reset();

                // снова заполняем скрытые поля

                setValue("page", window.location.href);
                setValue("date", new Date().toLocaleString("ru-RU"));
                setValue("userAgent", navigator.userAgent);
                setValue("referrer", document.referrer);

                setValue("utm_source", params.get("utm_source") || "");
                setValue("utm_medium", params.get("utm_medium") || "");
                setValue("utm_campaign", params.get("utm_campaign") || "");
                setValue("utm_content", params.get("utm_content") || "");
                setValue("utm_term", params.get("utm_term") || "");

            } else {

                throw new Error(result.message || "Ошибка отправки");

            }

        } catch (error) {

            console.error(error);

            showMessage(
                "error",
                `
                <h3>⚠ Не удалось отправить заявку</h3>
                <p>Попробуйте еще раз через несколько минут.</p>
                <p>Если проблема повторяется — свяжитесь с нами по телефону.</p>
                `
            );

        } finally {

            button.disabled = false;
            button.classList.remove("loading");
            buttonText.textContent = "Отправить заявку";

        }

    });

});
