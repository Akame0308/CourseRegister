from flask import Flask, request
import MySQLdb

app = Flask(__name__)


@app.route('/')
def index():
    form = """
    <form method="post" action="/action" >
        文字輸出欄位：<input name="my_head">
        <input type="submit" value="送出">
    </form>
    """
    return form


@app.route('/action', methods=['POST'])
def action():
    # 取得輸入的文字
    my_head = request.form.get("my_head")
    # 建立資料庫連線
    conn = MySQLdb.connect(host="mysql",
                           user="DatabaseAdmin",
                           passwd="123456",
                           db="OnlineCourseRegisterSystem")
    # 欲查詢的 query 指令
    query = my_head #"SELECT description FROM people where name LIKE '{}%';".format(my_head)
    # 執行查詢
    cursor = conn.cursor()
    cursor.execute(query)

    results = """
    <p><a href="/">Back to Query Interface</a></p>
    """
    # 取得並列出所有查詢結果
    results = "\n".join(str(cursor.fetchall()))
    return results

if __name__ == "__main__":
    app.run(host="0.0.0.0",port = 80)