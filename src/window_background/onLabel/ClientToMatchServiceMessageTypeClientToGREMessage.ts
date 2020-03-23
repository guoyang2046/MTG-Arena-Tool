/* eslint-disable @typescript-eslint/no-var-requires */
import CardsList from "../../shared/cardsList";
import globals from "../globals";
import LogEntry from "../../types/logDecoder";
import { normaliseFields } from "../backgroundUtil";
import Deck from "../../shared/deck";
import { v2cardsList } from "../../types/Deck";

interface Payload {
  submitdeckresp: {
    deck: {
      deckcardsList: number[];
      sideboardcardsList: number[];
      deckcards: v2cardsList; // might be v3?
      sideboardcards: v2cardsList; // might be v3?
    };
  };
  type: string;
}

interface Entry extends LogEntry {
  json: () => Payload;
}

function decodePayload(payload: any, msgType: string): any {
  const messages = require("../messages_pb");
  const binaryMsg = Buffer.from(payload, "base64");

  try {
    let msgDeserialiser;
    if (
      msgType === "ClientToGREMessage" ||
      msgType === "ClientToGREUIMessage"
    ) {
      msgDeserialiser = messages.ClientToGREMessage;
    } else if (msgType === "ClientToMatchDoorConnectRequest") {
      msgDeserialiser = messages.ClientToMatchDoorConnectRequest;
    } else if (msgType === "AuthenticateRequest") {
      msgDeserialiser = messages.AuthenticateRequest;
    } else if (msgType === "CreateMatchGameRoomRequest") {
      msgDeserialiser = messages.CreateMatchGameRoomRequest;
    } else if (msgType === "EchoRequest") {
      msgDeserialiser = messages.EchoRequest;
    } else {
      console.warn(`${msgType} - unknown message type`);
      return;
    }
    const msg = msgDeserialiser.deserializeBinary(binaryMsg);
    return msg.toObject();
  } catch (e) {
    console.log(e.message);
  }

  return;
}

export default function ClientToMatchServiceMessageTypeClientToGREMessage(
  entry: Entry
): void {
  const json = entry.json();
  if (!json) return;
  //if (skipMatch) return;
  let payload: Payload = json;
  /*
  if (json.Payload) {
    payload = json.Payload;
  }
  */

  if (typeof payload == "string") {
    const msgType = entry.label.split("_")[1];
    payload = decodePayload(payload, msgType);
  }
  // The sideboarding log message has changed format multiple times, sometimes
  // going back to an earlier format. normaliseFields, together with the
  // conditional decodePayload call, allows the same code to handle each known
  // format in case Arena changes it again.
  payload = normaliseFields(payload);

  if (payload.submitdeckresp) {
    //console.log("Client To GRE: ", payload);
    // Get sideboard changes
    const deckResp = payload.submitdeckresp.deck;

    const currentDeck = globals.currentMatch.player.deck.getSave();

    globals.currentMatch.player.deck = new Deck(
      currentDeck,
      deckResp.deckcards,
      deckResp.sideboardcards
    );
  }
}
