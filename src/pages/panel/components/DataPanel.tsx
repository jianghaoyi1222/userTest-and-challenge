/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button, IconButton } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import Icon_upload from "src/assets/icon_upload.png";
import { howLongBefore } from "src/utils/string";
import Icon_xlsx from "src/assets/icon_xlsx.png";
import moment from "moment";
import * as xlsx from "xlsx";
import Icon_update from "src/assets/icon_update.png";
import Icon_more from "src/assets/icon_more.png";
import { StepTipItem, StyledTooltip } from "src/pages/dataCollection";

export interface DataItem {
  id: string;
  name: string;
  createTime?: string;
  icon?: string;
  description?: string;
  type?: "xlsx" | "csv";
  result?: any;
}

export default function DataPanel(props: {
  dataSource?: DataItem;
  existingData?: DataItem[];

  currentStep?: number;
  stepTips?: StepTipItem[];

  handleGainExistingData?: (data: DataItem[]) => void;
  handleChangeDataSourceSituation?: () => void;
  handleOpenTable?: () => void;
  handleToNextStepTip?: () => void;
  handlePreviewTablelist?: (list: DataItem) => void;
}) {
  const {
    dataSource,
    existingData,

    currentStep,
    stepTips,

    handleGainExistingData,
    handleChangeDataSourceSituation,
    handleOpenTable,
    handleToNextStepTip,
    handlePreviewTablelist,
  } = props;

  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (dataSource) {
      const source = [];
      source.push(dataSource);
      setData([...data, ...source]);
      if (existingData) {
        handleGainExistingData?.([...data, ...existingData, ...source]);
      } else {
        handleGainExistingData?.([...data, ...source]);
      }
      handleChangeDataSourceSituation?.();
    }
    if (existingData) {
      setData(existingData);
    }
  }, [dataSource, data, existingData, handleChangeDataSourceSituation]);

  // file对象转为Buffer数据
  const fileDataPaserBuffer = useCallback((fileData: any) => {
    return new Promise((res, _rej) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        res(e);
      };
      reader.readAsArrayBuffer(fileData);
    });
  }, []);

  // xlsx读取buffer数据
  const readTableDataBuffer = useCallback((data: any) => {
    return xlsx.read(data, {
      type: "buffer",
      cellHTML: false,
    });
  }, []);

  const onUploadFile = useCallback(
    async (file: any) => {
      let dataItem: DataItem[] = [];
      const filelist = file.target.value.split("\\");
      const fileName = filelist[filelist.length - 1].split(".")[0];
      const fileType = filelist[filelist.length - 1].split(".")[1];
      let resultJson: any = [];

      const res: any = await fileDataPaserBuffer(file.target.files[0]);

      const result = readTableDataBuffer(res.target.result);
      let worksheet: xlsx.WorkSheet = result.Sheets[
        String(result.SheetNames[0])
      ] as xlsx.WorkSheet;
      resultJson = xlsx.utils.sheet_to_json(worksheet);

      const head = Object.keys(resultJson[0]);

      const values = [];

      for (let t = 0; t < head.length; t++) {
        for (let i = 0; i < resultJson.length; i++) {
          values.push(Object.values(resultJson[i])[t]);
        }
      }

      let start = 0;
      let end = resultJson.length;
      const list = [];
      const row = Math.ceil(values.length / end);
      for (let i = 0; i < row; i++) {
        const rowList = values.slice(start, end);
        list.push(rowList);
        start = start + resultJson.length;
        end = end + resultJson.length;
      }

      dataItem.push({
        id: `${data?.length > 0 ? data.length + 1 : 1}`,
        name: fileName,
        createTime: moment().format(),
        icon: Icon_xlsx,
        // description: `来自于本地上传文件：${filelist[filelist.length - 1]}`,
        description: "来自于本地",
        type: fileType,
        result: resultJson,
      });

      setData([...data, ...dataItem]);
      handleGainExistingData?.([...data, ...dataItem]);
    },
    [data]
  );

  const onView = useCallback(
    (id: string) => {
      const list: any = data.filter((item: any) => item.id === id)[0];
      handlePreviewTablelist?.(list);
      handleOpenTable?.();
      handleToNextStepTip?.();
    },
    [handleOpenTable, handleToNextStepTip, handlePreviewTablelist, data]
  );

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 344px;
        `}
      >
        {data.length > 0 ? (
          <Fragment>
            <div
              css={css`
                margin-top: 18px;
              `}
            >
              <Button
                component="label"
                css={css`
                  min-width: 240px;
                  min-height: 40px;
                  border-radius: 2px;
                  border: 1px dashed #bbbec5;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <p
                    css={css`
                      font-size: 14px;
                      color: #1e293e;
                      line-height: 20px;
                      text-align: center;
                    `}
                  >
                    +导入数据
                  </p>
                </div>
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  hidden
                  onChange={onUploadFile}
                />
              </Button>
            </div>
            {data?.map((data) => {
              return (
                <div
                  key={data.id}
                  css={css`
                    position: relative;
                    width: 296px;
                    height: 70px;
                    margin-top: 20px;
                    background: #fbfbfb;
                    border-radius: 4px;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      margin-top: 16px;
                      margin-left: 16px;
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
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          align-items: center;
                        `}
                      >
                        <img
                          src={data?.icon}
                          css={css`
                            width: 24px;
                            height: 24px;
                          `}
                        />
                        <span
                          css={css`
                            color: #303030;
                            font-size: 16px;
                            line-height: 16px;
                            margin-left: 8px;
                          `}
                        >
                          {data?.name}
                        </span>
                        <span
                          css={css`
                            color: #bbbec5;
                            font-size: 12px;
                            line-height: 12px;
                            margin-left: 8px;
                          `}
                        >
                          {howLongBefore(data?.createTime)}
                        </span>
                      </div>
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          align-items: center;
                        `}
                      >
                        {currentStep === 1 ? (
                          <StyledTooltip
                            open={true}
                            arrow
                            placement="top-end"
                            title={
                              stepTips?.filter(
                                (tip: StepTipItem) => tip.index === currentStep
                              )[0]?.tip
                            }
                          >
                            <IconButton
                              onClick={() => onView(data.id)}
                              css={css`
                                padding: 1px;
                                margin-right: 8px;
                              `}
                            >
                              <img src={Icon_update} />
                            </IconButton>
                          </StyledTooltip>
                        ) : (
                          <IconButton
                            onClick={() => onView(data.id)}
                            css={css`
                              padding: 1px;
                              margin-right: 8px;
                            `}
                          >
                            <img src={Icon_update} />
                          </IconButton>
                        )}

                        <IconButton
                          css={css`
                            padding: 1px;
                            margin-right: 8px;
                          `}
                        >
                          <img src={Icon_more} />
                        </IconButton>
                      </div>
                    </div>
                    <span
                      css={css`
                        color: #999999;
                        font-size: 12px;
                        line-height: 12px;
                        margin-top: 10px;
                        margin-left: 32px;
                      `}
                    >
                      {data?.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : (
          <Fragment>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 40px;
              `}
            >
              <p
                css={css`
                  font-size: 14px;
                  line-height: 20px;
                  color: #1e293e;
                `}
              >
                您还没有任何数据哦～
              </p>
            </div>

            <div
              css={css`
                margin-top: 32px;
                text-align: center;
              `}
            >
              <Button
                css={css`
                  font-size: 16px;
                  line-height: 20px;
                  padding: 2px 0px;
                  border-bottom: 1px solid;
                  border-radius: 0px;
                `}
              >
                入门指南
              </Button>
              👈
            </div>

            <div
              css={css`
                margin-top: 44px;
              `}
            >
              <Button
                component="label"
                css={css`
                  min-width: 240px;
                  min-height: 140px;
                  background: #fbfbfb;
                  border-radius: 2px;
                  border: 1px dashed #bbbec5;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <img
                    src={Icon_upload}
                    css={css`
                      width: 24px;
                      height: 24px;
                    `}
                  />
                  <p
                    css={css`
                      width: 145px;
                      height: 40px;
                      font-size: 14px;
                      color: #1e293e;
                      line-height: 20px;
                      text-align: center;
                      margin-top: 14px;
                    `}
                  >
                    将文件拖拽到这里或者点击此区域开始导入
                  </p>
                  <p
                    css={css`
                      height: 20px;
                      font-size: 12px;
                      line-height: 20px;
                      color: #bbbec5;
                      margin-top: 8px;
                    `}
                  >
                    支持上传.xlsx/.csv文件
                  </p>
                </div>
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  hidden
                  onChange={onUploadFile}
                />
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
