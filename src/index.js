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

    $scope.height = 178;
    $scope.weight = 99.7903;
    $scope.age = 30;
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
        height = parseFloat(Number(height).toFixed(2));
        weight = parseFloat(Number(weight).toFixed(2))
        age = parseInt(Number(age));
        activity_level = parseFloat(Number(activity_level));
        protein = parseFloat(Number(protein).toFixed(3));
        
        // calculate the basic bmr
        var bmr = set_regular_bmr(weight,height,age,gender);

        // calculate the goal-oriented bmr
        var goal_oriented_bmr = set_goal_bmr(bmr,activity_level,goal);

        // set the daily macros
        if(!set_protein_intake(weight * kg_to_lbs_multiplier,protein)){
            console.log("failed to calculate daily protein intake");
            return;
        }
        if(!set_carbohydrate_intake(weight * kg_to_lbs_multiplier,goal)){
            console.log("failed to calculate daily carbohydrate intake");
            return;
        }
        if(!set_fat_intake(daily_macros.moderate.protein,daily_macros.moderate.carbohydrates,goal_oriented_bmr)){
            console.log("failed to calculate daily fat intake");
            return;
        }
        // display
        console.log(daily_macros);
    };
   
    var set_regular_bmr = function(weight,height,age,gender){
        if(!(weight && height && age)){
            return null;
        }
        if (gender === 'male'){
            return 66 + 13.7 * weight + 5 * height - 6.8 * age;
        }
        else if (gender === 'female'){
            return 655 + 9.6 * weight + 1.7 * height - 4.7 * age;
        }
    };

    var set_goal_bmr = function(bmr,activity_level,goal){
        if(!(bmr,activity_level)){
            return null;
        }
        var goal_oriented_bmr = parseInt(bmr * activity_level); // if the goal was to maintain, then we only need to apply the activity level adjustment
        if (goal === "Cut"){
            return (goal_oriented_bmr - goal_oriented_bmr*0.2);
        }
        else if (goal === "Gain"){
            return (goal_oriented_bmr + goal_oriented_bmr*0.2);
        }
        else{
            return goal_oriented_bmr;
        }
    };

    var set_protein_intake = function(weight,protein){
        if(!(weight && protein)){
            return false;
        }
        var intake = parseInt(weight * protein);
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
            moderate = parseInt(1.25*weight);
            daily_macros.moderate.carbohydrates = moderate;
            daily_macros.high.carbohydrates = parseInt(moderate*1.25);
            daily_macros.low.carbohydrates = parseInt(moderate*0.75);
        }
        else if (goal === "Gain"){
            daily_macros.moderate.carbohydrates = moderate;
            daily_macros.high.carbohydrates = parseInt(moderate*1.25);
            daily_macros.low.carbohydrates = parseInt(moderate*0.75);
        }
        else{
            daily_macros.moderate.carbohydrates = moderate;
            daily_macros.high.carbohydrates = moderate;
            daily_macros.low.carbohydrates = moderate;
        }
        return true;
    };

    var set_fat_intake = function(protein, carbohydrates, bmr){
        if (!(protein && carbohydrates && bmr)){
            return false;
        }
        var intake = parseInt((bmr - 4 * (protein + carbohydrates))/9);
        daily_macros.moderate.fats = intake;
        daily_macros.high.fats = intake;
        daily_macros.low.fats = intake;
        return true;
    };
});