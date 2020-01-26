import { InternalDeck, ArenaV3Deck } from "../types/Deck";
import Deck from "../shared/deck";

export default function convertCourseDeck(
  courseDeck: ArenaV3Deck
): InternalDeck {
  const deck = new Deck(courseDeck);
  return deck.getSave();
}
