/***************************************************************
    This contains the controller for the "Notes" noteApp
***************************************************************/
noteApp.controller('cmcNotesAppSilkCtrl', ['$scope', '$http', '$location', '$filter', '$window',
    function ($scope, $http, $location, $filter, $window) {
        'use strict';

        $scope.maxHeight = "300px";
        $scope.maxWidth = "300px";
        $scope.height = "300px";
        $scope.width = "300px";
        $scope.items = [{
            name: '300px'
        }, {
            name: '600px'
        }, {
            name: '900px'
        }, {
            name: 'fullScreen'
        }];

        $scope.activeTab = 1;
        //Checks if the tab is active
        $scope.isTabActive = function (tab) {
            return $scope.activeTab === tab;
        };



        //fetch static data for category and activity dropDown
        $scope.fetchNotesData = function () {
            $http.get('/getStaticJsonData')
                .success(function (data) {
                    $scope.notes = JSON.parse(data.data.notes);
                })
                .error(function (err) {
                    console.log("Error in fetching images from imagesets");
                    console.log(err);
                });
        };
        $scope.fetchNotesData();

        //Sets the tab as the active tab
        //Also sets the mode for the wear test create / edit
        $scope.setActiveTab = function (tab) {
            $scope.activeTab = tab;
            if ($scope.activeTab == 2) {
                $scope.AddNotes();
            }
        };


        //Checks if the wear test is active or not
        $scope.isActive = function (status) {
            return status === "active";
        }


        //Sets the active step (used from the step navbar)
        $scope.setActiveStep = function (step) {
            $scope.activeStep = step;
        };

        // SET  height and width of Text Area
        $scope.setTextAreaHeightWidth = function (items) {
            if (items.name !== 'fullScreen') {
                $scope.maxHeight = items.name;
                $scope.maxWidth = items.name;
                $scope.height =  items.name;
                $scope.width =  items.name;

            } else {
                var w = angular.element($window);
                $scope.maxHeight = w.height() + 'px';
                $scope.maxWidth = w.width() + 'px';
                $scope.height = w.height() + 'px';
                $scope.width = w.width() + 'px';
            }
        }

        //Save Json in note.json
        $scope.saveJson = function () {
            $http.post('/postStaticJsonData', {
                "notes": JSON.stringify($scope.notes)
            })
                .success(function (data) {
                    $scope.fetchNotesData();
                })
                .error(function (err) {
                    $scope.fetchNotesData();
                    console.log("Error in fetching images from imagesets");
                    console.log(err);
                });
        };

        // Note open in edit mode
        $scope.editNotes = function (note) {
            $scope.noteId = note.id;
            $scope.note = note.value;
            $scope.activeTab = 2;
        }

         // Note open in Add mode
        $scope.AddNotes = function (note) {
            $scope.noteId = 0;
            $scope.note = "";
            $scope.activeTab = 2;
        }

         // Note Cancel
        $scope.cancelNotes = function () {
            $scope.activeTab = 1;
        }

        // Call when click on save
        $scope.saveNote = function (note) {
            if (note != "" && note != undefined) {
                if ($scope.noteId > 0) {
                    $scope.notes[$scope.noteId - 1].value = note;
                } else {
                    var addNotes = {
                        "id": $scope.notes.length + 1,
                        "value": note
                    }
                    $scope.notes.push(addNotes);
                }
                $scope.saveJson();
                $scope.cancelNotes();
            } else {
                alert("Note is not empty");
            }

        }


       // Delete Note
        $scope.deleteEntry = function () {
            var noteIndex = $scope.notes.indexOf($scope.deleteNote);
            if (noteIndex > -1) {
                $scope.notes.splice(noteIndex);
            }
            $scope.saveJson();
            $scope.cancelNotes();
            $scope.showConfirmModal = false;
        }

        //Confirm with the user if the user wishes to delete
        $scope.openConfirmDeletionModal = function (note) {
            $scope.showConfirmModal = true;
            $scope.deleteNote = note;
        };

        //Close confirm
        $scope.closeConfirmDeletionModal = function () {
            $scope.showConfirmModal = false;
        };

    }
]);