/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Dialog } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { StepTipItem, StyledTooltip } from "src/pages/dataCollection";
import { CurrentModeItem } from "../BatchCreateAssistant";

export default function CountDown(props: {
  open?: boolean;
  currentStep?: number;
  stepTips?: StepTipItem[];

  width?: number;
  height?: number;

  handleClose?: (value: boolean) => void;
  handleCurrentMode?: (value: CurrentModeItem) => void;
  handleOpenAssistant?: () => void;

  handleToNextStepTip?: () => void;
}) {
  const {
    open,
    currentStep,
    stepTips,

    width,
    height,

    handleClose,
    handleCurrentMode,
    handleOpenAssistant,

    handleToNextStepTip,
  } = props;
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
          handleOpenAssistant?.();
          handleToNextStepTip?.();
        });
      }
    }
  }, [
    countDownTimes,
    handleClose,
    handleOpenAssistant,
    handleToNextStepTip,
    open,
  ]);

  return (
    <Dialog
      open={open ?? false}
      onClose={onClose}
      css={[
        width &&
          css`
            width: ${width}px;
            .MuiBackdrop-root {
              width: ${width}px;
            }
          `,
        height &&
          css`
            height: ${height}px;
            .MuiBackdrop-root {
              height: ${height}px;
            }
          `,
        css`
          .MuiPaper-root {
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 100%;
            width: 214px;
            height: 214px;
          }
        `,
      ]}
    >
      <div
        css={css`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {currentStep === 2 ? (
          <StyledTooltip
            open={true}
            arrow
            placement="top"
            title={
              stepTips?.filter(
                (tip: StepTipItem) => tip.index === currentStep
              )[0]?.tip
            }
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
          </StyledTooltip>
        ) : (
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
        )}
      </div>
    </Dialog>
  );
}
