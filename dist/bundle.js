/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var app = angular.module("my_app", [
    // 'ui.router'
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
            if (height && weight && age && gender){
                var bmr;

                if (gender === 'male'){
                    bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
                }
                else if (gender === 'female'){
                    bmr = 655 + 9.6 * weight + 1.7 * height - 4.7 * age;
                }

                console.log('bmr: ' + bmr);
            }
            else{
                console.log('please specify all fields');
            }
        };
    },
    template:
        '<stats-form calculate="$ctrl.calculateBMR(height, weight, age, gender)"></stats-form>'
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

app.component('adjustedBmrCalculator',{
    controller: function(){
        this.calculateAdjustedBMR = function(activity_level){
            console.log("activity_level: "+activity_level);
        };
    },
    template: '<activity-level-form on-activity-level-submit="$ctrl.calculateAdjustedBMR(activity_level)"></activity-level-form>'
});

/***/ })
/******/ ]);