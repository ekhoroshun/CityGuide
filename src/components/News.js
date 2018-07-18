import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
const token = "a6630856-70e3-434f-9322-b3d291330ab4";

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: [],
	  q: this.props.match.params.cityName,
	  loading: true
    };
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;

    axios
      .get(
        "http://webhose.io/filterWebContent?token=a6630856-70e3-434f-9322-b3d291330ab4&format=json&ts=1531666818535&sort=performance_score&q= " +
          this.state.q +
          "%20language%3Aenglish%20site_type%3Anews"
      )
      //http://webhose.io/filterWebContent?token=a6630856-70e3-434f-9322-b3d291330ab4&format=json&ts=1531666818535&sort=performance_score&q=+ this.state.q +%20language%3Aenglish%20site_type%3Anews
      .then(res => {
        if (this._mounted) {
          this.setState({
			feed: res.data.posts,
			loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderImage(thread) {
    if (thread.main_image) {
      return (
        <a href={thread.url} target="_blank">
          <img className="newsImg " src={thread.main_image} />
        </a>
      );
    } else {
      return (
        <a href={thread.url} target="_blank">
          <img className="newsImgCat" src="https://placekitten.com/200/200" />
        </a>
      );
    }
  }

  renderPosts() {
    if (!this.state.loading && this.state.feed.length === 0) {
      return (<div>no news was found</div>)
    } else {
		if(this.state.loading) {

			return (<div>Loading news</div>) // images are loading (state 1)
			
		} else{
      return this.state.feed.map((Post, index) => (
        <div className="box" key={index}>
          <div className="newsImg" key={Post.uuid}>
            {this.renderImage(Post.thread)}
            <div className="box-body">
              <h5 className="newsTitle"><a className ="links" href={Post.thread.url}>{Post.thread.title}</a></h5>
              <p className="siteNews"><a className ="links" href={Post.thread.url}> {Post.thread.site}</a></p>
              <p className="datePublished ">
                {" "}
                {moment(Post.thread.published).format("MMM Do")}{" "}
              </p>
            </div>
          </div>
        </div>
	  ));
	}
    }
  }

  render() {
    return (
      <div className="container-fluid h-100">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-lg">{this.renderPosts()}</div>
          <div class="col-sm"></div>
        </div>
      </div>
    );
  }
}

export default News;
