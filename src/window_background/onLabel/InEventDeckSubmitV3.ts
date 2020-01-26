import Deck from "../../shared/deck";
import { PlayerCourse } from "../../types/event";
import LogEntry from "../../types/logDecoder";
import convertCourseDeck from "../convertCourseDeck";
import selectDeck from "../selectDeck";

interface Entry extends LogEntry {
  json: () => PlayerCourse;
}

export default function onLabelInEventDeckSubmitV3(entry: Entry): void {
  const json = entry.json();
  if (!json) return;
  const deck = new Deck(convertCourseDeck(json.CourseDeck));
  selectDeck(deck);
}
