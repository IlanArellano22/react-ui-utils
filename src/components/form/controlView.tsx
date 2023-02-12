import React, { forwardRef } from "react";
import { omit } from "../../common";
import type { FieldProps, FormProps } from "./index";

export const ControlView = forwardRef<
  any,
  FieldProps<{ [k: string]: any }, any>
>((props) => {
  const Component = props.render;
  if (!Component)
    throw new Error(
      `El field para la props ${String(
        props.field
      )} no se ha asignado un render para que pueda pintarse`
    );
  const CompProps = omit(props, "field", "render", "value", "onChange");
  const value = (props.value as any)?.[props.field];

  const handleChange = (ev: any) => {
    const value = ev.value || ev.target.value || ev;
    props.onChange(props.field, value);
  };

  return (
    <Component {...CompProps} key={2} value={value} onChange={handleChange} />
  );
});

export const ControlForm = forwardRef<
  any,
  FormProps<any, { [k: string]: any }>
>((props, ref) => {
  const Component = props.render;
  const CompProps = omit(props, "field", "render", "value", "onChange");

  const handleSubmit = (ev: any) => {
    if (ev.preventDefault) ev.preventDefault();
    if (props.onSubmit) props.onSubmit(props.value);
  };

  if (!Component) return <>{props.children}</>;
  return <Component ref={ref} {...CompProps} onSubmit={handleSubmit} />;
});
