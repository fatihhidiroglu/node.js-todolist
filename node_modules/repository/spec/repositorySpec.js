var Repository = require('../lib/repository');

describe('extending repository', function () {
  var TestRepository
    , testRepository
    , conn;

  beforeEach(function () {
    TestRepository = Repository.extend({
      init: function (foo) {
        this.foo = foo;
      }
    });

    conn = jasmine.createSpyObj('connection', [ 'query' ]);

    testRepository = new TestRepository(conn, 'bar');
  });

  it('should have correct foo', function () {
    expect(testRepository.foo).toBe('bar');
  });

  it('should have correct connection', function () {
    expect(testRepository.connection).toBe(conn);
  });
});