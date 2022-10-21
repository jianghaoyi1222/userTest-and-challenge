/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Button } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { StepTipItem } from "../dataCollection";
import Icon_home from "src/assets/icon_home.png";
import Panel from "../panel/Panel";
import moment from "moment";
import { DataItem } from "../panel/components/DataPanel";
import Icon_xlsx from "src/assets/icon_xlsx.png";
import PreviewTable from "../assistant/components/PreviewTable";

export default function DataProcess() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [startChanllenge, setStartChanllenge] = useState(false);

  const stepTips: StepTipItem[] = useMemo(
    () => [
      {
        index: 1,
        tip: "点这里查看或修改数据 ",
      },
      {
        index: 2,
        tip: "内置大量数据操作函数，满足日常办公需求，简单易用，无需自写公式计算，省时省力~ ",
      },
      {
        index: 3,
        tip: "点这里选择表格中任意一列",
      },
      {
        index: 4,
        tip: "点这里选择欲转换的格式",
      },
      {
        index: 5,
        tip: "实时查看处理结果",
      },
      {
        index: 6,
        tip: "点击确定完成保存",
      },
      {
        index: 7,
        tip: "内置特定数据数据类型的常用函数，选择要处理的函数，即可获得期望数据。例如点击“身份证号码”",
      },
      {
        index: 8,
        tip: "选择“身份证号码”类型的列",
      },
      {
        index: 9,
        tip: "选择“提取年龄”",
      },
      {
        index: 10,
        tip: "可选择是否保留原始列数据，请勾选保留",
      },
      {
        index: 11,
        tip: "点击确定完成保存",
      },
      {
        index: 12,
        tip: "已从身份证中提取年龄",
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
      description: "来自于本地上传文件：人员信息表.xlsx",
      type: "xlsx",
      result: [
        {
          姓名: "金小花",
          性别: "女",
          出生日期: "1998年10月10日",
          身份证号码: "310133199810102...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "李明明",
          性别: "男",
          出生日期: "1990年5月25日",
          身份证号码: "310001199005252...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "李西西",
          性别: "男",
          出生日期: "1996年12月12日",
          身份证号码: "310010199612125...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "俞小可",
          性别: "女",
          出生日期: "2002年1月23日",
          身份证号码: "310008200201232...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "胡小媛",
          性别: "女",
          出生日期: "2000年11月23日",
          身份证号码: "310006200011235...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "孙大轶",
          性别: "男",
          出生日期: "1999年6月21日",
          身份证号码: "310006199906214...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "陈小婷",
          性别: "女",
          出生日期: "1998年8月23日",
          身份证号码: "310005199808234...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "金香香",
          性别: "女",
          出生日期: "1997年9月10日",
          身份证号码: "310003199709101...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "俞可可",
          性别: "女",
          出生日期: "2001年1月25日",
          身份证号码: "310008200101258...",
          地址: "上海市徐汇区定西...",
        },
        {
          姓名: "尤兰达",
          性别: "女",
          出生日期: "2000年10月1日",
          身份证号码: "310003200010012...",
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

  return (
    <div
      css={css`
        width: 1400px;
        height: 800px;
        position: relative;
      `}
    >
      {startChanllenge ? (
        currentStep === 1 ? (
          <div
            css={css`
              width: 100%;
              height: 100%;
              background: #cde1fd;
            `}
          >
            <Panel
              activeTab="data"
              dataList={dataSource}
              currentStep={currentStep}
              stepTips={stepTips}
              handleOpenTable={onOpenTable}
              handleToNextStepTip={onToNextStepTip}
            />
          </div>
        ) : (
          <div
            css={css`
              width: 100%;
              height: 100%;
              background: #cde1fd;
              position: relative;
            `}
          >
            <PreviewTable
              open={open}
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
        )
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
                将表格中【姓名】列数据转换为拼音
              </span>
              <span
                css={css`
                  font-size: 32px;
                  color: #3d3d3d;
                  min-width: 704px;
                `}
              >
                根据表格中【身份证号码】列数据计算出【年龄】
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
    </div>
  );
}
