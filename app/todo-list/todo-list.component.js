'use strict';

// Чтобы использовать сервис в Angular, нужно объявить имена необходимых зависимостей в качестве
// аргументов функции конструктора контроллера, следующим образом: function TodoListController($http) {...}
// Инжектор зависимостей Angular предоставляет сервисы контроллеру при его создании.
// Префикс `$` служит для пространства имен Angular сервисов.
function TodoListController($http) {
  // Контроллер, где будут обрабатываться все данные.
  // Чтобы избегать непосредственного использования scope, следует использовать экземпляр контроллера
  // (присваивать данные и методы свойствам контроллера (`this` внутри конструктора контроллера), а не
  // непосредственно в scope)
  this.filterButtons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ];

  // Хранилище для всех заданий
  // URL берется относительно файла `index.html`
  // Сервис $http возвращает объект promise, который имеет метод then(). Этот метод вызывается для обработки
  // асинхронного ответа для присваивания списка заданий контроллеру как свойство `tasks`
  $http.get('tasks/tasks.json').then((response) => {
    // В свойстве `data` объекта ответа, переданного обратному вызову (callback) содержится массив объектов списка заданий из JSON файла
    this.tasks = response.data;
  });

  this.remainingTasks = () => {
    return this.tasks.filter((task) => !task.done).length;
  };

  this.archiveCompletedTasks = () => {
    const oldTasks = this.tasks;
    this.tasks = [];
    oldTasks.forEach((task) => {
      if (!task.done) {
        this.tasks.push(task);
      }
    });
    console.log('Old task list: ', oldTasks);
  };

  this.importantTask = (task) => {
    task.important = !task.important;
  };

  this.deleteTask = (task) => {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1)
  };

  this.addTask = () => {
    // не добавлять пустые задания
    if (this.addTaskInputText) {
      this.tasks.push({
        text: this.addTaskInputText,
        done: false,
        important: false
      });
      this.addTaskInputText = '';
    } else {
      console.log('Empty input');
    }
  };
}

// Зарегистрировать компонент `todoList` в модуле `todoList` вместе со связанным с ним контроллером и шаблоном
// При минимизации javascript кода контроллера `TodoListController`, все аргументы функции также будут
// минимизированы, и инжектор зависимостей не сможет правильно идентифицировать сервисы.
// Чтобы этого избежать, следует объявить функцию с зависимостями в виде строки, которая не будет минимизирована.
// Для этого используется встроенная аннотация, где вместо объявления функции идет массив, который содержит список сервисов, за которым следует сама функция в качестве последнего элемента массива.
angular.module('todoList')
    .component('todoList', {
      // URL берется относительно файла `index.html`
      templateUrl: 'todo-list/todo-list.template.html',
      controller: ['$http', TodoListController]
    });

