## Test Plan: PDC-001

* provider id: 
    - need to spread across three different providers
    - Should be strings
        + need to test cases of integers. 

* Tests need to mix genders 
    - `"M"` -> `male`
    - `"F"` -> `female`
    - `"UN"` -> `undifferentiated`
    - `""` -> `undefined`
    - Make sure all genders are in the emit. 

* Test ages: 
    - if age is not a number
        + do not count
    - if age is less than zero
        + do not count
    - if age is undefined
        + do not count
    - if age >= 90
        + emit 90+
    - ensure we have ages in each age bracket

* Test Patients: 
    - TC1:
        + description : provider is given, but age is not a number
        + input: `{provider : "PROVIDER1", age : String}`
        + output: nothing, this will not appear in the output. 
    - TC2: 
        + description: provider is given, but age is less than zero. 
        + input: `{provider "PROVIDER1", age : 32513350556} ` //birthdate is in year 3000....
        + output: nothing should be emitted for this input. 
    - TC3: 
        + description: provider is not given
        + input: `{age : 956441756}`
        + output: nothing should be emitted.
    - TC4:
        + description: provider is a integer (not string)
        + input: `{provider : 1, birthday: 956441756}`
        + output: should emit with this provider id as an integer. 
    - TC5: 
        + description: test gender as male, age is 11 years old. 
        + input: `{provider: "PROVIDER1", birthdate: 1072918861, gender:"M"}` //born Jan 1 2004.
        + output: Expected to emit `male_10-19_PROVIDER1` once
    - TC6: 
        + description: test gender as female, age is 11 years old. 
        + input: `{provider: "PROVIDER1", birthdate: 1072918861, gender:"F"}` //born Jan 1 2004.
        + output: Expected to emit `female_10-19_PROVIDER1` once
    - TC7: 
        + description: test gender as undifferentiate, age is 11 years old. 
        + input: `{provider: "PROVIDER1", birthdate: 1072918861, gender:"UN"}` //born Jan 1 2004.
        + output: Expected to emit `undifferentiated_10-19_PROVIDER1` once  
    - TC8: 
        + description: test no gender given. 
        + input: `{provider: "PROVIDER1", birthdate: 1072918861}` //born Jan 1 2004.
        + output: Expected to emit `undefined_10-19_PROVIDER1` once
    - TC9:
        + description: test invalid gender input given.
        + input: `{provider: "PROVIDER1", birthdate: 1072918861, gender:"INVALIDGENDER"}` //born Jan 1 2004.
        + output: Expected to emit `undefined_10-19_PROVIDER1` once
    - TC10:
        + description: test gender as a non-string type
        + input: `{provider: "PROVIDER1", birthdate: 1072918861, gender:1234}` //born Jan 1 2004.
        + output: Expected to emit `undefined_10-19_PROVIDER1` once
    - TC11: 
        + description: test age greater than or equal to 90. 
        + input: `{provider: "PROVIDER1", birthdate: -2208985139, gender:"M"}` //born Jan 1st 1900. 
        + output: Expected to emit `male_90+_PROVIDER1` once
    - TC12: 
        + description: test age >= 0 and age <= 9
        + input: `{provider: "PROVIDER1", birthdate: 1388538061, gender:"M"}` //born Jan 1st 2014, is 1 year old. 
        + output: Expected to emit `male_0-9_PROVIDER1` once
    - TC13: 
        + description: test age >= 20 and age <= 29
        + input: `{provider: "PROVIDER1", birthdate: 757386061, gender:"F"}` //born Jan 1st 1994, is 21 year old. 
        + output: Expected to emit `female_20-29_PROVIDER1` once
    - TC14: 
        + description: test age >= 30 and age <= 39
        + input: `{provider: "PROVIDER1", birthdate: 441766861, gender:"F"}` //born Jan 1st 1984, is 31 year old. 
        + output: Expected to emit `female_30-39_PROVIDER1` once
    - TC15: 
        + description: test age >= 40 and age <= 49
        + input: `{provider: "PROVIDER1", birthdate: 126234061, gender:"M"}` //born Jan 1st 1974, is 41 year old. 
        + output: Expected to emit `male_40-49_PROVIDER1` once
    - TC16: 
        + description: test age >= 50 and age <= 59
        + input: `{provider: "PROVIDER1", birthdate: -189385139, gender:"F"}` //born Jan 1st 1964, is 51 year old. 
        + output: Expected to emit `female_50-59_PROVIDER1` once
    - TC17: 
        + description: test age >= 60 and age <= 69
        + input: `{provider: "PROVIDER1", birthdate: -504917939, gender:"M"}` //born Jan 1st 1954, is 61 year old. 
        + output: Expected to emit `female_60-69_PROVIDER1` once
    - TC18: 
        + description: test age >= 70 and age <= 79
        + input: `{provider: "PROVIDER1", birthdate: -820537139, gender:"F"}` //born Jan 1st 1944, is 71 year old. 
        + output: Expected to emit `female_70-79_PROVIDER1` once
    - TC19: 
        + description: test age >= 80 and age <= 89
        + input: `{provider: "PROVIDER1", birthdate: -1136069939, gender:"F"}` //born Jan 1st 1934, is 81 year old. 
        + output: Expected to emit `female_80-89_PROVIDER1` once
    - TC20:
        + description: test a second provider with a normal patient
        + input: `{provider: "PROVIDER2", birthdate: -189385139, gender:"F"}` //born Jan 1st 1964, is 51 year old. 
        + output: Expected to emit `female_50-59_PROVIDER2` once

