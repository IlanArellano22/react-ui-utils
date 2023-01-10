import React from "react";
import { omit } from "@app/common";
import type { FieldProps } from "./index";

export function ControlView<T>(props: FieldProps<{ [k: string]: any }, T>) {
  const Component = props.render;
  const CompProps = omit(props, "field", "render", "value", "onChange");
  const value = (props.value as any)?.[props.field];

  const handleChange = (ev: any) => {
    props.onChange(ev);
  };

  return (
    <Component key={2} value={value} onChange={handleChange} {...CompProps} />
  );
}
