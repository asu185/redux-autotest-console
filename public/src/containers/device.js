import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { onChangeDeviceFeature, onChangeDeviceLock, getReports } from '../actions/index';

class Device extends Component { 
  constructor(props) {
    super(props);
    this.renderReports = this.renderReports.bind(this);
    this.props.getReports();
  }
 
 renderReports() {
    if (this.props.reports.length === 0) {
      return <li><a href='#'>No report</a></li>
    } else {          
      let reportDir = this.props.device.name.replace(':', '.');
      let reportPath = 'reports/' + reportDir + '/';
      return this.props.reports.map(function(report) {        
        return <li key={report}><a href={reportPath + report}>{report}</a></li>
      })
    }
  }

  render() {
    // console.log('Render device');
    let reportDir = this.props.device.name.replace(':', '.');
    let reportPath = 'reports/' + reportDir + '/';
    return (
      <tr>
        <td>{this.props.device.name}</td>
        <td>
          {'Lock '}
          <input 
            type="checkbox"
            checked={this.props.device.lock}
            onChange={this.props.onChangeDeviceLock} />          
        </td>
        <td>
          <Select
            name="form-field-name"
            value={this.props.device.feature}
            disabled={this.props.device.lock}
            options={this.props.featureOptions}
            onChange={this.props.onChangeDeviceFeature} />
        </td>        
        <td>
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Reports
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
              {this.renderReports()}
            </ul>
          </div>        
        </td>
        <td><a href={'screenshots/' + this.props.device.name}>Screenshots</a></td>
      </tr>
    )
  }
}

function mapStateToProps(state) {
  return {
    featureOptions: state.featureOptions,
    reports: state.reports
  }
}

function mapDispatchToProps(dispatch, ownProps) {  
  return {
    onChangeDeviceFeature: (feature) => {
      dispatch(onChangeDeviceFeature(ownProps.device.name, feature));
    },
    onChangeDeviceLock: () => {
      dispatch(onChangeDeviceLock(ownProps.device));
    },
    getReports: () => {      
      dispatch(getReports(ownProps.device.name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);