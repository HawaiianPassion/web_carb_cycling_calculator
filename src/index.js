var app = angular.module("my_app", [
    // 'ui.router'
]);

app.controller("main_controller",function($scope, $filter){
    var daily_macros = {
        high: {
            protein:null,
            carbohydrates:null,
            fats:null
        },
        moderate: {
            protein:null,
            carbohydrates:null,
            fats:null
        },
        low: {
            protein:null,
            carbohydrates:null,
            fats:null
        }
    };

    var kg_to_lbs_multiplier = 2.2;
    var protein_multiplier = 4;
    var carb_multiplier = 4;
    var fat_multiplier = 9;

    $scope.height = 172.729;
    $scope.weight = 99.7903;
    $scope.age = 21.45;
    $scope.gender = "male";
    $scope.activity_level = "1.6";
    $scope.goal = "Gain";
    $scope.protein = "1.50";
    
    $scope.calculate = function(height, weight, age, gender, activity_level, goal, protein){
        if (!(height && weight && age && gender && activity_level && goal && protein)){
            console.log('please specify all inputs and selections');
            return;
        }
        if (height < 0 || weight < 0 || age < 0){
            console.log("cannot use negative values");
            return;
        }

        // normalize the input
        height = $filter('number')(height, 2);
        weight = $filter('number')(weight, 2);
        age = $filter('number')(age,0);
        activity_level = $filter('number')(activity_level, 1);
        protein = $filter('number')(protein, 2);
        
        var bmr;
        if (gender === 'male'){
            bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
        }
        else if (gender === 'female'){
            bmr = 655 + 9.6 * weight + 1.7 * height - 4.7 * age;
        }

        // console.log(height);
        // console.log(weight);
        // console.log(age);
        // console.log(activity_level);
        // console.log(goal);
        // console.log(protein);
        if(!set_protein_intake(weight * kg_to_lbs_multiplier,protein)){
            console.log("failed to calculate daily protein intake");
            return;
        }
        if(!set_carbohydrate_intake(weight * kg_to_lbs_multiplier,goal)){
            console.log("failed to calculate daily carbohydrate intake");
            return;
        }
        console.log(daily_macros);
    };
   
    var set_protein_intake = function(weight,protein){
        if(!(weight && protein)){
            return false;
        }
        var intake = $filter('number')(weight * protein,0);
        daily_macros.high.protein=intake;
        daily_macros.moderate.protein=intake;
        daily_macros.low.protein=intake;
        return true
    };

    var set_carbohydrate_intake = function(weight,goal){
        if(!(weight && goal)){
            return false;
        }
        var moderate = daily_macros.moderate.protein;;
        if (goal === "Cut"){
            moderate = 1.25*weight;
            daily_macros.moderate.carbohydrates = $filter('number')(moderate,0);
            daily_macros.high.carbohydrates = $filter('number')(moderate*1.25,0);
            daily_macros.low.carbohydrates = $filter('number')(moderate*0.75,0);
        }
        if (goal === "Gain"){
            daily_macros.moderate.carbohydrates = $filter('number')(moderate,0);
            daily_macros.high.carbohydrates = $filter('number')(moderate*1.25,0);
            daily_macros.low.carbohydrates = $filter('number')(moderate*0.75,0);
        }
        else{
            moderate = $filter('number')(moderate,0);
            daily_macros.moderate.carbohydrates = moderate;
            daily_macros.high.carbohydrates = moderate;
            daily_macros.low.carbohydrates = moderate;
        }
        return true;
    }
});