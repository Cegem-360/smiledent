// SmileDent — Shared components: Header, Footer, ProductCard, Layout, Icons
// All components attached to window for cross-file access.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ============================================
// Icons (inline SVG, 20px stroke)
// ============================================
const Icon = ({ name, size = 20, className = '' }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    cart: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    minus: <line x1="5" y1="12" x2="19" y2="12"/>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    chevronLeft: <polyline points="15 18 9 12 15 6"/>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    location: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    truck: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    sparkle: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {paths[name]}
    </svg>
  );
};

// ============================================
// Logo
// ============================================
const Logo = ({ onClick }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }} className="logo">
    <img src="assets/smiledent-logo.svg" alt="SmileDent" />
    <span className="logo-sub">Webshop</span>
  </a>
);

// ============================================
// Header
// ============================================
const Header = () => {
  const { route, navigate, cart, search, setSearch } = window.useApp();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const [q, setQ] = useState('');
  const onSearch = (e) => {
    e.preventDefault();
    setSearch(q);
    navigate('/bolt');
  };
  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-top-inner">
          <div className="top-info">
            <span><Icon name="phone" size={13}/> +36 30 968 0830</span>
            <span><Icon name="location" size={13}/> Budapest, II. ker.</span>
          </div>
          <div className="top-links">
            <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/szallitas');}}>Szállítás & átvétel</a>
            <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/konzultacio');}}>Konzultáció</a>
            <a href="https://smiledent.hu" target="_blank">smiledent.hu ↗</a>
          </div>
        </div>
      </div>
      <div className="header-main">
        <Logo onClick={() => navigate('/')} />
        <form className="search-box" onSubmit={onSearch}>
          <span className="icon"><Icon name="search" size={18}/></span>
          <input
            type="search"
            placeholder="Keresés a termékek között…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
        <nav className="nav-main">
          <a href="#" className={route.path === '/' ? 'active' : ''} onClick={(e)=>{e.preventDefault(); navigate('/');}}>Főoldal</a>
          <a href="#" className={route.path.startsWith('/bolt') || route.path.startsWith('/kategoria') ? 'active' : ''} onClick={(e)=>{e.preventDefault(); navigate('/bolt');}}>Bolt</a>
          <a href="#" className={route.path === '/konzultacio' ? 'active' : ''} onClick={(e)=>{e.preventDefault(); navigate('/konzultacio');}}>Konzultáció</a>
          <a href="#" className={route.path === '/rolunk' ? 'active' : ''} onClick={(e)=>{e.preventDefault(); navigate('/rolunk');}}>Rólunk</a>
          <a href="#" className={route.path === '/kapcsolat' ? 'active' : ''} onClick={(e)=>{e.preventDefault(); navigate('/kapcsolat');}}>Kapcsolat</a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => navigate('/fiok')} aria-label="Fiók"><Icon name="user" size={18}/></button>
          <button className="icon-btn" onClick={() => navigate('/kosar')} aria-label="Kosár">
            <Icon name="cart" size={18}/>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
      <div className="cat-bar">
        <div className="cat-bar-inner">
          {window.CATEGORY_GROUPS.map(g => (
            <a key={g.id} href="#" onClick={(e)=>{e.preventDefault(); navigate('/kategoria/' + g.id);}}
              className={route.path === '/kategoria/' + g.id ? 'active' : ''}>
              {g.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

// ============================================
// Footer
// ============================================
const Footer = () => {
  const { navigate } = window.useApp();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <img src="assets/smiledent-logo.svg" alt="SmileDent" style={{height: 44, filter: 'brightness(0) invert(1)'}} />
            <p>A SmileDent Fogászati Centrum hivatalos webshopja. Minőségi szájápolási termékek, fogorvosok és dentálhigiénikusok ajánlásával.</p>
            <div style={{display: 'flex', gap: 12, marginTop: 18}}>
              <a href="#" className="icon-btn" style={{background:'rgba(255,255,255,.1)', color:'white'}}><Icon name="facebook" size={16}/></a>
              <a href="#" className="icon-btn" style={{background:'rgba(255,255,255,.1)', color:'white'}}><Icon name="instagram" size={16}/></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Vásárlás</h4>
            <ul>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/bolt');}}>Összes termék</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/kategoria/fogkefek');}}>Fogkefék</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/kategoria/fogkrem');}}>Fogkrémek</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/kategoria/szajobl');}}>Szájöblögetők</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/kategoria/fogkoz');}}>Fogköztisztítók</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Információk</h4>
            <ul>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/rolunk');}}>Rólunk</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/konzultacio');}}>Konzultáció</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/szallitas');}}>Szállítás & átvétel</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/kapcsolat');}}>Kapcsolat</a></li>
              <li><a href="https://smiledent.hu" target="_blank">SmileDent rendelő ↗</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kapcsolat</h4>
            <ul>
              <li><Icon name="phone" size={14}/> +36 30 968 0830</li>
              <li><Icon name="mail" size={14}/> webshop@smiledent.hu</li>
              <li><Icon name="location" size={14}/> Budapest, II. ker.</li>
              <li><Icon name="clock" size={14}/> H–P: 8:00–18:00</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SmileDent Fogászati Centrum. Minden jog fenntartva.</span>
          <div style={{display: 'flex', gap: 20}}>
            <a href="#">ÁSZF</a>
            <a href="#">Adatvédelem</a>
            <a href="#">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// Format helpers
