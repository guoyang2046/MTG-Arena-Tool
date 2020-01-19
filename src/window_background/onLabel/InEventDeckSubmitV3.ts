import selectDeck from "../selectDeck";
import LogEntry from "../../types/logDecoder";
import { PlayerCourse } from "../../types/event";
import convertCourseDeck from "../convertCourseDeck";
import Deck from "../../shared/deck";

interface Entry extends LogEntry {
  json: () => PlayerCourse;
}

export default function onLabelInEventDeckSubmitV3(entry: Entry): void {
  const json = entry.json();
  if (!json) return;
  const deck = new Deck(convertCourseDeck(json.CourseDeck));
  selectDeck(deck);
}
