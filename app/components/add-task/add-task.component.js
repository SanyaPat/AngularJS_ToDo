(function () {
  'use strict';

  angular
      .module('addTask')
      .component('addTask', {
        templateUrl: 'components/add-task/add-task.template.html',
        controller: AddTaskController,
        require: {
          parent: '^^todoList'
        }
      });

  AddTaskController.$inject = ['todoService'];

  function AddTaskController(todoService) {
    let $ctrl = this;

    $ctrl.addTask = addTask;

    function addTask() {
      // не добавлять пустые задания
      if ($ctrl.addTaskInputText) {
        $ctrl.parent.tasks.push({
          id: todoService.generateId(),
          text: $ctrl.addTaskInputText,
          done: false,
          important: false,
          date: Date.now(),
          description: ""
        });
        $ctrl.addTaskInputText = '';
      } else {
        console.log('Empty input');
      }
    }

  }

})();
