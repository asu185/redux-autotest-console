import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { addNewEmail, removeEmail } from '../actions/index';

class EmailController extends Component {
  constructor(props) {
    super(props);
    this.onAddEmail = this.onAddEmail.bind(this);
    this.state = { email: '' };
  }

  onAddEmail(value) {
    this.setState({ email: value });
  }

  render () {
    return (      
      <div id="EmailController">
        <div>
          <Select
            name="form-field-name"    
            allowCreate={true}
            placeholder={'Add or remove email here'}
            value={this.state.email}
            multi={true}
            options={this.props.emailList}             
            onChange={this.onAddEmail} />
          <a title={'Save / Update'} className={'glyphicon glyphicon-floppy-save'} onClick={ () => {
              this.props.addNewEmail(this.state.email);
              this.setState({ email: '' });
          }} />          
          <a title={'Remove'} className={'glyphicon glyphicon-trash'} onClick={ () => {
            this.props.removeEmail(this.state.email);
            this.setState({ email: '' });
          }} />
        </div>
      </div>
    )    
  }
}

function mapStateToProps(state) {
  return {
    emailList: state.emailList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewEmail: (email) => {
      if (email.indexOf(',') > -1) {
        alert('Please add one email at once');
      } else {
        dispatch(addNewEmail(email));
      }      
    },
    removeEmail: (email) => {
      if (email.indexOf(',') > -1) {
        alert('Please remove one email at once');
      } else {
        dispatch(removeEmail(email));  
      }      
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailController);