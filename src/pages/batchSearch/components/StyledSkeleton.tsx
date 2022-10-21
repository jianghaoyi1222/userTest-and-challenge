/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Skeleton } from "@mui/material";

export default function StyledSkeleton() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        margin-top: 24px;
      `}
    >
      <Skeleton
        variant="rectangular"
        animation={false}
        width={80}
        height={102}
        css={css`
          border-radius: 8px;
          margin-right: 8px;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        `}
      >
        <Skeleton
          variant="rectangular"
          animation={false}
          width={142}
          height={22}
          css={css`
            border-radius: 4px;
          `}
        />
        <Skeleton
          variant="rectangular"
          animation={false}
          width={57}
          height={16}
          css={css`
            border-radius: 4px;
          `}
        />
        <Skeleton
          variant="rectangular"
          animation={false}
          width={57}
          height={16}
          css={css`
            border-radius: 4px;
          `}
        />
        <Skeleton
          variant="rectangular"
          animation={false}
          width={743}
          height={16}
          css={css`
            border-radius: 4px;
          `}
        />
      </div>
    </div>
  );
}
