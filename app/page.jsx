"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEcommerceStore } from "@/app/store/ecommerceStore";
import Advert from "@/app/components/Advert";
import Product from "@/app/components/Product";
import Category from "@/app/components/Category";
import styles from "@/app/style/home.module.css";
import NewProduct from "@/app/components/NewProduct";
import Testimonials from "@/app/components/Testimonials";
import LimitedOffers from "@/app/components/LimitedOffers";

import { BiSupport as SupportIcon } from "react-icons/bi";
import { FaShippingFast as ShippingIcon } from "react-icons/fa";
import { PiDiamondsFourFill as QualityIcon } from "react-icons/pi";
import { RiSecurePaymentLine as ShieldIcon } from "react-icons/ri";

export default function Home() {
  const router = useRouter();
  const { products, getAllProducts } = useEcommerceStore();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const Features = [
    {
      id: 1,
      icon: ShippingIcon,
      title: "Free Shipping",
      description: "coming soon",
    },
    {
      id: 2,
      icon: QualityIcon,
      title: "High Quality",
      description: "all products are high quality",
    },
    {
      id: 3,
      icon: ShieldIcon,
      title: "Secure Payments",
      description: "Guarantee secure payments",
    },
    {
      id: 4,
      icon: SupportIcon,
      title: "Fulltime Customer Support",
      description: "Anywhere & anytime",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAllProducts({ limit: 2, sort: "newest" });
        if (result.success && result.data.products) {
          setFeaturedProducts(result.data.products);
        }
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getAllProducts]);

  useEffect(() => {
    if (featuredProducts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [featuredProducts.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleShopNow = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleProductClick = (product) => {
    router.push(`/products/${product._id}`);
  };

  const currentProduct = featuredProducts[currentSlide];

  const HeroSkeleton = () => (
    <div className={`${styles.heroCard} skeleton`}></div>
  );

  const SideProductsSkeleton = () => (
    <div className={styles.sideProducts}>
      {[1, 2].map((index) => (
        <div
          key={index}
          className={`${styles.loadingProductCard} skeleton`}
        ></div>
      ))}
    </div>
  );

  return (
    <main className={styles.homeContainer}>
      <div className={styles.mainContent}>
        {loading ? (
          <>
            <HeroSkeleton />
            <SideProductsSkeleton />
          </>
        ) : (
          <>
            {/* Hero Section */}
            {currentProduct && (
              <div className={styles.heroCard}>
                <div className={styles.productInfo}>
                  <h2>{currentProduct.name}</h2>
                  <p>{currentProduct.description}</p>
                  <button
                    className={styles.shopButton}
                    onClick={() => handleShopNow(currentProduct._id)}
                  >
                    Shop Now
                  </button>
                </div>
                {currentProduct.images?.[0] && (
                  <img
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    className={styles.herocardImage}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}

                {featuredProducts.length > 1 && (
                  <div className={styles.pagination}>
                    {featuredProducts.map((_, index) => (
                      <div
                        key={index}
                        className={`${styles.paginationDot} ${
                          index === currentSlide ? styles.active : ""
                        }`}
                        onClick={() => handleSlideChange(index)}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Side Products */}
            {featuredProducts.length > 0 && (
              <div className={styles.sideProducts}>
                {featuredProducts.slice(0, 2).map((product) => (
                  <div
                    key={product._id}
                    className={styles.productCard}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className={styles.productDetails}>
                      <h3>{product.name}</h3>
                      <div className={styles.pricing}>
                        <span>Ksh {product.price}</span>
                      </div>
                    </div>
                    {product.images?.[0] && (
                      <div className={styles.productImageContainer}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className={styles.productImage}
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.features}>
        {Features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div key={feature.id} className={styles.featureItem}>
              <IconComponent className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Category />
      <Product />
      <Advert />
      <NewProduct />
      <LimitedOffers />
      <Testimonials />
    </main>
  );
}
