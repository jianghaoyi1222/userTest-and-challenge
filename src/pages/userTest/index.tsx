/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { IconButton } from "@mui/material";
import moment from "moment";
import { useCallback, useState } from "react";
import Icon_mark from "src/assets/icon_mark.png";
import { DataItem } from "../panel/components/DataPanel";
import Panel from "../panel/Panel";
import DemonstrationTable from "./components/DemonstrationTable";
import Icon_xlsx from "src/assets/icon_xlsx.png";
import { FlowItem } from "../panel/components/FlowPanel";
import Icon_bee from "src/assets/icon_bee.png";
import BatchCreateAssistant, {
  CurrentModeItem,
} from "../assistant/BatchCreateAssistant";

export interface ListItem {
  id: number;
  title: string;
  description?: string;
}

export interface StepListItem {
  step: number;
  component: any;
  text: string;
}

export default function UserTest() {
  const [showPanel, setShowPanel] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [assistantAnchorEl, setAssistantAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const [currentMode, setCurrentMode] = useState<CurrentModeItem>();

  const [identifyComponent, setIdentifyComponent] = useState<string>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [transmitBackTitle, setTransmitBackTitle] = useState("");
  const [isBatchTitle, setIsBatchTitle] = useState<boolean>(false);
  const [titleList, setTitleList] = useState([]);

  const [transmitBackContent, setTransmitBackContent] = useState("");
  const [isBatchContent, setIsBatchContent] = useState<boolean>(false);
  const [contentList, setContentList] = useState([]);

  const [existingData, setExistingData] = useState<DataItem[]>([]);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [isExecuted, setIsExecuted] = useState(false);

  const [dataList, setDataList] = useState<DataItem>();
  const [flowList, setFlowList] = useState<FlowItem>();

  const [stepList, _setStepList] = useState<StepListItem[]>([]);

  const onShowPanel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setShowPanel(true);
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handlePanelClose = useCallback(() => {
    setShowPanel(false);
  }, []);

  const handleAssistantClose = useCallback(() => {
    setShowAssistant(false);
  }, []);

  const onhandleBatch = useCallback((event: any, value: boolean) => {
    setShowPanel(value);
    setShowAssistant(true);
    setAssistantAnchorEl(event);
  }, []);

  const onhandleCountDown = useCallback((value: boolean) => {
    if (value) {
      setShowCountDown(value);
    } else {
      setShowCountDown(value);
      setShowAssistant(true);
    }
  }, []);

  const onhandleCurrentMode = useCallback((mode: CurrentModeItem) => {
    setCurrentMode(mode);
  }, []);

  const onIdentifyComponent = useCallback((component?: string) => {
    setIdentifyComponent(component);
  }, []);

  const onHandleChangeTitle = useCallback((event?: any) => {
    setTitle(event);
  }, []);

  const onHandleChangeContent = useCallback((event?: any) => {
    setContent(event);
  }, []);

  const onTransmitBackTitle = useCallback(
    (value?: any, isBatch?: boolean, valueList?: any) => {
      setTransmitBackTitle(value);
      setIsBatchTitle(isBatch ?? isBatchTitle);
      setTitleList(valueList);
    },
    [isBatchTitle]
  );

  const onTransmitBackContent = useCallback(
    (value?: any, isBatch?: boolean, valueList?: any) => {
      setTransmitBackContent(value);
      setIsBatchContent(isBatch ?? isBatchContent);
      setContentList(valueList);
    },
    [isBatchContent]
  );

  const onGainExistingData = useCallback((data: DataItem[]) => {
    setExistingData(data);
  }, []);

  const handleConfirm = useCallback((isConfirm: boolean) => {
    setIsConfirmed(isConfirm);
  }, []);

  const handleExecute = useCallback((isExecuted: boolean) => {
    setIsExecuted(isExecuted);
  }, []);

  const onBackPanel = useCallback(
    (data: any[]) => {
      const list: DataItem = {
        id: String(existingData?.length + 1),
        name: "小蜜蜂批量新增列",
        createTime: moment().format(),
        icon: Icon_xlsx,
        description: `来自于本地`,
        type: "xlsx",
        result: data,
      };
      const flow: FlowItem = {
        id: "1",
        name: "小蜜蜂批量新增列",
        createTime: moment().format(),
        icon: Icon_bee,
      };
      setShowPanel(true);
      setDataList(list);
      setFlowList(flow);
    },
    [existingData]
  );

  const AddStep = useCallback(
    (component: any, text: string) => {
      stepList.push({
        step: stepList?.length + 1,
        component: component,
        text: text,
      });
    },
    [stepList]
  );

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background: #e7d4ff;
      `}
    >
      <div
        css={css`
          display: flex;
          height: calc(100% - 800px);
          justify-content: center;
          align-items: center;
        `}
      >
        <span
          css={css`
            font-size: 32px;
            font-weight: 500;
            color: #c798ff;
          `}
        >
          任务提示：请批量添加列表
        </span>
      </div>
      {!showPanel && !showAssistant && !showCountDown && (
        <div
          css={css`
            position: absolute;
            top: 26px;
            right: 32px;
          `}
        >
          <IconButton
            css={css`
              :hover {
                background: transparent;
              }
            `}
            onClick={onShowPanel}
          >
            <img
              src={Icon_mark}
              css={css`
                width: 60px;
                height: 75px;
              `}
            />
          </IconButton>
        </div>
      )}
      <DemonstrationTable
        mode={currentMode}
        isExecuted={isExecuted}
        handleIdentifyComponent={onIdentifyComponent}
        handleChangeTitle={onHandleChangeTitle}
        handleChangeContent={onHandleChangeContent}
        transmitBackTitle={transmitBackTitle}
        isBatchTitle={isBatchTitle}
        transmitBackContent={transmitBackContent}
        isBatchContent={isBatchContent}
        titleList={titleList}
        contentList={contentList}
        isConfirmed={isConfirmed}
        handleConfirm={handleConfirm}
        handleAddStep={AddStep}
      />
      <Panel
        open={showPanel}
        anchorEl={anchorEl}
        existingData={existingData}
        dataList={dataList}
        flowList={flowList}
        handleGainExistingData={onGainExistingData}
        handleClose={handlePanelClose}
        handleBatch={onhandleBatch}
      />
      <BatchCreateAssistant
        open={showAssistant}
        anchorEl={assistantAnchorEl}
        openCountDown={showCountDown}
        identifyComponent={identifyComponent}
        title={title}
        content={content}
        existingData={existingData}
        isExecuted={isExecuted}
        stepList={stepList}
        handleCountDown={onhandleCountDown}
        handleCurrentMode={onhandleCurrentMode}
        handleClose={handleAssistantClose}
        handleTransmitBackTitle={onTransmitBackTitle}
        handleTransmitBackContent={onTransmitBackContent}
        handleExecute={handleExecute}
        handleBackPanel={onBackPanel}
        handleConfirm={handleConfirm}
      />
    </div>
  );
}
