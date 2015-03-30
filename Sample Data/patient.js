1 /**
2 @namespace scoping into the hquery namespace
3 */
4
5 var __hasProp = {}.hasOwnProperty,
6   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
7   __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
8
9 this.hQuery || (this.hQuery = {});
10
11 /**
12 Converts a a number in UTC Seconds since the epoch to a date.
13 @param {number} utcSeconds seconds since the epoch in UTC
14 @returns {Date}
15 @function
16 @exports dateFromUtcSeconds as hQuery.dateFromUtcSeconds
17 */
18
19
20 hQuery.dateFromUtcSeconds = function(utcSeconds) {
21   return new Date(utcSeconds * 1000);
22 };
23
24 /**
25 @class Scalar - a representation of a unit and value
26 @exports Scalar as hQuery.Scalar
27 */
28
29
30 hQuery.Scalar = (function() {
31
32   Scalar.name = 'Scalar';
33
34   function Scalar(json) {
35     this.json = json;
36   }
37
38   Scalar.prototype.unit = function() {
39     return this.json['unit'];
40   };
41
42   Scalar.prototype.value = function() {
43     return this.json['value'];
44   };
45
46   return Scalar;
47
48 })();
49
50 /**
51 @class PhysicalQuantity - a representation of a physical quantity
52 @exports PhysicalQuantity as hQuery.PhysicalQuantity
53 */
54
55
56 hQuery.PhysicalQuantity = (function() {
57
58   PhysicalQuantity.name = 'PhysicalQuantity';
59
60   function PhysicalQuantity(json) {
61     this.json = json;
62   }
63
64   PhysicalQuantity.prototype.units = function() {
65     return this.json['units'];
66   };
67
68   PhysicalQuantity.prototype.scalar = function() {
69     return parseFloat(this.json['scalar']);
70   };
71
72   return PhysicalQuantity;
73
74 })();
75
76 /**
77 @class A code with its corresponding code system
78 @exports CodedValue as hQuery.CodedValue
79 */
80
81
82 hQuery.CodedValue = (function() {
83
84   CodedValue.name = 'CodedValue';
85
86   /**
87   @param {String} c value of the code
88   @param {String} csn name of the code system that the code belongs to
89   @constructs
90   */
91
92
93   function CodedValue(c, csn) {
94     this.c = c;
95     this.csn = csn;
96   }
97
98   /**
99   @returns {String} the code
100   */
101
102
103   CodedValue.prototype.code = function() {
104     return this.c;
105   };
106
107   /**
108   @returns {String} the code system name
109   */
110
111
112   CodedValue.prototype.codeSystemName = function() {
113     return this.csn;
114   };
115
116   CodedValue.normalize = function(val) {
117     return String(val).toLowerCase();
118   };
119
120   /**
121   Returns true if the contained code and codeSystemName match a code in the supplied codeSet.
122   @param {Object} codeSet a hash with code system names as keys and an array of codes as values
123   @returns {boolean}
124   */
125
126
127   CodedValue.prototype.includedIn = function(codeSet) {
128     var c1, c2, code, codeSystemName, codes, _i, _len;
129     for (codeSystemName in codeSet) {
130       codes = codeSet[codeSystemName];
131       if (this.csn === codeSystemName) {
132         for (_i = 0, _len = codes.length; _i < _len; _i++) {
133           code = codes[_i];
134           c1 = hQuery.CodedValue.normalize(code);
135           c2 = hQuery.CodedValue.normalize(this.c);
136           if (c1 === c2) {
137             return true;
138           }
139         }
140       }
141     }
142     return false;
143   };
144
145   /**
146   Returns true if the contained code and codeSystemName match a code in the supplied codeSet.
147   @param {Object} codeSet a hash with code system names as keys and an array of codes (provided as regular expressions) as values
148   @returns {boolean}
149   */
150
151
152   CodedValue.prototype.regex_includedIn = function(codeSet) {
153     var code, codeSystemName, codes, regex, _i, _len;
154     for (codeSystemName in codeSet) {
155       codes = codeSet[codeSystemName];
156       if (this.csn === codeSystemName) {
157         for (_i = 0, _len = codes.length; _i < _len; _i++) {
158           code = codes[_i];
159           regex = RegExp(code, "i");
160           if (regex.test(this.c)) {
161             return true;
162           }
163         }
164       }
165     }
166     return false;
167   };
168
169   return CodedValue;
170
171 })();
172
173 /**
174 Status as defined by value set 2.16.840.1.113883.5.14,
175 the ActStatus vocabulary maintained by HL7
176
177 @class Status
178 @augments hQuery.CodedEntry
179 @exports Status as hQuery.Status
180 */
181
182
183 hQuery.Status = (function(_super) {
184   var ABORTED, ACTIVE, CANCELLED, COMPLETED, HELD, NEW, NORMAL, NULLIFIED, OBSOLETE, SUSPENDED;
185
186   __extends(Status, _super);
187
188   Status.name = 'Status';
189
190   function Status() {
191     return Status.__super__.constructor.apply(this, arguments);
192   }
193
194   NORMAL = "normal";
195
196   ABORTED = "aborted";
197
198   ACTIVE = "active";
199
200   CANCELLED = "cancelled";
201
202   COMPLETED = "completed";
203
204   HELD = "held";
205
206   NEW = "new";
207
208   SUSPENDED = "suspended";
209
210   NULLIFIED = "nullified";
211
212   OBSOLETE = "obsolete";
213
214   Status.prototype.isNormal = function() {
215     return this.c === NORMAL;
216   };
217
218   Status.prototype.isAborted = function() {
219     return this.c === ABORTED;
220   };
221
222   Status.prototype.isActive = function() {
223     return this.c === ACTIVE;
224   };
225
226   Status.prototype.isCancelled = function() {
227     return this.c === CANCELLED;
228   };
229
230   Status.prototype.isCompleted = function() {
231     return this.c === COMPLETED;
232   };
233
234   Status.prototype.isHeld = function() {
235     return this.c === HELD;
236   };
237
238   Status.prototype.isNew = function() {
239     return this.c === NEW;
240   };
241
242   Status.prototype.isSuspended = function() {
243     return this.c === SUSPENDED;
244   };
245
246   Status.prototype.isNullified = function() {
247     return this.c === NULLIFIED;
248   };
249
250   Status.prototype.isObsolete = function() {
251     return this.c === OBSOLETE;
252   };
253
254   return Status;
255
256 })(hQuery.CodedValue);
257
258 /**
259 @class an Address for a person or organization
260 @exports Address as hQuery.Address
261 */
262
263
264 hQuery.Address = (function() {
265
266   Address.name = 'Address';
267
268   function Address(json) {
269     this.json = json;
270   }
271
272   /**
273   @returns {Array[String]} the street addresses
274   */
275
276
277   Address.prototype.street = function() {
278     return this.json['street'];
279   };
280
281   /**
282   @returns {String} the city
283   */
284
285
286   Address.prototype.city = function() {
287     return this.json['city'];
288   };
289
290   /**
291   @returns {String} the State
292   */
293
294
295   Address.prototype.state = function() {
296     return this.json['state'];
297   };
298
299   /**
300   @returns {String} the postal code
301   */
302
303
304   Address.prototype.postalCode = function() {
305     return this.json['zip'];
306   };
307
308   return Address;
309
310 })();
311
312 /**
313 @class An object that describes a means to contact an entity.  This is used to represent
314 phone numbers, email addresses,  instant messaging accounts etc.
315 @exports Telecom as hQuery.Telecom
316 */
317
318
319 hQuery.Telecom = (function() {
320
321   Telecom.name = 'Telecom';
322
323   function Telecom(json) {
324     this.json = json;
325   }
326
327   /**
328   @returns {String} the type of telecom entry, phone, sms, email ....
329   */
330
331
332   Telecom.prototype.type = function() {
333     return this.json['type'];
334   };
335
336   /**
337   @returns {String} the value of the entry -  the actual phone number , email address , ....
338   */
339
340
341   Telecom.prototype.value = function() {
342     return this.json['value'];
343   };
344
345   /**
346   @returns {String} the use of the entry. Is it a home, office, .... type of contact
347   */
348
349
350   Telecom.prototype.use = function() {
351     return this.json['use'];
352   };
353
354   /**
355   @returns {Boolean} is this a preferred form of contact
356   */
357
358
359   Telecom.prototype.preferred = function() {
360     return this.json['preferred'];
361   };
362
363   return Telecom;
364
365 })();
366
367 /**
368 @class an object that describes a person.  includes a persons name, addresses, and contact information
369 @exports Person as hQuery.Person
370 */
371
372
373 hQuery.Person = (function() {
374
375   Person.name = 'Person';
376
377   function Person(json) {
378     this.json = json;
379   }
380
381   /**
382    @returns {String} the given name of the person
383   */
384
385
386   Person.prototype.given = function() {
387     return this.json['first'];
388   };
389
390   /**
391    @returns {String} the last/family name of the person
392   */
393
394
395   Person.prototype.last = function() {
396     return this.json['last'];
397   };
398
399   /**
400    @returns {String} the display name of the person
401   */
402
403
404   Person.prototype.name = function() {
405     if (this.json['name']) {
406       return this.json['name'];
407     } else {
408       return this.json['first'] + ' ' + this.json['last'];
409     }
410   };
411
412   /**
413    @returns {Array} an array of {@link hQuery.Address} objects associated with the patient
414   */
415
416
417   Person.prototype.addresses = function() {
418     var address, list, _i, _len, _ref;
419     list = [];
420     if (this.json['addresses']) {
421       _ref = this.json['addresses'];
422       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
423         address = _ref[_i];
424         list.push(new hQuery.Address(address));
425       }
426     }
427     return list;
428   };
429
430   /**
431   @returns {Array} an array of {@link hQuery.Telecom} objects associated with the person
432   */
433
434
435   Person.prototype.telecoms = function() {
436     var tel, _i, _len, _ref, _results;
437     _ref = this.json['telecoms'];
438     _results = [];
439     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
440       tel = _ref[_i];
441       _results.push(new hQuery.Telecom(tel));
442     }
443     return _results;
444   };
445
446   return Person;
447
448 })();
449
450 /**
451 @class an actor is either a person or an organization
452 @exports Actor as hQuery.Actor
453 */
454
455
456 hQuery.Actor = (function() {
457
458   Actor.name = 'Actor';
459
460   function Actor(json) {
461     this.json = json;
462   }
463
464   Actor.prototype.person = function() {
465     if (this.json['person']) {
466       return new hQuery.Person(this.json['person']);
467     }
468   };
469
470   Actor.prototype.organization = function() {
471     if (this.json['organization']) {
472       return new hQuery.Organization(this.json['organization']);
473     }
474   };
475
476   return Actor;
477
478 })();
479
480 /**
481 @class an Organization
482 @exports Organization as hQuery.Organization
483 */
484
485
486 hQuery.Organization = (function() {
487
488   Organization.name = 'Organization';
489
490   function Organization(json) {
491     this.json = json;
492   }
493
494   /**
495   @returns {String} the id for the organization
496   */
497
498
499   Organization.prototype.organizationId = function() {
500     return this.json['organizationId'];
501   };
502
503   /**
504   @returns {String} the name of the organization
505   */
506
507
508   Organization.prototype.organizationName = function() {
509     return this.json['name'];
510   };
511
512   /**
513   @returns {Array} an array of {@link hQuery.Address} objects associated with the organization
514   */
515
516
517   Organization.prototype.addresses = function() {
518     var address, list, _i, _len, _ref;
519     list = [];
520     if (this.json['addresses']) {
521       _ref = this.json['addresses'];
522       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
523         address = _ref[_i];
524         list.push(new hQuery.Address(address));
525       }
526     }
527     return list;
528   };
529
530   /**
531   @returns {Array} an array of {@link hQuery.Telecom} objects associated with the organization
532   */
533
534
535   Organization.prototype.telecoms = function() {
536     var tel, _i, _len, _ref, _results;
537     _ref = this.json['telecoms'];
538     _results = [];
539     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
540       tel = _ref[_i];
541       _results.push(new hQuery.Telecom(tel));
542     }
543     return _results;
544   };
545
546   return Organization;
547
548 })();
549
550 /**
551 @class a Facility
552 @exports Organization as hQuery.Facility
553 */
554
555
556 hQuery.Facility = (function(_super) {
557
558   __extends(Facility, _super);
559
560   Facility.name = 'Facility';
561
562   function Facility(json) {
563     this.json = json;
564     if (this.json['code'] != null) {
565       Facility.__super__.constructor.call(this, this.json['code']['code'], this.json['code']['codeSystem']);
566     }
567     if (this.json['start_time']) {
568       this._startDate = hQuery.dateFromUtcSeconds(this.json['start_time']);
569     }
570     if (this.json['end_time']) {
571       this._endDate = hQuery.dateFromUtcSeconds(this.json['end_time']);
572     }
573   }
574
575   /**
576   @returns {String} the name of the facility
577   */
578
579
580   Facility.prototype.name = function() {
581     return this.json['name'];
582   };
583
584   /**
585   Date and time at which the coded entry started
586   @returns {Date}
587   */
588
589
590   Facility.prototype.startDate = function() {
591     return this._startDate;
592   };
593
594   /**
595   Date and time at which the coded entry ended
596   @returns {Date}
597   */
598
599
600   Facility.prototype.endDate = function() {
601     return this._endDate;
602   };
603
604   /**
605   @returns {Array} an array of {@link hQuery.Address} objects associated with the facility
606   */
607
608
609   Facility.prototype.addresses = function() {
610     var address, list, _i, _len, _ref;
611     list = [];
612     if (this.json['addresses']) {
613       _ref = this.json['addresses'];
614       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
615         address = _ref[_i];
616         list.push(new hQuery.Address(address));
617       }
618     }
619     return list;
620   };
621
622   /**
623   @returns {Array} an array of {@link hQuery.Telecom} objects associated with the facility
624   */
625
626
627   Facility.prototype.telecoms = function() {
628     var tel, _i, _len, _ref, _results;
629     _ref = this.json['telecoms'];
630     _results = [];
631     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
632       tel = _ref[_i];
633       _results.push(new hQuery.Telecom(tel));
634     }
635     return _results;
636   };
637
638   return Facility;
639
640 })(hQuery.CodedValue);
641
642 /**
643 @class represents a DateRange in the form of hi and low date values.
644 @exports DateRange as hQuery.DateRange
645 */
646
647
648 hQuery.DateRange = (function() {
649
650   DateRange.name = 'DateRange';
651
652   function DateRange(json) {
653     this.json = json;
654   }
655
656   DateRange.prototype.hi = function() {
657     if (this.json['hi']) {
658       return hQuery.dateFromUtcSeconds(this.json['hi']);
659     }
660   };
661
662   DateRange.prototype.low = function() {
663     return hQuery.dateFromUtcSeconds(this.json['low']);
664   };
665
666   return DateRange;
667
668 })();
669
670 /**
671 @class Class used to describe an entity that is providing some form of information.  This does not mean that they are
672 providing any treatment just that they are providing information.
673 @exports Informant as hQuery.Informant
674 */
675
676
677 hQuery.Informant = (function() {
678
679   Informant.name = 'Informant';
680
681   function Informant(json) {
682     this.json = json;
683   }
684
685   /**
686   an array of hQuery.Person objects as points of contact
687   @returns {Array}
688   */
689
690
691   Informant.prototype.contacts = function() {
692     var contact, _i, _len, _ref, _results;
693     _ref = this.json['contacts'];
694     _results = [];
695     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
696       contact = _ref[_i];
697       _results.push(new hQuery.Person(contact));
698     }
699     return _results;
700   };
701
702   /**
703    @returns {hQuery.Organization} the organization providing the information
704   */
705
706
707   Informant.prototype.organization = function() {
708     return new hQuery.Organization(this.json['organization']);
709   };
710
711   return Informant;
712
713 })();
714
715 /**
716 @class
717 @exports CodedEntry as hQuery.CodedEntry
718 */
719
720
721 hQuery.CodedEntry = (function() {
722
723   CodedEntry.name = 'CodedEntry';
724
725   function CodedEntry(json) {
726     this.json = json;
727     if (this.json['time']) {
728       this._date = hQuery.dateFromUtcSeconds(this.json['time']);
729     }
730     if (this.json['start_time']) {
731       this._startDate = hQuery.dateFromUtcSeconds(this.json['start_time']);
732     }
733     if (this.json['end_time']) {
734       this._endDate = hQuery.dateFromUtcSeconds(this.json['end_time']);
735     }
736     this._type = hQuery.createCodedValues(this.json['codes']);
737     this._statusCode = this.json['status_code'];
738     this.id = "" + this.json['_id'];
739     this.source_id = this.json['id'];
740     this._freeTextType = this.json['description'];
741   }
742
743   /**
744   Adjust the start and end times of this event to the supplied timestamp
745   */
746
747
748   CodedEntry.prototype.setTimestamp = function(timestamp) {
749     return this._date = this._startDate = this._endDate = timestamp;
750   };
751
752   /**
753   Date and time at which the coded entry took place
754   @returns {Date}
755   */
756
757
758   CodedEntry.prototype.date = function() {
759     return this._date;
760   };
761
762   /**
763   Date and time at which the coded entry started
764   @returns {Date}
765   */
766
767
768   CodedEntry.prototype.startDate = function() {
769     return this._startDate;
770   };
771
772   /**
773   Date and time at which the coded entry ended
774   @returns {Date}
775   */
776
777
778   CodedEntry.prototype.endDate = function() {
779     return this._endDate;
780   };
781
782   /**
783   Tries to find a single point in time for this entry. Will first return date if it is present,
784   then fall back to startDate and finally endDate
785   @returns {Date}
786   */
787
788
789   CodedEntry.prototype.timeStamp = function() {
790     return this._date || this._startDate || this._endDate;
791   };
792
793   /**
794   Determines whether the entry specifies a time range or not
795   @returns {boolean}
796   */
797
798
799   CodedEntry.prototype.isTimeRange = function() {
800     return (this._startDate != null) && (this._endDate != null);
801   };
802
803   /**
804   Determines whether a coded entry contains sufficient information (code and at least
805   one time stamp) to be usable
806   @returns {boolean}
807   */
808
809
810   CodedEntry.prototype.isUsable = function() {
811     return this._type.length > 0 && (this._date || this._startDate || this._endDate);
812   };
813
814   /**
815   An Array of CodedValues which describe what kind of coded entry took place
816   @returns {Array}
817   */
818
819
820   CodedEntry.prototype.type = function() {
821     return this._type;
822   };
823
824   /**
825   A free text description of the type of coded entry
826   @returns {String}
827   */
828
829
830   CodedEntry.prototype.freeTextType = function() {
831     return this._freeTextType;
832   };
833
834   /**
835   Status for this coded entry
836   @returns {String}
837   */
838
839
840   CodedEntry.prototype.status = function() {
841     if (this._statusCode != null) {
842       if (this._statusCode['HL7 ActStatus'] != null) {
843         return this._statusCode['HL7 ActStatus'][0];
844       } else if (this._statusCode['SNOMED-CT'] != null) {
845         switch (this._statusCode['SNOMED-CT'][0]) {
846           case '55561003':
847             return 'active';
848           case '73425007':
849             return 'inactive';
850           case '413322009':
851             return 'resolved';
852         }
853       }
854     }
855   };
856
857   /**
858   Status for this coded entry
859   @returns {Hash} keys are code systems, values are arrays of codes
860   */
861
862
863   CodedEntry.prototype.statusCode = function() {
864     return this._statusCode;
865   };
866
867   /**
868   Returns true if any of this entry codes match a code in the supplied codeSet.
869   @param {Object} codeSet a hash with code system names as keys and an array of codes as values
870   @returns {boolean}
871   */
872
873
874   CodedEntry.prototype.includesCodeFrom = function(codeSet) {
875     var codedValue, _i, _len, _ref;
876     _ref = this._type;
877     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
878       codedValue = _ref[_i];
879       if (codedValue.includedIn(codeSet)) {
880         return true;
881       }
882     }
883     return false;
884   };
885
886   /**
887   Returns true if any of this entry codes match a code in the supplied codeSet.
888   @param {Object} codeSet a hash with code system names as keys and an array of codes (provided as regular expressions) as values
889   @returns {boolean}
890   */
891
892
893   CodedEntry.prototype.regex_includesCodeFrom = function(codeSet) {
894     var codedValue, _i, _len, _ref;
895     _ref = this._type;
896     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
897       codedValue = _ref[_i];
898       if (codedValue.regex_includedIn(codeSet)) {
899         return true;
900       }
901     }
902     return false;
903   };
904
905   /**
906   @returns {Boolean} whether the entry was negated
907   */
908
909
910   CodedEntry.prototype.negationInd = function() {
911     return this.json['negationInd'] || false;
912   };
913
914   /**
915   Returns the values of the result. This will return an array that contains
916   PhysicalQuantity or CodedValue objects depending on the result type.
917   @returns {Array} containing either PhysicalQuantity and/or CodedValues
918   */
919
920
921   CodedEntry.prototype.values = function() {
922     var value, values, _i, _len, _ref;
923     values = [];
924     if (this.json['values']) {
925       _ref = this.json['values'];
926       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
927         value = _ref[_i];
928         if (value['scalar'] != null) {
929           values.push(new hQuery.PhysicalQuantity(value));
930         } else {
931           values = values.concat(hQuery.createCodedValues(value.codes));
932         }
933       }
934     }
935     return values;
936   };
937
938   /**
939   Indicates the reason an entry was negated.
940   @returns {hQuery.CodedValue}   Used to indicate reason an immunization was not administered.
941   */
942
943
944   CodedEntry.prototype.negationReason = function() {
945     return hQuery.createCodedValue(this.json['negationReason']);
946   };
947
948   /**
949   Explains the reason for an entry.
950   @returns {hQuery.CodedValue}   Used to explain the rationale for a given entry.
951   */
952
953
954   CodedEntry.prototype.reason = function() {
955     return hQuery.createCodedValue(this.json['reason']);
956   };
957
958   return CodedEntry;
959
960 })();
961
962 /**
963 @class Represents a list of hQuery.CodedEntry instances. Offers utility methods for matching
964 entries based on codes and date ranges
965 @exports CodedEntryList as hQuery.CodedEntryList
966 */
967
968
969 hQuery.CodedEntryList = (function(_super) {
970
971   __extends(CodedEntryList, _super);
972
973   CodedEntryList.name = 'CodedEntryList';
974
975   function CodedEntryList() {
976     this.push.apply(this, arguments);
977   }
978
979   /**
980   Push the supplied entry onto this list if it is usable
981   @param {CodedEntry} a coded entry that should be added to the list if it is usable
982   */
983
984
985   CodedEntryList.prototype.pushIfUsable = function(entry) {
986     if (entry.isUsable()) {
987       return this.push(entry);
988     }
989   };
990
991   /**
992   Return the number of entries that match the
993   supplied code set where those entries occur between the supplied time bounds
994   @param {Object} codeSet a hash with code system names as keys and an array of codes as values
995   @param {Date} start the start of the period during which the entry must occur, a null value will match all times
996   @param {Date} end the end of the period during which the entry must occur, a null value will match all times
997   @param {boolean} includeNegated whether the returned list of entries should include those that have been negated
998   @return {CodedEntryList} the matching entries
999   */
1000
1001
1002   CodedEntryList.prototype.match = function(codeSet, start, end, includeNegated) {
1003     var afterStart, beforeEnd, cloned, entry, matchesCode, _i, _len;
1004     if (includeNegated == null) {
1005       includeNegated = false;
1006     }
1007     cloned = new hQuery.CodedEntryList();
1008     for (_i = 0, _len = this.length; _i < _len; _i++) {
1009       entry = this[_i];
1010       afterStart = !start || entry.timeStamp() >= start;
1011       beforeEnd = !end || entry.timeStamp() <= end;
1012       matchesCode = codeSet === null || entry.includesCodeFrom(codeSet);
1013       if (afterStart && beforeEnd && matchesCode && (includeNegated || !entry.negationInd())) {
1014         cloned.push(entry);
1015       }
1016     }
1017     return cloned;
1018   };
1019
1020   /**
1021   Return the number of entries that match the
1022   supplied code set where those entries occur between the supplied time bounds
1023   @param {Object} codeSet a hash with code system names as keys and an array of codes (provided as regular expressions) as values
1024   @param {Date} start the start of the period during which the entry must occur, a null value will match all times
1025   @param {Date} end the end of the period during which the entry must occur, a null value will match all times
1026   @param {boolean} includeNegated whether the returned list of entries should include those that have been negated
1027   @return {CodedEntryList} the matching entries
1028   TODO - decide on what to do with includeNegated parameter
1029   */
1030
1031
1032   CodedEntryList.prototype.regex_match = function(codeSet, start, end, includeNegated) {
1033     var afterStart, beforeEnd, cloned, entry, matchesCode, _i, _len;
1034     if (includeNegated == null) {
1035       includeNegated = false;
1036     }
1037     cloned = new hQuery.CodedEntryList();
1038     for (_i = 0, _len = this.length; _i < _len; _i++) {
1039       entry = this[_i];
1040       afterStart = !start || entry.timeStamp() >= start;
1041       beforeEnd = !end || entry.timeStamp() <= end;
1042       matchesCode = codeSet === null || entry.regex_includesCodeFrom(codeSet);
1043       if (afterStart && beforeEnd && matchesCode && (includeNegated || !entry.negationInd())) {
1044         cloned.push(entry);
1045       }
1046     }
1047     return cloned;
1048   };
1049
1050   /**
1051   Return a new list of entries that is the result of concatenating the passed in entries with this list
1052   @return {CodedEntryList} the set of concatenated entries
1053   */
1054
1055
1056   CodedEntryList.prototype.concat = function(otherEntries) {
1057     var cloned, entry, _i, _j, _len, _len1;
1058     cloned = new hQuery.CodedEntryList();
1059     for (_i = 0, _len = this.length; _i < _len; _i++) {
1060       entry = this[_i];
1061       cloned.push(entry);
1062     }
1063     for (_j = 0, _len1 = otherEntries.length; _j < _len1; _j++) {
1064       entry = otherEntries[_j];
1065       cloned.push(entry);
1066     }
1067     return cloned;
1068   };
1069
1070   /**
1071   Match entries with the specified statuses
1072   @return {CodedEntryList} the matching entries
1073   */
1074
1075
1076   CodedEntryList.prototype.withStatuses = function(statuses, includeUndefined) {
1077     var cloned, entry, _i, _len, _ref;
1078     if (includeUndefined == null) {
1079       includeUndefined = true;
1080     }
1081     if (includeUndefined) {
1082       statuses = statuses.concat([void 0, null]);
1083     }
1084     cloned = new hQuery.CodedEntryList();
1085     for (_i = 0, _len = this.length; _i < _len; _i++) {
1086       entry = this[_i];
1087       if (_ref = entry.status(), __indexOf.call(statuses, _ref) >= 0) {
1088         cloned.push(entry);
1089       }
1090     }
1091     return cloned;
1092   };
1093
1094   /**
1095   Filter entries based on negation
1096   @param {Object} codeSet a hash with code system names as keys and an array of codes as values
1097   @return {CodedEntryList} negated entries
1098   */
1099
1100
1101   CodedEntryList.prototype.withNegation = function(codeSet) {
1102     var cloned, entry, _i, _len;
1103     cloned = new hQuery.CodedEntryList();
1104     for (_i = 0, _len = this.length; _i < _len; _i++) {
1105       entry = this[_i];
1106       if (entry.negationInd() && (!codeSet || (entry.negationReason() && entry.negationReason().includedIn(codeSet)))) {
1107         cloned.push(entry);
1108       }
1109     }
1110     return cloned;
1111   };
1112
1113   /**
1114   Filter entries based on negation
1115   @return {CodedEntryList} non-negated entries
1116   */
1117
1118
1119   CodedEntryList.prototype.withoutNegation = function() {
1120     var cloned, entry, _i, _len;
1121     cloned = new hQuery.CodedEntryList();
1122     for (_i = 0, _len = this.length; _i < _len; _i++) {
1123       entry = this[_i];
1124       if (!entry.negationInd()) {
1125         cloned.push(entry);
1126       }
1127     }
1128     return cloned;
1129   };
1130
1131   return CodedEntryList;
1132
1133 })(Array);
1134
1135 /**
1136 @private
1137 @function
1138 */
1139
1140
1141 hQuery.createCodedValues = function(jsonCodes) {
1142   var code, codeSystem, codedValues, codes, _i, _len;
1143   codedValues = [];
1144   for (codeSystem in jsonCodes) {
1145     codes = jsonCodes[codeSystem];
1146     for (_i = 0, _len = codes.length; _i < _len; _i++) {
1147       code = codes[_i];
1148       codedValues.push(new hQuery.CodedValue(code, codeSystem));
1149     }
1150   }
1151   return codedValues;
1152 };
1153
1154 hQuery.createCodedValue = function(json) {
1155   if (json != null) {
1156     return new hQuery.CodedValue(json['code'], json['codeSystem']);
1157   }
1158 };
1159 /**
1160 @namespace scoping into the hquery namespace
1161 */
1162
1163 var __hasProp = {}.hasOwnProperty,
1164   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
1165
1166 this.hQuery || (this.hQuery = {});
1167
1168 /**
1169 @class MedicationInformation
1170 @exports MedicationInformation as hQuery.MedicationInformation
1171 */
1172
1173
1174 hQuery.MedicationInformation = (function() {
1175
1176   MedicationInformation.name = 'MedicationInformation';
1177
1178   function MedicationInformation(json) {
1179     this.json = json;
1180   }
1181
1182   /**
1183   An array of hQuery.CodedValue describing the medication
1184   @returns {Array}
1185   */
1186
1187
1188   MedicationInformation.prototype.codedProduct = function() {
1189     return hQuery.createCodedValues(this.json['codes']);
1190   };
1191
1192   MedicationInformation.prototype.freeTextProductName = function() {
1193     return this.json['description'];
1194   };
1195
1196   MedicationInformation.prototype.codedBrandName = function() {
1197     return this.json['codedBrandName'];
1198   };
1199
1200   MedicationInformation.prototype.freeTextBrandName = function() {
1201     return this.json['brandName'];
1202   };
1203
1204   MedicationInformation.prototype.drugManufacturer = function() {
1205     if (this.json['drugManufacturer']) {
1206       return new hQuery.Organization(this.json['drugManufacturer']);
1207     }
1208   };
1209
1210   return MedicationInformation;
1211
1212 })();
1213
1214 /**
1215 @class AdministrationTiming - the
1216 @exports AdministrationTiming as hQuery.AdministrationTiming
1217 */
1218
1219
1220 hQuery.AdministrationTiming = (function() {
1221
1222   AdministrationTiming.name = 'AdministrationTiming';
1223
1224   function AdministrationTiming(json) {
1225     this.json = json;
1226   }
1227
1228   /**
1229   Provides the period of medication administration as a Scalar. An example
1230   Scalar that would be returned would be with value = 8 and units = hours. This would
1231   mean that the medication should be taken every 8 hours.
1232   @returns {hQuery.Scalar}
1233   */
1234
1235
1236   AdministrationTiming.prototype.period = function() {
1237     if (this.json['period']) {
1238       return new hQuery.Scalar(this.json['period']);
1239     }
1240   };
1241
1242   /**
1243   Indicates whether it is the interval (time between dosing), or frequency
1244   (number of doses in a time period) that is important. If instititutionSpecified is not
1245   present or is set to false, then the time between dosing is important (every 8 hours).
1246   If true, then the frequency of administration is important (e.g., 3 times per day).
1247   @returns {Boolean}
1248   */
1249
1250
1251   AdministrationTiming.prototype.institutionSpecified = function() {
1252     return this.json['institutionSpecified'];
1253   };
1254
1255   return AdministrationTiming;
1256
1257 })();
1258
1259 /**
1260 @class DoseRestriction -  restrictions on the medications dose, represented by a upper and lower dose
1261 @exports DoseRestriction as hQuery.DoseRestriction
1262 */
1263
1264
1265 hQuery.DoseRestriction = (function() {
1266
1267   DoseRestriction.name = 'DoseRestriction';
1268
1269   function DoseRestriction(json) {
1270     this.json = json;
1271   }
1272
1273   DoseRestriction.prototype.numerator = function() {
1274     if (this.json['numerator']) {
1275       return new hQuery.Scalar(this.json['numerator']);
1276     }
1277   };
1278
1279   DoseRestriction.prototype.denominator = function() {
1280     if (this.json['denominator']) {
1281       return new hQuery.Scalar(this.json['denominator']);
1282     }
1283   };
1284
1285   return DoseRestriction;
1286
1287 })();
1288
1289 /**
1290 @class Fulfillment - information about when and who fulfilled an order for the medication
1291 @exports Fulfillment as hQuery.Fullfilement
1292 */
1293
1294
1295 hQuery.Fulfillment = (function() {
1296
1297   Fulfillment.name = 'Fulfillment';
1298
1299   function Fulfillment(json) {
1300     this.json = json;
1301   }
1302
1303   Fulfillment.prototype.dispenseDate = function() {
1304     return hQuery.dateFromUtcSeconds(this.json['dispenseDate']);
1305   };
1306
1307   Fulfillment.prototype.dispensingPharmacyLocation = function() {
1308     if (this.json['dispensingPharmacyLocation']) {
1309       return new hQuery.Address(this.json['dispensingPharmacyLocation']);
1310     }
1311   };
1312
1313   Fulfillment.prototype.quantityDispensed = function() {
1314     if (this.json['quantityDispensed']) {
1315       return new hQuery.Scalar(this.json['quantityDispensed']);
1316     }
1317   };
1318
1319   Fulfillment.prototype.prescriptionNumber = function() {
1320     return this.json['prescriptionNumber'];
1321   };
1322
1323   Fulfillment.prototype.fillNumber = function() {
1324     return this.json['fillNumber'];
1325   };
1326
1327   Fulfillment.prototype.fillStatus = function() {
1328     if (this.json['fillStatus']) {
1329       return new hQuery.Status(this.json['fillStatus']);
1330     }
1331   };
1332
1333   return Fulfillment;
1334
1335 })();
1336
1337 /**
1338 @class OrderInformation - information abour an order for a medication
1339 @exports OrderInformation as hQuery.OrderInformation
1340 */
1341
1342
1343 hQuery.OrderInformation = (function() {
1344
1345   OrderInformation.name = 'OrderInformation';
1346
1347   function OrderInformation(json) {
1348     this.json = json;
1349   }
1350
1351   OrderInformation.prototype.orderNumber = function() {
1352     return this.json['orderNumber'];
1353   };
1354
1355   OrderInformation.prototype.fills = function() {
1356     return this.json['fills'];
1357   };
1358
1359   OrderInformation.prototype.quantityOrdered = function() {
1360     if (this.json['quantityOrdered']) {
1361       return new hQuery.Scalar(this.json['quantityOrdered']);
1362     }
1363   };
1364
1365   OrderInformation.prototype.orderExpirationDateTime = function() {
1366     return hQuery.dateFromUtcSeconds(this.json['orderExpirationDateTime']);
1367   };
1368
1369   OrderInformation.prototype.orderDateTime = function() {
1370     return hQuery.dateFromUtcSeconds(this.json['orderDateTime']);
1371   };
1372
1373   return OrderInformation;
1374
1375 })();
1376
1377 /**
1378 TypeOfMedication as defined by value set 2.16.840.1.113883.3.88.12.3221.8.19
1379 which pulls two values from SNOMED to describe whether a medication is
1380 prescription or over the counter
1381
1382 @class TypeOfMedication - describes whether a medication is prescription or
1383        over the counter
1384 @augments hQuery.CodedEntry
1385 @exports TypeOfMedication as hQuery.TypeOfMedication
1386 */
1387
1388
1389 hQuery.TypeOfMedication = (function(_super) {
1390   var OTC, PRESECRIPTION;
1391
1392   __extends(TypeOfMedication, _super);
1393
1394   TypeOfMedication.name = 'TypeOfMedication';
1395
1396   function TypeOfMedication() {
1397     return TypeOfMedication.__super__.constructor.apply(this, arguments);
1398   }
1399
1400   PRESECRIPTION = "73639000";
1401
1402   OTC = "329505003";
1403
1404   /**
1405   @returns {Boolean}
1406   */
1407
1408
1409   TypeOfMedication.prototype.isPrescription = function() {
1410     return this.c === PRESECRIPTION;
1411   };
1412
1413   /**
1414   @returns {Boolean}
1415   */
1416
1417
1418   TypeOfMedication.prototype.isOverTheCounter = function() {
1419     return this.c === OTC;
1420   };
1421
1422   return TypeOfMedication;
1423
1424 })(hQuery.CodedValue);
1425
1426 /**
1427 StatusOfMedication as defined by value set 2.16.840.1.113883.1.11.20.7
1428 The terms come from SNOMED and are managed by HL7
1429
1430 @class StatusOfMedication - describes the status of the medication
1431 @augments hQuery.CodedEntry
1432 @exports StatusOfMedication as hQuery.StatusOfMedication
1433 */
1434
1435
1436 hQuery.StatusOfMedication = (function(_super) {
1437   var ACTIVE, NO_LONGER_ACTIVE, ON_HOLD, PRIOR_HISTORY;
1438
1439   __extends(StatusOfMedication, _super);
1440
1441   StatusOfMedication.name = 'StatusOfMedication';
1442
1443   function StatusOfMedication() {
1444     return StatusOfMedication.__super__.constructor.apply(this, arguments);
1445   }
1446
1447   ON_HOLD = "392521001";
1448
1449   NO_LONGER_ACTIVE = "421139008";
1450
1451   ACTIVE = "55561003";
1452
1453   PRIOR_HISTORY = "73425007";
1454
1455   /**
1456   @returns {Boolean}
1457   */
1458
1459
1460   StatusOfMedication.prototype.isOnHold = function() {
1461     return this.c === ON_HOLD;
1462   };
1463
1464   /**
1465   @returns {Boolean}
1466   */
1467
1468
1469   StatusOfMedication.prototype.isNoLongerActive = function() {
1470     return this.c === NO_LONGER_ACTIVE;
1471   };
1472
1473   /**
1474   @returns {Boolean}
1475   */
1476
1477
1478   StatusOfMedication.prototype.isActive = function() {
1479     return this.c === ACTIVE;
1480   };
1481
1482   /**
1483   @returns {Boolean}
1484   */
1485
1486
1487   StatusOfMedication.prototype.isPriorHistory = function() {
1488     return this.c === PRIOR_HISTORY;
1489   };
1490
1491   return StatusOfMedication;
1492
1493 })(hQuery.CodedValue);
1494
1495 /**
1496 @class represents a medication entry for a patient.
1497 @augments hQuery.CodedEntry
1498 @exports Medication as hQuery.Medication
1499 */
1500
1501
1502 hQuery.Medication = (function(_super) {
1503
1504   __extends(Medication, _super);
1505
1506   Medication.name = 'Medication';
1507
1508   function Medication(json) {
1509     this.json = json;
1510     Medication.__super__.constructor.call(this, this.json);
1511   }
1512
1513   /**
1514   @returns {String}
1515   */
1516
1517
1518   Medication.prototype.freeTextSig = function() {
1519     return this.json['freeTextSig'];
1520   };
1521
1522   /**
1523   The actual or intended start of a medication. Slight deviation from greenCDA for C32 since
1524   it combines this with medication stop
1525   @returns {Date}
1526   */
1527
1528
1529   Medication.prototype.indicateMedicationStart = function() {
1530     return hQuery.dateFromUtcSeconds(this.json['start_time']);
1531   };
1532
1533   /**
1534   The actual or intended stop of a medication. Slight deviation from greenCDA for C32 since
1535   it combines this with medication start
1536   @returns {Date}
1537   */
1538
1539
1540   Medication.prototype.indicateMedicationStop = function() {
1541     return hQuery.dateFromUtcSeconds(this.json['end_time']);
1542   };
1543
1544   Medication.prototype.administrationTiming = function() {
1545     if (this.json['administrationTiming']) {
1546       return new hQuery.AdministrationTiming(this.json['administrationTiming']);
1547     }
1548   };
1549
1550   /**
1551   @returns {CodedValue}  Contains routeCode or adminstrationUnitCode information.
1552     Route code shall have a a value drawn from FDA route of adminstration,
1553     and indicates how the medication is received by the patient.
1554     See http://www.fda.gov/Drugs/DevelopmentApprovalProcess/UCM070829
1555     The administration unit code shall have a value drawn from the FDA
1556     dosage form, source NCI thesaurus and represents the physical form of the
1557     product as presented to the patient.
1558     See http://www.fda.gov/Drugs/InformationOnDrugs/ucm142454.htm
1559   */
1560
1561
1562   Medication.prototype.route = function() {
1563     return hQuery.createCodedValue(this.json['route']);
1564   };
1565
1566   /**
1567   @returns {hQuery.Scalar} the dose
1568   */
1569
1570
1571   Medication.prototype.dose = function() {
1572     if (this.json['dose']) {
1573       return new hQuery.Scalar(this.json['dose']);
1574     }
1575   };
1576
1577   /**
1578   @returns {CodedValue}
1579   */
1580
1581
1582   Medication.prototype.site = function() {
1583     if (this.json['site']) {
1584       return hQuery.createCodedValue(this.json['site']);
1585     }
1586   };
1587
1588   /**
1589   @returns {hQuery.DoseRestriction}
1590   */
1591
1592
1593   Medication.prototype.doseRestriction = function() {
1594     if (this.json['doseRestriction']) {
1595       return new hQuery.DoseRestriction(this.json['doseRestriction']);
1596     }
1597   };
1598
1599   /**
1600   @returns {String}
1601   */
1602
1603
1604   Medication.prototype.doseIndicator = function() {
1605     return this.json['doseIndicator'];
1606   };
1607
1608   /**
1609   @returns {String}
1610   */
1611
1612
1613   Medication.prototype.fulfillmentInstructions = function() {
1614     return this.json['fulfillmentInstructions'];
1615   };
1616
1617   /**
1618   @returns {CodedValue}
1619   */
1620
1621
1622   Medication.prototype.indication = function() {
1623     return hQuery.createCodedValue(this.json['indication']);
1624   };
1625
1626   /**
1627   @returns {CodedValue}
1628   */
1629
1630
1631   Medication.prototype.productForm = function() {
1632     return hQuery.createCodedValue(this.json['productForm']);
1633   };
1634
1635   /**
1636   @returns {CodedValue}
1637   */
1638
1639
1640   Medication.prototype.vehicle = function() {
1641     return hQuery.createCodedValue(this.json['vehicle']);
1642   };
1643
1644   /**
1645   @returns {CodedValue}
1646   */
1647
1648
1649   Medication.prototype.reaction = function() {
1650     return hQuery.createCodedValue(this.json['reaction']);
1651   };
1652
1653   /**
1654   @returns {CodedValue}
1655   */
1656
1657
1658   Medication.prototype.deliveryMethod = function() {
1659     return hQuery.createCodedValue(this.json['deliveryMethod']);
1660   };
1661
1662   /**
1663   @returns {hQuery.MedicationInformation}
1664   */
1665
1666
1667   Medication.prototype.medicationInformation = function() {
1668     return new hQuery.MedicationInformation(this.json);
1669   };
1670
1671   /**
1672   @returns {hQuery.TypeOfMedication} Indicates whether this is an over the counter or prescription medication
1673   */
1674
1675
1676   Medication.prototype.typeOfMedication = function() {
1677     var _ref, _ref1;
1678     return new hQuery.TypeOfMedication((_ref = this.json['typeOfMedication']) != null ? _ref['code'] : void 0, (_ref1 = this.json['typeOfMedication']) != null ? _ref1['codeSystem'] : void 0);
1679   };
1680
1681   /**
1682   Values conform to value set 2.16.840.1.113883.1.11.20.7 - Medication Status
1683   Values may be: On Hold, No Longer Active, Active, Prior History
1684   @returns {hQuery.StatusOfMedication}   Used to indicate the status of the medication.
1685   */
1686
1687
1688   Medication.prototype.statusOfMedication = function() {
1689     var _ref, _ref1;
1690     return new hQuery.StatusOfMedication((_ref = this.json['statusOfMedication']) != null ? _ref['code'] : void 0, (_ref1 = this.json['statusOfMedication']) != null ? _ref1['codeSystem'] : void 0);
1691   };
1692
1693   /**
1694   @returns {String} free text instructions to the patient
1695   */
1696
1697
1698   Medication.prototype.patientInstructions = function() {
1699     return this.json['patientInstructions'];
1700   };
1701
1702   /**
1703   The duration over which this medication has been active. For example, 5 days.
1704   @returns {Hash} with two keys: unit and scalar
1705   */
1706
1707
1708   Medication.prototype.cumulativeMedicationDuration = function() {
1709     return this.json['cumulativeMedicationDuration'];
1710   };
1711
1712   /**
1713   @returns {Array} an array of {@link FulFillment} objects
1714   */
1715
1716
1717   Medication.prototype.fulfillmentHistory = function() {
1718     var order, _i, _len, _ref, _results;
1719     _ref = this.json['fulfillmentHistory'];
1720     _results = [];
1721     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
1722       order = _ref[_i];
1723       _results.push(new hQuery.Fulfillment(order));
1724     }
1725     return _results;
1726   };
1727
1728   /**
1729   @returns {Array} an array of {@link OrderInformation} objects
1730   */
1731
1732
1733   Medication.prototype.orderInformation = function() {
1734     var order, _i, _len, _ref, _results;
1735     _ref = this.json['orderInformation'];
1736     _results = [];
1737     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
1738       order = _ref[_i];
1739       _results.push(new hQuery.OrderInformation(order));
1740     }
1741     return _results;
1742   };
1743
1744   return Medication;
1745
1746 })(hQuery.CodedEntry);
1747 /**
1748 @namespace scoping into the hquery namespace
1749 */
1750
1751 var __hasProp = {}.hasOwnProperty,
1752   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
1753
1754 this.hQuery || (this.hQuery = {});
1755
1756 /**
1757 @class CauseOfDeath
1758 @exports CauseOfDeath as hQuery.CauseOfDeath
1759 */
1760
1761
1762 hQuery.CauseOfDeath = (function() {
1763
1764   CauseOfDeath.name = 'CauseOfDeath';
1765
1766   function CauseOfDeath(json) {
1767     this.json = json;
1768   }
1769
1770   /**
1771   @returns {hQuery.Date}
1772   */
1773
1774
1775   CauseOfDeath.prototype.timeOfDeath = function() {
1776     return new hQuery.dateFromUtcSeconds(this.json['timeOfDeath']);
1777   };
1778
1779   /**
1780   @returns {int}
1781   */
1782
1783
1784   CauseOfDeath.prototype.ageAtDeath = function() {
1785     return this.json['ageAtDeath'];
1786   };
1787
1788   return CauseOfDeath;
1789
1790 })();
1791
1792 /**
1793 @class hQuery.Condition
1794
1795 This section is used to describe a patients problems/conditions. The types of conditions
1796 described have been constrained to the SNOMED CT Problem Type code set. An unbounded
1797 number of treating providers for the particular condition can be supplied.
1798 @exports Condition as hQuery.Condition
1799 @augments hQuery.CodedEntry
1800 */
1801
1802
1803 hQuery.Condition = (function(_super) {
1804
1805   __extends(Condition, _super);
1806
1807   Condition.name = 'Condition';
1808
1809   function Condition(json) {
1810     this.json = json;
1811     Condition.__super__.constructor.call(this, this.json);
1812   }
1813
1814   /**
1815    @returns {Array, hQuery.Provider} an array of providers for the condition
1816   */
1817
1818
1819   Condition.prototype.providers = function() {
1820     var provider, _i, _len, _ref, _results;
1821     _ref = this.json['treatingProviders'];
1822     _results = [];
1823     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
1824       provider = _ref[_i];
1825       _results.push(new Provider(provider));
1826     }
1827     return _results;
1828   };
1829
1830   /**
1831   Diagnosis Priority
1832   @returns {int}
1833   */
1834
1835
1836   Condition.prototype.diagnosisPriority = function() {
1837     return this.json['priority'];
1838   };
1839
1840   /**
1841   Ordinality
1842   @returns {CodedValue}
1843   */
1844
1845
1846   Condition.prototype.ordinality = function() {
1847     return hQuery.createCodedValue(this.json['ordinality']);
1848   };
1849
1850   /**
1851   age at onset
1852   @returns {int}
1853   */
1854
1855
1856   Condition.prototype.ageAtOnset = function() {
1857     return this.json['ageAtOnset'];
1858   };
1859
1860   /**
1861   cause of death
1862   @returns {hQuery.CauseOfDeath}
1863   */
1864
1865
1866   Condition.prototype.causeOfDeath = function() {
1867     if (this.json['causeOfDeath']) {
1868       return new hQuery.CauseOfDeath(this.json['causeOfDeath']);
1869     }
1870   };
1871
1872   /**
1873   problem status
1874   @returns {hQuery.CodedValue}
1875   */
1876
1877
1878   Condition.prototype.problemStatus = function() {
1879     return hQuery.createCodedValue(this.json['problemStatus']);
1880   };
1881
1882   /**
1883   comment
1884   @returns {String}
1885   */
1886
1887
1888   Condition.prototype.comment = function() {
1889     return this.json['comment'];
1890   };
1891
1892   /**
1893   This is a description of the level of the severity of the condition.
1894   @returns {CodedValue}
1895   */
1896
1897
1898   Condition.prototype.severity = function() {
1899     return hQuery.createCodedValue(this.json['severity']);
1900   };
1901
1902   return Condition;
1903
1904 })(hQuery.CodedEntry);
1905 /**
1906 @namespace scoping into the hquery namespace
1907 */
1908
1909 var __hasProp = {}.hasOwnProperty,
1910   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
1911
1912 this.hQuery || (this.hQuery = {});
1913
1914 /**
1915 An Encounter is an interaction, regardless of the setting, between a patient and a
1916 practitioner who is vested with primary responsibility for diagnosing, evaluating,
1917 or treating the patients condition. It may include visits, appointments, as well
1918 as non face-to-face interactions. It is also a contact between a patient and a
1919 practitioner who has primary responsibility for assessing and treating the
1920 patient at a given contact, exercising independent judgment.
1921 @class An Encounter is an interaction, regardless of the setting, between a patient and a
1922 practitioner
1923 @augments hQuery.CodedEntry
1924 @exports Encounter as hQuery.Encounter
1925 */
1926
1927
1928 hQuery.Encounter = (function(_super) {
1929
1930   __extends(Encounter, _super);
1931
1932   Encounter.name = 'Encounter';
1933
1934   function Encounter(json) {
1935     this.json = json;
1936     Encounter.__super__.constructor.call(this, this.json);
1937     if (this.json['admitTime']) {
1938       this._admitTime = hQuery.dateFromUtcSeconds(this.json['admitTime']);
1939     }
1940     if (this.json['dischargeTime']) {
1941       this._dischargeTime = hQuery.dateFromUtcSeconds(this.json['dischargeTime']);
1942     }
1943     if (this.json['facility']) {
1944       this._facility = new hQuery.Facility(this.json['facility']);
1945     }
1946   }
1947
1948   /**
1949   @returns {String}
1950   */
1951
1952
1953   Encounter.prototype.dischargeDisposition = function() {
1954     return this.json['dischargeDisposition'];
1955   };
1956
1957   /**
1958   A code indicating the priority of the admission (e.g., Emergency, Urgent, Elective, et cetera) from
1959   National Uniform Billing Committee (NUBC)
1960   @returns {CodedValue}
1961   */
1962
1963
1964   Encounter.prototype.admitType = function() {
1965     return hQuery.createCodedValue(this.json['admitType']);
1966   };
1967
1968   /**
1969   Date and time at which the patient was admitted for the encounter
1970   @returns {Date}
1971   */
1972
1973
1974   Encounter.prototype.admitTime = function() {
1975     return this._admitTime;
1976   };
1977
1978   /**
1979   Date and time at which the patient was discharged for the encounter
1980   @returns {Date}
1981   */
1982
1983
1984   Encounter.prototype.dischargeTime = function() {
1985     return this._dischargeTime;
1986   };
1987
1988   /**
1989   @returns {hQuery.Actor}
1990   */
1991
1992
1993   Encounter.prototype.performer = function() {
1994     if (this.json['performer']) {
1995       return new hQuery.Actor(this.json['performer']);
1996     }
1997   };
1998
1999   /**
2000   @returns {hQuery.Organization}
2001   */
2002
2003
2004   Encounter.prototype.facility = function() {
2005     return this._facility;
2006   };
2007
2008   Encounter.prototype.facilityArrival = function() {
2009     var _ref;
2010     return (_ref = this._facility) != null ? _ref.startDate() : void 0;
2011   };
2012
2013   Encounter.prototype.facilityDeparture = function() {
2014     var _ref;
2015     return (_ref = this._facility) != null ? _ref.endDate() : void 0;
2016   };
2017
2018   /**
2019   @returns {hQuery.CodedEntry}
2020   */
2021
2022
2023   Encounter.prototype.reasonForVisit = function() {
2024     if (this.json['reason']) {
2025       return new hQuery.CodedEntry(this.json['reason']);
2026     }
2027   };
2028
2029   /**
2030   @returns {Integer}
2031   */
2032
2033
2034   Encounter.prototype.lengthOfStay = function() {
2035     if (!((this.startDate() != null) && (this.endDate() != null))) {
2036       return 0;
2037     }
2038     return Math.floor((this.endDate() - this.startDate()) / (1000 * 60 * 60 * 24));
2039   };
2040
2041   /**
2042   @returns {CodedValue}
2043   */
2044
2045
2046   Encounter.prototype.transferTo = function() {
2047     return hQuery.createCodedValue(this.json['transferTo']);
2048   };
2049
2050   /**
2051   @returns {CodedValue}
2052   */
2053
2054
2055   Encounter.prototype.transferFrom = function() {
2056     return hQuery.createCodedValue(this.json['transferFrom']);
2057   };
2058
2059   return Encounter;
2060
2061 })(hQuery.CodedEntry);
2062 /**
2063 @namespace scoping into the hquery namespace
2064 */
2065
2066 var __hasProp = {}.hasOwnProperty,
2067   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2068
2069 this.hQuery || (this.hQuery = {});
2070
2071 /**
2072 This represents all interventional, surgical, diagnostic, or therapeutic procedures or
2073 treatments pertinent to the patient.
2074 @class
2075 @augments hQuery.CodedEntry
2076 @exports Procedure as hQuery.Procedure
2077 */
2078
2079
2080 hQuery.Procedure = (function(_super) {
2081
2082   __extends(Procedure, _super);
2083
2084   Procedure.name = 'Procedure';
2085
2086   function Procedure(json) {
2087     this.json = json;
2088     Procedure.__super__.constructor.call(this, this.json);
2089   }
2090
2091   /**
2092   @returns {hQuery.Actor} The provider that performed the procedure
2093   */
2094
2095
2096   Procedure.prototype.performer = function() {
2097     if (this.json['performer']) {
2098       return new hQuery.Actor(this.json['performer']);
2099     }
2100   };
2101
2102   /**
2103   @returns {hQuery.CodedValue} A SNOMED code indicating the body site on which the
2104   procedure was performed
2105   */
2106
2107
2108   Procedure.prototype.site = function() {
2109     var _ref, _ref1;
2110     return new hQuery.CodedValue((_ref = this.json['site']) != null ? _ref['code'] : void 0, (_ref1 = this.json['site']) != null ? _ref1['codeSystem'] : void 0);
2111   };
2112
2113   /**
2114   @returns {hQuery.CodedValue} A SNOMED code indicating where the procedure was performed.
2115   */
2116
2117
2118   Procedure.prototype.source = function() {
2119     return hQuery.createCodedValue(this.json['source']);
2120   };
2121
2122   /**
2123   @returns {Date} The actual or intended start of an incision.
2124   */
2125
2126
2127   Procedure.prototype.incisionTime = function() {
2128     if (this.json['incisionTime']) {
2129       return hQuery.dateFromUtcSeconds(this.json['incisionTime']);
2130     }
2131   };
2132
2133   /**
2134   Ordinality
2135   @returns {CodedValue}
2136   */
2137
2138
2139   Procedure.prototype.ordinality = function() {
2140     return hQuery.createCodedValue(this.json['ordinality']);
2141   };
2142
2143   return Procedure;
2144
2145 })(hQuery.CodedEntry);
2146 /**
2147 @namespace scoping into the hquery namespace
2148 */
2149
2150 var __hasProp = {}.hasOwnProperty,
2151   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2152
2153 this.hQuery || (this.hQuery = {});
2154
2155 /**
2156 Observations generated by laboratories, imaging procedures, and other procedures. The scope
2157 includes hematology, chemistry, serology, virology, toxicology, microbiology, plain x-ray,
2158 ultrasound, CT, MRI, angiography, cardiac echo, nuclear medicine, pathology, and procedure
2159 observations.
2160 @class
2161 @augments hQuery.CodedEntry
2162 @exports Result as hQuery.Result
2163 */
2164
2165
2166 hQuery.Result = (function(_super) {
2167
2168   __extends(Result, _super);
2169
2170   Result.name = 'Result';
2171
2172   function Result(json) {
2173     this.json = json;
2174     Result.__super__.constructor.call(this, this.json);
2175   }
2176
2177   /**
2178   ASTM CCR defines a restricted set of required result Type codes (see ResultTypeCode in section 7.3
2179   Summary of CCD value sets), used to categorize a result into one of several commonly accepted values
2180   (e.g. Hematology, Chemistry, Nuclear Medicine).
2181   @returns {CodedValue}
2182   */
2183
2184
2185   Result.prototype.resultType = function() {
2186     return this.type();
2187   };
2188
2189   /**
2190   @returns {CodedValue}
2191   */
2192
2193
2194   Result.prototype.interpretation = function() {
2195     return hQuery.createCodedValue(this.json['interpretation']);
2196   };
2197
2198   /**
2199   @returns {String}
2200   */
2201
2202
2203   Result.prototype.referenceRange = function() {
2204     return this.json['referenceRange'];
2205   };
2206
2207   /**
2208   @returns {String}
2209   */
2210
2211
2212   Result.prototype.comment = function() {
2213     return this.json['comment'];
2214   };
2215
2216   return Result;
2217
2218 })(hQuery.CodedEntry);
2219 /**
2220 @namespace scoping into the hquery namespace
2221 */
2222
2223 var __hasProp = {}.hasOwnProperty,
2224   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2225
2226 this.hQuery || (this.hQuery = {});
2227
2228 /**
2229 NoImmunzation as defined by value set 2.16.840.1.113883.1.11.19717
2230 The terms come from Health Level Seven (HL7) Version 3.0 Vocabulary and are managed by HL7
2231 It indicates the reason an immunization was not administered.
2232
2233 @class NoImmunization - describes the status of the medication
2234 @augments hQuery.CodedEntry
2235 @exports NoImmunization as hQuery.NoImmunization
2236 */
2237
2238
2239 hQuery.NoImmunization = (function(_super) {
2240   var IMMUNITY, MED_PRECAUTION, OUT_OF_STOCK, PAT_OBJ, PHIL_OBJ, REL_OBJ, VAC_EFF, VAC_SAFETY;
2241
2242   __extends(NoImmunization, _super);
2243
2244   NoImmunization.name = 'NoImmunization';
2245
2246   function NoImmunization() {
2247     return NoImmunization.__super__.constructor.apply(this, arguments);
2248   }
2249
2250   IMMUNITY = "IMMUNE";
2251
2252   MED_PRECAUTION = "MEDPREC";
2253
2254   OUT_OF_STOCK = "OSTOCK";
2255
2256   PAT_OBJ = "PATOBJ";
2257
2258   PHIL_OBJ = "PHILISOP";
2259
2260   REL_OBJ = "RELIG";
2261
2262   VAC_EFF = "VACEFF";
2263
2264   VAC_SAFETY = "VACSAF";
2265
2266   /**
2267   @returns {Boolean}
2268   */
2269
2270
2271   NoImmunization.prototype.isImmune = function() {
2272     return this.c === IMMUNITY;
2273   };
2274
2275   /**
2276   @returns {Boolean}
2277   */
2278
2279
2280   NoImmunization.prototype.isMedPrec = function() {
2281     return this.c === MED_PRECAUTION;
2282   };
2283
2284   /**
2285   @returns {Boolean}
2286   */
2287
2288
2289   NoImmunization.prototype.isOstock = function() {
2290     return this.c === OUT_OF_STOCK;
2291   };
2292
2293   /**
2294   @returns {Boolean}
2295   */
2296
2297
2298   NoImmunization.prototype.isPatObj = function() {
2299     return this.c === PAT_OBJ;
2300   };
2301
2302   /**
2303   @returns {Boolean}
2304   */
2305
2306
2307   NoImmunization.prototype.isPhilisop = function() {
2308     return this.c === PHIL_OBJ;
2309   };
2310
2311   /**
2312   @returns {Boolean}
2313   */
2314
2315
2316   NoImmunization.prototype.isRelig = function() {
2317     return this.c === REL_OBJ;
2318   };
2319
2320   /**
2321   @returns {Boolean}
2322   */
2323
2324
2325   NoImmunization.prototype.isVacEff = function() {
2326     return this.c === VAC_EFF;
2327   };
2328
2329   /**
2330   @returns {Boolean}
2331   */
2332
2333
2334   NoImmunization.prototype.isVacSaf = function() {
2335     return this.c === VAC_SAFETY;
2336   };
2337
2338   return NoImmunization;
2339
2340 })(hQuery.CodedValue);
2341
2342 /**
2343 @class represents a immunization entry for a patient.
2344 @augments hQuery.CodedEntry
2345 @exports Immunization as hQuery.Immunization
2346 */
2347
2348
2349 hQuery.Immunization = (function(_super) {
2350
2351   __extends(Immunization, _super);
2352
2353   Immunization.name = 'Immunization';
2354
2355   function Immunization(json) {
2356     this.json = json;
2357     Immunization.__super__.constructor.call(this, this.json);
2358   }
2359
2360   /**
2361   @returns{hQuery.Scalar}
2362   */
2363
2364
2365   Immunization.prototype.medicationSeriesNumber = function() {
2366     if (this.json['medicationSeriesNumber']) {
2367       return new hQuery.Scalar(this.json['medicationSeriesNumber']);
2368     }
2369   };
2370
2371   /**
2372   @returns{hQuery.MedicationInformation}
2373   */
2374
2375
2376   Immunization.prototype.medicationInformation = function() {
2377     return new hQuery.MedicationInformation(this.json);
2378   };
2379
2380   /**
2381   @returns{Date} Date immunization was administered
2382   */
2383
2384
2385   Immunization.prototype.administeredDate = function() {
2386     return dateFromUtcSeconds(this.json['administeredDate']);
2387   };
2388
2389   /**
2390   @returns{hQuery.Actor} Performer of immunization
2391   */
2392
2393
2394   Immunization.prototype.performer = function() {
2395     if (this.json['performer']) {
2396       return new hQuery.Actor(this.json['performer']);
2397     }
2398   };
2399
2400   /**
2401   @returns {comment} human readable description of event
2402   */
2403
2404
2405   Immunization.prototype.comment = function() {
2406     return this.json['comment'];
2407   };
2408
2409   /**
2410   @returns {Boolean} whether the immunization has been refused by the patient.
2411   */
2412
2413
2414   Immunization.prototype.refusalInd = function() {
2415     return this.json['negationInd'];
2416   };
2417
2418   /**
2419   NoImmunzation as defined by value set 2.16.840.1.113883.1.11.19717
2420   The terms come from Health Level Seven (HL7) Version 3.0 Vocabulary and are managed by HL7
2421   It indicates the reason an immunization was not administered.
2422   @returns {hQuery.NoImmunization}   Used to indicate reason an immunization was not administered.
2423   */
2424
2425
2426   Immunization.prototype.refusalReason = function() {
2427     var _ref, _ref1;
2428     return new hQuery.NoImmunization((_ref = this.json['negationReason']) != null ? _ref['code'] : void 0, (_ref1 = this.json['negationReason']) != null ? _ref1['codeSystem'] : void 0);
2429   };
2430
2431   return Immunization;
2432
2433 })(hQuery.CodedEntry);
2434 /**
2435 @namespace scoping into the hquery namespace
2436 */
2437
2438 var __hasProp = {}.hasOwnProperty,
2439   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2440
2441 this.hQuery || (this.hQuery = {});
2442
2443 /**
2444 @class
2445 @augments hQuery.CodedEntry
2446 @exports Allergy as hQuery.Allergy
2447 */
2448
2449
2450 hQuery.Allergy = (function(_super) {
2451
2452   __extends(Allergy, _super);
2453
2454   Allergy.name = 'Allergy';
2455
2456   function Allergy(json) {
2457     this.json = json;
2458     Allergy.__super__.constructor.call(this, this.json);
2459   }
2460
2461   /**
2462   Food and substance allergies use the Unique Ingredient Identifier(UNII) from the FDA
2463   http://www.fda.gov/ForIndustry/DataStandards/StructuredProductLabeling/ucm162523.htm
2464
2465   Allegies to a class of medication Shall contain a value descending from the NDF-RT concept types
2466   of Mechanism of Action - N0000000223, Physiologic Effect - N0000009802 or
2467   Chemical Structure - N0000000002. NUI will be used as the concept code.
2468   For more information, please see the Web Site
2469   http://www.cancer.gov/cancertopics/terminologyresources/page5
2470
2471   Allergies to a specific medication shall use RxNorm for the values.
2472   @returns {CodedValue}
2473   */
2474
2475
2476   Allergy.prototype.product = function() {
2477     return this.type();
2478   };
2479
2480   /**
2481   Date of allergy or adverse event
2482   @returns{Date}
2483   */
2484
2485
2486   Allergy.prototype.adverseEventDate = function() {
2487     return dateFromUtcSeconds(this.json['adverseEventDate']);
2488   };
2489
2490   /**
2491   Adverse event types SHALL be coded as specified in HITSP/C80 Section 2.2.3.4.2 Allergy/Adverse Event Type
2492   @returns {CodedValue}
2493   */
2494
2495
2496   Allergy.prototype.adverseEventType = function() {
2497     return hQuery.createCodedValue(this.json['type']);
2498   };
2499
2500   /**
2501   This indicates the reaction that may be caused by the product or agent.
2502    It is defined by 2.16.840.1.113883.3.88.12.3221.6.2 and are SNOMED-CT codes.
2503   420134006   Propensity to adverse reactions (disorder)
2504   418038007   Propensity to adverse reactions to substance (disorder)
2505   419511003   Propensity to adverse reactions to drug (disorder)
2506   418471000   Propensity to adverse reactions to food (disorder)
2507   419199007  Allergy to substance (disorder)
2508   416098002  Drug allergy (disorder)
2509   414285001  Food allergy (disorder)
2510   59037007  Drug intolerance (disorder)
2511   235719002  Food intolerance (disorder)
2512   @returns {CodedValue}
2513   */
2514
2515
2516   Allergy.prototype.reaction = function() {
2517     return hQuery.createCodedValue(this.json['reaction']);
2518   };
2519
2520   /**
2521   This is a description of the level of the severity of the allergy or intolerance.
2522   Use SNOMED-CT Codes as defined by 2.16.840.1.113883.3.88.12.3221.6.8
2523     255604002  Mild
2524     371923003  Mild to Moderate
2525     6736007      Moderate
2526     371924009  Moderate to Severe
2527     24484000    Severe
2528     399166001  Fatal
2529   @returns {CodedValue}
2530   */
2531
2532
2533   Allergy.prototype.severity = function() {
2534     return hQuery.createCodedValue(this.json['severity']);
2535   };
2536
2537   /**
2538   Additional comment or textual information
2539   @returns {String}
2540   */
2541
2542
2543   Allergy.prototype.comment = function() {
2544     return this.json['comment'];
2545   };
2546
2547   return Allergy;
2548
2549 })(hQuery.CodedEntry);
2550 /**
2551 @namespace scoping into the hquery namespace
2552 */
2553
2554 this.hQuery || (this.hQuery = {});
2555
2556 /**
2557 @class
2558
2559 @exports Provider as hQuery.Provider
2560 */
2561
2562
2563 hQuery.Provider = (function() {
2564
2565   Provider.name = 'Provider';
2566
2567   function Provider(json) {
2568     this.json = json;
2569   }
2570
2571   /**
2572   @returns {hQuery.Person}
2573   */
2574
2575
2576   Provider.prototype.providerEntity = function() {
2577     if (this.json['providerEntity']) {
2578       return new hQuery.Person(this.json['providerEntity']);
2579     }
2580   };
2581
2582   /**
2583   @returns {hQuery.DateRange}
2584   */
2585
2586
2587   Provider.prototype.careProvisionDateRange = function() {
2588     if (this.json['careProvisionDateRange']) {
2589       return new hQuery.DateRange(this.json['careProvisionDateRange']);
2590     }
2591   };
2592
2593   /**
2594   @returns {hQuery.CodedValue}
2595   */
2596
2597
2598   Provider.prototype.role = function() {
2599     return hQuery.createCodedValue(this.json['role']);
2600   };
2601
2602   /**
2603   @returns {String}
2604   */
2605
2606
2607   Provider.prototype.patientID = function() {
2608     return this.json['patientID'];
2609   };
2610
2611   /**
2612   @returns {hQuery.CodedValue}
2613   */
2614
2615
2616   Provider.prototype.providerType = function() {
2617     return hQuery.createCodedValue(this.json['providerType']);
2618   };
2619
2620   /**
2621   @returns {String}
2622   */
2623
2624
2625   Provider.prototype.providerID = function() {
2626     return this.json['providerID'];
2627   };
2628
2629   /**
2630   @returns {hQuery.Organization}
2631   */
2632
2633
2634   Provider.prototype.organizationName = function() {
2635     return new hQuery.Organization(this.json);
2636   };
2637
2638   return Provider;
2639
2640 })();
2641 /**
2642 @namespace scoping into the hquery namespace
2643 */
2644
2645 var __hasProp = {}.hasOwnProperty,
2646   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2647
2648 this.hQuery || (this.hQuery = {});
2649
2650 /**
2651 @class
2652 @augments hQuery.CodedEntry
2653 @exports Language as hQuery.Language
2654 */
2655
2656
2657 hQuery.Language = (function(_super) {
2658
2659   __extends(Language, _super);
2660
2661   Language.name = 'Language';
2662
2663   function Language(json) {
2664     this.json = json;
2665     Language.__super__.constructor.call(this, this.json);
2666   }
2667
2668   /**
2669   @returns {hQuery.CodedValue}
2670   */
2671
2672
2673   Language.prototype.modeCode = function() {
2674     return hQuery.createCodedValue(this.json['modeCode']);
2675   };
2676
2677   /**
2678   @returns {String}
2679   */
2680
2681
2682   Language.prototype.preferenceIndicator = function() {
2683     return this.json['preferenceIndicator'];
2684   };
2685
2686   return Language;
2687
2688 })(hQuery.CodedEntry);
2689 /**
2690 @namespace scoping into the hquery namespace
2691 */
2692
2693 var __hasProp = {}.hasOwnProperty,
2694   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2695
2696 this.hQuery || (this.hQuery = {});
2697
2698 /**
2699 This includes information about the patients current and past pregnancy status
2700 The Coded Entry code system should be SNOMED-CT
2701 @class
2702 @augments hQuery.CodedEntry
2703 @exports Pregnancy as hQuery.Pregnancy
2704 */
2705
2706
2707 hQuery.Pregnancy = (function(_super) {
2708
2709   __extends(Pregnancy, _super);
2710
2711   Pregnancy.name = 'Pregnancy';
2712
2713   function Pregnancy(json) {
2714     this.json = json;
2715     Pregnancy.__super__.constructor.call(this, this.json);
2716   }
2717
2718   /**
2719   @returns {String}
2720   */
2721
2722
2723   Pregnancy.prototype.comment = function() {
2724     return this.json['comment'];
2725   };
2726
2727   return Pregnancy;
2728
2729 })(hQuery.CodedEntry);
2730 /**
2731 @namespace scoping into the hquery namespace
2732 */
2733
2734 var __hasProp = {}.hasOwnProperty,
2735   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2736
2737 this.hQuery || (this.hQuery = {});
2738
2739 /**
2740
2741 The Social History Observation is used to define the patient's occupational, personal (e.g. lifestyle),
2742 social, and environmental history and health risk factors, as well as administrative data such as
2743 marital status, race, ethnicity and religious affiliation. The types of conditions
2744 described have been constrained to the SNOMED CT code system using constrained code set, 2.16.840.1.113883.3.88.12.80.60:
2745 229819007   Tobacco use and exposure
2746 256235009   Exercise
2747 160573003   Alcohol Intake
2748 364393001   Nutritional observable
2749 364703007   Employment detail
2750 425400000   Toxic exposure status
2751 363908000   Details of drug misuse behavior
2752 228272008   Health-related behavior
2753 105421008   Educational achievement
2754
2755 note:  Social History is not part of the existing green c32.
2756 @exports Socialhistory as hQuery.Socialhistory
2757 @augments hQuery.CodedEntry
2758 */
2759
2760
2761 hQuery.Socialhistory = (function(_super) {
2762
2763   __extends(Socialhistory, _super);
2764
2765   Socialhistory.name = 'Socialhistory';
2766
2767   function Socialhistory(json) {
2768     this.json = json;
2769     Socialhistory.__super__.constructor.call(this, this.json);
2770   }
2771
2772   /**
2773   Value returns the value of the result. This will return an object. The properties of this
2774   object are dependent on the type of result.
2775   */
2776
2777
2778   Socialhistory.prototype.value = function() {
2779     return this.json['value'];
2780   };
2781
2782   return Socialhistory;
2783
2784 })(hQuery.CodedEntry);
2785 /**
2786 @namespace scoping into the hquery namespace
2787 */
2788
2789 var __hasProp = {}.hasOwnProperty,
2790   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2791
2792 this.hQuery || (this.hQuery = {});
2793
2794 /**
2795
2796 The plan of care contains data defining prospective or intended orders, interventions, encounters, services, and procedures for the patient.
2797
2798 @exports CareGoal as hQuery.CareGoal
2799 @augments hQuery.CodedEntry
2800 */
2801
2802
2803 hQuery.CareGoal = (function(_super) {
2804
2805   __extends(CareGoal, _super);
2806
2807   CareGoal.name = 'CareGoal';
2808
2809   function CareGoal(json) {
2810     this.json = json;
2811     CareGoal.__super__.constructor.call(this, this.json);
2812   }
2813
2814   return CareGoal;
2815
2816 })(hQuery.CodedEntry);
2817 /**
2818 @namespace scoping into the hquery namespace
2819 */
2820
2821 var __hasProp = {}.hasOwnProperty,
2822   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2823
2824 this.hQuery || (this.hQuery = {});
2825
2826 /**
2827
2828 The Medical Equipment section contains information describing a patients implanted and external medical devices and equipment that their health status depends on, as well as any pertinent equipment or device history.
2829
2830 The template identifier for this section is 2.16.840.1.113883.3.88.11.83.128
2831
2832 C83-[CT-128-1] This section shall conform to the HL7 CCD section, and shall contain a templateId element whose root attribute is 2.16.840.1.113883.10.20.1.7.
2833 C83-[CT-128-2] This section SHALL conform to the IHE Medical Devices Section, and shall contain a templateId element whose root attribute is 1.3.6.1.4.1.19376.1.5.3.1.1.5.3.5
2834
2835 @exports MedicalEquipment as hQuery.MedicalEquipment
2836 @augments hQuery.CodedEntry
2837 */
2838
2839
2840 hQuery.MedicalEquipment = (function(_super) {
2841
2842   __extends(MedicalEquipment, _super);
2843
2844   MedicalEquipment.name = 'MedicalEquipment';
2845
2846   function MedicalEquipment(json) {
2847     this.json = json;
2848     MedicalEquipment.__super__.constructor.call(this, this.json);
2849   }
2850
2851   /**
2852   @returns {CodedValue}
2853   */
2854
2855
2856   MedicalEquipment.prototype.anatomicalStructure = function() {
2857     return hQuery.createCodedValue(this.json['anatomicalStructure']);
2858   };
2859
2860   /**
2861   @returns {Date} The actual or intended removal time of the device.
2862   */
2863
2864
2865   MedicalEquipment.prototype.removalTime = function() {
2866     if (this.json['removalTime']) {
2867       return hQuery.dateFromUtcSeconds(this.json['removalTime']);
2868     }
2869   };
2870
2871   return MedicalEquipment;
2872
2873 })(hQuery.CodedEntry);
2874 /**
2875 @namespace scoping into the hquery namespace
2876 */
2877
2878 var __hasProp = {}.hasOwnProperty,
2879   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2880
2881 this.hQuery || (this.hQuery = {});
2882
2883 /**
2884 This class can be used to represnt a functional status for a patient. Currently,
2885 it is not a very close representation of functional status as it is represented
2886 in the HL7 CCD, HITSP C32 or Consolidated CDA.
2887
2888 In the previously mentioned specifications, functional status may represented
2889 using either a condition or result. Having "mixed" types of entries in a section
2890 is currently not well supported in the existing Record class
2891
2892 Additionally, there is a mismatch between the data needed to calculate Stage 2
2893 Meaningful Use Quailty Measures and the data contained in patient summary
2894 standards. The CQMs are checking to see if a functional status represented by
2895 a result was patient supplied. Right now, results do not have a source, and
2896 even if we were to use Provider as a source, it would need to be extended
2897 to support patients.
2898
2899 To avoid this, the patient sumamry style functional status has been "flattened"
2900 into this class. This model supports the information needed to calculate
2901 Stage 2 MU CQMs. If importers are created from C32 or CCDA, the information
2902 can be stored here, but it will be a lossy transformation.
2903 @class
2904 @augments hQuery.CodedEntry
2905 @exports FunctionalStatus as hQuery.FunctionalStatus
2906 */
2907
2908
2909 hQuery.FunctionalStatus = (function(_super) {
2910
2911   __extends(FunctionalStatus, _super);
2912
2913   FunctionalStatus.name = 'FunctionalStatus';
2914
2915   function FunctionalStatus(json) {
2916     this.json = json;
2917     FunctionalStatus.__super__.constructor.call(this, this.json);
2918   }
2919
2920   /**
2921   Either "condition" or "result"
2922   @returns {String}
2923   */
2924
2925
2926   FunctionalStatus.prototype.type = function() {
2927     return this.json["type"];
2928   };
2929
2930   /**
2931   A coded value. Like a code for patient supplied.
2932   @returns {hQuery.CodedValue}
2933   */
2934
2935
2936   FunctionalStatus.prototype.source = function() {
2937     return hQuery.createCodedValue(this.json["source"]);
2938   };
2939
2940   return FunctionalStatus;
2941
2942 })(hQuery.CodedEntry);
2943 /**
2944 @namespace scoping into the hquery namespace
2945 */
2946
2947 var __hasProp = {}.hasOwnProperty,
2948   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
2949
2950 this.hQuery || (this.hQuery = {});
2951
2952 /**
2953 @class Supports
2954 @exports Supports as hQuery.Supports
2955 */
2956
2957
2958 hQuery.Supports = (function() {
2959
2960   Supports.name = 'Supports';
2961
2962   function Supports(json) {
2963     this.json = json;
2964   }
2965
2966   /**
2967   @returns {DateRange}
2968   */
2969
2970
2971   Supports.prototype.supportDate = function() {
2972     return new hQuery.DateRange(this.json['supportDate']);
2973   };
2974
2975   /**
2976   @returns {Person}
2977   */
2978
2979
2980   Supports.prototype.guardian = function() {
2981     return new hQuery.Person(this.json['guardian']);
2982   };
2983
2984   /**
2985   @returns {String}
2986   */
2987
2988
2989   Supports.prototype.guardianSupportType = function() {
2990     return this.json['guardianSupportType'];
2991   };
2992
2993   /**
2994   @returns {Person}
2995   */
2996
2997
2998   Supports.prototype.contact = function() {
2999     return new hQuery.Person(this.json['contact']);
3000   };
3001
3002   /**
3003   @returns {String}
3004   */
3005
3006
3007   Supports.prototype.contactSupportType = function() {
3008     return this.json['guardianSupportType'];
3009   };
3010
3011   return Supports;
3012
3013 })();
3014
3015 /**
3016 @class Representation of a patient
3017 @augments hQuery.Person
3018 @exports Patient as hQuery.Patient
3019 */
3020
3021
3022 hQuery.Patient = (function(_super) {
3023
3024   __extends(Patient, _super);
3025
3026   Patient.name = 'Patient';
3027
3028   function Patient() {
3029     return Patient.__super__.constructor.apply(this, arguments);
3030   }
3031
3032   /**
3033   @returns {String} containing M or F representing the gender of the patient
3034   */
3035
3036
3037   Patient.prototype.gender = function() {
3038     return this.json['gender'];
3039   };
3040
3041   /**
3042   @returns {Date} containing the patients birthdate
3043   */
3044
3045
3046   Patient.prototype.birthtime = function() {
3047     if (this.json['birthdate']) {
3048       return hQuery.dateFromUtcSeconds(this.json['birthdate']);
3049     }
3050   };
3051
3052   /**
3053   @param (Date) date the date at which the patient age is calculated, defaults to now.
3054   @returns {number} the patient age in years
3055   */
3056
3057
3058   Patient.prototype.age = function(date) {
3059     var oneDay, oneYear;
3060     if (date == null) {
3061       date = new Date();
3062     }
3063     oneDay = 24 * 60 * 60 * 1000;
3064     oneYear = 365.25 * oneDay;
3065     return (date.getTime() - this.birthtime().getTime()) / oneYear;
3066   };
3067
3068   /**
3069   @returns {CodedValue} the domestic partnership status of the patient
3070   The following HL7 codeset is used:
3071   A  Annulled
3072   D  Divorced
3073   I   Interlocutory
3074   L  Legally separated
3075   M  Married
3076   P  Polygamous
3077   S  Never Married
3078   T  Domestic Partner
3079   W  Widowed
3080   */
3081
3082
3083   Patient.prototype.maritalStatus = function() {
3084     if (this.json['maritalStatus']) {
3085       return hQuery.createCodedValue(this.json['maritalStatus']);
3086     }
3087   };
3088
3089   /**
3090   @returns {CodedValue}  of the spiritual faith affiliation of the patient
3091   It uses the HL7 codeset.  http://www.hl7.org/memonly/downloads/v3edition.cfm#V32008
3092   */
3093
3094
3095   Patient.prototype.religiousAffiliation = function() {
3096     if (this.json['religiousAffiliation']) {
3097       return hQuery.createCodedValue(this.json['religiousAffiliation']);
3098     }
3099   };
3100
3101   /**
3102   @returns {CodedValue}  of the race of the patient
3103   CDC codes:  http://phinvads.cdc.gov/vads/ViewCodeSystemConcept.action?oid=2.16.840.1.113883.6.238&code=1000-9
3104   */
3105
3106
3107   Patient.prototype.race = function() {
3108     if (this.json['race']) {
3109       return hQuery.createCodedValue(this.json['race']);
3110     }
3111   };
3112
3113   /**
3114   @returns {CodedValue} of the ethnicity of the patient
3115   CDC codes:  http://phinvads.cdc.gov/vads/ViewCodeSystemConcept.action?oid=2.16.840.1.113883.6.238&code=1000-9
3116   */
3117
3118
3119   Patient.prototype.ethnicity = function() {
3120     if (this.json['ethnicity']) {
3121       return hQuery.createCodedValue(this.json['ethnicity']);
3122     }
3123   };
3124
3125   /**
3126   @returns {CodedValue} This is the code specifying the level of confidentiality of the document.
3127   HL7 Confidentiality Code (2.16.840.1.113883.5.25)
3128   */
3129
3130
3131   Patient.prototype.confidentiality = function() {
3132     if (this.json['confidentiality']) {
3133       return hQuery.createCodedValue(this.json['confidentiality']);
3134     }
3135   };
3136
3137   /**
3138   @returns {Address} of the location where the patient was born
3139   */
3140
3141
3142   Patient.prototype.birthPlace = function() {
3143     return new hQuery.Address(this.json['birthPlace']);
3144   };
3145
3146   /**
3147   @returns {Supports} information regarding key support contacts relative to healthcare decisions, including next of kin
3148   */
3149
3150
3151   Patient.prototype.supports = function() {
3152     return new hQuery.Supports(this.json['supports']);
3153   };
3154
3155   /**
3156   @returns {Organization}
3157   */
3158
3159
3160   Patient.prototype.custodian = function() {
3161     return new hQuery.Organization(this.json['custodian']);
3162   };
3163
3164   /**
3165   @returns {Provider}  the providers associated with the patient
3166   */
3167
3168
3169   Patient.prototype.provider = function() {
3170     return new hQuery.Provider(this.json['provider']);
3171   };
3172
3173   /**
3174   @returns {hQuery.CodedEntryList} A list of {@link hQuery.LanguagesSpoken} objects
3175   Code from http://www.ietf.org/rfc/rfc4646.txt representing the name of the human language
3176   */
3177
3178
3179   Patient.prototype.languages = function() {
3180     var language, list, _i, _len, _ref;
3181     list = new hQuery.CodedEntryList;
3182     if (this.json['languages']) {
3183       _ref = this.json['languages'];
3184       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3185         language = _ref[_i];
3186         list.push(new hQuery.Language(language));
3187       }
3188     }
3189     return list;
3190   };
3191
3192   /**
3193   @returns {Boolean} returns true if the patient has died
3194   */
3195
3196
3197   Patient.prototype.expired = function() {
3198     return this.json['expired'];
3199   };
3200
3201   /**
3202   @returns {Boolean} returns true if the patient participated in a clinical trial
3203   */
3204
3205
3206   Patient.prototype.clinicalTrialParticipant = function() {
3207     return this.json['clinicalTrialParticipant'];
3208   };
3209
3210   /**
3211   @returns {hQuery.CodedEntryList} A list of {@link hQuery.Encounter} objects
3212   */
3213
3214
3215   Patient.prototype.encounters = function() {
3216     var encounter, list, _i, _len, _ref;
3217     list = new hQuery.CodedEntryList;
3218     if (this.json['encounters']) {
3219       _ref = this.json['encounters'];
3220       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3221         encounter = _ref[_i];
3222         list.pushIfUsable(new hQuery.Encounter(encounter));
3223       }
3224     }
3225     return list;
3226   };
3227
3228   /**
3229   @returns {hQuery.CodedEntryList} A list of {@link Medication} objects
3230   */
3231
3232
3233   Patient.prototype.medications = function() {
3234     var list, medication, _i, _len, _ref;
3235     list = new hQuery.CodedEntryList;
3236     if (this.json['medications']) {
3237       _ref = this.json['medications'];
3238       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3239         medication = _ref[_i];
3240         list.pushIfUsable(new hQuery.Medication(medication));
3241       }
3242     }
3243     return list;
3244   };
3245
3246   /**
3247   @returns {hQuery.CodedEntryList} A list of {@link Condition} objects
3248   */
3249
3250
3251   Patient.prototype.conditions = function() {
3252     var condition, list, _i, _len, _ref;
3253     list = new hQuery.CodedEntryList;
3254     if (this.json['conditions']) {
3255       _ref = this.json['conditions'];
3256       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3257         condition = _ref[_i];
3258         list.pushIfUsable(new hQuery.Condition(condition));
3259       }
3260     }
3261     return list;
3262   };
3263
3264   /**
3265   @returns {hQuery.CodedEntryList} A list of {@link Procedure} objects
3266   */
3267
3268
3269   Patient.prototype.procedures = function() {
3270     var list, procedure, _i, _len, _ref;
3271     list = new hQuery.CodedEntryList;
3272     if (this.json['procedures']) {
3273       _ref = this.json['procedures'];
3274       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3275         procedure = _ref[_i];
3276         list.pushIfUsable(new hQuery.Procedure(procedure));
3277       }
3278     }
3279     return list;
3280   };
3281
3282   /**
3283   @returns {hQuery.CodedEntryList} A list of {@link Result} objects
3284   */
3285
3286
3287   Patient.prototype.results = function() {
3288     var list, result, _i, _len, _ref;
3289     list = new hQuery.CodedEntryList;
3290     if (this.json['results']) {
3291       _ref = this.json['results'];
3292       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3293         result = _ref[_i];
3294         list.pushIfUsable(new hQuery.Result(result));
3295       }
3296     }
3297     return list;
3298   };
3299
3300   /**
3301   @returns {hQuery.CodedEntryList} A list of {@link Result} objects
3302   */
3303
3304
3305   Patient.prototype.vitalSigns = function() {
3306     var list, vital, _i, _len, _ref;
3307     list = new hQuery.CodedEntryList;
3308     if (this.json['vital_signs']) {
3309       _ref = this.json['vital_signs'];
3310       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3311         vital = _ref[_i];
3312         list.pushIfUsable(new hQuery.Result(vital));
3313       }
3314     }
3315     return list;
3316   };
3317
3318   /**
3319   @returns {hQuery.CodedEntryList} A list of {@link Immunization} objects
3320   */
3321
3322
3323   Patient.prototype.immunizations = function() {
3324     var immunization, list, _i, _len, _ref;
3325     list = new hQuery.CodedEntryList;
3326     if (this.json['immunizations']) {
3327       _ref = this.json['immunizations'];
3328       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3329         immunization = _ref[_i];
3330         list.pushIfUsable(new hQuery.Immunization(immunization));
3331       }
3332     }
3333     return list;
3334   };
3335
3336   /**
3337   @returns {hQuery.CodedEntryList} A list of {@link Allergy} objects
3338   */
3339
3340
3341   Patient.prototype.allergies = function() {
3342     var allergy, list, _i, _len, _ref;
3343     list = new hQuery.CodedEntryList;
3344     if (this.json['allergies']) {
3345       _ref = this.json['allergies'];
3346       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3347         allergy = _ref[_i];
3348         list.pushIfUsable(new hQuery.Allergy(allergy));
3349       }
3350     }
3351     return list;
3352   };
3353
3354   /**
3355   @returns {hQuery.CodedEntryList} A list of {@link Pregnancy} objects
3356   */
3357
3358
3359   Patient.prototype.pregnancies = function() {
3360     var list, pregnancy, _i, _len, _ref;
3361     list = new hQuery.CodedEntryList;
3362     if (this.json['pregnancies']) {
3363       _ref = this.json['pregnancies'];
3364       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3365         pregnancy = _ref[_i];
3366         list.pushIfUsable(new hQuery.Pregnancy(pregnancy));
3367       }
3368     }
3369     return list;
3370   };
3371
3372   /**
3373   @returns {hQuery.CodedEntryList} A list of {@link Socialhistory} objects
3374   */
3375
3376
3377   Patient.prototype.socialHistories = function() {
3378     var list, socialhistory, _i, _len, _ref;
3379     list = new hQuery.CodedEntryList;
3380     if (this.json['socialhistories']) {
3381       _ref = this.json['socialhistories'];
3382       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3383         socialhistory = _ref[_i];
3384         list.pushIfUsable(new hQuery.Socialhistory(socialhistory));
3385       }
3386     }
3387     return list;
3388   };
3389
3390   /**
3391   @returns {hQuery.CodedEntryList} A list of {@link CareGoal} objects
3392   */
3393
3394
3395   Patient.prototype.careGoals = function() {
3396     var caregoal, list, _i, _len, _ref;
3397     list = new hQuery.CodedEntryList;
3398     if (this.json['care_goals']) {
3399       _ref = this.json['care_goals'];
3400       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3401         caregoal = _ref[_i];
3402         list.pushIfUsable(new hQuery.CareGoal(caregoal));
3403       }
3404     }
3405     return list;
3406   };
3407
3408   /**
3409   @returns {hQuery.CodedEntryList} A list of {@link MedicalEquipment} objects
3410   */
3411
3412
3413   Patient.prototype.medicalEquipment = function() {
3414     var equipment, list, _i, _len, _ref;
3415     list = new hQuery.CodedEntryList;
3416     if (this.json['medical_equipment']) {
3417       _ref = this.json['medical_equipment'];
3418       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3419         equipment = _ref[_i];
3420         list.pushIfUsable(new hQuery.MedicalEquipment(equipment));
3421       }
3422     }
3423     return list;
3424   };
3425
3426   /**
3427   @returns {hQuery.CodedEntryList} A list of {@link FunctionalStatus} objects
3428   */
3429
3430
3431   Patient.prototype.functionalStatuses = function() {
3432     var fs, list, _i, _len, _ref;
3433     list = new hQuery.CodedEntryList;
3434     if (this.json['functional_statuses']) {
3435       _ref = this.json['functional_statuses'];
3436       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
3437         fs = _ref[_i];
3438         list.pushIfUsable(new hQuery.FunctionalStatus(fs));
3439       }
3440     }
3441     return list;
3442   };
3443
3444   return Patient;
3445
3446 })(hQuery.Person);
3447 
