/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, Divider, Skeleton, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import CollectData from "../assistant/CollectData";
import Panel from "../panel/Panel";
import Icon_home from "src/assets/icon_home.png";
import { StepTipItem, StyledTooltip } from "../dataCollection";
import Icon_batch from "src/assets/icon_batch.png";
import Icon_search from "src/assets/icon_search.png";
import BeeAssistant from "../assistant/BeeAssistant";
import CountDown from "../assistant/components/Countdown";
import StyledSkeleton from "./components/StyledSkeleton";
import { CurrentModeItem } from "../assistant/BatchClicks";

export default function BatchSearch() {
  const [startChanllenge, setStartChanllenge] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [showAssistant, setShowAssistant] = useState(false);
  const [showPanel, setShowPanel] = useState(true);

  const [currentMode, setCurrentMode] = useState<CurrentModeItem>("start");

  const [isMonitorCtrl, setIsMonitorCtrl] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  //开始倒计时
  const [isStart, setIsStart] = useState(false);

  //选定高亮搜索
  const [isDesignate, setIsDesignate] = useState(false);

  //同步文本
  const [textValue, setTextValue] = useState("");

  const [isHighlight, setIsHighlight] = useState(false);

  const [isBatch, setIsBatch] = useState(false);

  const stepTips: StepTipItem[] = useMemo(
    () => [
      {
        index: 1,
        tip: "点这里开始批量操作体验~",
      },
      {
        index: 2,
        tip: "倒计时结束后将自动记录您的整个操作过程",
      },
      {
        index: 3,
        tip: "请在这里输入关键词：玄幻",
      },
      {
        index: 4,
        tip: "点这里可以批量输入多个关键词",
      },
      {
        index: 5,
        tip: "按回车换行输入第二个关键词“都市”",
      },
      {
        index: 6,
        tip: "点击【确定】绑定多个关键词到输入框，流程执行时将自动循环在输入框中搜索；",
      },
      {
        index: 7,
        tip: "请点击【搜索一下】按钮",
      },
      {
        index: 8,
        tip: "请把鼠标悬浮在页面，智能推断页面数据，待高亮时，按住Ctrl并单击一下就可获得",
      },
      {
        index: 9,
        tip: "在这里可以实时查看采集的搜索结果",
      },
      {
        index: 10,
        tip: "点击【执行】开始批量使用关键词搜索并采集搜索结果",
      },
    ],
    []
  );

  const onToNextStepTip = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const onShowOrCloseAssistant = useCallback(() => {
    setShowAssistant(!showAssistant);
  }, [showAssistant]);

  const onShowOrClosePanel = useCallback(() => {
    setShowPanel(!showPanel);
  }, [showPanel]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
        setIsMonitorCtrl(true);
      }
    };

    document.addEventListener("keydown", keydown);

    return () => {
      document.removeEventListener("keydown", keydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const onIsMouseOver = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const onIsMouseDown = useCallback(() => {
    if (isMonitorCtrl) {
      setIsMouseDown(true);
      setIsMouseOver(false);
      onToNextStepTip();
    } else {
      return;
    }
  }, [isMonitorCtrl, onToNextStepTip]);

  const onStartChanllenge = useCallback(() => {
    setStartChanllenge(true);
  }, []);

  //开始记录
  const onhandleStart = useCallback(() => {
    setIsStart(!isStart);
  }, [isStart]);

  //切换模式
  const onhandleCurrentMode = useCallback((value: CurrentModeItem) => {
    setCurrentMode(value);
  }, []);

  //聚焦搜索
  const handleFocus = useCallback(() => {
    if (currentMode === "record") {
      setIsDesignate(true);
      setIsHighlight(true);
      onToNextStepTip();
    }
  }, [onToNextStepTip]);

  //同步助手文本
  const onTextValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextValue(event.target.value);
    },
    []
  );

  //同步搜索
  const onChangeBackValue = useCallback((value: string) => {
    setTextValue(value);
  }, []);

  const onTransmitBackInput = useCallback(
    (value: string, batch: boolean, list: string[]) => {
      setTextValue(value);
      setIsBatch(batch);
    },
    []
  );

  return (
    <div
      css={css`
        width: 1400px;
        height: 800px;
        position: relative;
      `}
    >
      {startChanllenge ? (
        <div
          css={css`
            width: 1400px;
            height: 800px;
            background: #cde1fd;
            position: relative;
            padding-top: 26px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              margin-left: 60px;
            `}
          >
            <span
              css={css`
                font-size: 40px;
                color: rgba(54, 98, 236, 0.6);
                font-style: italic;
              `}
            >
              小蜜蜂小说排名榜
            </span>
            <div
              css={css`
                display: flex;
                flex-direction: row;
                margin-top: 20px;
              `}
            >
              {currentStep === 3 ? (
                <StyledTooltip
                  open={true}
                  arrow
                  placement="bottom"
                  title={
                    stepTips?.filter(
                      (tip: StepTipItem) => tip.index === currentStep
                    )[0]?.tip
                  }
                >
                  <TextField
                    css={css`
                      width: 563px;
                      height: 44px;
                      background: #f8f8f9;
                      border-radius: 4px;
                      border: ${currentMode === "record" &&
                      isHighlight &&
                      "2px solid #ffc300"};
                      .MuiOutlinedInput-root {
                        fieldset {
                          border-color: #f8f8f9;
                        }
                      }
                    `}
                    value={textValue}
                    onChange={onTextValueChange}
                    onFocus={handleFocus}
                    onMouseMove={() => setIsHighlight(true)}
                    onMouseLeave={() => {
                      !isDesignate && setIsHighlight(false);
                    }}
                    size={"small"}
                    placeholder={"请输入热搜领域"}
                    id="margin-none"
                    sx={{
                      width: "563px",
                    }}
                    InputProps={{
                      sx: { height: "44px" },
                      startAdornment: (
                        <img
                          css={css`
                            width: 18px;
                            height: 18px;
                            margin-right: 14px;
                          `}
                          src={Icon_search}
                        />
                      ),
                      endAdornment: isBatch && <img src={Icon_batch} />,
                    }}
                  />
                </StyledTooltip>
              ) : (
                <TextField
                  css={css`
                    width: 563px;
                    height: 44px;
                    background: #f8f8f9;
                    border-radius: 4px;
                    border: ${currentMode === "record" &&
                    isHighlight &&
                    "2px solid #ffc300"};
                    .MuiOutlinedInput-root {
                      fieldset {
                        border-color: #f8f8f9;
                      }
                    }
                  `}
                  value={textValue}
                  onChange={onTextValueChange}
                  onFocus={handleFocus}
                  onMouseMove={() => setIsHighlight(true)}
                  onMouseLeave={() => {
                    !isDesignate && setIsHighlight(false);
                  }}
                  size={"small"}
                  placeholder={"请输入热搜领域"}
                  id="margin-none"
                  sx={{
                    width: "563px",
                  }}
                  InputProps={{
                    sx: { height: "44px" },
                    startAdornment: (
                      <img
                        css={css`
                          width: 18px;
                          height: 18px;
                          margin-right: 14px;
                        `}
                        src={Icon_search}
                      />
                    ),
                    endAdornment: isBatch && <img src={Icon_batch} />,
                  }}
                />
              )}
              {currentStep === 7 ? (
                <StyledTooltip
                  open={true}
                  arrow
                  placement="bottom"
                  title={
                    stepTips?.filter(
                      (tip: StepTipItem) => tip.index === currentStep
                    )[0]?.tip
                  }
                >
                  <Button
                    css={css`
                      width: 142px;
                      height: 44px;
                      background: #00b578;
                      font-size: 16px;
                      font-weight: bold;
                      line-height: 24px;
                      color: #ffffff;
                      :hover {
                        background: #00b578;
                      }
                    `}
                  >
                    搜索一下
                  </Button>
                </StyledTooltip>
              ) : (
                <Button
                  css={css`
                    width: 142px;
                    height: 44px;
                    background: #00b578;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 24px;
                    color: #ffffff;
                    :hover {
                      background: #00b578;
                    }
                  `}
                >
                  搜索一下
                </Button>
              )}
            </div>
            <div
              css={css`
                width: 1000px;
                height: 580px;
                position: absolute;
                bottom: 0;
                background: #ffffff;
                display: flex;
                flex-direction: column;
                padding-left: 24px;
                padding-top: 24px;
              `}
            >
              <Skeleton
                variant="rectangular"
                animation={false}
                width={300}
                height={22}
                css={css`
                  border-radius: 4px;
                `}
              />
              <StyledSkeleton />
              <StyledSkeleton />
              <StyledSkeleton />
              <StyledSkeleton />
            </div>
          </div>

          <Panel
            type="batchSearch"
            open={showPanel}
            handleToNextStepTip={onToNextStepTip}
            stepTips={stepTips}
            currentStep={currentStep}
            handleClose={onShowOrClosePanel}
            handleShowOrCloseAssistant={onShowOrCloseAssistant}
          />
          <BeeAssistant
            open={showAssistant}
            currentStep={currentStep}
            stepTips={stepTips}
            mode={currentMode}
            isDesignate={isDesignate}
            value={textValue}
            handleShowAssistant={onShowOrCloseAssistant}
            handleStart={onhandleStart}
            handleToNextStepTip={onToNextStepTip}
            handleBackValueChange={onChangeBackValue}
            handleTransmitBackInput={onTransmitBackInput}
          />
          <CountDown
            open={isStart}
            width={1400}
            height={800}
            currentStep={currentStep}
            stepTips={stepTips}
            handleClose={onhandleStart}
            handleOpenAssistant={onShowOrCloseAssistant}
            handleCurrentMode={onhandleCurrentMode}
            handleToNextStepTip={onToNextStepTip}
          />
        </div>
      ) : (
        <div
          css={css`
            width: 100%;
            height: 100%;
            background: radial-gradient(
              48% 48% at 43% 14%,
              #f1f6fe 0%,
              #fbfeff 99%
            );
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                margin-left: 80px;
              `}
            >
              <span
                css={css`
                  font-size: 48px;
                  font-weight: bold;
                  color: #242424;
                `}
              >
                批量查询
              </span>
              <span
                css={css`
                  font-size: 32px;
                  color: #3d3d3d;
                  margin-top: 28px;
                `}
              >
                在页面自动搜索多个关键词并将搜索结果抓取到表格。
              </span>
              <Button
                variant="contained"
                onClick={onStartChanllenge}
                css={css`
                  width: 116px;
                  height: 48px;
                  border-radius: 4px;
                  background: #0256ff;
                  font-size: 16px;
                  line-height: 24px;
                  color: #ffffff;
                  margin-top: 60px;
                  :hover {
                    background: #0256ff;
                  }
                `}
              >
                开始挑战
              </Button>
            </div>
            <img
              src={Icon_home}
              css={css`
                width: 839px;
                height: 516px;
              `}
            />
          </div>
        </div>
      )}
    </div>
  );
}
