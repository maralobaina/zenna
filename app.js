/* Zenna — SPA orchestrator: router, i18n, cart, signup. */

(function(){
  // ── benign warning silencers + dev-asset auth patch ──────────────
  // ResizeObserver loop warning is a Chromium false-positive when CSS
  // animations + layout settle in the same frame. Wrap callbacks in rAF.
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
    route: location.hash || '#/',
    qty:   1
  };

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
    state.route = hash;

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
    } else if(hash === '#about' || hash === '#/about'){
      // about scrolls into origin on home
      mount.innerHTML = window.PAGES.home();
      applyI18n(mount);
      mount.classList.add('page');
      setNavActive('about');
      setTimeout(function(){
        var t = document.getElementById('about');
        if(t) t.scrollIntoView({behavior:'instant', block:'start'});
      }, 0);
      bindPage();
      return;
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

    // empty-cart "browse" link
    var em = document.querySelector('.cart-drawer .empty .btn');
    if(em) em.addEventListener('click', function(){ closeCart(); location.hash = '#/products'; });
  }

  function flashAdded(){
    var el = document.getElementById('pd-added');
    if(!el) return;
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'), 2200);
  }


  // ── cart ─────────────────────────────────────────────────────────
  var PRODUCT = {
    id: 'matcha-mansikka',
    price: 24.99,
    img: 'assets/hero-bag-sm.png'
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

    // router
    window.addEventListener('hashchange', navigate);
    navigate();

    // first render of cart count + i18n (chrome lives outside #page)
    applyI18n();
    renderCart();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
