import React, { Component } from 'react';
import { connect } from 'react-redux';
import Device from './device';

class DeviceList extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    if (this.props.devices.length === 0) {
      return <tr>
        <td> No devices found. </td>
        <td></td>
      </tr>
    } else {    
      var devices = this.props.devices;
      
      return devices.map(device => 
        <Device
          key={device.name}
          device={device}          
        />
      )
    }
  }

  render() {
    console.log('Render device-list');
    return (
      <div>
        <table className="table">
          <tbody>
            <tr className="table-title">
              <td width="50%">Devices</td>
              <td width="50%">Features</td>
            </tr>
            {this.renderList()}
          </tbody>
        </table>        
      </div>
    )
  }
} 

function mapStateToProps(state) {
  return {
    devices: state.devices
  }
}

export default connect(mapStateToProps)(DeviceList);
