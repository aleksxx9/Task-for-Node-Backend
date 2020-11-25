process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');

const { connect, app } = require('../server');

describe('Api behaviour', () => {
    before((done) => {
        connect()
            .then(() => done())
            .catch(e => done(e))
    })

    it('Post method', (done) => {
        request(app).post('/post')
            .send({ 'action': 'New game has begun!' })
            .then((res) => {
                expect(res.body).to.contain.property('_id');
                expect(res.body).to.contain.property('action');
                expect(res.body).to.contain.property('date');
                expect(res.body).to.contain.property('__v');
                done();
            })
    })

    it('Invalid post method', (done) => {
        request(app).post('/post')
            .send({ 'actions': 'invalid action name' })
            .then(res => {
                expect(res.body.errors.action.name).to.equal('ValidatorError')
                done();
            })
    })

    it('Get method', (done) => {
        request(app).get('/get')
            .then((res) => {
                expect(res.body).to.be.a('array');
                done();
            })
    })
})