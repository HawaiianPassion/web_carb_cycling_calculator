var app = angular.module("my_app", [
    'ui.router'
]);

app.component('statsForm',{
    controller: function(){
        this.height_field = "22";
        this.weight_field = "45";
        this.age_field = "90";
        this.gender_field = null;
    },
    bindings:{
        calculate: '&'
    },
    template:
        '<form>' +
            '<input type="text" name="height" placeholder="enter height" ng-model="$ctrl.height_field"></input>'+
            '<input type="text" name="weight" placeholder="enter weight" ng-model="$ctrl.weight_field"></input>'+
            '<input type="text" name="age" placeholder="enter age" ng-model="$ctrl.age_field"></input>'+
            '<select name="gender" ng-model="$ctrl.gender_field">'+
                '<option value="">-- Pick your gender --</option>'+
                '<option value="male">male</option>'+
                '<option value="female">female</option>'+
            '</select>'+
            '<input type="button" value="submit" ng-click="$ctrl.calculate({height: $ctrl.height_field, weight: $ctrl.weight_field, age: $ctrl.age_field, gender: $ctrl.gender_field})"></input>'+        
        '</form>'
});

app.component('bmrCalculator',{
    controller: function(){
       this.calculateBMR = function(height, weight, age, gender){
            console.log("height: "+height);
            console.log("weight: "+weight);
            console.log("age: "+age);
            console.log("gender: "+gender);
        };
    },
    template:
        '<stats-form calculate="$ctrl.calculateBMR(height, weight, age, gender)"></stats-form>'
});

app.component('adjustedBmrCalculator',{
    controller: function(){
        this.calculateAdjustedBMR = function(activity_level){
            console.log("activity_level: "+activity_level);
        };
    },
    template: '<activity-level-form on-activity-level-submit="$ctrl.calculateAdjustedBMR(activity_level)"></activity-level-form>'
});

app.component('activityLevelForm',{
    controller: function(){
        this.activity_level_field = null;
    },
    bindings:{
        onActivityLevelSubmit: '&'
    },
    template:   
            '<form> \
                <select name="activity_level" ng-model="$ctrl.activity_level_field"> \
                    <option value="">--Select Activity Level--</option> \
                    <option value="1.0">Sedentary</option> \
                    <option value="1.2">Very Light Activity</option> \
                    <option value="1.4">Light Activity</option> \
                    <option value="1.6">Moderate Activity</option> \
                    <option value="1.8">High Activity</option> \
                    <option value="2.0">Extreme Activity</option> \
                </select> \
                <input type="button" value="Calculate Adjusted BMR" ng-click="$ctrl.onActivityLevelSubmit({activity_level: $ctrl.activity_level_field})"></input> \
            </form>'
});
