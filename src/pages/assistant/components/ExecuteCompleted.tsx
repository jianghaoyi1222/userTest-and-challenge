/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, Divider, IconButton } from "@mui/material";
import { useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Icon_help from "src/assets/icon_help.png";
import { EnterType } from "./PreviewTable";

export default function ExecuteCompleted(props: {
  rowlist?: any;
  onOpenPreviewTable?: (enterType?: EnterType) => void;
  onConfirmedBackPanel?: () => void;
  onhandleExecute?: (value: boolean) => void;
  onClose?: () => void;
}) {
  const {
    rowlist,
    onOpenPreviewTable,
    onConfirmedBackPanel,
    onhandleExecute,
    onClose,
  } = props;

  const list = useMemo(() => {
    if (rowlist.length > 3) {
      return rowlist.slice(0, 3);
    } else {
      return rowlist;
    }
  }, [rowlist]);

  return (
    <div
      css={css`
        width: 540px;
        height: 326px;
        border-radius: 4px;
        background: #ffffff;
        box-shadow: 0px 6px 16px -8px rgba(0, 0, 0, 0.08),
          0px 9px 28px 0px rgba(0, 0, 0, 0.05),
          0px 12px 48px 16px rgba(0, 0, 0, 0.03);
        position: absolute;
        top: 10px;
        right: 120px;
        z-index: 99990;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 16px;
          margin-top: 8px;
        `}
      >
        <span
          css={css`
            font-size: 16px;
            line-height: 24px;
            color: #00b578;
          `}
        >
          执行完成！
        </span>
        <IconButton
          onClick={() => {
            onClose?.();
            onConfirmedBackPanel?.();
            onhandleExecute?.(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          flex-direction: row;
          margin-left: 16px;
        `}
      >
        <span
          css={css`
            font-size: 14px;
            line-height: 22px;
          `}
        >
          流程名称：
        </span>
        <div
          css={css`
            margin-left: 8px;
            background: rgba(0, 0, 0, 0.04);
            width: 100px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <span
            css={css`
              font-size: 14px;
              font-weight: 250;
              line-height: 14px;
              color: #303030;
            `}
          >
            批量添加列表
          </span>
        </div>
        <div
          css={css`
            margin-left: 4px;
          `}
        >
          <img
            src={Icon_help}
            css={css`
              width: 24px;
              height: 24px;
            `}
          />
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin-top: 12px;
          margin-left: 16px;
          font-size: 14px;
          line-height: 22px;
          display: flex;
          align-items: center;
        `}
      >
        <span>总耗时：</span>
        <span
          css={css`
            color: #507afc;
          `}
        >
          1秒
        </span>
        <Divider
          orientation="vertical"
          flexItem
          css={css`
            margin: 0px 16px;
          `}
        />
        <span>共计步数：</span>
        <span
          css={css`
            color: #507afc;
          `}
        >
          4步
        </span>
        <Divider
          orientation="vertical"
          flexItem
          css={css`
            margin: 0px 16px;
          `}
        />
        <span>操作结果：</span>
        <span
          css={css`
            color: #507afc;
          `}
        >
          批量执行了<span>{list?.length}</span>次
        </span>
      </div>
      <div
        css={css`
          width: 510px;
          display: flex;
          flex-direction: column;
          margin-top: 8px;
          margin-left: 16px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            flex-grow: 1;
          `}
        >
          {["列表标题", "列表内容"].map((item: string) => (
            <div
              css={css`
                height: 32px;
                box-sizing: border-box;
                border: 1px solid #e5e6eb;
                display: flex;
                flex-grow: 1;
                align-items: center;
              `}
            >
              <span
                css={css`
                  font-size: 14px;
                  font-weight: bold;
                  line-height: 20px;
                  display: flex;
                  align-items: center;
                  ::before {
                    content: "";
                    display: inline-block;
                    height: 12px;
                    border: 3px solid #ffcc00;
                    border-radius: 5px;
                    margin-left: 17px;
                    margin-right: 8px;
                  }
                `}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          `}
        >
          {list.map((listItem: any, _index: number) => (
            <div
              css={css`
                display: flex;
                flex-direction: row;
                flex-grow: 1;
                height: 32px;
              `}
            >
              <div
                css={css`
                  box-sizing: border-box;
                  border: 1px solid #e5e6eb;
                  display: flex;
                  align-items: center;
                  width: 255px;
                `}
              >
                <span
                  css={css`
                    margin-left: 30px;
                    font-size: 14px;
                    line-height: 14px;
                  `}
                >
                  {listItem?.title}
                </span>
              </div>
              <div
                css={css`
                  box-sizing: border-box;
                  border: 1px solid #e5e6eb;
                  display: flex;
                  align-items: center;
                  width: 255px;
                `}
              >
                <span
                  css={css`
                    margin-left: 30px;
                    font-size: 14px;
                    line-height: 14px;
                  `}
                >
                  {listItem?.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        `}
      >
        <span>
          共计<span>{list?.length}</span>条数据，
        </span>
        <Button onClick={() => onOpenPreviewTable?.("preview")}>
          点击预览
        </Button>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          margin-right: 16px;
        `}
      >
        <Button
          css={css`
            border-radius: 4px;
            background: #ffcc00;
            font-size: 14px;
            line-height: 20px;
            color: #151515;
            :hover {
              background: #ffcc00;
            }
          `}
          onClick={() => {
            onClose?.();
            onConfirmedBackPanel?.();
            onhandleExecute?.(false);
          }}
        >
          确认
        </Button>
      </div>
    </div>
  );
}
