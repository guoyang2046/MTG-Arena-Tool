// PROBABLY DEPRECATED
import { playerDb } from "../../shared/db/LocalDatabase";
import Deck from "../../shared/deck";
import playerData from "../../shared/player-data";
import { InternalEvent } from "../../types/event";
import LogEntry from "../../types/logDecoder";
import addCustomDeck from "../addCustomDeck";
import { setData } from "../backgroundUtil";
import globals from "../globals";
import selectDeck from "../selectDeck";

interface Entry extends LogEntry {
  json: () => Partial<InternalEvent>;
}

function saveCourse(json: InternalEvent): void {
  const id = json._id ?? "";
  delete json._id;
  json.id = id;
  const eventData = {
    date: globals.logTime,
    // preserve custom fields if possible
    ...(playerData.event(id) || {}),
    ...json
  };

  if (!playerData.courses_index.includes(id)) {
    const courses_index = [...playerData.courses_index, id];
    playerDb.upsert("", "courses_index", courses_index);
    setData({ courses_index }, false);
  }

  playerDb.upsert("", id, eventData);
  setData({ [id]: eventData });
}

export default function InEventGetPlayerCourseV2(entry: Entry): void {
  const json = entry.json();
  if (!json) return;
  if (json.Id == "00000000-0000-0000-0000-000000000000") return;

  const newJson: Partial<InternalEvent> = {
    ...json,
    _id: json.Id ?? "",
    date: globals.logTime.toISOString()
  };
  delete json.Id;

  if (newJson.CourseDeck) {
    const deck = new Deck(json.CourseDeck);
    addCustomDeck(deck);
    //newJson.date = timestamp();
    //console.log(newJson.CourseDeck, newJson.CourseDeck.colors)
    const httpApi = require("../httpApi");
    httpApi.httpSubmitCourse(newJson);
    saveCourse(newJson as InternalEvent);
    selectDeck(deck);
  }
}
