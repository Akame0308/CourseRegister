import React, { Fragment } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap'
import StudentCourseTable from '../compoents/StudentCourseTable';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: null,
            courseTable: null
        }
    }
    handleChange(event) {
        this.setState({
            studentId: event.target.value.toUpperCase(),
        })
    }

    handleSubmit(event) {
        event.target[0].value="";
        event.preventDefault();
        this.setState({
            courseTable: <StudentCourseTable key={this.state.studentId} studentId={this.state.studentId} />
        })
    }
    render() {
        return (
            <Fragment>
                <Form horizontal='true' onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>搜尋學生課表</h1>
                    <div className='line-form'>
                        <FormControl className='form-control' type='text' placeholder='學號' onChange={(e) => this.handleChange(e)} />
                        <Button className='button' variant='primary' type='submit'>搜尋</Button>
                    </div>
                </Form>
                {this.state.courseTable}
            </Fragment>
        )
    }
}

export default Home;