import { setData } from "./backgroundUtil";
import { playerDb } from "../shared/db/LocalDatabase";
import playerData from "../shared/player-data";
import Deck from "../shared/deck";

type StoreShim = { set: (key: string, value: any) => void };

const addCustomDeck = function(customDeck: Deck): void {
  const id = customDeck.id;
  const deckData = customDeck.getSave();
  console.log("window_background addCustomDeck.ts deckData", deckData);
  setData({ decks: { ...playerData.decks, [customDeck.id]: deckData } });
  playerDb.upsert("decks", id, deckData);
};

export default addCustomDeck;
