import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const EmailSelector = ({ emailOptions }) => { 
  return (      
    <div id="EmailSelector">
      <div>          
        <Select
          name="form-field-name"
          placeholder={'Select emails to send...'}
          multi={true}
          options={emailOptions} />        
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    emailOptions: state.emailOptions
  }
}

export default connect(mapStateToProps)(EmailSelector);