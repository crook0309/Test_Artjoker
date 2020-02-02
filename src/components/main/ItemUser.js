import React, { Component } from 'react';
import s from './Main.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class ItemUser extends Component {
    render() {
        if(this.props.isLoading) return (<div>< FontAwesomeIcon icon = { faSpinner } spin  /></div>);
        let user = this.props.user;
        if(Object.keys(user).length > 3) {
            let classActive = (this.props.user.status === 'active')?s.itemActive: s.itemInactive;
            return (
                <Container id='container'>
                    <Row className={s.rowItem}>
                        <Col className={classActive} onClick={() => this.props.handleClick(this.props.user.id)}>{`#${this.props.user.id} - ${this.props.user.user_name} - ${this.props.user.age} - ${this.props.user.gender}`}</Col>
                    </Row>
                </Container>
            );
        } else if (Object.keys(user).length < 3) {
            return (
                <Container id='container'>
                    <Row>
                        <Col>{this.props.user.messege}</Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container id='container'>
                    <Row>
                        <Col>{`${this.props.user.bracketLeft} ${this.props.user.letter} ${this.props.user.bracketRight}`}</Col>
                    </Row>
                </Container>
            );
        };
    }
}

export default ItemUser;
