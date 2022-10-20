/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export default function StyledAnimation() {
  return (
    <div
      css={css`
        width: 10px;
        height: 10px;
        background: #ffffff;
        position: relative;
        border: 1px solid #ffffff;
        border-radius: 100%;
        -webkit-animation: ping 0.8s ease-in-out infinite both;
        animation: ping 0.8s ease-in-out infinite both;
        @-webkit-keyframes ping {
          0% {
            -webkit-transform: scale(0.2);
            transform: scale(0.2);
            opacity: 0.8;
          }
          80% {
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
            opacity: 0;
          }
          100% {
            -webkit-transform: scale(2.2);
            transform: scale(2.2);
            opacity: 0;
          }
        }
        @keyframes ping {
          0% {
            -webkit-transform: scale(0.2);
            transform: scale(0.2);
            opacity: 0.8;
          }
          80% {
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
            opacity: 0;
          }
          100% {
            -webkit-transform: scale(2.2);
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}
    />
  );
}
