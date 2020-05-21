import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

export class Order extends Component {
    static displayName = Order.name;

    render() {
        return (
            <div>
                <Table striped bordered hover responsive className="mt-2">
                    <thead>
                        <tr className="text-center" style={{ boxShadow: '5px 5px 10px #cccccc' }}>
                            <th className="text-center">User</th>
                            <th className="text-center">Book</th>
                            <th className="text-center">Status</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center">user@gmail.com</td>
                            <td className="text-center">Совершенный код. Мастер-класс</td>
                            <td className="text-center">Booked</td>
                            <td className="text-center">
                                <Button className="m-2" style={{ boxShadow: '5px 5px 10px #cccccc' }} variant="outline-danger" size="sm">Give To User</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}