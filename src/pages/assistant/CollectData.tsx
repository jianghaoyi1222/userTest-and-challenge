/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Icon_assistant from "src/assets/icon_assistant.png";

export default function CollectData(props: { open?: boolean }) {
  const { open = false } = props;
  return (
    <div
      css={css`
        display: ${open ? "block" : "none"};
        border-radius: 4px;
        background: #151515;
        position: absolute;
        top: 20px;
        right: 20px;
      `}
    >
      <div
        css={[
          css`
            display: flex;
            flex-direction: column;
            width: 340px;
            border-radius: 4px;
            background: #151515;
            box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
          `,
        ]}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: 16px;
            margin-left: 16px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            <img
              src={Icon_assistant}
              css={css`
                width: 24px;
                height: 30px;
              `}
            />
            <span
              css={css`
                color: #ffcc00;
                font-size: 22px;
                margin-left: 10px;
              `}
            >
              小蜜蜂助手
            </span>
          </div>
          {/* <IconButton
                css={css`
                  margin-right: 8px;
                `}
                onClick={onOpenOperation}
              >
                <img
                  src={Icon_operation}
                  css={css`
                    width: 24px;
                    height: 24px;
                    color: #ffffff;
                  `}
                />
              </IconButton> */}
        </div>
      </div>
    </div>
  );
}
