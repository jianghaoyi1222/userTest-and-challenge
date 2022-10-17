/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useCallback, useMemo, useState } from "react";
import { useMatch } from "react-router-dom";
import Icon_phone1 from "src/assets/dataCollection/icon_phone1.png";
import Icon_phone2 from "src/assets/dataCollection/icon_phone2.png";
import Icon_phone3 from "src/assets/dataCollection/icon_phone3.png";
import Icon_phone4 from "src/assets/dataCollection/icon_phone4.png";
import Icon_phone5 from "src/assets/dataCollection/icon_phone5.png";
import Icon_phone6 from "src/assets/dataCollection/icon_phone6.png";
import Icon_phone7 from "src/assets/dataCollection/icon_phone7.png";
import Icon_phone8 from "src/assets/dataCollection/icon_phone8.png";
import Panel from "../panel/Panel";
import CardList from "./components/CardList";

export interface DataListItem {
  id: number;
  price?: string;
  description?: string;
  icon?: string;
  store?: string;
}

export interface StepTipItem {
  index: number;
  tip: String;
}

export default function DataCollection() {
  const [currentStep, setCurrentStep] = useState(1);

  const dataList: DataListItem[] = useMemo(
    () => [
      {
        id: 1,
        price: "3799.00",
        description:
          "Apple iPhone 12 mini (A2400) 64GB 蓝色 手机 支持移动联通电信5G 苹果",
        icon: Icon_phone1,
        store: "苹果旗舰店",
      },
      {
        id: 2,
        price: "1999.00",
        description:
          "荣耀60 SE 120Hz十亿色曲面屏 66W超级快充 6400万Vlog相机 全网通版 ",
        icon: Icon_phone2,
        store: "荣耀旗舰店",
      },
      {
        id: 3,
        price: "3399.00",
        description:
          "荣耀70 IMX800三主摄 双曲屏设计 高通骁龙778G Plus 66W快充 5G手机",
        icon: Icon_phone3,
        store: "荣耀旗舰店",
      },
      {
        id: 4,
        price: "1599.00",
        description:
          "荣耀X30 骁龙6nm疾速5G芯 66W超级快充 120Hz全视屏 全网通版 8GB+",
        icon: Icon_phone4,
        store: "荣耀旗舰店",
      },
      {
        id: 5,
        price: "1599.00",
        description:
          "荣耀X30 骁龙6nm疾速5G芯 66W超级快充 120Hz全视屏 全网通版 8GB+",
        icon: Icon_phone5,
        store: "荣耀旗舰店",
      },
      {
        id: 6,
        price: "1499.00",
        description:
          "荣耀Play6T Pro 天玑810 40W超级快充 6nm疾速芯 4800万超清双摄 全...",
        icon: Icon_phone6,
        store: "荣耀旗舰店",
      },
      {
        id: 7,
        price: "3399.00",
        description:
          "Redmi Note 11 4G FHD+ 90Hz高刷屏 5000万三摄 G88芯片 5000mAh电池",
        icon: Icon_phone7,
        store: "荣耀旗舰店",
      },
      {
        id: 4,
        price: "2549.00",
        description:
          "荣耀70 IMX800三主摄 双曲屏设计 高通骁龙778G Plus 66W快充 5G手机",
        icon: Icon_phone8,
        store: "荣耀旗舰店",
      },
    ],
    []
  );

  const stepTips: StepTipItem[] = useMemo(
    () => [
      {
        index: 1,
        tip: "请点这里开始采集数据~",
      },
      {
        index: 2,
        tip: "请把鼠标悬浮在页面，智能推断页面数据，待高亮时，按住Ctrl并单击一下就可获得~",
      },
      {
        index: 3,
        tip: "实时查看采集的数据，点击【...】可以修改列名、处理数据、提取隐藏链接等更多操作数据的功能 ",
      },
      {
        index: 4,
        tip: "点击这里可直接下载数据到本地~ ",
      },
      {
        index: 5,
        tip: "正在下载数据到本地 ",
      },
    ],
    []
  );

  const onToNextStepTip = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  return (
    <div
      css={css`
        width: 1400px;
        height: 800px;
        background: #cde1fd;
        position: relative;
      `}
    >
      <div
        css={css`
          width: 991px;
          height: 704px;
          position: absolute;
          bottom: 0px;
          left: 20px;
          background: #ffffff;
        `}
      >
        <CardList dataList={dataList} />
      </div>
      <Panel
        open={true}
        handleToNextStepTip={onToNextStepTip}
        stepTips={stepTips}
        currentStep={currentStep}
      />
    </div>
  );
}
