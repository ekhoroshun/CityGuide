import react from "react";
import axios from "axios";
import { BrowserRouter as Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'


class Maps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: this.props.match.params.cityName,
			lat: "",
			lng: ""
		};
    }
    static propTypes = {
        history: PropTypes.object.isRequired
      }	

	ComponentWillUnmount() {
		this._mounted = false;
	}

	ComponentDidMount() {
		this._mounted = true;

		axios
			.get(
				"https://maps.googleapis.com/maps/api/geocode/json?address=torontoA&key=AIzaSyBaUuQRXKVunMrMPJtu8GK7VX4IzezqPHI",
				{
					params: {
						key: "AIzaSyBaUuQRXKVunMrMPJtu8GK7VX4IzezqPHI",
						address: this.state.address
					}
				}
			)
			.then(res => {
				if (this._mounted) {
					this.setState({
						lat: res.results.address_components.geometry.location.lat,
						lng: res.results.address_components.geometry.location.lng
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return <div> map</div>;
	}
}

export default withRouter(Maps);