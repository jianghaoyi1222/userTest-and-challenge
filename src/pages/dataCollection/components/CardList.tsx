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
            margin: 10px;
            box-sizing: border-box;
            border: 1px solid #6ca9ff;
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
              margin-left: 20px;
              font-size: 20px;
              font-weight: 500;
              color: #d34844;
            `}
          >
            ￥{data?.price}
          </span>
          <div
            css={css`
              font-size: 13px;
              color: #666666;
              margin-top: 5px;
              width: 190px;
              height: 40px;
              margin-left: 20px;
              margin-right: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {data?.description}
          </div>
          <span
            css={css`
              margin-left: 20px;
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
