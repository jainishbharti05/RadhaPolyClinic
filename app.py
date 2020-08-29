from flask import Flask, request, render_template, url_for, session, redirect
from flask_pymongo import PyMongo
from pymongo import MongoClient
from datetime import datetime, date
import bcrypt

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/RadhaPolyClinic"
mongo = PyMongo(app)


collection1 = mongo.db['Appointments']
collection2 = mongo.db['Queries']
collection3 = mongo.db['Users']


current_time = datetime.now()


@app.route('/', methods=['POST', 'GET'])
def index():
    if 'username' in session:
        return render_template('index.html', params="loggedin()")
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login_user = collection3.find_one({"Username": request.form.get('username')})
        if login_user != None:
            if bcrypt.hashpw(request.form.get('passw').encode('utf-8'), login_user['Password']) == login_user['Password']:
                session['username'] = request.form.get('username')
                return redirect(url_for('index'))
           
        return render_template('login.html', params = "invalidcredentials()")
    return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        existing_user = collection3.find_one({"Username": request.form.get('username')})
        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form.get('passw').encode('utf-8'), bcrypt.gensalt())
            collection3.insert_one({"Name": request.form.get('firstname') +" "+ request.form.get('lastname'),"Email": request.form.get('email') ,"Username": request.form.get('username'), "Password": hashpass, "Address": request.form.get('address1')+","+request.form.get('address2')+","+ request.form.get('city') +"(" +request.form.get('state')+ ") "+ "PIN: "+ request.form.get('zip')})
            session['username'] = request.form.get('username')
            return redirect(url_for('index'))
        return render_template('register.html', params ="unameexists()")
    return render_template('register.html')



@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))



@app.route('/appointment', methods=['GET', 'POST'])
def appointment():
    if request.method == 'POST':
        
        if collection1.find_one({"Appointment-date": request.form.get('date'), "Appointment-time": request.form.get('time')}) != None:
            # return f'This slot is already appointed to someone else on this date. Try an hour later on the same date or make it for some another day !'
            return render_template('appointment.html', params ="occupied()")
        
        collection1.insert_one({"Name": request.form.get('name'), "Phone": request.form.get('phone'), "Message": request.form.get('message'), "Appointment-date": request.form.get('date'), "Appointment-time":request.form.get('time')})
        # return f'Your appointment is fixed on {date} at {time}. Please be on time.'
        return render_template('appointment.html', params ="success()")
    return render_template('appointment.html')

@app.route('/home', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        name = request.form.get('name')
        phone =request.form.get('phone')
        email =request.form.get('email')
        message = request.form.get('message')
        date = current_time.strftime("%d/%m/%Y")

        collection2.insert_one({"Name": name, "Phone": phone, "Email": email, "Query": message, "Date": date})
        return render_template('index.html', params = "query()")
    return render_template('index.html')


if __name__ == "__main__":
    app.secret_key = b';t\xa5\xab\xd6\xa3\xb0dr\xf2F\xc1\x03\xba\xac#'
    app.run(debug=True)
    

