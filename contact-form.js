document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const button = document.getElementById("submitButton");
    const buttonText = button.querySelector(".submit-text");
    const messageBox = document.getElementById("formMessage");

    if (!form) return;

    function setHiddenFields() {

        const setValue = (id, value) => {
            const field = document.getElementById(id);
            if (field) field.value = value;
        };

        const params = new URLSearchParams(window.location.search);

        setValue("page", window.location.href);
        setValue("referrer", document.referrer);
        setValue("utm_source", params.get("utm_source") || "");
        setValue("utm_campaign", params.get("utm_campaign") || "");
    }

    setHiddenFields();

    function showMessage(type, html) {

        messageBox.innerHTML = `
            <div class="form-${type}">
                ${html}
            </div>
        `;

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

    function isFake(value) {

        value = value.trim().toLowerCase();

        const fakeValues = [
            "1",
            "11",
            "111",
            "1111",
            "2",
            "22",
            "222",
            "2222",
            "333",
            "444",
            "555",
            "666",
            "777",
            "888",
            "999",
            "000",
            "test",
            "qwerty",
            "asdf"
        ];

        return fakeValues.includes(value);

    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();

        if (isFake(name)) {

            showMessage(
                "error",
                "<p>Укажите корректное имя.</p>"
            );

            return;
        }

        if (isFake(phone)) {

            showMessage(
                "error",
                "<p>Укажите корректный телефон.</p>"
            );

            return;
        }

        if (message.length < 15) {

            showMessage(
                "error",
                "<p>Опишите задачу немного подробнее.</p>"
            );

            return;
        }

        button.disabled = true;
        button.classList.add("loading");
        buttonText.textContent = "Отправляем...";

        messageBox.innerHTML = "";

        try {

            const response = await fetch(form.action, {

                method: "POST",

                body: new FormData(form),

                headers: {
                    Accept: "application/json"
                }

            });

            const result = await response.json();

            if (response.ok && result.success) {

                showMessage(
                    "success",
                    `
                    <h3>✅ Спасибо!</h3>
                    <p>Мы получили вашу заявку.</p>
                    <p>Свяжемся с вами в ближайшее рабочее время.</p>
                    `
                );

                form.reset();

                setHiddenFields();

            } else {

                throw new Error(result.message || "Ошибка отправки.");

            }

        } catch (error) {

            console.error(error);

            showMessage(
                "error",
                `
                <h3>⚠ Не удалось отправить заявку</h3>
                <p>Попробуйте ещё раз через несколько минут.</p>
                `
            );

        } finally {

            button.disabled = false;
            button.classList.remove("loading");
            buttonText.textContent = "Отправить заявку";

        }

    });

});
