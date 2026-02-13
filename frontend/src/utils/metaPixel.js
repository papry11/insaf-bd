// Meta Pixel Event Tracking
// Using BDT for all events to maintain accurate e-commerce analytics
// All monetary values use proper decimal formatting (2 decimal places)

// Prevent duplicate events within short timeframes
const eventCooldowns = new Map();
const COOLDOWN_MS = 1000; // 1 second cooldown

const shouldTrackEvent = (eventKey) => {
  const now = Date.now();
  const lastTracked = eventCooldowns.get(eventKey);

  if (!lastTracked || (now - lastTracked) > COOLDOWN_MS) {
    eventCooldowns.set(eventKey, now);
    return true;
  }
  return false;
};

/**
 * Track AddToCart event
 * @param {Object} product - Product details
 * @param {string} product.id - Product ID
 * @param {string} product.name - Product name
 * @param {number} product.price - Product price
 * @param {string} size - Selected size (optional)
 */
export const trackAddToCart = (product, size = "") => {
  // Ensure we have valid product data
  if (!product || !product.id || !product.name) {
    console.warn('📊 Meta Pixel: AddToCart event skipped - invalid product data', product);
    return;
  }

  const eventKey = `addToCart_${product.id}_${size}`;

  if (!shouldTrackEvent(eventKey)) {
    console.log('📊 Meta Pixel: AddToCart event skipped (cooldown)', {
      product: product.name,
      size
    });
    return;
  }

  if (typeof window !== 'undefined' && window.fbq && window._fbqInitialized) {
    const addToCartData = {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: parseFloat((product.price || 0).toFixed(2)), // Ensure 2 decimal places
      currency: 'BDT',
      content_category: product.category || '',
      ...(size && { size: size })
    };

    window.fbq('track', 'AddToCart', addToCartData);
    console.log('📊 Meta Pixel: AddToCart event fired', {
      product: product.name,
      price: product.price,
      size
    });
  } else {
    console.warn('⚠️ Meta Pixel not loaded - AddToCart event not tracked');
  }
};

/**
 * Track Purchase event
 * @param {Object} orderData
 * @param {Array} orderData.items
 * @param {number} orderData.amount
 */
export const trackPurchase = (orderData) => {
  // Ensure we have valid data
  if (!orderData || !orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
    console.warn('📊 Meta Pixel: Purchase event skipped - no items or invalid data', orderData);
    return;
  }

  const eventKey = `purchase_${orderData.amount}_${orderData.items.length}_${Date.now()}`;

  if (!shouldTrackEvent(eventKey)) {
    console.log('📊 Meta Pixel: Purchase event skipped (cooldown)', {
      amount: orderData.amount,
      items: orderData.items.length
    });
    return;
  }

  if (typeof window !== 'undefined' && window.fbq && window._fbqInitialized) {
    const contents = orderData.items.map(item => ({
      id: item._id || item.productId,
      quantity: item.quantity || 1,
      item_price: parseFloat((item.price || 0).toFixed(2)) // Ensure 2 decimal places
    }));

    const contentIds = orderData.items.map(item => item._id || item.productId);

    const purchaseData = {
      content_ids: contentIds,
      contents: contents,
      content_type: 'product',
      value: parseFloat((orderData.amount || 0).toFixed(2)), // Ensure 2 decimal places
      currency: 'BDT', // Use BDT to maintain accurate analytics
      num_items: orderData.items.length
    };

    window.fbq('track', 'Purchase', purchaseData);
    console.log('📊 Meta Pixel: Purchase event fired', {
      amount: orderData.amount,
      items: orderData.items.length
    });
  } else {
    console.warn('⚠️ Meta Pixel not loaded - Purchase event not tracked');
  }
};

/**
 * Track custom events (for future use)
 * @param {string} eventName - Event name
 * @param {Object} params - Event parameters
 */
export const trackCustomEvent = (eventName, params = {}) => {
  const eventKey = `custom_${eventName}_${JSON.stringify(params)}`;

  if (!shouldTrackEvent(eventKey)) {
    console.log(`📊 Meta Pixel: ${eventName} event skipped (cooldown)`, params);
    return;
  }

  if (typeof window !== 'undefined' && window.fbq && window._fbqInitialized) {
    window.fbq('track', eventName, params);
    console.log(`📊 Meta Pixel: ${eventName} event fired`, params);
  } else {
    console.warn('⚠️ Meta Pixel not loaded - Custom event not tracked');
  }
};
