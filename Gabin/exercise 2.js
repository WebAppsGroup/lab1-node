"use strict"

const dayjs = require("dayjs");
const sqlite = require("sqlite3")

function Task(id, description, urgent = false, privat, deadline ='') {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.privat = privat || true;
    this.deadline =deadline  && dayjs(deadline);
    this.toString= () =>
        { 
            console.log(` id: ${this.id}, description: ${this.description}, urgent: ${this.urgent}, 
            private: ${this.privat}, deadline: ${this.deadline ?this.deadline.toString(): "Not defined"}`);
}
}

function TaskList() {
    this.listOfTask = [];

    this.addTask = (task) => this.listOfTask.push(task);
    this.sortByDate = (date) => {
        return new Promise((resolve, reject) => {
            db.all(`select * from tasks where deadline > ?`, [date], (err, rows) => {
                if (err) reject(err);
                else {
                    let task = rows.map(record => new Task(record.id, record.description, record.urgent == 1, record.private == 1, record.deadline))
                    resolve(task);
                }
            }
            );
        })

    }
    this.getAll = () => {
        return new Promise((resolve, reject) => {
            db.all(`select * from tasks`, (err, rows) => {
                if (err) reject(err);
                else {
                    let task = rows.map(record => new Task(record.id, record.description, record.urgent == 1, record.private == 1, record.deadline))
                    resolve(task);
                }
            }
            );
        })

    }


    this.filterTask = (word) => {
        return new Promise((resolve, reject) => {
            db.all(`select * from tasks where description like ?`, ['%' + word + '%'],
                (err, rows) => {
                    if (err) reject(err);
                    else {
                        let task = rows.map(record => new Task(record.id, record.description, record.urgent == 1, record.private == 1, record.deadline))
                        resolve(task);
                    }
                })

        })
    }


}


let db = new sqlite.Database('tasks.db', (err) => { if (err) throw err })

async function main() {
    let  list = new TaskList()

    let allTask = await list.getAll();
    console.log('liste des taches enregistrees');
    allTask.forEach(element => element.toString());

    allTask = await list.filterTask("cal")
    allTask.forEach(element => element.toString());

    

}
 

main()