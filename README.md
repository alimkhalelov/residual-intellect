# 👁️ ОСТАТОЧНЫЙ ИНТЕЛЛЕКТ // RESIDUAL INTELLECT

> **Киберпанк больше не жанр. Это раздел новостей.**  
> Официальный антидизайн-лендинг Telegram-канала [«Остаточный интеллект»](https://t.me/residual_intellect).

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-ccff00?style=for-the-badge&logo=github&logoColor=black)](https://alimkhalelov.github.io/residual-intellect/)
[![Telegram Channel](https://img.shields.io/badge/Telegram-@residual__intellect-24A1DE?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/residual_intellect)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

---

## ⚡ О проекте

Интерактивный киберпанк / нео-брутализм веб-манифест, созданный в эстетике антидизайна и Windows 95. Сайт исследует технологическую сингулярность, парадоксы ИИ и будущее, которое уже наступило.

- 🌐 **Live Demo:** [alimkhalelov.github.io/residual-intellect](https://alimkhalelov.github.io/residual-intellect/)
- 📡 **Telegram:** [@residual_intellect](https://t.me/residual_intellect)

---

## 🕹️ Фичи и механики

- **Anti-Design & Cyberpunk Aesthetics:** контрастные кислотные акценты (`#ccff00`, `#ff007f`), агрессивная типографика, CRT-эффекты и глитч-шейдеры.
- **Интерактивные Win95-окна:** перетаскиваемые модули, опросники, бегущие строки и интерактивные поп-апы с защитой от закрытия.
- **Гостевая книга с персистентностью:** сохранение записей в `localStorage`.
- **Zero-Dependency Production Bundle:** компиляция в единый ультра-оптимизированный HTML-файл (`vite-plugin-singlefile`) для мгновенной отдачи с любого CDN / GitHub Pages.

---

## 🛠️ Стек технологий

| Технология | Назначение |
| :--- | :--- |
| **React 19** | Декларативный UI |
| **TypeScript** | Строгая типизация |
| **Tailwind CSS v4** | Стилизация и утилитарные классы |
| **Vite 7** | Молниеносная сборка и dev-сервер |
| **vite-plugin-singlefile** | Сборка в автономный single-page артефакт |

---

## 🚀 Быстрый старт

### Клонирование и установка

```bash
git clone https://github.com/alimkhalelov/residual-intellect.git
cd residual-intellect
npm install
```

### Запуск локального сервера разработки

```bash
npm run dev
```

Локальный сервер будет доступен по адресу `http://localhost:5173`.

### Сборка для продакшена

```bash
npm run build
```

Собранный файл будет сгенерирован в `dist/index.html`.

---

## 🛰️ Развертывание (GitHub Pages)

Проект настроен на автоматический деплой через **GitHub Actions**:
1. При каждом коммите в ветку `main` запускается workflow `.github/workflows/deploy.yml`.
2. Проект собирается с помощью `npm run build`.
3. Артефакт автоматически публикуется на GitHub Pages.

---

## 📜 Лицензия

MIT © [Alimzhan Khalelov](https://github.com/alimkhalelov) & [Остаточный интеллект](https://t.me/residual_intellect)
