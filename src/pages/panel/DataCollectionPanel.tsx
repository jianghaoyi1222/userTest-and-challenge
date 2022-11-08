/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Icon_logo from "src/assets/icon_logo.png";
import { Fragment, useCallback, useEffect, useState } from "react";
import { DataItem } from "./components/DataPanel";
import Icon_unfold from "src/assets/icon_unfold.png";
import Icon_add from "src/assets/icon_add.png";
import Icon_user from "src/assets/icon_user.png";
import Icon_bee_circle from "src/assets/icon_bee_circle.png";
import Icon_packup from "src/assets/icon_packup.png";
import Icon_packupbee from "src/assets/icon_packupbee.png";
import Icon_jingdong from "src/assets/icon_jingdong.png";
import Icon_update from "src/assets/icon_update.png";
import Icon_more from "src/assets/icon_more.png";
import { Button, IconButton } from "@mui/material";
import { StepTipItem, StyledTooltip } from "../dataCollection";
import SearchInput from "src/components/SearchInput";
import { howLongBefore } from "src/utils/string";
import StyledAnimation from "src/components/StyledAnimation";

export default function DataCollectionPanel(props: {
  activeTab?: string;
  open?: boolean;
  dataList?: DataItem;

  stepTips?: StepTipItem[];
  currentStep?: number;

  handleClose?: () => void;

  handleToNextStepTip?: () => void;
  handleShowOrCloseAssistant?: (show: boolean) => void;
}) {
  const {
    activeTab = "data",
    open = true,
    dataList,

    stepTips,
    currentStep,

    handleShowOrCloseAssistant,
  } = props;
  const [activeItem, setActiveItem] = useState<string>("");
  const [datalist, setDatalist] = useState<DataItem>();
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    setDatalist(dataList);
    if (dataList) {
      setIsStart(false);
    }
  }, [dataList]);

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

  const onCollection = useCallback(() => {
    setIsStart(true);
  }, []);

  useEffect(() => {
    if (isStart) {
      setTimeout(() => handleShowOrCloseAssistant?.(true), 500);
    }
  }, [isStart]);

  return (
    <div
      css={css`
        position: absolute;
        top: 32px;
        right: ${isStart ? 0 : 32}px;
        border-radius: 24px;
        max-width: 400px;
        max-height: 720px;
        z-index: 10;
        display: ${open ? "block" : "none"};
      `}
    >
      {isStart && (
        <div
          css={css`
            position: absolute;
            right: 4px;
            height: 25px;
            overflow: hidden;
          `}
        >
          <img
            src={Icon_packupbee}
            css={css`
              animation: fadenum 0.5s;
              @keyframes fadenum {
                0% {
                  transform: translateY(250px);
                }
              }
            `}
          />
        </div>
      )}
      <div
        css={[
          css`
            display: flex;
            width: ${isStart ? 64 : 400}px;
            height: ${isStart ? 48 : 720}px;
            border-radius: ${isStart ? "24px 0px 0px 24px" : "24px"};
            background: #ffffff;
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.45);
            transition: width 0.4s, height 0.4s;
            overflow: hidden;
          `,
          isStart &&
            css`
              margin-top: 23px;
            `,
        ]}
      >
        {isStart ? (
          <div
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            <div
              css={css`
                width: 40px;
                min-height: 40px;
                max-height: 720px;
                background: #000000;
                border-radius: 24px;
                margin: 4px;
              `}
            >
              <img
                src={Icon_bee_circle}
                css={css`
                  width: 40px;
                  height: 40px;
                `}
              />
            </div>
            <img
              src={Icon_packup}
              css={css`
                height: 14px;
                width: 6px;
                margin-left: 5px;
                margin-top: 15px;
              `}
            />
          </div>
        ) : (
          <Fragment>
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
                <img
                  src={Icon_logo}
                  css={css`
                    width: 40px;
                    height: 40px;
                  `}
                />
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
                <IconButton
                  css={css`
                    width: 40px;
                    height: 40px;
                  `}
                >
                  <img
                    src={Icon_user}
                    css={css`
                      width: 18px;
                    `}
                  />
                </IconButton>
              </div>
              {activeItem === "data" &&
                (datalist ? (
                  <div>
                    <div
                      css={css`
                        display: flex;
                        justify-content: center;
                        margin-top: 16px;
                        margin-bottom: 16px;
                      `}
                    >
                      <SearchInput />
                    </div>

                    <div
                      css={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 296px;
                        height: 80px;
                        border-radius: 4px;
                        background: #fbfbfb;
                        padding-left: 16px;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          justify-content: space-between;
                        `}
                      >
                        <div
                          css={css`
                            display: flex;
                            flex-direction: row;
                          `}
                        >
                          <img
                            src={Icon_jingdong}
                            css={css`
                              width: 24px;
                              height: 24px;
                            `}
                          />
                          <span
                            css={css`
                              font-size: 16px;
                              font-weight: bold;
                              line-height: 24px;
                              color: #303030;
                              margin-left: 12px;
                            `}
                          >
                            {datalist.name}
                          </span>
                        </div>
                        <div
                          css={css`
                            display: flex;
                            flex-direction: row;
                          `}
                        >
                          <IconButton
                            css={css`
                              padding: 1px;
                              margin-right: 8px;
                            `}
                          >
                            <img src={Icon_update} />
                          </IconButton>
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
                          font-size: 14px;
                          line-height: 20px;
                          color: #999999;
                          margin-top: 4px;
                        `}
                      >
                        更新于{howLongBefore(datalist.createTime)}
                      </span>
                    </div>
                  </div>
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
                      <div
                        css={css`
                          width: 297.5px;
                          height: 100px;
                        `}
                      >
                        <p
                          css={css`
                            font-size: 20px;
                            font-weight: bold;
                            text-align: center;
                            padding-bottom: 18px;
                          `}
                        >
                          欢迎来到小蜜蜂
                        </p>
                        <p
                          css={css`
                            font-size: 16px;
                            text-align: center;
                            color: #3d3d3d;
                          `}
                        >
                          数智进化 快人一步 从现在开始 👊
                        </p>
                      </div>
                    </div>

                    <div
                      css={css`
                        margin-top: 32px;
                        text-align: center;
                      `}
                    >
                      {currentStep === 1 ? (
                        <StyledTooltip
                          arrow
                          placement="bottom"
                          open={true}
                          title={
                            stepTips?.filter(
                              (tip: StepTipItem) => tip.index === currentStep
                            )[0]?.tip
                          }
                        >
                          <Button
                            variant="contained"
                            css={css`
                              width: 140px;
                              height: 40px;
                              font-size: 16px;
                              line-height: 24px;
                              font-weight: bold;
                              background: #ffcc00;
                              color: #151515;
                              :hover {
                                background: #ffcc00;
                              }
                            `}
                            onClick={onCollection}
                          >
                            采集数据
                          </Button>
                        </StyledTooltip>
                      ) : (
                        <Button
                          variant="contained"
                          css={css`
                            width: 140px;
                            height: 40px;
                            font-size: 16px;
                            line-height: 24px;
                            font-weight: bold;
                            background: #ffcc00;
                            color: #151515;
                            :hover {
                              background: #ffcc00;
                            }
                          `}
                        >
                          采集数据
                        </Button>
                      )}
                    </div>
                  </Fragment>
                ))}
            </div>
          </Fragment>
        )}
      </div>
      {currentStep === 1 && (
        <div
          css={css`
            position: absolute;
            bottom: 455px;
            right: 150px;
            pointer-events: none;
          `}
        >
          <StyledAnimation />
        </div>
      )}
    </div>
  );
}
