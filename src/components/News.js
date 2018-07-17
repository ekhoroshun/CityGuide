import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
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

		axios.get('http://webhose.io/filterWebContent?token=a6630856-70e3-434f-9322-b3d291330ab4&format=json&ts=1531666818535&sort=performance_score&q= '+ this.state.q +'%20language%3Aenglish%20site_type%3Anews')
		//http://webhose.io/filterWebContent?token=a6630856-70e3-434f-9322-b3d291330ab4&format=json&ts=1531666818535&sort=performance_score&q=+ this.state.q +%20language%3Aenglish%20site_type%3Anews
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
				<a href={ thread.url } target="_blank"><img className="newsImg " src={thread.main_image}/></a>
			)
		} else {
			return <a href={ thread.url } target="_blank"><img className="newsImgCat" src="https://placekitten.com/200/200"/></a>
		}
	}


	renderPosts() {

		if (this.state.feed.length === 0) {

			return <div>no news was found</div>;

		} else {
			
			return (

				

                this.state.feed.map(

					(Post, index) =>
						

						<div className="box" key={index}>

						
                        <div className="newsImg" key={Post.uuid}>
						{this.renderImage(Post.thread)}
						<div className="box-body">
						<h5 className="newsTitle">{ Post.thread.title }</h5>
						<p className ="siteNews"> {Post.thread.site}</p>
						<p className = "datePublished "> {moment(Post.thread.published).format('MMM Do')} </p>
						</div>
						</div>	
						</div> 
						
                    ) 
               

			) 	

		}
	}

	render() {
		return (
		<div className = "container-fluid h-100">
		<div class="row">

		
		<div class="col-md">
      One of three columns
    </div>
    <div class="col-md">
      {this.renderPosts()} 
    </div>
    <div class="col-md">
      One of three columns
    </div>
		
		</div>
		</div>
		
		)
	}

}

export default News;
