/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Dialog } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CurrentModeItem } from "..";

export default function CountDown(props: {
  open?: boolean;
  handleClose?: (value: boolean) => void;
  handleCurrentMode?: (value: CurrentModeItem) => void;
}) {
  const { open, handleClose, handleCurrentMode } = props;
  const [count, setCount] = useState(3);
  let times: any = null;

  const onClose = useCallback(() => {
    handleClose?.(false);
  }, [handleClose]);

  const countDownTimes = useCallback(() => {
    times = setInterval(() => {
      if (count > 1) {
        setCount(count - 1);
      }
    }, 1000);
  }, [count]);

  useEffect(() => {
    if (open) {
      if (count > 1) {
        countDownTimes();
      } else {
        setTimeout(() => {
          clearInterval(times);
          handleClose?.(false);
          handleCurrentMode?.("record");
        });
      }
    }
  }, [countDownTimes, handleClose, open]);

  return (
    <Dialog
      open={open ?? false}
      onClose={onClose}
      css={css`
        .MuiPaper-root {
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 100%;
          width: 214px;
          height: 214px;
        }
      `}
    >
      <div
        css={css`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <span
          css={css`
            color: #ffffff;
            font-size: 116px;
            line-height: 116px;
            text-align: center;
          `}
        >
          {count}
        </span>
      </div>
    </Dialog>
  );
}
