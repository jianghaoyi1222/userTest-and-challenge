/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Icon_homebee from "src/assets/icon_homebee.png";
import Icon_closetable from "src/assets/dataCollection/icon_closetable.png";
import {
  Button,
  Chip,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { useCallback, useState } from "react";
import Icon_add from "src/assets/icon_add.png";
import Icon_more from "src/assets/icon_more.png";
import { dataConversionUtil } from "src/utils/excel";
import { StepTipItem, StyledTooltip } from "src/pages/dataCollection";
import { BooklistItem } from "..";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function BatchDataTable(props: {
  show?: boolean;
  currentStep?: number;
  stepTips?: StepTipItem[];
  datalist?: BooklistItem[];
  handleToNextStepTip?: () => void;
}) {
  const { show, currentStep, stepTips, datalist, handleToNextStepTip } = props;

  const [tab, setTab] = useState(1);
  const [openPopover, setOpenPopover] = useState(false);

  const buttonCss = css`
    min-width: 80px;
    min-height: 28px;
    border-radius: 4px;
    background: #ffcc00;
    font-size: 12px;
    line-height: 16px;
    color: #151515;
    margin-right: 16px;
    :hover {
      background: #ffcc00;
    }
  `;

  const tableCellCss = css`
    padding: 0px;
    border-right: 1px solid #f0f0f0;
  `;

  const tableCellBeforeCss = css`
    ::before {
      content: "";
      display: inline-block;
      height: 12px;
      border: 3px solid #ffcc00;
      border-radius: 5px;
      margin-left: 8px;
      margin-right: 8px;
    }
  `;

  const StyledTableCellName = (props: { name: string }) => {
    const { name } = props;
    return (
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >
        <span css={tableCellBeforeCss}>{name}</span>
        <Chip
          label={"文本"}
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
    );
  };

  const StyledTableCell = (props: { name: string }) => {
    const { name } = props;
    return (
      <TableCell
        css={[
          tableCellCss,
          css`
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          `,
        ]}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 8px;
          `}
        >
          <StyledTableCellName name={name} />
          <IconButton>
            <img
              src={Icon_more}
              css={css`
                width: 24px;
                height: 24px;
              `}
            />
          </IconButton>
        </div>
      </TableCell>
    );
  };

  const onhandleChangeTab = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && (
          <div
            css={css`
              width: 100%;
              height: 100%;
            `}
          >
            {children}
          </div>
        )}
      </div>
    );
  };

  const onhandleMoreClick = useCallback(() => {
    setOpenPopover(true);
    handleToNextStepTip?.();
  }, [handleToNextStepTip]);

  const onListItemClick = useCallback(() => {
    setOpenPopover(false);
    handleToNextStepTip?.();
  }, [handleToNextStepTip]);

  const onLoadExcel = useCallback(() => {
    handleToNextStepTip?.();
    const tableHeader = ["列1", "列2", "列3", "列4", "列5"];
    const dataList: any[] = [];
    // list?.map((item: BooklistItem) => {
    //   dataList.push([
    //     item?.image,
    //     item?.price,
    //     item?.description,
    //     item?.image,
    //     item?.store,
    //   ]);
    // });
    dataConversionUtil["dataToExcel"]("表格", tableHeader, dataList);
  }, [dataConversionUtil, , handleToNextStepTip]);

  return (
    <div
      css={css`
        width: 1320px;
        height: 360px;
        display: ${show ? "flex" : "none"};
        flex-direction: column;
        border-radius: 8px 8px 0px 0px;
        background: #ffffff;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 40px;
          border-radius: 8px 8px 0px 0px;
          background: #151515;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0px 24px;
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
            src={Icon_homebee}
            css={css`
              width: 17px;
              height: 19px;
            `}
          />
          <span
            css={css`
              font-size: 16px;
              font-weight: bold;
              line-height: 10.08px;
              color: #ffcc00;
              margin-left: 5px;
            `}
          >
            BEE
          </span>
        </div>
        <img
          src={Icon_closetable}
          css={css`
            width: 24px;
            height: 24px;
          `}
        />
      </div>
      <div
        css={css`
          width: 100%;
          height: 40px;
          background: #eef4ff;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Tabs
          value={tab}
          onChange={onhandleChangeTab}
          css={css`
            min-height: unset;
            height: 40px;
            padding-left: 16px;
            padding-top: 8px;
            .MuiButtonBase-root {
              padding: 0px;
              min-height: 32px;
              border-radius: 4px 4px 0px 0px;
            }
            .MuiTabs-indicator {
              background-color: transparent;
            }
            .Mui-selected {
              background: #ffffff;
            }
          `}
        >
          <Tab value={tab} label="表格1" />
        </Tabs>
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <Button css={buttonCss}>数据处理</Button>
          {currentStep === 5 ? (
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
              <Button css={buttonCss} onClick={onLoadExcel}>
                下载
              </Button>
            </StyledTooltip>
          ) : (
            <Button css={buttonCss}>下载</Button>
          )}
        </div>
      </div>
      <div
        css={css`
          margin-top: 9px;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <div
            css={css`
              width: 1290px;
              height: 216px;
              border: 1px solid #f0f0f0;
              overflow-y: auto;
            `}
          >
            <TabPanel value={1} index={1} key="1">
              <TableContainer
                css={css`
                  display: flex;
                  justify-content: center;
                `}
              >
                <Table>
                  <TableHead>
                    <TableRow
                      css={css`
                        height: 40px;
                      `}
                    >
                      <TableCell
                        css={[
                          tableCellCss,
                          css`
                            width: 56px;
                          `,
                        ]}
                      ></TableCell>
                      <StyledTableCell name="图片链接" />
                      <StyledTableCell name="小说名" />
                      <StyledTableCell name="作者" />
                      <StyledTableCell name="类型" />
                      <StyledTableCell name="简介" />
                      <TableCell
                        css={[
                          tableCellCss,
                          css`
                            width: 56px;
                          `,
                        ]}
                      >
                        <div
                          css={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          `}
                        >
                          <img
                            src={Icon_add}
                            css={css`
                              width: 16px;
                              height: 16px;
                            `}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datalist
                      ?.slice(0, 4)
                      ?.map((item: BooklistItem, index: number) => (
                        <TableRow
                          key={index}
                          css={css`
                            height: 40px;
                          `}
                        >
                          <TableCell
                            css={[
                              tableCellCss,
                              css`
                                height: 40px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                              `,
                            ]}
                          >
                            <span>{index + 1}</span>
                          </TableCell>
                          <TableCell css={tableCellCss}>
                            <div
                              css={css`
                                width: 235.6px;
                                padding-left: 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                              `}
                            >
                              {item?.["图片链接"]}
                            </div>
                          </TableCell>
                          <TableCell css={tableCellCss}>
                            <div
                              css={css`
                                width: 235.6px;
                                padding-left: 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                              `}
                            >
                              {item?.["小说名"]}
                            </div>
                          </TableCell>
                          <TableCell css={tableCellCss}>
                            <div
                              css={css`
                                width: 235.6px;
                                padding-left: 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                              `}
                            >
                              {item?.["作者"]}
                            </div>
                          </TableCell>

                          <TableCell css={tableCellCss}>
                            <div
                              css={css`
                                width: 235.6px;
                                padding-left: 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                              `}
                            >
                              {item?.["类型"]}
                            </div>
                          </TableCell>

                          <TableCell css={tableCellCss}>
                            <div
                              css={css`
                                width: 235.6px;
                                padding-left: 20px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                              `}
                            >
                              {item?.["简介"]}
                            </div>
                          </TableCell>
                          <TableCell
                            css={css`
                              width: 56px;
                              padding: 0px;
                              border-right: 1px solid #f0f0f0;
                              border-bottom: unset;
                            `}
                          ></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </div>
        </div>

        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 500;
              line-height: 26px;
              color: #25314a;
              margin-top: 14px;
            `}
          >
            已采集50条数据
          </span>
        </div>
      </div>
    </div>
  );
}
