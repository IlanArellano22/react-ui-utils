import { Component, ComponentState, Context, StaticLifecycle, ValidationMap, WeakValidationMap } from "react";
import { ParametersWithoutFistParam } from "../../types";
interface CustomComponentClass<IComponent extends Component, P, S = ComponentState> extends StaticLifecycle<P, S> {
    new (props: P, context?: any): IComponent;
    propTypes?: WeakValidationMap<P> | undefined;
    contextType?: Context<any> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    childContextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
type MethodsWithInstance<IComponent> = {
    [key: string]: (instance: IComponent, ...agrs: any[]) => any;
};
type Methods<IComponent, IMethodInstance extends MethodsWithInstance<IComponent>> = {
    [key in keyof IMethodInstance]: (...args: ParametersWithoutFistParam<IMethodInstance[key]>) => ReturnType<IMethodInstance[key]>;
};
export type UncontrolledComponent<P> = {
    Component: (props: P) => JSX.Element;
    isInstanceMounted: () => boolean;
};
/**Genera una React Class Component cuyos methodos pueden ser manipulados por otros componentes sin necesidad de estar controlado por props */
export default function createUncontrolledClassComponent<IComponent extends Component<P, S>, IMethods extends MethodsWithInstance<IComponent>, P = {}, S = ComponentState>(Comp: CustomComponentClass<IComponent, P, S>, methods: IMethods): Methods<IComponent, IMethods> & UncontrolledComponent<P>;
export {};
