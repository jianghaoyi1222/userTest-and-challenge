/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Icon_logo from "src/assets/icon_logo.png";
import { useCallback, useEffect, useState } from "react";
import FlowPanel, { FlowItem } from "./components/FlowPanel";
import DataPanel, { DataItem } from "./components/DataPanel";
import Icon_unfold from "src/assets/icon_unfold.png";
import Icon_add from "src/assets/icon_add.png";
import SearchInput from "src/components/SearchInput";
import { IconButton } from "@mui/material";
import { StepTipItem } from "../dataCollection";

export default function Panel(props: {
  activeTab?: string;
  anchorEl?: any;
  open?: boolean;
  dataList?: DataItem;
  flowList?: FlowItem;
  existingData?: DataItem[];

  stepTips?: StepTipItem[];
  currentStep?: number;

  handleBatch?: (event: any, value: boolean) => void;
  handleClose?: () => void;
  handleGainExistingData?: (data: DataItem[]) => void;

  handleToNextStepTip?: () => void;
  handleShowOrCloseAssistant?: () => void;

  handleOpenTable?: () => void;
}) {
  const {
    activeTab = "flow",
    open = true,
    dataList,
    flowList,
    existingData,

    stepTips,
    currentStep,

    handleBatch,
    handleGainExistingData,

    handleClose,
    handleToNextStepTip,
    handleShowOrCloseAssistant,

    handleOpenTable,
  } = props;
  const [activeItem, setActiveItem] = useState<string>("");
  const [datalist, setDatalist] = useState<DataItem>();
  const [flowlist, setFlowlist] = useState<FlowItem>();

  const handleChangeDataSourceSituation = useCallback(() => {
    setDatalist(undefined);
  }, []);

  useEffect(() => {
    setDatalist(dataList);
    setFlowlist(flowList);
  }, [dataList, flowList]);

  const activeItemCss = css`
    ::after {
      content: " ";
      margin-top: 8px;
      width: 16px;
      height: 4px;
      background: #ffcc00;
      display: block;
      border-radius: 2px;
    }
  `;

  useEffect(() => {
    setActiveItem(activeTab);
  }, [activeTab]);

  return (
    <div
      css={css`
        position: absolute;
        top: 32px;
        right: 32px;
        border-radius: 24px;
        max-width: 400px;
        max-height: 720px;
        z-index: 10;
        display: ${open ? "block" : "none"};
      `}
    >
      <div
        css={css`
          display: flex;
          width: 400px;
          height: 720px;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.45);
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            width: 56px;
            height: 720px;
            border-radius: 24px;
            background: #151515;
            box-sizing: border-box;
            border: 0px solid #1e293e;
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.45);
          `}
        >
          <div
            css={css`
              width: 30px;
              height: 46px;
              margin-top: 24px;
            `}
          >
            <img src={Icon_logo} />
          </div>

          <p
            css={[
              css`
                margin-top: 50px;
                width: 21px;
                height: 48px;
                font-family: SourceHanSansCN-Regular;
                font-size: 20px;
                font-weight: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: ${activeItem === "flow"
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.3)"};
              `,
              activeItem === "flow" && activeItemCss,
            ]}
            onClick={() => setActiveItem("flow")}
          >
            自动
          </p>
          <p
            css={[
              css`
                margin-top: 26px;
                width: 21px;
                height: 48px;
                font-family: SourceHanSansCN-Regular;
                font-size: 20px;
                font-weight: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: ${activeItem === "data"
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.3)"};
              `,
              activeItem === "data" && activeItemCss,
            ]}
            onClick={() => setActiveItem("data")}
          >
            数据
          </p>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 344px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              width: 100%;
              height: 24px;
              align-items: center;
              justify-content: flex-end;
              margin-top: 24px;
              padding-right: 18px;
            `}
          >
            <IconButton
              css={css`
                width: 40px;
                height: 40px;
              `}
            >
              <img
                src={Icon_add}
                css={css`
                  width: 16px;
                  height: 16px;
                `}
              />
            </IconButton>
            <IconButton
              css={css`
                width: 40px;
                height: 40px;
              `}
            >
              <img
                src={Icon_unfold}
                css={css`
                  width: 24px;
                `}
              />
            </IconButton>
          </div>

          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 16px;
            `}
          >
            <SearchInput />
          </div>

          {activeItem === "flow" && (
            <FlowPanel
              flowSource={flowlist}
              handleBatch={handleBatch}
              stepTips={stepTips}
              currentStep={currentStep}
              handleClose={handleClose}
              handleToNextStepTip={handleToNextStepTip}
              handleShowOrCloseAssistant={handleShowOrCloseAssistant}
            />
          )}
          {activeItem === "data" && (
            <DataPanel
              existingData={existingData}
              dataSource={datalist}
              currentStep={currentStep}
              stepTips={stepTips}
              handleGainExistingData={handleGainExistingData}
              handleChangeDataSourceSituation={handleChangeDataSourceSituation}
              handleOpenTable={handleOpenTable}
              handleToNextStepTip={handleToNextStepTip}
            />
          )}
        </div>
      </div>
    </div>
  );
}
