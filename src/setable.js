import React from 'react';
import _ from 'lodash'
import 'semantic-ui-css/semantic.min.css'
import {Icon,Label,Menu,Table,Button,Checkbox,Form} from 'semantic-ui-react'

class SeTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            column: 'name',
            data: [
                { name: 'John', age: 15, gender: 'Male' },
                { name: 'Amber', age: 40, gender: 'Female' },
                { name: 'Leslie', age: 25, gender: 'Female' },
                { name: 'Ben', age: 70, gender: 'Male' },
            ],
            inputName: 'Chris',
            inputAge: 22,
            direction: 'ascending',
            addData: { name: 'Chris', age: 22, gender: 'Male' },
            gender: 'Male'
        }
        this.handleSort = this.handleSort.bind(this)
        this.addDate1 = this.addDate1.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleAge = this.handleAge.bind(this)
        this.handleColumn = this.handleColumn.bind(this)
    }

    handleGender = (e, { value }) => this.setState({ gender: value })
    handleDirection = (e, { value }) => this.setState({ direction: value })
    handleColumn = (e, { value }) => this.setState({ column: value })

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state
        console.log(column)
        console.log(data)

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })
            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    addDate1 = () => {

        const { column, data, direction} = this.state
        let addData = {
            name: this.state.inputName,
            age: this.state.inputAge,
            gender: this.state.gender
        }
        let newData = [...data,addData]
        if (!column){
            console.log('Please select a colume')
        } else if (column === 'name'){
            this.setState({
                column: 'name',
                data: _.sortBy(newData, ['name']),
                direction: 'ascending',
            })
        } else if (column === 'age'){
            this.setState({
                column: 'age',
                data: _.sortBy(newData, ['age']),
                direction: 'ascending',
            })
        } else if (column === 'gender'){
            this.setState({
                column: 'gender',
                data: _.sortBy(newData, ['gender']),
                direction: 'ascending',
            })
        } else {
            console.log('error')
        }


    }

    handleName = () => {
        this.inputName.focus()
        console.log(this.inputName.value)
        this.setState({
            inputName: this.inputName.value
        })

    }
    handleAge = () => {
        this.inputAge.focus()
        console.log(this.inputAge.value)
        this.setState({
            inputAge: this.inputAge.value
        })
    }

    render (){
        const { column, data, direction,gender } = this.state

        return (
            <div>
                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'name' ? direction : null}
                                onClick={this.handleSort('name')}
                            >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'age' ? direction : null}
                                onClick={this.handleSort('age')}
                            >
                                Age
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'gender' ? direction : null}
                                onClick={this.handleSort('gender')}
                            >
                                Gender
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ age, gender, name }) => (
                            <Table.Row key={name}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{age}</Table.Cell>
                                <Table.Cell>{gender}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' ref={(input) => { this.inputName = input;}} onChange={this.handleName}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Age</label>
                        <input placeholder='Age' ref={(input) => { this.inputAge = input}} onChange={this.handleAge}/>
                    </Form.Field>
                    <Form.Group inline>
                        <label>Gender</label>
                        <Form.Radio
                            label='Male'
                            value='Male'
                            checked={gender === 'Male'}
                            onChange={this.handleGender}
                        />
                        <Form.Radio
                            label='FeMale'
                            value='FeMale'
                            checked={gender === 'FeMale'}
                            onChange={this.handleGender}
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Column</label>
                        <Form.Radio
                            label='name'
                            value='name'
                            checked={column === 'name'}
                            onChange={this.handleColumn}
                        />
                        <Form.Radio
                            label='age'
                            value='age'
                            checked={column === 'age'}
                            onChange={this.handleColumn}
                        />
                        <Form.Radio
                            label='gender'
                            value='gender'
                            checked={column === 'gender'}
                            onChange={this.handleColumn}
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Direction</label>
                        <Form.Radio
                            label='ascending'
                            value='ascending'
                            checked={direction === 'ascending'}
                            onChange={this.handleDirection}
                        />
                        <Form.Radio
                            label='descending'
                            value='descending'
                            checked={direction === 'descending'}
                            onChange={this.handleDirection}
                        />
                    </Form.Group>
                    <Button type='submit' onClick={this.addDate1}>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default SeTable
