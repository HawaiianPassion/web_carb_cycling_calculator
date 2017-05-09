var APP = angular.module("my_APP", [
    'ui.router'
]);

/**
 * TODO: atomic presentational components that will accept user input as text and 
 * combo box selections and then pass data to semantic presenational component to interpret.
 */ 
APP.component('userDataForm',{
    controller: function(){
        this.text = "i got text from a component"
    },
    bindings:{
        submit: '&'
    },
    template:
        '<h1><span class="glyphicon glyphicon-tree-conifer"></span>{{$ctrl.text}}</h1>'

});

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
