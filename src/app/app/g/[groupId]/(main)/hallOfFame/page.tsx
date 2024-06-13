"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import "./style.css"; // Assurez-vous que le chemin est correct

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

  const mostMessages = api.allOfFame.mostMessages.useQuery({
    groupId: +params.groupId,
  });

  const mostExpences = api.allOfFame.mostExpences.useQuery({
    groupId: +params.groupId,
  });

  const mostExpencesAmount = api.allOfFame.mostExpencesAmount.useQuery({
    groupId: +params.groupId,
  });

  const mostActivities = api.allOfFame.mostActivities.useQuery({
    groupId: +params.groupId,
  });

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    if (
      topSpends.data &&
      mostParticipant.data &&
      mostMessages.data &&
      mostExpences.data &&
      mostExpencesAmount.data &&
      mostActivities.data
    ) {
      const initialCards: Omit<Card, "isFlipped">[] = [
        {
          id: 1,
          question: "Qui a fais la plus grosse dépense ?",
          answer: `${topSpends.data.username} with ${topSpends.data.price}€`,
        },
        {
          id: 2,
          question: "Qui est le plus sorti ?",
          answer: `${mostParticipant.data[0]?.user.name}`,
        },
        {
          id: 3,
          question: "Qui a envoyé le plus de messages ?",
          answer: `${mostMessages.data[0]?.user.name}`,
        },
        {
          id: 4,
          question: "Qui a le plus dépensé de tout les events ?",
          answer: `${mostExpences.data[0]?.user.name} with ${mostExpencesAmount.data[0]?.sum}€`,
        },
        {
          id: 5,
          question: "Qui a suggéré le plus d'activités ?",
          answer: `${mostActivities.data[0]?.user.name}`,
        },
      ];
      setCards(initialCards.map((card) => ({ ...card, isFlipped: false })));
    }
  }, [
    mostActivities.data,
    mostExpences.data,
    mostExpencesAmount.data,
    mostMessages.data,
    mostParticipant.data,
    topSpends.data,
  ]);

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
