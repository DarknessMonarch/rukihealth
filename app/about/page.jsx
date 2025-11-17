"use client";

import { useEffect } from "react";
import styles from "@/app/style/info.module.css";

export default function About() {
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(20px)";
      section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.info}>
      <div className={styles.infoHeader}>
        <h1>About RukiHealth</h1>
      </div>
      <div className={styles.section}>
        <h2>
          RukiHealth is your trusted source for premium wellness, health, and nutritional products.
        </h2>
        <p>
          At RukiHealth, we are committed to providing high-quality health supplements, natural wellness
          solutions, skincare essentials, and lifestyle products designed to improve your overall wellbeing.
          Our mission is to empower individuals and families with reliable, science-backed products that support
          a healthier, more balanced life. Whether you’re looking to boost immunity, enhance nutrition, achieve
          fitness goals, or elevate your skincare routine, RukiHealth offers a curated selection that puts your
          wellness first.
        </p>
      </div>
      <div className={styles.section}>
        <h2>Why Choose RukiHealth?</h2>
        <p>
          RukiHealth stands out for its unwavering focus on quality, authenticity, and customer satisfaction.
          Every product we offer is carefully sourced from trusted suppliers and undergoes strict quality checks
          to ensure safety, purity, and effectiveness. We combine competitive pricing with fast delivery and
          exceptional customer support to deliver a seamless shopping experience. Our goal is to make premium
          wellness products accessible to everyone, regardless of lifestyle or health goals.
        </p>
      </div>
      <div className={styles.section}>
        <h2>The Importance of Quality Wellness Products</h2>
        <p>
          Investing in high-quality health and wellness products is essential for long-term vitality. Premium
          supplements, skincare, and natural remedies contribute to better immunity, improved nutrition, and a
          healthier daily routine. At RukiHealth, we understand that your wellbeing matters, and the right
          products can make a significant difference in your energy levels, confidence, and overall health.
        </p>
      </div>
      <div className={styles.section}>
        <h2>Benefits of Choosing Premium Wellness Solutions</h2>
        <p>
          High-quality wellness products are formulated to deliver safe, effective, and consistent results.
          Here’s why choosing premium matters:
        </p>
        <ul className={styles.bulletList}>
          <li>
            Better Absorption & Effectiveness: Quality supplements are designed for optimal absorption,
            ensuring your body receives the nutrients it needs.
          </li>
          <li>
            Safety & Purity: Trusted wellness products avoid harmful additives and focus on natural,
            beneficial ingredients.
          </li>
          <li>
            Long-Term Health Support: The right supplements and skincare routines contribute to sustained
            wellbeing over time.
          </li>
          <li>
            Holistic Wellness: Premium products support not just physical health, but mental and emotional
            balance.
          </li>
          <li>
            Confidence & Convenience: Reliable health products make it easier to stay consistent with your
            wellness goals.
          </li>
        </ul>
        <p>
          At RukiHealth, every product is chosen with your health in mind — helping you build a strong,
          vibrant lifestyle with ease.
        </p>
      </div>
      <div className={styles.section}>
        <h2>Shopping Tips for Wellness Products</h2>
        <p>
          When choosing health and wellness products, consider your lifestyle, nutritional needs, and long-term
          goals. Start with essential supplements such as multivitamins, immune boosters, skincare essentials,
          or fitness nutrition. Always review product descriptions and recommendations to make informed
          decisions. RukiHealth also provides helpful guidance and customer reviews to ensure you select what
          works best for your unique needs.
        </p>
      </div>
      <div className={styles.section}>
        <h2>Our Product Categories</h2>
        <p>Explore our growing collection of wellness essentials:</p>
        <ul className={styles.bulletList}>
          <li>Health Supplements & Vitamins</li>
          <li>Skincare & Beauty Solutions</li>
          <li>Immune Support Products</li>
          <li>Weight Management & Nutrition</li>
          <li>Natural Wellness & Lifestyle Products</li>
        </ul>
      </div>
      <div className={styles.section}>
        <p>
          RukiHealth is here to support your journey to a healthier, stronger, and more confident you. With
          reliable products, fast delivery, and excellent service, we make achieving your wellness goals simple
          and enjoyable.
        </p>
      </div>
    </div>
  );
}