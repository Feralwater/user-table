import Main from "./main/Main";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import style from "./App.module.scss"

function App() {
    return (
        <BrowserRouter>
            <div className={style.container}>
                <Switch>
                    <Route exact path={"/"} component={Main}/>
                    <Route path={"/:number"} component={Main}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
