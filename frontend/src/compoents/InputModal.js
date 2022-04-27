import React, { Fragment } from "react";
import { Modal, Form, Button } from 'react-bootstrap';

class InputModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }
    handleShow() {
        this.setState({
            show: true,
        })
    }
    handleClose() {
        this.setState({
            show: false,
        })
    }
    handleChange(event) {
        console.log(event);
        this.setState({
            targetCoruseId: event.target.value,
        })
    }

    render() {
        return (
            <Fragment>
                <Button variant="primary" onClick={() => this.handleShow()}>
                    加選
                </Button>

                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    autoFocus
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            取消
                        </Button>
                        <Button variant="primary" onClick={() => this.handleClose()}>
                            確認
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default InputModal;