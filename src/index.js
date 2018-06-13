import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './allProject'
import Folder from './components/allProject/Folder'
import {
    BrowserRouter as Router,
    Route
    } from 'react-router-dom'

class Main extends Component {
    render() {
        const Folder1 = () => {
            return <Folder />
        }
        const App1 = () => {
            return <App />
        }
        return(
            
            
            <Router>
                <div>
                <Route exact path="/"  component={App1}/>
                <Route path="/folder" component={Folder1}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
