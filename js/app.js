/**
 * Created by don on 4/27/16.
 */
(function (angular) {
    
    var myApp = angular.module("myApp",[]);
    
    myApp.controller ("MainController",function ($scope,$http) {
        $scope.data= [];
        $scope.title = "Don Le";
        $scope.cloneData = {};
        // Get data from json file
        $http.get("data/mydata.json").then(function (res) {
            $scope.data = res.data;
        }, function (err) {
            console.log(err.statusText);
        });
        $scope.editMode = false;
        $scope.editModeToggle = function () {
            $scope.editMode=$scope.editMode? false:true ;
            if ($scope.editMode)
                $('#guideModal').modal('show');
        };
        var normalSave;
        $scope.saveChange = normalSave= function () {
            $('#myModal').modal('hide');
            $scope.data=angular.copy($scope.cloneData);

        };
        $scope.editEnable = function (params,saveFunction) {

            $('#myModal').modal('show');
            $scope.cloneData=angular.copy($scope.data);
            $scope.params=params;
            $scope.saveChange=saveFunction;
        };


        $scope.editBaseInfo = function () {
           if ($scope.editMode==false)
               return;
            var params = [
                {
                    name: 'Full name',
                    obj: 'personName'
                },
                {
                    name: 'Main Job',
                    obj: 'mainJob'
                },
                {
                    name: 'Country',
                    obj: 'country'
                },
                {
                    name: 'Current company',
                    obj: 'current'
                },
                {
                    name: 'Education',
                    obj: 'edu'
                },
                {
                    name: 'Email',
                    obj: 'email'
                }
            ];
            $scope.editEnable(params,normalSave);

        };

        $scope.addField= function () {


        };
        $scope.addExperience = function () {
           $scope.temp = {
               companyName: '',
               position:  '',
               period :  '',
               location :  '',
               avatar: ''
           };
            var params = [
                {
                    name: 'Company name',
                    obj: 'companyName'
                },
                {
                    name: 'Position',
                    obj: 'position'
                },
                {
                    name: 'Period',
                    obj: 'period'
                },
                {
                    name: 'Location',
                    obj: 'location'
                },
                {
                    name: 'avatar',
                    obj: 'avatar'
                }

            ];
            $scope.title = 'Experience';
            $scope.addParams=params;
            $('#addModal').modal('show');
            $scope.addField = function () {
                console.log($scope.temp);
                if ($scope.temp.companyName!="")
                    $scope.data.education.push($scope.temp);
                $('#addModal').modal('hide');
            }
        };
        $scope.addEducation = function () {
            $scope.temp = {
                schoolName: '',
                major:  '',
                period :  '',
                location :  ''
            };
            var params = [
                {
                    name: 'School name',
                    obj: 'schoolName'
                },
                {
                    name: 'Major',
                    obj: 'major'
                },
                {
                    name: 'Period',
                    obj: 'period'
                },
                {
                    name: 'Location',
                    obj: 'location'
                }

            ];
            $scope.title = 'Education';
            $scope.addParams=params;
            $('#addModal').modal('show');
            $scope.addField = function () {
                console.log($scope.temp);
                if ($scope.temp.schoolName!="")
                $scope.data.experience.push($scope.temp);
                $('#addModal').modal('hide');
            }
        };
        $scope.addProject = function () {
            $scope.temp = {
                name: '',
                link:  ''
            };
            var params = [
                {
                    name: 'Name',
                    obj: 'name'
                },
                {
                    name: 'Link',
                    obj: 'link'
                }

            ];
            $scope.title = 'Project';
            $scope.addParams=params;
            $('#addModal').modal('show');
            $scope.addField = function () {
                console.log($scope.temp);
                if ($scope.temp.schoolName!="")
                $scope.data.project.push($scope.temp);
                $('#addModal').modal('hide');
            }
        };
        $scope.addSkill = function () {
            $scope.temp = {
                name: '',
                type:  '',
                level:  ''
            };
            var params = [
                {
                    name: 'Name',
                    obj: 'name'
                },
                {
                    name: 'Type',
                    obj: 'type'
                },
                {
                    name: 'Level',
                    obj: 'level'
                }

            ];
            $scope.title = 'Skill';
            $scope.addParams=params;
            $('#addModal').modal('show');
            $scope.addField = function () {
                console.log($scope.temp);
                if ($scope.temp.schoolName!="")
                    $scope.data.skill.push($scope.temp);
                $('#addModal').modal('hide');
            }
        };
        $scope.editProject = function (item,index) {
           var params =[
                {
                    name: 'Name',
                    obj: 'name'
                },
                {
                    name: 'Link',
                    obj: 'link'
                }

            ];
            editItem('project',item,index,params);
        };
        $scope.editEducation = function (item,index) {
            var params = [
                {
                    name: 'School name',
                    obj: 'schoolName'
                },
                {
                    name: 'Major',
                    obj: 'major'
                },
                {
                    name: 'Period',
                    obj: 'period'
                },
                {
                    name: 'Location',
                    obj: 'location'
                }

            ];
            editItem('education',item,index,params);
        };
        $scope.editExperience = function (item,index) {
            console.log('exp',item);
            var params = [
                {
                    name: 'Company name',
                    obj: 'companyName'
                },
                {
                    name: 'Position',
                    obj: 'position'
                },
                {
                    name: 'Period',
                    obj: 'period'
                },
                {
                    name: 'Location',
                    obj: 'location'
                },
                {
                    name: 'avatar',
                    obj: 'avatar'
                }

            ];
            editItem('experience',item,index,params);
        };

        var editItem = function (sub,item,index,params) {
            $scope.cloneData = angular.copy(item);
            $scope.params =params;
            $('#myModal').modal('show');
            $scope.saveChange = function () {
                if ($scope.cloneData.name == '')
                {

                }
                else {
                    // item=$scope.cloneData;
                    $scope.data[sub][index]=$scope.cloneData;
                    console.log('xxx',$scope.data[sub][index]);
                }
                $('#myModal').modal('hide');
            }
        };

        $scope.removeItem =function (item,sub) {
            console.log('deleting item',item);
            var r = window.confirm('Do you want to delete this?');
            if (r)
            {
                $scope.data[sub].splice($scope.data[sub].indexOf(item),1);
            }
        };
    });
})(window.angular);