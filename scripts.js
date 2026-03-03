// Активный пункт меню по текущему URL
document.querySelectorAll('.main-nav .nav-link, .mobile-nav .nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// Mobile menu
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

// Sticky header shadow
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (!header) return;
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 2px 10px rgba(15,23,42,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// FAQ accordion
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

// Кнопка "Наверх"
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Обработка формы
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Показать состояние загрузки
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Эмуляция отправки
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      
      // Показать сообщение об успехе
      const formMessage = document.getElementById('formMessage');
      formMessage.textContent = 'Спасибо! Ваша заявка успешно отправлена.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      
      // Очистить форму
      contactForm.reset();
      
      // Скрыть сообщение через 5 секунд
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }, 2000);
  });

  // Валидация полей в реальном времени
  const inputs = contactForm.querySelectorAll('input[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
  });
}

function validateField(e) {
  const field = e.target;
  const group = field.closest('.form-group');
  const feedback = group.querySelector('.form-feedback');

  if (field.value.trim() === '') {
    group.classList.remove('success');
    group.classList.add('error');
    feedback.textContent = 'Это поле обязательно для заполнения';
    feedback.className = 'form-feedback error';
  } else {
    group.classList.remove('error');
    group.classList.add('success');
    feedback.textContent = '✓';
    feedback.className = 'form-feedback success';
  }
}

// ==========================================
// Скрипт-ускоритель для Telegram
// ==========================================
const fastTgLink = document.getElementById('fast-tg-link');

if (fastTgLink) {
  fastTgLink.addEventListener('click', function(e) {
    e.preventDefault(); // Останавливаем стандартный переход
    
    // Сохраняем вашу ссылку из HTML (вместе с ?direct)
    const fallbackUrl = this.href; 
    
    // 1. Моментально пытаемся открыть приложение
    window.location.href = 'tg://resolve?domain=mapping_by&direct';
    
    // 2. Ждем 500 миллисекунд. Если браузер остался активным (не свернулся) — 
    // открываем вашу ссылку из href в новой вкладке
    setTimeout(function() {
      if (!document.hidden) {
        window.open(fallbackUrl, '_blank');
      }
    }, 500);
  });
}

// ==========================================
// Загрузка компонентов Header и Footer
// ==========================================

// Функция для загрузки компонента
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки компонента: ${response.status} ${response.statusText}`);
    }
    const componentHTML = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = componentHTML;
      
      // Вызов дополнительных функций после загрузки компонента
      if (elementId === 'header') {
        initHeaderScripts();
      } else if (elementId === 'footer') {
        initFooterScripts();
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке компонента:', error);
  }
}

// Инициализация скриптов для хедера
function initHeaderScripts() {
  // Mobile menu
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

  // Активный пункт меню по текущему URL
  document.querySelectorAll('.main-nav .nav-link, .mobile-nav .nav-link').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
  
  // Повторная инициализация sticky header после загрузки компонента
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 10px rgba(15,23,42,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

// Инициализация скриптов для футера
function initFooterScripts() {
  // Здесь можно добавить специфичные скрипты для футера, если понадобятся
}

// Загрузка компонентов при полной загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  loadComponent('header', '/components/header.html');
  loadComponent('footer', '/components/footer.html');
});

