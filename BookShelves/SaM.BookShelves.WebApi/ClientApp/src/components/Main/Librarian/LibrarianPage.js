import React, { Component } from 'react';
import {Tabs, Tab, Button} from 'react-bootstrap';
import { Order } from './Order';

export class LibrarianPage extends Component {
    static displayName = LibrarianPage.name;

    constructor(props) {
        super(props);

        this.state = {
            orders: []
        };
    };

    async loadData() {
        let url = "api/admin/getEntity";

        let response = await fetch(url);
        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => {
                this.setState({
                    orders: results
                });
            });
        }
    }

    render() {
        return (
            <Tabs defaultActiveKey="BooksSettings" id="uncontrolled-tab-example">
            <Tab eventKey="BooksSettings" title="BooksSettings">
                BooksSettings
            </Tab>
            <Tab eventKey="Orders" title="Orders">
                <Order data={this.state.orders}/>
            </Tab>
        </Tabs>
        );
    }
}