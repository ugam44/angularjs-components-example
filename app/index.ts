"use strict";
import * as angular from "angular";
import { Task } from "./Components/Task/task.models";
import { TaskSchedulerComponent } from "./Components/TaskScheduler/task-scheduler.component";
import { TaskListComponent } from "./Components/TaskList/task-list.component";
import { TaskComponent } from "./Components/Task/task.component";
var users: { [empId: number]: string } = {
  4114: "mhodges",
  4110: "rhodges"
};
var tasks: Task[] = [
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
angular.module("myApp", [])
  .service("taskService", ["$q", "$timeout", function ($q: ng.IQService, $timeout: ng.ITimeoutService) {
    var svc: {[serviceName: string]: any} = {
      getTasksForUser: function (userId: (string | number)):ng.IPromise<{}> {
        return $q((resolve, reject_ignored) => {
          $timeout(function () {
            resolve(tasks.filter(function (task:Task) {
              return task.owner === users[userId];
            }));
          }, 500);
        });
      }
    };
    return svc;
  }])
  .component("taskScheduler", new TaskSchedulerComponent())
  .component("taskList", new TaskListComponent())
  .component("task", new TaskComponent());
