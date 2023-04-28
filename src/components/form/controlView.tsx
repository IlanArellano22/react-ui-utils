import { Log } from "../../common/log";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { isClientSide, omit } from "../../common";
import { Form, Input } from "./FormComp";
import type { FieldProps, FormProps } from "./index";

export const ControlView = forwardRef<
  any,
  FieldProps<{ [k: string]: any }, any>
>((props) => {
  const Component = props.render;
  const CompProps = useMemo(
    () => omit(props, "field", "render", "value", "onChange"),
    [props]
  );
  const value = (props.value as any)?.[props.field];

  const handleChange = (ev: any) => {
    const value = ev.value || ev.target.value || ev;
    props.onChange(props.field, value);
  };

  if (!Component) {
    if (!isClientSide()) return null;
    return <Input {...CompProps} value={value} onChange={handleChange} />;
  }

  return <Component {...CompProps} value={value} onChange={handleChange} />;
});

export const ControlForm = forwardRef<
  any,
  FormProps<any, { [k: string]: any }>
>((props, ref) => {
  const Component = props.render;
  const [update, setUpdate] = useState<boolean>(false);
  const CompProps = useMemo(
    () => omit(props, "field", "render", "value", "onChange"),
    [props]
  );

  useEffect(() => {
    if (!Component) Log.debug.warn("sdas");
    setUpdate(true);
  }, []);

  const handleSubmit = (ev: any) => {
    console.log({ internalValue: props.value });
    if (ev.preventDefault) ev.preventDefault();
    if (props.onSubmit) props.onSubmit(props.value);
  };

  if (update === false) return null;
  if (!Component) {
    if (isClientSide()) return <Form {...CompProps} onSubmit={handleSubmit} />;
    return <>{props.children}</>;
  }
  return <Component ref={ref} {...CompProps} onSubmit={handleSubmit} />;
});
