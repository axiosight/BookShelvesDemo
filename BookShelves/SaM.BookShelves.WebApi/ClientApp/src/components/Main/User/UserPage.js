import React, { Component } from 'react';
import { Card, Image, Row, Form, FormControl, Button } from 'react-bootstrap';
import samLogo from '../User/lg1.jpeg';
import { BooksCards } from './BookCards';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
// import ReactPaginate from 'react-paginate';
import { Dropdown } from 'semantic-ui-react';

const countryOptions = [
    { key: 'Empty', value: 'Empty', text: 'Empty' },
    { key: 'Менеджмент', value: 'Менеджмент', text: '#Менеджмент' },
    { key: 'Мотивация', value: 'Мотивация', text: '#Мотивация' },
    { key: 'Паттерны', value: 'Паттерны', text: '#Паттерны' },
    { key: 'Разработка', value: 'Разработка', text: '#Разработка' },
    { key: 'Тестирование', value: 'Тестирование', text: '#Тестирование' }
  ]

  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);

export class UserPage extends Component {
    static displayName = UserPage.name;

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            booksPerPage: [],
            total: 0,
            searchTerm: "",
            searchTag: ""
        };

        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.exposedTagOnChange = this.exposedTagOnChange.bind(this);
    }

    async loadData() {
        let url = "api/book/getAllBooks";

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();
            responseJson.then(results => {
                this.setState({
                    books: results,
                    total: results.length
                });
            });
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    // handlePageClick = data => {
    //     // let selected = data.selected;
    //     // let offset = Math.ceil(selected * 6);
    
    //     // this.setState({ offset: offset }, () => {
    //     //   this.loadCommentsFromServer();
    //     // });
    //   };

    exposedTagOnChange = (e, {value}) => {
        e.persist();
        console.log(e.target.textContent);
        this.setState({ searchTag: value });
    };

    onChangeSearch(e) {
        e.persist();
        console.log(e.target.value);
        let val = e.target.value;
        this.setState({ searchTerm: val });
    }

    async handleSubmitSearch(e) {
        e.preventDefault();
        let form = new FormData();
            form.append('termSearch', this.state.searchTerm);
            form.append('tagSearch', this.state.searchTag);

            console.log(form.append('tagSearch', this.state.searchTag));

            debugger;

            let url = "api/boook/search";
            let method = 'POST';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            });

            if (response.ok) {
                if (response.ok) {
                    let responseJson = response.json();
                    responseJson.then(results => {
                        this.setState({
                            books: results,
                            total: results.length
                        });
                    });
                }
                //window.location.replace("/Home");
            }
    }

    render() {
        return (
        <div>
            <Card className="text-left border p-5 col-md-12 rounded flex-row flex-wrap" style={{ backgroundColor: '#EDE7F6', boxShadow: '5px 5px 10px #cccccc', margin: '0 auto', width: '100%' }}>
                    <Image className="border" style={{ width: '180px', height: '180px', boxShadow: '7px 7px 12px #cccccc'}} src={samLogo} alt="Logo" roundedCircle />
                <Card.Body>
                    <Card.Text>
                    <b>Email:</b> {this.props.useremail}
                    <br />
                    <b>Employee:</b> {this.props.username} {this.props.usersurname}
                    <br />
                    <b>Phone:</b> +{this.props.userphone}
                    <br />
                    <b>Floor:</b> {this.props.userfloor}
                    <br />
                    <b>Room:</b> {this.props.userroom}
                    </Card.Text>
                </Card.Body>
            </Card>
            <hr/>
            <Card className="text-left border p-5 col-md-12 rounded flex-row flex-wrap" style={{ backgroundColor: '#EDE7F6', boxShadow: '5px 5px 10px #cccccc', margin: '0 auto', width: '100%' }}>
                 <Row>
                     <Form inline onSubmit={this.handleSubmitSearch}>
                         <Dropdown className="mr-4" placeholder='Select Tag' search selection options={countryOptions} onChange={this.exposedTagOnChange}/>
                         <FormControl type="text" placeholder="Search" className="mr-md-4" onChange={this.onChangeSearch}/>
                         <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Row>
            </Card>
            <hr/>
            {
                <BooksCards data={this.state.books}/>
            }
            {/* <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.total}
                marginPagesDisplayed={2}
                pageRangeDisplayed={6}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            /> */}
        </div>
        );
    }
}