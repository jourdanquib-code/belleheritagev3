// Belle Heritage Boutique — JEWELRY catalog + filter/cart logic (mockup)

const PRODUCTS = [
  // Pendants
  { id: 'p1', name: 'Floral Cabochon Pendant', collection: 'Pendants', price: 28, img: 'images/Boutique-Flowers.webp', desc: 'Vintage floral art set under glass in an antiqued silver setting.' },
  { id: 'p2', name: 'French Crest Pendant', collection: 'Pendants', price: 28, img: 'images/Boutique-FrenchCrest.webp', desc: 'Fleur-de-lis royal crest on a bronze oval — a nod to French Louisiana.' },
  { id: 'p3', name: 'Fleur-de-lis Pendant', collection: 'Pendants', price: 24, img: '', desc: 'The iconic fleur-de-lis in hand-finished metal on an adjustable cord.' },
  { id: 'p4', name: 'Magnolia Cameo Pendant', collection: 'Pendants', price: 26, img: '', desc: 'A soft magnolia cameo framed in an heirloom-style bezel.' },

  // Earrings
  { id: 'e1', name: 'Fleur-de-lis Earrings', collection: 'Earrings', price: 18, img: 'images/Boutique-Earrings.webp', desc: 'Dangling fleur-de-lis drops on hooks — light, everyday elegant.' },
  { id: 'e2', name: 'Creole Drop Earrings', collection: 'Earrings', price: 20, img: '', desc: 'Antiqued drops inspired by Creole design motifs.' },
  { id: 'e3', name: 'Pearl Heritage Earrings', collection: 'Earrings', price: 22, img: '', desc: 'Simple pearl drops with a vintage-finish setting.' },
];

let activeCollections = new Set();
let maxPrice = 50;
let cartCount = 0;

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  let visible = 0;
  grid.querySelectorAll('.product-card').forEach(card => {
    const col = card.dataset.collection;
    const price = parseFloat(card.dataset.price);
    const collectionOk = activeCollections.size === 0 || activeCollections.has(col);
    const priceOk = price <= maxPrice;
    if (collectionOk && priceOk) {
      card.classList.remove('product-hidden');
      visible++;
    } else {
      card.classList.add('product-hidden');
    }
  });
  const countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = visible + (visible === 1 ? ' item' : ' items');
}

function buildGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" data-collection="${p.collection}" data-price="${p.price}">
      <div class="product-image">
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}">`
          : `<div class="img-fallback" data-label="Photo coming soon"></div>`}
        <span class="product-collection-tag">${p.collection}</span>
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price}</span>
          <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      const cc = document.querySelector('.cart-count');
      if (cc) cc.textContent = cartCount;
      btn.textContent = 'Added ✓';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--navy-deep)';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
        btn.style.color = '';
      }, 1400);
    });
  });
}

function initShop(presetCollection) {
  buildGrid();

  document.querySelectorAll('.collection-filter').forEach(cb => {
    if (presetCollection && cb.value === presetCollection) {
      cb.checked = true;
      activeCollections.add(presetCollection);
    }
    cb.addEventListener('change', () => {
      if (cb.checked) activeCollections.add(cb.value);
      else activeCollections.delete(cb.value);
      renderProducts();
    });
  });

  const slider = document.getElementById('priceSlider');
  if (slider) {
    slider.addEventListener('input', () => {
      maxPrice = parseFloat(slider.value);
      const disp = document.getElementById('priceDisplay');
      if (disp) disp.textContent = 'Up to $' + maxPrice;
      renderProducts();
    });
  }

  const clear = document.getElementById('clearFilters');
  if (clear) {
    clear.addEventListener('click', () => {
      activeCollections.clear();
      maxPrice = 50;
      document.querySelectorAll('.collection-filter').forEach(cb => cb.checked = false);
      if (slider) slider.value = 50;
      const disp = document.getElementById('priceDisplay');
      if (disp) disp.textContent = 'Up to $50';
      renderProducts();
    });
  }

  renderProducts();
}
