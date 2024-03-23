import PropTypes                            from "prop-types";
import React, { createContext, useReducer } from "react";
import { reducer }                          from "./reducers/index";
import { initialState }                     from "./reducers/initialState"

/** Global context */
export const GlobalContext = createContext();

function GlobalState(props) {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={ [globalState, dispatch] }>
      { props.children }
    </GlobalContext.Provider>
  );
}

GlobalState.prototype = {
  initialState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default GlobalState;
