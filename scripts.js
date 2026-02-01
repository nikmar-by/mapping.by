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
