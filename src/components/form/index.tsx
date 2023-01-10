import React, {
  createContext,
  forwardRef,
  PropsWithChildren,
  useContext,
} from "react";
import { ValForm, ValFormAsync } from "@app/types";
import { ControlView } from "./controlView";

interface FormContext<T = any> {
  value: T | undefined;
  validation: ValForm<T> | ValFormAsync<T>;
  onChange:
    | (<Key extends keyof T>(field: Key, value: T[Key]) => void)
    | undefined;
  props: { [key: string]: any };
}

interface FormManager<T> {
  Form: <T>(props: PropsWithChildren<FormProps<T>>) => JSX.Element;
  Field: <TProps extends { [k: string]: any }>(
    props: FieldProps<TProps, T>
  ) => JSX.Element;
}

interface FormProps<T> {
  onSubmit?: (result: T) => void;
}

export type FieldProps<TProps extends { [k: string]: any }, T> = {
  render: React.ComponentType<TProps>;
  field: keyof T;
  ref?: React.Ref<any>;
} & (Partial<Pick<TProps, "value">> &
  Pick<TProps, Exclude<keyof TProps, "value" | "onChange">> & {
    onChange?: TProps["onChange"] | null;
  });

export function createFormManager<T>(initial: T): FormManager<T> {
  const initialObj: FormContext<T> = {
    value: initial,
    props: {},
    validation: {},
    onChange: () => {},
  };
  const FormCxt = createContext<FormContext>(
    undefined as unknown as FormContext<T>
  );

  function Form<T>(props: PropsWithChildren<FormProps<T>>) {
    return (
      <FormCxt.Provider value={initialObj}>{props.children}</FormCxt.Provider>
    );
  }

  function Field<TProps extends { [k: string]: any }>(
    props: FieldProps<TProps, T>
  ) {
    return (
      <FormCxt.Consumer>
        {(formctx) => {
          function handleChange<Key extends keyof T>(
            key: Key,
            newValue: T[Key]
          ) {}

          return <ControlView {...props} />;
        }}
      </FormCxt.Consumer>
    );
  }

  return { Field, Form };
}
