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