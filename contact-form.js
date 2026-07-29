document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) return;

    const button = document.getElementById("submitButton");
    const buttonText = button.querySelector(".submit-text");
    const messageBox = document.getElementById("formMessage");

    function fillHiddenFields() {

        const params = new URLSearchParams(window.location.search);

        document.getElementById("page").value = window.location.href;
        document.getElementById("referrer").value = document.referrer;
        document.getElementById("utm_source").value =
            params.get("utm_source") || "";

        document.getElementById("utm_campaign").value =
            params.get("utm_campaign") || "";
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
                    <h3>Спасибо!</h3>
                    <p>Ваша заявка успешно отправлена.</p>
                    `
                );

                form.reset();

                fillHiddenFields();

            } else {

                throw new Error(result.message);

            }

        } catch (error) {

            console.error(error);

            showMessage(
                "error",
                `
                <h3>Ошибка</h3>
                <p>Не удалось отправить заявку. Попробуйте ещё раз.</p>
                `
            );

        } finally {

            button.disabled = false;
            buttonText.textContent = "Отправить заявку";

        }

    });

});
