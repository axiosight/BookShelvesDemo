import React, { Component } from 'react';
import { Row, Card, Image, Button, Form} from 'react-bootstrap';
import logo from './bk1.png';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

var bgColors = {
    "Default": "#faf8f7",
    "Blue": "#00B1E1",
    "Cyan": "#37BC9B",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Yellow": "#F6BB42",
};

class Entity extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.officeNameIsValid === true && this.state.officeAdressIsValid === true) {

            let form = new FormData();
            form.append('id', this.state.officeId);
            form.append('name', this.state.officeN);

            let url = "api/admin/updateOffice";
            let method = 'POST';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            });

            if (response.ok) {
                window.location.replace("/Home");
            }
        }
        else{
            alert("Not Valid!")
        }
    }

    render() {
        return (
            <div>
                <hr />
                    <Form>
                    <p>{this.props.eid}</p>
                    <p>Locate:{this.props.elib}</p>
                    {/* <p>Name:{this.props.bookId}</p> */}
                    <p style={{textDecorationColor: 'green'}}>Status:{this.props.estatus}</p>
                    <Button type="submit" className="m-2" style={{ boxShadow: '5px 5px 10px #cccccc' }} variant="outline-primary" size="sm">+</Button>
                    </Form>
                <hr />
            </div>
        );
    }
}

class BookItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalRent: false,
        };

        this.modalRentEntity = this.modalRentEntity.bind(this);
    }

    modalRentEntity() {
        this.setState({
            modalRent: !this.state.modalRent
        });
    }

    render() {
        return (
            <Card className="m-2 mb-2" style={{ width: '26rem', backgroundColor: bgColors.Default, boxShadow: '7px 7px 12px #cccccc' }}>
                <Card.Title>
                    <Image style={{ width: '100%', height: '250px', boxShadow: '5px 5px 10px #cccccc' }} src={logo} alt="Logo" />
                    {/* {
                    this.props.bookimg.map(function(t){
                        return <div>{t.img}</div>
                    })
                } */}
                </Card.Title>
                <Card.Body>
                    <Card.Text>
                        <b>Name:</b> {this.props.bookname}
                        <br />
                        <b>ISBN:</b> {this.props.bookisbn}
                        <br />
                        <b>Year:</b> {this.props.bookyear}
                        <br />
                        <hr />
                        {
                            this.props.bookauthors.map(function (author) {
                                return <div>{author.name}</div>
                            })
                        }
                        <hr />
                        {
                            this.props.bookpublishers.map(function (publisher) {
                                return <div><em>{publisher.name}</em></div>
                            })
                        }
                        <hr />
                        {
                            this.props.booktags.map(function (tag) {
                                return <div>#{tag.name}</div>
                            })
                        }
                        <br />
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={this.modalRentEntity} className="mb-2 col-md-4" style={{ boxShadow: '5px 5px 10px #cccccc' }} variant="primary">Rent</Button>
                </Card.Footer>
                <div>
                    <Modal isOpen={this.state.modalRent}>
                        <ModalHeader toggle={this.modalRentEntity}>Rent Book</ModalHeader>
                        <ModalBody>
                            {
                                this.props.bookentities.map(function (ent) {
                                    return <Entity eid={ent.id} elib={ent.libraryId} ebook={ent.bookId} estatus={ent.statusId} />
                                })
                            }
                        </ModalBody>
                    </Modal>
                </div>
            </Card>
        );
    }
}

export class BooksCards extends Component {
    static displayName = BooksCards.name;

    render() {
        return (
            <Row>
                {
                    this.props.data.map(function (item) {
                        return <BookItem key={item.id} bookid={item.id} bookisbn={item.isbn} bookname={item.name} bookoriginalname={item.originalName} bookdescription={item.description} bookyear={item.year} booktags={item.tagViewModels} bookauthors={item.authorViewModels} bookpublishers={item.publisherViewModels} bookimg={item.previewViewModelMain} bookentities={item.bookEntityViewModels} />
                    })
                }
            </Row>
        );
    }
}