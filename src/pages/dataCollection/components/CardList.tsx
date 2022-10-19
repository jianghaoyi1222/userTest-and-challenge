/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { DataListItem } from "..";

export default function CardList(props: { dataList?: DataListItem[] }) {
  const { dataList } = props;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
      `}
    >
      {dataList?.map((data: DataListItem, index: number) => (
        <div
          key={index}
          css={css`
            width: 220px;
            height: 321px;
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            margin-left: 20px;
          `}
        >
          <img
            src={data?.icon}
            css={css`
              width: 220px;
              height: 220px;
            `}
          />
          <span
            css={css`
              font-size: 20px;
              font-weight: 500;
              color: #d34844;
            `}
          >
            ￥{data?.price}
          </span>
          <span
            css={css`
              font-size: 13px;
              color: #666666;
              margin-top: 5px;
            `}
          >
            {data?.description}
          </span>
          <span
            css={css`
              font-size: 13px;
              color: #999999;
              margin-top: 10px;
            `}
          >
            {data?.store}
          </span>
        </div>
      ))}
    </div>
  );
}
