'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('ClientDetails', ClientDetails);
    
ClientDetails.$inject=['CONST', '$stateParams','clients', '$firebaseObject', '$ionicActionSheet', '$timeout', '$state'];
 
/** @ngInject */
    
function ClientDetails (CONST, $stateParams, clients, $firebaseObject, $ionicActionSheet, $timeout, $state) {
    var vm = this;
    vm.inputDisplayTitle = CONST.inputDisplayTitle;
   
    clients.getClient($stateParams.userId, $stateParams.clientId)
        .$loaded()
            .then(function (data) {
                console.log(data);
                vm.clientData = data; 
        });
    
    vm.show = function() {
        var user = $stateParams.userId;
        var client = $stateParams.clientId;
   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Add New Visit' },
       { text: 'Edit' }
     ],
     destructiveText: 'Delete',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
         if (index === 0) {
            $state.go('newVisit', {userId: user , clientId:client});
            return true;
         }
     }
   });

  

 };
}

})();