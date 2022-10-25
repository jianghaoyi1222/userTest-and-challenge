/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, Divider, Skeleton, TextField } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Panel from "../panel/Panel";
import Icon_home from "src/assets/icon_home.png";
import { StepTipItem, StyledTooltip } from "../dataCollection";
import Icon_batch from "src/assets/icon_batch.png";
import Icon_search from "src/assets/icon_search.png";
import BatchSearchAssistant from "../assistant/BatchSearchAssistant";
import CountDown from "../assistant/components/Countdown";
import StyledSkeleton from "./components/StyledSkeleton";
import { CurrentModeItem } from "../assistant/BatchCreateAssistant";
import Icon_book1 from "src/assets/batchSearch/icon_book1.png";
import Icon_book2 from "src/assets/batchSearch/icon_book2.png";
import Icon_book3 from "src/assets/batchSearch/icon_book3.png";
import Icon_book4 from "src/assets/batchSearch/icon_book4.png";
import Icon_book5 from "src/assets/batchSearch/icon_book5.png";
import BatchDataTable from "./components/BatchDataTable";

export interface BooklistItem {
  图片链接: string;
  小说名: string;
  作者: string;
  类型: string;
  简介: string;
}

export default function BatchSearch() {
  const [startChanllenge, setStartChanllenge] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [showAssistant, setShowAssistant] = useState(false);
  const [showPanel, setShowPanel] = useState(true);

  const [currentMode, setCurrentMode] = useState<CurrentModeItem>("start");

  const [isShow, setIsShow] = useState(false);

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
  const [batchlist, setBatchlist] = useState<any[]>([]);

  const [isShowTip, setIsShowTip] = useState(false);

  const [isShowData, setIsShowData] = useState(false);

  const stepTips: StepTipItem[] = useMemo(
    () => [
      {
        index: 1,
        tip: "点击【批量查询】",
      },
      {
        index: 2,
        tip: "倒计时结束后将开始记录您的操作",
      },
      {
        index: 3,
        tip: "点击输入框",
      },
      {
        index: 4,
        tip: "点击【批量输入文本】",
      },
      {
        index: 5,
        tip: "输入“玄幻”“都市”“历史”关键词间使用【回车】换行",
      },
      {
        index: 6,
        tip: "点击【确定】",
      },
      {
        index: 7,
        tip: "点击【搜索一下】",
      },
      {
        index: 8,
        tip: "操作：【Ctrl+鼠标左键】，获取当前页面的数据",
      },
      {
        index: 9,
        tip: "？实时展示查询结果",
      },
      {
        index: 10,
        tip: "点击【执行】开始批量关键词查询",
      },
    ],
    []
  );

  const booklist: BooklistItem[] = useMemo(
    () => [
      {
        图片链接: Icon_book1,
        小说名: "万古神帝",
        作者: "飞天鱼",
        类型: "玄幻",
        简介: "八百年前，明帝之子张若尘，被他的未婚妻池瑶公主杀死，一代天骄，就此陨落。 八百年后，张若尘重新活了过来，却发现曾经杀死他的未婚…",
      },
      {
        图片链接: Icon_book2,
        小说名: "我有一剑",
        作者: "青鸾峰上",
        类型: "玄幻",
        简介: "我有一剑，出鞘即无敌！",
      },
      {
        图片链接: Icon_book3,
        小说名: "万相之王",
        作者: "天蚕土豆",
        类型: "玄幻",
        简介: "天地间，有万相。而我李洛，终将成为这万相之王。继《斗破苍穹》《武动乾坤》《大主宰》《元尊》之后，天蚕土豆又一部玄幻力作。",
      },
      {
        图片链接: Icon_book4,
        小说名: "剑来",
        作者: "烽火戏诸侯",
        类型: "玄幻",
        简介: "大千世界，无奇不有。我陈平安，唯有一剑，可搬山，倒海，降妖，镇魔，敕神，摘星，断…",
      },
      {
        图片链接: Icon_book5,
        小说名: "深空彼岸",
        作者: "辰东",
        类型: "玄幻",
        简介: "浩瀚的宇宙中，一片星系的生灭，也不过是刹那的斑驳流光。仰望星空，总有种结局已注定的伤感，千百年后你我在哪里？家国，文明火光…",
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
      setIsShowTip(false);
      onToNextStepTip();
      setIsShowData(true);
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
      setBatchlist(list);
    },
    []
  );

  useEffect(() => {
    if (currentStep === 9) {
      setTimeout(() => onToNextStepTip(), 800);
    }
  }, [currentStep, onToNextStepTip]);

  const handleShowData = useCallback((show: boolean) => {
    setIsShowData(show);
    setIsMouseDown(false);
  }, []);

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
                    onClick={() => {
                      setIsShow(true);
                      setIsShowTip(true);
                      onToNextStepTip();
                    }}
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
              `}
            >
              <div
                css={[
                  css`
                    display: flex;
                    flex-direction: column;
                    padding-left: 24px;
                    padding-top: 24px;
                    width: 1000px;
                    height: 580px;
                  `,
                  currentStep === 8 &&
                    isMouseOver &&
                    css`
                      background: rgba(255, 195, 0, 0.1);
                      border: 1px solid #ffc300;
                    `,

                  isMouseDown &&
                    css`
                      background: rgba(255, 195, 0, 0.1);
                      border: 1px solid #ffc300;
                    `,
                ]}
                onMouseOver={onIsMouseOver}
                onMouseOut={() => setIsMouseOver(false)}
                onMouseDown={onIsMouseDown}
              >
                {isShow ? (
                  currentStep === 8 ? (
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
                      <div>
                        {booklist?.map((item: BooklistItem) => (
                          <div
                            css={css`
                              display: flex;
                              flex-direction: row;
                              margin-bottom: 16px;
                            `}
                          >
                            <img
                              src={item["图片链接"]}
                              css={css`
                                width: 80px;
                                height: 96px;
                                margin-right: 16px;
                              `}
                            />
                            <div
                              css={css`
                                display: flex;
                                flex-direction: column;
                                justify-content: space-evenly;
                              `}
                            >
                              <span
                                css={css`
                                  font-size: 18px;
                                  font-weight: bold;
                                  line-height: 24px;
                                  color: #3d3d3d;
                                `}
                              >
                                {item["小说名"]}
                              </span>
                              <span
                                css={css`
                                  font-size: 14px;
                                  line-height: 22px;
                                  color: #333333;
                                `}
                              >
                                {item["作者"]}
                              </span>
                              <span
                                css={css`
                                  font-size: 14px;
                                  line-height: 22px;
                                  color: #333333;
                                `}
                              >
                                {item["类型"]}
                              </span>
                              <span
                                css={css`
                                  font-size: 12px;
                                  font-weight: 350;
                                  line-height: 12px;
                                  color: #666666;
                                `}
                              >
                                {item["简介"]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </StyledTooltip>
                  ) : (
                    <div>
                      {booklist?.map((item: BooklistItem) => (
                        <div
                          css={css`
                            display: flex;
                            flex-direction: row;
                            margin-bottom: 16px;
                          `}
                        >
                          <img
                            src={item["图片链接"]}
                            css={css`
                              width: 80px;
                              height: 96px;
                              margin-right: 16px;
                            `}
                          />
                          <div
                            css={css`
                              display: flex;
                              flex-direction: column;
                              justify-content: space-evenly;
                            `}
                          >
                            <span
                              css={css`
                                font-size: 18px;
                                font-weight: bold;
                                line-height: 24px;
                                color: #3d3d3d;
                              `}
                            >
                              {item["小说名"]}
                            </span>
                            <span
                              css={css`
                                font-size: 14px;
                                line-height: 22px;
                                color: #333333;
                              `}
                            >
                              {item["作者"]}
                            </span>
                            <span
                              css={css`
                                font-size: 14px;
                                line-height: 22px;
                                color: #333333;
                              `}
                            >
                              {item["类型"]}
                            </span>
                            <span
                              css={css`
                                font-size: 12px;
                                font-weight: 350;
                                line-height: 12px;
                                color: #666666;
                              `}
                            >
                              {item["简介"]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <Fragment>
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
                  </Fragment>
                )}
              </div>
            </div>
          </div>

          {isShowTip && !isMouseOver && (
            <div
              css={css`
                width: 640px;
                height: 120px;
                border-radius: 8px;
                background: rgba(255, 195, 0, 0.62);
                position: absolute;
                bottom: 302px;
                left: 328px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
              `}
            >
              <span
                css={css`
                  font-size: 34px;
                  font-weight: 900;
                  line-height: 34px;
                  color: #8a38f5;
                `}
              >
                请按下
              </span>
              <div
                css={css`
                  width: 95px;
                  height: 60px;
                  border-radius: 10px;
                  background: #ffffff;
                  box-sizing: border-box;
                  border: 1px solid rgba(0, 0, 0, 0.08);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <span
                  css={css`
                    font-size: 34px;
                    font-weight: 900;
                    line-height: 34px;
                    color: #3d3d3d;
                  `}
                >
                  Ctrl
                </span>
              </div>
              <span
                css={css`
                  font-size: 34px;
                  font-weight: 900;
                  line-height: 34px;
                  color: #8a38f5;
                `}
              >
                同时
              </span>
              <div
                css={css`
                  width: 229px;
                  height: 60px;
                  border-radius: 10px;
                  background: #ffffff;
                  box-sizing: border-box;
                  border: 1px solid rgba(0, 0, 0, 0.08);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <span
                  css={css`
                    font-size: 34px;
                    font-weight: 900;
                    line-height: 34px;
                    color: #3d3d3d;
                  `}
                >
                  单击鼠标左键
                </span>
              </div>
            </div>
          )}

          <div
            css={css`
              display: ${currentStep === 8 && isMouseOver ? "flex" : "none"};
              position: absolute;
              bottom: 580px;
              left: 60px;
              z-index: 10;
              width: 271px;
              height: 32px;
              border-radius: 2px;
              background: #1e293e;
              color: #ffffff;
              font-size: 14px;
            `}
          >
            <div
              css={css`
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              `}
            >
              <span>表格</span>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                css={css`
                  border-radius: 4px;
                  background: rgba(255, 255, 255, 0.6);
                  margin: 8px 8px;
                `}
              />
              <span>按住“Ctrl+单击”获取数据</span>
            </div>
          </div>

          {isShowData &&
            (currentStep === 9 ? (
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
                <div
                  css={css`
                    position: absolute;
                    bottom: 0px;
                    left: 40px;
                    z-index: 10;
                  `}
                >
                  <BatchDataTable datalist={booklist} show={isMouseDown} />
                </div>
              </StyledTooltip>
            ) : (
              <div
                css={css`
                  position: absolute;
                  bottom: 0px;
                  left: 40px;
                  z-index: 10;
                `}
              >
                <BatchDataTable datalist={booklist} show={isMouseDown} />
              </div>
            ))}

          <Panel
            type="batchSearch"
            open={showPanel}
            handleToNextStepTip={onToNextStepTip}
            stepTips={stepTips}
            currentStep={currentStep}
            handleClose={onShowOrClosePanel}
            handleShowOrCloseAssistant={onShowOrCloseAssistant}
          />
          <BatchSearchAssistant
            open={showAssistant}
            currentStep={currentStep}
            stepTips={stepTips}
            mode={currentMode}
            isDesignate={isDesignate}
            value={textValue}
            isShow={isShow}
            isMouseOver={isMouseOver}
            isMouseDown={isMouseDown}
            rowlist={booklist}
            batchlist={batchlist}
            handleShowData={handleShowData}
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
                在页面自动搜索多个关键词并将搜索结果抓取到表格
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
