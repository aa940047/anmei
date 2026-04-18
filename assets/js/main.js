(() => {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const current = location.pathname.split('/').pop() || 'index.html';

  const markActive = (scope) => {
    scope?.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === current) a.classList.add('active');
    });
  };

  markActive(document.querySelector('.nav-links'));
  markActive(mobileMenu);

  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  menuBtn?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(!!open));
  });

  mobileMenu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => obs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const field = (name) => form.querySelector(`[name="${name}"]`);
  const error = (name, text = '') => {
    const el = form.querySelector(`[data-error="${name}"]`);
    if (el) el.textContent = text;
  };

  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ['name', 'phone', 'interest', 'message'].forEach((n) => error(n, ''));
    if (status) {
      status.textContent = '';
      status.className = 'form-status';
    }

    const values = {
      name: field('name')?.value.trim() || '',
      phone: field('phone')?.value.trim() || '',
      email: field('email')?.value.trim() || '',
      interest: field('interest')?.value.trim() || '',
      message: field('message')?.value.trim() || ''
    };

    let hasError = false;

    if (!values.name) { error('name', '請輸入姓名'); hasError = true; }

    const phoneValid = /^[0-9+\-()\s]{8,20}$/.test(values.phone);
    if (!values.phone || !phoneValid) { error('phone', '請輸入有效電話'); hasError = true; }

    if (values.email) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
      if (!emailValid) { error('email', 'Email 格式不正確'); hasError = true; }
    }

    if (!values.interest) { error('interest', '請選擇需求類型'); hasError = true; }
    if (!values.message) { error('message', '請填寫需求內容'); hasError = true; }

    if (hasError) {
      if (status) {
        status.textContent = '請修正欄位後再送出。';
        status.classList.add('fail');
      }
      return;
    }

    const subject = encodeURIComponent(`安美建設官網來詢｜${values.name}`);
    const body = encodeURIComponent(
      `姓名：${values.name}\n電話：${values.phone}\nEmail：${values.email || '-'}\n需求：${values.interest}\n\n內容：\n${values.message}`
    );

    if (status) {
      status.textContent = '資料檢查完成，將開啟您的 Email 寄送。';
      status.classList.add('ok');
    }

    window.location.href = `mailto:sales@anmei.com.tw?subject=${subject}&body=${body}`;
  });
})();
