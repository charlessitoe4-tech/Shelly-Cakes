// ============ MENU MOBILE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Fecha menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ============ DARK MODE ============
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

function atualizarIcone() {
  const escuro = document.documentElement.classList.contains('dark');
  themeIcon.textContent = escuro ? '☀️' : '🌙';
}

atualizarIcone();

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const escuro = document.documentElement.classList.contains('dark');
  localStorage.setItem('tema', escuro ? 'dark' : 'light');
  atualizarIcone();
});

// Detecta mudança no tema do sistema (só se o usuário não escolheu manualmente)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('tema')) {
    document.documentElement.classList.toggle('dark', e.matches);
    atualizarIcone();
  }
});

// ============ FORMULÁRIO → WHATSAPP ============
const form = document.getElementById('formContato');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const dados = new FormData(form);
  const nome = dados.get('nome');
  const email = dados.get('email');
  const telefone = dados.get('telefone');
  const sabor = dados.get('sabor');
  const mensagem = dados.get('mensagem');

  const textoWhats =
    `Olá Shelly Cakes! Gostaria de fazer uma encomenda.%0A%0A` +
    `*Nome:* ${nome}%0A` +
    `*E-mail:* ${email}%0A` +
    `*Telefone:* ${telefone}%0A` +
    `*Sabor:* ${sabor}%0A` +
    `*Mensagem:* ${mensagem}`;

  const numeroWhats = '825971375'; // ⚠️ ALTERE PARA SEU NÚMERO
  const url = `https://wa.me/${numeroWhats}?text=${textoWhats}`;

  window.open(url, '_blank');
  form.reset();
});

// ============ ANIMAÇÃO DE SCROLL (FADE-IN) ============
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.produto-card, .depoimento-card, .galeria-grid img, .sobre-image, .hero-image'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});