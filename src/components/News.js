import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
const token = "a6630856-70e3-434f-9322-b3d291330ab4";

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: this.props.location.state.backgroundPicture,
      feed: [],
      q: this.props.match.params.cityName,
      loading: true
    };
    console.log(this.props)
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
          <img 
            onError={e => {
              e.target.src = "https://placekitten.com/200/100";
            }}
            className="card-img-top"
            src={thread.main_image}
          />
        </a>
      );
    } else {
      return (
        <a href={thread.url} target="_blank">
          <img className="card-img-top" src="https://placekitten.com/200/100" />
        </a>
      );
    }
  }

  renderPosts() {
    if (!this.state.loading && this.state.feed.length === 0) {
      return (<div className="row h-100 justify-content-center align-items-center"><div className="col-4 warningNews text-center">No news</div></div>)
    } else {
    if(this.state.loading) {

    	return (<div className="row h-100 justify-content-center align-items-center"><div className="col-4 warningNews text-center">Loading news</div></div>) // images are loading (state 1)

    } else{

      return (

        <div>

          <div className="row">
            <div className="col-12 my-4">
            {console.log(this.state.q)}
              <a className="text-white" href={`/${this.state.q}`}> &laquo; Back</a>
            </div>
          </div>


        <div className="card-columns">
          {
            this.state.feed.map((Post, index) => (
              <div className="card" key={index}>
                <div  key={Post.uuid}>
                  {this.renderImage(Post.thread)}
                  <div className = "card-body">
                
                    <h5 className="card-title">
                      <a className="linksNewsTitle" href={Post.thread.url}>
                        {Post.thread.title.slice(0, 80)}...
                      </a>
                    </h5>
                  
                  <div className=" card-footer">
                    <p className = "paragraph1">
                      <a className="linksNewsUrl" href={Post.thread.url}>
                        {" "}
                        {Post.thread.site}
                      </a>
                    </p>

                    <p className = "paragraph2">
                      {" "}
                      {moment(Post.thread.published).format("MMM Do")}{" "}

                  </p>
                  </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        </div>

      )

    }
    }
  }
  

  render() {

    return (
      <div
        className="backgrNews h-100"
        style={{
          backgroundImage: "url(" + this.state.background + ")"
        }}
      >
        <div className="container h-100">

                    
              { this.renderPosts() }
          
          
        </div>
      </div>
    )
  }
}

export default News;
