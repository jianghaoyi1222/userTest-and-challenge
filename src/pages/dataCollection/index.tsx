/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import {
  Button,
  Divider,
  styled,
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
import CollectData from "../assistant/CollectData";
import Panel from "../panel/Panel";
import CardList from "./components/CardList";
import DataTable from "./components/DataTable";
import Icon_home from "src/assets/icon_home.png";
import DownLoadBar from "./components/DownLoadBar";

export interface DataListItem {
  id: number;
  price?: string;
  description?: string;
  icon?: string;
  store?: string;
}

export interface StepTipItem {
  index: number;
  tip: String;
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
    minWidth: "260px",
    height: "76px",
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

  const [isMonitorCtrl, setIsMonitorCtrl] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

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
        tip: "请点这里开始采集数据~",
      },
      {
        index: 2,
        tip: "请把鼠标悬浮在页面，智能推断页面数据，待高亮时，按住Ctrl并单击一下就可获得~",
      },
      {
        index: 3,
        tip: "实时查看采集的数据，点击【...】可以修改列名、处理数据、提取隐藏链接等更多操作数据的功能 ",
      },
      { index: 4, tip: "点击这里可提取隐藏链接为新的一列" },
      {
        index: 5,
        tip: "点击这里可直接下载数据到本地~ ",
      },
      {
        index: 6,
        tip: "正在下载数据到本地 ",
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
  }, []);

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

  return (
    <div
      css={css`
        width: 1400px;
        height: 800px;
      `}
    >
      {startChanllenge ? (
        <div
          css={css`
            width: 100%;
            height: 100%;
            background: #cde1fd;
            position: relative;
          `}
        >
          {currentStep === 2 ? (
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
                  width: 991px;
                  height: 704px;
                  position: absolute;
                  bottom: 0px;
                  left: 20px;
                  z-index: 10;
                  background: #ffffff;
                `}
              >
                <div
                  css={[
                    css`
                      height: 100%;
                    `,
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
                  <CardList dataList={dataList} />
                </div>
              </div>
            </StyledTooltip>
          ) : (
            <div
              css={css`
                width: 991px;
                height: 704px;
                position: absolute;
                bottom: 0px;
                left: 20px;
                background: #ffffff;
              `}
            >
              <CardList dataList={dataList} />
            </div>
          )}
          <Panel
            open={showPanel}
            handleToNextStepTip={onToNextStepTip}
            stepTips={stepTips}
            currentStep={currentStep}
            handleClose={onShowOrClosePanel}
            handleShowOrCloseAssistant={onShowOrCloseAssistant}
          />
          <CollectData
            open={showAssistant}
            isMouseOver={isMouseOver}
            isMouseDown={isMouseDown}
            handleShowOrCloseAssistant={onShowOrCloseAssistant}
          />
          <div
            css={css`
              position: absolute;
              bottom: 0px;
              left: 40px;
              z-index: 10;
            `}
          >
            <DataTable
              show={isMouseDown}
              currentStep={currentStep}
              stepTips={stepTips}
              handleToNextStepTip={onToNextStepTip}
            />
          </div>

          <div
            css={css`
              display: ${isMouseOver ? "flex" : "none"};
              position: absolute;
              bottom: 704px;
              left: 20px;
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
              <span>页面数据</span>
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
          {currentStep === 6 && (
            <DownLoadBar stepTips={stepTips} currentStep={currentStep} />
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
                采集数据
              </span>
              <span
                css={css`
                  font-size: 32px;
                  color: #3d3d3d;
                  margin-top: 28px;
                `}
              >
                15秒内采集页面数据并保存到本地Excel
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
