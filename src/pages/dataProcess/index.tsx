/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StepTipItem } from "../dataCollection";
import Icon_home from "src/assets/icon_home.png";
import moment from "moment";
import { DataItem } from "../panel/components/DataPanel";
import Icon_xlsx from "src/assets/icon_xlsx.png";
import PreviewTable from "../assistant/components/PreviewTable";
import EndPage from "src/components/EndPage";

export default function DataProcess() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [startChanllenge, setStartChanllenge] = useState(false);

  const stepTips: StepTipItem[] = useMemo(
    () => [
      // {
      //   index: 1,
      //   tip: "点这里查看或修改数据 ",
      // },
      {
        index: 1,
        tip: "不用学习公式处理，工具栏一键应用",
      },
      {
        index: 2,
        tip: "选择表格中任意一列",
      },
      {
        index: 3,
        tip: "选择转换格式",
      },
      {
        index: 4,
        tip: "实时查看处理结果",
      },
      {
        index: 5,
        tip: "立即保存",
      },
      {
        index: 6,
        tip: "特殊数据一键处理，如“身份证号码”提取“年龄”",
      },
      {
        index: 7,
        tip: "选择“身份证号码”",
      },
      {
        index: 8,
        tip: "选择“提取年龄”",
      },
      {
        index: 9,
        tip: "可选择是否保留原始列数据，请勾选保留",
      },
      {
        index: 10,
        tip: "完成保存",
      },
      {
        index: 11,
        tip: "已提取年龄",
      },
    ],
    []
  );

  const dataSource: DataItem = useMemo(() => {
    return {
      id: "1",
      name: "员工信息表",
      createTime: moment().format(),
      icon: Icon_xlsx,
      description: "来自于本地",
      type: "xlsx",
      result: [
        {
          姓名: "金小花",
          性别: "女",
          身份证号码: "310133199810102...",
          出生日期: "1998年10月10日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "李明明",
          性别: "男",
          身份证号码: "310001199005252...",
          出生日期: "1990年5月25日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "李西西",
          性别: "男",
          身份证号码: "310010199612125...",
          出生日期: "1996年12月12日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "俞小可",
          性别: "女",
          身份证号码: "310008200201232...",
          出生日期: "2002年1月23日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "胡小媛",
          性别: "女",
          身份证号码: "310006200011235...",
          出生日期: "2000年11月23日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "孙大轶",
          性别: "男",
          身份证号码: "310006199906214...",
          出生日期: "1999年6月21日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "陈小婷",
          性别: "女",
          身份证号码: "310005199808234...",
          出生日期: "1998年8月23日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "金香香",
          性别: "女",
          身份证号码: "310003199709101...",
          出生日期: "1997年9月10日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "俞可可",
          性别: "女",
          身份证号码: "310008200101258...",
          出生日期: "2001年1月25日",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "尤兰达",
          性别: "女",
          身份证号码: "310003200010012...",
          出生日期: "2000年10月1日",
          地址: "上海市徐汇区定西...",
        },
      ],
    };
  }, []);

  const onStartChanllenge = useCallback(() => {
    setStartChanllenge(true);
  }, []);

  const onToNextStepTip = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const onToPreStepTip = useCallback((value: number) => {
    setCurrentStep(value);
  }, []);

  const onOpenTable = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    let timer: any = null;
    if (currentStep === 11) {
      timer = setTimeout(() => onToNextStepTip(), 800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, onToNextStepTip]);

  return (
    <div
      css={css`
        width: 1400px;
        height: 800px;
        position: relative;
      `}
    >
      {startChanllenge ? (
        // currentStep === 1 ? (
        //   <div
        //     css={css`
        //       width: 100%;
        //       height: 100%;
        //       background: #cde1fd;
        //     `}
        //   >
        //     <Panel
        //       activeTab="data"
        //       dataList={dataSource}
        //       currentStep={currentStep}
        //       stepTips={stepTips}
        //       handleOpenTable={onOpenTable}
        //       handleToNextStepTip={onToNextStepTip}
        //     />
        //   </div>
        // ) :
        <div
          css={css`
            width: 100%;
            height: 100%;
            background: #cde1fd;
            position: relative;
          `}
        >
          <PreviewTable
            open={true}
            type="dataProcess"
            file={dataSource?.result}
            enter="preview"
            name={dataSource?.name}
            currentStep={currentStep}
            stepTips={stepTips}
            handleToNextStepTip={onToNextStepTip}
            handleToPreStepTip={onToPreStepTip}
          />
        </div>
      ) : (
        <div
          css={css`
            width: 100%;
            height: 100%;
            background: radial-gradient(
              48% 48% at 43% 14%,
              #f1f6fe 0%,
              #fbfeff 99%
            );
            display: flex;
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
            <div
              css={css`
                display: flex;
                flex-direction: column;
                margin-left: 80px;
                z-index: 10;
              `}
            >
              <span
                css={css`
                  font-size: 48px;
                  font-weight: bold;
                  color: #242424;
                `}
              >
                数据处理
              </span>
              <span
                css={css`
                  font-size: 32px;
                  color: #3d3d3d;
                  margin-top: 28px;
                  min-width: 704px;
                `}
              >
                数据转换：将【中文姓名】转换为【拼音】
              </span>
              <span
                css={css`
                  font-size: 32px;
                  color: #3d3d3d;
                  min-width: 704px;
                `}
              >
                数据计算：通过【身份证号码】计算【年龄】
              </span>
              <Button
                variant="contained"
                onClick={onStartChanllenge}
                css={css`
                  width: 116px;
                  height: 48px;
                  border-radius: 4px;
                  background: #0256ff;
                  font-size: 16px;
                  line-height: 24px;
                  color: #ffffff;
                  margin-top: 60px;
                  :hover {
                    background: #0256ff;
                  }
                `}
              >
                开始挑战
              </Button>
            </div>
            <div
              css={css`
                position: absolute;
                right: 0;
                bottom: 142px;
              `}
            >
              <img
                src={Icon_home}
                css={css`
                  width: 839px;
                  height: 516px;
                `}
              />
            </div>
          </div>
        </div>
      )}
      {currentStep === 12 && (
        <div
          css={css`
            position: absolute;
            left: 0px;
            top: 0px;
            z-index: 1500;
          `}
        >
          <EndPage />
        </div>
      )}
    </div>
  );
}
