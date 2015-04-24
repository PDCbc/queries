## PDC-053_polypharmacy-5 Test Plan

### Query Description 

*  The percentage of elderly patients, 65 and older, that are active patients and are on 5 or more current medications.
*  A current medication is defined as: 
    - Prescribed and, by date, is still current (use 1.2 multiplier for duration estimate for regular medications
        +  eg. 10 day Rx is still “current” at day 12).    
    - The medication is flagged as "ongoing" or "long term" even if there is no current prescription
    - PRN (as needed) and OTCs (over the counter) medications that are documented are included if the meet the 2 previous criteria. 
* Query Numerator:
    - Active patient
    - Age > 64 years (today - birthday > 64)
* Query Denominator: 
    - Active patient
    - Age > 64 years (today - birthday > 64)
    - Count of active medications >=5, count the following:
        +  a prescription where start\_date >= today AND [ 
            today <= (start\_date + (stop\_date - start\_date)*1.2) OR 
            prescription\_state = "LONG TERM"]


### Test Cases

* TC1:
    - **Description:** Test on an empty dataset.
    - **Input:** An empty set of patients.
    - **Output:** An empty array. 

* TC2: 
    - **Description:** test age brackets, should reject people under age 65.
    - **Input:** 5 patients, ages 65, 65, 65, 65, 100
    - **Output:** numerator of zero, denominator of 2. 
        +   `[ { _id: 'denominator_PROVIDER1', value: 2 }, { _id: 'numerator_PROVIDER1', value: 0 } ]`

* TC3: 
    - **Description:** Test patients all above 65, with less than 5 medications, all medications are active.
    - **Input:** 5 patients, ages >= 65, 1 of each:  
        + 0 medications, 1 medication, 2 medications, 3 medications, 4 medications.
        + All medications after active medications, with an end date in 2100. 
    - **Output:** numerator of zero, denominator of 5. 
        +   `[ { _id: 'denominator_PROVIDER1', value: 5 }, { _id: 'numerator_PROVIDER1', value: 0 } ]`

* TC4: 
    - **Description:** Test 4 records with patients all above age 65, with between 5 and 15 medications.
    - **Input:** 4 patients, ages >= 65, 1 of each:
        + 5 medications, 6 medications, 10 medications, 15 medications
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 4 }, { _id: 'numerator_PROVIDER1', value: 4 } ]`

* TC5:
    - **Description:** Test multiple providers
    - **Input:** 8 patients:
        1. (provider1, age < 65, 1 medication) (done)
        2. (provider1, age >= 65, 1 medication) (done)
        3. (provider1, age < 65, 5 medications) (done)
        4. (provider1, age >= 65, 5 medications) (done)
        5. (provider2, age < 65, 1 medication)
        6. (provider2, age >= 65, 1 medication)
        7. (provider2, age < 65, 5 medications)
        8. (provider2, age >= 65, 5 medications)
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 1 }, { _id: 'numerator_PROVIDER1', value: 4 }, { _id: 'numerator_PROVIDER2', value: 1 }, { _id: 'numerator_PROVIDER2', value: 4 } ]`

* TC6:
    - **Description:** test patients with no meds
    - **Input:** 2 patients, one age < 65, one age >= 65, both without medications
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 1 }, { _id: 'numerator_PROVIDER1', value: 0 } ]` 


* TC7: different codes -> valid
* TC8: patient with medication without code for a med -> count
    - Not implemented due to limitation of patient API
* TC9: code with code system -> should fail -> count this med
* TC10: Duplicate meds? 
* TC11: Long term flags 