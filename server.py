import json

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

class GenresView(Resource):
    def get(self):
        conn = db_connect.connect() # connect to database
        query = conn.execute("select * from genres") # This line performs query and returns json result
        result = { 'genres': [dict(zip(tuple (query.keys()), i)) for i in query.cursor.fetchall() ]}
        return jsonify(result)

class GenreView(Resource):
    def get(self, genre_id):
        conn = db_connect.connect()
        query = conn.execute("select * from genres where GenreId =%d "  %int(genre_id))
        result = {'genre': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(result)

class Genres_Insert(Resource):
	def post(self):
		conn = db_connect.connect()
		genre = request.get_json()
		sql = "insert into genres values ((select max(GenreId) + 1 from genres), ?)"
		conn.execute(sql,(genre['Name']))

class Genres_Update(Resource):
	def put(self):
		print request.get_json(force=True)
		genre = request.get_json()
		conn = db_connect.connect()		
		sql = "update genres set name=? where genreid=?"
		conn.execute(sql,(genre['Name'], genre['GenreId']))

class Genres_Delete(Resource):
	def delete(self, genre_id):
		conn = db_connect.connect()
		query = conn.execute("delete from genres where GenreId = %d" %int(genre_id))
		
api.add_resource(GenresView, '/genres') #lista
api.add_resource(GenreView, '/genres/<genre_id>') #um registro por id
api.add_resource(Genres_Delete,'/genres_delete/<genre_id>') #deleta
api.add_resource(Genres_Insert,'/genres_insert') #insere
api.add_resource(Genres_Update,'/genre_update') #atualiza


if __name__ == '__main__':
     app.run(host='0.0.0.0',port='5002')