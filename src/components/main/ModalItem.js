import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class ModalItem extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.showModal} onHide={() => this.props.handleCloseModal()}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Are you sure you want to invite the user to id = {this.props.idUserSelect}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.handleCloseModal()}>
              Not
            </Button>
            <Button variant="primary" onClick={() => this.props.handleShowConfirm()}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.props.showConfirm} onHide={() => this.props.handleCloseModal()}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Invitation sent</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.props.handleClickDeleteItem(this.props.idUserSelect)}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

  export default ModalItem;
