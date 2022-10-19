/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button } from "@mui/material";
import { useCallback } from "react";
import Icon_assistant from "src/assets/icon_assistant.png";

export default function CollectData(props: {
  open?: boolean;
  isMouseOver?: boolean;
  isMouseDown?: boolean;
  handleShowOrCloseAssistant?: () => void;
}) {
  const {
    open = false,
    isMouseDown,
    isMouseOver,
    handleShowOrCloseAssistant,
  } = props;

  const onClose = useCallback(() => {
    handleShowOrCloseAssistant?.();
  }, [handleShowOrCloseAssistant]);

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
            height: ${isMouseDown ? 260 : 220}px;
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
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 10px;
          `}
        >
          {isMouseDown ? (
            <div
              css={css`
                width: 308px;
                height: 128px;
                display: flex;
                flex-direction: column;
                border-radius: 4px;
                background: #2c2c2c;
                box-sizing: border-box;
                border: 1px solid rgba(255, 255, 255, 0.1);
              `}
            >
              <div
                css={css`
                  width: 100%;
                  height: 39px !important;
                  background: #3d3d3d;
                  padding-left: 16px;
                  display: flex;
                  align-items: center;
                `}
              >
                <span
                  css={css`
                    font-size: 16px;
                    color: #ffffff;
                  `}
                >
                  ✅已采集8条数据
                </span>
              </div>
              <span
                css={css`
                  font-size: 14px;
                  line-height: 20px;
                  margin-left: 16px;
                  margin-top: 16px;
                  color: #ffffff;
                `}
              >
                👉{" "}
                <Button
                  css={css`
                    text-decoration: underline;
                    color: #0ef4f4;
                    padding: 0px;
                  `}
                >
                  设置分页
                </Button>
                丨采集剩余分页数据
              </span>
              <span
                css={css`
                  font-size: 14px;
                  line-height: 20px;
                  margin-left: 16px;
                  margin-top: 16px;
                  color: #ffffff;
                `}
              >
                👉{" "}
                <Button
                  css={css`
                    text-decoration: underline;
                    color: #0ef4f4;
                    padding: 0px;
                  `}
                >
                  深度采集
                </Button>
                丨采集子页面或隐藏数据
              </span>
            </div>
          ) : (
            <div
              css={css`
                width: 308px;
                height: 88px;
                border-radius: 4px;
                background: #2c2c2c;
                box-sizing: border-box;
                border: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              {isMouseOver ? (
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <span
                    css={css`
                      font-size: 16px;
                      font-weight: bold;
                      line-height: 24px;
                      color: #ffffff;
                    `}
                  >
                    已进入采集模式
                  </span>
                  <span
                    css={css`
                      font-size: 14px;
                      line-height: 20px;
                      color: #ffffff;
                      margin-top: 16px;
                    `}
                  >
                    按住“Ctrl”后“点击”要采集的数据
                  </span>
                </div>
              ) : (
                <span
                  css={css`
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 24px;
                    color: #ffffff;
                  `}
                >
                  按住Ctrl，单击采集数据
                </span>
              )}
            </div>
          )}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 16px;
          `}
        >
          <Button
            variant="outlined"
            css={css`
              color: #ff3c31;
              border-radius: 4px;
              background: rgba(255, 60, 49, 0.28);
              padding: 6px 16px;
              border: 1px solid #ff3c31;
              width: 88px;
              height: 32px;
              :hover {
                color: #ff3c31;
                background: rgba(255, 60, 49, 0.28);
                border: 1px solid #ff3c31;
              }
            `}
            onClick={onClose}
          >
            结束
          </Button>
        </div>
      </div>
    </div>
  );
}
