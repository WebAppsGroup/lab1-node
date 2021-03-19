'use strict'

function Task(id, description, urgent, pri, deadline) { // create an object Task build from passed arguments and return the object
    this.id = id ;
    this.description = description ;
    this.urgent = urgent ;
    this.pri = pri ;
    this.deadline = deadline ;
    this.toString = () => (`Id: ${this.id}, Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.pri}, Deadline: ${this.deadline}`) ;
}

function TaskList() { // create a function/method that contains functions to be implemented

    this.tasks = [] ; //create an tasks array each element will point to a Task object
    
    
    this.add = (task) => { // create function that add to task list the object task passed as argument
        this.tasks.push(task);
    };

    this.sortByDate = () => {
        let sortedList = [...this.tasks] ;
        sortedList.sort((a, b) => (b.deadline-a.deadline)); // sort dates by ascending order
        this.tasks=sortedList;
        let i=0;
        for (i=0;i<sortedList.length;i++) // print out the formatted tasks
        console.log(sortedList[i].toString());
         //sortedlist.sort(...).foreach( t => console.log(t))
    }

    this.noturgent = () => { // function takes a given date inputted by user
        let result = new TaskList() ; // create a new
        this.tasks.filter((Task) => (Task.urgent === 'true') ).forEach((Task)=>{result.add(Task)}) ;
        console.log(result.toString() ); // first we filter list of tasks in .thistasks under the condition Task.urgent === 'true'
        // then the result which is an array of exams will be added to result
    }


    this.toString = () => ( this.tasks.map((task)=>(task.toString())).join('\n') );
 
}
 

const task1 = new Task('3', 'phone call', 'true', 'false', 'March 8,2021 4:20 PM') ;
const task2 = new Task('2', 'monday lab','false' , 'false', 'March 16,2021 10:00 AM') ;
const task3 = new Task('1', 'laundry','false' , 'false', '<not defined>') ;


const mytasks = new TaskList() ; // add the tasks to the tasklist
mytasks.add(task1);
mytasks.add(task2);
mytasks.add(task3);

//console.log('*** Tasks LIST ***');
//console.log(mytasks.toString());


console.log('****** Tasks sorted by deadline (most recent first): ******');
mytasks.sortByDate();



//console.log('****** Tasks filtered, only (urgent == true): ******');
//mytasks.noturgent();
