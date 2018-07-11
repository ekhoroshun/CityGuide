import React, { Component } from "react";
import axios from "axios";

const token = "a6630856-70e3-434f-9322-b3d291330ab4";

class News extends Component {
	constructor(props) {
		super(props);

		this.state = {
			feed: [],
			q: this.props.match.params.cityName
		};
  }
  
	componentWillUnmount() {
		this._mounted = false;
	}

	componentDidMount() {
		this._mounted = true;

		axios.get('http://webhose.io/filterWebContent?token=a6630856-70e3-434f-9322-b3d291330ab4&format=json&ts=1530911706297&sort=relevancy&q=' + this.state.q + '%20rating%3A%3E4')

			.then(res => {

	        	if (this._mounted) {
					this.setState({
						feed: res.data.posts
					});
				}

			}).catch(error => {

				console.log(error);

			});
	
	}

	renderImage(thread) {

		if(thread.main_image) {
			return (
				<a href={ thread.site_section } target="_blank"><img src={thread.main_image}/></a>
			)
		} else {
			return <a href={ thread.site_section } target="_blank"><img src="https://placekitten.com/200/200"/></a>
		}
	}


	renderPosts() {

		if (this.state.feed.length === 0) {

			return <div>no news was found</div>;

		} else {

			return (

				
                this.state.feed.map(

                    (Post) =>
                        <div key={Post.uuid}>
                        	{ Post.thread.title_full }
                        	{ this.renderImage(Post.thread) }
                        </div>
                    ) 
                

			) 	

		}
	}

	render() {
		return <div> {this.renderPosts()} </div>;
	}

}

export default News;
