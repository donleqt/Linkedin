/**
 * Created by don on 4/27/16.
 */
(function (angular) {
    
    var myApp = angular.module("myApp",['firebase']);
    
    myApp.controller ("MainController",function ($scope,$http,$firebaseObject) {
       $scope.mylog = '';
       $scope.isLoggedIn =false;
        $scope.loginData= {
            email:'',
            password:''
        };

        $scope.logout = function () {
            if (ref.getAuth())
            {
                ref.unauth();
                $scope.isLoggedIn =false;
                window.location.reload();
            }

        };
        $scope.data= [];
        var ref =new Firebase("https://mycv01.firebaseio.com/");
        if (ref.getAuth())
        {
            $scope.isLoggedIn =true;
            var syncObject = $firebaseObject(ref);
            // synchronize the object with a three-way data binding
            syncObject.$bindTo($scope, "data");

        }
        $scope.loadingFlag=false;
        $scope.Login = function () {
            $scope.mylog= '';
            // fire base

            $scope.loadingFlag=true;
            ref.authWithPassword($scope.loginData, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $scope.mylog= error.toString();
                    $scope.loadingFlag=false;
                    console.log($scope.mylog);
                    $scope.$apply();

                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $scope.isLoggedIn=true;
                    // download the data into a local object
                    var syncObject = $firebaseObject(ref);
                    // synchronize the object with a three-way data binding
                    syncObject.$bindTo($scope, "data");
                    $scope.loadingFlag=false;
                    $scope.$apply();
                }
            });
        };

        $scope.Register = function () {
            $scope.mylog= '';
            $scope.loadingFlag=true;
            ref.createUser($scope.loginData, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                    $scope.mylog= error.toString();

                    $scope.loadingFlag=false;
                    $scope.$apply();
                } else {
                    console.log("Successfully created user account with uid:", userData);
                    $scope.mylog= 'Successfully created user !'
                    $scope.loggin = true;
                    $scope.loadingFlag=false;
                    $scope.$apply();
                }
            });
        };
        $scope.title = "Don Le";
        $scope.cloneData = {};
        // Get data from json file
        // $http.get("data/mydata.json").then(function (res) {
        //     $scope.data = res.data;
        // }, function (err) {
        //     console.log(err.statusText);
        // });
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
        $scope.changePicture = function () {
            
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
                    name: 'Type (1 or 2)',
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