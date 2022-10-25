/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, Chip, Dialog, Divider, IconButton } from "@mui/material";
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
// import { ArrowBackIos } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { dataConversionUtil } from "src/utils/excel";
import { StepTipItem, StyledTooltip } from "src/pages/dataCollection";
import FormDataPopover from "src/pages/dataProcess/FormDataPopover";
import { pinyin } from "pinyin-pro";
import StyledAnimation from "src/components/StyledAnimation";

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
  stepTips?: StepTipItem[];

  onClose?: () => void;
  onConfirmImport?: (index: number, list: any) => void;
  onImportConfirmedData?: () => void;

  handleToNextStepTip?: () => void;
  handleToPreStepTip?: (value: number) => void;
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
    stepTips,

    onConfirmImport,
    onClose,
    onImportConfirmedData,

    handleToNextStepTip,
    handleToPreStepTip,
  } = props;

  const [openPopover, setOpenPopover] = useState(false);
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
  const [confirmedColumnIndex, setConfirmedColumnIndex] = useState<number>();
  const [feature, setFeature] = useState<string | undefined>();

  const [rows, setRows] = useState<any[]>([]);
  const [originalRows, setOriginalRows] = useState<any[]>([]);
  const [headlist, setHeadList] = useState<any[]>([]);

  const [styled, setStyled] = useState<{
    right: string;
    bottom: string;
  }>({ right: "150px", bottom: "310px" });
  const [functionType, setFunctionType] = useState<string>("pinyin");

  const [checked, setChecked] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const [length, setLength] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (type === "batchSearch" && file) {
      const list = Object.keys(file[0]);
      setLength(856 / list.length);
    }
  }, [file, type]);

  useEffect(() => {
    let timer: any = null;
    if (currentStep === 4) {
      timer = setTimeout(() => handleToNextStepTip?.(), 800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, handleToNextStepTip]);

  useEffect(() => {
    setConfirmedColumnIndex(confirmedColumn);
  }, [confirmedColumn]);

  useEffect(() => {
    const head = file?.[0] && Object.keys(file?.[0]);
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
    setHeadList(head);
    setRows(list);
    setOriginalRows(list);
  }, [file]);

  const onLoadExcel = useCallback(() => {
    const tableHeader = headlist;
    const dataList: any[] = [];
    rows?.map((row: any) => {
      console.log("rows", rows, file);
      const title = row.slice(0, 1);
      row
        .slice(1, row.length)
        .map((item: any) => dataList.push({ [title]: item }));
    });

    const length = file?.length as number;

    const data: any[] = [];

    for (let i = 0; i < length; i++) {
      for (let t = i; t < dataList.length; t = t + length) {
        data.push(dataList[t]);
      }
    }
    let start = 0;
    let end = rows.length as number;
    const list = [];
    const row = Math.ceil(data.length / rows.length) as number;
    for (let i = 0; i < row; i++) {
      const rowList = data.slice(start, end);
      const source = {};
      rowList.map((row: any) => {
        Object.assign(source, row);
      });
      list.push(source);
      start = start + rows.length;
      end = end + rows.length;
    }
    const dataSource: any[] = [];
    list.map((item: any) => {
      dataSource.push(Object.values(item));
    });
    dataConversionUtil["dataToExcel"](name, tableHeader, dataSource);
  }, [name, dataConversionUtil, rows, headlist]);

  const onTranscription = useCallback(() => {
    if (currentStep === 1) {
      setOpenPopover(true);
      handleToNextStepTip?.();
    }
  }, [currentStep, handleToNextStepTip]);

  // const handleClose = useCallback(() => {}, []);

  const handleChangeColumns = useCallback(
    (value?: string) => {
      setSelectValue(value);
      rows.map((item: any, index: number) => {
        if (item[0] === value) {
          setConfirmedColumnIndex(index);
        }
      });
    },
    [rows]
  );

  const handleChangeFunction = useCallback(
    (value: string) => {
      setFeature(value);
      const length = file && file.length + 1;
      const list: any[] = [];
      const pinyinList: any[] = [];
      const ageList: any[] = [];
      if (value === "拼音") {
        rows.map((selected: any) => {
          if (selected[0] === selectValue) {
            selected.slice(1, length).map((item: any) => {
              pinyinList.push(pinyin(item, { toneType: "none" }));
            });
            list.push([selected[0]].concat(pinyinList));
          } else {
            list.push(selected);
          }
        });
      }
      if (value === "提取年龄") {
        rows.map((selected: any) => {
          if (selected[0] === selectValue) {
            selected.slice(1, length).map((item: any) => {
              const yearBirth = item.substring(6, 10);
              const monthBirth = item.substring(10, 12);
              const dayBirth = item.substring(12, 14);
              const myDate = new Date();
              const monthNow = myDate.getMonth() + 1;
              const dayNow = myDate.getDate();
              let age = myDate.getFullYear() - yearBirth;
              if (
                monthNow < monthBirth ||
                (monthNow == monthBirth && dayNow < dayBirth)
              ) {
                age--;
              }
              ageList.push(age);
            });
            list.push(["年龄"].concat(ageList));
            headlist.splice(3, 0, "年龄");
          } else {
            list.push(selected);
          }
        });
      }

      setRows(list);
      handleToNextStepTip?.();
    },
    [rows, selectValue, file, handleToNextStepTip]
  );

  const onPopoverCancel = useCallback(() => {
    setRows(originalRows);
    functionType === "pinyin" && handleToPreStepTip?.(2);
    functionType === "cardID" && handleToPreStepTip?.(7);
    setSelectValue(undefined);
    setFeature(undefined);
    setConfirmedColumnIndex(undefined);
  }, [originalRows, handleToPreStepTip, currentStep]);

  const onPopoverConfirm = useCallback(() => {
    setOpenPopover(false);
    setIsFocused(false);
    if (currentStep !== 10 && currentStep !== 11) {
      setConfirmedColumnIndex(undefined);
    }
    setSelectValue(undefined);
    setFeature(undefined);
  }, [currentStep, confirmedColumnIndex]);

  const onShowPopover = useCallback(() => {
    setOpenPopover(true);
    setStyled({ right: "280px", bottom: "310px" });
    handleToNextStepTip?.();
    setFunctionType("cardID");
  }, [handleToNextStepTip]);

  const onChecked = useCallback(() => {
    setChecked(!checked);
    handleToNextStepTip?.();
    if (currentStep === 9) {
      confirmedColumnIndex && setConfirmedColumnIndex(confirmedColumnIndex + 1);
    }
  }, [handleToNextStepTip, checked, confirmedColumnIndex]);

  const handleFocus = useCallback(() => {
    setIsFocused(!isFocused);
  }, [isFocused]);

  useEffect(() => {
    const length = file && file.length + 1;
    if (checked && confirmedColumnIndex) {
      const rowlist = originalRows[confirmedColumnIndex - 1];
      const list = rows.slice(0, confirmedColumnIndex - 1).concat([rowlist]);
      const rearlist = rows.slice(confirmedColumnIndex - 1, length);
      const row = list.concat(rearlist);
      setRows(row);
    }
  }, [checked, originalRows, file]);

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
      `}
    >
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
          (type === "dataProcess" || type === "batchSearch") &&
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
          {/* <IconButton>
              <ArrowBackIos
                css={css`
                  color: #ffffff;
                  font-size: 1rem;
                `}
              />
            </IconButton> */}
          <span
            css={css`
              font-size: 14px;
              line-height: 16px;
              color: #ffffff;
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
        {currentStep === 1 ? (
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
          </StyledTooltip>
        ) : (
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
            {currentStep === 6 ? (
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
                <IconButton onClick={onShowPopover}>
                  <img src={Icon_idcard} />
                </IconButton>
              </StyledTooltip>
            ) : (
              <IconButton>
                <img src={Icon_idcard} />
              </IconButton>
            )}
            <IconButton>
              <img src={Icon_moreoperation} />
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem />
            <IconButton
            // onClick={onTranscription}
            >
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
                      key={index}
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
              {currentStep === 4 ? (
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
                      width: 100%;
                      display: flex;
                    `}
                  >
                    {rows?.map((result: any, resultIndex: number) => {
                      return (
                        <div
                          key={resultIndex}
                          css={css`
                            display: flex;
                            flex-direction: column;
                            box-sizing: border-box;
                            flex-grow: 1;
                            border: ${resultIndex === confirmedColumnIndex
                              ? "1px solid #FFC300"
                              : "1px solid #f0f0f0"};
                            background: ${resultIndex ===
                              confirmedColumnIndex && "rgba(255, 195, 0, 0.1)"};
                          `}
                          onClick={() => {
                            if (enter === "import") {
                              onConfirmImport?.(resultIndex, rows[resultIndex]);
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
                  </div>
                </StyledTooltip>
              ) : currentStep === 11 ? (
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
                      width: 100%;
                      display: flex;
                    `}
                  >
                    {rows?.map((result: any, resultIndex: number) => {
                      return (
                        <div
                          css={css`
                            display: flex;
                            flex-direction: column;
                            box-sizing: border-box;
                            flex-grow: 1;
                            border: ${resultIndex === confirmedColumnIndex
                              ? "1px solid #FFC300"
                              : "1px solid #f0f0f0"};
                            background: ${resultIndex ===
                              confirmedColumnIndex && "rgba(255, 195, 0, 0.1)"};
                          `}
                          onClick={() => {
                            if (enter === "import") {
                              onConfirmImport?.(resultIndex, rows[resultIndex]);
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
                                      overflow: hidden;
                                      text-overflow: ellipsis;
                                      white-space: nowrap;
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
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
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
                  </div>
                </StyledTooltip>
              ) : (
                <div
                  css={css`
                    width: 100%;
                    display: flex;
                  `}
                >
                  {rows?.map((result: any, resultIndex: number) => {
                    return (
                      <div
                        key={resultIndex}
                        css={css`
                          display: flex;
                          flex-direction: column;
                          box-sizing: border-box;
                          flex-grow: 1;
                          border: ${resultIndex === confirmedColumnIndex
                            ? "1px solid #FFC300"
                            : "1px solid #f0f0f0"};
                          background: ${resultIndex === confirmedColumnIndex &&
                          "rgba(255, 195, 0, 0.1)"};
                        `}
                        onClick={() => {
                          if (enter === "import") {
                            onConfirmImport?.(resultIndex, rows[resultIndex]);
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
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
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
                              css={[
                                css`
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
                                `,
                                length &&
                                  css`
                                    width: ${length}px;
                                  `,
                              ]}
                            >
                              <div
                                css={[
                                  css`
                                    font-size: 14px;
                                    line-height: 20px;
                                    color: rgba(0, 0, 0, 0.6);
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                  `,
                                  length &&
                                    css`
                                      width: ${length}px;
                                    `,
                                ]}
                              >
                                {resultItem}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

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
                共{rows?.length}列，<span>{file?.length}</span>行
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
                  ? confirmedColumnIndex !== undefined
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
      </Dialog>

      {openPopover && (
        <FormDataPopover
          value={selectValue}
          featureValue={feature}
          currentStep={currentStep}
          stepTips={stepTips}
          styled={styled}
          type={functionType}
          checked={checked}
          handleFocus={handleFocus}
          handleChecked={onChecked}
          onChange={handleChangeColumns}
          onChangeFunction={handleChangeFunction}
          handleToNextStepTip={handleToNextStepTip}
          handleClose={onPopoverCancel}
          handleConfirm={onPopoverConfirm}
        />
      )}
      {currentStep === 1 && (
        <div
          css={css`
            position: absolute;
            bottom: 610px;
            right: 368px;
            pointer-events: none;
            z-index: 1500;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep === 5 && (
        <div
          css={css`
            position: absolute;
            bottom: 330px;
            right: 178px;
            pointer-events: none;
            z-index: 1500;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep === 6 && (
        <div
          css={css`
            position: absolute;
            bottom: 610px;
            right: 510px;
            pointer-events: none;
            z-index: 1500;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep === 9 && (
        <div
          css={css`
            position: absolute;
            bottom: 380px;
            right: 503px;
            pointer-events: none;
            z-index: 1500;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep === 10 && (
        <div
          css={css`
            position: absolute;
            bottom: 330px;
            right: 310px;
            pointer-events: none;
            z-index: 1500;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep === 2 && openPopover && isFocused && (
        <div
          css={css`
            position: absolute;
            bottom: 475px;
            right: 350px;
            pointer-events: none;
            z-index: 1500;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {currentStep === 7 && openPopover && isFocused && (
        <div
          css={css`
            position: absolute;
            bottom: 365px;
            right: 480px;
            pointer-events: none;
            z-index: 1500;
          `}
        >
          <StyledAnimation />
        </div>
      )}
    </div>
  );
}
