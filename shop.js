// Belle Heritage Boutique — product data + filter/cart logic (mockup)

const PRODUCTS = [
  // Josette collection
  { id: 'j1', name: 'Josette & Friends Cook a Gumbo', collection: 'Josette', price: 24, img: 'images/Boutique-Josette.webp', desc: 'The illustrated story of Josette and friends making a Louisiana gumbo together.' },
  { id: 'j2', name: 'Josette Hardcover Keepsake', collection: 'Josette', price: 38, img: '', desc: 'Premium cloth-bound edition with gilt lettering — a lasting heirloom.' },
  { id: 'j3', name: 'Josette Plush Companion', collection: 'Josette', price: 32, img: '', desc: 'A soft, huggable Josette doll to bring the story to life.' },
  { id: 'j4', name: 'Josette Coloring Book', collection: 'Josette', price: 14, img: '', desc: 'Scenes from the story for young artists to bring to color.' },

  // Creole collection
  { id: 'c1', name: 'Creoles of South Louisiana', collection: 'Creole', price: 42, img: 'images/Books-Creole.webp', desc: 'Dr. Istre\'s richly researched history — three centuries of Louisiana Creole culture.' },
  { id: 'c2', name: 'First Cousins (Documentary)', collection: 'Creole', price: 25, img: 'images/Books-FirstCousins.webp', desc: 'Cajun & Creole music in south Louisiana, on film. French subtitles included.' },
  { id: 'c3', name: 'Creole Heritage Tote', collection: 'Creole', price: 28, img: '', desc: 'Sturdy canvas tote featuring original Creole-inspired artwork.' },
  { id: 'c4', name: 'Creole Notecard Set', collection: 'Creole', price: 18, img: '', desc: 'Boxed set of 12 cards celebrating Louisiana\'s Creole motifs.' },

  // Bookmarks collection
  { id: 'b1', name: 'Fleur-de-lis Brass Bookmark', collection: 'Bookmarks', price: 12, img: '', desc: 'Hand-finished brass bookmark with the iconic fleur-de-lis.' },
  { id: 'b2', name: 'Magnolia Ribbon Bookmark', collection: 'Bookmarks', price: 9, img: '', desc: 'Delicate ribbon bookmark with a pressed-magnolia charm.' },
  { id: 'b3', name: 'Heritage Tassel Bookmark', collection: 'Bookmarks', price: 11, img: '', desc: 'Leather bookmark with a hand-tied burgundy-and-gold tassel.' },
  { id: 'b4', name: 'Bayou Map Bookmark Pair', collection: 'Bookmarks', price: 15, img: '', desc: 'Set of two bookmarks printed with vintage Louisiana maps.' },
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

  // wire collection checkboxes
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

  // price slider
  const slider = document.getElementById('priceSlider');
  if (slider) {
    slider.addEventListener('input', () => {
      maxPrice = parseFloat(slider.value);
      const disp = document.getElementById('priceDisplay');
      if (disp) disp.textContent = 'Up to $' + maxPrice;
      renderProducts();
    });
  }

  // clear
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
