"use client";

import { useState, useEffect } from "react";
import "./style.css"; // Assurez-vous que le chemin est correct
import { api } from "~/trpc/react";

// Type pour une carte
interface Card {
  id: number;
  question: string;
  answer: string;
  isFlipped: boolean;
}

export default function HofPage({ params }: { params: { groupId: string } }) {
  // Récupérer les données de l'API
  const topSpends = api.allOfFame.topSpend.useQuery({
    groupId: +params.groupId,
  });
  const mostParticipant = api.allOfFame.mostParticipant.useQuery({
    groupId: +params.groupId,
  });



  const [cards, setCards] = useState<Card[]>([]);

  
  useEffect(() => {
    if (topSpends.data) {
      const initialCards: Omit<Card, "isFlipped">[] = [
        {
          id: 1,
          question: "Qui a fais la plus grosse dépense ?",
          answer: `${topSpends.data.user.name} with ${topSpends.data.amount}€`,
        },
        { id: 2, question: "Question 2 ?", answer: "2" },
        { id: 3, question: "Question 3 ?", answer: "3" },
        { id: 4, question: "Question 4 ?", answer: "4" },
        { id: 5, question: "Question 5 ?", answer: "5" },
      ];
      setCards(initialCards.map((card) => ({ ...card, isFlipped: false })));
    }
  }, [topSpends.data]);

  const handleFlip = (id: number) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card,
      ),
    );
  };

  if (!topSpends.data) {
    return null; // or any other appropriate action
  }

  return (
    <>
      <div className="bg-surface-dim mx-auto flex  max-w-80 cursor-pointer items-center justify-center rounded-b-lg p-2 text-center shadow-md transition">
        <span className="material-icons text-primary">emoji_events</span>
        <div className="mx-4 text-lg font-bold">Hall Of Fame</div>
        <span className="material-icons text-primary">emoji_events</span>
      </div>
      <main className="bg-surface grid grid-cols-2 gap-4 px-8 py-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card-container flex items-center justify-center transition"
            onClick={() => handleFlip(card.id)}
          >
            <div className={`card ${card.isFlipped ? "flipped" : ""}`}>
              <div className="front bg-surface-variant w-full max-w-lg rounded-lg">
                <div className="award-section bg-secondary-container font-semibold">
                  {/* <span className="material-icons text-primary">military_tech</span> */}
                </div>
                <div className="m-auto text-lg font-bold">{card.question}</div>
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
