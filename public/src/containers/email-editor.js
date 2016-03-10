import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { updateEmailOptions } from '../actions/index';

const emailOptionsToContent = (emailOptions) => {
  let content = '';
  emailOptions.map(function(email) {
    content += email.value + '\n';
  });
  return content;
}

const customStyles = {
  content: {
    width: '90%',
    height: '70%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class EmailEditor extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);        
    this.onChangeEmailContent = this.onChangeEmailContent.bind(this);        
    this.onSaveEmailContent = this.onSaveEmailContent.bind(this);
    this.state = { 
      modalIsOpen: false,
      content: ''
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onChangeEmailContent(event) {
    this.setState({ content: event.target.value });
  }

  onSaveEmailContent() {
    this.props.updateEmailOptions(this.state.content);
  }

  render() {
    return (
      <a className="btn btn-default" onClick={this.openModal}>
        <span className="glyphicon glyphicon-list-alt"></span>
        Edit Emails
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <h2>Emails Editor</h2>
          <div className="modal-hint">An email per line</div>
          <textarea         
            className="modal-textarea"
            defaultValue={emailOptionsToContent(this.props.emailOptions)}
            onChange={this.onChangeEmailContent}>
          </textarea>
          <button 
            className="modal-button btn btn-default pull-right"
            onClick={this.closeModal}
          >Cancel</button>
          <button 
            className="modal-button btn btn-success pull-right" 
            onClick={ () => {
              this.onSaveEmailContent();
              this.closeModal();
            }}
          >Save</button>
        </Modal>
      </a>
    );
  }
}

function mapStateToProps(state) {
  return {
    emailOptions: state.emailOptions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateEmailOptions: (content) => {      
      dispatch(updateEmailOptions(content));
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailEditor);