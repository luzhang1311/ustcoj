angular
    .module('ustc-oj')
    .controller("submitCtrl", function ($routeParams, $scope, $http, $rootScope, $window, problemService, userService) {
    $scope.submitSource = "";
    $scope.isIdValid = false;
    $scope.submitLang = userService.getLastLang();
    $scope.submitId = userService.getLastLang();
    $scope.submitStatus = false;
    $scope.submitMsg = "";
    $scope.submitPublic = 0;
    $scope.isContest = false;
    $scope.ContestId = 0;
    $scope.nowContestProblem = null;
    $scope.languageList = problemService.languageList;
    $scope.submitTitle = "????";
    console.log($scope.languageList);

    if ($routeParams.contest_ID == null) {

    }
    else {
        $scope.isContest = true;
        $scope.ContestId = $routeParams.contest_ID;
        $scope.nowContestProblem = $routeParams.prolem_SEQ;
    }

    $scope.submitFire = function (source, lang, id) {
        var submissionData = {
            code: source,
            language: lang,
            problem_id: id
        };
        userService.saveLastLang(lang);
        userService.saveLastProb(id);
        /*
        $http.post($rootScope.apiHost + $rootScope.submitUrl, data, config).then(function (response) {
            if (response.data.status.code === 1){
                $scope.submitStatus = true;
                $scope.submitMsg = response.data.status.message;
            } else {
                $window.location.href = '#/status/';
            }


        });
        */
        problemService.submitCode(function(response) {
            $window.location.href = '#/status/';
        }, submissionData, $scope.ContestId);
    };

    $scope.getProblemTitle = function() {
        $scope.isIdValid = false;
        $scope.submitTitle = "????";
        if (problemService.checkValidProblemId($scope.submitId)) {
            problemService.getSimpleProblem(function(result) {
                $scope.submitTitle = result.problem.problem_title;
            })
        }
    };
});

