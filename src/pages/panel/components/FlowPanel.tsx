/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import {
  Button,
  IconButton,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { howLongBefore } from "src/utils/string";
import Icon_more from "src/assets/icon_more.png";
import Icon_start from "src/assets/icon_start.png";
import { StepTipItem } from "src/pages/dataCollection";

export interface FlowItem {
  id: string;
  name: string;
  createTime?: string;
  icon?: string;
}

export default function FlowPanel(props: {
  flowSource?: FlowItem;

  stepTips?: StepTipItem[];
  currentStep?: number;

  handleBatch?: (event: any, value: boolean) => void;

  handleToNextStepTip?: () => void;
}) {
  const {
    flowSource,
    stepTips,
    currentStep,
    handleBatch,
    handleToNextStepTip,
  } = props;

  const [flow, setFlow] = useState<FlowItem[]>([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (flowSource) {
      const source = [];
      source.push(flowSource);
      setFlow(source);
    }
  }, [flowSource]);

  const autoButtonCss = css`
    width: 176px;
    height: 40px;
    border-radius: 4px;
    background: #ffcc00;
    color: #151515;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    margin-bottom: 25px;
    :hover {
      background: #ffcc00;
    }
  `;

  const onBatch = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    handleBatch?.(event.currentTarget, false);
  }, []);

  useEffect(() => {
    if (currentStep === 1) {
      setOpen(true);
    }
  }, [currentStep]);

  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#3D65E4",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#3D65E4",
      color: "#FFFFFF",
      fontSize: "20px",
      fontWeight: "500px",
      zIndex: "999999",
      width: "260px",
      height: "76px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
    },
  }));

  const onCollectData = useCallback(() => {
    setOpen(false);
    handleToNextStepTip?.();
  }, [handleToNextStepTip]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 344px;
      `}
    >
      {flow && flow?.length > 0 ? (
        flow?.map((item: FlowItem) => {
          return (
            <div
              css={css`
                position: relative;
                width: 296px;
                height: 88px;
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
                    align-items: center;
                  `}
                >
                  <img src={item?.icon} />
                  <span
                    css={css`
                      color: #bbbec5;
                      font-size: 12px;
                      line-height: 12px;
                      margin-left: 12px;
                    `}
                  >
                    {howLongBefore(item?.createTime)}
                  </span>
                </div>
                <span
                  css={css`
                    color: #303030;
                    font-size: 16px;
                    line-height: 16px;
                    margin-top: 10px;
                  `}
                >
                  {item?.name}
                </span>
              </div>
              <div
                css={css`
                  position: absolute;
                  top: 26px;
                  right: 16px;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                  `}
                >
                  <IconButton
                    css={css`
                      width: 34px;
                      height: 34px;
                    `}
                  >
                    <img
                      src={Icon_start}
                      css={css`
                        width: 10.5px;
                        height: 12.12px;
                      `}
                    />
                  </IconButton>
                  <IconButton
                    css={css`
                      width: 34px;
                      height: 34px;
                    `}
                  >
                    <img
                      src={Icon_more}
                      css={css`
                        width: 24px;
                        height: 24px;
                      `}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
          );
        })
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
                  text-align: center;
                  padding-bottom: 18px;
                `}
              >
                欢迎来到小蜜蜂的自动化星球👏
              </p>
              <p
                css={css`
                  font-size: 14px;
                  text-align: center;
                `}
              >
                跟随小工蜂🐝的指引,我们将教您如何创建属于自己的自动化流程
              </p>
            </div>
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
              新手Bee点这里
            </Button>
            👈
          </div>

          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 60px;
            `}
          >
            <Button css={autoButtonCss} onClick={onBatch}>
              批量点击
            </Button>
            <Button css={autoButtonCss}>循环操作</Button>
            {currentStep === 1 ? (
              <StyledTooltip
                arrow
                placement="top"
                open={open}
                title={
                  stepTips?.filter(
                    (tip: StepTipItem) => tip.index === currentStep
                  )[0]?.tip
                }
              >
                <Button css={autoButtonCss} onClick={onCollectData}>
                  采集数据
                </Button>
              </StyledTooltip>
            ) : (
              <Button css={autoButtonCss}>采集数据</Button>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}
