/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Icon_homebee from "src/assets/icon_homebee.png";
import Icon_closetable from "src/assets/icon_closetable.png";
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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Icon_add from "src/assets/icon_add.png";
import Icon_more from "src/assets/icon_more.png";
import Icon_processtable from "src/assets/icon_processtable.png";
import Icon_downloadtable from "src/assets/icon_downloadtable.png";
import Icon_resettable from "src/assets/icon_resettable.png";
import { StepTipItem, StyledTooltip } from "..";
import { ChevronRight } from "@mui/icons-material";
import { dataConversionUtil } from "src/utils/excel";
import StyledAnimation from "src/components/StyledAnimation";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface TableListItem {
  id: number;
  image?: string;
  price?: string;
  description?: string;
  store?: string;
}

export default function DataTable(props: {
  show?: boolean;
  currentStep?: number;
  stepTips?: StepTipItem[];
  handleToNextStepTip?: () => void;
  handleBackPanel?: (data?: any[]) => void;
}) {
  const { show, currentStep, stepTips, handleToNextStepTip, handleBackPanel } =
    props;

  const [tab, setTab] = useState(1);
  const [openPopover, _setOpenPopover] = useState(false);
  const [addList, _setAddList] = useState(false);

  const buttonCss = css`
    min-width: 64px;
    min-height: 24px;
    border-radius: 2px;
    background: #ffffff;
    font-size: 12px;
    line-height: 16px;
    color: #444444;
    margin-right: 8px;
    :hover {
      background: #ffffff;
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
          label={"??????"}
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

  const list: TableListItem[] = useMemo(
    () => [
      {
        id: 1,
        image: "https://img10.360buyimg.com/n7/jfs/...",
        price: "???3799",
        description:
          "Apple iPhone 12 mini (A2400) 64GB ?????? ?????? ????????????????????????5G ??????",
        store: "???????????????",
      },
      {
        id: 2,
        image: "https://img10.360buyimg.com/n7/jfs/...",
        price: "???1999",
        description:
          "??????60 SE 120Hz?????????????????? 66W???????????? 6400???Vlog?????? ???????????? ",
        store: "???????????????",
      },
      {
        id: 3,
        image: "https://img10.360buyimg.com/n7/jfs/...",
        price: "???3399",
        description:
          "??????70 IMX800????????? ??????????????? ????????????778G Plus 66W?????? 5G??????",
        store: "???????????????",
      },
      {
        id: 4,
        image: "https://img10.360buyimg.com/n7/jfs/...",
        price: "???1599",
        description:
          "??????X30 ??????6nm??????5G??? 66W???????????? 120Hz????????? ???????????? 8GB+",
        store: "???????????????",
      },
      {
        id: 5,
        image: "https://img10.360buyimg.com/n7/jfs/...",
        price: "???1599",
        description:
          "??????X30 ??????6nm??????5G??? 66W???????????? 120Hz????????? ???????????? 8GB+",
        store: "???????????????",
      },
      {
        id: 6,
        image: "https://img10.360buyimg.com/n7/jfs/...",
        price: "???1499",
        description:
          "??????Play6T Pro ??????810 40W???????????? 6nm????????? 4800??????????????? ???...",
        store: "???????????????",
      },
      {
        id: 7,
        image: "https://img10.360buyimg.com/n7/jfs/...",
        price: "???3399",
        description:
          "Redmi Note 11 4G FHD+ 90Hz?????????5000?????????G88??????5000mAh??????",
        store: "???????????????",
      },
      {
        id: 8,
        image: "https://img10.360buyimg.com/n7/jfs/...",
        price: "???2549",
        description:
          "??????70 IMX800????????? ??????????????? ????????????778G Plus 66W?????? 5G??????",
        store: "???????????????",
      },
    ],
    []
  );

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

  // const onhandleMoreClick = useCallback(() => {
  //   setOpenPopover(true);
  //   handleToNextStepTip?.();
  // }, [handleToNextStepTip]);

  // const onListItemClick = useCallback(() => {
  //   setOpenPopover(false);
  //   handleToNextStepTip?.();
  //   setAddList(true);
  // }, [handleToNextStepTip]);

  const onEndGrab = useCallback(() => {
    handleBackPanel?.();
  }, [handleBackPanel]);

  const onLoadExcel = useCallback(() => {
    handleToNextStepTip?.();
    const tableHeader = ["???1", "???2", "???3", "???4"];
    const dataList: any[] = [];
    list?.map((item: TableListItem) => {
      dataList.push([
        item?.image,
        item?.price,
        item?.description,
        // item?.image,
        item?.store,
      ]);
    });
    dataConversionUtil["dataToExcel"](
      "???????????????????????????",
      tableHeader,
      dataList
    );
  }, [dataConversionUtil, list, handleToNextStepTip]);

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
        /* animation: fadenum 0.5s;
        @keyframes fadenum {
          0% {
            transform: translateY(250px);
          }
        } */
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
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <img
            src={Icon_closetable}
            css={css`
              width: 24px;
              height: 24px;
            `}
          />
          <Button
            css={css`
              width: 90px;
              height: 28px;
              background: #ffcc00;
              margin-left: 16px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 500;
              line-height: 17px;
              color: #151515;
              :hover {
                background: #ffcc00;
              }
            `}
            onClick={onEndGrab}
          >
            ????????????
          </Button>
        </div>
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
          <Tab value={tab} label="??????1" />
        </Tabs>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            margin-right: 15px;
          `}
        >
          <Button css={buttonCss}>
            <img src={Icon_processtable} />
            ????????????
          </Button>
          {currentStep === 3 ? (
            <StyledTooltip
              open={show}
              arrow
              placement="bottom"
              title={
                stepTips?.filter(
                  (tip: StepTipItem) => tip.index === currentStep
                )[0]?.tip
              }
            >
              <Button css={buttonCss} onClick={onLoadExcel}>
                <img src={Icon_downloadtable} />
                ??????
              </Button>
            </StyledTooltip>
          ) : (
            <Button css={buttonCss}>
              <img src={Icon_downloadtable} />
              ??????
            </Button>
          )}
          <Button css={buttonCss}>
            <img src={Icon_resettable} />
            ??????
          </Button>
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
                      <TableCell
                        css={[
                          tableCellCss,
                          css`
                            width: ${addList ? "235.6px" : "294.5px"};
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
                          <StyledTableCellName name={"???1"} />
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
                      <TableCell
                        css={[
                          tableCellCss,
                          css`
                            width: ${addList ? "235.6px" : "294.5px"};
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
                          <StyledTableCellName name={"???2"} />
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
                      <TableCell
                        css={[
                          tableCellCss,
                          css`
                            width: ${addList ? "235.6px" : "294.5px"};
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
                          <StyledTableCellName name={"???3"} />

                          <IconButton>
                            <img
                              src={Icon_more}
                              css={css`
                                width: 24px;
                                height: 24px;
                              `}
                            />
                          </IconButton>
                          {/* {currentStep === 3 ? (
                            <StyledTooltip
                              open={true}
                              arrow
                              placement="top-end"
                              title={
                                stepTips?.filter(
                                  (tip: StepTipItem) =>
                                    tip.index === currentStep
                                )[0]?.tip
                              }
                            >
                              <IconButton onClick={onhandleMoreClick}>
                                <img
                                  src={Icon_more}
                                  css={css`
                                    width: 24px;
                                    height: 24px;
                                  `}
                                />
                              </IconButton>
                            </StyledTooltip>
                          ) : (
                            <IconButton>
                              <img
                                src={Icon_more}
                                css={css`
                                  width: 24px;
                                  height: 24px;
                                `}
                              />
                            </IconButton>
                          )} */}
                        </div>
                      </TableCell>
                      <TableCell
                        css={[
                          tableCellCss,
                          css`
                            width: ${addList ? "235.6px" : "294.5px"};
                            background: ${addList && "rgba(255, 195, 0, 0.1)"};
                            border: ${addList && "1px solid #ffc300"};
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
                          <StyledTableCellName name={"???4"} />
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
                      {addList && (
                        <TableCell
                          css={[
                            tableCellCss,
                            css`
                              width: ${addList ? "235.6px" : "294.5px"};
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
                            <StyledTableCellName name={"???5"} />
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
                      )}
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
                    {list
                      ?.slice(0, 4)
                      ?.map((item: TableListItem, index: number) => (
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
                          <TableCell
                            css={[
                              tableCellCss,
                              ,
                              css`
                                width: ${addList ? "235.6px" : "294.5px"};
                                padding-left: 20px;
                              `,
                            ]}
                          >
                            {item?.image}
                          </TableCell>
                          <TableCell
                            css={[
                              tableCellCss,
                              ,
                              css`
                                width: ${addList ? "235.6px" : "294.5px"};
                                padding-left: 20px;
                              `,
                            ]}
                          >
                            {item?.price}
                          </TableCell>
                          <TableCell
                            css={[
                              tableCellCss,
                              ,
                              css`
                                width: ${addList ? "235.6px" : "294.5px"};
                                padding-left: 20px;
                              `,
                            ]}
                          >
                            <div
                              css={css`
                                width: ${addList ? "235.6px" : "294.5px"};
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                              `}
                            >
                              {item?.description}
                            </div>
                          </TableCell>
                          {addList && (
                            <TableCell
                              css={[
                                tableCellCss,
                                ,
                                css`
                                  width: ${addList ? "235.6px" : "294.5px"};
                                  padding-left: 20px;
                                  background: rgba(255, 195, 0, 0.1);
                                  border: 1px solid #ffc300;
                                `,
                              ]}
                            >
                              {item?.image}
                            </TableCell>
                          )}
                          <TableCell
                            css={[
                              tableCellCss,
                              ,
                              css`
                                width: ${addList ? "235.6px" : "294.5px"};
                                padding-left: 20px;
                              `,
                            ]}
                          >
                            {item?.store}
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
            justify-content: flex-end;
            align-items: center;
            margin-top: 14px;
            margin-right: 15px;
          `}
        >
          <span
            css={css`
              font-size: 16px;
              line-height: 24px;
              color: #25314a;
              margin-right: 26px;
            `}
          >
            ???4??? 8???
          </span>
          <Button
            css={css`
              width: 104px;
              height: 28px;
              border-radius: 4px;
              background: #ffcc00;
              font-size: 12px;
              font-weight: 500;
              line-height: 17px;
              color: #151515;
              :hover {
                background: #ffcc00;
              }
            `}
          >
            ??????????????????
          </Button>
        </div>
      </div>

      <div
        css={css`
          display: ${openPopover ? "flex" : "none"};
          position: absolute;
          bottom: 130px;
          right: 230px;
          background: #ffffff;
          width: 160px;
          height: 100px;
          box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
        `}
      >
        <List
          css={css`
            padding: 0px;
            flex-grow: 1;
          `}
        >
          <ListItem
            disablePadding
            css={css`
              height: 32px;
            `}
          >
            <ListItemButton
              css={css`
                padding: 0px 10px;
              `}
            >
              <ListItemText
                primary="?????????"
                css={css`
                  .MuiTypography-root {
                    font-size: 14px;
                    line-height: 24px;
                    color: #3d3d3d;
                  }
                `}
              />
            </ListItemButton>
          </ListItem>

          {/* {currentStep === 4 ? (
            <StyledTooltip
              open={true}
              arrow
              placement="left"
              title={
                stepTips?.filter(
                  (tip: StepTipItem) => tip.index === currentStep
                )[0]?.tip
              }
            >
              <ListItem
                disablePadding
                css={css`
                  height: 32px;
                `}
              >
                <ListItemButton
                  onClick={onListItemClick}
                  css={css`
                    padding: 0px 10px;
                  `}
                >
                  <ListItemText
                    primary="???????????????"
                    css={css`
                      .MuiTypography-root {
                        font-size: 14px;
                        line-height: 24px;
                        color: #3d3d3d;
                      }
                    `}
                  />
                </ListItemButton>
              </ListItem>
            </StyledTooltip>
          ) : (
            <ListItem
              disablePadding
              css={css`
                height: 32px;
              `}
            >
              <ListItemButton
                css={css`
                  padding: 0px 10px;
                `}
              >
                <ListItemText
                  primary="???????????????"
                  css={css`
                    .MuiTypography-root {
                      font-size: 14px;
                      line-height: 24px;
                      color: #3d3d3d;
                    }
                  `}
                />
              </ListItemButton>
            </ListItem>
          )} */}
          <ListItem
            disablePadding
            css={css`
              height: 32px;
            `}
          >
            <ListItemButton
              css={css`
                padding: 0px 10px;
              `}
            >
              <ListItemText
                primary="???????????????"
                css={css`
                  .MuiTypography-root {
                    font-size: 14px;
                    line-height: 24px;
                    color: #3d3d3d;
                  }
                `}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            css={css`
              height: 32px;
            `}
          >
            <ListItemButton
              css={css`
                padding: 0px 10px;
              `}
            >
              <ListItemText
                primary="????????????"
                css={css`
                  .MuiTypography-root {
                    font-size: 14px;
                    line-height: 24px;
                    color: #3d3d3d;
                  }
                `}
              />
              <ChevronRight />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      {openPopover && (
        <div
          css={css`
            position: absolute;
            bottom: 155px;
            right: 320px;
            pointer-events: none;
          `}
        >
          <StyledAnimation />
        </div>
      )}
      {/* {currentStep === 3 && (
        <div
          css={css`
            position: absolute;
            bottom: 225px;
            right: 359px;
            pointer-events: none;
          `}
        >
          <StyledAnimation />
        </div>
      )} */}
      {currentStep === 3 && (
        <div
          css={css`
            position: absolute;
            bottom: 275px;
            right: 102px;
            pointer-events: none;
          `}
        >
          <StyledAnimation />
        </div>
      )}
    </div>
  );
}
