/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button } from "@mui/material";
import { useCallback } from "react";

export default function CollectDataAssistant(props: {
  open?: boolean;
  handleShowOrCloseAssistant?: () => void;
  handleToNextStepTip?: () => void;
}) {
  const {
    open = false,
    handleShowOrCloseAssistant,
    handleToNextStepTip,
  } = props;

  const onNext = useCallback(() => {
    handleShowOrCloseAssistant?.();
    handleToNextStepTip?.();
  }, [handleToNextStepTip, handleShowOrCloseAssistant]);

  return (
    <div
      css={css`
        display: ${open ? "block" : "none"};
        border-radius: 4px;
        background: #151515;
        position: absolute;
        top: 55px;
        right: 78px;
        background: #ffffff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
        animation: fadenum 0.5s;
        @keyframes fadenum {
          0% {
            transform: translateX(250px);
          }
        }
        ::before {
          content: "";
          display: block;
          position: absolute;
          right: -20px;
          top: 15px;
          border-width: 10px;
          border-style: dashed dashed dashed solid;
          border-color: transparent transparent transparent black;
        }
      `}
    >
      <div
        css={css`
          width: 400px;
          height: 300px;
          display: flex;
          flex-direction: column;
          background: #000000;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            css={css`
              width: 368px;
              height: 200px;
              margin-top: 10px;
              background: #ffffff;
            `}
          ></div>

          <span
            css={css`
              font-size: 16px;
              line-height: 24px;
              color: #ffffff;
              margin-top: 17px;
            `}
          >
            一键采集页面数据
          </span>
        </div>
        <div
          css={css`
            margin-top: 5px;
          `}
        >
          <Button
            variant="contained"
            css={css`
              background: #ffffff;
              color: #1d7bff;
              margin-left: 295px;
              :hover {
                background: #ffffff;
              }
            `}
            onClick={onNext}
          >
            我知道了
          </Button>
        </div>
      </div>
    </div>
  );
}
