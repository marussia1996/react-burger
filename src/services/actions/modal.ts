export const OPEN_MODAL: 'OPEN_MODAL' = "OPEN_MODAL";
export const CLOSE_MODAL: 'CLOSE_MODAL' = "CLOSE_MODAL";

export interface IOpenModal{
    readonly type: typeof OPEN_MODAL;
}
export interface ICloseModal{
    readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModal | ICloseModal;