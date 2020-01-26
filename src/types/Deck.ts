export interface ArenaV3Deck extends BasicDeck {
  mainDeck: v3cardsList;
  sideboard: v3cardsList;
  isValid: boolean;
  lockedForUse: boolean;
  lockedForEdit: boolean;
  lastUpdated: string;
  reourceId?: string;
  cardSkins: CardSkin[];
  description: string;
  cardBack: null | string;
  id: string;
  commandZoneGRPIds: [];
  name: string;
  format: string;
  deckTileId: number;
  type: "ArenaV3Deck";
}

export interface InternalDeck extends BasicDeck {
  mainDeck: v2cardsList;
  sideboard: v2cardsList;
  lastUpdated: Date;
  custom?: boolean;
  tags?: string[];
  id: string;
  colors?: number[];
  archetype?: string;
  archived?: boolean;
  type: "InternalDeck";
}

export interface BasicDeck {
  commandZoneGRPIds: null | number[];
  mainDeck: anyCardsList;
  sideboard: anyCardsList;
  name: string;
  deckTileId: number;
  format: string;
}

export interface CardObject {
  id: number;
  quantity: number;
  chance?: number;
  dfcId?: string;
  grpId?: number;
  measurable?: boolean;
}

export type v2cardsList = Array<CardObject>;

export type v3cardsList = Array<number>;

export function isV2CardsList(
  list: v2cardsList | v3cardsList
): list is v2cardsList {
  const first = (list as v2cardsList)[0];
  return first && first.quantity !== undefined;
}

export type anyCardsList = v2cardsList | v3cardsList;

export interface CardSkin {
  grpId: number;
  ccv: string;
}

// Formats can be added to the logs cosntantly
// and there are more than just these
//export type Format = "" | "Standard" | "Draft" | "precon" | "Brawl";
