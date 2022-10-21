/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, Popover, Switch } from "@mui/material";

export default function OperationList(props: {
  open?: boolean;
  anchorEl?: Element | null;
  onClose?: () => void;
}) {
  const { open, anchorEl, onClose } = props;

  return (
    <Popover
      open={open ?? false}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      css={css`
        z-index: 50;
        .MuiPaper-root {
          background-color: #151515;
          width: 108px;
          height: 72px;
          border-radius: 2px;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          margin-left: 8px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            <span
              css={css`
                font-size: 14px;
                line-height: 20px;
                color: #ffffff;
              `}
            >
              数据面板
            </span>
            <Switch
              size="small"
              css={css`
                .MuiSwitch-switchBase {
                  padding: 6px;
                }
                .MuiSwitch-thumb {
                  width: 12px;
                  height: 12px;
                }
                .MuiSwitch-track {
                  background-color: #383838;
                }
              `}
            />
          </div>
          <Button
            css={css`
              font-size: 14px;
              line-height: 20px;
              color: #fa5151;
              justify-content: start;
              padding: 0px;
            `}
          >
            退出流程
          </Button>
        </div>
      </div>
    </Popover>
  );
}
