// SmileDent — Info pages: Konzultáció, Rólunk, Szállítás, Kapcsolat, Fiók
const { useState: useStateI } = React;

// ============================================
// Konzultáció (consultation form)
// ============================================
const ConsultPage = () => {
  const app = window.useApp();
  const [sent, setSent] = useStateI(false);
  const [form, setForm] = useStateI({ name: '', email: '', phone: '', issue: '' });
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    app.toast('Üzenetét megkaptuk!');
  };
  return (
    <main className="container">
      <Breadcrumb items={[{label: 'Főoldal', path: '/'}, {label: 'Konzultáció'}]}/>
      <div className="page-head">
        <h1>Nem tudja, melyik termékre van szüksége?</h1>
      </div>
      <div className="consult-layout">
        <div className="consult-info">
          <p style={{fontSize: 17}}>
            Írja le a panaszát, és a SmileDent dentálhigiénikusa, <strong>Bogi</strong> személyre szabott termékajánlatot ad — ugyanolyan szakmai gondossággal, mintha a rendelőben járna nálunk.
          </p>
          <p>
            Nem csak terméket kap, hanem szakmai döntést a háttérhez: tudni fogjuk, hogy ínyvérzésére milyen szájvíz, érzékenységére milyen fogkrém, fogszabályzójához milyen interdentális kefe való.
          </p>
          <div className="consult-steps">
            <div className="consult-step">
              <div className="num">1</div>
              <div>
                <strong style={{color: 'var(--ink)'}}>Írja le a panaszát</strong>
                <div style={{fontSize: 14, color: 'var(--navy-muted)', marginTop: 4}}>Pl. „vérzik az ínyem fogmosáskor", „érzékeny a hidegre", „fogszabályzót hordok".</div>
              </div>
            </div>
            <div className="consult-step">
              <div className="num">2</div>
              <div>
                <strong style={{color: 'var(--ink)'}}>Visszahívjuk vagy emailben válaszolunk</strong>
                <div style={{fontSize: 14, color: 'var(--navy-muted)', marginTop: 4}}>24 órán belül, hétköznap. Tisztázzuk a részleteket — ha kell, kérdezünk vissza.</div>
              </div>
            </div>
            <div className="consult-step">
              <div className="num">3</div>
              <div>
                <strong style={{color: 'var(--ink)'}}>Megkapja az ajánlatot</strong>
                <div style={{fontSize: 14, color: 'var(--navy-muted)', marginTop: 4}}>Konkrét termék(ek), egyedi kuponkód, vagy ha szükséges, rendelői időpont.</div>
              </div>
            </div>
          </div>
          <div style={{
            background: 'var(--bg-card-peach)', borderRadius: 'var(--r-md)',
            padding: 20, marginTop: 28, display: 'flex', gap: 14, alignItems: 'start'
          }}>
            <Icon name="info" size={22} className="text-orange"/>
            <div style={{fontSize: 14, color: 'var(--navy)', lineHeight: 1.55}}>
              <strong>Komolyabb panasz?</strong> Ha azonnali fájdalma van, vagy duzzanatot tapasztal, kérjük telefonon hívjon minket: <strong>+36 30 968 0830</strong> — vagy foglaljon időpontot a <a href="https://smiledent.hu" target="_blank" style={{textDecoration: 'underline'}}>smiledent.hu</a>-n.
            </div>
          </div>
        </div>
        <div>
          {sent ? (
            <div className="form-card" style={{textAlign: 'center', padding: '56px 36px'}}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', background: 'var(--orange-soft)', color: 'var(--orange-hover)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18
              }}>
                <Icon name="check" size={32}/>
              </div>
              <h3 style={{marginBottom: 12}}>Köszönjük!</h3>
              <p style={{color: 'var(--navy-soft)', marginBottom: 24}}>
                Üzenetét megkaptuk. <strong>{form.name || 'Önnek'}</strong>, 24 órán belül jelentkezünk a megadott elérhetőségen.
              </p>
              <button className="btn btn-soft" onClick={() => { setSent(false); setForm({name:'',email:'',phone:'',issue:''}); }}>Új üzenet</button>
            </div>
          ) : (
            <form className="form-card" onSubmit={submit}>
              <h3 style={{marginBottom: 22}}>Üzenet a SmileDent csapatának</h3>
              <div className="form-grid">
                <div className="field full">
                  <label>Az Ön neve *</label>
                  <input required value={form.name} onChange={upd('name')} placeholder="Kovács Anna"/>
                </div>
                <div className="field">
                  <label>Email cím *</label>
                  <input type="email" required value={form.email} onChange={upd('email')} placeholder="email@pelda.hu"/>
                </div>
                <div className="field">
                  <label>Telefonszám *</label>
                  <input required value={form.phone} onChange={upd('phone')} placeholder="+36 30 123 4567"/>
                </div>
                <div className="field full">
                  <label>Mi a panasza? *</label>
                  <textarea required value={form.issue} onChange={upd('issue')} rows={6}
                    placeholder={'Pl. „fogmosáskor vérzik az ínyem, főleg a hátsó fogaknál" — minél részletesebben, annál pontosabb ajánlatot tudunk adni.'}/>
                  <span className="hint">A leírt panaszt nem osztjuk meg harmadik féllel. A választ emailben és / vagy telefonon küldjük.</span>
                </div>
              </div>
              <label style={{display: 'flex', gap: 10, marginTop: 18, fontSize: 13, color: 'var(--navy-soft)', alignItems: 'start'}}>
                <input type="checkbox" required style={{marginTop: 3, accentColor: 'var(--orange)'}}/>
                <span>Hozzájárulok adataim kezeléséhez az <a href="#" style={{textDecoration: 'underline'}}>adatvédelmi tájékoztató</a> szerint.</span>
              </label>
              <button type="submit" className="btn btn-primary btn-block btn-lg" style={{marginTop: 24}}>
                Üzenet küldése <Icon name="arrowRight" size={16}/>
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

// ============================================
// Rólunk (about)
// ============================================
const AboutPage = () => {
  const app = window.useApp();
  return (
    <main className="container">
      <Breadcrumb items={[{label: 'Főoldal', path: '/'}, {label: 'Rólunk'}]}/>
      <div className="page-head"><h1>Rólunk</h1></div>

      <div className="about-hero">
        <div>
          <div className="section-eyebrow">SmileDent Webshop</div>
          <h2 style={{marginBottom: 18}}>A SmileDent Fogászati Centrum hivatalos boltja.</h2>
          <p style={{color: 'var(--navy-soft)', fontSize: 17, lineHeight: 1.7, marginBottom: 16}}>
            Webshopunk azoknak készült, akik már járnak nálunk és ismerik a termékeiket — most már nem kell utánajárni, három hónap után rendelhetnek új fogkefét egy kattintással.
          </p>
          <p style={{color: 'var(--navy-soft)', fontSize: 17, lineHeight: 1.7, marginBottom: 24}}>
            De annak is, aki most ismerkedik velünk: a webshop mögött ott áll a SmileDent rendelő szakértelme. Ha nem tudja, mire van szüksége, kérjen konzultációt — dentálhigiénikusunk segít.
          </p>
          <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
            <button className="btn btn-primary" onClick={() => app.navigate('/konzultacio')}>Konzultációt kérek</button>
            <a href="https://smiledent.hu" target="_blank" className="btn btn-ghost">Rendelő honlapja ↗</a>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-card-blue), var(--bg-card-peach))',
          borderRadius: 'var(--r-xl)', padding: 32, color: 'var(--ink)',
          minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <Icon name="sparkle" size={32} className="text-orange"/>
          <div>
            <div style={{fontFamily: 'var(--ff-display)', fontSize: 26, lineHeight: 1.3, marginBottom: 12}}>
              „Fogászat a legmagasabb színvonalon."
            </div>
            <div style={{fontSize: 14, color: 'var(--navy-muted)'}}>— Dr. Antal Márk szakmai irányításával</div>
          </div>
        </div>
      </div>

      <div className="about-stats">
        {[
          {n: '2.880+', l: 'kezelt páciens'},
          {n: '4.8 / 5', l: 'Google értékelés'},
          {n: '89', l: 'webshop termék'},
          {n: '6', l: 'prémium márka'},
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-num">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>

      <section style={{margin: '64px 0'}}>
        <div className="section-head">
          <div>
            <div className="section-eyebrow">A csapatunk</div>
            <h2 className="section-title">Akik a webshop mögött állnak</h2>
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
          {[
            {n: 'Dr. Antal Márk', r: 'Szakmai vezető, fogorvos', t: 'A SmileDent megálmodója és vezetője. Csak olyan terméket ajánlunk a webshopban, amit a saját pácienseinknek is.'},
            {n: 'Antal-Szabó Réka', r: 'Adminisztratív vezető', t: 'A webshop napi működéséért, csapatáért és a páciensek koordinációjáért felel.'},
            {n: 'Bogi', r: 'Dentálhigiénikus', t: 'A konzultációs űrlapon érkező panaszokat ő válaszolja meg — szakmai, személyes ajánlattal.'},
          ].map((p, i) => (
            <div key={i} style={{background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 28, border: '1px solid var(--line-soft)'}}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--bg-card-blue), var(--bg-card-peach))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--ff-display)', fontSize: 32, color: 'var(--navy)',
                marginBottom: 18
              }}>{p.n.split(' ')[1]?.[0] || p.n[0]}</div>
              <h4 style={{marginBottom: 4}}>{p.n}</h4>
              <div style={{fontSize: 12, color: 'var(--orange-hover)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12}}>{p.r}</div>
              <p style={{fontSize: 14, color: 'var(--navy-soft)', lineHeight: 1.6}}>{p.t}</p>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 800px) { section > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <section style={{margin: '64px 0'}}>
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Miért nálunk?</div>
            <h2 className="section-title">Amit a patikában nem kap meg</h2>
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20}}>
          {[
            {ic: 'shield', t: 'Eredeti termékek', d: 'Hivatalos magyar forgalmazóktól (Sager Dental, Scipathica) — nem szürke import.'},
            {ic: 'chat', t: 'Szakmai ajánlás', d: 'A választékot a SmileDent csapata szűri. Csak olyan termék kerül a polcra, amit a rendelőben is használnánk.'},
            {ic: 'sparkle', t: 'Konzultáció ingyen', d: 'Ha nem tudja, mit válasszon, írjon nekünk. A szakmai segítség nálunk az árban van.'},
          ].map((it, i) => (
            <div key={i} style={{background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 28, border: '1px solid var(--line-soft)'}}>
              <div style={{
                width: 52, height: 52, borderRadius: 'var(--r-md)',
                background: 'var(--bg-card-peach)', color: 'var(--orange-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18
              }}>
                <Icon name={it.ic} size={24}/>
              </div>
              <h4 style={{marginBottom: 8}}>{it.t}</h4>
              <p style={{fontSize: 14, color: 'var(--navy-soft)', lineHeight: 1.6}}>{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner navigate={app.navigate} />
    </main>
  );
};

// ============================================
// Szállítás (shipping)
// ============================================
const ShippingPage = () => (
  <main className="container">
    <Breadcrumb items={[{label: 'Főoldal', path: '/'}, {label: 'Szállítás & átvétel'}]}/>
    <div className="page-head">
      <h1>Szállítás & átvétel</h1>
      <p style={{color: 'var(--navy-muted)', marginTop: 12, maxWidth: 700, fontSize: 17}}>
        Három mód közül választhat. Minden megoldásunk biztosítja, hogy a termék biztonságosan, gyorsan és diszkrét csomagolásban érkezzen meg.
      </p>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56}}>
      {[
        {ic: 'truck', t: 'GLS futárszolgálat', d: '1–3 munkanap', p: '1 490 Ft', free: '15.000 Ft felett ingyenes'},
        {ic: 'location', t: 'Foxpost csomagautomata', d: 'Válasszon közeli automatát', p: '990 Ft', free: '15.000 Ft felett ingyenes'},
        {ic: 'shield', t: 'Személyes átvétel', d: 'SmileDent rendelő, Bp. II. ker.', p: 'Ingyenes', free: 'Általában 24 órán belül'},
      ].map((it, i) => (
        <div key={i} style={{background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 32, border: '1px solid var(--line-soft)'}}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--r-md)',
            background: 'var(--bg-card-blue)', color: 'var(--navy)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
          }}>
            <Icon name={it.ic} size={26}/>
          </div>
          <h3 style={{marginBottom: 6}}>{it.t}</h3>
          <p style={{color: 'var(--navy-muted)', fontSize: 14, marginBottom: 20}}>{it.d}</p>
          <div style={{fontFamily: 'var(--ff-display)', fontSize: 28, color: 'var(--orange-hover)', marginBottom: 4}}>{it.p}</div>
          <div style={{fontSize: 13, color: 'var(--navy-soft)'}}>{it.free}</div>
        </div>
      ))}
    </div>

    <div style={{background: 'var(--surface)', borderRadius: 'var(--r-xl)', padding: 40, border: '1px solid var(--line-soft)'}}>
      <h2 style={{marginBottom: 24}}>Gyakori kérdések</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        {[
          {q: 'Mennyi idő alatt érkezik meg a csomag?', a: 'GLS és Foxpost esetén 1–3 munkanap. Személyes átvételnél általában 24 órán belül értesítjük.'},
          {q: 'Ingyenes a szállítás?', a: 'Igen, 15.000 Ft feletti rendelés esetén a GLS és Foxpost szállítás ingyenes. Személyes átvétel mindig díjmentes.'},
          {q: 'Hogyan tudok átvenni személyesen?', a: 'A pénztárnál válassza a „Személyes átvétel" opciót. Az értesítés után jöjjön be a SmileDent rendelőbe nyitvatartási időben.'},
          {q: 'Mi van, ha nem vagyok elégedett?', a: '14 napon belül indoklás nélkül visszaküldheti a bontatlan terméket. A vételárat visszautaljuk.'},
          {q: 'Külföldre szállítanak?', a: 'Jelenleg csak Magyarországra. EU-s szállításért írjon nekünk: webshop@smiledent.hu.'},
        ].map((f, i) => (
          <details key={i} style={{borderBottom: '1px solid var(--line-soft)', paddingBottom: 16}}>
            <summary style={{cursor: 'pointer', fontWeight: 600, color: 'var(--ink)', listStyle: 'none', padding: '8px 0', fontSize: 16}}>
              {f.q}
            </summary>
            <p style={{marginTop: 8, color: 'var(--navy-soft)', lineHeight: 1.6}}>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </main>
);

// ============================================
// Kapcsolat
// ============================================
const ContactPage = () => {
  const [form, setForm] = useStateI({ name: '', email: '', msg: '' });
  const [sent, setSent] = useStateI(false);
  const app = window.useApp();
  return (
    <main className="container">
      <Breadcrumb items={[{label: 'Főoldal', path: '/'}, {label: 'Kapcsolat'}]}/>
      <div className="page-head"><h1>Kapcsolat</h1></div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'start'}}>
        <div>
          <p style={{fontSize: 17, color: 'var(--navy-soft)', marginBottom: 32, lineHeight: 1.7}}>
            Kérdés a rendelésével kapcsolatban, vagy bármi egyéb? Írjon nekünk emailt, vagy hívjon minket nyitvatartási időben.
          </p>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            {[
              {ic: 'phone', t: 'Telefon', v: '+36 30 968 0830', s: 'Hétfő–Péntek, 8:00–18:00'},
              {ic: 'mail', t: 'Email', v: 'webshop@smiledent.hu', s: '24 órán belül válaszolunk'},
              {ic: 'location', t: 'Cím', v: 'Budapest, II. kerület', s: 'SmileDent Fogászati Centrum'},
              {ic: 'clock', t: 'Nyitvatartás', v: 'H–P: 8:00–18:00', s: 'Hétvégén időpont szerint'},
            ].map((it, i) => (
              <div key={i} style={{display: 'flex', gap: 16, alignItems: 'start'}}>
                <div style={{
                  width: 46, height: 46, borderRadius: 'var(--r-md)',
                  background: 'var(--bg-card-peach)', color: 'var(--orange-hover)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Icon name={it.ic} size={20}/>
                </div>
                <div>
                  <div style={{fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600}}>{it.t}</div>
                  <div style={{fontSize: 17, color: 'var(--ink)', fontWeight: 600, margin: '2px 0'}}>{it.v}</div>
                  <div style={{fontSize: 13, color: 'var(--navy-muted)'}}>{it.s}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 36, background: 'var(--navy)', color: 'white',
            padding: 28, borderRadius: 'var(--r-lg)'
          }}>
            <h4 style={{color: 'white', marginBottom: 12}}>SmileDent rendelő</h4>
            <p style={{color: 'rgba(255,255,255,.75)', marginBottom: 16, fontSize: 14, lineHeight: 1.6}}>
              A rendelőt és a fogászati szolgáltatásokat a smiledent.hu oldalon érheti el. Időpontfoglalás, szakembereink, kezelések részletei.
            </p>
            <a href="https://smiledent.hu" target="_blank" className="btn btn-primary btn-sm">smiledent.hu ↗</a>
          </div>
        </div>
        <div>
          {sent ? (
            <div className="form-card" style={{textAlign: 'center', padding: '56px 36px'}}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: 'var(--orange-soft)', color: 'var(--orange-hover)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18
              }}>
                <Icon name="check" size={28}/>
              </div>
              <h3>Üzenet elküldve!</h3>
              <p style={{color: 'var(--navy-soft)', marginTop: 12}}>Hamarosan jelentkezünk a megadott emailcímen.</p>
            </div>
          ) : (
            <form className="form-card" onSubmit={(e) => { e.preventDefault(); setSent(true); app.toast('Üzenet elküldve!'); }}>
              <h3 style={{marginBottom: 22}}>Általános kapcsolat</h3>
              <div className="form-grid">
                <div className="field full"><label>Név *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}/></div>
                <div className="field full"><label>Email *</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}/></div>
                <div className="field full"><label>Üzenet *</label><textarea required rows={6} value={form.msg} onChange={e => setForm({...form, msg: e.target.value})}/></div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg" style={{marginTop: 22}}>Küldés</button>
              <div style={{marginTop: 18, padding: 14, background: 'var(--surface-tint)', borderRadius: 10, fontSize: 13, color: 'var(--navy-muted)'}}>
                <strong style={{color: 'var(--navy)'}}>Szakmai kérdéssel</strong> jobb, ha a <a href="#" onClick={(e) => {e.preventDefault(); app.navigate('/konzultacio');}} style={{textDecoration: 'underline', color: 'var(--orange-hover)'}}>Konzultáció</a> űrlapot használja — ott részletesebb választ tudunk adni.
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { main > div[style*="grid-template-columns: 1fr 1.2fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
};

// ============================================
// Fiók / Bejelentkezés
// ============================================
const AccountPage = () => {
  const [tab, setTab] = useStateI('login');
  const app = window.useApp();
  return (
    <main className="container">
      <Breadcrumb items={[{label: 'Főoldal', path: '/'}, {label: 'Fiók'}]}/>
      <div className="page-head"><h1>Fiók</h1></div>
      <div style={{maxWidth: 480, margin: '0 auto'}}>
        <div className="tab-row" style={{margin: '0 auto 28px'}}>
          <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Bejelentkezés</button>
          <button className={tab === 'reg' ? 'active' : ''} onClick={() => setTab('reg')}>Regisztráció</button>
        </div>
        <div className="form-card">
          {tab === 'login' ? (
            <form onSubmit={(e) => { e.preventDefault(); app.toast('Bejelentkezés sikeres (demo)'); app.navigate('/'); }}>
              <div className="field" style={{marginBottom: 16}}><label>Email cím</label><input type="email" required placeholder="email@pelda.hu"/></div>
              <div className="field" style={{marginBottom: 8}}><label>Jelszó</label><input type="password" required/></div>
              <a href="#" style={{fontSize: 13, color: 'var(--orange-hover)'}}>Elfelejtett jelszó?</a>
              <button type="submit" className="btn btn-primary btn-block btn-lg" style={{marginTop: 24}}>Bejelentkezés</button>
              <div style={{textAlign: 'center', fontSize: 13, color: 'var(--navy-muted)', marginTop: 18}}>
                Még nincs fiókja? <a href="#" onClick={(e) => {e.preventDefault(); setTab('reg');}} style={{color: 'var(--orange-hover)', fontWeight: 600}}>Regisztráljon</a>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); app.toast('Regisztráció sikeres (demo)'); setTab('login'); }}>
              <div className="form-grid">
                <div className="field"><label>Vezetéknév</label><input required/></div>
                <div className="field"><label>Keresztnév</label><input required/></div>
                <div className="field full"><label>Email cím</label><input type="email" required placeholder="email@pelda.hu"/></div>
                <div className="field full"><label>Telefon</label><input required/></div>
                <div className="field"><label>Jelszó</label><input type="password" required/></div>
                <div className="field"><label>Jelszó újra</label><input type="password" required/></div>
              </div>
              <label style={{display: 'flex', gap: 10, marginTop: 18, fontSize: 13, color: 'var(--navy-soft)'}}>
                <input type="checkbox" required style={{marginTop: 3, accentColor: 'var(--orange)'}}/>
                <span>Elfogadom az ÁSZF-et és az adatvédelmi tájékoztatót.</span>
              </label>
              <button type="submit" className="btn btn-primary btn-block btn-lg" style={{marginTop: 22}}>Regisztráció</button>
            </form>
          )}
        </div>
        <div style={{marginTop: 24, padding: 18, background: 'var(--surface-tint)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--navy-muted)', textAlign: 'center'}}>
          <Icon name="info" size={14}/> Ez egy <strong>prototípus</strong> — a fiók funkciók demonstrációs jellegűek.
        </div>
      </div>
    </main>
  );
};

window.ConsultPage = ConsultPage;
window.AboutPage = AboutPage;
window.ShippingPage = ShippingPage;
window.ContactPage = ContactPage;
window.AccountPage = AccountPage;
