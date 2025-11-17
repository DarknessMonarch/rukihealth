"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEcommerceStore } from "@/app/store/ecommerceStore";
import styles from "@/app/style/contact.module.css";
import Dropdown from "@/app/components/Dropdown";

export default function ContactUs() {
  const { submitContactForm } = useEcommerceStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const subjectOptions = [
    { value: "product-inquiry", label: "Product Inquiry" },
    { value: "order-status", label: "Order Status" },
    { value: "returns-exchanges", label: "Returns & Exchanges" },
    { value: "health-support", label: "Health Support" },
    { value: "bulk-orders", label: "Bulk Orders" },
    { value: "feedback", label: "Feedback" },
    { value: "other", label: "Other" },
  ];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectSelect = (option) => {
    setFormData((prev) => ({ ...prev, subject: option.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject) {
      toast.error("Please select a subject");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitContactForm(
        formData.email,
        formData.name,
        `[${subjectOptions.find(opt => opt.value === formData.subject)?.label}] ${formData.message}`
      );

      if (result.success) {
        toast.success(result.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSubject = subjectOptions.find(option => option.value === formData.subject);

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h1>Contact Us</h1>
      </div>

      <div className={styles.section}>
        <h2>Get in Touch with RukiHealth</h2>
        <p>
          We're here to help you with all your nutritional, wellness, and health product needs.
          Whether you have a question about a supplement, need help with an order, or want professional guidance,
          the RukiHealth support team is ready to assist you.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Contact Information</h2>
        <div className={styles.contactDetails}>
          <div className={styles.contactItem}>
            <h3>Customer Support</h3>
            <p><strong>Phone:</strong> (+254) 727-340-853</p>
            <p><strong>Email:</strong> rukihealth@gmail.com</p>
            <p><strong>Hours:</strong> Monday - Sunday, 8:00 AM - 6:00 PM EAT</p>
          </div>

          <div className={styles.contactItem}>
            <h3>Sales & Product Help</h3>
            <p><strong>Phone:</strong> (+254) 727-340-853</p>
            <p><strong>Email:</strong> rukihealth@gmail.com</p>
            <p><strong>Hours:</strong> Monday - Sunday, 9:00 AM - 7:00 PM EAT</p>
          </div>

          <div className={styles.contactItem}>
            <h3>Business Address</h3>
            <p>RukiHealth Ltd.</p>
            <p>Nairobi, Kenya</p>
            <p><strong>Postal Code:</strong> 00100</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Send Us a Message</h2>
        <p>
          Have a specific question or need personalized assistance? Fill out the form below
          and we'll respond within 24 hours on business days.
        </p>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject *</label>
            <div className={styles.dropdownContainer}>
              <Dropdown
                options={subjectOptions}
                onSelect={handleSubjectSelect}
                dropPlaceHolder="Select a subject"
                value={selectedSubject}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="6"
              placeholder="Please provide details about your inquiry..."
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className={styles.section}>
        <h2>Frequently Asked Questions</h2>
        <p>You may find the answer you're looking for in our FAQ:</p>
        <ul className={styles.bulletList}>
          <li><strong>Order Processing:</strong> Orders are processed within 1-2 business days.</li>
          <li><strong>Shipping:</strong> Free shipping on orders above KSh 5,000 within Nairobi.</li>
          <li><strong>Returns:</strong> 30-day return policy on unused supplements in original packaging.</li>
          <li><strong>Health Guidance:</strong> Expert wellness support available for select products.</li>
          <li><strong>Payment:</strong> M-Pesa, bank transfers, and major credit cards accepted.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <p><strong>Response Time:</strong> We aim to reply to all inquiries within 24 hours. For urgent matters, please contact us directly by phone.</p>
      </div>
    </div>
  );
}