from email import message
import json
from tabnanny import check
from xml.etree.ElementTree import QName
from flask import Flask, request, redirect, abort, Response
import MySQLdb
import MySQLdb.cursors

app = Flask(__name__)

def db_login(func):
    def login(*awgs):
        conn = MySQLdb.connect(
            host="mysql",
            user="DatabaseAdmin",
            passwd="123456",
            db="OnlineCourseRegisterSystem",
            cursorclass = MySQLdb.cursors.DictCursor
        )
        cursor = conn.cursor()
        res = func(cursor,*awgs)
        conn.commit()
        cursor.close()
        conn.close()
        return res
    login.__name__ = func.__name__
    return login

@db_login
def check_student(cursor:'MySQLdb.cursors.Cursor',data:dict):
    query = "select * from student where student_id = '{studentId}'".format(**data)
    cursor.execute(query)
    if len(cursor.fetchall()) == 0:
        return Response(json.dumps({"code":404,"message":"Student not found."}),404)

@db_login
def check_course_instance(cursor:'MySQLdb.cursors.Cursor',data:dict):
    query = "select * from student where student_id = '{studentId}'".format(**data)
    cursor.execute(query)
    if len(cursor.fetchall()) == 0:
        return Response(json.dumps({"code":404,"message":"Course not found."}),404)

@db_login
def check_already_select(cursor:'MySQLdb.cursors.Cursor',data:dict):
    query = "select * from Selected_Course where student_id = '{studentId}' and course_instance_id = '{courseId}';".format(**data)
    cursor.execute(query)
    if len(cursor.fetchall()) != 0:
        return Response(json.dumps({"code":409,"message":"Course already selected."}),409)

@db_login
def check_not_already_select(cursor:'MySQLdb.cursors.Cursor',data:dict):
    query = "select * from Selected_Course where student_id = '{studentId}' and course_instance_id = '{courseId}';".format(**data)
    cursor.execute(query)
    if len(cursor.fetchall()) == 0:
        return Response(json.dumps({"code":409,"message":"Course not selected."}),409)

@db_login
def check_course_people(cursor:'MySQLdb.cursors.Cursor',data:dict):
    query = "select course_instance_id,now_people, max_people from course_instance where now_people < max_people and course_instance_id = '{courseId}'".format(**data)
    cursor.execute(query)
    if len(cursor.fetchall()) == 0:
        return Response(json.dumps({"code":409,"message":"Course is full."}),409)

@db_login
def check_same_course(cursor:'MySQLdb.cursors.Cursor',data:dict):
    query = "select course_id from selected_course inner join course_instance on selected_course.course_instance_id = course_instance.course_instance_id where selected_course.student_id = '{studentId}'".format(**data)
    cursor.execute(query)
    

@db_login
def check_course_conflict(cursor:'MySQLdb.cursors.Cursor',data:dict):
    query1 = """select sections.section from selected_course inner join( 
sections inner join course_instance on sections.course_instance_id = course_instance.course_instance_id) 
on selected_course.course_instance_id = course_instance.course_instance_id
where selected_course.student_id = '{studentId}';""".format(**data)
    cursor.execute(query1)
    res1 = cursor.fetchall()
    res1 = set(map(lambda x:x["section"],res1))
    query2 = """select sections.section from course_instance 
inner join sections on course_instance.course_instance_id = sections.course_instance_id 
where course_instance.course_instance_id = '{courseId}';""".format(**data)
    cursor.execute(query2)
    res2 = cursor.fetchall()
    res2 = set(map(lambda x:x["section"],res2))

    if res1&res2:
        return Response(json.dumps({"code":409,"message":"Course period conflit."}),409)
    
@db_login
def check_credit_max_limit(cursor:'MySQLdb.cursors.Cursor',data:dict):
    cur_credit = get_current_credit(data)
    query = "select Course.credit from Course_Instance inner join Course on Course_Instance.course_id = Course.course_id where Course_Instance.course_instance_id = '{courseId}';".format(**data)
    cursor.execute(query)
    if cur_credit + cursor.fetchone()["credit"] > 30:
        return Response(json.dumps({"code":409,"message":"Max credit exceed."}),409)

