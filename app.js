var APP = angular.module("my_APP", [
    'ui.router'
]);

/**
 * TODO: atomic presentational components that will accept user input as text and 
 * combo box selections and then pass data to semantic presenational component to interpret.
 */ 
APP.component('statsForm',{
    controller: function($scope){
        $scope.height_field = "22";
        $scope.weight_field = "45";
        $scope.age_field = "90";
        $scope.gender_field = null;

        $scope.calculateBMR= function(height, weight, age, gender){
            console.log("height: "+height);
            console.log("weight: "+weight);
            console.log("age: "+age);
            console.log("gender: "+gender);
        };
    },
    template:
        '<form>' +
            '<input type="text" name="height" placeholder="enter height" ng-model="$ctrl.height_field"></input>'+
            '<input type="text" name="weight" placeholder="enter weight" ng-model="$ctrl.weight_field"></input>'+
            '<input type="text" name="age" placeholder="enter age" ng-model="$ctrl.age_field"></input>'+
            '<select name="gender" ng-model="gender_field">'+
                '<option value="">-- Pick your gender --</option>'+
                '<option value="male">male</option>'+
                '<option value="female">female</option>'+
            '</select>'+
            '<input type="button" value="submit" onclick="$ctrl.calculateBMR($ctrl.height_field, $ctrl.weight_field, $ctrl.age_field, $ctrl.gender_field)"></input>'+        
            '</form>'
});

// App.component('bmrCalculator',{
//     controller: function(){
//         this.calculateBMR= function(height, weight, age, gender){
//             console.log("height: "+height);
//             console.log("weight: "+weight);
//             console.log("age: "+age);
//             console.log("gender: "+gender);
//         };
//     },
//     template:
//             // '<input type="text" name="height" placeholder="enter height" ng-model="$ctrl.height_field"></input>'
//         '<stats-form></stats-form>'
// });

/**
 * TODO: atomic presentational component that displays the calculated numbers
 */


/**
 * TODO: atomic presentational component that displays the BMR measurements
 */


/**
 * TODO: atomic presentational components that will accept user input as button clicks
 * to either calculate data or reset the fields.
 */ 
