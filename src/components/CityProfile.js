import React, { Component } from "react";
import Titles from "./Titles";
import Weather from "./Weather";
import axios from "axios";
import { Link } from "react-router-dom";

class CityProfile extends Component {
	constructor(props) {
		super(props);
		//(this.renderPosts = this.renderPosts.bind(this)),
		//console.log(this.props);
		this.state = {
			temperature: "",
			city: this.props.match.params.cityName,
			humidity: "",
			description: "",
			country: "",
			background: [],
			loading: true
		};
	}

	componentDidMount() {
		axios
			.get("http://api.openweathermap.org/data/2.5/weather?", {
				params: {
					appid: "35b385bdfeec2e782e4a1164a0388de6",
					q: this.state.city
				}
			})
			.then(data => {
				this.setState({
					temperature: data.data.main.temp,

					humidity: data.data.main.humidity,
					description: data.data.weather[0].description
				});
			})
			.catch(error => {
				console.log(error);
			});
		axios
			.get("https://api.unsplash.com/search/photos?page=1", {
				params: {
					client_id:
						"f73ef7fd418622289d350a0662c9e0a3724f3fee10d09d265fd76bb511cb6abf",
					query: this.state.city,
					per_page: 1,
					orientation: "landscape"
				}
			})
			.then(res => {
				console.log(res);
				let image = res.data.results[0].urls.full;

				this.setState({
					background: image,
					loading: false
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div
				style={{
					background:
						"url(" + this.state.background + ") no-repeat center center fixed",
					backgroundSize: "cover",
					height: "100%"
				}}
			>
			<div className="container h-100">
				<div className="row rowA">
					<div className="col-12">
						<div className="row rowAA">
							<div className="col">One of three columns</div>
							<div className="col">One of three columns</div>
							<div className="col">One of three columns</div>
						</div>
						<div className="row rowAB" />
					</div>
				</div>
				<div className="row rowB" >
							<div className="col">1</div>
							<div className="col">2</div>
							<div className="col">3</div>
							<div className="col">4</div>
							<div className="col">5</div>
							<div className="col">6</div>
							<div className="col">7</div>
			</div>
			 </div>
			 </div>
		);
	}
}

export default CityProfile;

{/* /* /* <div className = "weatherInfo">	
{this.state.temperature}
{this.state.humidity}
{this.state.city}
{this.state.description}
</div>	
<Link to={`/${this.state.city}/news`}> See some news </Link>
<Link to={`/${this.state.city}/photos`}> See some photos </Link>
</div>			 */  }