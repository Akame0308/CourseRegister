import React, { Fragment } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap'
import CourseTable from './CourseTable';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            studentId: null,
            courseTable: null
        }
    }
    handleChange(event) {
        console.log(event);
        this.setState({
            studentId: event.target.value,
        })
    }   

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            courseTable: <CourseTable studentId={this.state.studentId}/>
        })
    }
    render() {
        console.log(this.state.courseTable)
        return (
            <Fragment>
                <Form horizontal='true' onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>搜尋學生課表</h1>
                    <FormControl type='text' placeholder='學號' onBlur={(e) => this.handleChange(e)} />
                    <Button variant='primary' type='submit'>搜尋</Button>
                </Form>
                { this.state.courseTable }
            </Fragment>
        )
    }
}

export default Home;