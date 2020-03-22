import React, { useState, useMemo } from "react";
import Slider, { SliderPosition } from "../misc/Slider";
import { GreMessage } from "../../../types/greInterpreter";

interface ReplayProps {
  replayStr: string;
}

export default function Replay(props: ReplayProps): JSX.Element {
  const GREMessages: GreMessage[] = useMemo(
    () => JSON.parse(props.replayStr).filter((msg: GreMessage) => msg),
    [props.replayStr]
  );
  const [GREPos, setGREPos] = useState(0);

  const sliderChange = (pos: number): void => {
    setGREPos(pos);
  };

  // Calculate slider turn labels
  const sliderPos: SliderPosition[] = useMemo(() => {
    const arr = Array(GREMessages.length + 1).fill(
      new SliderPosition("", true)
    );
    let prevTurn = -1;
    GREMessages.forEach((msg: GreMessage, index: number) => {
      if (msg && msg.gameStateMessage && msg.gameStateMessage.turnInfo) {
        const turn = msg.gameStateMessage.turnInfo.turnNumber;
        if (prevTurn && turn && prevTurn < turn) {
          arr[index] = new SliderPosition("Turn " + turn);
          prevTurn = turn;
        }
      }
    });
    return arr;
  }, [GREMessages]);

  return (
    <div style={{ margin: "16px" }}>
      <div>{GREPos}</div>
      <div>{}</div>
      <div>
        <Slider
          positions={sliderPos}
          value={GREPos}
          onChange={sliderChange}
          max={GREMessages.length}
        />
      </div>
    </div>
  );
}
