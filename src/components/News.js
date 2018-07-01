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

		axios
			.get(`http://webhose.io/filterWebContent?&format=json`, {
				params: {
					token: token,
					sort: "published",
					q: this.state.q
				}
			})

			.then(res => {
				console.log(res);

        if (this._mounted) {
					this.setState({
						feed: res.data
					});
				}
			})
			//console.log(feed)
			.catch(error => {
				console.log(error);
			});
	}


	renderPosts() {
		if (this.state.feed.length === 0) {
			return
			<div>no news was found</div>;
		} else {
			return
			console.log(this.state.feed.posts.text),
				this.state.feed.posts.map((Item, index) => (
					<p>
						{Item.text}
						{Item.published}{" "}
					</p>
				));
		}
	}

	render() {
		return <div> news </div>;
	}
}

export default News;
