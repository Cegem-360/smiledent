// SmileDent — Home page (v2 — playful, bigger fonts, more banners, featured first)
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

// ============================================
// HERO SLIDER
// ============================================
const HeroSlider = () => {
  const slides = [
    { img: 'assets/banner-ads-dna.webp', alt: 'Curasept ADS DNA', path: '/bolt' },
    { img: 'assets/banner-velvet.png', alt: 'Curaprox Velvet', path: '/bolt' },
    { img: 'assets/banner-biosmalto.png', alt: 'Curasept Biosmalto', path: '/bolt' },
  ];
  const [idx, setIdx] = useStateH(0);
  useEffectH(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const go = (n) => setIdx((n + slides.length) % slides.length);
  return (
    <div className="hero-slider">
      <div className="hero-track">
        {slides.map((s, i) => (
          <div key={i} className={'hero-slide' + (i === idx ? ' active' : '')}>
            <img src={s.img} alt={s.alt} />
          </div>
        ))}
        <button className="hero-arrow prev" onClick={() => go(idx - 1)} aria-label="Előző">
          <Icon name="chevronLeft" size={22}/>
        </button>
        <button className="hero-arrow next" onClick={() => go(idx + 1)} aria-label="Következő">
          <Icon name="chevronRight" size={22}/>
        </button>
        <div className="hero-dots">
          {slides.map((_, i) => (
            <span key={i} className={'hero-dot' + (i === idx ? ' active' : '')} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MARQUEE STRIP — bottom of hero
// ============================================
const MarqueeStrip = () => {
  const items = ['Curaprox', 'Curasept', 'TEPE', 'Oral-B', 'GC Tooth Mousse', 'GENGIGEL', 'Curaprox', 'Curasept', 'TEPE', 'Oral-B', 'GC Tooth Mousse', 'GENGIGEL'];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((it, i) => (
          <React.Fragment key={i}>
            <span>{it}</span>
            <span className="dot"/>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ============================================
// TRUST STRIP
// ============================================
const TrustStrip = () => (
  <div className="container" style={{padding: '32px 28px'}}>
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
      padding: '24px 0',
    }} className="trust-grid">
      {[
        {icon: 'truck', t: 'Ingyenes szállítás', s: '15.000 Ft felett'},
        {icon: 'shield', t: 'Eredeti termékek', s: 'Hivatalos forgalmazótól'},
        {icon: 'chat', t: 'Szakmai konzultáció', s: 'Dentálhigiénikussal'},
        {icon: 'location', t: 'Személyes átvétel', s: 'A rendelőben'},
      ].map((it, i) => (
        <div key={i} style={{display: 'flex', gap: 14, alignItems: 'center'}}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--bg-card-peach)', color: 'var(--orange-hover)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Icon name={it.icon} size={24}/>
          </div>
          <div>
            <div style={{fontWeight: 700, fontSize: 16, color: 'var(--ink)'}}>{it.t}</div>
            <div style={{fontSize: 13, color: 'var(--navy-muted)'}}>{it.s}</div>
          </div>
        </div>
      ))}
    </div>
    <style>{`@media (max-width: 800px) { .trust-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
  </div>
);

// ============================================
// FEATURED ROW (with playful header)
// ============================================
const FeaturedRow = ({ title, eyebrow, products, viewAllPath, accentColor = 'var(--orange)' }) => {
  const { navigate } = window.useApp();
  return (
    <section className="container section">
      <div className="section-head">
        <div>
          <div className="row-deco">
            <div className="row-deco-bar" style={{background: accentColor}}/>
            <span className="section-eyebrow" style={{margin: 0, padding: 0, color: accentColor}}>
              <span style={{textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700, fontSize: 13}}>{eyebrow}</span>
            </span>
          </div>
          <h2 className="section-title" style={{marginTop: 12}}>{title}</h2>
        </div>
        {viewAllPath && (
          <a href="#" className="section-link" onClick={(e)=>{e.preventDefault(); navigate(viewAllPath);}}>
            Összes termék <Icon name="arrowRight" size={16}/>
          </a>
        )}
      </div>
      <div className="product-grid">
        {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
};

// ============================================
// INLINE BANNER (single, full-width, aspect-aware)
// ============================================
const InlineBanner = ({ img, aspect = '12 / 5' }) => {
  const { navigate } = window.useApp();
  return (
    <div className="container" style={{padding: '28px 28px'}}>
      <div className="inline-banner" onClick={() => navigate('/bolt')} style={{aspectRatio: aspect}}>
        <img src={img} alt="" />
      </div>
    </div>
  );
};

// ============================================
// TALL BANNER PAIR (2 side by side, equal height, aspect-aware)
// ============================================
const TallBannerPair = ({ left, right, aspect = '3 / 2' }) => {
  const { navigate } = window.useApp();
  return (
    <div className="container" style={{padding: '32px 28px'}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}} className="tall-pair">
        <div className="inline-banner" onClick={() => navigate('/bolt')} style={{aspectRatio: aspect}}>
          <img src={left} alt="" />
        </div>
        <div className="inline-banner" onClick={() => navigate('/bolt')} style={{aspectRatio: aspect}}>
          <img src={right} alt="" />
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .tall-pair { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

// ============================================
// BANNER PAIR (2 side-by-side)
// ============================================
const BannerPair = ({ left, right }) => {
  const { navigate } = window.useApp();
  return (
    <div className="container" style={{padding: '28px'}}>
      <div className="banner-strip">
        <div className="mini-banner" onClick={() => navigate('/bolt')}>
          <img src={left} alt="" />
        </div>
        <div className="mini-banner" onClick={() => navigate('/bolt')}>
          <img src={right} alt="" />
        </div>
      </div>
    </div>
  );
};

// ============================================
// CATEGORY GRID
// ============================================
const CategoryGrid = () => {
  const { navigate } = window.useApp();
  const counts = {};
  for (const p of window.PRODUCTS) {
    const id = window.groupId(p.group);
    counts[id] = (counts[id] || 0) + 1;
  }
  const featured = window.CATEGORY_GROUPS.slice(0, 8);
  return (
    <section className="container section">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">Kategóriák</div>
          <h2 className="section-title">Találja meg, amire szüksége van</h2>
        </div>
        <a href="#" className="section-link" onClick={(e)=>{e.preventDefault(); navigate('/bolt');}}>
          Összes termék <Icon name="arrowRight" size={16}/>
        </a>
      </div>
      <div className="cat-grid">
        {featured.map(g => (
          <div key={g.id} className={'cat-card ' + g.tone} onClick={() => navigate('/kategoria/' + g.id)}
            style={{cursor: 'pointer'}}>
            <div>
              <h3>{g.name}</h3>
              <div className="cat-count">{counts[g.id] || 0} termék</div>
            </div>
            <div className="cat-card-cta">
              Böngészés <Icon name="arrowRight" size={16}/>
            </div>
            <div className="cat-card-icon">{g.icon}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// PROBLEM FINDER (playful pills)
// ============================================
const ProblemFinder = () => {
  const app = window.useApp();
  const problems = [
    { label: 'Ínyvérzés', q: 'íny', icon: '🩸', bg: 'var(--bg-card-peach)', sub: 'gélek, szájvíz' },
    { label: 'Érzékeny fogak', q: 'érzék', icon: '❄', bg: 'var(--bg-card-blue)', sub: 'remineralizáló' },
    { label: 'Implantátum', q: 'implant', icon: '⚙', bg: 'var(--bg-card-cream)', sub: 'speciális kefék' },
    { label: 'Aftás panasz', q: 'afta', icon: '○', bg: 'var(--bg-card-sand)', sub: 'protektív gélek' },
    { label: 'Fogszabályzó', q: 'ortho', icon: '◇', bg: 'var(--bg-card-peach)', sub: 'ortho termékek' },
    { label: 'Gyermekfogak', q: 'gyermek', icon: '🧒', bg: 'var(--bg-card-blue)', sub: 'baba & gyerek' },
  ];
  return (
    <section className="container section" style={{paddingTop: 40}}>
      <div className="section-head" style={{marginBottom: 32}}>
        <div>
          <div className="section-eyebrow">Probléma alapú segítség</div>
          <h2 className="section-title">Mi a panasza?</h2>
          <p style={{color: 'var(--navy-muted)', marginTop: 14, maxWidth: 600, fontSize: 17}}>Kattintson a panaszára, és megmutatjuk a SmileDent által ajánlott termékeket.</p>
        </div>
      </div>
      <div className="problem-grid">
        {problems.map(p => (
          <div key={p.label} className="problem-card"
            style={{background: p.bg}}
            onClick={() => { app.setSearch(p.q); app.navigate('/bolt'); }}>
            <div className="pc-icon">{p.icon}</div>
            <div className="pc-label">{p.label}</div>
            <div className="pc-sub">{p.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// STORY BANNER (about teaser, big)
// ============================================
const StoryBanner = () => {
  const { navigate } = window.useApp();
  return (
    <section className="container section">
      <div className="story-banner" style={{background: 'var(--surface)', border: '1px solid var(--line-soft)'}}>
        <div className="story-text">
          <div className="section-eyebrow">A SmileDent rendelő</div>
          <h2>Tudjuk, mire van szüksége.</h2>
          <p>
            A webshopunk nem egy névtelen drogéria — a SmileDent Fogászati Centrum csapata válogatja össze. Ami a polcon van, azt mi magunk is használjuk a saját pácienseink kezelésénél.
          </p>
          <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
            <button className="btn btn-secondary" onClick={() => navigate('/rolunk')}>
              Tudjon meg többet <Icon name="arrowRight" size={16}/>
            </button>
            <a href="https://smiledent.hu" target="_blank" className="btn btn-ghost">smiledent.hu ↗</a>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-card-blue) 0%, var(--bg-card-peach) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 40,
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, width: '100%', maxWidth: 380}}>
            {[
              {n: '2.880+', l: 'kezelt páciens'},
              {n: '4.8 / 5', l: 'Google értékelés'},
              {n: '6', l: 'prémium márka'},
              {n: '15+', l: 'év tapasztalat'},
            ].map((s, i) => (
              <div key={i}>
                <div style={{fontFamily: 'var(--ff-display)', fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--orange-hover)', lineHeight: 1, marginBottom: 6}}>{s.n}</div>
                <div style={{fontSize: 14, color: 'var(--navy-soft)', fontWeight: 600}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BRAND SECTION (big cards)
// ============================================
const BrandSection = () => {
  const { navigate, setBrandFilter } = window.useApp();
  const brandInfo = {
    'Curaprox': {tag: 'Swiss Premium Oral Care', color: 'linear-gradient(135deg,#e91e63,#9c27b0)', desc: 'Svájci prémium szájápolás 1972 óta'},
    'Curasept': {tag: 'First because we care', color: 'linear-gradient(135deg,#0066cc,#003d7a)', desc: 'Klórhexidines és terápiás termékek'},
    'TEPE': {tag: 'Healthy smiles for life', color: 'linear-gradient(135deg,#00897b,#00695c)', desc: 'Svéd minőség, intuitív design'},
    'Oral-B': {tag: 'Trusted by dentists', color: 'linear-gradient(135deg,#0288d1,#01579b)', desc: 'Fogorvosok által ajánlott'},
    'GC': {tag: 'Quality in dental care', color: 'linear-gradient(135deg,#37474f,#263238)', desc: 'Tooth Mousse és pro termékek'},
    'GENGIGEL': {tag: 'Hyaluronic oral care', color: 'linear-gradient(135deg,#7b1fa2,#4a148c)', desc: 'Hialuronsavas íny- és szájgélek'},
  };
  return (
    <section className="container section">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">Márkáink</div>
          <h2 className="section-title">Csak prémium, csak hivatalos forgalmazótól</h2>
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}} className="brand-grid">
        {window.BRANDS.map(b => {
          const info = brandInfo[b.name] || {};
          const count = window.PRODUCTS.filter(p => p.brand === b.name).length;
          return (
            <div key={b.id} className="brand-card-big"
              onClick={() => { setBrandFilter([b.name]); navigate('/bolt'); }}>
              <div style={{
                background: info.color, color: 'white',
                padding: '10px 16px', borderRadius: 'var(--r-pill)',
                fontSize: 14, fontWeight: 800, letterSpacing: '0.06em',
                display: 'inline-block', marginBottom: 18
              }}>{b.name}</div>
              <div style={{fontSize: 14, color: 'var(--navy-muted)', marginBottom: 10, fontWeight: 600}}>{info.tag}</div>
              <div style={{fontSize: 16, color: 'var(--navy-soft)', marginBottom: 24, minHeight: 48, lineHeight: 1.5}}>{info.desc}</div>
              <div style={{fontSize: 14, color: 'var(--muted)', fontWeight: 600, paddingTop: 18, borderTop: '1px solid var(--line-soft)'}}>{count} termék</div>
            </div>
          );
        })}
      </div>
      <style>{`@media (max-width: 900px) { .brand-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 600px) { .brand-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

// ============================================
// DEALS STRIP — urgency / promotional
// ============================================
const DealsStrip = () => {
  const { navigate } = window.useApp();
  const deals = [
    { ic: '🎁', t: 'Be You fogkrémek', s: '15% kedvezmény', cta: 'megnézem', accent: '#e91e63' },
    { ic: '✓', t: 'Curasept Biosmalto', s: 'Érzékeny fogakra', cta: 'részletek', accent: '#8e24aa' },
    { ic: '⚡', t: 'Ingyenes szállítás', s: '15.000 Ft felett', cta: 'szállítás', accent: '#00897b' },
    { ic: '✦', t: 'Konzultáció ingyen', s: 'Dentálhigiénikussal', cta: 'kérek', accent: '#E89A4F' },
  ];
  return (
    <div className="container" style={{padding: '12px 28px 28px'}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14}} className="deals-grid">
        {deals.map((d, i) => (
          <div key={i} onClick={() => navigate('/bolt')} style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--line-soft)',
            borderRadius: 'var(--r-lg)',
            padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 16,
            cursor: 'pointer',
            transition: 'all .2s',
            borderLeft: `4px solid ${d.accent}`
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
            <div style={{fontSize: 26, lineHeight: 1}}>{d.ic}</div>
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{fontWeight: 800, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em'}}>{d.t}</div>
              <div style={{fontSize: 13, color: 'var(--navy-muted)', marginTop: 2}}>{d.s}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 800px) { .deals-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </div>
  );
};

// ============================================
// BOGI AJÁNLJA — personal expert pick
// ============================================
const BogiExpertPick = () => {
  const { navigate, addToCart } = window.useApp();
  // Pick 3 specific products for the curated row
  const picks = window.PRODUCTS
    .filter(p => p.brand === 'Curaprox' && p.category.includes('Fogkefe') && p.inStock)
    .slice(0, 3);
  return (
    <section className="container section">
      <div style={{
        background: 'var(--navy)',
        color: 'white',
        borderRadius: 'var(--r-xl)',
        padding: 48,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -100, right: -60,
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,163,90,.18) 0%, transparent 70%)'
        }}/>
        <div style={{position: 'relative', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'center'}} className="bogi-grid">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(232,163,90,.15)', color: 'var(--orange)',
              padding: '8px 16px', borderRadius: 'var(--r-pill)',
              fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              marginBottom: 18
            }}>
              <span style={{width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)'}}/>
              A szakértő ajánlja
            </div>
            <h2 style={{color: 'white', fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: 18}}>
              Bogi 3 kedvence<br/>fogkeféből.
            </h2>
            <p style={{color: 'rgba(255,255,255,.75)', fontSize: 16, lineHeight: 1.6, marginBottom: 24}}>
              A SmileDent dentálhigiénikusa kiválogatta a saját tapasztalatai alapján, hogy melyik kefe melyik ínyhez és szokáshoz illik a legjobban.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/konzultacio')}>
              Bogi tanácsát kérem <Icon name="arrowRight" size={16}/>
            </button>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}} className="bogi-picks">
            {picks.map((p, i) => {
              const theme = window.BRAND_THEME[p.brand] || {};
              return (
                <div key={p.id} onClick={() => navigate('/termek/' + p.slug)}
                  style={{
                    background: 'white', borderRadius: 'var(--r-lg)', padding: 16,
                    color: 'var(--ink)', cursor: 'pointer',
                    transition: 'transform .25s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}>
                  <div style={{
                    position: 'absolute', top: 10, left: 10,
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--orange)', color: 'white',
                    fontSize: 13, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2
                  }}>{i + 1}</div>
                  <div style={{aspectRatio: 1, borderRadius: 'var(--r-md)', background: theme.bg || 'var(--bg-2)', overflow: 'hidden', marginBottom: 12}}>
                    <ProductImg product={p}/>
                  </div>
                  <div style={{fontSize: 13, lineHeight: 1.35, fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 36}}>{p.name}</div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                    <div style={{fontWeight: 800, fontSize: 16}}>{fmtPrice(p.price)}</div>
                    <button className="add-btn" style={{width: 32, height: 32}} onClick={(e) => { e.stopPropagation(); addToCart(p); }}>
                      <Icon name="plus" size={14}/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`@media (max-width: 800px) {
          .bogi-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .bogi-picks { grid-template-columns: 1fr !important; }
        }`}</style>
      </div>
    </section>
  );
};
const HomePage = () => {
  const all = window.PRODUCTS;
  const featured = all.filter(p => p.brand === 'Curaprox' && p.inStock).slice(0, 8);
  const fresh = all.filter(p => p.brand === 'Curasept').slice(0, 8);
  const tepeFeat = all.filter(p => p.brand === 'TEPE').slice(0, 8);
  return (
    <main>
      <HeroSlider />
      <MarqueeStrip />
      <DealsStrip />
      <TrustStrip />

      {/* Featured products FIRST */}
      <FeaturedRow
        eyebrow="Kiemelt termékek"
        title="Bestsellereink a SmileDent rendelőből"
        products={featured}
        viewAllPath="/bolt"
        accentColor="var(--orange)" />

      {/* Inline banner — TePe */}
      <InlineBanner img="assets/banner-tepe.webp" aspect="3820 / 1560" />

      {/* Categories */}
      <CategoryGrid />

      {/* Bogi expert pick */}
      <BogiExpertPick />

      {/* Problem finder */}
      <ProblemFinder />

      {/* Tall banner pair after Mi a panasza */}
      <TallBannerPair
        left="assets/banner-curaprox-love-tall.png"
        right="assets/banner-be-you-tall.png"
        aspect="3 / 2" />

      {/* Featured row 2 */}
      <FeaturedRow
        eyebrow="Terápiás termékek"
        title="Curasept — szakmai gondoskodás"
        products={fresh}
        viewAllPath="/bolt"
        accentColor="#1565c0" />

      {/* Single banner */}
      <InlineBanner img="assets/banner-ads-dna.webp" aspect="2000 / 650" />

      {/* TEPE featured */}
      <FeaturedRow
        eyebrow="Svéd dizájn"
        title="TEPE — minden naphoz a megfelelő kefe"
        products={tepeFeat}
        viewAllPath="/bolt"
        accentColor="#00897b" />

      {/* Story banner */}
      <StoryBanner />

      {/* CTA */}
      <CtaBanner navigate={window.useApp().navigate} />

      {/* Brand cards */}
      <BrandSection />

      {/* Final banner */}
      <InlineBanner img="assets/banner-biosmalto.png" aspect="2000 / 650" />

      {/* Final brand strip */}
      <BrandStrip />
    </main>
  );
};

window.HomePage = HomePage;
