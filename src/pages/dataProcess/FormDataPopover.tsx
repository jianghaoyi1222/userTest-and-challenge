/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { StepTipItem, StyledTooltip } from "../dataCollection";

export default function FormDataPopover(props: {
  value?: string | undefined;
  featureValue?: string | undefined;
  currentStep?: number;
  stepTips?: StepTipItem[];
  styled?: { right: string; bottom: string };
  type?: string;
  checked?: boolean;

  onChange?: (value?: string) => void;
  handleToNextStepTip?: () => void;
  onChangeFunction?: (value: string) => void;
  handleConfirm?: () => void;
  handleClose?: () => void;
  handleChecked?: () => void;
  handleFocus?: () => void;
}) {
  const {
    value,
    featureValue,
    currentStep,
    stepTips,
    styled = { right: "150px", bottom: "310px" },
    type = "pinyin",
    checked,
    onChange,
    handleToNextStepTip,
    onChangeFunction,
    handleConfirm,
    handleClose,
    handleChecked,
    handleFocus,
  } = props;

  const columns = useMemo(
    () => [
      { label: "姓名", value: "姓名" },
      { label: "性别", value: "性别" },
      { label: "出生日期", value: "出生日期" },
      { label: "身份证号码", value: "身份证号码" },
      { label: "地址", value: "地址" },
    ],
    []
  );

  const onhandleChange = useCallback(
    (event: any) => {
      const selectValue = columns.filter(
        (item) => item.value === event.target.value
      )[0]?.value;
      onChange?.(selectValue);
      handleToNextStepTip?.();
    },
    [columns, onChange, handleToNextStepTip]
  );

  const onhandleFunctionChange = useCallback(
    (event: any) => {
      handleToNextStepTip?.();
      onChangeFunction?.(event.target.value);
    },
    [handleToNextStepTip, onChangeFunction]
  );

  const onCancel = useCallback(() => {
    handleClose?.();
  }, [handleClose]);

  const onConfirm = useCallback(() => {
    handleToNextStepTip?.();
    handleConfirm?.();
  }, [handleToNextStepTip, handleConfirm]);

  return (
    <div
      css={css`
        display: flex;
        position: absolute;
        right: ${styled.right};
        bottom: ${styled.bottom};
        width: 280px;
        height: 282px;
        border-radius: 6px;
        background: #ffffff;
        box-shadow: 0px 6px 16px -8px rgba(0, 0, 0, 0.08),
          0px 9px 28px 0px rgba(0, 0, 0, 0.05),
          0px 12px 48px 16px rgba(0, 0, 0, 0.03);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 60;
      `}
    >
      {type === "pinyin" &&
        (currentStep === 2 ? (
          <StyledTooltip
            open={true}
            arrow
            placement="left"
            title={
              stepTips?.filter(
                (tip: StepTipItem) => tip.index === currentStep
              )[0]?.tip
            }
          >
            <TextField
              variant="outlined"
              label="选择列"
              select
              value={value}
              placeholder="请选择"
              onChange={onhandleChange}
              onFocus={handleFocus}
              onBlur={handleFocus}
              css={css`
                width: 240px;
                .MuiOutlinedInput-root {
                  height: 56px !important ;
                }
                .MuiInputBase-input {
                  padding: 7px 12px;
                  font-size: 16px;
                  color: #767676;
                }
                fieldset {
                  border-color: #dcdee2;
                }
                margin-top: 20px;
              `}
            >
              {columns?.map((column, index) => (
                <MenuItem key={index} value={column?.value}>
                  {column.label}
                </MenuItem>
              ))}
            </TextField>
          </StyledTooltip>
        ) : (
          <TextField
            variant="outlined"
            label="选择列"
            select
            value={value}
            placeholder="请选择"
            onChange={onhandleChange}
            css={css`
              width: 240px;
              .MuiOutlinedInput-root {
                height: 56px !important ;
              }
              .MuiInputBase-input {
                padding: 7px 12px;
                font-size: 16px;
                color: #767676;
              }
              fieldset {
                border-color: #dcdee2;
              }
              margin-top: 20px;
            `}
          >
            {columns?.map((column, index) => (
              <MenuItem key={index} value={column?.value}>
                {column.label}
              </MenuItem>
            ))}
          </TextField>
        ))}
      {type === "pinyin" &&
        (currentStep === 3 ? (
          <StyledTooltip
            open={true}
            arrow
            placement="left"
            title={
              stepTips?.filter(
                (tip: StepTipItem) => tip.index === currentStep
              )[0]?.tip
            }
          >
            <TextField
              variant="outlined"
              label="转换为"
              select
              value={featureValue}
              placeholder="请选择"
              onChange={onhandleFunctionChange}
              css={css`
                width: 240px;
                .MuiOutlinedInput-root {
                  height: 56px !important ;
                }
                .MuiInputBase-input {
                  padding: 7px 12px;
                  font-size: 16px;
                  color: #767676;
                }
                fieldset {
                  border-color: #dcdee2;
                }
                margin-top: 20px;
              `}
            >
              <MenuItem value="拼音">拼音</MenuItem>
            </TextField>
          </StyledTooltip>
        ) : (
          <TextField
            variant="outlined"
            label="转换为"
            select
            value={featureValue}
            placeholder="请选择"
            onChange={onhandleFunctionChange}
            css={css`
              width: 240px;
              .MuiOutlinedInput-root {
                height: 56px !important ;
              }
              .MuiInputBase-input {
                padding: 7px 12px;
                font-size: 16px;
                color: #767676;
              }
              fieldset {
                border-color: #dcdee2;
              }
              margin-top: 20px;
            `}
          >
            <MenuItem value="拼音">拼音</MenuItem>
          </TextField>
        ))}

      {type === "cardID" &&
        (currentStep === 7 ? (
          <StyledTooltip
            open={true}
            arrow
            placement="left"
            title={
              stepTips?.filter(
                (tip: StepTipItem) => tip.index === currentStep
              )[0]?.tip
            }
          >
            <TextField
              variant="outlined"
              label="选择列"
              select
              value={value}
              placeholder="请选择"
              onFocus={handleFocus}
              onBlur={handleFocus}
              onChange={onhandleChange}
              css={css`
                width: 240px;
                .MuiOutlinedInput-root {
                  height: 56px !important ;
                }
                .MuiInputBase-input {
                  padding: 7px 12px;
                  font-size: 16px;
                  color: #767676;
                }
                fieldset {
                  border-color: #dcdee2;
                }
                margin-top: 20px;
              `}
            >
              {columns?.map((column, index) => (
                <MenuItem key={index} value={column?.value}>
                  {column.label}
                </MenuItem>
              ))}
            </TextField>
          </StyledTooltip>
        ) : (
          <TextField
            variant="outlined"
            label="选择列"
            select
            value={value}
            placeholder="请选择"
            onChange={onhandleChange}
            css={css`
              width: 240px;
              .MuiOutlinedInput-root {
                height: 56px !important ;
              }
              .MuiInputBase-input {
                padding: 7px 12px;
                font-size: 16px;
                color: #767676;
              }
              fieldset {
                border-color: #dcdee2;
              }
              margin-top: 20px;
            `}
          >
            {columns?.map((column, index) => (
              <MenuItem key={index} value={column?.value}>
                {column.label}
              </MenuItem>
            ))}
          </TextField>
        ))}
      {type === "cardID" &&
        (currentStep === 8 ? (
          <StyledTooltip
            open={true}
            arrow
            placement="left"
            title={
              stepTips?.filter(
                (tip: StepTipItem) => tip.index === currentStep
              )[0]?.tip
            }
          >
            <TextField
              variant="outlined"
              label="函数"
              select
              value={featureValue}
              placeholder="请选择"
              onChange={onhandleFunctionChange}
              css={css`
                width: 240px;
                .MuiOutlinedInput-root {
                  height: 56px !important ;
                }
                .MuiInputBase-input {
                  padding: 7px 12px;
                  font-size: 16px;
                  color: #767676;
                }
                fieldset {
                  border-color: #dcdee2;
                }
                margin-top: 20px;
              `}
            >
              <MenuItem value="提取年龄">提取年龄</MenuItem>
            </TextField>
          </StyledTooltip>
        ) : (
          <TextField
            variant="outlined"
            label="函数"
            select
            value={featureValue}
            placeholder="请选择"
            onChange={onhandleFunctionChange}
            css={css`
              width: 240px;
              .MuiOutlinedInput-root {
                height: 56px !important ;
              }
              .MuiInputBase-input {
                padding: 7px 12px;
                font-size: 16px;
                color: #767676;
              }
              fieldset {
                border-color: #dcdee2;
              }
              margin-top: 20px;
            `}
          >
            <MenuItem value="提取年龄">提取年龄</MenuItem>
          </TextField>
        ))}

      <div
        css={css`
          margin-top: 20px;
          width: 240px;
        `}
      >
        {currentStep === 9 ? (
          <StyledTooltip
            open={true}
            arrow
            placement="bottom"
            title={
              stepTips?.filter(
                (tip: StepTipItem) => tip.index === currentStep
              )[0]?.tip
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="checked"
                  checked={checked}
                  onChange={handleChecked}
                  css={css`
                    color: #c3cdd9;
                    padding: 0px;
                    margin-right: 12px;
                  `}
                  sx={{
                    "&.Mui-checked": {
                      color: "#ffcc00",
                    },
                  }}
                />
              }
              label={
                <Typography
                  css={css`
                    font-size: 16px;
                    line-height: 24px;
                    color: #1a1a1a;
                  `}
                >
                  保留原始数据
                </Typography>
              }
              css={css`
                margin-left: 0px !important;
              `}
            />
          </StyledTooltip>
        ) : (
          <FormControlLabel
            control={
              <Checkbox
                name="checked"
                checked={checked}
                // onChange={handleChecked}
                css={css`
                  color: #c3cdd9;
                  padding: 0px;
                  margin-right: 12px;
                `}
                sx={{
                  "&.Mui-checked": {
                    color: "#ffcc00",
                  },
                }}
              />
            }
            label={
              <Typography
                css={css`
                  font-size: 16px;
                  line-height: 24px;
                  color: #1a1a1a;
                `}
              >
                保留原始数据
              </Typography>
            }
            css={css`
              margin-left: 0px !important;
            `}
          />
        )}
      </div>
      <div
        css={css`
          width: 240px;
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
        `}
      >
        <Button
          css={css`
            color: #151515;
            border: 1px solid #dcdee2;
          `}
          onClick={onCancel}
        >
          取消
        </Button>
        {currentStep === 5 ? (
          <StyledTooltip
            open={true}
            arrow
            placement="bottom"
            title={
              stepTips?.filter(
                (tip: StepTipItem) => tip.index === currentStep
              )[0]?.tip
            }
          >
            <Button
              css={css`
                margin-left: 16px;
                border-radius: 4px;
                background: #ffcc00;
                color: #151515;
                :hover {
                  background: #ffcc00;
                }
              `}
              onClick={onConfirm}
            >
              确定
            </Button>
          </StyledTooltip>
        ) : currentStep === 10 ? (
          <StyledTooltip
            open={true}
            arrow
            placement="bottom"
            title={
              stepTips?.filter(
                (tip: StepTipItem) => tip.index === currentStep
              )[0]?.tip
            }
          >
            <Button
              css={css`
                margin-left: 16px;
                border-radius: 4px;
                background: #ffcc00;
                color: #151515;
                :hover {
                  background: #ffcc00;
                }
              `}
              onClick={onConfirm}
            >
              确定
            </Button>
          </StyledTooltip>
        ) : (
          <Button
            css={css`
              margin-left: 16px;
              border-radius: 4px;
              background: #ffcc00;
              color: #151515;
              :hover {
                background: #ffcc00;
              }
            `}
          >
            确定
          </Button>
        )}
      </div>
    </div>
  );
}
