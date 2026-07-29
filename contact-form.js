document.addEventListener('DOMContentLoaded', function() {

  // 1. Загрузка компонентов Header и Footer
  loadComponent('header', '/components/header.html');
  loadComponent('footer', '/components/footer.html');

  // 2. Инициализация FAQ
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isOpen = button.classList.contains('active');

      document.querySelectorAll('.faq-question').forEach(b => {
        b.classList.remove('active');
        const a = b.nextElementSibling;
        if (a) a.style.maxHeight = null;
      });

      if (!isOpen) {
        button.classList.add('active');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

  // 3. Кнопка "Наверх"
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Скрипт-ускоритель для Telegram
  const fastTgLink = document.getElementById('fast-tg-link');
  if (fastTgLink) {
    fastTgLink.addEventListener('click', function(e) {
      e.preventDefault();
      const fallbackUrl = this.href;
      window.location.href = 'tg://resolve?domain=mapping_by&direct';
      setTimeout(function() {
        if (!document.hidden) {
          window.open(fallbackUrl, '_blank');
        }
      }, 500);
    });
  }

  // 5. НАСТОЯЩАЯ ОТПРАВКА ФОРМЫ В STATICFORMS
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    fillHiddenFields(); // Заполняем utm и referrer перед отправкой

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Укажите почту по умолчанию:
      const DEFAULT_EMAIL = 'your-default@email.com';
      
      // Находим поле email (по типу или name="email")
      const emailInput = contactForm.querySelector('input[type="email"], input[name="email"]');
      if (emailInput && !emailInput.value.trim()) {
        emailInput.value = DEFAULT_EMAIL;
      }

      const submitBtn = document.getElementById('submitButton') || contactForm.querySelector('button[type="submit"]');
      const formMessage = document.getElementById('formMessage');

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Состояние загрузки
      if (submitBtn) submitBtn.disabled = true;

      try {
        // Передаем FormData с автоматически подставленным email
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            'Accept': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (formMessage) {
            formMessage.innerHTML = '<div class="form-success"><h3>Спасибо!</h3><p>Ваша заявка успешно отправлена.</p></div>';
            formMessage.style.display = 'block';
          }
          contactForm.reset();
          fillHiddenFields();
        } else {
          throw new Error(result.message || 'Ошибка сервера');
        }

      } catch (error) {
        console.error('StaticForms Error:', error);
        if (formMessage) {
          formMessage.innerHTML = '<div class="form-error"><h3>Ошибка</h3><p>Не удалось отправить заявку. Попробуйте еще раз.</p></div>';
          formMessage.style.display = 'block';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    // Валидация полей (сработает только на обязательные поля с атрибутом required)
    const inputs = contactForm.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
    });
  }

});

// Заполнение скрытых полей аналитики
function fillHiddenFields() {
  const params = new URLSearchParams(window.location.search);
  const page = document.getElementById("page");
  const referrer = document.getElementById("referrer");
  const utmSource = document.getElementById("utm_source");
  const utmCampaign = document.getElementById("utm_campaign");

  if (page) page.value = window.location.href;
  if (referrer) referrer.value = document.referrer;
  if (utmSource) utmSource.value = params.get("utm_source") || "";
  if (utmCampaign) utmCampaign.value = params.get("utm_campaign") || "";
}

// Валидация отдельных полей
function validateField(e) {
  const field = e.target;
  const group = field.closest('.form-group');
  if (!group) return;
  const feedback = group.querySelector('.form-feedback');

  if (field.value.trim() === '') {
    group.classList.remove('success');
    group.classList.add('error');
    if (feedback) {
      feedback.textContent = 'Это поле обязательно для заполнения';
      feedback.className = 'form-feedback error';
    }
  } else {
    group.classList.remove('error');
    group.classList.add('success');
    if (feedback) {
      feedback.textContent = '✓';
      feedback.className = 'form-feedback success';
    }
  }
}

// Вспомогательная функция загрузки компонентов
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) return;
    const componentHTML = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = componentHTML;
      if (elementId === 'header') initHeaderScripts();
    }
  } catch (error) {
    console.error('Ошибка загрузки компонента:', error);
  }
}

// Инициализация скриптов для Хедера после его вставки в DOM
function initHeaderScripts() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenu.style.display = mobileMenu.classList.contains('active') ? 'flex' : 'none';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
      });
    });
  }

  document.querySelectorAll('.main-nav .nav-link, .mobile-nav .nav-link').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });

  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10 ? '0 2px 10px rgba(15,23,42,0.08)' : 'none';
  });
}
