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
    - **Input:** 5 patients, ages 0, 1, 64, 65, 66, 100
    - **Output:** numerator of zero, denominator of 3. 
        +   `[ { _id: 'denominator_PROVIDER1', value: 3 }, { _id: 'numerator_PROVIDER1', value: 0 } ]`

* TC3: 
    - **Description:** Test patients all above 65, with less than 5 medications, all medications are active.
    - **Input:** 5 patients, ages >= 65, 1 of each:  
        + 0 medications, 1 medication, 2 medications, 3 medications, 4 medications.
        + All medications after active medications
            * start dates are current time - 1 year
            * end dates are current time + 1 years
    - **Output:** numerator of zero, denominator of 5. 
        +   `[ { _id: 'denominator_PROVIDER1', value: 5 }, { _id: 'numerator_PROVIDER1', value: 0 } ]`

* TC4: 
    - **Description:** Test 4 records with patients all above age 65, with between 5 and 15 medications.
    - **Input:** 4 patients, ages >= 65, 1 of each:
        + 5 medications, 6 medications, 10 medications, 15 medications
        + medications are active: 
            * start_time = current_time - 1 year
            * end_time = current_time + 1 year
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 4 }, { _id: 'numerator_PROVIDER1', value: 4 } ]`
    - **Note:** 
        + This test uses the same pre-processor as the TC3, as they share the same changes to the patient structure. 

* TC5:
    - **Description:** Test multiple providers
    - **Input:** 8 patients, on varying levels of medications (all are active, start = current - 1, end = current + 1)
        1. (provider1, age < 65, 1 medication) 
        2. (provider1, age >= 65, 1 medication) 
        3. (provider1, age < 65, 5 medications) 
        4. (provider1, age >= 65, 5 medications) 
        5. (provider2, age < 65, 1 medication)
        6. (provider2, age >= 65, 1 medication)
        7. (provider2, age < 65, 5 medications)
        8. (provider2, age >= 65, 5 medications)
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 1 }, { _id: 'numerator_PROVIDER1', value: 4 }, { _id: 'numerator_PROVIDER2', value: 1 }, { _id: 'numerator_PROVIDER2', value: 4 } ]`
    - **Note:** 
        + This test uses the same pre-processor as the TC3, as they share the same changes to the patient structure. 

* TC6: 
    - **Description:** Test active medication that has start time in past and end time in future 
    - **Input:** 1 patient with age = 70, 5 medications all like:
        + 1 medication with: start = current - 1, end = current + 1
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 0 }, { _id: 'numerator_PROVIDER1', value: 1 } ]`
    - **Note:** 
        + This test uses the same pre-processor as the TC3, as they share the same changes to the patient structure. 

* TC7: 
    - **Description:** Test active medication that has start time in future and end time in more future
    - **Input:** 1 patient with age = 70, 5 medications all like:
        + 1 medication with: start = current + 1, end = current + 2
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 0 }, { _id: 'numerator_PROVIDER1', value: 1 } ]`
    - **Note:** 
        + This test uses the same pre-processor as the TC3, as they share the same changes to the patient structure. 

* TC9: 
    - **Description:** Test active medication that has start time in the future and end time in the past 
    - **Input:** 1 patient with age = 70, 5 medications all like:
        + 1 medication with: start = current + 2, end = current - 2
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 0 }, { _id: 'numerator_PROVIDER1', value: 1 } ]`
    - **Note:** 
        + This test uses the same pre-processor as the TC3, as they share the same changes to the patient structure. 

* TC10: 
    - **Description:** Test active medication that has a length that is within the duration+20% window. 
    - **Input:** 1 patient age 70, with 5 medications:
        + start = current - 1 year
        + end = current - 66 days (within the 20%, approximately 18% of a year). 
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 1 }, { _id: 'numerator_PROVIDER1', value: 1 } ]`

* TC11: 
    - **Description:** Test active medication that has a length that is just outside the duration+20% window. 
    - **Input:** 1 patient age 70, with 5 medications:
        + start = current - 1 year
        + end = current - 77 days (outside the 20%, approximately 21% of a year). 
    - **Output:** 
        + `[ { _id: 'denominator_PROVIDER1', value: 0 }, { _id: 'numerator_PROVIDER1', value: 1 } ]`
    - **Note:** 
        + This test uses the same pre-processor as the TC10, as they share a similar pre-processor requirement. 



### Notes 

* time windows on prescriptions
* different codes -> valid
* patient with medication without code for a med -> count
    - Not implemented due to limitation of patient API
* code with code system -> should fail -> count this med
* Duplicate meds? 
* Long term flags 