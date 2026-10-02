import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { APP_NAME } from '../config';

const FAQ_DATA = [
  {
    question: `What is ${APP_NAME}?`,
    answer: `${APP_NAME} is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial.`
  },
  {
    question: "How much does it cost?",
    answer: `Watch ${APP_NAME} on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $9.99 to $19.99 a month. No extra costs, no contracts.`
  },
  {
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your account to watch instantly on the web from your personal computer or on any internet-connected device."
  },
  {
    question: "How do I cancel?",
    answer: `${APP_NAME} is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees.`
  }
];

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="mb-2">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between bg-surface-elevated hover:bg-surface-border p-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset text-left"
      >
        <span className="text-xl font-medium">{question}</span>
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 bg-surface-elevated mt-1 rounded-lg text-gray-300 text-lg leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-black text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {FAQ_DATA.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
