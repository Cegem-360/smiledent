// SmileDent — Shop / Category / Product Detail pages

const { useState: useStateS, useMemo: useMemoS, useEffect: useEffectS } = React;

const ShopPage = ({ initialGroup = null }) => {
  const app = window.useApp();
  const { navigate, brandFilter, setBrandFilter, search } = app;
  const [groupFilter, setGroupFilter] = useStateS(initialGroup);
  const [sort, setSort] = useStateS('default');
  const [inStockOnly, setInStockOnly] = useStateS(false);

  // Reset group when initialGroup prop changes
  useEffectS(() => { setGroupFilter(initialGroup); }, [initialGroup]);

  const counts = useMemoS(() => {
    const groupCounts = {};
    const brandCounts = {};
    for (const p of window.PRODUCTS) {
      const gid = window.groupId(p.group);
      groupCounts[gid] = (groupCounts[gid] || 0) + 1;
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    }
    return { groupCounts, brandCounts };
  }, []);

  const filtered = useMemoS(() => {
    let list = window.PRODUCTS;
    if (groupFilter) list = list.filter(p => window.groupId(p.group) === groupFilter);
    if (brandFilter.length) list = list.filter(p => brandFilter.includes(p.brand));
    if (inStockOnly) list = list.filter(p => p.inStock);
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.short || '').toLowerCase().includes(q) ||
        (p.attrs || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.age || '').toLowerCase().includes(q)
      );
    }
    list = [...list];
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'hu'));
    return list;
  }, [groupFilter, brandFilter, sort, search, inStockOnly]);

  const currentGroupName = groupFilter
    ? (window.CATEGORY_GROUPS.find(g => g.id === groupFilter)?.name || groupFilter)
    : null;

  const toggleBrand = (b) => {
    if (brandFilter.includes(b)) setBrandFilter(brandFilter.filter(x => x !== b));
    else setBrandFilter([...brandFilter, b]);
  };

  const clearAll = () => {
    setBrandFilter([]);
    setGroupFilter(null);
    app.setSearch('');
    setInStockOnly(false);
    navigate('/bolt');
  };

  return (
    <main className="container">
      <Breadcrumb items={[
        {label: 'Főoldal', path: '/'},
        {label: 'Bolt', path: groupFilter ? '/bolt' : null},
        ...(currentGroupName ? [{label: currentGroupName}] : [])
      ]}/>
      <div className="page-head">
        <h1>{currentGroupName || 'Összes termék'}</h1>
        <p style={{color: 'var(--navy-muted)', marginTop: 12, maxWidth: 700, fontSize: 17}}>
          {currentGroupName
            ? `${filtered.length} termék a ${currentGroupName.toLowerCase()} kategóriában — Curaprox, Curasept, TEPE, Oral-B, GC és GENGIGEL márkáktól.`
            : `${window.PRODUCTS.length} termék 6 prémium márkától. A SmileDent szakmai csapata válogatta.`}
        </p>
      </div>

      <div className="layout-shop">
        <aside>
          <div className="filter-card">
            <div className="filter-group">
              <h4>Kategória</h4>
              <div className="filter-list">
                <div className={'filter-row' + (!groupFilter ? ' active' : '')} onClick={() => { setGroupFilter(null); navigate('/bolt'); }}>
                  <span>Összes kategória</span>
                  <span className="count">{window.PRODUCTS.length}</span>
                </div>
                {window.CATEGORY_GROUPS.map(g => (
                  <div key={g.id} className={'filter-row' + (groupFilter === g.id ? ' active' : '')}
                    onClick={() => { setGroupFilter(g.id); navigate('/kategoria/' + g.id); }}>
                    <span>{g.name}</span>
                    <span className="count">{counts.groupCounts[g.id] || 0}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h4>Márka</h4>
              <div className="filter-list">
                {window.BRANDS.map(b => (
                  <label key={b.id} className="filter-check">
                    <input type="checkbox" checked={brandFilter.includes(b.name)} onChange={() => toggleBrand(b.name)} />
                    <span style={{flex: 1}}>{b.name}</span>
                    <span className="count">{counts.brandCounts[b.name] || 0}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h4>Egyéb</h4>
              <label className="filter-check">
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                Csak készleten lévők
              </label>
            </div>
            <button className="btn btn-soft btn-block btn-sm" onClick={clearAll}>Szűrők törlése</button>
          </div>
        </aside>

        <div>
          <div className="shop-toolbar">
            <div className="shop-count">
              <strong>{filtered.length}</strong> termék
              {search && <span> · keresés: <em>"{search}"</em></span>}
              {brandFilter.length > 0 && <span> · márka: {brandFilter.join(', ')}</span>}
            </div>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="default">Alapértelmezett</option>
              <option value="price-asc">Ár szerint növekvő</option>
              <option value="price-desc">Ár szerint csökkenő</option>
              <option value="name">Név szerint (A–Z)</option>
            </select>
          </div>

          {filtered.length === 0
            ? <EmptyState icon="search" title="Nem találtunk terméket"
                description="Próbáljon meg kevesebb szűrőt használni, vagy módosítsa a keresést."
                action={<button className="btn btn-primary" onClick={clearAll}>Szűrők törlése</button>} />
            : <div className="product-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
          }
        </div>
      </div>
    </main>
  );
};

// ============================================
// Product Detail
// ============================================
const ProductDetailPage = ({ slug }) => {
  const app = window.useApp();
  const { navigate, addToCart } = app;
  const product = window.PRODUCTS.find(p => p.slug === slug);
  const [qty, setQty] = useStateS(1);
  const [tab, setTab] = useStateS('desc');
  useEffectS(() => { window.scrollTo(0, 0); }, [slug]);

  if (!product) {
    return (
      <main className="container" style={{padding: '64px 28px'}}>
        <EmptyState icon="info" title="A termék nem található"
          action={<button className="btn btn-primary" onClick={() => navigate('/bolt')}>Vissza a bolthoz</button>}/>
      </main>
    );
  }

  const related = window.PRODUCTS
    .filter(p => p.group === product.group && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="container">
      <Breadcrumb items={[
        {label: 'Főoldal', path: '/'},
        {label: 'Bolt', path: '/bolt'},
        {label: product.group, path: '/kategoria/' + window.groupId(product.group)},
        {label: product.name}
      ]}/>

      <div className="pd-layout" style={{marginTop: 24}}>
        <div className="pd-gallery">
          <div className="pd-img-main" style={{background: (window.BRAND_THEME[product.brand]?.bg) || 'var(--bg-2)'}}>
            <ProductImg product={product} large={true} />
          </div>
          <div className="pd-thumbs">
            {[0, 1, 2].map(i => (
              <div key={i} className={'pd-thumb' + (i === 0 ? ' active' : '')}
                style={i === 0 && product.imageUrl ? {
                  backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'
                } : {}} />
            ))}
          </div>
        </div>

        <div className="pd-info">
          <div className="pd-brand-row">
            <span className="pd-brand-pill">{product.brand}</span>
            <span className="pd-cat">{product.category}</span>
          </div>
          <h1>{product.name}</h1>
          <p className="pd-short">{product.short || 'Prémium szájápolási termék a SmileDent ajánlásával.'}</p>

          <div className="pd-meta-grid">
            {product.size && <div className="pd-meta-cell"><div className="lbl">Kiszerelés</div><div className="val">{product.size}</div></div>}
            {product.age && <div className="pd-meta-cell"><div className="lbl">Életkor</div><div className="val">{product.age}</div></div>}
            {product.sku && <div className="pd-meta-cell"><div className="lbl">Cikkszám</div><div className="val">{product.sku.split('(')[0].trim()}</div></div>}
            <div className="pd-meta-cell"><div className="lbl">Márka</div><div className="val">{product.brand}</div></div>
          </div>

          <div className="pd-price-row">
            <div className="pd-price">{fmtPrice(product.price)}</div>
            <div style={{fontSize: 13, color: 'var(--muted)'}}>ÁFA-val</div>
          </div>
          <div className={'pd-stock' + (product.inStock ? '' : ' out')}>
            {product.inStock ? `Készleten (${product.totalStock} db)` : 'Hamarosan készleten'}
          </div>

          <div className="qty-row">
            <div className="qty-box">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><Icon name="minus" size={14}/></button>
              <input type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} />
              <button onClick={() => setQty(qty + 1)}><Icon name="plus" size={14}/></button>
            </div>
          </div>

          <div className="pd-actions">
            <button className="btn btn-primary btn-lg" onClick={() => { addToCart(product, qty); }} disabled={!product.inStock}>
              <Icon name="cart" size={16}/> Kosárba ({fmtPrice(product.price * qty)})
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => { addToCart(product, qty); navigate('/kosar'); }} disabled={!product.inStock}>
              Megveszem most
            </button>
          </div>

          {product.attrs && (
            <div className="pd-features">
              <strong style={{fontSize: 13, color: 'var(--navy)'}}>Főbb tulajdonságok:</strong>
              <ul>
                {product.attrs.split(';').map((a, i) => <li key={i}>{a.trim()}</li>)}
              </ul>
            </div>
          )}

          <div style={{display: 'flex', gap: 24, padding: '18px 0', borderTop: '1px solid var(--line-soft)', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--navy-soft)'}}>
              <Icon name="truck" size={18} /> Ingyenes szállítás 15.000 Ft felett
            </div>
            <div style={{display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--navy-soft)'}}>
              <Icon name="shield" size={18} /> Eredeti, hivatalos termék
            </div>
            <div style={{display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--navy-soft)'}}>
              <Icon name="location" size={18} /> Átvehető a rendelőben
            </div>
          </div>
        </div>
      </div>

      <div className="pd-tabs">
        <div className="pd-tabs-head">
          <button className={'pd-tab' + (tab === 'desc' ? ' active' : '')} onClick={() => setTab('desc')}>Részletes leírás</button>
          <button className={'pd-tab' + (tab === 'usage' ? ' active' : '')} onClick={() => setTab('usage')}>Használat</button>
          <button className={'pd-tab' + (tab === 'shipping' ? ' active' : '')} onClick={() => setTab('shipping')}>Szállítás</button>
        </div>
        <div className="pd-tab-content">
          {tab === 'desc' && (
            <>
              {(product.long || product.short || 'Bővebb leírás hamarosan.').split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
              {product.sourceUrl && <p style={{fontSize: 12, color: 'var(--muted)', marginTop: 24}}>Forrás: <a href={product.sourceUrl} target="_blank" style={{textDecoration: 'underline'}}>{new URL(product.sourceUrl).hostname}</a></p>}
            </>
          )}
          {tab === 'usage' && (
            <>
              {product.age && <p><strong>Ajánlott életkor:</strong> {product.age}</p>}
              <p>A használati útmutató a termék csomagolásán található. Ha kérdése van a használattal kapcsolatban, kérje a SmileDent dentálhigiénikusának konzultációját.</p>
              <p><button className="btn btn-primary btn-sm" onClick={() => app.navigate('/konzultacio')}>Konzultációt kérek</button></p>
            </>
          )}
          {tab === 'shipping' && (
            <>
              <p><strong>Házhozszállítás:</strong> 1–3 munkanap alatt, GLS vagy Foxpost. 15.000 Ft feletti rendelés esetén ingyenes.</p>
              <p><strong>Személyes átvétel:</strong> SmileDent rendelő, Budapest II. kerület. Ingyenes, általában 24 órán belül.</p>
              <p><strong>Csomagolás:</strong> Diszkrét, higiéniai szempontból megfelelő.</p>
            </>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Hasonló termékek</div>
              <h2 className="section-title">Önnek is tetszhetnek</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        </section>
      )}
    </main>
  );
};

window.ShopPage = ShopPage;
window.ProductDetailPage = ProductDetailPage;
