/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { TextField } from "@mui/material";
import { StepProps } from "../BatchCreateAssistant";

export default function StyledStepContent(props: StepProps) {
  const { step, preStep } = props;
  return (
    <div
      css={css`
        width: 308px;
        height: 88px;
        background: #2c2c2c;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        padding-right: 12px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >
        <span
          css={css`
            font-size: 12px;
            color: #ffffff;
            line-height: 20px;
            text-align: right;
          `}
        >
          操作步骤：
        </span>

        <TextField
          value={step}
          css={css`
            width: 216px;
            .MuiInputBase-input {
              padding: 4px 12px !important;
              font-size: 14px;
              line-height: 20px;
              height: 28px !important;
              box-sizing: border-box;
              background: #3d3d3d;
              color: #ffffff;
              border-radius: 4px;
            }
          `}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin-top: 8px;
          align-items: center;
        `}
      >
        <span
          css={css`
            font-size: 12px;
            color: #ffffff;
            line-height: 20px;
            text-align: right;
          `}
        >
          上一步：
        </span>
        <TextField
          value={preStep}
          css={css`
            width: 216px;
            .MuiInputBase-input {
              padding: 4px 12px !important;
              font-size: 14px;
              line-height: 20px;
              height: 28px !important;
              box-sizing: border-box;
              background: #3d3d3d;
              color: #ffffff;
              border-radius: 4px;
            }
          `}
        />
      </div>
    </div>
  );
}
