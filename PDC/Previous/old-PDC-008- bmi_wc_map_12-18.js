// Reference Number: PDC-008
// Query Title: BMI or WC documented in last 2 yrs 12 - 19

function map(patient) {
    var targetWaistCircumferenceCodes = {
        "LOINC": ["56115-9"]
    };

    var targetHeightCodes = {
        "LOINC": ["8302-2"]
    };

    var targetWeightCodes = {
        "LOINC": ["3141-9"]
    };

    var targetBMICodes = {
        "LOINC": ["39156-5"]
    };

    var ageMin = 12;
    var ageMax = 18;

    var vitalSignList = patient.vitalSigns();

    var now = new Date(2013, 10, 30);
    var start = addDate(now, -2, 0, 0);
    var end = addDate(now, 0, 0, 0);

    // Shifts date by year, month, and date specified
    function addDate(date, y, m, d) {
        var n = new Date(date);
        n.setFullYear(date.getFullYear() + (y || 0));
        n.setMonth(date.getMonth() + (m || 0));
        n.setDate(date.getDate() + (d || 0));
        return n;
    }

    // Checks if patient is older than ageLimit
    function population(patient) {
        return ((ageMin <= patient.age(now)) && patient.age(now) <= ageMax);
    }

    function hasWaistCircumference() {
        return vitalSignList.match(targetWaistCircumferenceCodes, start, end).length;
    }

    function hasHeight() {
        return vitalSignList.match(targetHeightCodes, start, end).length;
    }

    function hasWeight() {
        return vitalSignList.match(targetWeightCodes, start, end).length;
    }

    function hasBMI() {
        return vitalSignList.match(targetBMICodes, start, end).length;
    }

    function hasRecordedValues() {
        return hasWaistCircumference() || hasBMI() || (hasHeight() && hasWeight());
    }

    //emr_primary_care_provider_id"
    if (population(patient)) {
        emit("denominator", 1);
        emit("denominator_" + patient['json']['primary_care_provider_id'], 1);
        if (hasRecordedValues()) {
            emit("numerator", 1);
            emit("numerator_" + patient['json']['primary_care_provider_id'], 1);
        }
    }

    // Empty Case
    emit("numerator", 0);
    emit("numerator_" + patient['json']['primary_care_provider_id'], 0);
    emit("denominator", 0);
    emit("denominator_" + patient['json']['primary_care_provider_id'], 0);
}
