import Main from "./main/Main";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history';

function App() {
    const history = createBrowserHistory();
    return (
        <BrowserRouter history={history}>
            <Switch>
                <Route path={"/:number"} component={Main}/>
                <Redirect to="/1"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
