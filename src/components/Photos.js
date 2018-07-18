import React, { Component } from "react";
import axios from "axios";
import { UncontrolledCarousel } from 'reactstrap';


let tokenStr = '563492ad6f917000010000015de6fbde025c4bedae89b91132f70401';

class Photos extends Component {

	constructor(props) {

		super(props);
		this.state = {
			feed: [],
			loading: false,
			city: this.props.match.params.cityName
		}

	}

	componentDidMount() {

		
				axios.get(`https://api.pexels.com/v1/search?`,
				//axios.get(`http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&extras=url_o`,
					{   crossdomain: true,
						headers: {"Authorization" : `Bearer ${tokenStr}`},
						params: {
							
							query: this.state.city,
							per_page: 15,
							page: 1
													
						}
					}
				).then(res => {
					console.log("pexel success", res);

					if(res.data.photos.length == 0) {

						// no pics situation
						this.setState({
							feed: [],
							loading: false
						});

						return; // end here
					}

					// if this spot is hit it means there are some pics we can work with

					let pics = []

					for(var i in res.data.photos) {
		
						pics.push({
							
							src: res.data.photos[i].src["landscape"],
							altText: res.data.photos[i]["photographer"],
							caption: '',
							header: res.data.photos[i]["photographer"]
						});

					}

					this.setState({
						feed: pics,
						loading: false
					});

				}).catch(err => {
					console.log("pexel error", err);
				})

			
	
	}

	renderPics() {

		if(this.state.loading) {

			return (<div className="container warning">Loading images</div>) // images are loading (state 1)
			
		} else if(!this.state.loading && this.state.feed.length == 0) {

			return (<div className="container warning">No images</div>) // images are done loading, but no pics are found

		} else {

			return (<UncontrolledCarousel  items={this.state.feed} />) // loaded and pics are present

		}

	}
	

	render() {
		return (
			 <div
			className="backgrPhotos"
		 					>
			<div className = "container h-100">

			<div className = "row">
			
			<div className = "col">
	
			<div className="buttonBack"> <a href={`/${this.state.city}`} > &laquo; Back</a>
			
			 </div>

			<div> {this.renderPics()}
			
			
			</div>
			 {/* <div> <a href="" class="previous">&laquo; Previous</a> </div> */}
			</div>
			</div>
			</div>
			</div>
		)
	}

}


export default Photos;