function TaskListComponent() {
    this.template = `
        <div class="task-list">
        <h3>Tasks</h3><hr/>
        <task ng-repeat="task in $ctrl.tasks" task="task" on-update="$ctrl.updateTask($event)" on-remove="$ctrl.removeTask($event)"></task>
        </div>
    `;
    this.bindings = { tasks: "<", onUpdate: "&", onRemove: "&" };
    this.controller = function () {
        this.updateTask = (event) => {
            var indexToUpdate: number = this.tasks.findIndex(task => task.id === event.task.id);
            this.tasks[indexToUpdate] = event.task;
            this.onUpdate({ $event: event });
        };
        this.removeTask = (event) => {
            var indexToRemove: number = this.tasks.findIndex(task => task.id === event.taskId);
            this.tasks = this.tasks.slice(0, indexToRemove).concat(this.tasks.slice(indexToRemove + 1));
            this.onRemove({ $event: event });
        };
        this.$onChanges = function (changes: { [prop: string]: any }) {
            if (changes.tasks) {
                this.tasks = angular.copy(this.tasks);
            }
        };
    };
}