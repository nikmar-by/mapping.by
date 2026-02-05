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
  
  // Здесь будет отправка формы через Netlify Forms
  // После отправки:
  // 1. Скрыть спиннер
  // 2. Показать сообщение об успехе или ошибке
  // 3. Очистить форму при успехе
  
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
