import React, { createContext } from "react";
import { ValForm, ValFormAsync } from "@app/types";

interface FormContext<T = any> {
  value: T | undefined;
  validation: ValForm<T> | ValFormAsync<T>;
  onChange:
    | (<Key extends keyof T>(field: Key, value: T[Key]) => void)
    | undefined;
  props: { [key: string]: any };
}

interface FormManager {
  Form: () => JSX.Element;
  Field: () => JSX.Element;
}

export function createFormManager(): FormManager {
  const FormCxt = createContext<FormContext>(
    undefined as unknown as FormContext
  );

  function Form() {
    return <></>;
  }

  function Field() {
    return <></>;
  }

  return { Field, Form };
}
