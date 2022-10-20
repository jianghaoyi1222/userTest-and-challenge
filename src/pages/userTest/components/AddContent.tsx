/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useEffect, useState } from "react";
import Icon_batch from "src/assets/icon_batch.png";
import { CurrentModeItem } from "src/pages/assistant/BatchClicks";

export interface ListItem {
  id: number;
  title: string;
  description?: string;
}

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export default function AddContent(props: {
  open?: boolean;
  mode?: CurrentModeItem;
  transmitBackTitle?: any;
  isBatchTitle?: boolean;
  transmitBackContent?: any;
  isBatchContent?: boolean;
  handleClose?: () => void;
  handleIdentifyComponent?: (component: string) => void;
  handleChangeTitle?: (event?: any) => void;
  handleChangeContent?: (event?: any) => void;
  handleConfirm?: (isConfirm: boolean) => void;
  handleAddStep?: (component: any, text: string) => void;
}) {
  const {
    open,
    mode,
    transmitBackTitle,
    isBatchTitle,
    transmitBackContent,
    isBatchContent,
    handleClose,
    handleIdentifyComponent,
    handleChangeTitle,
    handleChangeContent,
    handleConfirm,
    handleAddStep,
  } = props;
  const [isTitleHighlight, setIsTitleHighlight] = useState<boolean>(false);
  const [isContentHighlight, setIsContentHighlight] = useState<boolean>(false);
  const [isButtonHighlight, setIsButtonHighlight] = useState<boolean>(false);

  const [focusTitle, setFouseTitle] = useState(false);
  const [focusContent, setFoustContent] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onFouseTitle = useCallback(() => {
    if (mode === "record") {
      handleIdentifyComponent?.("input-title");
      handleAddStep?.("input-title", "批量输入了文本");
    }
    setFouseTitle(true);
  }, [mode, handleIdentifyComponent]);

  const onFouseContent = useCallback(() => {
    if (mode === "record") {
      handleIdentifyComponent?.("input-content");
      handleAddStep?.("input-content", "批量输入了文本");
    }
    setFoustContent(true);
  }, [mode, handleIdentifyComponent]);

  const onConfirm = useCallback(() => {
    if (mode === "record") {
      handleIdentifyComponent?.("button-confirm");
      handleAddStep?.("button-confirm", "点击了“确定”按钮");
    }
    setIsButtonHighlight(true);
    handleClose?.();
    handleConfirm?.(true);
  }, [mode, handleIdentifyComponent, handleClose]);

  const onChangeTitle = useCallback((event: any) => {
    handleChangeTitle?.(event.target.value);
    setTitle(event.target.value);
  }, []);

  const onChangeContent = useCallback((event: any) => {
    handleChangeContent?.(event.target.value);
    setContent(event.target.value);
  }, []);

  useEffect(() => {
    setTitle(transmitBackTitle);
    setContent(transmitBackContent);
  }, [transmitBackTitle, transmitBackContent]);

  const DialogTitle = (props: DialogTitleProps) => {
    const { children, onClose } = props;
    return (
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 24px 16px 20px 24px;
        `}
      >
        <Typography
          css={css`
            color: #3d3d3d;
            font-size: 18px;
          `}
        >
          {children}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <div
      css={css`
        width: 1440px;
        height: 800px;
        position: fixed;
        bottom: 0px;
        display: ${open ? "block" : "none"};
        background: rgba(0, 0, 0, 0.24);
      `}
    >
      <div
        css={css`
          width: 540px;
          height: 400px;
          position: absolute;
          bottom: 200px;
          left: 450px;
          border-radius: 4px;
          background: #ffffff;
        `}
      >
        <DialogTitle onClose={handleClose}>添加</DialogTitle>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
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
                align-items: center;
              `}
            >
              <span
                css={css`
                  color: #fa5151;
                  font-size: 14px;
                `}
              >
                *
              </span>
              <span
                css={css`
                  font-size: 14px;
                  color: #8e8e8e;
                `}
              >
                列表标题：
              </span>
            </div>
            <TextField
              value={title}
              variant="outlined"
              placeholder="请输入"
              css={css`
                width: 492px;
                height: 36px;
                margin-top: 8px;
                .MuiInputBase-input {
                  padding: 8px 16px;
                  font-size: 14px;
                }
                border: ${mode === "record" &&
                isTitleHighlight &&
                "2px solid #ffc300"};
                /* .MuiOutlinedInput-root {
                  fieldset {
                    border: ${mode === "record" &&
                isTitleHighlight &&
                "2px solid #ffc300"};
                  }
                }
                .Mui-focused .MuiOutlinedInput-notchedOutline {
                  border-color: ${mode === "record" &&
                isTitleHighlight &&
                "#ffc300"};
                }
                :hover .MuiOutlinedInput-notchedOutline {
                  border: ${mode === "record" &&
                isTitleHighlight &&
                "2px solid #ffc300"};
                } */
              `}
              InputProps={{
                endAdornment: isBatchTitle && <img src={Icon_batch} />,
              }}
              onMouseMove={() => setIsTitleHighlight(true)}
              onMouseLeave={() => {
                !focusTitle && setIsTitleHighlight(false);
              }}
              onFocus={onFouseTitle}
              onChange={onChangeTitle}
            />
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              margin-top: 24px;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
              `}
            >
              <span
                css={css`
                  color: #fa5151;
                  font-size: 14px;
                `}
              >
                *
              </span>
              <span
                css={css`
                  font-size: 14px;
                  color: #8e8e8e;
                `}
              >
                列表内容：
              </span>
            </div>
            <TextField
              value={content}
              variant="outlined"
              placeholder="请输入"
              multiline
              rows={4}
              css={css`
                width: 492px;
                margin-top: 8px;
                .MuiInputBase-root {
                  padding: 8px 16px;
                  font-size: 14px;
                }
                border: ${mode === "record" &&
                isContentHighlight &&
                "2px solid #ffc300"};
                /* fieldset {
                  border: ${mode === "record" &&
                isContentHighlight &&
                "2px solid #ffc300"};
                }
                .Mui-focused .MuiOutlinedInput-notchedOutline {
                  border-color: ${mode === "record" &&
                isContentHighlight &&
                "#ffc300"};
                }
                :hover .MuiOutlinedInput-notchedOutline {
                  border: ${mode === "record" &&
                isContentHighlight &&
                "2px solid #ffc300"};
                } */
              `}
              InputProps={{
                endAdornment: isBatchContent && <img src={Icon_batch} />,
              }}
              onMouseMove={() => setIsContentHighlight(true)}
              onMouseLeave={() => {
                !focusContent && setIsContentHighlight(false);
              }}
              onFocus={onFouseContent}
              onChange={onChangeContent}
            />
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 40px;
            margin-right: 22px;
          `}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            css={css`
              width: 88px;
              height: 36px;
              background: #ffffff;
              color: #000000;
              font-size: 14px;
              border: 1px solid rgba(0, 0, 0, 0.16);
              border-radius: 4px;
              :hover {
                background: #ffffff;
                color: #000000;
              }
            `}
          >
            取消
          </Button>
          <Button
            onClick={onConfirm}
            onMouseMove={() => setIsButtonHighlight(true)}
            onMouseLeave={() => setIsButtonHighlight(false)}
            variant="contained"
            css={css`
              width: 88px;
              height: 36px;
              background: #3377ff;
              font-size: 14px;
              border-radius: 4px;
              margin-left: 16px;
              border: ${mode === "record" &&
              isButtonHighlight &&
              "2px solid #FFC300"};
            `}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
}
