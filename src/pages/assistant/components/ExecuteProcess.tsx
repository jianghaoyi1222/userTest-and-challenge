/** @jsx jsx */
import { jsx, css } from "@emotion/react";

export default function ExecuteProcess(props: {
  allNumber?: number;
  completedNumber?: number;
}) {
  const { allNumber, completedNumber } = props;
  return (
    <div
      css={css`
        width: 308px;
        height: 126px;
        border-radius: 4px;
        background: #2c2c2c;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <span
        css={css`
          font-size: 18px;
          color: #00b578;
        `}
      >
        正在执行中...({completedNumber}/{allNumber})
      </span>
    </div>
  );
}
