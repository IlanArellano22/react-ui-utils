import React, {
  Component as ReactComponent,
  ComponentState,
  ComponentType,
  Context,
  StaticLifecycle,
  ValidationMap,
  WeakValidationMap,
  useReducer,
  Reducer,
} from "react";
import { ParametersWithoutFistParam, _Object } from "../../types";

interface CustomComponentClass<
  IComponent extends ReactComponent,
  P,
  S = ComponentState
> extends StaticLifecycle<P, S> {
  new (props: P, context?: any): IComponent;
  propTypes?: WeakValidationMap<P> | undefined;
  contextType?: Context<any> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  childContextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}

type MethodsWithInstance<IComponent> = {
  [key: string]: (instance: () => IComponent, ...agrs: any[]) => any;
};
type Methods<
  IComponent,
  IMethodInstance extends MethodsWithInstance<IComponent>
> = {
  [key in keyof IMethodInstance]: (
    ...args: ParametersWithoutFistParam<IMethodInstance[key]>
  ) => ReturnType<IMethodInstance[key]>;
};

export type UncontrolledComponent<P = {}> = {
  Component: ComponentType<P>;
  isInstanceMounted: () => boolean;
};

type UncontolledContextAction = {
  type: string;
  payload: _Object
}

interface UncontrolledContext {
  context: Context<any>;
  reducer: (
    state: _Object,
    action: UncontolledContextAction
  )=> _Object
  initialValues: _Object;
}


interface Options {
  strictMode: boolean;
  contextOptions: UncontrolledContext;
}

const isClassComponent = (component: any) =>
  typeof component === "function" && !!component.prototype.isReactComponent;

/**Provides a React Class Component that internal methods can be malipulated by other React component throught their own instance
 * 
 * @param {IComponent} Comp
 * @param {IMethods} methods
 * @param {Options} options
 * 
 * ```tsx
 * import { Component } from "react";
*import {createUncontrolledClassComponent} from "@ihaz/react-ui-utils";
*
*class ExampleClassComponent extends Component<any, {selector: number}> {
 *   constructor(props: any) {
  *      super(props);
   *     this.state = {
   *         selector: 1
   *     }
   * }
*
 *   getSelector = () => this.state.selector;
 *   changeSelector = (new_selector: number) => this.setState({ selector: new_selector });
*
 *   render() {
  *      return ... //JSX
   * }
*}
*
*
*const UncontrolledExample = createUncontrolledClassComponent(ExampleClassComponent, {
 *   getSelector: (instance) => instance().getSelector(),
 * changeSelector: (instance, new_selector: number) => instance().changeSelector(new_selector),
*});
*
*
*export const Main = () => {
*
 *   const show = () => {
  *      console.log(UncontrolledExample.getSelector()) // 1
   * }
   *   const changeSelector = () => {
  *  UncontrolledExample.changeSelector(2); //Changes internal selector state to 2
  * };
*
 *   return <>
  *  <UncontrolledExample.Component />
   * <button onClick={show}>Show Selector</button>
   * <button onClick={changeSelector}>Change Selector</button>
   * </>
*}
```
 */
export default function createUncontrolledClassComponent<
  IComponent extends ReactComponent<P, S>,
  IMethods extends MethodsWithInstance<IComponent>,
  P = IComponent extends ReactComponent<infer IProps> ? IProps : {},
  S = IComponent extends ReactComponent<any, infer IState>
    ? IState
    : ComponentState
>(
  Comp: CustomComponentClass<IComponent, P, S>,
  methods: IMethods,
  options?: Partial<Options>
): Methods<IComponent, IMethods> & UncontrolledComponent<P> {
  if (!isClassComponent(Comp))
    throw new Error("This Method only allows class components.");

  let instance: IComponent | null = null;
  let store: any = null;

  const getInstance = () => instance;

  const getStore = () => store;

  const handleRef = (x: IComponent | null) => {
    instance = x;
  };

  const isInstanceMounted = () => !!instance;

  const ComponentContextProvider = () => {
    const ctxOptions = options && options.contextOptions
    const ctx = ctxOptions?.context;
    const reducer = ctxOptions?.reducer;
    const initialValues = ctxOptions?.initialValues;
    const [value, dispatch] = useReducer(reducer as Reducer<_Object | undefined, UncontrolledContext>, initialValues);

    store = value;

    return ctx ?
    <ctx.Provider value={value}>

    </ctx.Provider>
  };

  const Component = (props: Readonly<P>) => {
    if (options && options.contextOptions && options.contextOptions.context) {
      const ctx = options.contextOptions.context;
      return (
        <ctx.Provider value={options.contextOptions.initialValues}>
          <Comp {...(props ?? {})} ref={handleRef} />
        </ctx.Provider>
      );
    }
    return <Comp {...(props ?? {})} ref={handleRef} />;
  };

  const final = Object.fromEntries(
    Object.entries(methods).map((method) => {
      const [k, func] = method;
      const newFunc = (...args: ParametersWithoutFistParam<typeof func>) => {
        if (!isInstanceMounted() && (options?.strictMode ?? true))
          throw Error("El componente aun no ha sido inicializado");
        return func(getInstance as () => IComponent, ...args);
      };
      return [k, newFunc];
    })
  ) as Methods<IComponent, IMethods>;

  return { Component, isInstanceMounted, ...final };
}
