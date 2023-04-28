import React, {
  createContext,
  PureComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ItemManager } from "../../types/validation";
import { ValForm, ValFormAsync } from "../../types";
import { ControlForm, ControlView } from "./controlView";
import { EventHandler, getEventId } from "../../common/classes/EventHandler";

interface FormContext<T = any> {
  value: T | undefined;
  validation: ValForm<T> | ValFormAsync<T>;
  onChange:
    | (<Key extends keyof T>(field: Key, value: T[Key]) => void)
    | undefined;
  itemManager: ItemManager<T, "change">;
}

export type FormProps<T, TProps extends { [k: string]: any }> = {
  render?: React.ComponentType<TProps>;
  ref?: React.Ref<any>;
  onSubmit?: (result: T) => void;
} & (Partial<Pick<TProps, "value">> &
  Pick<TProps, Exclude<keyof TProps, "value" | "onChange">> & {
    onChange?: TProps["onChange"] | null;
  });

export type FieldProps<TProps extends { [k: string]: any }, T> = {
  render?: React.ComponentType<TProps>;
  field: keyof T;
  ref?: React.Ref<any>;
} & (Partial<Pick<TProps, "value">> &
  Pick<TProps, Exclude<keyof TProps, "value" | "onChange">> & {
    onChange?: TProps["onChange"] | null;
  });

type Events = "change";

const initialFormCtx: FormContext = {
  value: undefined,
  itemManager: {
    addEventListenner: () => {},
    removeEventListenner: () => {},
  },
  onChange: undefined,
  validation: {},
};

export function createFormManager<T>(initial: T) {
  const FormCxt = createContext<FormContext<T>>(
    initialFormCtx as FormContext<T>
  );

  class Form<TProps extends { [k: string]: any }> extends PureComponent<
    FormProps<T, TProps>,
    { value: T }
  > {
    private event: EventHandler<T>;
    constructor(props: FormProps<T, TProps>) {
      super(props);
      this.state = {
        value: initial,
      };
      this.event = new EventHandler<T>();
    }

    handleChange = <Key extends keyof T>(field: Key, value: T[Key]) => {
      console.log("change", field, value);
      const newValue = { ...this.state.value, [field]: value };
      this.setState(() => ({ value: newValue }));
      const id = getEventId("change");
      this.event.setSelectedId(id);
      this.event.listen(newValue);
    };

    addEventListenner(event: Events, fn: (value: T) => void) {
      const id = getEventId(event);
      this.event.setSelectedId(id);
      this.event.suscribe((value) => fn(value as T), id);
    }

    removeEventListenner(event: Events) {
      const id = getEventId(event);
      this.event.clear(id);
    }

    render() {
      const { value } = this.state;
      console.log({ formValue: value });
      return (
        <FormCxt.Provider
          value={{
            value,
            // @ts-ignore: Unreachable code error
            onChange: this.handleChange.bind(this),
            validation: {},
            itemManager: {
              addEventListenner: this.addEventListenner.bind(this),
              removeEventListenner: this.removeEventListenner.bind(this),
            },
          }}
        >
          <ControlForm {...this.props} value={value} />
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
              value={formctx.value?.[props.field]}
              onChange={!isDisabled && handleChange}
              disabled={isDisabled}
            />
          );
        }}
      </FormCxt.Consumer>
    );
  }

  function useFormValue() {
    const { value: FormValue, itemManager } = useContext(FormCxt);
    const [value, setValue] = useState(() => FormValue);

    useEffect(() => {
      itemManager.addEventListenner("change", (newValue) => {
        setValue(newValue);
      });

      return () => {
        itemManager.removeEventListenner("change");
      };
    }, []);

    return { value };
  }

  return { Field, Form, useFormValue };
}
