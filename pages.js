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

    <div>
      <h1>
        <span data-i18n="hero.h1.l1"></span><br>
        <span data-i18n="hero.h1.l2"></span> <span class="it" data-i18n="hero.h1.l3"></span><br>
        <span data-i18n="hero.h1.l4"></span>
      </h1>
      <p class="lede" data-i18n="hero.lede"></p>
      <div class="cta-row">
        <a class="btn primary" href="#/products/matcha-mansikka" data-i18n="hero.cta"></a>
      </div>
    </div>

    <div class="product" aria-hidden="true">
      <div class="stage">
        <img class="bag" src="assets/hero-bag-sm.png" alt="">
      </div>
      <div class="tag">
        <b>30g</b>
        <small data-i18n="tag.no-sugar"></small>
      </div>
    </div>

    <div class="footnote">
      <div class="col">
        <span class="lbl" data-i18n="hero.meta.origin"></span>
        <span class="val" data-i18n="hero.meta.origin.v"></span>
      </div>
      <div class="col">
        <span class="lbl" data-i18n="hero.meta.quality"></span>
        <span class="val" data-i18n="hero.meta.quality.v"></span>
      </div>
      <div class="col">
        <span class="lbl" data-i18n="hero.meta.made"></span>
        <span class="val" data-i18n="hero.meta.made.v"></span>
      </div>
      <a class="scroll" href="#story"><span class="line"></span> <span data-i18n="hero.scroll"></span></a>
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
        <img src="assets/hero-bag-sm.png" alt="">
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
        <img id="pgallery-img" src="assets/hero-bag-sm.png" alt="">
        <span class="corner" data-i18n="product.name"></span>
        <span class="pager">01 / 03</span>
      </div>
      <div class="thumbs">
        <button class="t on" data-img="assets/hero-bag-sm.png" data-page="01"><img src="assets/hero-bag-sm.png" alt=""></button>
        <button class="t" data-img="assets/strawberry-sm.jpg" data-page="02"><img src="assets/strawberry-sm.jpg" alt=""></button>
        <button class="t" data-img="assets/grass-sm.jpg" data-page="03"><img src="assets/grass-sm.jpg" alt=""></button>
      </div>
    </div>

    <div class="info">
      <span class="eyebrow" data-i18n="product.tag"></span>
      <h1 class="h" data-i18n="product.name"></h1>
      <div class="sub" data-i18n="product.sub"></div>

      <div class="price-block">
        <div class="price">24,99 €</div>
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
  <div class="steps">
    <div class="step">
      <span class="num">1</span>
      <div class="photo"><img src="assets/matcha-bg-sm.jpg" alt=""></div>
      <h4 data-i18n="pdetail.prep.1.h"></h4>
      <p data-i18n="pdetail.prep.1.p"></p>
    </div>
    <div class="divider" aria-hidden="true"></div>
    <div class="step">
      <span class="num">2</span>
      <div class="photo"><img src="assets/matcha-pour-sm.jpg" alt=""></div>
      <h4 data-i18n="pdetail.prep.2.h"></h4>
      <p data-i18n="pdetail.prep.2.p"></p>
    </div>
    <div class="divider" aria-hidden="true"></div>
    <div class="step">
      <span class="num">3</span>
      <div class="photo"><img src="assets/strawberry-sm.jpg" alt=""></div>
      <h4 data-i18n="pdetail.prep.3.h"></h4>
      <p data-i18n="pdetail.prep.3.p"></p>
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
  <div class="cards">
    <article class="ig-card">
      <div class="post">
        <div class="copy">
          <div class="name" data-i18n="insta.1.name"></div>
          <div class="desc" data-i18n="insta.1.desc"></div>
          <div class="edition" data-i18n="insta.1.ed"></div>
        </div>
        <span class="badge" aria-hidden="true"></span>
        <img src="assets/hailey-sm.jpg" alt="">
      </div>
      <div class="bar">
        <span class="av">z</span>
        <div class="who"><span class="h">zennaclub</span><span class="c" data-i18n="insta.1.cap"></span></div>
      </div>
    </article>
    <article class="ig-card">
      <div class="post">
        <div class="quotes">
          <span data-i18n="insta.2.q1"></span>
          <span data-i18n="insta.2.q2"></span>
          <span data-i18n="insta.2.q3"></span>
        </div>
        <span class="badge" aria-hidden="true"></span>
        <img src="assets/grass-sm.jpg" alt="">
      </div>
      <div class="bar">
        <span class="av">z</span>
        <div class="who"><span class="h">zennaclub</span><span class="c" data-i18n="insta.2.cap"></span></div>
      </div>
    </article>
    <article class="ig-card full">
      <div class="post">
        <span class="badge" aria-hidden="true"></span>
        <img src="assets/strawberry-sm.jpg" alt="">
      </div>
      <div class="bar">
        <span class="av">z</span>
        <div class="who"><span class="h">zennaclub</span><span class="c" data-i18n="insta.3.cap"></span></div>
      </div>
    </article>
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
      <a class="btn primary" href="#/products" data-i18n="origin.cta"></a>
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
    <a class="col" href="#about">
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

  return { home, products, productDetail };
})();
