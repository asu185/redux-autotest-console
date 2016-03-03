import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { addNewFeature, removeFeature } from '../actions/index';

class FeatureController extends Component { 
  constructor(props) {
    super(props);        
    this.onChangeFeature = this.onChangeFeature.bind(this);
    this.state = { feature: '' };
  }

  onChangeFeature(value) {
    this.setState({ feature: value });
  }

  render () {
    return (      
      <div id="FeatureController">
        <div>
          <Select
            name="form-field-name"    
            allowCreate={true}
            placeholder={'Add, update or remove a feature here'}
            value={this.state.feature}
            options={this.props.featureOptions}             
            onChange={this.onChangeFeature} />
          <a title={'Save / Update'} className={'glyphicon glyphicon-floppy-save'} onClick={ () => {
              this.props.addNewFeature(this.state.feature);
              this.setState({ feature: '' });
          }} />          
          <a title={'Remove'} className={'glyphicon glyphicon-trash'} onClick={ () => {
            this.props.removeFeature(this.state.feature);
            this.setState({ feature: '' });
          }} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    featureOptions: state.featureOptions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewFeature: (feature) => {      
      dispatch(addNewFeature(feature));
    },
    removeFeature: (feature) => {
      dispatch(removeFeature(feature));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureController);