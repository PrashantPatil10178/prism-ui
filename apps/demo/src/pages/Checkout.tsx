import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Input, useToast } from "@prism-ui/react";
import { useCart } from "../store";

export default function Checkout() {
  const { items, total, count, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const shipping = total >= 50 ? 0 : 5.99;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      clearCart();
      addToast({
        title: "Order placed! 🎉",
        description: "Thank you for your purchase. Your order is being processed.",
        type: "success",
        duration: 5000,
      });
      navigate("/");
    }, 1500);
  };

  if (count === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">📦</div>
        <h1>Nothing to Checkout</h1>
        <p>Your cart is empty. Add some items first.</p>
        <Link to="/products">
          <Button variant="primary" size="lg">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit} className="checkout-layout">
        <div className="checkout-form">
          <Card className="checkout-section">
            <CardBody>
              <h2>Contact Information</h2>
              <div className="form-grid">
                <Input
                  label="First Name"
                  value={form.firstName}
                  onChange={set("firstName")}
                  required
                  placeholder="John"
                />
                <Input
                  label="Last Name"
                  value={form.lastName}
                  onChange={set("lastName")}
                  required
                  placeholder="Doe"
                />
                <Input
                  className="full-width"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </CardBody>
          </Card>

          <Card className="checkout-section">
            <CardBody>
              <h2>Shipping Address</h2>
              <div className="form-grid">
                <Input
                  className="full-width"
                  label="Address"
                  value={form.address}
                  onChange={set("address")}
                  required
                  placeholder="123 Main St"
                />
                <Input
                  label="City"
                  value={form.city}
                  onChange={set("city")}
                  required
                  placeholder="New York"
                />
                <Input
                  label="ZIP Code"
                  value={form.zip}
                  onChange={set("zip")}
                  required
                  placeholder="10001"
                />
              </div>
            </CardBody>
          </Card>

          <Card className="checkout-section">
            <CardBody>
              <h2>Payment</h2>
              <div className="form-grid">
                <Input
                  className="full-width"
                  label="Card Number"
                  value={form.cardNumber}
                  onChange={set("cardNumber")}
                  required
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                />
                <Input
                  label="Expiry"
                  value={form.expiry}
                  onChange={set("expiry")}
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                />
                <Input
                  label="CVC"
                  value={form.cvc}
                  onChange={set("cvc")}
                  required
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="checkout-sidebar">
          <Card className="checkout-summary sticky">
            <CardBody>
              <h2>Order Summary</h2>
              <div className="summary-items">
                {items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <img src={item.product.image} alt={item.product.name} className="summary-item-img" />
                    <div className="summary-item-info">
                      <span className="summary-item-name">{item.product.name}</span>
                      <span className="summary-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="summary-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider" />
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="place-order-btn"
                disabled={submitting}
              >
                {submitting ? "Processing…" : `Place Order — $${orderTotal.toFixed(2)}`}
              </Button>
            </CardBody>
          </Card>
        </div>
      </form>
    </div>
  );
}
