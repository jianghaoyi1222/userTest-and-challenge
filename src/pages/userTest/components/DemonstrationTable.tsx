/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Skeleton } from "@mui/material";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Icon_homebee from "src/assets/icon_homebee.png";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import AddContent from "./AddContent";
import { CurrentModeItem } from "src/pages/assistant/BatchClicks";

export interface ListItem {
  id: number;
  title: string;
  description?: string;
}

export interface CheckedProps {
  [key: string]: boolean;
}

export default function DemonstrationTable(props: {
  mode?: CurrentModeItem;
  transmitBackTitle?: any;
  isBatchTitle?: boolean;
  transmitBackContent?: any;
  isBatchContent?: boolean;
  titleList?: any;
  contentList?: any;
  isConfirmed?: boolean;
  isExecuted?: boolean;
  handleIdentifyComponent?: (component: string) => void;
  handleChangeTitle?: (event?: any) => void;
  handleChangeContent?: (event?: any) => void;
  handleConfirm?: (isConfirm: boolean) => void;
  handleAddStep?: (component: any, text: string) => void;
}) {
  const {
    mode,
    transmitBackTitle,
    isBatchTitle,
    transmitBackContent,
    isBatchContent,
    isConfirmed,
    titleList,
    contentList,
    isExecuted,
    handleIdentifyComponent,
    handleChangeTitle,
    handleChangeContent,
    handleConfirm,
    handleAddStep,
  } = props;
  const [page, setPage] = useState<number>(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [isButtonHighlight, setIsButtonHighlight] = useState(false);
  const [rows, _setRows] = useState<ListItem[]>([]);
  const [rowList, setRowList] = useState<ListItem[][]>([]);

  const tableRowRef = useRef(null);

  const onChangePage = useCallback(
    (_event: React.ChangeEvent<unknown>, page: number) => {
      setPage(page);
    },
    []
  );

  const onAddContent = useCallback(
    (event: any) => {
      event.preventDefault();
      setOpenAdd(true);
      if (mode === "record") {
        handleIdentifyComponent?.("button-add");
        handleAddStep?.("button-add", "点击了“添加”按钮");
      }
    },
    [mode, handleIdentifyComponent]
  );

  const onCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const handleMouseMove = useCallback(() => {
    setIsButtonHighlight(true);
  }, []);

  useEffect(() => {
    if (isConfirmed && isExecuted) {
      rows.splice(0, rows.length);
      titleList.map((title: any, titleIndex: number) => {
        contentList.map((content: any, contentIndex: number) => {
          if (titleIndex === contentIndex) {
            rows.push({ id: titleIndex, title: title, description: content });
          }
        });
      });
    } else if (isConfirmed) {
      rows.push({ id: 0, title: titleList[0], description: contentList[0] });
    }

    let start = 0;
    let end = 10;
    const list: any[] = [];
    const row = Math.ceil(rows.length / 10);
    for (let i = 0; i < row; i++) {
      const rowList = rows?.slice(start, end);
      list.push(rowList);
      start = start + 10;
      end = end + 10;
    }

    setRowList(list);
  }, [isConfirmed, titleList, contentList, rows, isExecuted]);

  return (
    <div
      css={css`
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        width: 1440px;
        height: 800px;
        overflow: auto;
        position: fixed;
        bottom: 0px;
        background: #ffffff;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 64px;
          background: #3662ec;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            height: 100%;
            align-items: center;
            margin-left: 24px;
          `}
        >
          <img
            src={Icon_homebee}
            css={css`
              width: 24px;
              height: 30px;
            `}
          />
          <span
            css={css`
              color: #ffffff;
              font-size: 22px;
              margin-left: 10px;
            `}
          >
            小蜜蜂演示
          </span>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-grow: 1;
          flex-direction: row;
          width: 100%;
          height: 736px;
          background: rgba(0, 0, 0, 0.08);
        `}
      >
        <div
          css={css`
            width: 216px;
            background: #ffffff;
          `}
        >
          <div
            css={css`
              margin-top: 24px;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Fragment key={item}>
                {item === 3 ? (
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      justify-content: center;
                      width: 100%;
                      height: 64px;
                      background: rgba(54, 98, 236, 0.1);
                      border-left-width: 4px;
                      border-left-color: #3662ec;
                    `}
                  >
                    <Skeleton
                      variant="rectangular"
                      animation={false}
                      width={24}
                      height={24}
                      css={css`
                        border-radius: 4px;
                      `}
                    />
                    <Skeleton
                      variant="rectangular"
                      animation={false}
                      width={120}
                      height={24}
                      css={css`
                        margin-left: 8px;
                        border-radius: 4px;
                      `}
                    />
                  </div>
                ) : (
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      justify-content: center;
                      height: 64px;
                      width: 100%;
                    `}
                  >
                    <Skeleton
                      variant="rectangular"
                      animation={false}
                      width={24}
                      height={24}
                      css={css`
                        border-radius: 4px;
                      `}
                    />
                    <Skeleton
                      variant="rectangular"
                      animation={false}
                      width={120}
                      height={24}
                      css={css`
                        margin-left: 8px;
                        border-radius: 4px;
                      `}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div
          css={css`
            width: 1208px;
            margin-left: 16px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-grow: 1;
              flex-direction: row;
              background: #ffffff;
              height: 98px;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <div>
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  margin-left: 16px;
                `}
              >
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  width={24}
                  height={24}
                  css={css`
                    border-radius: 4px;
                  `}
                />
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  width={120}
                  height={24}
                  css={css`
                    margin-left: 8px;
                    border-radius: 4px;
                  `}
                />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  margin-top: 8px;
                  margin-left: 48px;
                `}
              >
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  width={389}
                  height={16}
                  css={css`
                    border-radius: 4px;
                  `}
                />
              </div>
            </div>

            <Button
              variant="contained"
              css={css`
                width: 120px;
                height: 44px;
                margin-right: 24px;
                border-radius: 4px;
                border: ${mode === "record" &&
                isButtonHighlight &&
                "2px solid #FFC300"};
              `}
              onClick={onAddContent}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsButtonHighlight(false)}
            >
              + 添加
            </Button>
          </div>
          <div
            css={css`
              display: flex;
              flex-grow: 1;
              flex-direction: column;
              align-items: center;
              background: #ffffff;
              height: 630px;
              margin-top: 8px;
            `}
          >
            <TableContainer
              css={css`
                width: 1160px;
                margin-top: 16px;
              `}
            >
              <Table>
                <TableHead>
                  <TableRow
                    css={css`
                      background: #f7fafe;
                      height: 36px;
                      .MuiTableCell-root {
                        padding: 0px 16px;
                      }
                    `}
                  >
                    <TableCell>标题列表</TableCell>
                    <TableCell align="left">列表内容</TableCell>
                    <TableCell align="left">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 &&
                    rowList &&
                    rowList[page - 1]?.map((row) => (
                      <TableRow
                        ref={tableRowRef}
                        key={row.id}
                        css={css`
                          height: 48px;
                          .MuiTableCell-root {
                            padding: 0px 16px;
                          }
                        `}
                      >
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">
                          <Button
                            css={css`
                              padding: 0px;
                              min-width: 0px;
                              color: red;
                            `}
                          >
                            删除
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {!(rows.length > 0) && (
              <span
                css={css`
                  font-size: 20px;
                  margin-top: 155px;
                  color: rgba(0, 0, 0, 0.6);
                `}
              >
                暂无数据，请点击添加数据
              </span>
            )}
            {rows.length > 0 && (
              <div
                css={css`
                  width: 100%;
                  margin-top: 24px;
                  margin-bottom: 40px;
                  margin-right: 32px;
                  display: flex;
                  justify-content: flex-end;
                `}
              >
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  count={Math.ceil(rows.length / 10)}
                  page={page}
                  onChange={onChangePage}
                  css={css`
                    .Mui-selected {
                      background-color: #ffffff !important;
                      border-color: #3377ff;
                      color: #3377ff;
                    }
                  `}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <AddContent
        open={openAdd}
        handleClose={onCloseAdd}
        mode={mode}
        transmitBackTitle={transmitBackTitle}
        isBatchTitle={isBatchTitle}
        transmitBackContent={transmitBackContent}
        isBatchContent={isBatchContent}
        handleIdentifyComponent={handleIdentifyComponent}
        handleChangeTitle={handleChangeTitle}
        handleChangeContent={handleChangeContent}
        handleConfirm={handleConfirm}
        handleAddStep={handleAddStep}
      />
    </div>
  );
}
