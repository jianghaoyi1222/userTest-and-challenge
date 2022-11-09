/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import {
  Button,
  Pagination,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import Icon_phone1 from "src/assets/dataCollection/icon_phone1.png";
import Icon_phone2 from "src/assets/dataCollection/icon_phone2.png";
import Icon_phone3 from "src/assets/dataCollection/icon_phone3.png";
import Icon_phone4 from "src/assets/dataCollection/icon_phone4.png";
import Icon_phone5 from "src/assets/dataCollection/icon_phone5.png";
import Icon_phone6 from "src/assets/dataCollection/icon_phone6.png";
import Icon_phone7 from "src/assets/dataCollection/icon_phone7.png";
import Icon_phone8 from "src/assets/dataCollection/icon_phone8.png";
import Icon_bee from "src/assets/icon_bee.png";
import Icon_loading from "src/assets/icon_loading.gif";
import Icon_xlsx from "src/assets/icon_xlsx.png";
import CollectDataAssistant from "../assistant/CollectDataAssistant";
import CardList from "./components/CardList";
import DataTable from "./components/DataTable";
import Icon_home from "src/assets/icon_home.png";
import DownLoadBar from "./components/DownLoadBar";
import EndPage from "src/components/EndPage";
import DataCollectionPanel from "../panel/DataCollectionPanel";
import { DataItem } from "../panel/components/DataPanel";
import moment from "moment";
import StyledAnimation from "src/components/StyledAnimation";

export interface DataListItem {
  id: number;
  price?: string;
  description?: string;
  icon?: string;
  store?: string;
}

export interface StepTipItem {
  index: number;
  tip: string;
}

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => {
  return <Tooltip {...props} arrow classes={{ popper: className }} />;
})(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#3D65E4",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#3D65E4",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: "500px",
    minWidth: "180px",
    minHeight: "76px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    maxWidth: "unset",
    marginBottom: "20px !important",
  },
}));

