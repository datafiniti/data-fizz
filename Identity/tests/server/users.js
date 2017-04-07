
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const model = require('../../server/models/users');

const should = chai.should();
const User = model.User;

chai.use(chaiHttp);

describe('Users', () => {
	beforeEach((done) => {
		User.remove({}, (err) => {
			done();
		});
	}); 

	describe('/Create user', () => {
		it('should not create a user without a name, username, email, and password', (done) => {
			let user = {
				name: '',
				username: '',
				email: '',
				password: ''
			};

			chai.request('http://localhost:8000')
				.post('/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.res.should.have.property('errors');
					res.body.res.errors.should.have.property('name');
					res.body.res.errors.should.have.property('username');
					res.body.res.errors.should.have.property('email');
					res.body.res.errors.should.have.property('password');

					res.body.res.errors.name.should.have.property('kind').eql('required');
					res.body.res.errors.username.should.have.property('kind').eql('required');
					res.body.res.errors.email.should.have.property('kind').eql('required');
					res.body.res.errors.name.should.have.property('kind').eql('required');
				done();
			});
		});

		it('should create a user', (done) => {
			let user = {
				name: 'name',
				username: 'username',
				email: 'test@gmail.com',
				password: 'testpassword'
			};

			chai.request('localhost:8000')
				.post('/users')
				.send(user)
				.end((err, res) => {
					console.log(res);
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.res.record.should.have.property('name');
					res.body.res.record.should.have.property('username');
					res.body.res.record.should.have.property('email');
					res.body.res.record.should.have.property('password');
					res.body.res.token.should.be.a('string');
				done();
			});
		});
	});
});