import React from "react";
import { useDispatch } from "react-redux";
import pd from "../../../shared/PlayerData";
import { settingsSlice } from "../../../shared/redux/reducers";
import { makeResizable } from "../../rendererUtil";

export default function ResizableDragger(): JSX.Element {
  const draggerRef = React.useRef<HTMLDivElement>(null);
  const dispatcher = useDispatch();
  React.useEffect(() => {
    if (draggerRef?.current) {
      makeResizable(draggerRef.current, (newWidth: number) =>
        dispatcher(
          settingsSlice.actions.setSettings({
            ...pd.settings,
            right_panel_width: newWidth
          })
        )
      );
    }
  }, [dispatcher, draggerRef]);
  return <div ref={draggerRef} className={"dragger"} />;
}