export default function DataCollection() {
  const [startChanllenge, setStartChanllenge] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showPanel, setShowPanel] = useState(true);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const [isCollectOver, setIsCollectOver] = useState(false);
  const [isShowCollection, setIsShowCollection] = useState(false);
  const [count, setCount] = useState(0);

  const [isShowTable, setIsShowTable] = useState(false);

  const [list, setList] = useState<DataItem>();

  let timer: any = null;

  const dataList: DataListItem[] = useMemo(
    () => [
      {
        id: 1,
        price: "3799.00",
        description:
          "Apple iPhone 12 mini(A2400) 64GB 蓝色 手机 支持移动联通电信5G 苹果",
        icon: Icon_phone1,
        store: "苹果旗舰店",
      },
      {
        id: 2,
        price: "1999.00",
        description:
          "荣耀60 SE 120Hz十亿色曲面屏 66W超级快充 6400万Vlog相机 全网通版 ",
        icon: Icon_phone2,
        store: "荣耀旗舰店",
      },
      {
        id: 3,
        price: "3399.00",
        description:
          "荣耀70 IMX800三主摄 双曲屏设计 高通骁龙778G Plus 66W快充 5G手机",
        icon: Icon_phone3,
        store: "荣耀旗舰店",
      },
      {
        id: 4,
        price: "1599.00",
        description:
          "荣耀X30 骁龙6nm疾速5G芯 66W超级快充 120Hz全视屏 全网通版 8GB+",
        icon: Icon_phone4,
        store: "荣耀旗舰店",
      },
      {
        id: 5,
        price: "1599.00",
        description:
          "荣耀X30 骁龙6nm疾速5G芯 66W超级快充 120Hz全视屏 全网通版 8GB+",
        icon: Icon_phone5,
        store: "荣耀旗舰店",
      },
      {
        id: 6,
        price: "1499.00",
        description:
          "荣耀Play6T Pro 天玑810 40W超级快充 6nm疾速芯 4800万超清双摄 全...",
        icon: Icon_phone6,
        store: "荣耀旗舰店",
      },
      {
        id: 7,
        price: "3399.00",
        description:
          "Redmi Note 11 4G FHD+ 90Hz高刷屏5000万三摄G88芯片5000mAh电池",
        icon: Icon_phone7,
        store: "荣耀旗舰店",
      },
      {
        id: 8,
        price: "2549.00",
        description:
          "荣耀70 IMX800三主摄 双曲屏设计 高通骁龙778G Plus 66W快充 5G手机",
        icon: Icon_phone8,
        store: "荣耀旗舰店",
      },
    ],
    []
  );

  const stepTips: StepTipItem[] = useMemo(
    () => [
      {
        index: 1,
        tip: "点击【获取数据】",
      },
      {
        index: 2,
        tip: "获取当前页面数据",
      },
      // {
      //   index: 3,
      //   tip: "获取完成！点击【...】继续更多操作 ",
      // },
      // { index: 4, tip: "点击【提取列链接】获取隐藏链接" },
      {
        index: 3,
        tip: "点击下载数据",
      },
      {
        index: 4,
        tip: "正在下载数据...",
      },
      {
        index: 5,
        tip: "下载完成",
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

  // useEffect(() => {
  //   const keydown = (event: KeyboardEvent) => {
  //     if (event.ctrlKey) {
  //       event.preventDefault();
  //       setIsMonitorCtrl(true);
  //     }
  //   };

  //   document.addEventListener("keydown", keydown);

  //   return () => {
  //     document.removeEventListener("keydown", keydown);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onIsMouseOver = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const onIsCollectOver = useCallback(() => {
    setIsMouseOver(true);
    setIsCollectOver(true);
  }, []);

  const onStartChanllenge = useCallback(() => {
    setStartChanllenge(true);
  }, []);

  const onStartCollect = useCallback(() => {
    setIsMouseOver(false);
    setIsCollectOver(false);
    setIsShowCollection(true);
    onToNextStepTip();
  }, [onToNextStepTip]);

  const onBackPanel = useCallback((data?: any[]) => {
    setIsShowTable(false);
    const datalist: DataItem = {
      id: "1",
      name: "京东手机列表",
      createTime: moment().format(),
      icon: Icon_xlsx,
      description: `来自于本地`,
      type: "xlsx",
      result: data,
    };
    setList(datalist);
  }, []);

  useEffect(() => {
    if (isShowCollection) {
      if (count < 8) {
        timer = setInterval(
          () => setCount((preValue) => (preValue < 8 ? preValue + 1 : 8)),
          700
        );
      } else {
        setTimeout(() => {
          setIsShowCollection(false);
          setIsShowTable(true);
        }, 100);
      }
    }
    return () => {
      clearInterval(timer);
    };
  }, [isShowCollection, timer, count]);

  return (
    <div
      css={css`
        width: 1400px;
        height: 800px;
        position: relative;
        overflow: hidden;
      `}
    >
      {startChanllenge ? (
        <div
          css={css`
            width: 100%;
            height: 100%;
            background: #cde1fd;
            position: relative;
            display: flex;
            justify-content: center;
            /* align-items: center; */
          `}
        >
          <div
            css={css`
              width: 991px;
              height: 100%;
              /* position: absolute; */
              /* bottom: 0px;
              left: 20px; */
              background: #ffffff;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: row;
                margin-left: 20px;
                margin-top: 20px;
                margin-bottom: 10px;
              `}
            >
              <TextField
                css={css`
                  width: 385px;
                  height: 48px;
                  background: #ffffff;
                  border-radius: 4px;
                  border: 1px solid #1d7bff;
                  border-radius: 0px;

                  .MuiOutlinedInput-root {
                    fieldset {
                      border-color: #f8f8f9;
                      border-radius: 0px;
                    }
                  }
                `}
                value={"手机"}
                size={"small"}
                placeholder={"请输入热搜领域"}
                id="margin-none"
                sx={{
                  width: "500px",
                }}
                InputProps={{
                  sx: { height: "48px" },
                }}
              />
              <Button
                variant="contained"
                css={css`
                  width: 115px;
                  height: 48px;
                  font-size: 20px;
                  font-weight: bold;
                  line-height: 28px;
                  border-radius: 0px;
                  background: #1d7bff;
                  :hover {
                    background: #1d7bff;
                  }
                `}
              >
                搜索一下
              </Button>
            </div>
            {currentStep === 2 ? (
              <StyledTooltip
                open={true}
                arrow
                placement="right"
                title={
                  stepTips?.filter(
                    (tip: StepTipItem) => tip.index === currentStep
                  )[0]?.tip
                }
              >
                <div
                  css={[
                    isMouseOver &&
                      css`
                        background: rgba(255, 204, 0, 0.04);
                        border: 1px solid rgba(255, 204, 0, 0.04);
                      `,
                    isCollectOver &&
                      css`
                        background: rgba(255, 204, 0, 0.2);
                        border: 1px solid #ffc300;
                      `,
                  ]}
                  onMouseOver={onIsMouseOver}
                  onMouseOut={() => setIsMouseOver(false)}
                >
                  <CardList dataList={dataList} />
                </div>
              </StyledTooltip>
            ) : (
              <CardList dataList={dataList} />
            )}
            <div
              css={css`
                margin-top: 7px;
                position: absolute;
                right: 210px;
              `}
            >
              <Pagination count={10} />
            </div>
          </div>

          <DataCollectionPanel
            open={showPanel}
            stepTips={stepTips}
            currentStep={currentStep}
            dataList={list}
            handleToNextStepTip={onToNextStepTip}
            handleClose={onShowOrClosePanel}
            handleShowOrCloseAssistant={onShowOrCloseAssistant}
          />
          <CollectDataAssistant
            open={showAssistant}
            handleToNextStepTip={onToNextStepTip}
            handleShowOrCloseAssistant={onShowOrCloseAssistant}
          />
          <div
            css={css`
              position: absolute;
              bottom: 0px;
              left: 40px;
              z-index: 10;
              height: 360px;
              overflow: hidden;
            `}
          >
            <DataTable
              show={isShowTable}
              currentStep={currentStep}
              stepTips={stepTips}
              handleToNextStepTip={onToNextStepTip}
              handleBackPanel={onBackPanel}
            />
          </div>

          <div
            css={css`
              display: ${isMouseOver ? "flex" : "none"};
              position: absolute;
              bottom: 720px;
              right: 204px;
              z-index: 10;
              width: 30px;
              height: 30px;
              border-radius: ${isCollectOver ? "0px 4px 4px 0px" : "4px"};
              overflow: hidden;
            `}
            onMouseOver={onIsCollectOver}
            onMouseOut={() => {
              setIsMouseOver(false);
              setIsCollectOver(false);
            }}
          >
            <img
              src={Icon_bee}
              css={css`
                border-radius: ${isCollectOver ? "0px 4px 4px 0px" : "4px"};
                height: 30px;
                animation: fadenumY 0.5s;
                @keyframes fadenumY {
                  0% {
                    transform: translateY(250px);
                  }
                }
              `}
            />
          </div>

          <div
            css={css`
              display: ${isCollectOver ? "flex" : "none"};
              width: 88px;
              height: 30px;
              position: absolute;
              bottom: 720px;
              right: 234px;
              z-index: 10;
              overflow: hidden;
              border-radius: 4px 0px 0px 4px;
            `}
            onMouseOver={onIsCollectOver}
            onMouseOut={() => {
              setIsMouseOver(false);
              setIsCollectOver(false);
            }}
          >
            <div
              css={css`
                width: 88px;
                background: #151515;
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadenumX 0.5s;
                @keyframes fadenumX {
                  0% {
                    transform: translateX(250px);
                  }
                }
              `}
            >
              <Button
                css={css`
                  font-size: 16px;
                  font-weight: 500;
                  color: #ffffff;
                `}
                onClick={onStartCollect}
              >
                点击抓取
              </Button>
            </div>
          </div>

          <div
            css={css`
              position: absolute;
              left: 580px;
              top: 335px;
              width: 240px;
              height: 164px;
              display: ${isShowCollection ? "flex" : "none"};
              z-index: 20;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: rgba(21, 21, 21, 0.8);
              box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
            `}
          >
            <div
              css={css`
                width: 54px;
                height: 54px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #ffffff;
                border-radius: 8px;
              `}
            >
              <img
                src={Icon_loading}
                css={css`
                  border-radius: 8px;
                `}
              />
            </div>
            <span
              css={css`
                font-size: 16px;
                font-weight: 500;
                color: #ffffff;
                margin-top: 18px;
              `}
            >
              已采集{count}/8条数据
            </span>
          </div>

          {currentStep === 4 && (
            <StyledTooltip
              open={true}
              arrow
              placement="top-start"
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
                  width: 100%;
                  height: 48px;
                `}
              >
                <DownLoadBar
                  currentStep={currentStep}
                  handleToNextStepTip={onToNextStepTip}
                />
              </div>
            </StyledTooltip>
          )}
          {currentStep >= 5 && (
            <StyledTooltip
              open={true}
              arrow
              placement="top-start"
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
                  width: 100%;
                  height: 48px;
                `}
              >
                <DownLoadBar
                  currentStep={currentStep}
                  handleToNextStepTip={onToNextStepTip}
                />
              </div>
            </StyledTooltip>
          )}
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
                获取页面数据
              </span>
              <span
                css={css`
                  font-size: 32px;
                  color: #3d3d3d;
                  margin-top: 28px;
                `}
              >
                一键获取页面数据并保存到Excel
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
      {currentStep === 1 && showAssistant && (
        <div
          css={css`
            position: absolute;
            bottom: 413px;
            right: 116px;
            pointer-events: none;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep === 2 && isMouseOver && !isCollectOver && (
        <div
          css={css`
            position: absolute;
            bottom: 708px;
            right: 194px;
            pointer-events: none;
            z-index: 50;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep === 2 && isCollectOver && (
        <div
          css={css`
            position: absolute;
            bottom: 709px;
            right: 252px;
            pointer-events: none;
            z-index: 50;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep > 5 && (
        <div
          css={css`
            position: absolute;
            left: 0px;
            top: 0px;
            z-index: 1500;
          `}
        >
          <EndPage />
        </div>
      )}
    </div>
  );
}
