import LogEntry from "../../types/logDecoder";
import startDraft from "../draft/startDraft";
import setDraftData from "../draft/setDraftData";
import getDraftData from "../draft/getDraftData";
import { DraftStatus } from "../../types/draft";

interface Entry extends LogEntry {
  json: () => DraftStatus;
}

export default function onLabelInDraftMakePick(entry: Entry): void {
  const json = entry.json();
  // console.log("LABEL:  Make pick > ", json);
  if (!json) return;
  const {
    DraftId: draftId,
    PackNumber: packNumber,
    PickNumber: pickNumber,
    PickedCards: pickedCards
  } = json;
  startDraft();
  const data = {
    ...getDraftData(draftId),
    draftId,
    packNumber,
    pickNumber,
    pickedCards,
    currentPack: (json.DraftPack || []).slice(0)
  };
  data.draftId = data.id;
  setDraftData(data);
}
