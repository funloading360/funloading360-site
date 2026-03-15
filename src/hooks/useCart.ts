"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getProductById, getPriceForTier, PricingTier, Product } from "@/lib/services";

/**
 * Cart Item: Product + tier selection + quantity
 */
export interface CartItem {
  productId: string;
  selectedTier: PricingTier;
  quantity: number;
  addedAt: number; // timestamp for debugging
}

/**
 * Cart State: Items + metadata
 */
export interface Cart {
  items: CartItem[];
  version: 1; // for future migrations
  lastModified: number;
  sessionId: string; // unique ID per tab (prevents race conditions)
}

/**
 * Cart Hook Return
 */
export interface UseCartReturn {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  // Operations
  addToCart: (productId: string, tier: PricingTier, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateTier: (productId: string, tier: PricingTier) => void;
  clearCart: () => void;
  // Getters
  getCartTotal: () => number;
  getItemCount: () => number;
  getProduct: (productId: string) => Product | undefined;
  getItemPrice: (item: CartItem) => number;
}

const CART_STORAGE_KEY = "funloading360_cart";
const SESSION_ID_KEY = "funloading360_session";

/**
 * generateSessionId - Create unique ID for this tab/window
 * Prevents race conditions when user opens multiple tabs
 */
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

/**
 * getSessionId - Get or create persistent session ID for this tab
 */
function getSessionId(): string {
  if (typeof window === "undefined") return generateSessionId();

  const stored = sessionStorage.getItem(SESSION_ID_KEY);
  if (stored) return stored;

  const newId = generateSessionId();
  sessionStorage.setItem(SESSION_ID_KEY, newId);
  return newId;
}

/**
 * useCart - Shopping cart state management hook
 *
 * Features:
 * - localStorage persistence (survives page refresh)
 * - Multi-tab safety (sessionId prevents collisions)
 * - Type-safe with Product types
 * - Error handling with graceful fallback
 *
 * @example
 * const { items, addToCart, removeFromCart, getCartTotal } = useCart()
 * addToCart('360-slow-motion', 'signature', 1)
 * console.log(items.length) // 1
 * console.log(getCartTotal()) // £300 (or similar)
 */
export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>("");

  // Initialize on mount
  useEffect(() => {
    try {
      sessionIdRef.current = getSessionId();
      const stored = localStorage.getItem(CART_STORAGE_KEY);

      if (stored) {
        const cart: Cart = JSON.parse(stored);
        // Validate version (for future migrations)
        if (cart.version !== 1) {
          console.warn("Cart version mismatch, resetting");
          setItems([]);
        } else {
          setItems(cart.items || []);
        }
      } else {
        setItems([]);
      }
      setError(null);
    } catch (err) {
      console.error("[useCart] Failed to load cart:", err);
      setError("Failed to load cart from storage");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (isLoading) return; // Don't persist during initial load

    try {
      const cart: Cart = {
        items,
        version: 1,
        lastModified: Date.now(),
        sessionId: sessionIdRef.current,
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      setError(null);
    } catch (err) {
      console.error("[useCart] Failed to persist cart:", err);
      setError("Failed to save cart");
    }
  }, [items, isLoading]);

  /**
   * Add product to cart
   * If product already exists, increment quantity instead of adding duplicate
   */
  const addToCart = useCallback(
    (productId: string, tier: PricingTier, quantity: number = 1) => {
      if (!getProductById(productId)) {
        setError(`Product not found: ${productId}`);
        return;
      }

      if (quantity < 1) {
        setError("Quantity must be at least 1");
        return;
      }

      setItems((prev) => {
        // Check if product already in cart
        const existingIndex = prev.findIndex((item) => item.productId === productId);

        if (existingIndex !== -1) {
          // Update existing item
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
            selectedTier: tier,
            addedAt: Date.now(),
          };
          return updated;
        }

        // Add new item
        return [
          ...prev,
          {
            productId,
            selectedTier: tier,
            quantity,
            addedAt: Date.now(),
          },
        ];
      });
    },
    []
  );

  /**
   * Remove product from cart entirely
   */
  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  /**
   * Update quantity for product
   */
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  /**
   * Change tier for product (e.g., Essential → Signature)
   */
  const updateTier = useCallback((productId: string, tier: PricingTier) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, selectedTier: tier } : item
      )
    );
  }, []);

  /**
   * Empty the cart
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  /**
   * Calculate total price for cart
   * Sums (price × quantity) for all items
   */
  const getCartTotal = useCallback((): number => {
    return items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      if (!product) return sum;
      const price = getPriceForTier(product, item.selectedTier);
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  /**
   * Get total number of items in cart
   */
  const getItemCount = useCallback((): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  /**
   * Get product details by ID
   */
  const getProduct = useCallback((productId: string): Product | undefined => {
    return getProductById(productId);
  }, []);

  /**
   * Get price for specific cart item
   */
  const getItemPrice = useCallback((item: CartItem): number => {
    const product = getProductById(item.productId);
    if (!product) return 0;
    return getPriceForTier(product, item.selectedTier);
  }, []);

  return {
    items,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateTier,
    clearCart,
    getCartTotal,
    getItemCount,
    getProduct,
    getItemPrice,
  };
}
