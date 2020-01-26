import { ArenaV3Deck, InternalDeck } from "../types/Deck";
import Deck from "../shared/deck";

export default function convertDeckFromV3(v3deck: ArenaV3Deck): InternalDeck {
  const deck = new Deck(v3deck);
  return deck.getSave();
}
