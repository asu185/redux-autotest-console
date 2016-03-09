import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import FeatureEditor from './feature-editor';

const getFeatureContent = (featureOptions) => {
  let content = '';
  featureOptions.map(function(feature) {
    content += feature.value + ' #' + feature.label + '\n';
  });
  return content;
}

const FeatureSelector = ({ featureOptions }) => { 
  return (      
    <div id="FeatureSelector">
      <div>          
        <Select
          name="form-field-name"
          placeholder={'Select a feature here'}
          options={featureOptions} />
        <FeatureEditor featureContent={getFeatureContent(featureOptions)} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    featureOptions: state.featureOptions
  }
}

export default connect(mapStateToProps)(FeatureSelector);