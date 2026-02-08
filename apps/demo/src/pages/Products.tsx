import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Card, CardBody, Input, Tabs, TabsList, TabsTrigger, TabsPanel } from "@prism-ui/react";
import { products, categories } from "../store";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get("cat") || "all";
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = catParam === "all" || p.category === catParam;
    const matchSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <p>{filtered.length} products</p>
      </div>

      <div className="products-toolbar">
        <Input
          placeholder="Search products..."
          className="search-input"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue={catParam} className="filter-tabs">
        <TabsList className="filter-tab-list">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="filter-tab">
              <Link to={cat === "all" ? "/products" : `/products?cat=${cat}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="product-grid">
        {filtered.map((p) => (
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
        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No products found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
