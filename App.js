import GlobalState, {GlobalContext} from './componnets/store';
import Router from "./componnets/router";

export default function App() {
    return (
        <GlobalState>
            <Router/>
        </GlobalState>
    );
}
