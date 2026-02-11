import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanel,
  useToast,
} from "prism-ui-headless-react";
import { products, useCart } from "../store";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>
        <Link to="/products">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedSize);
    }
    addToast({
      title: "Added to cart!",
      description: `${product.name} × ${quantity} added to your cart.`,
      type: "success",
      duration: 3000,
    });
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/products?cat=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <span className="product-badge product-badge-lg">
              {product.badge}
            </span>
          )}
        </div>

        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="detail-rating">
            <span className="stars">
              {"★".repeat(Math.floor(product.rating))}
            </span>
            <span>{product.rating}</span>
            <span className="review-count">({product.reviews} reviews)</span>
          </div>

          <div className="detail-price">
            <span className="price-main">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="price-original">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="price-discount">
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100,
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          {product.colors && (
            <div className="detail-option">
              <label>Color</label>
              <div className="color-options">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`color-btn${selectedColor === c ? " selected" : ""}`}
                    style={{ background: c }}
                    onClick={() => setSelectedColor(c)}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="detail-option">
              <label>Size</label>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <Button
                    key={s}
                    variant={selectedSize === s ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="detail-option">
            <label>Quantity</label>
            <div className="quantity-control">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </Button>
              <span className="quantity-value">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="detail-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>

          <Tabs defaultValue="details" className="detail-tabs">
            <TabsList className="detail-tab-list">
              <TabsTrigger value="details" className="detail-tab">
                Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="detail-tab">
                Shipping
              </TabsTrigger>
              <TabsTrigger value="returns" className="detail-tab">
                Returns
              </TabsTrigger>
            </TabsList>
            <TabsPanel value="details" className="detail-tab-panel">
              <p>{product.description}</p>
              <ul>
                <li>Premium quality materials</li>
                <li>Designed for everyday use</li>
                <li>Satisfaction guaranteed</li>
              </ul>
            </TabsPanel>
            <TabsPanel value="shipping" className="detail-tab-panel">
              <p>Free shipping on orders over $50.</p>
              <ul>
                <li>Standard: 5-7 business days</li>
                <li>Express: 2-3 business days</li>
                <li>Next Day: Available in select areas</li>
              </ul>
            </TabsPanel>
            <TabsPanel value="returns" className="detail-tab-panel">
              <p>30-day hassle-free return policy.</p>
              <ul>
                <li>Items must be unworn with tags</li>
                <li>Free return shipping</li>
                <li>Full refund within 5 business days</li>
              </ul>
            </TabsPanel>
          </Tabs>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section related-section">
          <h2>You May Also Like</h2>
          <div className="product-grid-sm">
            {related.map((p) => (
              <Link
                to={`/products/${p.id}`}
                key={p.id}
                className="product-card-link"
              >
                <Card className="product-card product-card-sm">
                  <div className="product-image product-image-sm">
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </div>
                  <CardBody className="product-info">
                    <h3 className="product-name">{p.name}</h3>
                    <span className="product-price">${p.price.toFixed(2)}</span>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
