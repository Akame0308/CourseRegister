import React from 'react';
import { Table, Button, Form, FormControl } from 'react-bootstrap'
import Course from './Course';

class StudentCourseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: this.props.studentId,
            courseData: [],
        }
    }

    componentDidMount() {
        this.loadCourseData()
    }

    async loadCourseData() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: this.state.studentId,
            })
        }

        const response = await fetch('/api/courseTable', requestOptions);
        if (!response.ok) {
            alert("未搜尋到該學號，請重新輸入或聯絡客服人員!")
        } else {
            const json = await response.json();
            this.setState({ courseData: json });
        }
    }

    async handleCourseDeselect(id) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: this.state.studentId,
                courseId: id
            })
        }
        const response = await fetch('/api/deselect', requestOptions);
        if (!response.ok) {
            const json = await response.json();
            alert(json?.message);
        }else{
            const json = await response.json();
            alert(json?.message);
            this.loadCourseData();
        }
    }

    handleChange(event) {
        this.setState({
            targetCoruseId: event.target.value,
        })
    }

    async handleSubmit(event) {
        event.target[0].value = "";
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: this.state.studentId,
                courseId: this.state.targetCoruseId
            })
        }
        const response = await fetch('/api/select', requestOptions);
        if (!response.ok) {
            const json = await response.json();
            alert(json?.message);
        }else{
            const json = await response.json();
            alert(json?.message);
            this.loadCourseData();
        }
    }

    render() {
        const courseData = this.state.courseData || [];
        const courseList = courseData?.map((course) => (
            <Course key={course.section} courseData={course} onCourseDeselect={(courseId) => this.handleCourseDeselect(courseId)} />
        )) || [];
        // console.log(courseData);
        return (
            <div className='course-table'>
                <h1>學生{this.state.studentId}已選擇的課程</h1>
                <div className='course-list'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>課程編號</th>
                                <th>課程</th>
                                <th>課程描述</th>
                                <th>教師</th>
                                <th>必選修</th>
                                <th>節次</th>
                                <th>退選</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseList}
                        </tbody>
                    </Table>
                    <Form horizontal='true' onSubmit={(e) => this.handleSubmit(e)}>
                        <h1>加選課程</h1>
                        <div className='line-form'>
                            <FormControl className='form-control' type='text' placeholder='課程編號' onChange={(e) => this.handleChange(e)} />
                            <Button className='button' variant='primary' type='submit'>加選</Button>
                        </div>
                    </Form>
                </div>

            </div>
        )
    }

}

export default StudentCourseTable;