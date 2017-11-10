"use strict";

function Task(options) {
  options.from = options.from || options.owner;
  var defaults = {
  	id: 0,
    name: "",
    category: "",
    owner: "",
    recurrence: "",
    active: true,
    recipients: [""],
    from: ""
  };
  return Object.assign({}, defaults, options);
}

var users = {
  4114: "mhodges",
  4110: "rhodges"
};
var tasks = [
  new Task({
  	id: 0,
    name: "Cust Status 1",
    category: "Reporting",
    owner: "mhodges",
    recurrence: "weekly"
  }),
  new Task({
  	id: 1,
    name: "Cust Status 2",
    category: "Reporting",
    owner: "mhodges",
    recurrence: "daily"
  }),
  new Task({
    id: 2,
		name: "Cust Status 3",
    category: "Reporting",
    owner: "mhodges",
    recurrence: "weekly"
  }),
  new Task({
    id: 3,
    name: "Cust Status 4",
    category: "Reporting",
    owner: "mhodges",
    recurrence: "daily"
  }),
  new Task({
    id: 4,
    name: "Cust Status 1",
    category: "Reporting",
    owner: "rhodges",
    recurrence: "daily"
  }),
  new Task({
    id: 5,
    name: "DB Clear 1",
    category: "Admin",
    owner: "mhodges",
    recurrence: "monthly"
  }),
  new Task({
    id: 6,
    name: "DB Clear 2",
    category: "Admin",
    owner: "mhodges",
    recurrence: "monthly"
  }),
  new Task({
    id: 7,
    name: "Data Cleanup",
    category: "Admin",
    owner: "rhodges",
    recurrence: "weekly"
  }),
  new Task({
    id: 8,
    name: "Job Order 1",
    category: "Reporting",
    owner: "rhodges",
    recurrence: "weekly"
  }),
  new Task({
    id: 9,
    name: "Cust Status 5",
    category: "Reporting",
    owner: "mhodges",
    recurrence: "weekly"
  }),
  new Task({
    id: 10,
    name: "Cust Status 2",
    category: "Reporting",
    owner: "rhodges",
    recurrence: "weekly"
  }),
  new Task({
    id: 11,
    name: "Inventory 1",
    category: "Reporting",
    owner: "mhodges",
    recurrence: "daily"
  })
];




taskSchedulerCtrl.$inject = ["$http", "$scope", "taskService"];
function taskSchedulerCtrl($http, $scope, taskService) {
  this.$onInit = () => {
    this.message = "Task Scheduler!";
    this.userId = "4114";
    this.userTasks = [];
    this.getTasks();
  };
  this.getTasks = () => {
    taskService.getTasksForUser(this.userId)
      .then(tasks => this.userTasks = tasks.sort((a, b) => a.name - b.name));
  };
  this.updateTask = (event) => {
  	var indexToUpdate = tasks.findIndex(task => task.id === event.task.id);
  	var thisIndexToUpdate = this.userTasks.findIndex(task => task.id === event.task.id);
    this.userTasks[thisIndexToUpdate] = event.task;
    tasks[indexToUpdate] = event.task;
  }
	this.removeTask = (event) => {
    var indexToRemove = tasks.findIndex(task => task.id === event.taskId);
    var thisIndexToRemove = this.userTasks.findIndex(task => task.id === event.taskId);
    tasks = tasks.slice(0, indexToRemove).concat(tasks.slice(indexToRemove+1));
    this.userTasks = this.userTasks.slice(0, thisIndexToRemove).concat(this.userTasks.slice(thisIndexToRemove+1));
  };
}

function TaskSchedulerComponent() {
  this.controller = taskSchedulerCtrl;
  this.template = `
        <h1>{{$ctrl.message}}</h1>
        User Id: <input ng-model="$ctrl.userId" /> <button ng-click="$ctrl.getTasks();">Get Tasks</button><br/>
        <div ng-if="$ctrl.userTasks.length">
          <task-list tasks="$ctrl.userTasks" on-update="$ctrl.updateTask($event)"
          	on-remove="$ctrl.removeTask($event)"></task-list>
        </div>
    `;
}

function TaskComponent() {
  this.template = `
    <div class="task-container" ng-class="{'task-under-edit': $ctrl.underEdit}">
    	<pre ng-if="!$ctrl.underEdit">{{$ctrl.task | json}}</pre>
      <div ng-if="$ctrl.underEdit">
      	<label>Name: <input ng-model="$ctrl.task.name"/></label><br/>
      	<label>From: <input ng-model="$ctrl.task.from"/></label><br/>
      	<label>Recurrence: 
        	<select ng-model="$ctrl.task.recurrence">
        		<option value="daily">Daily</option>
        		<option value="weekly">Weekly</option>
        		<option value="monthly">Monthly</option>
        	</select>
				</label><br/>
      	<label>Active: <input type="checkbox" ng-model="$ctrl.task.active"/></label><br/>
        <button ng-click="$ctrl.cancelEdit()">Cancel</button> <button ng-click="$ctrl.saveTask()">Save</button>
      </div>
      <div class="task-actions">
      	<a href="Javascript:void(0)" class="remove-task-link" ng-click="$ctrl.removeTask()">Remove</a> | 
      	<a href="Javascript:void(0)" class="edit-task-link" ng-click="$ctrl.editTask()">Edit</a>      	
      </div>
    </div>
  `;
  this.bindings = {
    task: "<",
    onUpdate: "&",
    onRemove: "&"
  };
  this.controller = function() {
    var lastTask = null;
  	this.$onInit = function () {
    	this.underEdit = false;
      lastTask = angular.copy(this.task);
    };
    this.editTask = function () {
    	this.underEdit = true;
    };
    this.saveTask = function () {
      lastTask = this.task;
      this.onUpdate({
      	$event: {
        	task: this.task
        }
      });
      this.underEdit = false;
    };
    this.cancelEdit = function () {
    	this.task = lastTask;
    	this.underEdit = false;
    };
    this.removeTask = function () {
    	this.onRemove({
      	$event: {
        	taskId: this.task.id
        }
      });
    }
    this.$onChanges = function(changes) {
      if (changes.task) {
        this.task = angular.copy(this.task);
        lastTask = angular.copy(this.task);
      }
    };
  };
}


angular.module("myApp", [])
  .service("taskService", function($q, $timeout) {
    var svc = {
      getTasksForUser: function(userId) {
        return $q((resolve, reject_ignored) => {
          $timeout(function() {
            resolve(tasks.filter(function(task) {
              return task.owner === users[userId];
            }));
          }, 500);
        });
      }
    };
    return svc;
  })
  .component("taskScheduler", new TaskSchedulerComponent())
  .component("taskList", new TaskListComponent())
  .component("task", new TaskComponent());
