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