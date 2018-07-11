import React, { Component } from "react";

import axios from "axios";
import { UncontrolledCarousel } from 'reactstrap';




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
		const pic = [];
		//console.log(this.state.feed);
		if (this.state.feed.length === 0) {
			return <div>no images were found</div>;
		} else  {
			var i;
			//  this.state.feed.photos.photo.map((Item, index) => (
			// 	<img  key={index} style = {{width:500}} src={Item.url_o}/>
			
					
			// 	))
			console.log(this.state.feed.photos)
				for ( i in this.state.feed.photos){
					pic.push({
						src : this.state.feed.photos[i].url_o,
						altText : i ,
						caption: i,
						header: this.state.feed.photos[i].title
					})
				}
				console.log(pic);
				return pic;
				
			
			
		}
	}

	
	render() {
		const items = [
			
			{	
				src: this.renderPosts(),
				altText: 'Slide 1',
				caption: 'Slide 1',
				header: 'Slide 1 Header'
			},
			  
		  ];
		
		const Example = () => <UncontrolledCarousel items={items} />;
		return (
			
  	<div> {
		!this.state.loading ? (
			<div>{<Example />}</div>
		) : (
			<div>Loading images</div>
		)
	  }
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

/*
{!this.state.loading ? (
							<div>{this.renderPosts()}</div>
						) : (
							<div>Loading images</div>
						)}
*/