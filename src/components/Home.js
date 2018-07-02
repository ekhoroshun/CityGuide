import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CitiesField from './CitiesField';
class Home extends Component {

    constructor(props) {

        super(props);
        
        this.state = {}

    } 

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        
        return (
            <div> <CitiesField /></div>
        )
        
    }

}

function mapStateToProps(state) {

    return { 
        app: state.app
    };
    
}


export default connect(mapStateToProps, {})(Home);