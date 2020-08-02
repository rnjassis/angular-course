import { User } from './../user.model';
import * as AuthActionsType from './auth.actions';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: AuthActionsType.AuthActionsType) {
  switch (action.type) {
    case AuthActionsType.AUTHENTICATE_SUCCESS:
      const userLogin = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: userLogin,
        authError: null,
        loading: false
      };
      case AuthActionsType.LOGOUT:
      return {
        ...state,
        user: null
      };
      case AuthActionsType.LOGIN_START:
      case AuthActionsType.SIGNUP_START:
        return {
          ...state,
          authError: null,
          loading: true
        };
      case AuthActionsType.AUTHENTICATE_FAIL:
        return {
          ...state,
          user: null,
          authError: action.payload,
          loading: false
        };
      case AuthActionsType.CLEAR_ERROR:
        return {
          ...state,
          authError: null
        };
    default:
      return state;
  }
}