@db_login
def check_credit_min_limit(cursor:'MySQLdb.cursors.Cursor',data:dict):
    cur_credit = get_current_credit(data)
    query = "select Course.credit from Course_Instance inner join Course on Course_Instance.course_id = Course.course_id where Course_Instance.course_instance_id = '{courseId}';".format(**data)
    cursor.execute(query)
    if cur_credit - cursor.fetchone()["credit"] < 9:
        return Response(json.dumps({"code":409,"message":"Min credit exceed."}),409)

@db_login
def get_current_credit(cursor:'MySQLdb.cursors.Cursor',data:dict):
    query = "select credits from student where student_id = '{studentId}'".format(**data)
    cursor.execute(query)
    return cursor.fetchone()["credits"]





@app.route("/api/courseTable", methods=["POST"])
@db_login
def courseTable(cursor:'MySQLdb.cursors.Cursor'):
    require_paras = {"studentId"}
    data = request.json
    if require_paras - set(data):
        return Response(json.dumps({"code":400,"message":"Bad request."}),400)
    check_list = [check_student]
    for func in check_list:
        p = func(data)
        if p != None:
            return p
    
    query = """select Course_Instance.course_instance_id,Course.course_id,Course.course_name,Course.required,Course.credit,Course.description,Teacher.teacher_name,Sections.section from selected_course 
inner join (((course_instance inner join course on course_instance.course_id = course.course_id) 
inner join teacher on course_instance.teacher_id = teacher.teacher_id) 
inner join sections on course_instance.course_instance_id = sections.course_instance_id) 
on selected_course.course_instance_id = course_instance.course_instance_id 
where selected_course.student_id = '{studentId}';""".format(**data)
    
    cursor.execute(query)


    results = cursor.fetchall()
    return json.dumps(results)


@app.route("/api/select", methods=["POST"])
@db_login
def select(cursor:'MySQLdb.cursors.Cursor'):
    require_paras = {"studentId","courseId"}
    data = request.json
    if require_paras - set(data):
        return Response(json.dumps({"code":400,"message":"Bad request."}),400)
    check_list = [check_student,check_course_instance,check_already_select,check_course_people,check_same_course,check_course_conflict,check_credit_max_limit]
    for func in check_list:
        p = func(data)
        if p != None:
            return p
    queries = [
        "insert into selected_course(student_id, course_instance_id) values('{studentId}','{courseId}');".format(**data),
        "update student set credits = credits+(select course.credit from course_instance inner join course on course_instance.course_id = course.course_id where course_instance.course_instance_id = '{courseId}') where student_id = '{studentId}'".format(**data),
        "update course_instance set now_people = now_people+1 where course_instance_id = '{courseId}'".format(**data)
    ]
    
    for query in queries:
        cursor.execute(query)
    return Response(json.dumps({"code":200,"message":"Successed."}),200)

@app.route("/api/deselect", methods=["POST"])
@db_login
def deselect(cursor:'MySQLdb.cursors.Cursor'):
    require_paras = {"studentId","courseId"}
    data = request.json
    if require_paras - set(data):
        return Response(json.dumps({"code":400,"message":"Bad request."}),400)
    check_list = [check_student,check_course_instance,check_not_already_select,check_credit_min_limit]
    for func in check_list:
        p = func(data)
        if p != None:
            return p
    queries = [
        "delete from selected_course where student_id = '{studentId}' and course_instance_id = '{courseId}';".format(**data),
        "update student set credits = credits-(select course.credit from course_instance inner join course on course_instance.course_id = course.course_id where course_instance.course_instance_id = '{courseId}') where student_id = '{studentId}';".format(**data),
        "update course_instance set now_people = now_people-1 where course_instance_id = '{courseId}';".format(**data)
    ]
    for query in queries:
        cursor.execute(query)
    return Response(json.dumps({"code":200,"message":"Successed."}),200)


@app.route("/api/instanceCourse", methods=["POST"])
@db_login
def instanceCourse(cursor:'MySQLdb.cursors.Cursor'):
    query = """select * from ((course_instance inner join course on course_instance.course_id = course.course_id) 
inner join teacher on course_instance.teacher_id = teacher.teacher_id)
inner join sections on course_instance.course_instance_id = sections.course_instance_id 
order by course_instance.course_instance_id;"""
    
    cursor.execute(query)


    results = cursor.fetchall()
    return json.dumps(results)

@app.errorhandler(500)
def err500(e):
    return Response(json.dumps({"code":500,"message":"500 Internal server error."}))

@app.after_request
def after(response):
    data = {
        "request":request.data,
        "response":response.data
    }
    print(data)
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0",port = 5000)