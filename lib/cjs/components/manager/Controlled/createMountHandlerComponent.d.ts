import { ComponentType } from "react";
/**Registra un componente dentro de una coleccion donde se controla es estado de dicho componente, asignandole a un EventHandler
 * donde se pueden suscribir varios eventos
 */
export declare function createMountHandlerComponent<T extends JSX.IntrinsicAttributes>(ComponentWithRef: ComponentType<T>, key: string): ComponentType<T>;
