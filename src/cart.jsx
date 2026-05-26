// SmileDent — Cart & Checkout pages
const { useState: useStateC, useMemo: useMemoC } = React;

const CartPage = () => {
  const app = window.useApp();
  const { navigate, cart, updateCartQty, removeFromCart } = app;

  const subtotal = useMemoC(() => cart.reduce((s, i) => s + i.product.price * i.qty, 0), [cart]);
  const shipping = subtotal === 0 ? 0 : subtotal >= 15000 ? 0 : 1490;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="container">
        <Breadcrumb items={[{label: 'Főoldal', path: '/'}, {label: 'Kosár'}]} />
        <div className="page-head"><h1>Kosár</h1></div>
        <EmptyState icon="cart" title="A kosara üres"
          description="Böngésszen termékeink között, vagy kérjen szakmai konzultációt panaszára szabva."
          action={
            <div style={{display: 'flex', gap: 12, justifyContent: 'center'}}>
              <button className="btn btn-primary" onClick={() => navigate('/bolt')}>Bolt megnyitása</button>
              <button className="btn btn-ghost" onClick={() => navigate('/konzultacio')}>Konzultáció</button>
            </div>
          }/>
      </main>
    );
  }

  return (
    <main className="container">
      <Breadcrumb items={[{label: 'Főoldal', path: '/'}, {label: 'Kosár'}]} />
      <div className="page-head">
        <h1>Kosár</h1>
        <p style={{color: 'var(--navy-muted)', marginTop: 12}}>{cart.length} tétel · {cart.reduce((s, i) => s + i.qty, 0)} darab</p>
      </div>
      <div className="cart-layout">
        <div style={{background: 'var(--surface)', border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)', padding: '8px 28px'}}>
          {cart.map(item => (
            <div key={item.product.id} className="cart-item">
              <div className="cart-item-img" onClick={() => navigate('/termek/' + item.product.slug)} style={{cursor: 'pointer'}}>
                <ProductImg product={item.product} />
              </div>
              <div onClick={() => navigate('/termek/' + item.product.slug)} style={{cursor: 'pointer'}}>
                <div className="cart-item-brand">{item.product.brand}</div>
                <div className="cart-item-name">{item.product.name}</div>
                {item.product.size && <div style={{fontSize: 12, color: 'var(--muted)', marginTop: 4}}>{item.product.size}</div>}
              </div>
              <div className="qty-box">
                <button onClick={() => updateCartQty(item.product.id, item.qty - 1)}><Icon name="minus" size={14}/></button>
                <input value={item.qty} onChange={(e) => updateCartQty(item.product.id, +e.target.value || 1)} />
                <button onClick={() => updateCartQty(item.product.id, item.qty + 1)}><Icon name="plus" size={14}/></button>
              </div>
              <div className="cart-item-price">{fmtPrice(item.product.price * item.qty)}</div>
              <button className="cart-remove" onClick={() => removeFromCart(item.product.id)} aria-label="Eltávolítás">
                <Icon name="trash" size={18}/>
              </button>
            </div>
          ))}
        </div>

        <aside>
          <div className="summary-card">
            <h3>Összegzés</h3>
            <div className="summary-row"><span>Részösszeg</span><span>{fmtPrice(subtotal)}</span></div>
            <div className="summary-row">
              <span>Szállítás</span>
              <span>{shipping === 0 ? <span style={{color: 'var(--success)'}}>Ingyenes</span> : fmtPrice(shipping)}</span>
            </div>
            {subtotal < 15000 && (
              <div style={{
                background: 'var(--surface-tint)', padding: 10, borderRadius: 8,
                fontSize: 12, color: 'var(--navy-muted)', margin: '8px 0'
              }}>
                Még <strong>{fmtPrice(15000 - subtotal)}</strong> és ingyenes a szállítás!
                <div style={{height: 4, background: 'var(--line)', borderRadius: 2, marginTop: 6, overflow: 'hidden'}}>
                  <div style={{height: '100%', background: 'var(--orange)', width: Math.min(100, subtotal / 15000 * 100) + '%'}} />
                </div>
              </div>
            )}
            <div className="summary-row total"><span>Összesen</span><span>{fmtPrice(total)}</span></div>
            <button className="btn btn-primary btn-block btn-lg" style={{marginTop: 18}} onClick={() => navigate('/penztar')}>
              Tovább a pénztárhoz <Icon name="arrowRight" size={16}/>
            </button>
            <button className="btn btn-soft btn-block btn-sm" style={{marginTop: 8}} onClick={() => navigate('/bolt')}>
              Vásárlás folytatása
            </button>
            <div style={{marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--line-soft)', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12, color: 'var(--navy-muted)'}}>
              <div style={{display: 'flex', gap: 8, alignItems: 'center'}}><Icon name="shield" size={14}/> Biztonságos fizetés (SimplePay)</div>
              <div style={{display: 'flex', gap: 8, alignItems: 'center'}}><Icon name="truck" size={14}/> GLS / Foxpost / Személyes</div>
              <div style={{display: 'flex', gap: 8, alignItems: 'center'}}><Icon name="check" size={14}/> 14 napos visszaküldés</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

// ============================================
// Checkout
// ============================================
const CheckoutPage = () => {
  const app = window.useApp();
  const { navigate, cart, clearCart, toast } = app;
  const [step, setStep] = useStateC(1);
  const [shipMethod, setShipMethod] = useStateC('gls');
  const [payMethod, setPayMethod] = useStateC('card');
  const [form, setForm] = useStateC({
    email: '', firstName: '', lastName: '', phone: '',
    city: '', zip: '', address: '', notes: ''
  });

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipCost = { gls: subtotal >= 15000 ? 0 : 1490, foxpost: 990, pickup: 0 }[shipMethod];
  const total = subtotal + shipCost;

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  if (cart.length === 0 && step < 3) {
    navigate('/kosar');
    return null;
  }

  const placeOrder = (e) => {
    e?.preventDefault();
    setStep(3);
    setTimeout(() => clearCart(), 100);
    toast('Megrendelést rögzítettük!');
  };

  if (step === 3) {
    return (
      <main className="container">
        <div style={{maxWidth: 560, margin: '64px auto', textAlign: 'center'}}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: 'var(--orange-soft)',
            color: 'var(--orange-hover)', margin: '0 auto 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Icon name="check" size={36}/>
          </div>
          <h1>Köszönjük a rendelését!</h1>
          <p style={{color: 'var(--navy-soft)', fontSize: 17, marginTop: 16, lineHeight: 1.6}}>
            Visszaigazoló emailt küldtünk a megadott címre. A SmileDent csapata hamarosan felveszi Önnel a kapcsolatot.
          </p>
          <div style={{
            background: 'var(--surface)', padding: 24, borderRadius: 'var(--r-lg)',
            border: '1px solid var(--line-soft)', margin: '32px 0',
            fontFamily: 'var(--ff-display)', fontSize: 22, color: 'var(--ink)'
          }}>
            Rendelési szám: <strong>SD-{Math.floor(Math.random() * 90000 + 10000)}</strong>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>Vissza a főoldalra</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <Breadcrumb items={[{label: 'Főoldal', path: '/'}, {label: 'Kosár', path: '/kosar'}, {label: 'Pénztár'}]}/>
      <div className="page-head"><h1>Pénztár</h1></div>

      <div style={{display: 'flex', gap: 8, marginBottom: 32, fontSize: 13}}>
        {['Adatok', 'Szállítás & fizetés', 'Visszaigazolás'].map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            color: i + 1 <= step ? 'var(--ink)' : 'var(--muted)',
            fontWeight: i + 1 === step ? 700 : 400,
          }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: i + 1 <= step ? 'var(--orange)' : 'var(--bg-2)',
              color: i + 1 <= step ? 'white' : 'var(--muted)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700
            }}>{i + 1}</span>
            {s}
            {i < 2 && <span style={{color: 'var(--line)', marginLeft: 8}}>—</span>}
          </div>
        ))}
      </div>

      <div className="cart-layout">
        <form className="form-card" onSubmit={(e) => { e.preventDefault(); step === 1 ? setStep(2) : placeOrder(); }}>
          {step === 1 && (
            <>
              <h3 style={{marginBottom: 24}}>Számlázási és kapcsolati adatok</h3>
              <div className="form-grid">
                <div className="field full">
                  <label>Email cím *</label>
                  <input type="email" required value={form.email} onChange={upd('email')} placeholder="email@pelda.hu"/>
                </div>
                <div className="field"><label>Vezetéknév *</label><input required value={form.lastName} onChange={upd('lastName')}/></div>
                <div className="field"><label>Keresztnév *</label><input required value={form.firstName} onChange={upd('firstName')}/></div>
                <div className="field full"><label>Telefon *</label><input required value={form.phone} onChange={upd('phone')} placeholder="+36 30 123 4567"/></div>
                <div className="field"><label>Irányítószám *</label><input required value={form.zip} onChange={upd('zip')}/></div>
                <div className="field"><label>Város *</label><input required value={form.city} onChange={upd('city')}/></div>
                <div className="field full"><label>Cím *</label><input required value={form.address} onChange={upd('address')} placeholder="Utca, házszám"/></div>
                <div className="field full"><label>Megjegyzés (opcionális)</label><textarea value={form.notes} onChange={upd('notes')} placeholder="Pl. csengő nem szól, kérjük telefonon jelezni"/></div>
              </div>
              <div style={{display: 'flex', gap: 12, marginTop: 28, justifyContent: 'space-between'}}>
                <button type="button" className="btn btn-soft" onClick={() => navigate('/kosar')}>Vissza a kosárhoz</button>
                <button type="submit" className="btn btn-primary">Tovább <Icon name="arrowRight" size={16}/></button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h3 style={{marginBottom: 24}}>Szállítási mód</h3>
              <div className="opt-list">
                {[
                  {id: 'gls', t: 'GLS futárszolgálat', d: '1–3 munkanap', price: subtotal >= 15000 ? 0 : 1490},
                  {id: 'foxpost', t: 'Foxpost automata', d: 'Választhat automatát', price: 990},
                  {id: 'pickup', t: 'Személyes átvétel', d: 'SmileDent rendelő, Budapest II. ker.', price: 0},
                ].map(o => (
                  <label key={o.id} className={'opt-list-label ' + (shipMethod === o.id ? 'checked' : '')}
                    style={{cursor: 'pointer'}}
                    onClick={() => setShipMethod(o.id)}>
                    <input type="radio" name="ship" checked={shipMethod === o.id} onChange={() => setShipMethod(o.id)} style={{accentColor: 'var(--orange)'}}/>
                    <div>
                      <div className="opt-title">{o.t}</div>
                      <div className="opt-desc">{o.d}</div>
                    </div>
                    <span className="opt-price">{o.price === 0 ? 'Ingyenes' : fmtPrice(o.price)}</span>
                  </label>
                ))}
              </div>
              <h3 style={{marginTop: 36, marginBottom: 24}}>Fizetési mód</h3>
              <div className="opt-list">
                {[
                  {id: 'card', t: 'Bankkártya (SimplePay)', d: 'Visa, MasterCard, Maestro'},
                  {id: 'transfer', t: 'Banki átutalás', d: 'A rendelés visszaigazolása után'},
                  {id: 'cash', t: 'Utánvét', d: 'Átvételkor fizet (+490 Ft)'},
                ].map(o => (
                  <label key={o.id} className={'opt-list-label ' + (payMethod === o.id ? 'checked' : '')}
                    style={{cursor: 'pointer'}}
                    onClick={() => setPayMethod(o.id)}>
                    <input type="radio" name="pay" checked={payMethod === o.id} onChange={() => setPayMethod(o.id)} style={{accentColor: 'var(--orange)'}}/>
                    <div>
                      <div className="opt-title">{o.t}</div>
                      <div className="opt-desc">{o.d}</div>
                    </div>
                  </label>
                ))}
              </div>
              <label style={{display: 'flex', gap: 10, marginTop: 24, fontSize: 13, color: 'var(--navy-soft)', alignItems: 'start'}}>
                <input type="checkbox" required style={{marginTop: 3, accentColor: 'var(--orange)'}}/>
                <span>Elfogadom az <a href="#" style={{textDecoration: 'underline'}}>ÁSZF</a>-et és az <a href="#" style={{textDecoration: 'underline'}}>adatvédelmi tájékoztatót</a>.</span>
              </label>
              <div style={{display: 'flex', gap: 12, marginTop: 28, justifyContent: 'space-between'}}>
                <button type="button" className="btn btn-soft" onClick={() => setStep(1)}><Icon name="arrowLeft" size={16}/> Vissza</button>
                <button type="submit" className="btn btn-primary btn-lg">Megrendelés véglegesítése</button>
              </div>
            </>
          )}
        </form>

        <aside>
          <div className="summary-card">
            <h3 style={{fontSize: 17}}>Rendelés</h3>
            <div style={{maxHeight: 280, overflowY: 'auto', margin: '0 -8px 14px', padding: '0 8px'}}>
              {cart.map(item => (
                <div key={item.product.id} style={{display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--line-soft)', fontSize: 13}}>
                  <div style={{width: 48, height: 48, borderRadius: 8, background: 'var(--bg-2)', overflow: 'hidden', flexShrink: 0}}>
                    <ProductImg product={item.product}/>
                  </div>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontWeight: 500, fontSize: 13, lineHeight: 1.3, color: 'var(--ink)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{item.product.name}</div>
                    <div style={{color: 'var(--muted)', fontSize: 12, marginTop: 2}}>{item.qty} × {fmtPrice(item.product.price)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-row"><span>Részösszeg</span><span>{fmtPrice(subtotal)}</span></div>
            <div className="summary-row"><span>Szállítás</span><span>{shipCost === 0 ? 'Ingyenes' : fmtPrice(shipCost)}</span></div>
            <div className="summary-row total"><span>Fizetendő</span><span>{fmtPrice(total)}</span></div>
          </div>
        </aside>
      </div>
      <style>{`.opt-list-label { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border: 1.5px solid var(--line); border-radius: var(--r-md); transition: border .15s; }
        .opt-list-label:hover { border-color: var(--navy-muted); }
        .opt-list-label.checked { border-color: var(--orange); background: var(--surface-tint); }`}</style>
    </main>
  );
};

window.CartPage = CartPage;
window.CheckoutPage = CheckoutPage;
