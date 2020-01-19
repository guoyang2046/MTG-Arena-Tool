import { ArenaV3Deck, SerializedDeck } from "../types/Deck";
import Deck from "../shared/deck";

export default function convertDeckFromV3(v3deck: ArenaV3Deck): SerializedDeck {
  const deck = new Deck(v3deck);
  return deck.getSave();
}
