import React, { createContext, PropsWithChildren, PureComponent } from "react";
import { ValForm, ValFormAsync } from "../../types";
import { ControlForm, ControlView } from "./controlView";

interface FormContext<T = any> {
  value: T | undefined;
  validation: ValForm<T> | ValFormAsync<T>;
  onChange:
    | (<Key extends keyof T>(field: Key, value: T[Key]) => void)
    | undefined;
}

interface FormManager<T> {
  Form: <TProps extends { [k: string]: any }>(
    props: PropsWithChildren<FormProps<T, TProps>>
  ) => JSX.Element;
  Field: <TProps extends { [k: string]: any }>(
    props: FieldProps<TProps, T>
  ) => JSX.Element;
}

export type FormProps<T, TProps extends { [k: string]: any }> = {
  render: React.ComponentType<TProps>;
  ref?: React.Ref<any>;
  onSubmit?: (result: T) => void;
} & (Partial<Pick<TProps, "value">> &
  Pick<TProps, Exclude<keyof TProps, "value" | "onChange">> & {
    onChange?: TProps["onChange"] | null;
  });

export type FieldProps<TProps extends { [k: string]: any }, T> = {
  render: React.ComponentType<TProps>;
  field: keyof T;
  ref?: React.Ref<any>;
} & (Partial<Pick<TProps, "value">> &
  Pick<TProps, Exclude<keyof TProps, "value" | "onChange">> & {
    onChange?: TProps["onChange"] | null;
  });

export function createFormManager<T>(initial: T) {
  const FormCxt = createContext<FormContext>(
    undefined as unknown as FormContext<T>
  );

  class Form<TProps extends { [k: string]: any }> extends PureComponent<
    TProps,
    { value: T }
  > {
    constructor(props: TProps) {
      super(props);
      this.state = {
        value: initial,
      };
    }

    handleChange = <Key extends keyof T>(field: Key, value: T[Key]) => {
      console.log("change", field, value);
      this.setState((prev) => ({ ...prev, [field]: value }));
    };

    render() {
      const { value } = this.state;
      return (
        <FormCxt.Provider
          value={{
            value,
            // @ts-ignore: Unreachable code error
            onChange: this.handleChange.bind(this),
            validation: {},
          }}
        >
          <ControlForm {...this.props} />
        </FormCxt.Provider>
      );
    }
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
          ) {
            if (formctx.onChange) formctx.onChange(key, newValue);
          }

          const isDisabled = props.onChange === null || props.disabled;

          return (
            <ControlView
              {...props}
              value={formctx.value[props.field]}
              onChange={!isDisabled && handleChange}
              disabled={isDisabled}
            />
          );
        }}
      </FormCxt.Consumer>
    );
  }

  return { Field, Form };
}
