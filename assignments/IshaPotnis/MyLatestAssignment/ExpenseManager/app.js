function testInterceptor() {
  return {
    request: function(config) {
      return config;
    },

    requestError: function(config) {
      return config;
    },

    response: function(res) {
      return res;
    },

    responseError: function(res) {
      return res;
    }
  }
}

angular.module('app', [])
.factory('testInterceptor', testInterceptor)
.config(function($httpProvider) {
  $httpProvider.interceptors.push('testInterceptor');
})
.run(function($http) {
  $http.get('http://localhost:8080/scripts/data.json')
    .then(function(res) {
      console.log(res.data.message)
    })
})