// Meta Pixel Event Tracking

/**
 * Track AddToCart event
 * @param {Object} product - Product details
 * @param {string} product.id - Product ID
 * @param {string} product.name - Product name
 * @param {number} product.price - Product price
 * @param {string} size - Selected size (optional)
 */
export const trackAddToCart = (product, size = "") => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'BDT',
      content_category: product.category || '',
      ...(size && { size: size })
    });
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
  if (typeof window !== 'undefined' && window.fbq) {
    const contents = orderData.items.map(item => ({
      id: item._id,
      quantity: item.quantity,
      item_price: item.price
    }));

    const contentIds = orderData.items.map(item => item._id);

    window.fbq('track', 'Purchase', {
      content_ids: contentIds,
      contents: contents,
      content_type: 'product',
      value: orderData.amount,
      currency: 'BDT',
      num_items: orderData.items.length
    });
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
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
    console.log(`📊 Meta Pixel: ${eventName} event fired`, params);
  } else {
    console.warn('⚠️ Meta Pixel not loaded - Custom event not tracked');
  }
};