// ============================================
const fmtPrice = (n) => new Intl.NumberFormat('hu-HU').format(Math.round(n)) + ' Ft';

// ============================================
// Brand color map (for tinting)
// ============================================
const BRAND_THEME = {
  'Curaprox':  { bg: '#fce4ec', accent: '#e91e63', text: '#880e4f', glyph: 'brush' },
  'Curasept':  { bg: '#e3f2fd', accent: '#1565c0', text: '#0d47a1', glyph: 'tube' },
  'TEPE':      { bg: '#e0f2f1', accent: '#00897b', text: '#004d40', glyph: 'pick' },
  'Oral-B':    { bg: '#e1f5fe', accent: '#0288d1', text: '#01579b', glyph: 'brush' },
  'GC':        { bg: '#eceff1', accent: '#455a64', text: '#263238', glyph: 'tube' },
  'GENGIGEL':  { bg: '#f3e5f5', accent: '#8e24aa', text: '#4a148c', glyph: 'tube' },
};
window.BRAND_THEME = BRAND_THEME;

// Brand-aware product image placeholder
const ProductImg = ({ product, large = false }) => {
  const [error, setError] = useState(false);
  const theme = BRAND_THEME[product.brand] || { bg: '#f5efe6', accent: '#1A2547', text: '#1A2547', glyph: 'tube' };
  if (!product.imageUrl || error) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.bg} 0%, white 100%)`,
        position: 'relative', overflow: 'hidden'
      }}>
        <svg viewBox="0 0 100 100" width={large ? '55%' : '60%'} height={large ? '55%' : '60%'} style={{opacity: .85}}>
          {theme.glyph === 'tube' && (
            <>
              <rect x="32" y="18" width="36" height="68" rx="6" fill={theme.accent} opacity="0.18"/>
              <rect x="32" y="18" width="36" height="14" rx="3" fill={theme.accent} opacity="0.35"/>
              <rect x="42" y="10" width="16" height="10" rx="2" fill={theme.accent} opacity="0.5"/>
              <text x="50" y="60" textAnchor="middle" fontSize="10" fontWeight="800" fill={theme.text} letterSpacing="1">{product.brand.slice(0,6).toUpperCase()}</text>
            </>
          )}
          {theme.glyph === 'brush' && (
            <>
              <rect x="42" y="10" width="16" height="58" rx="4" fill={theme.accent} opacity="0.28"/>
              <rect x="38" y="68" width="24" height="22" rx="3" fill={theme.accent} opacity="0.45"/>
              <g opacity="0.6">
                {[0,1,2,3,4].map(i => <rect key={i} x={40+i*4} y="86" width="3" height="6" rx="1" fill={theme.accent}/>)}
              </g>
              <text x="50" y="45" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" letterSpacing="0.5">{product.brand.slice(0,6).toUpperCase()}</text>
            </>
          )}
          {theme.glyph === 'pick' && (
            <>
              <path d="M50 12 L52 80 Q50 88 48 80 Z" fill={theme.accent} opacity="0.35"/>
              <circle cx="50" cy="14" r="6" fill={theme.accent} opacity="0.55"/>
              <text x="50" y="50" textAnchor="middle" fontSize="10" fontWeight="800" fill={theme.text} letterSpacing="1">{product.brand.toUpperCase()}</text>
            </>
          )}
        </svg>
        <div style={{
          position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: theme.text, opacity: .6
        }}>SmileDent</div>
      </div>
    );
  }
  return <img src={product.imageUrl} alt={product.name} loading="lazy" onError={() => setError(true)}/>;
};

const ProductCard = ({ product }) => {
  const { navigate, addToCart, wishlist, toggleWishlist } = window.useApp();
  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };
  const handleWish = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };
  const handleClick = () => navigate('/termek/' + product.slug);
  const theme = BRAND_THEME[product.brand] || {};
  const isWished = wishlist.includes(product.id);
  return (
    <div className="product-card" onClick={handleClick} style={{cursor: 'pointer'}}>
      {!product.inStock && <span className="product-badge out">Hamarosan</span>}
      {product.brand === 'Curaprox' && product.name.toLowerCase().includes('love') && <span className="product-badge">Limitált</span>}
      <button className={'wish-btn' + (isWished ? ' active' : '')} onClick={handleWish} aria-label="Kedvenc">
        <Icon name="heart" size={16}/>
      </button>
      <div className="product-img" style={{background: theme.bg || 'var(--bg-2)'}}>
        <ProductImg product={product} />
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
        <span className="brand-dot" style={{background: theme.accent || 'var(--navy-muted)'}}/>
        <div className="product-brand" style={{margin: 0, color: theme.text || 'var(--orange-hover)'}}>{product.brand}</div>
      </div>
      <div className="product-name">{product.name}</div>
      {product.size && <div className="product-meta">{product.size}</div>}
      <div className="product-foot">
        <div className="product-price">
          {fmtPrice(product.price)}
          {product.size && <div className="unit">{product.size}</div>}
        </div>
        <button className="add-btn" onClick={handleAdd} aria-label="Kosárba">
          <Icon name="plus" size={18}/>
        </button>
      </div>
    </div>
  );
};

// ============================================
// Toast
// ============================================
const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="toast">
      <Icon name="check" size={18} className="ok"/>
      {message}
    </div>
  );
};

// ============================================
// Breadcrumb
// ============================================
const Breadcrumb = ({ items }) => {
  const { navigate } = window.useApp();
  return (
    <nav className="breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">/</span>}
          {it.path
            ? <a href="#" onClick={(e)=>{e.preventDefault(); navigate(it.path);}}>{it.label}</a>
            : <span>{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

// ============================================
// Empty state
// ============================================
const EmptyState = ({ icon = 'info', title, description, action }) => (
  <div className="empty-state">
    <div className="icon"><Icon name={icon} size={48}/></div>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {action}
  </div>
);

// ============================================
// CTA Banner
// ============================================
const CtaBanner = ({ navigate }) => (
  <section className="container" style={{marginTop: 64}}>
    <div className="cta-banner">
      <div>
        <div className="section-eyebrow" style={{color: 'var(--orange-soft)'}}>Konzultáció</div>
        <h2>Nem tudja, melyik termékre van szüksége?</h2>
        <p>Írja le panaszát, és dentálhigiénikusunk személyre szabott termékajánlatot ad. A szakmai segítség nálunk az árban van.</p>
        <div className="cta-banner-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/konzultacio')}>
            Konzultációt kérek <Icon name="arrowRight" size={16}/>
          </button>
          <button className="btn btn-ghost btn-lg" onClick={() => navigate('/bolt')}>Böngészés</button>
        </div>
      </div>
      <div style={{textAlign: 'center'}}>
        <div style={{
          width: 220, height: 220, borderRadius: '50%',
          background: 'rgba(232,163,90,0.15)',
          margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(232,163,90,0.3)'
        }}>
          <Icon name="chat" size={80} className="text-orange" />
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// Brand Strip
// ============================================
const BrandStrip = () => {
  const { navigate, setBrandFilter } = window.useApp();
  return (
    <div className="container">
      <div className="brand-strip">
        {window.BRANDS.map(b => (
          <span key={b.id} className="brand-pill" onClick={() => { setBrandFilter([b.name]); navigate('/bolt'); }}>
            {b.name}
          </span>
        ))}
      </div>
    </div>
  );
};

// Expose
Object.assign(window, {
  Icon, Logo, Header, Footer, ProductCard, ProductImg,
  Toast, Breadcrumb, EmptyState, CtaBanner, BrandStrip, fmtPrice
});
