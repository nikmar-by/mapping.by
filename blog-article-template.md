# Шаблон для создания статей блога

## Общая структура HTML-файла

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>[Заголовок статьи для SEO]</title>
    <meta name="description" content="[Краткое описание статьи для SEO]">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://mapping.by/blog/[название-статьи-в-нижнем-регистре-и-тире]">
    <meta property="og:title" content="[Заголовок статьи для Open Graph]">
    <meta property="og:description" content="[Описание для Open Graph]">
    <meta property="og:image" content="https://mapping.by/img/og-mapping.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://mapping.by/blog/[название-статьи-в-нижнем-регистре-и-тире]">
    <meta property="twitter:title" content="[Заголовок статьи для Twitter]">
    <meta property="twitter:description" content="[Описание для Twitter]">
    <meta property="twitter:image" content="https://mapping.by/img/og-mapping.jpg">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "[Заголовок статьи]",
      "description": "[Описание статьи]",
      "image": "https://mapping.by/img/og-mapping.jpg",
      "author": {
        "@type": "Organization",
        "name": "Mapping.by"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Mapping.by",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mapping.by/img/logo-mapping.png"
        }
      },
      "datePublished": "2026-03-09T00:00:00Z",
      "dateModified": "2026-03-09T00:00:00Z"
    }
    </script>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://mapping.by/blog/[название-статьи-в-нижнем-регистре-и-тире]">
    
    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Favicon -->
    <link rel="icon" href="/img/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png">
    <link rel="manifest" href="/img/site.webmanifest">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <a href="#main" class="skip-link">Перейти к основному контенту</a>
    
    <header class="site-header" id="header">
        <!-- Компонент header будет загружен здесь -->
    </header>
    
    <main id="main">
        <section class="section">
            <div class="container">
                <!-- Блок для администратора: Для чего этот текст -->
                <div class="admin-note">
                    <p><strong>Для чего этот текст:</strong> [Цель статьи для владельцев бизнеса]</p>
                </div>
                
                <article class="blog-post">
                    <h1>[Основной заголовок статьи]</h1>
                    
                    <div class="post-meta">
                        <time datetime="2026-03-09T00:00:00Z">9 марта 2026 года</time>
                        <span class="author">Автор: Mapping.by</span>
                    </div>
                    
                    <!-- Основной контент статьи -->
                    <p>[Введение]</p>
                    
                    <h2>[Подзаголовок 1]</h2>
                    <p>[Контент подзаголовка 1]</p>
                    
                    <h2>[Подзаголовок 2]</h2>
                    <p>[Контент подзаголовка 2]</p>
                    
                    <h2>[Подзаголовок 3]</h2>
                    <p>[Контент подзаголовка 3]</p>
                    
                    <h2>[Подзаголовок 4]</h2>
                    <p>[Контент подзаголовка 4]</p>
                    
                    <section class="key-points">
                        <h3>Ключевые тезисы:</h3>
                        <ul>
                            <li>[Тезис 1]</li>
                            <li>[Тезис 2]</li>
                            <li>[Тезис 3]</li>
                            <li>[Тезис 4]</li>
                            <li>[Тезис 5]</li>
                        </ul>
                    </section>
                    
                    <p class="cta"><strong>[Заключительный призыв к действию]</strong> <a href="/contact.html" class="btn btn-primary">[Текст кнопки]</a></p>
                </article>
            </div>
        </section>
    </main>
    
    <footer class="site-footer" id="footer">
        <!-- Компонент footer будет загружен здесь -->
    </footer>
    
    <button id="backToTop" class="back-to-top" title="Наверх" style="display: none;">↑</button>
    
    <script src="/scripts.js" defer></script>
</body>
</html>
```

## Стили и классы

### admin-note (уже реализован в styles.css)
```css
.admin-note {
  background: #f0fdf4;
  border-radius: 8px;
  margin-bottom: 30px;
  border-left: 5px solid #28a745;
  /* Добавляем адаптивные отступы */
  padding-left: 15px;
  padding-right: 15px;
}

@media (max-width: 768px) {
  .admin-note {
    padding: 12px;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .admin-note {
    padding: 10px;
    margin-bottom: 15px;
  }
}
```

### key-points (уже реализован в styles.css)
```css
.key-points {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
}

.key-points h3 {
  margin-top: 0;
}
```

## Рекомендации по написанию

1. **Заголовки**: Используйте H1 для основного заголовка статьи, H2 для разделов
2. **SEO-оптимизация**: 
   - Заголовок страницы (title) должен быть уникальным и содержать ключевые слова
   - Meta description должен быть кратким и содержать призыв к действию
   - Используйте ключевые слова в заголовках и начале абзацев
3. **Структура статьи**:
   - Введение с кратким описанием проблемы
   - Четкие разделы с подзаголовками
   - Ключевые тезисы в отдельном блоке
   - Призыв к действию в конце
4. **Стили**: Все стили берутся из styles.css, встроенные стили запрещены
5. **Форматирование**: 
   - Используйте теги <em> для выделения ключевых фраз
   - Списки с <ul> и <ol> для структурирования информации
   - Ссылки на контактную форму в формате: `<a href="/contact.html" class="btn btn-primary">[текст]</a>`
6. **Формат имени файла**: 
   - Используйте нижний регистр
   - Разделяйте слова дефисами
   - Добавьте год в конце: `название-темы-год.html`
7. **Удаление кавычек**: Удалите все кавычки [ ] и содержимое внутри них из текста

## Примеры для разных сфер

### Для агроусадеб:
- Цель статьи: объяснить выгоду работы без посредников через связку "Карты + Сайт"
- Ключевые тезисы: гео-метки на фото, специфические услуги, маршруты

### Для СТО:
- Цель статьи: объяснить важность NAP-данных и сайта-визитки
- Ключевые тезисы: единообразие данных, геопривязка, сайт-визитка

### Для кафе:
- Цель статьи: объяснить как выйти в топ Яндекс Карт
- Ключевые тезисы: подтвержденный профиль, детальное меню, фото

## Требования к контенту

1. Все кавычки [ ] и содержимое внутри них должны быть удалены
2. Все стили должны браться из styles.css
3. Название файла должно соответствовать содержанию для SEO продвижения
4. Статья должна содержать призыв к действию в конце
5. Все мета-данные должны быть заполнены корректно