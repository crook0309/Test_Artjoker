import React, {Component} from 'react';
import s from './Main.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ItemUser from './ItemUser';
import ModalItem from './ModalItem';

class Main extends Component {
	constructor (props) {
		super(props)
		this.state = {
            isLoading: true,
            usersList: [],
            usersFilter: [],
            idUserSelect: '',
            showModal: false,
            showConfirm: false
        }
        this.inpUserName = React.createRef();
        this.inpUserGender = React.createRef();
        this.inpUserAgeFrom = React.createRef();
        this.inpUserAgeTo = React.createRef();
        this.itemUser = React.createRef();
        this.loadTimer = this.loadTimer.bind(this);

    }

    sortByArray (arr) {
        if(arr.length === 0 || Object.keys(this.state.usersFilter)[0] === 'messege') return [{messege: 'No matches found.'}];
        arr.sort((a, b) => a.first_name > b.first_name ? 1 : -1);
        let arrUserList = [];
        let firstLetter = arr[0]['first_name'][0];
        arrUserList.push( { bracketLeft: '<',
                            letter: arr[0]['first_name'][0],
                            bracketRight: '>'})
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            if(typeof(el) !== "object") continue;
            let birth = new Date(el['dob']);
            let now = new Date();
            let age = now.getFullYear() - birth.getFullYear();
            el['age']=now.setFullYear(1972) < birth.setFullYear(1972) ? age - 1 : age;
            el['user_name'] = el.first_name + ' ' + el.last_name;
            if(firstLetter !== el['first_name'][0]){
                arrUserList.push({ bracketLeft: '<',
                                    letter: el['first_name'][0],
                                    bracketRight: '>'});
                arrUserList.push(el);
                firstLetter = el['first_name'][0];
            } else {
                arrUserList.push(el);
            }
        }
        return arrUserList;
    };

    componentDidMount() {
        this.loadData();
    };

    loadData() {
        let url = 'https://gorest.co.in/public-api/users?access-token=mgU_61QmKy06lCimGL-q5CS36XKKySd2BFVp';
       fetch ( url )
        .then ( response => {
            response.json().then ( response => {
                let array = this.sortByArray(response['result']);
                this.setState({ usersList:  array,
                                usersFilter: array,
                                isLoading: false });
            })
        })
    };

    loadTimer(usersFilter) {
        setTimeout(() => this.setState({usersFilter: usersFilter}), 400);
    };

    componentWillUnmount() {
        clearInterval(this.loadTimer);
    };

    handleChange(event) {
        const inp = event.currentTarget;
        let usersFilter;
        if(inp.name==="userName" && !this.state.usersFilter[0]['messege']){
            if (inp.value.length < 2) {
                this.setState({usersFilter: this.state.usersList});
                return
            };
            usersFilter = this.state.usersFilter.length === 0 ||!this.state.usersFilter[0]['messege']? this.state.usersList: this.state.usersFilter;
            usersFilter = usersFilter.filter(function(item){
                if(Object.keys(item).length > 3) {
                    if (item['user_name'].toLowerCase().search(inp.value.toLowerCase()) !== -1) return item;
                };
            });
            this.loadTimer (this.sortByArray (usersFilter));
        } else if (inp.name==="userGender" && !this.state.usersFilter[0]['messege']) {
            if (inp.value === "gender" || inp.value === "both") {
                this.setState({usersFilter: this.state.usersList});
                return;
            };
            usersFilter = this.state.usersFilter.filter(function(item){
                if(Object.keys(item).length > 3) {
                    if (item['gender'].toLowerCase() === inp.value.toLowerCase()) return item;
                }
            });
            this.loadTimer (this.sortByArray (usersFilter));
        } else if ((inp.name==="userAgeFrom" || inp.name==="userAgeTo") && !this.state.usersFilter[0]['messege']) {
            let inpValueTo = this.inpUserAgeTo.current.value === ''? 1000: +this.inpUserAgeTo.current.value;
            let inpValueFrom = this.inpUserAgeFrom.current.value === ''?  0 : +this.inpUserAgeFrom.current.value;
            if(inpValueFrom > inpValueTo) return;
            usersFilter = [];
            this.state.usersFilter.filter(function(item){
                if(Object.keys(item).length > 3) {
                    if (inpValueTo > item.age && item.age >  inpValueFrom) usersFilter.push(item);
                }
            });
            this.loadTimer (this.sortByArray (usersFilter));

        }  else if (inp.name==="reset") {
            this.inpUserName.current.value = '';
            this.inpUserGender.current.value = '';
            this.inpUserAgeFrom.current.value = '';
            this.inpUserAgeTo.current.value = '';
            this.setState({usersFilter: this.state.usersList});
        };
    };

    handleClick = (id) => {
        this.setState({
            idUserSelect: id,
            showModal: true});
    };

    handleShowConfirm = () => {
        this.setState({ showModal: false,
                        showConfirm: true });
    };

    handleClickDeleteItem = (id) => {
        this.setState({ showConfirm: false });
        let usersFilter=[];
        this.state.usersFilter.forEach( function (item, index) {
            if (item['id'] !== id && Object.keys(item).length > 3) {
                usersFilter.push(item);
            };
        });
        usersFilter = this.sortByArray (usersFilter);
        this.setState({usersFilter: usersFilter});
    };

    handleCloseModal = () => {
        this.setState({ showModal: false,
                        showConfirm: false });
    };

    render() {
		return (
            <div className={s.mainWrap}>
                <Container>
                    <Row>
                        <Col className={s.filterWrap}>

                            <Form noValidate validated={this.state.validated}>
                                <Form.Row className={s.rowForm}>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                        <Form.Label>First/Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="userName"
                                            placeholder="First/Last name"
                                            ref={this.inpUserName}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter only letters</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <Form.Label>Filter by gender</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="userGender"
                                            ref={this.inpUserGender}
                                            onChange={this.handleChange.bind(this)}
                                        >
                                            <option>gender</option>
                                            <option>both</option>
                                            <option>male</option>
                                            <option>female</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                        <Form.Label>Filter by age from </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="from"
                                            name="userAgeFrom"
                                            ref={this.inpUserAgeFrom}
                                            onChange={ this.handleChange.bind(this)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter only numbers.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                                        <Form.Label>Filter by age to</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="to"
                                            name="userAgeTo"
                                            ref={this.inpUserAgeTo}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter only numbers.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Button className={s.btnReset} type="reset" name="reset" onClick={this.handleChange.bind(this)}>Reset</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row className={s.rowWrap}>
                        <Col className={s.itemWrap}>
                            {this.state.usersFilter.map((x, i) => <ItemUser user={x} key={i} isLoading ={this.state.isLoading} handleClick={this.handleClick} ref={this.itemUser} />)}

                        </Col>
                        <ModalItem
                        handleClickDeleteItem={this.handleClickDeleteItem}
                        handleShowConfirm={this.handleShowConfirm}
                        handleCloseModal={this.handleCloseModal}
                        showModal={this.state.showModal}
                        showConfirm={this.state.showConfirm}
                        idUserSelect={this.state.idUserSelect}
                        isLoading={this.state.isLoading}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Main;
