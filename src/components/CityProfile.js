import React, { Component } from "react";
import Titles from "./Titles";

import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";




class CityProfile extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      temperature: "",
      city: this.props.match.params.cityName,
      humidity: "",
      description: "",
      country: "",
      background: [],
      loading: true,
      wind: "",
      forecast: []
    };
  }

  componentDidMount() {
    axios
      .get("http://api.openweathermap.org/data/2.5/weather?&units=metric", {
        params: {
          appid: "35b385bdfeec2e782e4a1164a0388de6",
          q: this.state.city
        }
      })
      .then(data => {
        console.log(data);
        this.setState(
          {
            temperature: data.data.main.temp,
            humidity: data.data.main.humidity,
            wind: data.data.wind.speed,
            description: data.data.weather[0].description
          },
          () => {
            //console.log("Current weather", this.state.data)
          }
        );
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://api.openweathermap.org/data/2.5/forecast?&units=metric", {
        params: {
          appid: "35b385bdfeec2e782e4a1164a0388de6",
          q: this.state.city
        }
      })
      .then(data => {
        console.log("data", data.data.list);

        var time;
        var temp_data = [];

        for (var i = 0; i <= data.data.list.length; i++) {
          if (data.data.list[i]) {
            time = data.data.list[i].dt_txt.substring(10);

            if (time.indexOf("12:00:00") > -1) {
              temp_data.push(data.data.list[i]);
            }
          }
        }

        this.setState(
          {
            temperature: data.data.list[0].main.temp,
            wind: data.data.list[0].wind.speed,
            humidity: data.data.list[0].main.humidity,
            description: data.data.list[0].weather[0].description,
            forecast: temp_data
          },
          () => {
            console.log("Forecast for 5 days", this.state.forecast);
          }
        );
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
          orientation: "landscape",
          order_by: "popular"
        }
      })
      .then(res => {
        //console.log(res);
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
        className="backgr"
        style={{
          backgroundImage: "url(" + this.state.background + ")",
        }}
      >
        <div className="container h-100">
          <div className="row rowA">
            <div className="col-12">
              <div className="row rowAA">
                <div className="col ">


				<div className="d-flex">
    			<div className="divA"> <p style ={{fontSize: 30}}> Right now </p>
     			 <div className="d-flex">
       			 <div className="divB A" > <p> {Math.round(this.state.temperature)}°</p></div>
				 <div className="divB B" > 
							<p>{this.state.description}</p> 
							<p>{this.state.wind} km/h </p>
					</div>
      			</div>
    			</div> 
   			 
  				</div>
				
                </div>
                <div className="col col2">
                  
					<p className = "descr" >{moment().format("dddd, MMMM Do")}</p>
					<p className = "cityName ">{this.state.city} </p>
                 
                </div>
                <div className="col col3">
				<div className = "links">
                 <li> <button type="button" class="btn btn-dark"><Link to={`/${this.state.city}/news`}>  City news </Link></button></li>
                 <li> <button type="button" class="btn btn-dark"> <Link to={`/${this.state.city}/photos`}> City photos </Link> </button></li>
                  </div>
                </div>
              </div>
              <div className="row rowAB" />
            </div>
          </div>
          <div className="row rowB">
            {this.state.forecast.map((element, index) => {
              return (
                <div className="col forecast" key={index}>
					{console.log(element)}
                  	
                    <li style ={{fontSize:15}}> {element.dt_txt.slice(0, 10)} </li>
					<li style ={{fontSize:40}}>  {Math.round(element.main.temp)}° </li>
					
                    <li>{element.weather[0].description}</li>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CityProfile;

