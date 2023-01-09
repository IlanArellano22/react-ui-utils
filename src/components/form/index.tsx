import React, { createContext, forwardRef } from "react";
import { ValForm, ValFormAsync } from "@app/types";
import { omit } from "@app/common";

interface FormContext<T = any> {
  value: T | undefined;
  validation: ValForm<T> | ValFormAsync<T>;
  onChange:
    | (<Key extends keyof T>(field: Key, value: T[Key]) => void)
    | undefined;
  props: { [key: string]: any };
}

interface FormManager<T> {
  Form: () => JSX.Element;
  Field: <TProps extends { [k: string]: any }>(
    props: FieldProps<TProps, T>
  ) => JSX.Element;
}

interface FormProps {}

type FieldProps<TProps extends { [k: string]: any }, T> = {
  render: React.ComponentType<TProps>;
  field: keyof T;
  ref?: React.Ref<any>;
} & (Partial<Pick<TProps, "value">> &
  Pick<TProps, Exclude<keyof TProps, "value" | "onChange">> & {
    onChange?: TProps["onChange"] | null;
  });

const FieldControl = forwardRef<FieldProps<any, any>>((props, ref) => {
  return <></>;
});

export function createFormManager<T>(initial: T): FormManager<T> {
  const FormCxt = createContext<FormContext>(
    undefined as unknown as FormContext
  );

  function Form() {
    return <></>;
  }

  function Field<TProps extends { [k: string]: any }>(
    props: FieldProps<TProps, T>
  ) {
    return <FormCxt.Consumer>{(formctx) => <></>}</FormCxt.Consumer>;
  }

  return { Field, Form };
}
