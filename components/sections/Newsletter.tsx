"use client";

import { FormEvent, useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: connect API / Mailchimp / Brevo / ConvertKit...
    console.log(email);
  };

  return (
    <section className="newsletter-section">
      <div
        className="wrap newsletter-inner"
        data-rv="up"
      >
        <h3 className="newsletter-title">
          Đăng ký Newsletter để nghe mình kể chuyện nhiều hơn
        </h3>

        <form
          className="newsletter-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email của bạn"
            aria-label="Email của bạn"
            required
          />

          <button
            type="submit"
            className="newsletter-submit mag"
            data-cur="hover"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  );
}