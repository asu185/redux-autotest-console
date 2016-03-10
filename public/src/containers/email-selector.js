import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { onChangeEmails } from '../actions/index';

const EmailSelector = ({ emailOptions, onChangeEmails }) => { 
  return (      
    <div id="EmailSelector">
      <div>          
        <Select
          name="form-field-name"
          placeholder={'Select emails to send...'}
          options={emailOptions}
          multi={true}
          onChange={onChangeEmails} />        
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    emailOptions: state.emailOptions
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    onChangeEmails: (emails) => {
      dispatch(onChangeEmails(emails));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmailSelector);