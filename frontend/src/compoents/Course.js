import React from 'react';
import { Button } from 'react-bootstrap';

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseData: this.props.course,
            courseIsSelected: this.props.course.courseIsSelected,
            isRequired: this.props.course.isRequired
        }
    }

    checkIsRequired() { 
        const { id } = this.state.courseData
        if(this.state.isRequired){
            const confirm = window.confirm("此為必修課程，確定要退選嗎?")
            if(confirm){
                this.props.onCourseSelect(id);
            }
        }else{
            this.props.onCourseSelect(id);
        }
    }

    render() {
        const courseStatus = this.state.courseIsSelected ? "退選" : "加選";
        const { title, discription } = this.state.courseData;
        return (
            <div className='course'>
                <p className="title">{title}</p>
                <p>{discription}</p>
                <Button onClick={() => this.checkIsRequired()}>{courseStatus}</Button>
            </div>
        )
    }
}

export default Course;