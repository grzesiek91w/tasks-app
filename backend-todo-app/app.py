from flask import Flask, jsonify, request, make_response 

from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

CORS(app)  # This will enable CORS for all routes

@app.after_request
def add_csp_header(response):

    # Adjust the CSP to allow the favicon

    response.headers['Content-Security-Policy'] = "default-src 'self'; img-src 'self' data: http://localhost:5000; script-src 'self'; style-src 'self';"

    return response




app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)



class Task(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100), nullable=False)

    description = db.Column(db.String(200), nullable=True)


    def to_dict(self):

        return {"id": self.id, "title": self.title, "description": self.description}

# Create the database tables

def create_db():

    with app.app_context():

        db.create_all()

# db.create_all()


@app.route('/tasks', methods=['POST'])

def create_task():

    data = request.get_json()

    new_task = Task(title=data['title'], description=data.get('description'))

    db.session.add(new_task)

    db.session.commit()

    return jsonify(new_task.to_dict()), 201


@app.route('/tasks', methods=['GET'])

def list_tasks():

    tasks = Task.query.all()

    return jsonify([task.to_dict() for task in tasks]), 200


@app.route('/tasks/<int:task_id>', methods=['PUT'])

def update_task(task_id):

    task = Task.query.get_or_404(task_id)

    data = request.get_json()

    task.title = data.get('title', task.title)

    task.description = data.get('description', task.description)

    db.session.commit()

    return jsonify(task.to_dict()), 200


@app.route('/tasks/<int:task_id>', methods=['DELETE'])

def delete_task(task_id):

    task = Task.query.get_or_404(task_id)

    db.session.delete(task)

    db.session.commit()

    return jsonify({"message": "Task deleted"}), 204

if __name__ == '__main__':
    create_db()  # Call the function to create the database
    app.run(debug=True, host='0.0.0.0', port=5000)
