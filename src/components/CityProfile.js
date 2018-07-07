import React, { Component } from "react";
import Titles from "./Titles";

import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

console.log("m", moment);


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
          background: "url(" + this.state.background + ") center center fixed",

          height: "100%"
        }}
      >
        <div className="container h-100">
          <div className="row rowA">
            <div className="col-12">
              <div className="row rowAA">
                <div className="col">
                  <p>
                    temperature = {this.state.temperature}, humidity ={" "}
                    {this.state.humidity}, wind = {this.state.wind}, description
                    = {this.state.description}
                  </p>
                </div>
                <div className="col">
                  <p>
                    today is {moment().format("LL")}, in
                    {this.state.city}
                  </p>
                </div>
                <div className="col">
                  <Link to={`/${this.state.city}/news`}> See some news </Link>
                  <Link to={`/${this.state.city}/photos`}> See some photos</Link>
                  
                </div>
              </div>
              <div className="row rowAB" />
            </div>
          </div>
          <div className="row rowB">
            {this.state.forecast.map((element, index) => {
              return (
                <div className="col">
                  <p key={index}>
                    {console.log(index)}
                    temperature = {element.main.temp}, humidity ={" "}
                    {element.main.humidity}, wind = {element.wind.speed},
                    weather = {element.weather[0].description}
                  </p>
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

