
export type MetaProduct = {
    id: string;
    title: string;
    amount: number;
  };
  
  export type MetaPurchase = MetaProduct & {
    orderCode: string;
  };
  
  export function trackInitiateCheckout(
    product: MetaProduct
  ) {
    if (
      typeof window === "undefined" ||
      typeof window.fbq !== "function"
    ) return;
  
    window.fbq("track", "InitiateCheckout", {
      value: product.amount,
      currency: "VND",
      content_name: product.title,
      content_ids: [product.id],
      content_type: "product",
    });
  }
  
  export function trackPurchase(
    purchase: MetaPurchase
  ): boolean {
    if (
      typeof window === "undefined" ||
      typeof window.fbq !== "function" ||
      !purchase.orderCode ||
      !purchase.id ||
      !Number.isFinite(purchase.amount) ||
      purchase.amount <= 0
    ) return false;
  
    const storageKey =
      `meta_purchase_${purchase.orderCode}`;
  
    if (localStorage.getItem(storageKey)) {
      return true;
    }
  
    window.fbq("track", "Purchase", {
      value: purchase.amount,
      currency: "VND",
      content_name: purchase.title,
      content_ids: [purchase.id],
      content_type: "product",
    }, {
      eventID: purchase.orderCode,
    });
  
    localStorage.setItem(storageKey, "1");
  
    return true;
  }
  