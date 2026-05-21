/* Zenna — page templates.
   Each function returns an HTML string. Strings carrying copy use
   data-i18n="key" so app.js can re-render text on language change. */

window.PAGES = (function(){

  // ───── HOME ─────
  function home(){
    return `
<section class="hero">
  <div class="grid">
    <div class="meta">
      <div class="mleft">
        <span class="num">01</span>
        <span class="eyebrow on-red" data-i18n="hero.eyebrow.left"></span>
      </div>
      <div class="eyebrow on-red" data-i18n="hero.eyebrow.right"></div>
    </div>

    <!-- headline — full width, sits above the bag (z-index 3) -->
    <div class="hero-h1-wrap">
      <h1>
        <span class="hero-lw"><span class="hero-line" data-i18n="hero.h1.l1"></span></span>
        <span class="hero-lw"><span class="hero-line"><span data-i18n="hero.h1.l2"></span> <span class="it" data-i18n="hero.h1.l3"></span> <span data-i18n="hero.h1.l4"></span></span></span>
      </h1>
      <a class="btn hero-cta" href="#/products/matcha-mansikka" data-i18n="hero.cta"></a>
    </div>

    <!-- bag — spans rows 2–4, z-index 2 (below headline, above carousel) -->
    <div class="product" aria-hidden="true">
      <div class="stage">
        <img class="bag" src="assets/hero-bag-sm.webp" alt="">
      </div>
      <div class="tag">
        <b>30g</b>
        <small data-i18n="tag.no-sugar"></small>
      </div>
    </div>

    <!-- auto-scrolling carousel — full width, slides behind the bag -->
    <div class="hero-carousel">
      <div class="hero-carousel-track">
        <div class="hero-thumb"><img src="assets/carousel2.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel4.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel7.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel1.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel8.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel3.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel5.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel6.webp" alt=""></div>
        <!-- duplicated for seamless loop -->
        <div class="hero-thumb"><img src="assets/carousel2.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel4.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel7.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel1.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel8.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel3.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel5.webp" alt=""></div>
        <div class="hero-thumb"><img src="assets/carousel6.webp" alt=""></div>
      </div>
    </div>

  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="track">
    ${marqueeRow()}${marqueeRow()}
  </div>
</div>

<section class="triplet" id="story">
  <div class="head">
    <h2>
      <span data-i18n="tri.head"></span> <span class="it" data-i18n="tri.head.it"></span>
    </h2>
    <div class="right" data-i18n="tri.head.right"></div>
  </div>
  <div class="row">
    <div class="cell">
      <span class="num">i.</span>
      <h4 data-i18n="tri.1.h"></h4>
      <p data-i18n="tri.1.p"></p>
    </div>
    <div class="cell">
      <span class="num">ii.</span>
      <h4 data-i18n="tri.2.h"></h4>
      <p data-i18n="tri.2.p"></p>
    </div>
    <div class="cell">
      <span class="num">iii.</span>
      <h4 data-i18n="tri.3.h"></h4>
      <p data-i18n="tri.3.p"></p>
    </div>
  </div>
</section>

${signupSection()}

${instaSection()}

${originSection()}

${linkFooter()}
    `;
  }

  // ───── PRODUCTS LIST ─────
  function products(){
    return `
<section class="plist">
  <nav class="crumbs">
    <a href="#/" data-i18n="plist.crumbs.home"></a>
    <span class="sep">·</span>
    <span data-i18n="plist.crumbs.products"></span>
  </nav>

  <div class="head">
    <div>
      <span class="eyebrow" data-i18n="plist.eyebrow"></span>
      <h1><span data-i18n="plist.h1.l1"></span> <span class="it" data-i18n="plist.h1.it"></span></h1>
    </div>
    <div class="right" data-i18n="plist.sub"></div>
  </div>

  <div class="filters">
    <button class="f on" data-filter="all"><span data-i18n="plist.filter.all"></span></button>
    <button class="f" data-filter="matcha"><span data-i18n="plist.filter.matcha"></span></button>
    <button class="f" data-filter="new"><span data-i18n="plist.filter.new"></span></button>
    <span class="count" data-i18n="plist.count"></span>
  </div>

  <div class="grid">
    <a class="pcard" href="#/products/matcha-mansikka">
      <div class="frame">
        <span class="tag" data-i18n="product.tag"></span>
        <img src="assets/hero-bag-sm.webp" alt="">
        <span class="quick" aria-hidden="true">+</span>
      </div>
      <div class="meta">
        <div>
          <div class="name" data-i18n="product.name"></div>
          <div class="sub" data-i18n="product.sub"></div>
        </div>
        <div>
          <div class="price">24,99 €</div>
          <div class="size" data-i18n="product.size"></div>
        </div>
      </div>
    </a>

    <div class="pcard placeholder" aria-hidden="true">
      <div class="frame"><span class="lbl" data-i18n="plist.placeholder"></span></div>
      <div class="meta">
        <div><div class="name">·</div></div>
      </div>
    </div>

    <div class="pcard placeholder" aria-hidden="true">
      <div class="frame"><span class="lbl" data-i18n="plist.placeholder"></span></div>
      <div class="meta">
        <div><div class="name">·</div></div>
      </div>
    </div>
  </div>
</section>

${signupSection()}

${linkFooter()}
    `;
  }

  // ───── PRODUCT DETAIL ─────
  function productDetail(){
    return `
<section class="pdetail">
  <nav class="crumbs">
    <a href="#/" data-i18n="plist.crumbs.home"></a>
    <span class="sep">·</span>
    <a href="#/products" data-i18n="plist.crumbs.products"></a>
    <span class="sep">·</span>
    <span data-i18n="pdetail.crumb.product"></span>
  </nav>

  <div class="top">
    <div class="gallery">
      <div class="main">
        <img id="pgallery-img" src="assets/hero-bag-sm.webp" alt="">
        <span class="corner" data-i18n="product.name"></span>
        <span class="pager">01 / 03</span>
      </div>
      <div class="thumbs">
        <button class="t on" data-img="assets/hero-bag-sm.webp" data-page="01"><img src="assets/hero-bag-sm.webp" alt=""></button>
        <button class="t" data-img="assets/closeup_matcha9.webp" data-page="02"><img src="assets/closeup_matcha9.webp" alt="Close-up of matcha powder"></button>
        <button class="t" data-img="assets/closeup_matcha10.webp" data-page="03"><img src="assets/closeup_matcha10.webp" alt="Close-up of matcha"></button>
      </div>
    </div>

    <div class="info">
      <span class="eyebrow" data-i18n="product.tag"></span>
      <h1 class="h" data-i18n="product.name"></h1>
      <div class="sub" data-i18n="product.sub"></div>

      <div class="purchase-opts">
        <label class="popt">
          <input type="radio" name="popt" value="once" checked>
          <div class="popt-inner">
            <span class="popt-label" data-i18n="pdetail.opt.once"></span>
            <span class="popt-sub" data-i18n="pdetail.opt.once.sub"></span>
          </div>
        </label>
        <label class="popt">
          <input type="radio" name="popt" value="sub">
          <div class="popt-inner">
            <span class="popt-label" data-i18n="pdetail.opt.sub"></span>
            <span class="popt-sub" data-i18n="pdetail.opt.sub.sub"></span>
          </div>
          <span class="popt-badge" data-i18n="pdetail.opt.sub.badge"></span>
        </label>
      </div>

      <div class="price-block">
        <div class="price" id="pd-price">24,99 €</div>
        <div class="tax" data-i18n="pdetail.tax"></div>
      </div>

      <div class="qty-row">
        <span class="qlbl" data-i18n="pdetail.qty"></span>
        <div class="qty">
          <button data-act="dec" aria-label="−">−</button>
          <span class="v" id="qty-v">1</span>
          <button data-act="inc" aria-label="+">+</button>
        </div>
        <div class="ctas">
          <button class="btn solid" data-act="add" data-i18n="pdetail.addtobag"></button>
          <button class="btn primary" data-act="buy" data-i18n="pdetail.buynow"></button>
        </div>
      </div>
      <div class="added" id="pd-added">
        <span class="check">✓</span>
        <span data-i18n="pdetail.added"></span>
      </div>

      <div class="about">
        <span class="eyebrow" data-i18n="pdetail.about.lbl"></span>
        <h3 data-i18n="pdetail.about.h"></h3>
        <p data-i18n="pdetail.about.p"></p>
        <div class="specs">
          <div class="s">
            <span class="l" data-i18n="pdetail.spec.origin.l"></span>
            <span class="v" data-i18n="pdetail.spec.origin.v"></span>
          </div>
          <div class="s">
            <span class="l" data-i18n="pdetail.spec.vol.l"></span>
            <span class="v" data-i18n="pdetail.spec.vol.v"></span>
          </div>
          <div class="s">
            <span class="l" data-i18n="pdetail.spec.caff.l"></span>
            <span class="v" data-i18n="pdetail.spec.caff.v"></span>
          </div>
        </div>
      </div>

      <div class="ingredients">
        <div class="head-row">
          <h3 data-i18n="pdetail.ing.h"></h3>
        </div>
        <div class="item open" data-acc>
          <div class="row"><span class="name" data-i18n="pdetail.ing.1.name"></span><span class="plus">+</span></div>
          <div class="body" data-i18n="pdetail.ing.1.desc"></div>
        </div>
        <div class="item" data-acc>
          <div class="row"><span class="name" data-i18n="pdetail.ing.2.name"></span><span class="plus">+</span></div>
          <div class="body" data-i18n="pdetail.ing.2.desc"></div>
        </div>
        <div class="item" data-acc>
          <div class="row"><span class="name" data-i18n="pdetail.ing.3.name"></span><span class="plus">+</span></div>
          <div class="body" data-i18n="pdetail.ing.3.desc"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="prep">
  <div class="head">
    <h2><span data-i18n="pdetail.prep.h.l1"></span> <span class="it" data-i18n="pdetail.prep.h.it"></span></h2>
    <span class="eyebrow" data-i18n="pdetail.prep.eyebrow"></span>
  </div>
  <div class="prep-carousel">
    <div class="prep-track">
      <div class="step">
        <span class="num">1</span>
        <div class="photo"><img src="assets/matcha-bg-sm.webp" alt=""></div>
        <h4 data-i18n="pdetail.prep.1.h"></h4>
        <p data-i18n="pdetail.prep.1.p"></p>
      </div>
      <div class="step">
        <span class="num">2</span>
        <div class="photo"><img src="assets/matcha-pour-sm.webp" alt=""></div>
        <h4 data-i18n="pdetail.prep.2.h"></h4>
        <p data-i18n="pdetail.prep.2.p"></p>
      </div>
      <div class="step">
        <span class="num">3</span>
        <div class="photo"><img src="assets/strawberry-sm.webp" alt=""></div>
        <h4 data-i18n="pdetail.prep.3.h"></h4>
        <p data-i18n="pdetail.prep.3.p"></p>
      </div>
    </div>
    <div class="prep-controls">
      <button class="prep-prev" aria-label="Previous step">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div class="prep-dots">
        <button class="prep-dot on" data-idx="0" aria-label="Step 1"></button>
        <button class="prep-dot" data-idx="1" aria-label="Step 2"></button>
        <button class="prep-dot" data-idx="2" aria-label="Step 3"></button>
      </div>
      <button class="prep-next" aria-label="Next step">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
      </button>
    </div>
  </div>
</section>

${instaSection()}

${signupSection()}

${linkFooter()}
    `;
  }

  // ───── reusable section snippets ─────
  function marqueeRow(){
    return `<span class="item">
      <span data-i18n="marquee.a"></span> <span class="star">✦</span>
      <span data-i18n="marquee.b"></span> <span class="star">✦</span>
      <span data-i18n="marquee.a"></span> <span class="star">✦</span>
      <span data-i18n="marquee.b"></span> <span class="star">✦</span>
    </span>`;
  }

  function signupSection(){
    return `
<section class="signup">
  <div class="wrap">
    <div class="left">
      <span class="eyebrow" data-i18n="signup.eyebrow"></span>
      <h2>
        <span data-i18n="signup.h2.l1"></span>
        <span class="it" data-i18n="signup.h2.it"></span>
        <span data-i18n="signup.h2.l2"></span>
      </h2>
      <p class="sub" data-i18n="signup.sub"></p>
      <p class="small" data-i18n="signup.small"></p>
    </div>
    <div class="right" id="signup-right">
      <form id="signup-form">
        <label class="field">
          <input type="email" required name="email" data-i18n-placeholder="signup.placeholder" aria-label="email">
          <span class="arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
          </span>
        </label>
        <button class="btn primary" type="submit" data-i18n="signup.button"></button>
        <div class="perks">
          <span class="p"><span class="d"></span> <span data-i18n="signup.perk.1"></span></span>
          <span class="p"><span class="d"></span> <span data-i18n="signup.perk.2"></span></span>
          <span class="p"><span class="d"></span> <span data-i18n="signup.perk.3"></span></span>
        </div>
      </form>
    </div>
  </div>
</section>`;
  }

  function instaSection(){
    return `
<section class="insta">
  <div class="head">
    <h2><span data-i18n="insta.h.l1"></span> <span class="it" data-i18n="insta.h.it"></span></h2>
    <div class="meta">
      <span class="handle">@zennaclub</span>
      <span class="small" data-i18n="insta.sub"></span>
    </div>
  </div>
  <div class="insta-track-wrap">
  <div class="cards">
    <article class="ig-card full">
      <div class="post">
        <span class="badge" aria-hidden="true"></span>
        <img src="assets/post.webp" alt="Hailey Bieber x Zenna Matcha">
      </div>
      <div class="bar">
        <span class="av">z</span>
        <div class="who"><span class="h">zennaclub</span><span class="c" data-i18n="insta.1.cap"></span></div>
      </div>
    </article>
    <article class="ig-card full">
      <div class="post">
        <span class="badge" aria-hidden="true"></span>
        <img src="assets/post2.webp" alt="Matcha — the haters edition">
      </div>
      <div class="bar">
        <span class="av">z</span>
        <div class="who"><span class="h">zennaclub</span><span class="c" data-i18n="insta.2.cap"></span></div>
      </div>
    </article>
    <article class="ig-card full">
      <div class="post">
        <span class="badge" aria-hidden="true"></span>
        <img src="assets/strawberry-sm.webp" alt="">
      </div>
      <div class="bar">
        <span class="av">z</span>
        <div class="who"><span class="h">zennaclub</span><span class="c" data-i18n="insta.3.cap"></span></div>
      </div>
    </article>
  </div>
  </div>
  <div class="insta-controls">
    <button class="insta-prev" aria-label="Previous photo">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <div class="insta-dots">
      <button class="insta-dot on" data-idx="0" aria-label="Photo 1"></button>
      <button class="insta-dot" data-idx="1" aria-label="Photo 2"></button>
      <button class="insta-dot" data-idx="2" aria-label="Photo 3"></button>
    </div>
    <button class="insta-next" aria-label="Next photo">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </button>
  </div>
</section>`;
  }

  function originSection(){
    return `
<section class="origin" id="about">
  <div class="signature" aria-hidden="true">Zenna</div>
  <div class="meta">
    <span class="eyebrow on-red" data-i18n="origin.eyebrow"></span>
    <span class="eyebrow on-red" data-i18n="origin.place"></span>
  </div>
  <h2><span data-i18n="origin.h2.l1"></span> <span class="it" data-i18n="origin.h2.it"></span></h2>
  <div class="bottom">
    <p class="lede" data-i18n="origin.lede"></p>
    <div class="right">
      <span class="year" data-i18n="origin.year"></span>
      <a class="btn primary" href="#/about" data-i18n="origin.cta"></a>
    </div>
  </div>
</section>`;
  }

  function linkFooter(){
    return `
<section class="linkfooter">
  <div class="grid">
    <a class="col" href="#/products">
      <span class="lbl" data-i18n="lf.1.lbl"></span>
      <span class="big"><span data-i18n="lf.1.h"></span> <span class="arr">↗</span></span>
      <span class="detail" data-i18n="lf.1.d"></span>
    </a>
    <a class="col" href="#/about">
      <span class="lbl" data-i18n="lf.2.lbl"></span>
      <span class="big"><span data-i18n="lf.2.h"></span> <span class="arr">↗</span></span>
      <span class="detail" data-i18n="lf.2.d"></span>
    </a>
    <a class="col" href="tel:+358000000000">
      <span class="lbl" data-i18n="lf.3.lbl"></span>
      <span class="big"><span data-i18n="lf.3.h"></span> <span class="arr">↗</span></span>
      <span class="detail" data-i18n="lf.3.d"></span>
    </a>
    <a class="col" href="mailto:hi@zenna.fi">
      <span class="lbl" data-i18n="lf.4.lbl"></span>
      <span class="big"><span data-i18n="lf.4.h"></span> <span class="arr">↗</span></span>
      <span class="detail" data-i18n="lf.4.d"></span>
    </a>
  </div>
</section>`;
  }

  // ───── ABOUT ─────
  function about(){
    return `
<section class="about-page">
  <div class="about-inner">
    <div class="about-head">
      <span class="eyebrow" data-i18n="about.eyebrow"></span>
      <h1><span data-i18n="about.h1.l1"></span> <span class="it" data-i18n="about.h1.it"></span></h1>
    </div>
    <div class="about-body">
      <div class="about-text">
        <p class="about-lede" data-i18n="about.lede"></p>
        <p data-i18n="about.p2"></p>
        <p data-i18n="about.p3"></p>
      </div>
      <div class="about-values">
        <div class="about-value">
          <span class="about-value-num">01</span>
          <h3 data-i18n="about.v1.h"></h3>
          <p data-i18n="about.v1.p"></p>
        </div>
        <div class="about-value">
          <span class="about-value-num">02</span>
          <h3 data-i18n="about.v2.h"></h3>
          <p data-i18n="about.v2.p"></p>
        </div>
        <div class="about-value">
          <span class="about-value-num">03</span>
          <h3 data-i18n="about.v3.h"></h3>
          <p data-i18n="about.v3.p"></p>
        </div>
      </div>
    </div>
  </div>
</section>
${linkFooter()}`;
  }

  // ───── LOGIN / SIGNUP ─────
  function login(){
    return `
<section class="auth-page">
  <div class="auth-card">
    <a href="#/" class="auth-logo">
      <img src="assets/zenna-wordmark.webp" alt="Zenna">
    </a>
    <div class="auth-tabs">
      <button class="auth-tab on" data-tab="signin" data-i18n="auth.signin"></button>
      <button class="auth-tab" data-tab="signup" data-i18n="auth.signup"></button>
    </div>
    <form id="auth-form" novalidate>
      <label class="field auth-field">
        <input type="email" name="email" autocomplete="email" data-i18n-placeholder="auth.email">
      </label>
      <label class="field auth-field">
        <input type="password" name="password" autocomplete="current-password" data-i18n-placeholder="auth.password">
      </label>
      <label class="field auth-field" id="confirm-field" style="display:none">
        <input type="password" name="confirm" autocomplete="new-password" data-i18n-placeholder="auth.confirm">
      </label>
      <div class="auth-error" id="auth-error"></div>
      <button class="btn solid auth-submit" type="submit" id="auth-submit" data-i18n="auth.signin.btn"></button>
    </form>
  </div>
</section>`;
  }

  // ───── PROFILE ─────
  function profile(user){
    var initial = (user.email || 'Z')[0].toUpperCase();
    return `
<section class="profile-page">
  <div class="profile-wrap">
    <div class="profile-head">
      <div class="profile-avatar">${initial}</div>
      <div class="profile-info">
        <div class="profile-email">${user.email}</div>
        <span class="eyebrow" data-i18n="profile.since"></span>
      </div>
      <button class="btn" id="logout-btn" data-i18n="profile.logout"></button>
    </div>
    <hr class="hair">
    <div class="profile-orders">
      <h2 class="profile-orders-h" data-i18n="profile.orders.h"></h2>
      <div id="orders-list">
        <p class="orders-loading" data-i18n="profile.orders.loading"></p>
      </div>
    </div>
  </div>
</section>`;
  }

  return { home, products, productDetail, about, login, profile };
})();
