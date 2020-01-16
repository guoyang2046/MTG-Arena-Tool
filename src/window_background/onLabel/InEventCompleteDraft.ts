import getDraftData from "../draft/getDraftData";
import getDraftSet from "../draft/getDraftSet";
import clearDraftData from "../draft/clearDraftData";
import setDraftData from "../draft/setDraftData";
import endDraft from "../draft/endDraft";

import LogEntry from "../../types/logDecoder";

// REVIEW
// add proper type to types/draft
interface EntryJson {
  Id: string;
  InternalEventName: string;
  ModuleInstanceData: {
    DraftInfo: {
      DraftId: string;
    };
  };
}

interface Entry extends LogEntry {
  json: () => EntryJson;
}

export default function InEventCompleteDraft(entry: Entry): void {
  const json = entry.json();
  // console.log("LABEL:  Complete draft ", json);
  if (!json) return;
  const toolId = json.Id + "-draft";
  const savedData = getDraftData(toolId);
  const draftId = json.ModuleInstanceData.DraftInfo.DraftId;
  const data = {
    ...savedData,
    ...getDraftData(draftId),
    ...json
  };
  data.set = getDraftSet(json.InternalEventName) || data.set;
  data.id = toolId;
  // clear working-space draft data
  clearDraftData(draftId);
  // save final version of draft
  setDraftData(data);
  endDraft(data);
}