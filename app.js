/* Zenna — SPA orchestrator: router, i18n, cart, signup. */

(function(){
  // ResizeObserver loop warning is a Chromium false-positive on CSS animation/layout settle.
  (function(){
    var O = window.ResizeObserver;
    if(!O) return;
    window.ResizeObserver = function(cb){
      return new O(function(entries, obs){
        requestAnimationFrame(function(){ try{ cb(entries, obs); }catch(e){} });
      });
    };
  })();
  window.addEventListener('error', function(e){
    if(e && e.message && /ResizeObserver loop/.test(e.message)){
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });

  // ── i18n ─────────────────────────────────────────────────────────
  var STORAGE_LANG = 'zenna_lang';
  var STORAGE_CART = 'zenna_cart';

  var state = {
    lang:  localStorage.getItem(STORAGE_LANG) || 'en',
    cart:  JSON.parse(localStorage.getItem(STORAGE_CART) || '[]'),
    qty:   1
  };

  var authUser = null;

  function tt(key){
    var dict = window.I18N[state.lang] || window.I18N.en;
    return (dict && dict[key] != null) ? dict[key] : key;
  }

  // Apply i18n to the whole tree.
  function applyI18n(root){
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function(el){
      el.textContent = tt(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      el.setAttribute('placeholder', tt(el.getAttribute('data-i18n-placeholder')));
    });
    document.documentElement.lang = state.lang;
    document.title = (state.lang==='fi'
      ? 'Zenna — Japanilainen matcha ja suomalaiset mansikat'
      : 'Zenna — Japanese matcha and Finnish strawberries');
  }

  function setLang(l){
    state.lang = l;
    localStorage.setItem(STORAGE_LANG, l);
    document.querySelectorAll('.lang button').forEach(function(b){
      b.classList.toggle('on', b.dataset.lang === l);
    });
    applyI18n();
    renderCart(); // cart count text depends on lang
  }


  // ── router ───────────────────────────────────────────────────────
  function navigate(){
    var hash = location.hash || '#/';

    // loader bar: start
    var loader = document.getElementById('page-loader');
    loader.className = '';
    void loader.offsetWidth;
    loader.classList.add('loading');

    var mount = document.getElementById('page');
    mount.classList.remove('page');
    void mount.offsetWidth; // restart anim

    var html = '';
    if(hash.indexOf('#/products/') === 0){
      html = window.PAGES.productDetail();
      setNavActive('products');
    } else if(hash === '#/products'){
      html = window.PAGES.products();
      setNavActive('products');
    } else if(hash === '#/about'){
      html = window.PAGES.about();
      setNavActive('about');
    } else if(hash === '#/login'){
      if(authUser){ location.hash = '#/profile'; return; }
      html = window.PAGES.login();
      setNavActive('');
    } else if(hash === '#/profile'){
      if(!authUser){ location.hash = '#/login'; return; }
      html = window.PAGES.profile(authUser);
      setNavActive('');
    } else {
      html = window.PAGES.home();
      setNavActive('home');
    }

    mount.innerHTML = html;
    applyI18n(mount);
    mount.classList.add('page');

    // top of page on route change (but preserve in-page anchors)
    if(hash.indexOf('#story') === -1){
      window.scrollTo({top: 0, behavior: 'instant'});
    }

    bindPage();

    // loader bar: finish
    loader.classList.remove('loading');
    loader.classList.add('done');
  }

  function setNavActive(key){
    document.querySelectorAll('.nav .navpill').forEach(function(p){
      p.classList.toggle('active', p.dataset.navkey === key);
    });
  }


  // ── page bindings ────────────────────────────────────────────────
  function bindPage(){
    // product gallery thumbs
    document.querySelectorAll('.pdetail .thumbs .t').forEach(function(t){
      t.addEventListener('click', function(){
        document.querySelectorAll('.pdetail .thumbs .t').forEach(x=>x.classList.remove('on'));
        t.classList.add('on');
        var img = document.getElementById('pgallery-img');
        img.style.opacity = '0';
        setTimeout(function(){
          img.setAttribute('src', t.dataset.img);
          img.style.opacity = '1';
        }, 180);
        var pager = document.querySelector('.pdetail .main .pager');
        if(pager) pager.textContent = t.dataset.page + ' / 03';
      });
    });

    // product detail qty
    var qty = document.getElementById('qty-v');
    if(qty){
      state.qty = 1;
      qty.textContent = '1';
      document.querySelectorAll('.pdetail .qty button').forEach(function(b){
        b.addEventListener('click', function(){
          var v = parseInt(qty.textContent, 10) || 1;
          v += (b.dataset.act === 'inc' ? 1 : -1);
          if(v < 1) v = 1;
          if(v > 12) v = 12;
          state.qty = v;
          qty.textContent = v;
        });
      });
      var addBtn = document.querySelector('[data-act="add"]');
      if(addBtn) addBtn.addEventListener('click', function(){
        addToCart(state.qty);
        flashAdded();
      });
      var buyBtn = document.querySelector('[data-act="buy"]');
      if(buyBtn) buyBtn.addEventListener('click', function(){
        addToCart(state.qty);
        openCart();
      });
    }

    // subscription toggle
    document.querySelectorAll('.popt input').forEach(function(radio){
      radio.addEventListener('change', function(){
        var priceEl = document.getElementById('pd-price');
        if(priceEl) priceEl.textContent = radio.value === 'sub' ? '21,24 €' : '24,99 €';
      });
    });

    // ingredients accordion
    document.querySelectorAll('[data-acc]').forEach(function(it){
      it.querySelector('.row').addEventListener('click', function(){
        it.classList.toggle('open');
      });
    });

    // signup form
    var form = document.getElementById('signup-form');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var input = form.querySelector('input[type=email]');
        var field = input.closest('.field');
        var v = input.value.trim();
        if(!/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(v)){
          field.classList.add('error');
          setTimeout(()=>field.classList.remove('error'), 600);
          return;
        }
        // show thank-you state
        var right = document.getElementById('signup-right');
        right.innerHTML =
          '<div class="thanks">'+
            '<div class="h" data-i18n="signup.thanks.h"></div>'+
            '<div class="p" data-i18n="signup.thanks.p"></div>'+
          '</div>';
        applyI18n(right);
      });
    }

    // hero carousel
    if(document.querySelector('.hero-carousel-track')) initCarousel();

    // prep step carousel
    if(document.querySelector('.prep-carousel')) initPrepCarousel();

    // insta carousel (mobile only)
    if(document.querySelector('.insta-controls')) initInstaCarousel();

    // scroll reveal
    initReveal();

    // ── login / signup form ──────────────────────────────────────────
    var authForm = document.getElementById('auth-form');
    if(authForm){
      var mode = 'signin';
      document.querySelectorAll('.auth-tab').forEach(function(tab){
        tab.addEventListener('click', function(){
          mode = tab.dataset.tab;
          document.querySelectorAll('.auth-tab').forEach(function(t){
            t.classList.toggle('on', t.dataset.tab === mode);
          });
          var cf = document.getElementById('confirm-field');
          var sb = document.getElementById('auth-submit');
          var pw = document.querySelector('[name=confirm]');
          if(mode === 'signup'){
            cf.style.display = ''; pw.required = true;
            sb.setAttribute('data-i18n','auth.signup.btn');
          } else {
            cf.style.display = 'none'; pw.required = false;
            sb.setAttribute('data-i18n','auth.signin.btn');
          }
          applyI18n(document.getElementById('page'));
        });
      });

      authForm.addEventListener('submit', function(e){
        e.preventDefault();
        var email    = authForm.querySelector('[name=email]').value.trim();
        var password = authForm.querySelector('[name=password]').value;
        var errEl    = document.getElementById('auth-error');
        var btn      = document.getElementById('auth-submit');
        errEl.textContent = '';

        if(mode === 'signup'){
          var confirm = authForm.querySelector('[name=confirm]').value;
          if(password !== confirm){
            errEl.textContent = tt('auth.pw.mismatch');
            return;
          }
        }

        btn.disabled = true;

        var promise = mode === 'signin'
          ? window.SB.auth.signInWithPassword({email: email, password: password})
          : window.SB.auth.signUp({email: email, password: password});

        promise.then(function(result){
          btn.disabled = false;
          if(result.error){
            errEl.textContent = result.error.message;
          } else if(mode === 'signup' && !result.data.session){
            errEl.style.color = 'var(--ink)';
            errEl.textContent = tt('auth.check.email');
          } else {
            location.hash = '#/profile';
          }
        });
      });
    }

    // ── profile page ─────────────────────────────────────────────────
    var ordersList = document.getElementById('orders-list');
    if(ordersList){
      var logoutBtn = document.getElementById('logout-btn');
      if(logoutBtn) logoutBtn.addEventListener('click', function(){
        window.SB.auth.signOut().then(function(){ location.hash = '#/'; });
      });

      window.SB.from('orders')
        .select('*')
        .order('created_at', {ascending: false})
        .then(function(result){
          if(result.error || !result.data || result.data.length === 0){
            ordersList.innerHTML = '<p class="orders-empty" data-i18n="profile.orders.empty"></p>';
            applyI18n(ordersList);
            return;
          }
          ordersList.innerHTML = result.data.map(function(order){
            var date  = new Date(order.created_at).toLocaleDateString();
            var items = Array.isArray(order.items)
              ? order.items.map(function(it){ return tt('product.name') + ' × ' + it.qty; }).join(', ')
              : '';
            return '<div class="order-card">'+
              '<div class="order-meta">'+
                '<span class="order-date">'+date+'</span>'+
                '<span class="order-status">'+order.status+'</span>'+
              '</div>'+
              '<div class="order-items">'+items+'</div>'+
              '<div class="order-total">'+fmtEur(order.total)+'</div>'+
            '</div>';
          }).join('');
        });
    }
  }

  function initCarousel(){
    var track = document.querySelector('.hero-carousel-track');
    if(!track) return;
    var wrap = track.parentElement;
    var pos = 0;
    var hovered = false;
    var lastTime = null;
    wrap.addEventListener('mouseenter', function(){ hovered = true; });
    wrap.addEventListener('mouseleave', function(){ hovered = false; });
    function step(now){
      if(!document.body.contains(track)) return;
      if(lastTime !== null){
        var speed = hovered ? 0.01 : 0.02; // px per ms
        pos += speed * (now - lastTime);
        var half = track.scrollWidth / 2;
        if(pos >= half) pos -= half;
        track.style.transform = 'translateX(-' + pos.toFixed(1) + 'px)';
      }
      lastTime = now;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initPrepCarousel(){
    var track = document.querySelector('.prep-track');
    if(!track) return;
    var dots  = document.querySelectorAll('.prep-dot');
    var steps = track.querySelectorAll('.step');
    var total = steps.length;
    var cur   = 0;

    function goTo(idx){
      cur = (idx + total) % total;
      track.style.transform = 'translateX(calc(-' + cur + ' * (100% + 48px)))';
      dots.forEach(function(d){ d.classList.toggle('on', +d.dataset.idx === cur); });
    }

    document.querySelector('.prep-prev').addEventListener('click', function(){ goTo(cur - 1); });
    document.querySelector('.prep-next').addEventListener('click', function(){ goTo(cur + 1); });
    dots.forEach(function(d){ d.addEventListener('click', function(){ goTo(+d.dataset.idx); }); });

    // touch/swipe
    var startX = null;
    track.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend', function(e){
      if(startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if(Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1);
      startX = null;
    });
  }

  function initInstaCarousel(){
    if(window.innerWidth > 640) return;
    var track = document.querySelector('.insta .cards');
    var dots  = document.querySelectorAll('.insta-dot');
    if(!track || !dots.length) return;
    var total = track.querySelectorAll('.ig-card').length;
    var cur   = 0;

    function goTo(idx){
      cur = (idx + total) % total;
      track.style.transform = 'translateX(calc(-' + cur + ' * 100%))';
      dots.forEach(function(d){ d.classList.toggle('on', +d.dataset.idx === cur); });
    }

    document.querySelector('.insta-prev').addEventListener('click', function(){ goTo(cur - 1); });
    document.querySelector('.insta-next').addEventListener('click', function(){ goTo(cur + 1); });
    dots.forEach(function(d){ d.addEventListener('click', function(){ goTo(+d.dataset.idx); }); });

    var startX = null;
    track.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend', function(e){
      if(startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if(Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1);
      startX = null;
    });
  }

  function flashAdded(){
    var el = document.getElementById('pd-added');
    if(!el) return;
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'), 2200);
  }

  // custom smooth scroll — easeOutQuart feels much silkier than CSS smooth
  function smoothScrollTo(y, duration){
    var start = window.scrollY;
    var diff  = y - start;
    var startTime = null;
    function ease(t){ return 1 - Math.pow(1 - t, 4); }
    function step(now){
      if(!startTime) startTime = now;
      var t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, start + diff * ease(t));
      if(t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // scroll reveal — fires once per element using IntersectionObserver
  function initReveal(){
    var sel = [
      '.pcard',
      '.triplet .item',
      '.insta .card',
      '.linkfooter .col',
      '.about-value',
      '.origin h2',
      '.origin .bottom',
      '.signup .wrap > *',
      '.pdetail .about',
      '.pdetail .ingredients .item',
      '.prep-carousel',
      '.about-text',
      '.about-values'
    ].join(',');

    var els = Array.from(document.querySelectorAll(sel));
    if(!els.length) return;

    // stagger siblings within the same parent
    var seen = new Set();
    els.forEach(function(el){ seen.add(el.parentElement); });
    seen.forEach(function(parent){
      var kids = Array.from(parent.children).filter(function(c){ return els.includes(c); });
      kids.forEach(function(c, i){ c.style.transitionDelay = (i * 0.1) + 's'; });
    });

    els.forEach(function(el){ el.classList.add('reveal'); });

    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    els.forEach(function(el){ obs.observe(el); });
  }


  // ── cart ─────────────────────────────────────────────────────────
  var PRODUCT = {
    id: 'matcha-mansikka',
    price: 24.99,
    img: 'assets/hero-bag-sm.webp'
  };

  function saveCart(){ localStorage.setItem(STORAGE_CART, JSON.stringify(state.cart)); }

  function addToCart(qty){
    qty = qty || 1;
    var ex = state.cart.find(i => i.id === PRODUCT.id);
    if(ex){ ex.qty += qty; }
    else { state.cart.push({id: PRODUCT.id, qty: qty, price: PRODUCT.price, img: PRODUCT.img}); }
    saveCart();
    renderCart();
  }
  function setQty(id, qty){
    var it = state.cart.find(i => i.id === id);
    if(!it) return;
    if(qty <= 0){
      state.cart = state.cart.filter(i => i.id !== id);
    } else {
      it.qty = qty;
    }
    saveCart();
    renderCart();
  }
  function removeFromCart(id){
    state.cart = state.cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
  }

  function cartCount(){
    return state.cart.reduce((a,i)=>a + i.qty, 0);
  }
  function cartTotal(){
    return state.cart.reduce((a,i)=>a + i.qty * i.price, 0);
  }
  function fmtEur(n){
    // 24,99 € format (fi style for both langs to match brand voice)
    return n.toFixed(2).replace('.', ',') + ' €';
  }

  function renderCart(){
    // nav badge
    var cnt = cartCount();
    var badge = document.getElementById('cart-badge');
    if(badge){
      badge.textContent = cnt;
      badge.style.display = cnt > 0 ? 'inline-flex' : 'none';
    }
    // drawer
    var body = document.getElementById('cart-body');
    var foot = document.getElementById('cart-foot');
    var head = document.getElementById('cart-head-count');
    if(!body) return;

    var lbl = cnt === 0 ? '0 ' + tt('cart.count.plural') :
              cnt === 1 ? '1 ' + tt('cart.count.singular') :
                          cnt + ' ' + tt('cart.count.plural');
    head.textContent = lbl;

    if(state.cart.length === 0){
      body.innerHTML =
        '<div class="empty">'+
          '<h4>'+tt('cart.empty.h')+'</h4>'+
          '<p>'+tt('cart.empty.p')+'</p>'+
          '<button class="btn primary">'+tt('cart.empty.cta')+'</button>'+
        '</div>';
      foot.style.display = 'none';
      var em = body.querySelector('.btn');
      em && em.addEventListener('click', function(){ closeCart(); location.hash = '#/products'; });
      return;
    }

    var rows = state.cart.map(function(it){
      var name = tt('product.name');
      var sub  = tt('product.sub');
      return ''+
        '<div class="citem">'+
          '<div class="img"><img src="'+it.img+'" alt=""></div>'+
          '<div class="right">'+
            '<div class="top">'+
              '<div><div class="name">'+name+'</div><div class="sub">'+sub+'</div></div>'+
              '<div class="price">'+fmtEur(it.price * it.qty)+'</div>'+
            '</div>'+
            '<div class="bot">'+
              '<div class="qty">'+
                '<button data-cact="dec" data-id="'+it.id+'">−</button>'+
                '<span class="v">'+it.qty+'</span>'+
                '<button data-cact="inc" data-id="'+it.id+'">+</button>'+
              '</div>'+
              '<button class="remove" data-cact="rm" data-id="'+it.id+'">'+tt('cart.remove')+'</button>'+
            '</div>'+
          '</div>'+
        '</div>';
    }).join('');

    body.innerHTML = rows;
    foot.style.display = '';
    foot.innerHTML =
      '<div class="row"><span class="l">'+tt('cart.subtotal')+'</span><span class="v">'+fmtEur(cartTotal())+'</span></div>'+
      '<div class="small">'+tt('cart.tax')+'</div>'+
      '<button class="btn solid" id="checkout-btn">'+tt('cart.checkout')+'</button>'+
      '<button class="continue" id="continue-btn">'+tt('cart.continue')+'</button>';

    body.querySelectorAll('[data-cact]').forEach(function(b){
      b.addEventListener('click', function(){
        var id = b.dataset.id;
        var act = b.dataset.cact;
        var it = state.cart.find(i=>i.id===id);
        if(!it) return;
        if(act === 'inc') setQty(id, Math.min(12, it.qty + 1));
        if(act === 'dec') setQty(id, it.qty - 1);
        if(act === 'rm') removeFromCart(id);
      });
    });
    document.getElementById('continue-btn').addEventListener('click', closeCart);
    document.getElementById('checkout-btn').addEventListener('click', checkout);
  }

  function checkout(){
    if(authUser){
      var snapshot = state.cart.map(function(i){ return {id:i.id, qty:i.qty, price:i.price}; });
      window.SB.from('orders').insert({
        user_id: authUser.id,
        items:   snapshot,
        total:   cartTotal(),
        status:  'confirmed'
      }).then(function(result){
        if(result.error) console.warn('Order save failed:', result.error.message);
      });
    }
    state.cart = [];
    saveCart();
    var body = document.getElementById('cart-body');
    var foot = document.getElementById('cart-foot');
    foot.style.display = 'none';
    body.innerHTML =
      '<div class="done">'+
        '<div class="seal">✓</div>'+
        '<h4>'+tt('cart.done.h')+'</h4>'+
        '<p>'+tt('cart.done.p')+'</p>'+
        '<button class="btn primary" id="done-cta">'+tt('cart.done.cta')+'</button>'+
      '</div>';
    var b = document.getElementById('done-cta');
    b.addEventListener('click', function(){
      closeCart();
      renderCart();
      location.hash = '#/products';
    });
    // badge
    var badge = document.getElementById('cart-badge');
    if(badge){ badge.textContent = '0'; badge.style.display = 'none'; }
    document.getElementById('cart-head-count').textContent = '0 ' + tt('cart.count.plural');
  }

  function openCart(){
    document.getElementById('cart-drawer').classList.add('on');
    document.getElementById('scrim').classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function closeCart(){
    document.getElementById('cart-drawer').classList.remove('on');
    document.getElementById('scrim').classList.remove('on');
    document.body.style.overflow = '';
  }


  // ── boot ─────────────────────────────────────────────────────────
  function boot(){
    // lang toggle
    document.querySelectorAll('.lang button').forEach(function(b){
      b.addEventListener('click', function(){ setLang(b.dataset.lang); });
    });
    // initial lang application + UI sync
    document.querySelectorAll('.lang button').forEach(function(b){
      b.classList.toggle('on', b.dataset.lang === state.lang);
    });

    // cart open/close
    document.getElementById('cart-toggle').addEventListener('click', openCart);
    document.getElementById('scrim').addEventListener('click', closeCart);
    document.querySelector('.cart-drawer .close').addEventListener('click', closeCart);

    // custom smooth scroll for in-page anchor links
    document.addEventListener('click', function(e){
      var a = e.target.closest('a[href^="#"]');
      if(!a) return;
      var href = a.getAttribute('href');
      if(href.length < 2 || href[1] === '/') return; // skip router links
      var target = document.getElementById(href.slice(1));
      if(!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 64;
      smoothScrollTo(top, 750);
    });

    // hide nav on scroll down, reveal on scroll up + scroll-to-top button
    (function(){
      var lastY = 0;
      var nav = document.querySelector('.nav');
      var scrollBtn = document.getElementById('scroll-top');
      window.addEventListener('scroll', function(){
        var y = window.scrollY;
        if(y > lastY && y > 80) nav.classList.add('nav-hidden');
        else nav.classList.remove('nav-hidden');
        scrollBtn.classList.toggle('visible', y > 400);
        lastY = y;
      }, {passive: true});
      scrollBtn.addEventListener('click', function(){
        smoothScrollTo(0, 600);
      });
    })();

    // router
    window.addEventListener('hashchange', navigate);

    // account icon → login or profile
    var accountBtn = document.querySelector('.icon-btn[aria-label="Account"]');
    if(accountBtn) accountBtn.addEventListener('click', function(){
      location.hash = authUser ? '#/profile' : '#/login';
    });

    // Supabase auth listener — fires INITIAL_SESSION immediately, then on changes
    window.SB.auth.onAuthStateChange(function(event, session){
      authUser = session ? session.user : null;
      updateAccountIcon();
      if(event === 'INITIAL_SESSION'){
        navigate();
        applyI18n();
        renderCart();
      }
      if(event === 'SIGNED_IN'  && location.hash === '#/login')   { location.hash = '#/profile'; }
      if(event === 'SIGNED_OUT' && location.hash === '#/profile') { location.hash = '#/login'; }
    });
  }

  function updateAccountIcon(){
    var btn = document.querySelector('.icon-btn[aria-label="Account"]');
    if(!btn) return;
    btn.classList.toggle('auth-on', !!authUser);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
