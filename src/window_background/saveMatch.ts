import { completeMatch } from "./data";
import globals from "./globals";
import playerData from "../shared/PlayerData";
import { playerDb } from "../shared/db/LocalDatabase";
import { ipcSend, setData } from "./backgroundUtil";
import path from "path";
import fs from "fs";

export default function saveMatch(id: string, matchEndTime: number): void {
  //console.log(globals.currentMatch.matchId, id);
  if (
    !globals.currentMatch ||
    !globals.currentMatch.matchTime ||
    globals.currentMatch.matchId !== id
  ) {
    return;
  }
  const existingMatch = playerData.match(id) || {};
  const match = completeMatch(
    existingMatch,
    globals.currentMatch,
    matchEndTime
  );
  if (!match) {
    return;
  }

  // console.log("Save match:", match);
  if (!playerData.matches_index.includes(id)) {
    const matchesIndex = [...playerData.matches_index, id];
    playerDb.upsert("", "matches_index", matchesIndex);
    setData({ matches_index: matchesIndex }, false);
  }

  try {
    const replayData = JSON.stringify(globals.currentMatch.GREtoClient);
    fs.writeFileSync(
      path.join(globals.replaysDir, globals.currentMatch.matchId + ".json"),
      replayData,
      "utf-8"
    );
  } catch (e) {
    console.error(e);
  }

  playerDb.upsert("", id, match);
  setData({ [id]: match });
  if (globals.matchCompletedOnGameNumber === globals.gameNumberCompleted) {
    const httpApi = require("./httpApi");
    httpApi.httpSetMatch(match);
  }

  ipcSend("popup", { text: "Match saved!", time: 3000 });
}
