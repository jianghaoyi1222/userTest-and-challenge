/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, IconButton, TextField } from "@mui/material";
import Icon_assistant from "src/assets/icon_assistant.png";
import Icon_batchstart from "src/assets/icon_batchstart.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import CountDown from "./components/Countdown";
import { DataItem } from "../panel/components/DataPanel";
import Icon_xlsx from "src/assets/icon_xlsx.png";
import Icon_operation from "src/assets/icon_operation.png";
import Icon_preview from "src/assets/icon_preview.png";
import ExecuteCompleted from "./components/ExecuteCompleted";
import PreviewTable, { EnterType } from "./components/PreviewTable";
import { ListItem, StepListItem } from "../userTest";
import ExecuteProcess from "./components/ExecuteProcess";
import OperationList from "./components/OperationList";

export type CurrentModeItem = "start" | "record";

export interface StepProps {
  step?: number;
  preStep?: string;
  onClick?: () => void;
}

export interface InputTextProps {
  isImport?: boolean;
  value?: string;
  onClick?: () => void;
  onChange?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

export interface ButtonProps {
  onCancel?: () => void;
  onClick?: () => void;
}

export default function BatchCreateAssistant(props: {
  open?: boolean;
  anchorEl?: any;
  openCountDown?: boolean;
  identifyComponent?: string;
  title?: string;
  content?: string;
  existingData?: DataItem[];
  isExecuted?: boolean;
  stepList?: StepListItem[];
  backToCompletedList?: any[];
  handleClose?: () => void;
  handleCountDown?: (value: boolean) => void;
  handleCurrentMode?: (mode: CurrentModeItem) => void;
  handleTransmitBackTitle?: (
    value: any,
    isBatch?: boolean,
    valueList?: any
  ) => void;
  handleTransmitBackContent?: (
    value: any,
    isBatch?: boolean,
    valueList?: any
  ) => void;
  handleExecute?: (isExecuted: boolean) => void;
  handleBackPanel?: (data: any[]) => void;
  handleConfirm?: (isConfirm: boolean) => void;
}) {
  const {
    open,
    openCountDown,
    identifyComponent,
    title,
    content,
    existingData,
    isExecuted,
    stepList,
    handleClose,
    handleCountDown,
    handleCurrentMode,
    handleTransmitBackTitle,
    handleTransmitBackContent,
    handleExecute,
    handleBackPanel,
    handleConfirm,
    backToCompletedList,
  } = props;

  const [currentMode, setCurrentMode] = useState<CurrentModeItem>();

  const [synchronizationTitle, setSynchronizationTitle] = useState("");
  const [synchronizationContent, setSynchronizationContent] = useState("");

  const [isBatchTitleInput, setIsBatchTitleInput] = useState(false);
  const [isBatchContentInput, setIsBatchContentInput] = useState(false);

  const [batchInputTitle, setBatchInputTitle] = useState("");
  const [batchInputContent, setBatchInputContent] = useState("");

  const [divideTitle, setDivideTitle] = useState([]);
  const [divideContent, setDivideContent] = useState([]);

  const [firstBatchInputTitle, setFirstBatchInputTitle] = useState("");
  const [firstBatchInputContent, setFirstBatchInputContent] = useState("");

  const [batchTitleCompleted, setBatchTitleCompleted] = useState(false);
  const [batchContentCompleted, setBatchContentCompleted] = useState(false);

  const [isImportData, setIsImportData] = useState(false);
  const [openFile, setOpenFile] = useState<DataItem>();

  const [confirmedColumn, setConfirmedColumn] = useState<number>();
  const [readerColumnedList, setReaderColumnedList] = useState<any>([]);

  const [isConfirmedImportTitle, setIsConfirmedImportTitle] = useState(false);
  const [isConfirmedImportContent, setIsConfirmedImportContent] =
    useState(false);

  const [isView, setIsView] = useState(false);

  const [isOpenOperation, setIsOpenOperation] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const [isOpenPreviewTable, setIsOpenPreviewTable] = useState(false);
  const [enter, setEnter] = useState<EnterType>();
  const [rowlist, setRowlist] = useState<any[]>([]);

  const [delayTimes, setDelayTimes] = useState(1);

  const [isContinuous, setIsContinuous] = useState(false);

  const onBatchStart = useCallback(() => {
    handleClose?.();
    handleCountDown?.(true);
    handleCurrentMode?.("record");
  }, [handleClose]);

  const onhandleCurrentMode = useCallback((value: CurrentModeItem) => {
    setCurrentMode(value);
  }, []);

  const onTitleChange = useCallback((event?: any) => {
    setSynchronizationTitle(event.target.value);
    handleTransmitBackTitle?.(event.target.value);
  }, []);

  const onContentChange = useCallback((event?: any) => {
    setSynchronizationContent(event.target.value);
    handleTransmitBackContent?.(event.target.value);
  }, []);

  const onTransmitTitle = useCallback((value?: any) => {
    setSynchronizationTitle(value);
  }, []);

  const onTransmitContent = useCallback((value?: any) => {
    setSynchronizationContent(value);
  }, []);

  useEffect(() => {
    onTransmitTitle(title);
    onTransmitContent(content);
  }, [title, content, openFile]);

  const onBatchInputTitle = useCallback(() => {
    setIsBatchTitleInput(true);
  }, []);

  const onBatchInputContent = useCallback(() => {
    setIsBatchContentInput(true);
  }, []);

  const onMultilineTitle = useCallback((event: any) => {
    const value = event.target.value
      .split(/[(\r\n)\r\n]+/)
      .filter((item: any) => item && item.trim());
    setBatchInputTitle(event.target.value);
    setDivideTitle(value);
    setFirstBatchInputTitle(value[0]);
  }, []);

  const onMultilineContent = useCallback((event: any) => {
    const value = event.target.value
      .split(/[(\r\n)\r\n]+/)
      .filter((item: any) => item && item.trim());
    setBatchInputContent(event.target.value);
    setDivideContent(value);
    setFirstBatchInputContent(value[0]);
  }, []);

  const onConfirmBatchTitle = useCallback(() => {
    handleTransmitBackTitle?.(firstBatchInputTitle, true, divideTitle);
    setBatchTitleCompleted(true);
  }, [firstBatchInputTitle, divideTitle]);

  const onConfirmBatchContent = useCallback(() => {
    handleTransmitBackContent?.(firstBatchInputContent, true, divideContent);
    setBatchContentCompleted(true);
  }, [firstBatchInputContent, divideContent]);

  const onImportExistingData = useCallback(() => {
    setIsImportData(true);
  }, []);

  const onOpenImportFile = useCallback((openfile: DataItem) => {
    setIsOpenPreviewTable(true);
    setOpenFile(openfile);
    setRowlist(openfile?.result);
    setEnter("import");
  }, []);

  const onConfirmImport = useCallback((index: number, list: any) => {
    setConfirmedColumn(index);
    setReaderColumnedList(list.slice(1, list.length));
    setIsImportData(false);
  }, []);

  const onImportConfirmedData = useCallback(() => {
    if (identifyComponent === "input-content") {
      setBatchInputContent(readerColumnedList.join("\n"));
      setDivideContent(readerColumnedList);
      setFirstBatchInputContent(readerColumnedList[0]);
      setIsConfirmedImportContent(true);
    } else if (identifyComponent === "input-title") {
      setBatchInputTitle(readerColumnedList.join("\n"));
      setDivideTitle(readerColumnedList);
      setFirstBatchInputTitle(readerColumnedList[0]);
      setIsConfirmedImportTitle(true);
    }
    setIsImportData(false);
    setConfirmedColumn(undefined);
  }, [readerColumnedList, identifyComponent]);

  const onImplement = useCallback(() => {
    handleExecute?.(true);
    setTimeout(() => setDelayTimes(rowlist?.length), 500);
    setTimeout(() => setIsContinuous(true), 1000);
  }, [handleExecute, handleClose, delayTimes, rowlist?.length]);

  useEffect(() => {
    if (isContinuous) {
      handleClose?.();
    }
  }, [isContinuous, handleClose]);

  const onViewData = useCallback(() => {
    setIsView(true);
  }, []);

  const onOpenOperation = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpenOperation(true);
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const onOpenPreviewTable = useCallback((enterType?: EnterType) => {
    setIsOpenPreviewTable(true);
    setEnter(enterType);
  }, []);

  const onClosePreViewTable = useCallback(() => {
    setIsOpenPreviewTable(false);
  }, []);

  const list = useCallback(() => {
    const rows: any[] = [];
    backToCompletedList?.map((list: ListItem) => {
      rows.push({ 标题列表: list.title, 列表内容: list.description });
    });
    divideTitle?.map((title: any, titleIndex: number) => {
      divideContent?.map((content: any, contentIndex: number) => {
        if (titleIndex === contentIndex) {
          rows.push({ 标题列表: title, 列表内容: content });
        }
      });
    });
    setRowlist(rows);
  }, [divideTitle, divideContent]);

  useEffect(() => {
    list();
  }, [list]);

  const onConfirmedBackPanel = useCallback(() => {
    handleBackPanel?.(rowlist);
  }, [handleBackPanel, rowlist]);

  const onTitleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        setBatchInputTitle(batchInputTitle + "\n");
      }
    },
    [batchInputTitle]
  );

  const onContentKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        setBatchInputContent(batchInputContent + "\n");
      }
    },
    [batchInputContent]
  );

  // 操作步骤
  const StepContext = (props: StepProps) => {
    const { step, preStep, onClick } = props;
    return (
      <div
        css={css`
          width: 308px;
          height: ${step !== 1 ? 126 : 88}px;
          background: #2c2c2c;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          padding-right: 12px;
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
              font-size: 12px;
              color: #ffffff;
              line-height: 20px;
              text-align: right;
            `}
          >
            操作步骤：
          </span>

          <TextField
            value={step}
            css={css`
              width: 216px;
              .MuiInputBase-input {
                padding: 4px 12px !important;
                font-size: 14px;
                line-height: 20px;
                height: 28px !important;
                box-sizing: border-box;
                background: #3d3d3d;
                color: #ffffff;
                border-radius: 4px;
              }
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            margin-top: 8px;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #ffffff;
              line-height: 20px;
              text-align: right;
            `}
          >
            上一步：
          </span>
          <TextField
            value={preStep}
            css={css`
              width: 216px;
              .MuiInputBase-input {
                padding: 4px 12px !important;
                font-size: 14px;
                line-height: 20px;
                height: 28px !important;
                box-sizing: border-box;
                background: #3d3d3d;
                color: #ffffff;
                border-radius: 4px;
              }
            `}
          />
        </div>
        {step !== 1 && (
          <Button
            css={css`
              margin-top: 16px;
              font-size: 12px;
              line-height: 14px;
              text-decoration: underline;
              color: #0ef4f4;
            `}
            onClick={onClick}
          >
            查看已绑定数据
          </Button>
        )}
      </div>
    );
  };

  // 执行
  const ExecuteButton = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 16px;
        `}
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
          onClick={onClick}
        >
          执行
        </Button>
      </div>
    );
  };

  // 确认及取消
  const ConfirmAndCancel = (props: ButtonProps) => {
    const { onClick, onCancel } = props;
    return (
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 16px;
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
          onClick={onCancel}
        >
          取消
        </Button>
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
          onClick={onClick}
        >
          确定
        </Button>
      </div>
    );
  };

  // 导入数据
  const ImportData = (props: {
    data?: any[];
    onClick?: (item: DataItem) => void;
  }) => {
    const { data, onClick } = props;
    return (
      <div
        css={css`
          width: 308px;
          height: 268px;
          background: #2c2c2c;
          display: flex;
          flex-direction: column;
          padding-left: 12px;
        `}
      >
        <span
          css={css`
            margin-top: 8px;
            font-size: 16px;
            line-height: 24px;
            color: #ffffff;
          `}
        >
          选择已有数据：
        </span>
        <div
          css={css`
            width: 284px;
            height: 216px;
            overflow-y: auto;
            border-radius: 4px;
            background: #3d3d3d;
            display: flex;
            flex-direction: column;
            margin-top: 8px;
          `}
        >
          {data?.map((item, index) => (
            <div
              key={index}
              css={css`
                display: flex;
                flex-direction: row;
                margin-left: 16px;
                margin-right: 16px;
                margin: 16px 16px 0px 16px;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 8px;
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                `}
              >
                <img
                  src={item?.type === "xlsx" ? Icon_xlsx : Icon_xlsx}
                  css={css`
                    width: 20px;
                    height: 20px;
                  `}
                />
                <span
                  css={css`
                    margin-left: 8px;
                    font-size: 14px;
                    line-height: 14px;
                    color: #ffffff;
                  `}
                >
                  {item?.name}.{item?.type}
                </span>
              </div>
              <Button
                css={css`
                  font-size: 14px;
                  line-height: 14px;
                `}
                onClick={() => onClick?.(item)}
              >
                打开
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 预览数据
  const PreviewData = (props: { titles?: any[]; contents?: any[] }) => {
    const { titles, contents } = props;
    const list = useMemo(() => {
      const rowlist: any[] = [];
      if (titles && contents && titles.length > 0 && contents.length > 0) {
        titles?.map((title: any, titleIndex: number) => {
          contents?.map((content: any, contentIndex: number) => {
            if (titleIndex === contentIndex) {
              rowlist.push({
                标题列表: title,
                列表内容: content,
              });
            }
          });
        });
      } else if (titles && titles.length > 0) {
        titles?.map((title: any) => {
          rowlist.push({
            标题列表: title,
          });
        });
      } else if (contents && contents.length > 0) {
        contents?.map((content: any) => {
          rowlist.push({
            列表内容: content,
          });
        });
      }
      return rowlist;
    }, [titles, contents]);

    const steps = useMemo(() => {
      return stepList?.filter((item: StepListItem) =>
        item.component.includes("input")
      );
    }, [stepList]);

    const length = useMemo(() => {
      return steps ? (510 - 30) / steps?.length : 480;
    }, [steps]);

    return (
      <div
        css={css`
          width: 568px;
          height: 400px;
          background: #2c2c2c;
          display: flex;
          flex-direction: column;
          padding-left: 16px;
          padding-right: 16px;
        `}
      >
        <span
          css={css`
            font-size: 14px;
            line-height: 14px;
            color: #ffffff;
            margin-top: 19px;
          `}
        >
          数据预览
        </span>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 510px;
            max-height: 332px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-grow: 1;
              flex-direction: row;
              margin-top: 16px;
              max-height: 32px;
            `}
          >
            {steps?.map((step: StepListItem, index: number) => (
              <div
                key={index}
                css={css`
                  display: flex;
                  align-items: center;
                  flex-grow: 1;
                  box-sizing: border-box;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  height: 32px;
                  padding-left: 12px;
                  width: ${index === 0 ? length + 30 : length}px;
                `}
              >
                <span
                  css={css`
                    font-size: 12px;
                    line-height: 12px;
                    color: #ffffff;
                  `}
                >
                  操作步骤：第{step?.step}步
                </span>
              </div>
            ))}
          </div>

          <div
            css={css`
              display: flex;
              flex-direction: column;
              overflow-y: auto;
              width: 550px;
            `}
          >
            {list.map((item: any, index: number) => (
              <div
                key={index}
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  flex-grow: 1;
                `}
              >
                <div
                  css={css`
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                  `}
                >
                  <span
                    css={css`
                      font-size: 12px;
                      font-weight: 250;
                      line-height: 12px;
                      text-align: center;
                      color: #ffffff;
                    `}
                  >
                    {index + 1}
                  </span>
                </div>
                {item?.["标题列表"] && (
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      flex-grow: 1;
                      width: ${length}px;
                      height: 30px;
                      box-sizing: border-box;
                      border: 1px solid rgba(255, 255, 255, 0.1);
                    `}
                  >
                    <span
                      css={css`
                        font-size: 12px;
                        font-weight: 250;
                        line-height: 12px;
                        color: #ffffff;
                        margin-left: 12px;
                      `}
                    >
                      {item?.["标题列表"]}
                    </span>
                  </div>
                )}
                {item?.["列表内容"] && (
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      flex-grow: 1;
                      width: ${length}px;
                      height: 30px;
                      box-sizing: border-box;
                      border: 1px solid rgba(255, 255, 255, 0.1);
                    `}
                  >
                    <span
                      css={css`
                        font-size: 12px;
                        font-weight: 250;
                        line-height: 12px;
                        color: #ffffff;
                        margin-left: 12px;
                      `}
                    >
                      {item?.["列表内容"]}
                    </span>
                  </div>
                )}
                <div
                  css={css`
                    width: 23px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <img
                    src={Icon_preview}
                    css={css`
                      width: 16px;
                      height: 16px;
                    `}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 操作列
  // const OperationList = (props: { open: boolean; onExist?: () => void }) => {
  //   const { open } = props;
  //   return (
  //     <Popover
  //       open={open}
  //       onClose={() => {
  //         setAnchorEl(null);
  //         setIsOpenOperation(false);
  //       }}
  //       anchorEl={anchorEl}
  //       anchorOrigin={{
  //         vertical: "bottom",
  //         horizontal: "right",
  //       }}
  //       transformOrigin={{
  //         vertical: "top",
  //         horizontal: "right",
  //       }}
  //       css={css`
  //         z-index: 50;
  //         .MuiPaper-root {
  //           background-color: #151515;
  //           width: 108px;
  //           height: 72px;
  //           border-radius: 2px;
  //           box-sizing: border-box;
  //           border: 1px solid rgba(255, 255, 255, 0.16);
  //           box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  //         }
  //       `}
  //     >
  //       <div
  //         css={css`
  //           display: flex;
  //           flex-direction: column;
  //           align-items: center;
  //           justify-content: center;
  //           height: 100%;
  //           margin-left: 8px;
  //         `}
  //       >
  //         <div
  //           css={css`
  //             display: flex;
  //             flex-direction: column;
  //           `}
  //         >
  //           <div
  //             css={css`
  //               display: flex;
  //               flex-direction: row;
  //             `}
  //           >
  //             <span
  //               css={css`
  //                 font-size: 14px;
  //                 line-height: 20px;
  //                 color: #ffffff;
  //               `}
  //             >
  //               数据面板
  //             </span>
  //             <Switch
  //               size="small"
  //               css={css`
  //                 .MuiSwitch-switchBase {
  //                   padding: 6px;
  //                 }
  //                 .MuiSwitch-thumb {
  //                   width: 12px;
  //                   height: 12px;
  //                 }
  //                 .MuiSwitch-track {
  //                   background-color: #383838;
  //                 }
  //               `}
  //             />
  //           </div>
  //           <Button
  //             css={css`
  //               font-size: 14px;
  //               line-height: 20px;
  //               color: #fa5151;
  //               justify-content: start;
  //               padding: 0px;
  //             `}
  //           >
  //             退出流程
  //           </Button>
  //         </div>
  //       </div>
  //     </Popover>
  //   );
  // };

  return (
    <div
      css={css`
        z-index: 50;
      `}
    >
      {isExecuted && isContinuous ? (
        <ExecuteCompleted
          name={"小蜜蜂批量新增列"}
          step={4}
          rowlist={rowlist}
          onhandleExecute={handleExecute}
          onOpenPreviewTable={onOpenPreviewTable}
          onConfirmedBackPanel={onConfirmedBackPanel}
          onClose={handleClose}
          handleConfirm={handleConfirm}
        />
      ) : (
        <div
          css={css`
            display: ${open ? "block" : "none"};
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
                width: ${isView ? 600 : 340}px;
                border-radius: 4px;
                background: #151515;
                box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
              `,
              currentMode === "record"
                ? isExecuted
                  ? css`
                      height: 258px;
                    `
                  : isView
                  ? css`
                      height: 532px;
                    `
                  : identifyComponent === "button-confirm"
                  ? css`
                      height: 258px;
                    `
                  : identifyComponent === "input-title"
                  ? isBatchTitleInput
                    ? batchTitleCompleted
                      ? css`
                          height: 258px;
                        `
                      : isConfirmedImportTitle
                      ? css`
                          height: 400px;
                        `
                      : css`
                          height: 400px;
                        `
                    : css`
                        height: 294px;
                      `
                  : identifyComponent === "input-content"
                  ? isBatchContentInput
                    ? batchContentCompleted
                      ? css`
                          height: 258px;
                        `
                      : isConfirmedImportContent
                      ? css`
                          height: 400px;
                        `
                      : css`
                          height: 400px;
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
              {isExecuted ? (
                <ExecuteProcess
                  allNumber={rowlist?.length}
                  completedNumber={delayTimes}
                />
              ) : isView ? (
                <PreviewData titles={divideTitle} contents={divideContent} />
              ) : identifyComponent === "button-add" ? (
                <StepContext
                  step={
                    stepList?.filter(
                      (item: StepListItem) => item.component === "button-add"
                    )[0]?.step
                  }
                  preStep={
                    stepList?.filter(
                      (item: StepListItem) => item.component === "button-add"
                    )[0]?.text
                  }
                />
              ) : identifyComponent === "input-title" ? (
                isBatchTitleInput ? (
                  batchTitleCompleted ? (
                    <StepContext
                      step={
                        stepList?.filter(
                          (item: StepListItem) =>
                            item.component === "input-title"
                        )[0]?.step
                      }
                      preStep={
                        stepList?.filter(
                          (item: StepListItem) =>
                            item.component === "input-title"
                        )[0]?.text
                      }
                      onClick={onViewData}
                    />
                  ) : isImportData ? (
                    <ImportData
                      data={existingData}
                      onClick={onOpenImportFile}
                    />
                  ) : isConfirmedImportTitle ? (
                    <div
                      css={css`
                        width: 308px;
                        height: 268px;
                        background: #2c2c2c;
                        display: flex;
                        flex-direction: column;
                        padding-left: 12px;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          justify-content: space-between;
                          align-items: center;
                          margin-top: 8px;
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
                          onClick={onImportExistingData}
                        >
                          {isConfirmedImportTitle ? "重新导入" : "导入已有数据"}
                        </Button>
                      </div>

                      <TextField
                        variant="outlined"
                        multiline
                        rows={9}
                        value={batchInputTitle}
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
                        onChange={onMultilineTitle}
                        onKeyDown={onTitleKeyDown}
                      />
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
                  ) : (
                    <div
                      css={css`
                        width: 308px;
                        height: 268px;
                        background: #2c2c2c;
                        display: flex;
                        flex-direction: column;
                        padding-left: 12px;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          justify-content: space-between;
                          align-items: center;
                          margin-top: 8px;
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
                          onClick={onImportExistingData}
                        >
                          {isConfirmedImportTitle ? "重新导入" : "导入已有数据"}
                        </Button>
                      </div>

                      <TextField
                        variant="outlined"
                        multiline
                        rows={9}
                        value={batchInputTitle}
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
                        onChange={onMultilineTitle}
                        onKeyDown={onTitleKeyDown}
                      />
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
                  )
                ) : (
                  <div
                    css={css`
                      width: 308px;
                      height: 162px;
                      background: #2c2c2c;
                      display: flex;
                      flex-direction: column;
                      padding-left: 12px;
                    `}
                  >
                    <span
                      css={css`
                        font-size: 16px;
                        line-height: 24px;
                        color: #ffffff;
                        margin-top: 8px;
                      `}
                    >
                      已选择输入文本框
                    </span>
                    <TextField
                      value={synchronizationTitle}
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
                      onChange={onTitleChange}
                    />
                    <div
                      css={css`
                        display: flex;
                        justify-content: flex-end;
                      `}
                    >
                      <Button
                        onClick={onBatchInputTitle}
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
                    </div>
                  </div>
                )
              ) : identifyComponent === "input-content" ? (
                isBatchContentInput ? (
                  batchContentCompleted ? (
                    <StepContext
                      step={
                        stepList?.filter(
                          (item: StepListItem) =>
                            item.component === "input-content"
                        )[0]?.step
                      }
                      preStep={
                        stepList?.filter(
                          (item: StepListItem) =>
                            item.component === "input-content"
                        )[0]?.text
                      }
                      onClick={onViewData}
                    />
                  ) : isImportData ? (
                    <ImportData
                      data={existingData}
                      onClick={onOpenImportFile}
                    />
                  ) : isConfirmedImportContent ? (
                    <div
                      css={css`
                        width: 308px;
                        height: 268px;
                        background: #2c2c2c;
                        display: flex;
                        flex-direction: column;
                        padding-left: 12px;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          justify-content: space-between;
                          align-items: center;
                          margin-top: 8px;
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
                          onClick={onImportExistingData}
                        >
                          {isConfirmedImportContent
                            ? "重新导入"
                            : "导入已有数据"}
                        </Button>
                      </div>

                      <TextField
                        variant="outlined"
                        multiline
                        rows={9}
                        value={batchInputContent}
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
                        onChange={onMultilineContent}
                        onKeyDown={onContentKeyDown}
                      />
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
                  ) : (
                    <div
                      css={css`
                        width: 308px;
                        height: 268px;
                        background: #2c2c2c;
                        display: flex;
                        flex-direction: column;
                        padding-left: 12px;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          justify-content: space-between;
                          align-items: center;
                          margin-top: 8px;
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
                          onClick={onImportExistingData}
                        >
                          {isConfirmedImportContent
                            ? "重新导入"
                            : "导入已有数据"}
                        </Button>
                      </div>

                      <TextField
                        variant="outlined"
                        multiline
                        rows={9}
                        value={batchInputContent}
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
                        onChange={onMultilineContent}
                        onKeyDown={onContentKeyDown}
                      />
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
                  )
                ) : (
                  <div
                    css={css`
                      width: 308px;
                      height: 162px;
                      background: #2c2c2c;
                      display: flex;
                      flex-direction: column;
                      padding-left: 12px;
                    `}
                  >
                    <span
                      css={css`
                        font-size: 16px;
                        line-height: 24px;
                        color: #ffffff;
                        margin-top: 8px;
                      `}
                    >
                      已选择输入文本框
                    </span>
                    <TextField
                      value={synchronizationContent}
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
                      onChange={onContentChange}
                    />
                    <div
                      css={css`
                        display: flex;
                        justify-content: flex-end;
                      `}
                    >
                      <Button
                        onClick={onBatchInputContent}
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
                    </div>
                  </div>
                )
              ) : identifyComponent === "button-confirm" ? (
                <StepContext
                  step={
                    stepList?.filter(
                      (item: StepListItem) =>
                        item.component === "button-confirm"
                    )[0]?.step
                  }
                  preStep={
                    stepList?.filter(
                      (item: StepListItem) =>
                        item.component === "button-confirm"
                    )[0]?.text
                  }
                  onClick={onViewData}
                />
              ) : (
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
                  {currentMode === "record" ? (
                    <span
                      css={css`
                        color: #ffffff;
                        font-size: 16px;
                        line-height: 24px;
                      `}
                    >
                      已进入记录模式，您可以开始操作
                    </span>
                  ) : (
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
                      onClick={onBatchStart}
                    >
                      点我开始
                    </Button>
                  )}
                </div>
              )}
            </div>

            {currentMode === "record" &&
              !isExecuted &&
              (isView ? (
                <ConfirmAndCancel
                  onCancel={() => setIsView(false)}
                  onClick={() => setIsView(false)}
                />
              ) : identifyComponent === "input-title" && isBatchTitleInput ? (
                batchTitleCompleted ? (
                  <ExecuteButton onClick={onImplement} />
                ) : (
                  <ConfirmAndCancel
                    onClick={onConfirmBatchTitle}
                    onCancel={() => {
                      setIsBatchTitleInput(false);
                      setIsImportData(false);
                    }}
                  />
                )
              ) : identifyComponent === "input-content" &&
                isBatchContentInput ? (
                batchContentCompleted ? (
                  <ExecuteButton onClick={onImplement} />
                ) : (
                  <ConfirmAndCancel
                    onClick={onConfirmBatchContent}
                    onCancel={() => {
                      setIsBatchContentInput(false);
                      setIsImportData(false);
                    }}
                  />
                )
              ) : (
                <ExecuteButton onClick={onImplement} />
              ))}
          </div>
        </div>
      )}

      <CountDown
        open={openCountDown}
        handleClose={handleCountDown}
        handleCurrentMode={onhandleCurrentMode}
      />
      <OperationList
        open={isOpenOperation}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setIsOpenOperation(false);
        }}
      />
      {isOpenPreviewTable && (
        <PreviewTable
          open={isOpenPreviewTable}
          file={rowlist}
          name="小蜜蜂批量新增列"
          confirmedColumn={confirmedColumn}
          enter={enter}
          onConfirmImport={onConfirmImport}
          onClose={onClosePreViewTable}
          onImportConfirmedData={onImportConfirmedData}
        />
      )}
    </div>
  );
}
