/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button } from "@mui/material";
import { useCallback } from "react";

export default function EndPage() {
  const onViewMore = useCallback(() => {
    window.parent.postMessage({ isClosed: true }, "*");
  }, []);

  const onJumpPage = useCallback(() => {
    window.parent.location.href =
      "https://www.encoo.com/new-automate.cn-download";
  }, []);

  return (
    <div
      css={css`
        width: 1400px;
        height: 800px;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
    >
      <span
        css={css`
          font-size: 64px;
          font-weight: 900;
          color: #ffffff;
        `}
      >
        恭喜完成～
      </span>
      <div
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 45px;
        `}
      >
        <Button
          css={css`
            width: 160px;
            height: 64px;
            background: #cde1fd;
            box-sizing: border-box;
            border: 2px solid rgba(54, 98, 236, 0.7);
            color: #3662ec;
            font-size: 24px;
            font-weight: 500;
            border-radius: 4px;
            :hover {
              background: #cde1fd;
            }
          `}
          onClick={onViewMore}
        >
          查看更多
        </Button>
        <Button
          css={css`
            width: 160px;
            height: 64px;
            background: #3662ec;
            box-sizing: border-box;
            border: 2px solid #3662ec;
            color: #ffffff;
            font-size: 24px;
            font-weight: 500;
            border-radius: 4px;
            margin-left: 40px;
            :hover {
              background: #3662ec;
            }
          `}
          onClick={onJumpPage}
        >
          立即使用
        </Button>
      </div>
    </div>
  );
}
