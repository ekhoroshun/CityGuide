

import VirtualizedSelect from 'react-virtualized-select'

import React, {Component } from 'react';
import Select from 'react-select';

import { BrowserRouter as Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const DATA = require('./cities');

let displayName = 'CitiesField'

class CitiesField extends Component{
	constructor(props)
	{
		super(props)
			this.selectCity = this.selectCity.bind(this),
			this.state =
			{
				selectValue: undefined,
				
			}
		}
		static propTypes = {
			history: PropTypes.object.isRequired
		  }	

		 

	selectCity (newValue) {
			this.setState({
				selectValue: newValue
			})
			
			 this.props.history.push(`/${ newValue}`)
		
		}

	

	render () {
		const { history } = this.props
		var options = DATA.CITIES;
		return (
			
			<div className="section">
				<h3 className="section-heading">Choose a city </h3>
				<VirtualizedSelect ref="citySelect"
					options={options}
					simpleValue
					clearable
					name="select-city"
					value={this.state.selectValue}
					onChange={this.selectCity} 
					searchable
					labelKey="name"
					valueKey="name"
					
				/>
				
			</div>
		);
	}
}

export default withRouter(CitiesField);