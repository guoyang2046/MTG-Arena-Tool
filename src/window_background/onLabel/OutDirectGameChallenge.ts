import globals from "../globals";
import LogEntry from "../../types/logDecoder";
import selectDeck from "../selectDeck";
import Deck from "../../shared/deck";
import { ArenaV3Deck } from "../../types/Deck";

interface EntryJson {
  params: {
    deck: string;
    opponentDisplayName: string;
    playFirst: boolean;
    bo3: boolean;
  };
}

interface Entry extends LogEntry {
  json: () => EntryJson;
}

export default function OutDirectGameChallenge(entry: Entry): void {
  const json = entry.json();
  if (!json) return;
  const deck = json.params.deck;
  const parsedDeck = JSON.parse(deck) as ArenaV3Deck;
  selectDeck(new Deck(parsedDeck));

  const httpApi = require("../httpApi");
  httpApi.httpTournamentCheck(
    globals.currentDeck.getSave(),
    json.params.opponentDisplayName,
    false,
    json.params.playFirst,
    json.params.bo3
  );
}
