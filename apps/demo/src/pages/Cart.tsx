import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, useToast } from "prism-ui-headless-react";
import { useCart } from "../store";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total, count } =
    useCart();
  const { addToast } = useToast();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = (id: number, name: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingId(null);
      addToast({
        title: "Removed",
        description: `${name} removed from cart.`,
        type: "info",
        duration: 2000,
      });
    }, 250);
  };

  const handleClear = () => {
    clearCart();
    addToast({
      title: "Cart cleared",
      description: "All items removed.",
      type: "info",
      duration: 2000,
    });
  };

  if (count === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products">
          <Button variant="primary" size="lg">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const shipping = total >= 50 ? 0 : 5.99;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>
          Shopping Cart ({count} {count === 1 ? "item" : "items"})
        </h1>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear Cart
        </Button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <Card
              key={item.id}
              className={`cart-item${removingId === item.id ? " removing" : ""}`}
            >
              <CardBody className="cart-item-body">
                <Link
                  to={`/products/${item.product.id}`}
                  className="cart-item-image"
                >
                  <img src={item.product.image} alt={item.product.name} />
                </Link>

                <div className="cart-item-details">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="cart-item-name"
                  >
                    {item.product.name}
                  </Link>
                  <div className="cart-item-meta">
                    {item.color && (
                      <span className="cart-item-color">
                        <span
                          className="color-dot"
                          style={{ background: item.color }}
                        />
                        {item.color}
                      </span>
                    )}
                    {item.size && (
                      <span className="cart-item-size">Size: {item.size}</span>
                    )}
                  </div>
                  <span className="cart-item-unit-price">
                    ${item.product.price.toFixed(2)} each
                  </span>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      −
                    </Button>
                    <span className="quantity-value">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <span className="cart-item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cart-remove-btn"
                    onClick={() => handleRemove(item.id, item.product.name)}
                  >
                    ✕ Remove
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card className="cart-summary">
          <CardBody>
            <h2>Order Summary</h2>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <p className="free-shipping-note">
                  Add ${(50 - total).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="summary-divider" />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button variant="primary" size="lg" className="checkout-btn">
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/products" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
