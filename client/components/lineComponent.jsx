import React, {Component} from 'react';
import { Grid, Form, Table, Divider, Dropdown ,Segment} from 'semantic-ui-react';
import {Line} from 'react-chartjs-2';
import request from 'superagent';
import { Fade, Flip, Rotate, Zoom } from 'react-reveal';
import "../styles/style.css";


export default class LineComponent extends Component {
  constructor() {
    super();
    this.state={
      tableTitle:[],
      quarterMonth:[],
      tableValues:[]
    }
  }

  componentWillMount(){
    var context=this;
    var header=[];
    var content=[];
    var chartHeader=[];
    request.post('http://localhost:5000/getDetails').end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
          res.body.map((item)=>{
            header.push(Object.keys(item));
            content.push(Object.values(item));
          })
          chartHeader=header[0].slice(2);
          //tableTitle is the header for tableTitle
          //tableValues is the data for the table body
          //quarterMonth is the x-axis
          context.setState({tableTitle:header[0],tableValues:content,quarterMonth:chartHeader},()=>{
            console.log(context.state.tableTitle,context.state.tableValues,context.state.quarterMonth);
          });
        }
    });

    request.post('http://localhost:5000/getData').end(function(err, res) {
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
          console.log(res.text);
      }
    });
  }

render(){
  var data = {
  labels: this.state.quarterMonth,
  datasets: []
};

this.state.tableValues.map((item,i)=>{
  var temp = item.slice(2);
  // variable hue has color for each data
  var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  data.datasets.push({
      label: item[0],
      fill: false,
      lineTension: 0.1,
      backgroundColor: hue,
      borderColor: hue,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: hue,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: hue,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: temp
    })
})


  return(
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <h1 style={{textAlign:'center'}}>Title</h1>
          </Grid.Column>
        </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={14}>
              <Table celled>
    <Table.Header>
      <Table.Row>
        {this.state.tableTitle.map((item,key)=>{
         return(<Table.HeaderCell key={key} style={{textAlign:'center'}}>{item}</Table.HeaderCell>)
        })}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        this.state.tableValues.map((item,key)=>{
          return(
            <Table.Row key={key} style={{textAlign:'center'}}>
              {
                item.map((item1,key1)=>{
                  return(<Table.Cell key={key1}>{item1}</Table.Cell>)
                })
              }
          </Table.Row>)
        })
      }
    </Table.Body>
    </Table>
  </Grid.Column>
  <Grid.Column width={1} />
  </Grid.Row>
  <Grid.Row>
    <Grid.Column width={1} />
    <Grid.Column width={14} >
        <Segment inverted>
            <Line
              data={data}
              height={100}
              options={{
                 scales: {
                   yAxes: [{
                     ticks: {
                       beginAtZero:true,
                     }
                   }]
                 }
               }}
              />
       </Segment>
    </Grid.Column>
    <Grid.Column width={1} />
  </Grid.Row>
      </Grid>
    </div>
  );
}
}
