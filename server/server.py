from flask import Flask, request, redirect
import MySQLdb

app = Flask(__name__)

def db_login(func,*awgs):
    def login():
        conn = MySQLdb.connect(host="mysql",
                           user="DatabaseAdmin",
                           passwd="123456",
                           db="OnlineCourseRegisterSystem")
        cursor = conn.cursor()
        res = func(conn,cursor,*awgs)
        conn.commit()
        conn.close()
        return res
    return login

@app.route('/')
def index():
    return redirect("/index.html",301)

@app.route("/api/courseTable", methods=["POST"])
@db_login
def all_course(conn=None,cursor=None):
    data = request.json
    query = "select * from selected_course inner join (((course_instance inner join course on course_instance.course_id = course.course_id) inner join teacher on course_instance.teacher_id = teacher.teacher_id)inner join sections on course_instance.course_instance_id = sections.course_instance_id) on selected_course.course_instance_id = course_instance.course_instance_id where selected_course.student_id = '{studentId}'".format(**data)
    
    cursor.execute(query)

    results = """
    <p><a href="/">Back to Query Interface</a></p>
    """
    # 取得並列出所有查詢結果
    results = "\n".join(str(cursor.fetchall()))
    return results


@app.route('/action', methods=['POST'])
def action():
    # 取得輸入的文字
    my_head = request.form.get("my_head")
    # 建立資料庫連線
    # 欲查詢的 query 指令
    query = my_head #"SELECT description FROM people where name LIKE '{}%';".format(my_head)
    # 執行查詢
    #cursor.execute(query)

    results = """
    <p><a href="/">Back to Query Interface</a></p>
    """
    # 取得並列出所有查詢結果
    #results = "\n".join(str(cursor.fetchall()))
    return results

@app.after_request
def after(response):
    print(response)
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0",port = 5000)