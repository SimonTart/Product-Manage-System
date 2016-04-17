var app = require('../../app.js');
var request = require('supertest')(app);
var should = require('should');
describe('/controllers/login.js', function() {
    describe('/api/login', function() {
        it('it should sign up success', function(done) {
            request.post('/api/login')
                .send({
                    account: 'test1',
                    password: 'test123'
                })
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.statusCode.should.equal(0);
                    res.body.message.should.equal('登录成功');
                    done();
                });
        });
        it('it should sign up fail when account wrong', function(done) {
            request.post('/api/login')
                .send({
                    account: 'test111',
                    password: 'test123'
                })
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.statusCode.should.equal(1);
                    res.body.message.should.equal('用户名或密码错误');
                    done();
                });
        });
        it('it should sign up fail when password wrong', function(done) {
            request.post('/api/login')
                .send({
                    account: 'test111',
                    password: '9879'
                })
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.statusCode.should.equal(1);
                    res.body.message.should.equal('用户名或密码错误');
                    done();
                });
        });
        it('it should sign up fail when account empty', function(done) {
            request.post('/api/login')
                .send({
                    account: '',
                    password: '9879'
                })
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.statusCode.should.equal(-1);
                    res.body.message.should.equal('用户名或密码为空');
                    done();
                });
        });
        it('it should sign up fail when password empty', function(done) {
            request.post('/api/login')
                .send({
                    account: '',
                    password: '9879'
                })
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.statusCode.should.equal(-1);
                    res.body.message.should.equal('用户名或密码为空');
                    done();
                });
        });
    });

});
