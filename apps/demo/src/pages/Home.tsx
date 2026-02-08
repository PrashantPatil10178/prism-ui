import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, Input, Tabs, TabsList, TabsTrigger, TabsPanel } from "@prism-ui/react";
import { products, categories, useCart } from "../store";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">New Collection 2026</span>
        <h1 className="hero-title">
          Discover Products
          <br />
          <span className="hero-accent">You'll Love</span>
        </h1>
        <p className="hero-subtitle">
          Curated collection of premium products. Built as a demo showcase for Prism UI headless components.
        </p>
        <div className="hero-actions">
          <Link to="/products">
            <Button variant="primary" size="lg">
              Shop Now
            </Button>
          </Link>
          <Link to="/products?cat=clothing">
            <Button variant="outline" size="lg">
              Browse Clothing
            </Button>
          </Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>500+</strong>
            <span>Products</span>
          </div>
          <div className="hero-stat">
            <strong>50k+</strong>
            <span>Customers</span>
          </div>
          <div className="hero-stat">
            <strong>4.9</strong>
            <span>Rating</span>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
          alt="Featured collection"
        />
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const featured = products.slice(0, 4);
  const { addItem } = useCart();

  return (
    <section className="section">
      <div className="section-header">
        <h2>Featured Products</h2>
        <Link to="/products" className="section-link">
          View All →
        </Link>
      </div>
      <div className="product-grid">
        {featured.map((p) => (
          <Link to={`/products/${p.id}`} key={p.id} className="product-card-link">
            <Card className="product-card">
              <div className="product-image">
                <img src={p.image} alt={p.name} loading="lazy" />
                {p.badge && <span className="product-badge">{p.badge}</span>}
              </div>
              <CardBody className="product-info">
                <span className="product-category">{p.category}</span>
                <h3 className="product-name">{p.name}</h3>
                <div className="product-rating">
                  {"★".repeat(Math.floor(p.rating))}
                  <span>({p.reviews})</span>
                </div>
                <div className="product-price-row">
                  <span className="product-price">${p.price.toFixed(2)}</span>
                  {p.originalPrice && (
                    <span className="product-original">${p.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoryTabs() {
  const catProducts: Record<string, typeof products> = {
    clothing: products.filter((p) => p.category === "clothing"),
    electronics: products.filter((p) => p.category === "electronics"),
    accessories: products.filter((p) => p.category === "accessories"),
    footwear: products.filter((p) => p.category === "footwear"),
  };

  return (
    <section className="section">
      <h2>Shop by Category</h2>
      <Tabs defaultValue="clothing" className="category-tabs">
        <TabsList className="category-tab-list">
          <TabsTrigger value="clothing" className="category-tab">Clothing</TabsTrigger>
          <TabsTrigger value="electronics" className="category-tab">Electronics</TabsTrigger>
          <TabsTrigger value="accessories" className="category-tab">Accessories</TabsTrigger>
          <TabsTrigger value="footwear" className="category-tab">Footwear</TabsTrigger>
        </TabsList>
        {Object.entries(catProducts).map(([cat, items]) => (
          <TabsPanel key={cat} value={cat} className="category-panel">
            <div className="product-grid-sm">
              {items.map((p) => (
                <Link to={`/products/${p.id}`} key={p.id} className="product-card-link">
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
          </TabsPanel>
        ))}
      </Tabs>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="newsletter">
      <h2>Stay in the Loop</h2>
      <p>Subscribe for exclusive deals and new arrivals.</p>
      <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder="Enter your email" className="newsletter-input" />
        <Button variant="primary">Subscribe</Button>
      </form>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturedProducts />
      <CategoryTabs />
      <NewsletterSection />
    </div>
  );
}
