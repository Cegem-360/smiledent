// SmileDent — App router & state
const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA, useCallback: useCallbackA } = React;

// Simple hash router
const parseRoute = () => {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const parts = hash.split('/').filter(Boolean);
  let path = '/' + parts.join('/');
  let param = null;
  if (parts[0] === 'kategoria' && parts[1]) {
    path = '/kategoria/' + parts[1];
    param = parts[1];
  } else if (parts[0] === 'termek' && parts[1]) {
    path = '/termek/' + parts.slice(1).join('/');
    param = parts.slice(1).join('/');
  }
  return { path, param };
};

const App = () => {
  const [route, setRoute] = useStateA(parseRoute());
  const [cart, setCart] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem('sd_cart') || '[]'); } catch { return []; }
  });
  const [wishlist, setWishlist] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem('sd_wishlist') || '[]'); } catch { return []; }
  });
  const [brandFilter, setBrandFilter] = useStateA([]);
  const [search, setSearch] = useStateA('');
  const [toastMsg, setToastMsg] = useStateA('');

  useEffectA(() => {
    const onHash = () => { setRoute(parseRoute()); window.scrollTo({top: 0, behavior: 'instant'}); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffectA(() => {
    localStorage.setItem('sd_cart', JSON.stringify(cart));
  }, [cart]);

  useEffectA(() => {
    localStorage.setItem('sd_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const navigate = useCallbackA((p) => {
    window.location.hash = p;
  }, []);

  const toast = useCallbackA((msg) => {
    setToastMsg(msg);
    clearTimeout(window.__sdToastT);
    window.__sdToastT = setTimeout(() => setToastMsg(''), 2400);
  }, []);

  const addToCart = useCallbackA((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? {...i, qty: i.qty + qty} : i);
      return [...prev, { product, qty }];
    });
    toast(`„${product.name.slice(0, 40)}…" hozzáadva a kosárhoz`);
  }, [toast]);

  const updateCartQty = useCallbackA((id, qty) => {
    if (qty < 1) { setCart(prev => prev.filter(i => i.product.id !== id)); return; }
    setCart(prev => prev.map(i => i.product.id === id ? {...i, qty} : i));
  }, []);

  const removeFromCart = useCallbackA((id) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
    toast('Termék eltávolítva');
  }, [toast]);

  const clearCart = useCallbackA(() => setCart([]), []);

  const toggleWishlist = useCallbackA((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const ctx = useMemoA(() => ({
    route, navigate, cart, addToCart, updateCartQty, removeFromCart, clearCart,
    brandFilter, setBrandFilter, search, setSearch, toast,
    wishlist, toggleWishlist,
  }), [route, cart, brandFilter, search, navigate, addToCart, updateCartQty, removeFromCart, clearCart, toast, wishlist, toggleWishlist]);

  window.useApp = () => ctx;

  // Route to page
  let page;
  if (route.path === '/') page = <window.HomePage />;
  else if (route.path === '/bolt') page = <window.ShopPage />;
  else if (route.path.startsWith('/kategoria/')) page = <window.ShopPage initialGroup={route.param} />;
  else if (route.path.startsWith('/termek/')) page = <window.ProductDetailPage slug={route.param} />;
  else if (route.path === '/kosar') page = <window.CartPage />;
  else if (route.path === '/penztar') page = <window.CheckoutPage />;
  else if (route.path === '/konzultacio') page = <window.ConsultPage />;
  else if (route.path === '/rolunk') page = <window.AboutPage />;
  else if (route.path === '/szallitas') page = <window.ShippingPage />;
  else if (route.path === '/kapcsolat') page = <window.ContactPage />;
  else if (route.path === '/fiok') page = <window.AccountPage />;
  else page = <window.HomePage />;

  return (
    <>
      <Header />
      <div data-screen-label={route.path}>
        {page}
      </div>
      <Footer />
      <Toast message={toastMsg} />
    </>
  );
};

window.App = App;
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
