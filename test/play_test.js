var expect = require("chai").expect;
var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: true });

// This is a fake placeholder test that should always pass
// We will add in actual tests later

// describe("Universe", function() {
//   it("should be self-consistent", function() {
//     expect(2).to.equal(2);
//   });
// });

nightmare
  .goto("https://toy-share-app.herokuapp.com/")
  .click("#post-item-button")
  .url()
  .end()
  .then(function(result) {
    testPostNowItemRoute(result);
  })
  .catch(function(error) {
    console.error("Post new item route test failed:", error);
  });

var testPostNowItemRoute = function(result) {
  if (result !== "https://toy-share-app.herokuapp.com/posts/new") {
    throw new Error("Test clicking a crystal image failed to result in a score.");
  }
  else return result;
};

describe("testPostNowItemRoute", function() {
  it("Should should send user to /posts/new", function() {
    expect(testPostNowItemRoute('https://toy-share-app.herokuapp.com/posts/new')).to.equal('https://toy-share-app.herokuapp.com/posts/new');
  });

  it("Should throw an error if correct route is not hit", function() {
    expect(function() {
      testPostNowItemRoute('http://bad-route.io').to.throw(Error);
    });
  });
});