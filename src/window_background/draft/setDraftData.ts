import { IPC_OVERLAY } from "../../shared/constants";
import { playerDb } from "../../shared/db/LocalDatabase";
import playerData from "../../shared/PlayerData";
import { ipcSend, setData } from "../backgroundUtil";

// REVIEW
export default function setDraftData(data: any): void {
  if (!data || !data.id) {
    console.log("Couldnt save undefined draft:", data);
    return;
  }
  const { id } = data;

  // console.log("Set draft data:", data);
  if (!playerData.draft_index.includes(id)) {
    const draftIndex = [...playerData.draft_index, id];
    playerDb.upsert("", "draft_index", draftIndex);
    setData({ draftIndex }, false);
  }

  playerDb.upsert("", id, data);
  setData({
    [id]: data,
    cards: playerData.cards,
    cardsNew: playerData.cardsNew
  });
  ipcSend("set_draft_cards", data, IPC_OVERLAY);
}
