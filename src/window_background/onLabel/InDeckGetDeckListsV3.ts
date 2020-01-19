import convertDeckFromV3 from "../convertDeckFromV3";
import LogEntry from "../../types/logDecoder";
import { CourseDeck } from "../../types/event";
import InDeckGetDeckLists from "./InDeckGetDeckLists";

interface Entry extends LogEntry {
  json: () => CourseDeck[];
}

export default function InDeckGetDeckListsV3(entry: Entry): void {
  const json = entry.json();
  if (!json) return;
  InDeckGetDeckLists(
    entry,
    json.map(d => convertDeckFromV3(d))
  );
}