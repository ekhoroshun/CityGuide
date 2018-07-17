import React, { Component } from "react";
import axios from "axios";
import { UncontrolledCarousel } from 'reactstrap';

class Photos extends Component {

	constructor(props) {

		super(props);
		this.state = {
			feed: [],
			loading: false,
			address: this.props.match.params.cityName
		}

	}

	componentDidMount() {

		axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
				params: {
					key: "AIzaSyBaUuQRXKVunMrMPJtu8GK7VX4IzezqPHI",
					address: this.state.address
				}
			}).then(res => {
				//axios.get(`https://api.pexels.com/v1/search?`,
				axios.get(`http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&extras=url_o`,
					{
						params: {
							api_key: "63033ddf7496e5ce06cb329e43ba3656",
							lat: res.data.results[0].geometry.location.lat,
							lon: res.data.results[0].geometry.location.lng,
							async: 0,
							per_page: 6,
							//geo_context: 2,
							page: 1						
						}
					}
				).then(res => {
					console.log("flickr success", res);

					if(res.data.photos.photo.length == 0) {

						// no pics situation
						this.setState({
							feed: [],
							loading: false
						});

						return; // end here
					}

					// if this spot is hit it means there are some pics we can work with

					let pics = []

					for(var i in res.data.photos.photo) {
		
						pics.push({
							
							src: res.data.photos.photo[i]["url_o"],
							altText: res.data.photos.photo[i]["title"],
							caption: '',
							header: res.data.photos.photo[i]["title"]
						});

					}

					this.setState({
						feed: pics,
						loading: false
					});

				}).catch(err => {
					console.log("flickr error", err);
				})

			}).catch(err => {
				console.log("googleapis error", err);
			});
	
	}

	renderPics() {

		if(this.state.loading) {

			return (<div>Loading images</div>) // images are loading (state 1)
			
		} else if(!this.state.loading && this.state.feed.length == 0) {

			return (<div>No images</div>) // images are done loading, but no pics are found

		} else {

			return (<UncontrolledCarousel items={this.state.feed} />) // loaded and pics are present

		}

	}

	render() {
		return (
			<div className = "container-fluid h-100">
			<div>{this.renderPics()}</div>
			</div>
		)
	}

}


export default Photos;