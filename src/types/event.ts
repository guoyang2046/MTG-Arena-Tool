import { ArenaV3Deck, CardSkin, v3cardsList } from "./Deck";

export interface InternalCourseDeck extends ArenaV3Deck {
  colors?: number[];
}

export interface InternalCourse {
  Id?: string;
  _id: string;
  id?: string;
  date: Date;
  CourseDeck: InternalCourseDeck;
}

export interface CourseDeck {
  commandZoneGRPIds: [];
  mainDeck: v3cardsList;
  sideboard: v3cardsList;
  isValid: boolean;
  lockedForUse: boolean;
  lockedForEdit: boolean;
  resourceId: string;
  cardSkins: CardSkin[];
  id: string;
  name: string;
  description: string;
  format: string;
  deckTileId: number;
  cardBack: string;
  lastUpdated: string;
}

export interface ModuleInstanceData {
  HasPaidEntry?: string;
  DeckSelected?: boolean;
}

export interface PlayerCourse {
  Id: string;
  InternalEventName: string;
  PlayerId: string | null;
  ModuleInstanceData: ModuleInstanceData;
  CurrentEventState: string;
  CurrentModule: string;
  CardPool: number[] | null;
  CourseDeck: CourseDeck;
  PreviousOpponents: string[];
}

export interface ActiveEvent {
  PublicEventName: string;
  InternalEventName: string;
  EventState: string;
  EventType: string;
  ModuleGlobalData: { DeckSelect: string };
  StartTime: string;
  LockedTime: string;
  ClosedTime: string;
  Parameters: {}; // Missing type here
  Group: string;
  PastEntries: string | null;
  DisplayPriority: number;
  IsArenaPlayModeEvent: boolean;
  Emblems: string | null;
  UILayoutOptions: {
    ResignBehavior: string;
    WinTrackBehavior: string;
    EventBladeBehavior: string;
    DeckButtonBehavior: string;
    TemplateName: string | null;
  };
  SkipValidation: boolean;
  DoesUpdateQuests: boolean;
  DoesUpdateDailyWeeklyRewards: boolean;
  AllowUncollectedCards: boolean;
}

export interface RankInfo {
  rankClass: Rank;
  level: number;
  steps: number;
}

export interface RankRewards {
  image1: string | null;
  image2: string | null;
  image3: string | null;
  prefab: string;
  referenceId: string;
  headerLocKey: string;
  descriptionLocKey: string;
  quantity: string;
  locParams: { number1?: number; number2?: number; number3?: number };
  availableDate: string;
}

export enum Rank {
  Bronze,
  Silver,
  Gold,
  Platinum,
  Diamond,
  Mythic
}

export interface SeasonAndRankDetail {
  currentSeason: {
    seasonOrdinal: number;
    seasonStartTime: string;
    seasonEndTime: string;
    seasonLimitedRewards: Map<Rank, RankRewards>;
    seasonConstructedRewards: Map<Rank, RankRewards>;
    minMatches: number;
  };
  limitedRankInfo: RankInfo[];
  constructedRankInfo: RankInfo[];
}
