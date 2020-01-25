import LogEntry from "../../types/logDecoder";
import selectDeck from "../selectDeck";
import convertDeckFromV3 from "../convertDeckFromV3";
import Deck from "../../shared/deck";
import { ArenaV3Deck } from "../../types/Deck";

interface EntryJson {
  params: {
    deck: string;
  };
}

interface Entry extends LogEntry {
  json: () => EntryJson;
}

export default function OutEventAIPractice(entry: Entry): void {
  const json = entry.json();
  if (!json) return;
  const parsedDeck = JSON.parse(json.params.deck) as ArenaV3Deck;
  selectDeck(new Deck(parsedDeck));
}
