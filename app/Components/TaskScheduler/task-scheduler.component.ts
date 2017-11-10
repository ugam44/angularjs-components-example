taskSchedulerCtrl.$inject = ["$http", "$scope", "taskService"];
function taskSchedulerCtrl($http:ng.IHttpService, $scope:ng.IScope, taskService:any) {
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
        //var indexToUpdate: number = tasks.findIndex(task => task.id === event.task.id);
        var thisIndexToUpdate: number = this.userTasks.findIndex(task => task.id === event.task.id);
        this.userTasks[thisIndexToUpdate] = event.task;
        //tasks[indexToUpdate] = event.task;
    };
    this.removeTask = (event) => {
        //var indexToRemove: number = tasks.findIndex(task => task.id === event.taskId);
        var thisIndexToRemove: number = this.userTasks.findIndex(task => task.id === event.taskId);
        //tasks = tasks.slice(0, indexToRemove).concat(tasks.slice(indexToRemove + 1));
        this.userTasks = this.userTasks.slice(0, thisIndexToRemove).concat(this.userTasks.slice(thisIndexToRemove + 1));
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