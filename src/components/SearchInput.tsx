/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { TextField, TextFieldProps } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon_search from "src/assets/icon_search.png";

export interface SearchInputProps
  extends Omit<TextFieldProps, "prefix" | "className" | "onChange" | "value"> {
  prefix?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  value?: string;
  onSearch?: (value: string) => void;
}

export default React.memo(function SearchInput(props: SearchInputProps) {
  const { className, width, height, placeholder, onSearch, value } = props;

  const [internalValue, setInternalValue] = useState<string | undefined>("");
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setInternalValue(value), [value]);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
  }, []);

  const onInternalSearch = useCallback(() => {
    if (value !== internalValue) {
      onSearch?.(internalValue ?? "");
    }
  }, [internalValue, onSearch, value]);

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const onEnter = useCallback(() => {
    inputRef.current?.blur();
    setIsFocus(false);
    onSearch?.(internalValue ?? "");
  }, [inputRef]);

  useEffect(() => {
    const keyDownHandler = (event: {
      key: string;
      preventDefault: () => void;
    }) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (isFocus) {
          onEnter();
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [isFocus]);

  return (
    <TextField
      css={css`
        width: 296px;
        height: 36px;
        background: #f8f8f9;
        border-radius: 4px;
        .MuiOutlinedInput-root {
          fieldset {
            border-color: #f8f8f9;
          }
        }
      `}
      inputRef={inputRef}
      className={className}
      value={internalValue || ""}
      onChange={onChange}
      onBlur={onInternalSearch}
      onFocus={handleFocus}
      size={"small"}
      placeholder={placeholder ?? "搜索"}
      id="margin-none"
      sx={{
        width: width ?? 300,
      }}
      InputProps={{
        sx: { height: `${height ?? 36}px` },
        startAdornment: props.prefix ?? (
          <img
            css={css`
              width: 18px;
              height: 18px;
              margin-right: 14px;
            `}
            src={Icon_search}
          />
        ),
      }}
    />
  );
});
