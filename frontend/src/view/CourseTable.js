import React from 'react';
import { Button, Form, FormControl, Table } from 'react-bootstrap'
import Course from '../compoents/Course';
class CourseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseData:[]
        }
    }

    componentDidMount() {
        this.loadCourseData()
    }

    async loadCourseData() {
        const requestOptions = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' }
        }

        const response = await fetch('/api/instanceCourse', requestOptions);
        const json = await response.json();
        this.setState({ courseData: json.courseData });
    }


    handleChange(event) {
        console.log(event);
        this.setState({
            targetCoruseId: event.target.value,
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: this.state.studentId,
                courseId: this.state.targetCoruseId
            })
        }
        const response = await fetch('/api/submit', requestOptions);
        const json = await response.json();
      
    }

    render() {
        const courseData = this.state.courseData || [];
        const courseList = courseData?.map((course) => (
            <Course key={course} courseData={course} onCourseSelect={(courseId) => this.handleCourseSelect(courseId)} />
        )) || [];
        // console.log(courseData);
        return (
            <div className='course-table'>
                <h1>已登記課程</h1>
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
                                <th>加選</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseList}
                        </tbody>
                    </Table>

                </div>

            </div >
        )
    }

}

export default CourseTable;