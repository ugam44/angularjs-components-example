export class TaskComponent {
    template = `
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
    bindings = {
      task: "<",
      onUpdate: "&",
      onRemove: "&"
    };
    controller = function() {
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
      };
      this.$onChanges = function(changes) {
        if (changes.task) {
          this.task = angular.copy(this.task);
          lastTask = angular.copy(this.task);
        }
      };
    };
  }