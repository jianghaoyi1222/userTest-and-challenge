/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Icon_excel from "src/assets/icon_excel.png";
import { StepTipItem, StyledTooltip } from "..";

export default function DownLoadBar(props: {
  stepTips?: StepTipItem[];
  currentStep?: number;
}) {
  const { stepTips, currentStep } = props;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : 100
      );
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyledTooltip
      open={true}
      arrow
      placement="top-start"
      title={
        stepTips?.filter((tip: StepTipItem) => tip.index === currentStep)[0]
          ?.tip
      }
    >
      <div
        css={css`
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 48px;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-left: 20px;
          background: #ffffff;
          box-shadow: inset 0px 1px 0px 0px #dbdcdd;
          z-index: 20;
        `}
      >
        <img src={Icon_excel} />
        <span
          css={css`
            font-size: 12px;
            margin-left: 11px;
          `}
        >
          表格1.xlsx
        </span>
        <div
          css={css`
            margin-left: 16px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={16}
            css={css`
              color: #ebeef5;
            `}
          />
          <CircularProgress
            variant="determinate"
            value={percent}
            size={16}
            css={css`
              position: absolute;
              left: 0;
            `}
          />
        </div>
      </div>
    </StyledTooltip>
  );
}
