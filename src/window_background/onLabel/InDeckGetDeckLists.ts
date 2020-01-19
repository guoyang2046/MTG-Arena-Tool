import { CourseDeck } from "../../types/event";
import LogEntry from "../../types/logDecoder";
import { setData } from "../backgroundUtil";
import playerData from "../../shared/player-data";

interface Entry extends LogEntry {
  json: () => CourseDeck[];
}

export default function InDeckGetDeckLists(
  entry: Entry,
  json: CourseDeck[] = []
): void {
  if (json.length == 0 && entry) json = entry.json();
  if (json.length == 0) return;

  const decks = { ...playerData.decks };
  const static_decks: any[] = [];
  json.forEach(deck => {
    const deckData = { ...(playerData.deck(deck.id) || {}), ...deck };
    decks[deck.id] = deckData;
    static_decks.push(deck.id);
  });

  setData({ decks, static_decks });
}
