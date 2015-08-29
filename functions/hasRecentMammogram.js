/**
 * hasRecentMammogram
 *
 * @description: determines if the patient has had a mammogram in the last 2 years.
 *
 * @param pt {Patient} - hquery patient object.
 *
 * @return {Boolean} true if the patient has had a mammogram in the last 2 years, fales otherwise.
 */
function hasRecentMammogram(pt) {

    if (!pt) {
        return false;
    }

    var lowerBound = new Date();
    lowerBound.setFullYear(lowerBound.getFullYear() - 2);

    var now = new Date();

    var system     = "LOINC";
    var conditions = [
        "^24604-1$",
        "^24605-8$",
        "^24606-6$",
        "^24610-8$",
        "^26175-0$",
        "^26176-8$",
        "^26177-6$",
        "^26287-3$",
        "^26289-9$",
        "^26291-5$",
        "^26346-7$",
        "^26347-5$",
        "^26348-3$",
        "^26349-1$",
        "^26350-$",
        "^26351-7$",
        "^49154-0$",
        "^42174-3$",
        "^72137-3$",
        "^72138-1$",
        "^72139-9$",
        "^72140-7$",
        "^72141-5$",
        "^72142-3$"
    ];

    for(var c = 0; c < conditions.length; c ++){

        if(hasLab(pt, system, conditions[c], lowerBound.getTime(), now.getTime())){
            return true;
        }

    }

    //if we get here, we haven't found any mammograms, return false.
    return false;

}