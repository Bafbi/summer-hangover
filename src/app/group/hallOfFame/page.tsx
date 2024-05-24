"use client"; // Marquer le composant comme client

import { useState } from "react";
import "../hallOfFame/style.css"; // Assurez-vous que le chemin est correct

// Type pour une carte
interface Card {
  id: number;
  question: string;
  answer: string;
  isFlipped: boolean;
}

const initialCards: Omit<Card, 'isFlipped'>[] = [
  { id: 1, question: 'Qui est le plus sortie ?', answer: 'Moi!' },
  { id: 2, question: 'Question 2 ?', answer: '2' },
  { id: 3, question: 'Question 3 ?', answer: '3' },
  { id: 4, question: 'Question 4 ?', answer: '4' },
  { id: 5, question: 'Question 5 ?', answer: '5' }
];

export default function Home() {
  const [cards, setCards] = useState<Card[]>(initialCards.map(card => ({ ...card, isFlipped: false })));

  const handleFlip = (id: number) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    ));
  };

  return (
    <>
    <div className="max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer shadow-md rounded-lg transition flex justify-center items-center">
     <span className="material-icons text-primary">emoji_events</span><div className="text-lg font-bold mx-4">Hall Of Fame</div><span className="material-icons text-primary">emoji_events</span>
    </div>
    <main className="grid grid-cols-2 gap-4 p-4 bg-surface">
      {cards.map(card => (
        <div key={card.id} className="card-container mx-4" onClick={() => handleFlip(card.id)}>
          <div className={`card ${card.isFlipped ? 'flipped' : ''}`}>
            <div className="front bg-surface-variant rounded-lg max-w-lg w-full">
            <div className="award-section bg-secondary-container font-semibold">
            <span className="material-icons text-primary">military_tech</span>
            </div>
              <div className="text-lg font-bold">{card.question}</div>
              <div className="answer-section bg-secondary-container">
                <span className="material-icons">touch_app</span>
              </div>
            </div>
            <div className="back bg-primary-container text-primary">
              <div className="text-lg font-bold">{card.answer}</div>
            </div>
          </div>
        </div>
      ))}
    </main>
    </>
  );
}
