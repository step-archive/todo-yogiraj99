let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../toDoApp.js');
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('serves the /login page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName:');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
  describe('GET /login',()=>{
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName:');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
})
