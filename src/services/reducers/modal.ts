import { OPEN_MODAL, CLOSE_MODAL, TModalActions } from "../actions/modal";
//тип исходного состояния
type TInitialState = {
  isOpened: boolean;
};
// Исходное состояние
const initialState = {
  isOpened: false,
};
export const modalReducer = (state = initialState, action: TModalActions) : TInitialState => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isOpened: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isOpened: false,
      };
    }
    default: {
      return state;
    }
  }
};
