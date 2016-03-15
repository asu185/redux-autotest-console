import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { updateFeatureOptions } from '../actions/index';

const featureOptionsToContent = (featureOptions) => {
  let content = '';
  featureOptions.map(function(feature) {
    content += feature.value + ' #' + feature.label + '\n';
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

class FeatureEditor extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);        
    this.onChangeFeatureContent = this.onChangeFeatureContent.bind(this);        
    this.onSaveFeatureContent = this.onSaveFeatureContent.bind(this);
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

  onChangeFeatureContent(event) {
    this.setState({ content: event.target.value });
  }

  onSaveFeatureContent() {
    if (!this.state.content) { // The content has not been changed.
      this.props.updateFeatureOptions(featureOptionsToContent(this.props.featureOptions));  
    } else {
      this.props.updateFeatureOptions(this.state.content);  
    }
  }

  render() {
    return (
      <a className="btn btn-default" onClick={this.openModal}>
        <span className="glyphicon glyphicon-list-alt"></span>
        Edit Features
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <h2>Features Editor</h2>
          <div className="modal-hint">Separate the feature and display name by ' #'. Ex. feature_to_run #display_name</div>
          <textarea         
            className="modal-textarea"
            defaultValue={featureOptionsToContent(this.props.featureOptions)}
            onChange={this.onChangeFeatureContent}>
          </textarea>
          <button 
            className="modal-button btn btn-default pull-right"
            onClick={this.closeModal}
          >Cancel</button>
          <button 
            className="modal-button btn btn-success pull-right" 
            onClick={ () => {
              this.onSaveFeatureContent();
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
    featureOptions: state.featureOptions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateFeatureOptions: (content) => {
      dispatch(updateFeatureOptions(content));
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureEditor);