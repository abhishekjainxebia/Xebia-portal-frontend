import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
 
export class App extends React.Component {
    
    render() {
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </div>
        )
    } 
    
}