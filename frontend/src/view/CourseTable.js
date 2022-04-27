
import React from 'react';
import { Stack, Button, Form, FormControl } from 'react-bootstrap'
import Course from '../compoents/Course';

class CourseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: this.props.studentId,
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
        const json = await response.json();
        this.setState({ courseData: json.courseData });
    }

    async handleCourseSelect(id) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: this.state.studentId,
                courseId: id
            })
        }
        const response = await fetch('/api/select', requestOptions);
        const json = await response.json();
        switch (json.selectStatus) {
            case 1:
                this.loadCourseData();
                alert("退選成功");
                break;
            case 2:
                break;
            default:
                alert("System Error! 4044");
        }
    }

    handleChange(event) {
        this.setState({
            targetCoruseId: event.target.value,
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: this.state.studentId,
                courseId: this.state.targetCoruseId
            })
        }
        const response = await fetch('/api/submit', requestOptions);
        const json = await response.json();
        switch (json.selectStatus) {
            case 1:
                this.loadCourseData();
                alert("加選成功");
                break;
            case 2:
                alert("加選失敗，課程人數已滿!");
                break;
            case 3:
                alert("加選失敗，超出可選學分數!");
                break;
            case 4:
                alert("加選失敗，已選擇同名課程!");
                break;
            case 5:
                alert("加選失敗，課程衝堂!");
                break;
            default:
                alert("System Error! 4044");
        }
    }

    render() {
        const courseData = this.state.courseData || [];
        const courseList = courseData.map((course, i) => (
            <Course key={i} course={course} onCourseSelect={(courseId) => this.handleCourseSelect(courseId)} />
        ))
        console.log(this.state.studentId)
        return (
            <div className='course-table'>
                <h1>學生{this.state.studentId}已選擇的課程</h1>
                <div className='course-list'>
                    <Stack gap={courseData.length}>
                        {courseList}
                    </Stack>
                    <Form horizontal='true' onSubmit={(e) => this.handleSubmit(e)}>
                        <h1>加選課程</h1>
                        <FormControl type='text' placeholder='課程編號' onBlur={(e) => this.handleChange(e)} />
                        <Button variant='primary' type='submit'>加選</Button>
                    </Form>
                </div>

            </div>
        )
    }

}

export default CourseTable;