/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import {
  Button,
  Chip,
  Dialog,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Icon_setpattern from "src/assets/icon_setpattern.png";
import Icon_colation from "src/assets/icon_colation.png";
import Icon_sort from "src/assets/icon_sort.png";
import Icon_replace from "src/assets/icon_replace.png";
import Icon_duplicate from "src/assets/icon_duplicate.png";
import Icon_calculation from "src/assets/icon_calculation.png";
import Icon_quote from "src/assets/icon_quote.png";
import Icon_consolidatedtable from "src/assets/icon_consolidatedtable.png";
import Icon_mergecolumns from "src/assets/icon_mergecolumns.png";
import Icon_deleterows from "src/assets/icon_deleterows.png";
import Icon_idcard from "src/assets/icon_idcard.png";
import Icon_moreoperation from "src/assets/icon_moreoperation.png";
import Icon_transcription from "src/assets/icon_transcription.png";
import Icon_reset from "src/assets/icon_reset.png";
import Icon_download from "src/assets/icon_download.png";
import Icon_addcolumns from "src/assets/icon_addcolumns.png";
import Icon_more from "src/assets/icon_more.png";
import { useCallback, MouseEvent, useState } from "react";
import { dataConversionUtil } from "src/utils/excel";
import { StyledTooltip } from "src/pages/dataCollection";

export type EnterType = "import" | "preview";

export default function PreviewTable(props: {
  open?: boolean;
  file?: any[];
  confirmedColumn?: number;
  enter?: EnterType;
  chip?: string;

  type?: string;
  name?: string;
  currentStep?: number;
  tip?: string;

  onClose?: () => void;
  onConfirmImport?: (index: number, list: any) => void;
  onImportConfirmedData?: () => void;

  handleToNextStepTip?: () => void;
}) {
  const {
    open,
    file,
    confirmedColumn,
    chip = "text",
    enter = "import",

    type,
    name,
    currentStep,
    tip,

    onConfirmImport,
    onClose,
    onImportConfirmedData,

    handleToNextStepTip,
  } = props;

  const [transcriptionOpen, setTranscriptionOpen] = useState(false);

  const head = file?.[0] && Object.keys(file?.[0]);
  // const length = 968 / head?.length;

  const values = [];

  for (let t = 0; t < head?.length; t++) {
    for (let i = 0; i < Number(file?.length); i++) {
      values.push(Object.values(file?.[i])[t]);
    }
  }

  let start = 0;
  let end = file?.length as number;
  const list: any = [];
  const row = Math.ceil(values.length / end);

  for (let i = 0; i < row; i++) {
    const rowList = values.slice(start, end);
    list.push([head[i]].concat(rowList));
    start = start + Number(file?.length);
    end = end + Number(file?.length);
  }

  const onLoadExcel = useCallback(() => {
    const tableHeader = head;
    const dataList: any[] = [];
    file?.map((item: any) => {
      dataList.push(Object.values(item));
    });
    console.log("dataList", dataList);
    dataConversionUtil["dataToExcel"](name, tableHeader, dataList);
  }, [name, dataConversionUtil, file]);

  const onTranscription = useCallback(() => {
    if (currentStep === 2) {
      handleToNextStepTip?.();
      setTranscriptionOpen(true);
    }
  }, [currentStep, handleToNextStepTip]);

  const OperationList = () => {
    return (
      <div
        css={css`
          width: 100%;
          height: 64px;
          background: #f5f6f7;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        `}
      >
        <IconButton>
          <img src={Icon_setpattern} />
        </IconButton>
        <IconButton>
          <img src={Icon_colation} />
        </IconButton>
        <IconButton>
          <img src={Icon_sort} />
        </IconButton>
        <IconButton>
          <img src={Icon_replace} />
        </IconButton>
        <IconButton>
          <img src={Icon_duplicate} />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton>
          <img src={Icon_calculation} />
        </IconButton>
        <IconButton>
          <img src={Icon_quote} />
        </IconButton>
        <IconButton>
          <img src={Icon_consolidatedtable} />
        </IconButton>
        <IconButton>
          <img src={Icon_mergecolumns} />
        </IconButton>
        <IconButton>
          <img src={Icon_deleterows} />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton>
          <img src={Icon_idcard} />
        </IconButton>
        <IconButton>
          <img src={Icon_moreoperation} />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton onClick={onTranscription}>
          <img src={Icon_transcription} />
        </IconButton>
        <IconButton>
          <img src={Icon_moreoperation} />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton>
          <img src={Icon_reset} />
        </IconButton>
        <IconButton>
          <img src={Icon_download} />
        </IconButton>
      </div>
    );
  };

  const handleClose = useCallback(() => {}, []);

  return (
    <Dialog
      open={open ?? false}
      css={[
        css`
          display: flex;
          flex-direction: column;
          z-index: 50;
          .MuiBackdrop-root {
            background-color: transparent;
          }
          .MuiPaper-root {
            width: 1000px;
            max-width: 1000px;
            height: 612px;
            border-radius: 8px 8px 0px 0px;
          }
        `,
        type === "dataProcess" &&
          css`
            .MuiDialog-container {
              width: 1400px;
              height: 800px;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `,
      ]}
    >
      <div
        css={css`
          width: 100%;
          height: 40px;
          background: #151515;
          border-radius: 8px 8px 0px 0px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <span
          css={css`
            font-size: 14px;
            line-height: 16px;
            color: #ffffff;
            margin-left: 16px;
          `}
        >
          {name}
        </span>
        <IconButton onClick={onClose}>
          <CloseIcon
            css={css`
              color: #ffffff;
            `}
          />
        </IconButton>
      </div>
      {currentStep === 2 ? (
        <StyledTooltip open={true} arrow placement="top" title={tip}>
          <div
            css={css`
              width: 100%;
            `}
          >
            <OperationList />
          </div>
        </StyledTooltip>
      ) : (
        <div
          css={css`
            width: 100%;
          `}
        >
          <OperationList />
        </div>
      )}

      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow-y: overlay;
          margin-top: 12px;
        `}
      >
        <div
          css={css`
            width: 968px;
            height: 440px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              flex-grow: 1;
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
                  width: 56px;
                  border: 1px solid #f0f0f0;
                  box-sizing: border-box;
                `}
              >
                <div
                  css={css`
                    width: 56px;
                    height: 40px;
                    border: 1px solid #f0f0f0;
                    box-sizing: border-box;
                  `}
                />
                {file?.map((_openfile: any, index: number) => (
                  <div
                    css={css`
                      height: 40px;
                      border-bottom: 1px solid #f0f0f0;
                      box-sizing: border-box;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    `}
                  >
                    <span
                      css={css`
                        font-size: 14px;
                        line-height: 20px;
                        color: rgba(0, 0, 0, 0.6);
                      `}
                    >
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {list?.map((result: any, resultIndex: number) => {
              return (
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    flex-grow: 1;
                    border: ${resultIndex === confirmedColumn
                      ? "1px solid #FFC300"
                      : "1px solid #f0f0f0"};
                    background: ${resultIndex === confirmedColumn &&
                    "rgba(255, 195, 0, 0.1)"};
                  `}
                  onClick={() => {
                    if (enter === "import") {
                      onConfirmImport?.(resultIndex, list[resultIndex]);
                    }
                  }}
                >
                  {result?.map((resultItem: any, index: number) =>
                    index === 0 ? (
                      <div
                        css={css`
                          height: 40px;
                          display: flex;
                          flex-direction: row;
                          align-items: center;
                          justify-content: space-between;
                          flex-grow: 1;
                          border-bottom: 1px solid #f0f0f0;
                          box-sizing: border-box;
                        `}
                      >
                        <div
                          css={css`
                            padding-top: 10px;
                            padding-left: 12px;
                            padding-bottom: 10px;
                            flex-grow: 1;
                            display: flex;
                            align-items: center;
                          `}
                        >
                          <span
                            css={css`
                              font-size: 14px;
                              font-weight: bold;
                              line-height: 20px;
                              ::before {
                                content: "";
                                display: inline-block;
                                height: 12px;
                                border: 3px solid #ffcc00;
                                box-sizing: border-box;
                                border-radius: 5px;
                                margin-right: 8px;
                              }
                            `}
                          >
                            {resultItem}
                          </span>
                          <Chip
                            label={chip === "text" && "文本"}
                            variant="outlined"
                            css={css`
                              width: 36px;
                              height: 20px;
                              border-radius: 4px;
                              background: #d6e2ff;
                              margin-left: 8px;
                              .MuiChip-label {
                                font-size: 10px;
                                font-weight: 500;
                                line-height: 12px;
                                color: #3662ec;
                                padding: 0px;
                              }
                            `}
                          />
                        </div>
                        <IconButton>
                          <img src={Icon_more} />
                        </IconButton>
                      </div>
                    ) : (
                      <div
                        css={css`
                          height: 40px;
                          padding-top: 9px;
                          padding-left: 12px;
                          padding-bottom: 9px;
                          font-size: 12px;
                          line-height: 12px;
                          flex-grow: 1;
                          border-bottom: 1px solid #f0f0f0;
                          box-sizing: border-box;
                          display: flex;
                          align-items: center;
                          padding-left: 26px;
                        `}
                      >
                        <span
                          css={css`
                            font-size: 14px;
                            line-height: 20px;
                            color: rgba(0, 0, 0, 0.6);
                          `}
                        >
                          {resultItem}
                        </span>
                      </div>
                    )
                  )}
                </div>
              );
            })}
            <div
              css={css`
                width: 56px;
                border: 1px solid #f0f0f0;
                box-sizing: border-box;
              `}
            >
              <div
                css={css`
                  width: 56px;
                  height: 40px;
                  border-bottom: 1px solid #f0f0f0;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <IconButton>
                  <img src={Icon_addcolumns} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        css={css`
          margin-top: 8px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: ${enter === "preview"
            ? "space-between"
            : "flex-end"};
        `}
      >
        {enter === "preview" && (
          <div
            css={css`
              margin-left: 20px;
              font-size: 14px;
              line-height: 24px;
              color: #303030;
            `}
          >
            <span>
              共{list?.length}列，<span>{file?.length}</span>行
            </span>
          </div>
        )}
        <div
          css={css`
            margin-right: 16px;
          `}
        >
          <Button
            variant="contained"
            css={css`
              width: 60px;
              height: 32px;
              border-radius: 4px;
              font-size: 14px;
              line-height: 20px;
              color: #151515;
              background: #ffffff;
              :hover {
                background: #ffffff;
              }
            `}
            onClick={() => onClose?.()}
          >
            取消
          </Button>
          <Button
            variant="contained"
            disabled={
              enter === "import"
                ? confirmedColumn !== undefined
                  ? false
                  : true
                : false
            }
            css={css`
              width: 60px;
              height: 32px;
              border-radius: 4px;
              background-color: #ffcc00 !important;
              font-size: 14px;
              line-height: 20px;
              color: #151515;
              margin-left: 16px;
              :hover {
                background: #ffcc00;
              }
            `}
            onClick={() => {
              if (enter === "import") {
                onImportConfirmedData?.();
                onClose?.();
              }
              if (enter === "preview") {
                onLoadExcel();
              }
            }}
          >
            {enter === "import" ? "导入" : "下载"}
          </Button>
        </div>
      </div>

      <div
        css={css`
          display: ${transcriptionOpen ? "flex" : "none"};
        `}
      >
        <Typography>The content of the Popover.</Typography>
      </div>
    </Dialog>
  );
}
