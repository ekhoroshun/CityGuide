import React, { Component } from 'react';

class Bootstrap extends Component {

    render() {

        return (
            <div className =" h-100">
                 { this.props.children } 
            </div>
        )

    }

}


export default Bootstrap;
