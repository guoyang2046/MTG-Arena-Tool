import React, { ReactNode } from "react";
import DeckOption, { DeckOptionDeck } from "./DeckOption";

export type DeckType = DeckOptionDeck & { id: string };

export default function getDeckComponent(
  deckId: string,
  decks: DeckType[]
): ReactNode {
  const matches = decks.filter((_deck: { id: string }) => _deck.id === deckId);
  if (matches.length === 0) return deckId;
  const deck = matches[0];

  return <DeckOption deckId={deckId} deck={deck} />;
}

export const getDeckComponentForwarded = (decks: DeckType[]) => (
  deckId: string
): ReactNode => {
  return getDeckComponent(deckId, decks);
};
