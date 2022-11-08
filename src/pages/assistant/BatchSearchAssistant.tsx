/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Icon_assistant from "src/assets/icon_assistant.png";
import Icon_operation from "src/assets/icon_operation.png";
import OperationList from "./components/OperationList";
import Icon_batchstart from "src/assets/icon_batchstart.png";
import { StepTipItem, StyledTooltip } from "../dataCollection";
import { CurrentModeItem } from "./BatchCreateAssistant";
import StyledStepContent from "./components/StyledStepContext";
import ExecuteProcess from "./components/ExecuteProcess";
import ExecuteCompleted from "./components/ExecuteCompleted";
import { EnterType } from "./components/PreviewTable";

export default function BatchSearchAssistant(props: {
  //显示
  open?: boolean;
  //模式
  mode?: CurrentModeItem;
  //步骤及其内容
  currentStep?: number;
  stepTips?: StepTipItem[];
  //选定搜索
  isDesignate?: boolean;
  //同步文本
  value?: any;
  //显示搜索
  isShow?: boolean;
  //鼠标悬浮
  isMouseOver?: boolean;
  //单击
  isMouseDown?: boolean;
  rowlist?: any[];
  batchlist?: any[];

  //显示或关闭助手
  handleShowAssistant?: (show: boolean) => void;
  //下一步
  handleToNextStepTip?: () => void;
  //开始
  handleStart?: () => void;
  handleBackValueChange?: (value: string) => void;
  handleTransmitBackInput?: (
    value: string,
    isBatch: boolean,
    list: string[]
  ) => void;
  handleShowData?: (show: boolean) => void;
  handleOpenPreviewTable?: (enterType?: EnterType) => void;
  handleBackPanel?: (data: any[]) => void;
  handleCountDown?: () => void;
}) {
  const {
    open,
    mode,
    currentStep,
    stepTips,
    isDesignate,
    value,
    isShow,
    isMouseOver,
    isMouseDown,
    rowlist,
    batchlist,
    handleShowAssistant,
    handleToNextStepTip,
    handleStart,
    handleBackValueChange,
    handleTransmitBackInput,
    handleShowData,
    handleOpenPreviewTable,
    handleBackPanel,
    handleCountDown,
  } = props;

  const [textValue, setTextValue] = useState("");
  const [isBatch, setIsBatch] = useState(false);

  const [batchInput, setBatchInput] = useState("");
  const [inputlist, setInputlist] = useState<any[]>([]);
  const [firstBatchInput, setFirstBatchInput] = useState<string>("");
  const [batchCompleted, setBatchCompleted] = useState(false);

  //操作列
  const [isOpenOperation, setIsOpenOperation] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const [isExcuted, setIsExcuted] = useState(false);
  const [delayTimes, setDelayTimes] = useState(1);
  const [isContinuous, setIsContinuous] = useState(false);

  //打开操作列
  const onOpenOperation = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpenOperation(true);
      setAnchorEl(event.currentTarget);
    },
    []
  );
  //关闭操作列
  const onCloseOperation = useCallback(() => {
    setAnchorEl(null);
    setIsOpenOperation(false);
  }, []);

  //开始
  const onStart = useCallback(() => {
    handleStart?.();
    handleCountDown?.();
    handleShowAssistant?.(false);
  }, [handleStart, handleShowAssistant, handleCountDown]);

  //文本输入
  const onTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextValue(event.target.value);
      handleBackValueChange?.(event.target.value);
    },
    [handleBackValueChange]
  );

  //执行
  const onExcute = useCallback(() => {
    setIsExcuted(true);
    batchlist && setTimeout(() => setDelayTimes(batchlist?.length), 800);
    setTimeout(() => setIsContinuous(true), 1000);
    handleToNextStepTip?.();
    handleShowData?.(false);
  }, [batchlist, handleToNextStepTip, handleShowData]);

  useEffect(() => {
    // let timer: any = null;
    // if (isExcuted) {
    //   if (delayTimes === batchlist?.length) {
    //     timer = setTimeout(() => setIsContinuous(true), 500);
    //   }
    // }

    if (isContinuous) {
      handleShowAssistant?.(false);
    }
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [isContinuous, handleShowAssistant]);

  //批量输入文本
  const onBatchInput = useCallback(() => {
    setIsBatch(true);
    handleToNextStepTip?.();
  }, [handleToNextStepTip]);

  const onMultilineChange = useCallback((event: any) => {
    // if (event.target.value.indexOf("'") >= 0) {
    //   const inputValue = event.target.value
    //     .split(/[(\"\')\"\']+/)
    //     .filter((item: any) => item && item.trim());
    //   setBatchInput(inputValue.join("\n"));
    //   setInputlist(inputValue);
    //   setFirstBatchInput(inputValue[0]);
    // } else {
    const value = event.target.value
      .split(/[(\r\n)\r\n]+/)
      .filter((item: any) => item && item.trim());
    setBatchInput(event.target.value);
    setInputlist(value);
    setFirstBatchInput(value[0]);
    // }
  }, []);

  const onConfirmBatch = useCallback(() => {
    if (batchInput) {
      handleTransmitBackInput?.(firstBatchInput, true, inputlist);
      handleToNextStepTip?.();
      setBatchCompleted(true);
      setIsBatch(false);
    }
  }, [batchInput, firstBatchInput, inputlist, handleToNextStepTip]);

  const onKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        setBatchInput(batchInput + "\n");
      }
    },
    [batchInput]
  );

  useEffect(() => {
    if (value) {
      setTextValue(value);
    }
  }, [value]);

  const onConfirmedBackPanel = useCallback(() => {
    rowlist && handleBackPanel?.(rowlist);
  }, [handleBackPanel, rowlist]);

  return (
    <div>
      {isExcuted && isContinuous ? (
        <ExecuteCompleted
          name={"批量查询小说排名"}
          step={3}
          rowlist={rowlist}
          onhandleExecute={() => setIsExcuted(false)}
          onOpenPreviewTable={handleOpenPreviewTable}
          onConfirmedBackPanel={onConfirmedBackPanel}
        />
      ) : (
        <div
          css={css`
            display: ${open ? "flex" : "none"};
            border-radius: 4px;
            background: #151515;
            position: absolute;
            top: 24px;
            right: 24px;
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
              mode === "record"
                ? isDesignate
                  ? isExcuted
                    ? css`
                        height: 258px;
                      `
                    : isBatch
                    ? css`
                        height: 400px;
                      `
                    : batchCompleted
                    ? isShow
                      ? isMouseDown
                        ? css`
                            height: 220px;
                          `
                        : isMouseOver
                        ? css`
                            height: 180px;
                          `
                        : css`
                            height: 220px;
                          `
                      : css`
                          height: 220px;
                        `
                    : css`
                        height: 294px;
                      `
                  : css`
                      height: 220px;
                    `
                : css`
                    height: 180px;
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
              <IconButton
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
              </IconButton>
            </div>
            <div
              css={css`
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 18px;
              `}
            >
              {mode === "record" ? (
                isDesignate ? (
                  isExcuted ? (
                    <ExecuteProcess
                      allNumber={batchlist?.length}
                      completedNumber={delayTimes}
                    />
                  ) : isBatch ? (
                    <div
                      css={css`
                        width: 308px;
                        height: 268px;
                        border-radius: 4px;
                        background: #2c2c2c;
                        padding-left: 12px;
                        padding-top: 8px;
                        display: flex;
                        flex-direction: column;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          justify-content: space-between;
                          align-items: center;
                        `}
                      >
                        <span
                          css={css`
                            font-size: 16px;
                            line-height: 24px;
                            color: #ffffff;
                          `}
                        >
                          批量输入文本：
                        </span>
                        <Button
                          css={css`
                            font-size: 12px;
                            line-height: 14px;
                            text-decoration: underline;
                            color: #0ef4f4;
                            margin-right: 6px;
                            :hover {
                              text-decoration: underline;
                            }
                          `}
                          // onClick={onClick}
                        >
                          导入已有数据
                        </Button>
                      </div>
                      {currentStep === 5 ? (
                        <StyledTooltip
                          open={true}
                          arrow
                          placement="left"
                          title={
                            <span>
                              请输入：
                              <br />
                              玄幻
                              <br />
                              都市
                              <br />
                              历史
                              <br />
                              按“enter”回车键换行
                            </span>
                          }
                        >
                          <TextField
                            variant="outlined"
                            multiline
                            rows={9}
                            value={batchInput}
                            placeholder={
                              "多个文本请用回车换行\n例如\n文本1\n文本2\n文本3\n..."
                            }
                            css={css`
                              width: 284px;
                              margin-top: 8px;
                              .MuiInputBase-root {
                                padding: 0px;
                              }
                              .MuiInputBase-input {
                                padding: 8px 8px !important;
                                font-size: 12px;
                                line-height: 22px;
                                height: 192px !important;
                                box-sizing: border-box;
                                background: #3d3d3d;
                                color: #ffffff;
                                border-radius: 4px;
                              }
                            `}
                            onFocus={() => handleToNextStepTip?.()}
                            onChange={onMultilineChange}
                          />
                        </StyledTooltip>
                      ) : (
                        <TextField
                          variant="outlined"
                          autoFocus
                          multiline
                          rows={9}
                          value={batchInput}
                          placeholder={
                            "多个文本请用回车换行\n例如\n文本1\n文本2\n文本3\n..."
                          }
                          css={css`
                            width: 284px;
                            margin-top: 8px;
                            .MuiInputBase-root {
                              padding: 0px;
                            }
                            .MuiInputBase-input {
                              padding: 8px 8px !important;
                              font-size: 12px;
                              line-height: 22px;
                              height: 192px !important;
                              box-sizing: border-box;
                              background: #3d3d3d;
                              color: #ffffff;
                              border-radius: 4px;
                            }
                          `}
                          onChange={onMultilineChange}
                          onKeyDown={onKeyDown}
                        />
                      )}
                      <span
                        css={css`
                          font-size: 12px;
                          line-height: 12px;
                          color: rgba(255, 255, 255, 0.56);
                          margin-top: 12px;
                        `}
                      >
                        预览最多显示N条
                      </span>
                    </div>
                  ) : batchCompleted ? (
                    isShow ? (
                      isMouseDown ? (
                        <StyledStepContent step={3} preStep={"抓取了数据"} />
                      ) : isMouseOver ? (
                        <div
                          css={css`
                            width: 308px;
                            height: 92px;
                            border-radius: 4px;
                            background: #2c2c2c;
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
                        <StyledStepContent
                          step={2}
                          preStep={"点击了“搜索一下”按钮"}
                        />
                      )
                    ) : (
                      <StyledStepContent step={1} preStep={"批量输入了文本"} />
                    )
                  ) : (
                    //选定搜索
                    <div
                      css={css`
                        width: 308px;
                        height: 162px;
                        border-radius: 4px;
                        background: #2c2c2c;
                        padding-left: 12px;
                        padding-top: 8px;
                      `}
                    >
                      <span
                        css={css`
                          font-size: 16px;
                          line-height: 24px;
                          color: #ffffff;
                        `}
                      >
                        已选择输入文本框
                      </span>
                      <TextField
                        value={textValue}
                        multiline
                        rows={3}
                        placeholder="这里同步显示输入文本"
                        css={css`
                          width: 284px;
                          margin-top: 8px;
                          .MuiInputBase-root {
                            padding: 0px;
                          }
                          .MuiInputBase-input {
                            padding: 8px 8px !important;
                            font-size: 12px;
                            line-height: 24px;
                            height: 72px !important;
                            box-sizing: border-box;
                            background: #3d3d3d;
                            color: #ffffff;
                            border-radius: 4px;
                          }
                        `}
                        onChange={onTextChange}
                      />
                      <div
                        css={css`
                          display: flex;
                          justify-content: flex-end;
                        `}
                      >
                        {currentStep === 4 ? (
                          <StyledTooltip
                            open={true}
                            arrow
                            placement="left"
                            title={
                              stepTips?.filter(
                                (tip: StepTipItem) => tip.index === currentStep
                              )[0]?.tip
                            }
                          >
                            <Button
                              onClick={onBatchInput}
                              css={css`
                                color: #0ef4f4;
                                font-size: 12px;
                                line-height: 14px;
                                text-decoration: underline;
                                margin-top: 16px;
                                margin-right: 6px;
                                :hover {
                                  text-decoration: underline;
                                }
                              `}
                            >
                              批量输入文本
                            </Button>
                          </StyledTooltip>
                        ) : (
                          <Button
                            onClick={onBatchInput}
                            css={css`
                              color: #0ef4f4;
                              font-size: 12px;
                              line-height: 14px;
                              text-decoration: underline;
                              margin-top: 16px;
                              margin-right: 6px;
                              :hover {
                                text-decoration: underline;
                              }
                            `}
                          >
                            批量输入文本
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                ) : (
                  //进入记录模式
                  <div
                    css={css`
                      width: 308px;
                      height: 88px;
                      background: #2c2c2c;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    `}
                  >
                    <span
                      css={css`
                        color: #ffffff;
                        font-size: 16px;
                        line-height: 24px;
                      `}
                    >
                      已进入记录模式，您可以开始操作
                    </span>
                  </div>
                )
              ) : (
                //开始
                <div
                  css={css`
                    width: 308px;
                    height: 88px;
                    background: #2c2c2c;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  <Button
                    variant="contained"
                    startIcon={<img src={Icon_batchstart} />}
                    css={css`
                      background: #ffcc00;
                      color: #151515;
                      width: 132px;
                      height: 40px;
                      border-radius: 4px;
                      :hover {
                        background: #ffcc00;
                        color: #151515;
                      }
                    `}
                    onClick={onStart}
                  >
                    点我开始
                  </Button>
                </div>
              )}
            </div>
            <div
              css={css`
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 16px;
              `}
            >
              {mode === "record" ? (
                isBatch ? (
                  <div
                    css={css`
                      width: 100%;
                      display: flex;
                      justify-content: center;
                    `}
                  >
                    <Button
                      variant="contained"
                      css={css`
                        width: 60px;
                        height: 32px;
                        background: #ffffff;
                        font-size: 14px;
                        line-height: 20px;
                        color: #151515;
                        :hover {
                          background: #ffffff;
                        }
                      `}
                      // onClick={onCancel}
                    >
                      取消
                    </Button>
                    {currentStep === 6 ? (
                      <StyledTooltip
                        open={true}
                        arrow
                        placement="left"
                        title={
                          stepTips?.filter(
                            (tip: StepTipItem) => tip.index === currentStep
                          )[0]?.tip
                        }
                      >
                        <Button
                          variant="contained"
                          css={css`
                            width: 60px;
                            height: 32px;
                            background: #ffcc00;
                            font-size: 14px;
                            line-height: 20px;
                            margin-left: 24px;
                            color: #151515;
                            :hover {
                              background: #ffcc00;
                            }
                          `}
                          onClick={onConfirmBatch}
                        >
                          确定
                        </Button>
                      </StyledTooltip>
                    ) : (
                      <Button
                        variant="contained"
                        css={css`
                          width: 60px;
                          height: 32px;
                          background: #ffcc00;
                          font-size: 14px;
                          line-height: 20px;
                          margin-left: 24px;
                          color: #151515;
                          :hover {
                            background: #ffcc00;
                          }
                        `}
                        // onClick={onClick}
                      >
                        确定
                      </Button>
                    )}
                  </div>
                ) : currentStep === 10 ? (
                  <StyledTooltip
                    open={true}
                    arrow
                    placement="left"
                    title={
                      stepTips?.filter(
                        (tip: StepTipItem) => tip.index === currentStep
                      )[0]?.tip
                    }
                  >
                    <Button
                      variant="outlined"
                      css={css`
                        color: #00b578;
                        border-radius: 4px;
                        background: rgba(0, 181, 120, 0.28);
                        padding: 6px 16px;
                        border: 1px solid #00b578;
                        width: 88px;
                        height: 32px;
                        :hover {
                          color: #00b578;
                          background: rgba(0, 181, 120, 0.28);
                          border: 1px solid #00b578;
                        }
                      `}
                      onClick={onExcute}
                    >
                      执行
                    </Button>
                  </StyledTooltip>
                ) : isMouseOver ? (
                  ""
                ) : isExcuted ? (
                  ""
                ) : (
                  <Button
                    variant="outlined"
                    css={css`
                      color: #00b578;
                      border-radius: 4px;
                      background: rgba(0, 181, 120, 0.28);
                      padding: 6px 16px;
                      border: 1px solid #00b578;
                      width: 88px;
                      height: 32px;
                      :hover {
                        color: #00b578;
                        background: rgba(0, 181, 120, 0.28);
                        border: 1px solid #00b578;
                      }
                    `}
                    onClick={onExcute}
                  >
                    执行
                  </Button>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}

      <OperationList
        open={isOpenOperation}
        anchorEl={anchorEl}
        onClose={onCloseOperation}
      />
    </div>
  );
}
