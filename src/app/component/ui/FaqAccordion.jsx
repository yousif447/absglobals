'use client';

import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function FaqAccordion({ items, lang = "en" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={uuid()}
            className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
            onClick={() => toggle(index)}
          >
            <div className="faq-header">
              <span className="faq-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={`faq-question ${lang === "ar" ? "font-heading" : "font-display"}`}>{item.title}</h3>
              <span className="faq-toggle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"
                    className="faq-toggle-vertical" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </div>
            <div className="faq-answer-wrap">
              <p className="faq-answer">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
