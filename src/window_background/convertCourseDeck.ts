import { SerializedDeck } from "../types/Deck";
import Deck from "../shared/deck";
import { CourseDeck } from "../types/event";

export default function convertCourseDeck(
  courseDeck: CourseDeck
): SerializedDeck {
  const deck = new Deck(courseDeck);
  return deck.getSave();
}
