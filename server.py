from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask_jsonpify import jsonify
from flask_cors import CORS, cross_origin

db_connect = create_engine('sqlite:///chinook.db')
app = Flask(__name__)
api = Api(app)

CORS(app)

class Genres(Resource):
    def get(self):
        conn = db_connect.connect() # connect to database
        query = conn.execute("select * from genres") # This line performs query and returns json result
        result = { 'genres': [dict(zip(tuple (query.keys()), i)) for i in query.cursor.fetchall() ]}
        return jsonify(result)

class Genre(Resource):
    def get(self, genre_id):
        conn = db_connect.connect()
        query = conn.execute("select * from genres where GenreId =%d "  %int(genre_id))
        result = {'genre': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(result)

class Genres_Delete(Resource):
	def delete(self, genre_id):
		conn = db_connect.connect()
		query = conn.execute("delete from genres where GenreId = %d" %int(genre_id))

class Genres_Insert(Resource):
	def post(self):
		conn = db_connect.connect()
		newName = request.data
		sql = "insert into genres values ((select max(GenreId) + 1 from genres), ?)"
		conn.execute(sql,(newName))

class Genres_Update(Resource):
	def post(self, genre_id):
		conn = db_connect.connect()
		newName = request.data
		sql = "update genres set name=? where genre_id=?"
		conn.execute(sql,(newName,genre_id))
		
api.add_resource(Genres, '/genres') # Route_1
api.add_resource(Genre, '/genres/<genre_id>') # Route_3
api.add_resource(Genres_Delete,'/genres_delete/<genre_id>') #teste com remocao
api.add_resource(Genres_Insert,'/genres_insert/<genre_name>') #teste com insert
api.add_resource(Genres_Update,'/genres_update/<genre_id>') #atualiza nome


if __name__ == '__main__':
     app.run(host='0.0.0.0',port='5002')