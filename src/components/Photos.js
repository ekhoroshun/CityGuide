import React, { Component } from "react";

import axios from "axios";

class Photos extends Component {
	constructor(props) {
		super(props);
		(this.renderPosts = this.renderPosts.bind(this)),
			(this.state = {
				feed: [],
				loading: true,
				lat: "",
				lon: "",
				url_o: undefined,
        		address: this.props.match.params.cityName
        
			});
	}

	componentDidMount() {
		axios
			.get("https://maps.googleapis.com/maps/api/geocode/json?", {
				params: {
					key: "AIzaSyBaUuQRXKVunMrMPJtu8GK7VX4IzezqPHI",
					address: this.state.address
				}
			})

			.then(res => {
        //console.log(res)
				return axios.get(
					`http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&extras=url_o`,
					{
						params: {
								api_key: "63033ddf7496e5ce06cb329e43ba3656",
								lat: res.data.results[0].geometry.location.lat,
							  lon: res.data.results[0].geometry.location.lng,
							  async: 0,
							  per_page: 6,
							  geo_context: 2,
							  page: 1,
							  accuracy: 11,
							  //is_commons: true
						}
					}
				);
			})
			.then(res => {
        console.log(res)
				this.setState({
          feed: res.data,
          loading: false
				});
			})
			.catch(err => {
				console.log(err);
			});
	
	}

	renderPosts() {
		//console.log(this.state.feed);
		if (this.state.feed.length === 0) {
			return <div>no images were found</div>;
		} else {
			return (
				//console.log(this.state.feed.photos.photo),
				this.state.feed.photos.photo.map((Item, index) => (
					<img key={index} src={Item.url_o} />
				))
			);
		}
	}
	render() {
		return (
			<div>
				{!this.state.loading ? (
					<div>{this.renderPosts()}</div>
				) : (
					<div>Loading images</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		search: state.search
	};
}

export default Photos;
