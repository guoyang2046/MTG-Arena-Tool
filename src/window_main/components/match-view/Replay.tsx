import React, { useState, useMemo, useCallback, useEffect } from "react";
import Slider, { SliderPosition } from "../misc/Slider";
import { GreMessage } from "../../../types/greInterpreter";
import { InternalMatch } from "../../../types/match";

interface ReplayProps {
  matchData: InternalMatch;
  replayStr: string;
}

export default function Replay(props: ReplayProps): JSX.Element {
  const GREMessages: GreMessage[] = useMemo(
    () => JSON.parse(props.replayStr).filter((msg: GreMessage) => msg),
    [props.replayStr]
  );
  const [GREPos, setGREPos] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const sliderChange = (pos: number): void => {
    setGREPos(pos);
  };

  const advanceOne = useCallback(() => {
    if (GREPos < GREMessages.length) {
      setGREPos(GREPos + 1);
    } else {
      setAutoplay(false);
    }
  }, [GREPos, GREMessages.length]);

  const toggleAutoplay = useCallback(() => {
    setAutoplay(!autoplay);
  }, [autoplay]);

  useEffect(() => {
    if (autoplay) {
      const timerID = setInterval(
        () => advanceOne(),
        (props.matchData.duration * 1000) / GREMessages.length
      );
      return (): void => {
        clearInterval(timerID);
      };
    }
  }, [autoplay, advanceOne, props.matchData.duration, GREMessages.length]);

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
      <div
        className={"button-static"}
        onClick={toggleAutoplay}
        style={{
          backgroundImage: `url("../images/${autoplay ? "play" : "pause"}.png")`
        }}
      ></div>
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
